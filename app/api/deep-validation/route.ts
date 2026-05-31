import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import getDeepSeek, { DEEPSEEK_MODEL } from '@/lib/deepseek';
import { DEEP_VALIDATION_SYSTEM_PROMPT, buildDeepValidationPrompt, buildExpertEvaluationPrompt } from '@/lib/prompts';
import { EXPERTS } from '@/lib/expert-prompts';
import type { ExpertOpinion } from '@/types/report';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { ideaId } = body;

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

    // Fetch basic roast score as reference for consistency
    const { data: basicReport } = await supabase
      .from('reports')
      .select('overall_score')
      .eq('idea_id', ideaId)
      .eq('report_type', 'basic_roast')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const baseIdeaArgs = [
      idea.description,
      idea.target_user || undefined,
      idea.product_type || undefined,
      idea.monetization_plan || undefined,
      idea.distribution_plan || undefined,
      idea.mvp_timeline || undefined,
    ] as const;

    // Run main deep validation + 10 expert evaluations in parallel
    const [mainResult, ...expertResults] = await Promise.allSettled([
      // Main Deep Validation
      deepseek.chat.completions.create({
        model: DEEPSEEK_MODEL,
        messages: [
          { role: 'system', content: DEEP_VALIDATION_SYSTEM_PROMPT },
          { role: 'user', content: buildDeepValidationPrompt(...baseIdeaArgs, basicReport?.overall_score) },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
      // 10 expert evaluations
      ...EXPERTS.map((expert) =>
        deepseek.chat.completions.create({
          model: DEEPSEEK_MODEL,
          messages: [
            { role: 'system', content: expert.systemPrompt + '\n\nIMPORTANT: You are an AI analyzing this idea through the thinking framework described above — you are NOT impersonating this person. Do not use first person as if you are them. Instead, frame your analysis as: "Through [name]\'s lens..." or "[Name]\'s framework suggests..." when referencing their mental models.' },
            { role: 'user', content: buildExpertEvaluationPrompt(...baseIdeaArgs) },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        })
      ),
    ]);

    // Parse main result
    if (mainResult.status === 'rejected') {
      console.error('Main Deep Validation failed:', mainResult.reason);
      return NextResponse.json({ error: 'AI API error: ' + (mainResult.reason?.message || 'unknown') }, { status: 500 });
    }

    const mainContent = mainResult.value.choices[0]?.message?.content;
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

    // Parse expert results (non-blocking — failures are tolerated)
    const expertPanel: ExpertOpinion[] = [];
    expertResults.forEach((result, i) => {
      const expert = EXPERTS[i];
      if (result.status === 'rejected') {
        console.error(`Expert ${expert.name} failed:`, result.reason);
        return;
      }
      const content = result.value.choices[0]?.message?.content;
      if (!content) return;
      try {
        const opinion = JSON.parse(content);
        expertPanel.push({
          expert_id: expert.id,
          expert_name: expert.name,
          expert_title: expert.title,
          archetype: expert.archetype,
          archetype_description: expert.archetypeDescription,
          verdict: opinion.verdict,
          confidence: opinion.confidence,
          one_line_take: opinion.one_line_take,
          key_arguments: opinion.key_arguments || [],
          blind_spot: opinion.blind_spot || '',
        });
      } catch (e) {
        console.error(`Expert ${expert.name} returned invalid JSON:`, content);
      }
    });

    // Merge expert panel into content_json
    const contentJson = { ...parsed };
    if (expertPanel.length > 0) {
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
