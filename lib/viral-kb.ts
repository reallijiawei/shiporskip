import { createClient } from './supabase-server';

export async function getKnowledgeForType(productType?: string): Promise<string> {
  if (!productType) return '';

  const supabase = await createClient();
  const { data } = await supabase
    .from('viral_knowledge')
    .select('knowledge_json, source_count')
    .eq('product_type', productType)
    .single();

  if (!data) return '';

  const k = data.knowledge_json as Record<string, string[]>;
  const sections: string[] = [];

  if (k.growth_patterns?.length) sections.push(`Growth patterns:\n${k.growth_patterns.map((s) => `- ${s}`).join('\n')}`);
  if (k.design_principles?.length) sections.push(`Design principles:\n${k.design_principles.map((s) => `- ${s}`).join('\n')}`);
  if (k.monetization_insights?.length) sections.push(`Monetization insights:\n${k.monetization_insights.map((s) => `- ${s}`).join('\n')}`);
  if (k.distribution_strategies?.length) sections.push(`Distribution strategies:\n${k.distribution_strategies.map((s) => `- ${s}`).join('\n')}`);
  if (k.common_mistakes?.length) sections.push(`Common mistakes:\n${k.common_mistakes.map((s) => `- ${s}`).join('\n')}`);
  if (k.what_works?.length) sections.push(`What works:\n${k.what_works.map((s) => `- ${s}`).join('\n')}`);
  if (k.what_doesnt_work?.length) sections.push(`What doesn't work:\n${k.what_doesnt_work.map((s) => `- ${s}`).join('\n')}`);

  if (sections.length === 0) return '';

  return `(Based on analysis of ${data.source_count} viral ${productType} products)\n\n${sections.join('\n\n')}`;
}
