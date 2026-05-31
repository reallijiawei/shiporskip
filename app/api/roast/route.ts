import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import getDeepSeek, { DEEPSEEK_MODEL } from '@/lib/deepseek';
import { BASIC_ROAST_SYSTEM_PROMPT, buildBasicRoastPrompt, buildExpertEvaluationPrompt } from '@/lib/prompts';
import { EXPERTS } from '@/lib/expert-prompts';
import { checkQuota, incrementUsage } from '@/lib/quota';
import type { ExpertOpinion } from '@/types/report';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quota = await checkQuota(user.id, 'basic_roast');
    if (!quota.allowed) {
      return NextResponse.json(
        { error: 'Monthly free roast limit reached. Upgrade for more.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { description, targetUser, productType, monetizationPlan, distributionPlan, mvpTimeline } = body;

    if (!description?.trim()) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    const deepseek = getDeepSeek();

    // Pick one random expert for teaser
    const teaserExpert = EXPERTS[Math.floor(Math.random() * EXPERTS.length)];

    // Run basic roast + one expert evaluation in parallel
    const [roastResult, expertResult] = await Promise.allSettled([
      deepseek.chat.completions.create({
        model: DEEPSEEK_MODEL,
        messages: [
          { role: 'system', content: BASIC_ROAST_SYSTEM_PROMPT },
          { role: 'user', content: buildBasicRoastPrompt(description, targetUser, productType) },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
      deepseek.chat.completions.create({
        model: DEEPSEEK_MODEL,
        messages: [
          { role: 'system', content: teaserExpert.systemPrompt + '\n\nIMPORTANT: You are an AI analyzing this idea through the thinking framework described above — you are NOT impersonating this person. Do not use first person as if you are them. Instead, frame your analysis as: "Through [name]\'s lens..." or "[Name]\'s framework suggests..." when referencing their mental models.' },
          { role: 'user', content: buildExpertEvaluationPrompt(description, targetUser, productType) },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
    ]);

    if (roastResult.status === 'rejected') {
      console.error('Basic roast failed:', roastResult.reason);
      return NextResponse.json({ error: 'AI API error' }, { status: 500 });
    }

    const content = roastResult.value.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: 'AI returned empty response' }, { status: 500 });
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json({ error: 'AI returned invalid JSON' }, { status: 500 });
    }

    // Parse expert teaser (non-blocking)
    let teaserOpinion: ExpertOpinion | null = null;
    if (expertResult.status === 'fulfilled') {
      const expertContent = expertResult.value.choices[0]?.message?.content;
      if (expertContent) {
        try {
          const opinion = JSON.parse(expertContent);
          teaserOpinion = {
            expert_id: teaserExpert.id,
            expert_name: teaserExpert.name,
            expert_title: teaserExpert.title,
            archetype: teaserExpert.archetype,
            archetype_description: teaserExpert.archetypeDescription,
            verdict: opinion.verdict,
            confidence: opinion.confidence,
            one_line_take: opinion.one_line_take,
            key_arguments: opinion.key_arguments || [],
            blind_spot: opinion.blind_spot || '',
          };
        } catch (e) {
          console.error('Expert teaser returned invalid JSON:', expertContent);
        }
      }
    }

    const title = description.slice(0, 100).replace(/\n/g, ' ').trim();

    const { data: idea, error: ideaError } = await supabase
      .from('ideas')
      .insert({
        user_id: user.id,
        title,
        description,
        target_user: targetUser || null,
        product_type: productType || null,
        monetization_plan: monetizationPlan || null,
        distribution_plan: distributionPlan || null,
        mvp_timeline: mvpTimeline || null,
        status: 'validating',
      })
      .select()
      .single();

    if (ideaError || !idea) {
      return NextResponse.json({ error: 'Failed to save idea' }, { status: 500 });
    }

    const contentJson = { ...parsed };
    if (teaserOpinion) {
      contentJson.teaser_expert = teaserOpinion;
    }

    const { data: report, error: reportError } = await supabase
      .from('reports')
      .insert({
        idea_id: idea.id,
        report_type: 'basic_roast',
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

    await incrementUsage(user.id, 'basic_roast');

    return NextResponse.json({ report: { id: report.id } });
  } catch (error) {
    console.error('Roast API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
