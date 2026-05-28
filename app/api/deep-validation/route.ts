import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import getOpenRouter, { MODELS } from '@/lib/openrouter';
import { DEEP_VALIDATION_SYSTEM_PROMPT, buildDeepValidationPrompt } from '@/lib/prompts';
import { checkQuota, incrementUsage } from '@/lib/quota';
import { createDeepReportCheckout } from '@/lib/lemonsqueezy';

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
      return NextResponse.json({ error: 'Idea ID is required' }, { status: 400 });
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

    const { data: existingReport } = await supabase
      .from('reports')
      .select('*')
      .eq('idea_id', ideaId)
      .eq('report_type', 'deep_validation')
      .single();

    if (existingReport) {
      return NextResponse.json({ report: existingReport });
    }

    const { data: payment } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'paid')
      .limit(1)
      .single();

    if (!payment) {
      const checkoutUrl = await createDeepReportCheckout(user.id, ideaId);
      return NextResponse.json({ requiresPayment: true, checkoutUrl });
    }

    const quota = await checkQuota(user.id, 'deep_validation');
    if (!quota.allowed) {
      return NextResponse.json({ error: 'Monthly quota exceeded. Upgrade to continue.' }, { status: 429 });
    }

    const openrouter = getOpenRouter();
    const completion = await openrouter.chat.completions.create({
      model: MODELS.deep_validation,
      messages: [
        { role: 'system', content: DEEP_VALIDATION_SYSTEM_PROMPT },
        {
          role: 'user',
          content: buildDeepValidationPrompt(
            idea.description,
            idea.target_user,
            idea.product_type,
            idea.monetization_plan,
            idea.distribution_plan,
            idea.mvp_timeline
          ),
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: 'Failed to generate validation' }, { status: 500 });
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
        report_type: 'deep_validation',
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

    await incrementUsage(user.id, 'deep_validation');

    return NextResponse.json({ report });
  } catch (error) {
    console.error('Deep validation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
