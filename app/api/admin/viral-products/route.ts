import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-service';
import getDeepSeek, { DEEPSEEK_MODEL } from '@/lib/deepseek';
import { VIRAL_ANALYSIS_SYSTEM_PROMPT, buildViralAnalysisPrompt } from '@/lib/prompts';

async function fetchPageContent(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ShipOrSkip/1.0)' },
      signal: AbortSignal.timeout(10000),
    });
    const html = await res.text();
    // Strip HTML tags, scripts, styles, collapse whitespace
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 8000); // Limit to ~8K chars to stay within token budget
    return text;
  } catch {
    return '';
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const secret = process.env.ADMIN_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { url } = await request.json();
  if (!url?.trim()) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  // Fetch actual page content so AI doesn't guess
  const pageContent = await fetchPageContent(url);

  const deepseek = getDeepSeek();
  const result = await deepseek.chat.completions.create({
    model: DEEPSEEK_MODEL,
    messages: [
      { role: 'system', content: VIRAL_ANALYSIS_SYSTEM_PROMPT },
      { role: 'user', content: buildViralAnalysisPrompt(url, pageContent) },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.5,
  });

  const content = result.choices[0]?.message?.content;
  if (!content) {
    return NextResponse.json({ error: 'AI returned empty response' }, { status: 500 });
  }

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    return NextResponse.json({ error: 'AI returned invalid JSON' }, { status: 500 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('viral_products')
    .insert({
      url,
      name: parsed.name,
      description: parsed.description,
      product_type: parsed.product_type,
      category: parsed.category,
      tags: parsed.tags,
      analysis_json: parsed,
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to save viral product:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }

  return NextResponse.json({ product: data });
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const secret = process.env.ADMIN_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('viral_products')
    .select('id, name, url, description, product_type, category, tags, analysis_json, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }

  return NextResponse.json({ products: data });
}

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const secret = process.env.ADMIN_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from('viral_products').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
