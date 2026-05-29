import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import getOpenRouter, { MODELS } from '@/lib/openrouter';
import { DEEP_VALIDATION_SYSTEM_PROMPT, buildDeepValidationPrompt } from '@/lib/prompts';

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

    // Call OpenRouter with the stronger model
    const openrouter = getOpenRouter();
    let completion;
    try {
      completion = await openrouter.chat.completions.create({
        model: MODELS.deep_validation,
        messages: [
          { role: 'system', content: DEEP_VALIDATION_SYSTEM_PROMPT },
          {
            role: 'user',
            content: buildDeepValidationPrompt(
              idea.description,
              idea.target_user || undefined,
              idea.product_type || undefined,
              idea.monetization_plan || undefined,
              idea.distribution_plan || undefined,
              idea.mvp_timeline || undefined
            ),
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });
    } catch (aiError: any) {
      console.error('OpenRouter API error:', aiError?.message || aiError);
      return NextResponse.json({ error: 'AI API error: ' + (aiError?.message || 'unknown') }, { status: 500 });
    }

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: 'AI returned empty response' }, { status: 500 });
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (parseError) {
      console.error('JSON parse error, raw content:', content);
      return NextResponse.json({ error: 'AI returned invalid JSON' }, { status: 500 });
    }

    const { data: report, error: reportError } = await supabase
      .from('reports')
      .insert({
        idea_id: ideaId,
        report_type: 'deep_validation',
        verdict: parsed.verdict,
        overall_score: parsed.overall_score,
        scores: parsed.score_breakdown,
        content_json: parsed,
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
