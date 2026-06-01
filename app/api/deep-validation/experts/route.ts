import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import getDeepSeek, { DEEPSEEK_MODEL } from '@/lib/deepseek';
import { buildExpertEvaluationPrompt } from '@/lib/prompts';
import { EXPERTS } from '@/lib/expert-prompts';
import { checkQuota } from '@/lib/quota';
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

    const { data: idea, error: ideaError } = await supabase
      .from('ideas')
      .select('*')
      .eq('id', ideaId)
      .eq('user_id', user.id)
      .single();

    if (ideaError || !idea) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
    }

    const quota = await checkQuota(user.id, 'deep_validation');
    if (!quota.allowed) {
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

    // Run 10 expert evaluations in parallel
    const t0 = Date.now();
    console.log('[Experts] Starting 10 parallel expert calls...');
    const expertResults = await Promise.allSettled(
      EXPERTS.map((expert) =>
        deepseek.chat.completions.create({
          model: DEEPSEEK_MODEL,
          messages: [
            { role: 'system', content: expert.systemPrompt + '\n\nIMPORTANT: You are an AI analyzing this idea through the thinking framework described above — you are NOT impersonating this person. Do not use first person as if you are them. Instead, frame your analysis as: "Through [name]\'s lens..." or "[Name]\'s framework suggests..." when referencing their mental models.' },
            { role: 'user', content: buildExpertEvaluationPrompt(...baseIdeaArgs) },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        })
      )
    );

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
          one_line_take: opinion.one_line_take,
          key_arguments: opinion.key_arguments || [],
          blind_spot: opinion.blind_spot || '',
        });
      } catch (e) {
        console.error(`Expert ${expert.name} returned invalid JSON:`, content);
      }
    });

    console.log(`[Experts] Completed ${expertPanel.length}/10 experts in ${Date.now() - t0}ms`);
    return NextResponse.json({ expertPanel });
  } catch (error: any) {
    console.error('Expert evaluations API error:', error?.message || error);
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
