import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import getDeepSeek, { DEEPSEEK_MODEL } from '@/lib/deepseek';
import { DEEP_VALIDATION_SYSTEM_PROMPT, buildDeepValidationPrompt } from '@/lib/prompts';
import { checkQuota, incrementUsage } from '@/lib/quota';
import { getKnowledgeForType } from '@/lib/viral-kb';
import type { ExpertOpinion } from '@/types/report';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { ideaId, expertPanel } = body as { ideaId: string; expertPanel?: ExpertOpinion[] };

    if (!ideaId) {
      return NextResponse.json({ error: 'ideaId is required' }, { status: 400 });
    }

    // Verify this idea belongs to the user
    const { data: idea, error: ideaError } = await supabase
      .from('ideas')
      .select('*')
      .eq('id', ideaId)
      .eq('user_id', user.id)
      .single();

    if (ideaError || !idea) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
    }

    // Check if already has a deep validation report
    const { data: existingReport } = await supabase
      .from('reports')
      .select('id')
      .eq('idea_id', ideaId)
      .eq('report_type', 'deep_validation')
      .single();

    if (existingReport) {
      return NextResponse.json({ report: { id: existingReport.id } });
    }

    // Check if user has deep_validation credits
    const quota = await checkQuota(user.id, 'deep_validation');
    if (!quota.allowed) {
      return NextResponse.json(
        { error: 'Deep Validation requires payment', needsPayment: true },
        { status: 402 }
      );
    }

    const deepseek = getDeepSeek();

    // Fetch basic roast content for objections consistency
    const { data: basicReport } = await supabase
      .from('reports')
      .select('content_json')
      .eq('idea_id', ideaId)
      .eq('report_type', 'basic_roast')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const basicContent = basicReport?.content_json as any;
    const basicObjections = basicContent?.brutal_objections || [];

    // Fall back to idea_details stored in the basic report if idea text was deleted
    const savedDetails = basicContent?.idea_details;
    const ideaDesc = idea.description !== '[deleted]' ? idea.description : (savedDetails?.description || idea.description);
    const ideaTarget = idea.description !== '[deleted]' ? idea.target_user : (savedDetails?.target_user || idea.target_user);
    const ideaProduct = idea.description !== '[deleted]' ? idea.product_type : (savedDetails?.product_type || idea.product_type);
    const ideaMonetization = idea.description !== '[deleted]' ? idea.monetization_plan : (savedDetails?.monetization_plan || idea.monetization_plan);
    const ideaDistribution = idea.description !== '[deleted]' ? idea.distribution_plan : (savedDetails?.distribution_plan || idea.distribution_plan);
    const ideaTimeline = idea.description !== '[deleted]' ? idea.mvp_timeline : (savedDetails?.mvp_timeline || idea.mvp_timeline);

    const baseIdeaArgs = [
      ideaDesc,
      ideaTarget || undefined,
      ideaProduct || undefined,
      ideaMonetization || undefined,
      ideaDistribution || undefined,
      ideaTimeline || undefined,
    ] as const;

    // Fetch internalized knowledge for this product type
    const viralContext = await getKnowledgeForType(ideaProduct);

    // Build expert panel summary for scoring context
    const t0 = Date.now();
    console.log('[Validate] Starting main validation synthesis...');
    const expertSummary = expertPanel && expertPanel.length > 0
      ? expertPanel.map((ep) =>
          `- ${ep.expert_name} (${ep.archetype}): verdict=${ep.verdict}\n  "${ep.one_line_take}"\n  Key arguments: ${ep.key_arguments.join('; ')}\n  Blind spot: ${ep.blind_spot}`
        ).join('\n')
      : '';

    // Main Deep Validation — scores derived from expert analysis
    const mainResult = await deepseek.chat.completions.create({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: 'system', content: DEEP_VALIDATION_SYSTEM_PROMPT },
        { role: 'user', content: buildDeepValidationPrompt(...baseIdeaArgs, expertSummary, basicObjections, viralContext) },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const mainContent = mainResult.choices[0]?.message?.content;
    if (!mainContent) {
      return NextResponse.json({ error: 'AI returned empty response' }, { status: 500 });
    }

    let parsed;
    try {
      parsed = JSON.parse(mainContent);
    } catch (parseError) {
      console.error('JSON parse error, raw content:', mainContent);
      return NextResponse.json({ error: 'AI returned invalid JSON' }, { status: 500 });
    }

    console.log(`[Validate] Synthesis completed in ${Date.now() - t0}ms`);

    // Merge expert panel into content_json
    const contentJson = { ...parsed };
    if (expertPanel && expertPanel.length > 0) {
      contentJson.expert_panel = expertPanel;
    }

    const { data: report, error: reportError } = await supabase
      .from('reports')
      .insert({
        idea_id: ideaId,
        report_type: 'deep_validation',
        verdict: parsed.verdict,
        overall_score: parsed.overall_score,
        scores: parsed.score_breakdown,
        content_json: contentJson,
      })
      .select()
      .single();

    if (reportError || !report) {
      return NextResponse.json({ error: 'Failed to save report' }, { status: 500 });
    }

    await incrementUsage(user.id, 'deep_validation');

    return NextResponse.json({ report: { id: report.id } });
  } catch (error: any) {
    console.error('Deep validation API error:', error?.message || error);
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
