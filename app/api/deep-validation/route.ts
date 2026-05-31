import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import getDeepSeek, { DEEPSEEK_MODEL } from '@/lib/deepseek';
import { DEEP_VALIDATION_SYSTEM_PROMPT, buildDeepValidationPrompt } from '@/lib/prompts';
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

    // Check if user has paid (has deep_validation credits)
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const { data: quota } = await supabase
      .from('usage_quotas')
      .select('deep_validation_limit')
      .eq('user_id', user.id)
      .eq('month', currentMonth)
      .single();

    if (!quota || quota.deep_validation_limit <= 0) {
      return NextResponse.json(
        { error: 'Deep Validation requires payment', needsPayment: true },
        { status: 402 }
      );
    }

    const deepseek = getDeepSeek();

    const baseIdeaArgs = [
      idea.description,
      idea.target_user || undefined,
      idea.product_type || undefined,
      idea.monetization_plan || undefined,
      idea.distribution_plan || undefined,
      idea.mvp_timeline || undefined,
    ] as const;

    // Build expert panel summary for scoring context
    const expertSummary = expertPanel && expertPanel.length > 0
      ? expertPanel.map((ep) =>
          `- ${ep.expert_name} (${ep.archetype}): verdict=${ep.verdict}, confidence=${ep.confidence}\n  "${ep.one_line_take}"\n  Key arguments: ${ep.key_arguments.join('; ')}\n  Blind spot: ${ep.blind_spot}`
        ).join('\n')
      : '';

    // Main Deep Validation — scores derived from expert analysis
    const mainResult = await deepseek.chat.completions.create({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: 'system', content: DEEP_VALIDATION_SYSTEM_PROMPT },
        { role: 'user', content: buildDeepValidationPrompt(...baseIdeaArgs, expertSummary) },
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

    return NextResponse.json({ report: { id: report.id } });
  } catch (error: any) {
    console.error('Deep validation API error:', error?.message || error);
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
