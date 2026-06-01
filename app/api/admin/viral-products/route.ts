import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-service';
import getDeepSeek, { DEEPSEEK_MODEL } from '@/lib/deepseek';
import { VIRAL_ANALYSIS_SYSTEM_PROMPT, buildViralAnalysisPrompt, KNOWLEDGE_MERGE_SYSTEM_PROMPT, buildKnowledgeMergePrompt } from '@/lib/prompts';

async function fetchPageContent(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ShipOrSkip/1.0)' },
      signal: AbortSignal.timeout(10000),
    });
    const html = await res.text();
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 8000);
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

  const pageContent = await fetchPageContent(url);
  const deepseek = getDeepSeek();

  // Step 1: Analyze the viral product
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

  // Save individual product analysis
  const { data: product, error: productError } = await supabase
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

  if (productError) {
    console.error('Failed to save viral product:', productError);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }

  // Step 2: Merge into viral_knowledge
  const productType = parsed.product_type || 'other';

  // Read existing knowledge
  const { data: existing } = await supabase
    .from('viral_knowledge')
    .select('knowledge_json, source_count')
    .eq('product_type', productType)
    .single();

  const existingKnowledge = existing ? JSON.stringify(existing.knowledge_json) : '';
  const existingCount = existing?.source_count || 0;

  // AI merges new analysis into existing knowledge
  const mergeResult = await deepseek.chat.completions.create({
    model: DEEPSEEK_MODEL,
    messages: [
      { role: 'system', content: KNOWLEDGE_MERGE_SYSTEM_PROMPT },
      { role: 'user', content: buildKnowledgeMergePrompt(existingKnowledge, content) },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
  });

  const mergeContent = mergeResult.choices[0]?.message?.content;
  if (mergeContent) {
    let mergedKnowledge;
    try {
      mergedKnowledge = JSON.parse(mergeContent);
    } catch {
      mergedKnowledge = null;
    }

    if (mergedKnowledge) {
      // Upsert into viral_knowledge
      const { error: upsertError } = await supabase
        .from('viral_knowledge')
        .upsert(
          {
            product_type: productType,
            knowledge_json: mergedKnowledge,
            source_count: existingCount + 1,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'product_type' }
        );

      if (upsertError) {
        console.error('Failed to update viral knowledge:', upsertError);
      }
    }
  }

  return NextResponse.json({ product });
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const secret = process.env.ADMIN_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();

  const [{ data: products }, { data: knowledge }] = await Promise.all([
    supabase.from('viral_products').select('id, name, url, description, product_type, category, tags, analysis_json, created_at').order('created_at', { ascending: false }),
    supabase.from('viral_knowledge').select('*').order('updated_at', { ascending: false }),
  ]);

  return NextResponse.json({ products: products || [], knowledge: knowledge || [] });
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
