import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import getOpenRouter, { MODELS } from '@/lib/openrouter';
import { BASIC_ROAST_SYSTEM_PROMPT, buildBasicRoastPrompt } from '@/lib/prompts';
import { checkQuota, incrementUsage } from '@/lib/quota';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { description, targetUser, productType } = body;

    if (!description || description.trim().length === 0) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    if (description.length > 2000) {
      return NextResponse.json({ error: 'Description must be 2000 characters or less' }, { status: 400 });
    }

    const quota = await checkQuota(user.id, 'basic_roast');
    if (!quota.allowed) {
      return NextResponse.json({ error: 'Monthly quota exceeded. Upgrade to continue.' }, { status: 429 });
    }

    const title = description.slice(0, 100).trim();

    const { data: idea, error: ideaError } = await supabase
      .from('ideas')
      .insert({
        user_id: user.id,
        title,
        description,
        target_user: targetUser,
        product_type: productType,
        status: 'validating',
      })
      .select()
      .single();

    if (ideaError) {
      return NextResponse.json({ error: 'Failed to create idea' }, { status: 500 });
    }

    const openrouter = getOpenRouter();
    const completion = await openrouter.chat.completions.create({
      model: MODELS.basic_roast,
      messages: [
        { role: 'system', content: BASIC_ROAST_SYSTEM_PROMPT },
        { role: 'user', content: buildBasicRoastPrompt(description, targetUser, productType) },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: 'Failed to generate roast' }, { status: 500 });
    }

    let reportContent;
    try {
      reportContent = JSON.parse(content);
    } catch {
      return NextResponse.json({ error: 'Invalid response format' }, { status: 500 });
    }

    const { data: report, error: reportError } = await supabase
      .from('reports')
      .insert({
        idea_id: idea.id,
        report_type: 'basic_roast',
        verdict: reportContent.verdict,
        overall_score: reportContent.overall_score,
        scores: reportContent.score_breakdown,
        content_json: reportContent,
      })
      .select()
      .single();

    if (reportError) {
      return NextResponse.json({ error: 'Failed to save report' }, { status: 500 });
    }

    await incrementUsage(user.id, 'basic_roast');

    return NextResponse.json({ report, idea });
  } catch (error) {
    console.error('Roast error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
