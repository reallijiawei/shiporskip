import { createClient } from './supabase-server';

export interface ViralContext {
  name: string;
  url: string;
  description: string;
  analysis_json: Record<string, any>;
}

export async function getRelevantViralProducts(
  productType?: string,
  description?: string,
  limit: number = 5
): Promise<ViralContext[]> {
  const supabase = await createClient();

  const { data: allProducts } = await supabase
    .from('viral_products')
    .select('name, url, description, product_type, category, tags, analysis_json');

  if (!allProducts || allProducts.length === 0) return [];

  const scored = allProducts.map((p) => {
    let score = 0;

    if (productType && p.product_type === productType) score += 3;

    if (description && p.tags) {
      const descWords = description.toLowerCase().split(/\s+/);
      const tagMatches = (p.tags as string[]).filter((tag) =>
        descWords.some((w) => w.includes(tag) || tag.includes(w))
      ).length;
      score += Math.min(tagMatches * 2, 6);
    }

    score += Math.random() * 0.5;

    return { ...p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ name, url, description, analysis_json }) => ({
    name,
    url,
    description,
    analysis_json: analysis_json as Record<string, any>,
  }));
}

export function formatViralContext(products: ViralContext[]): string {
  if (products.length === 0) return '';

  const sections = products.map((p) => {
    const a = p.analysis_json;
    return `--- ${p.name} (${p.url}) ---
What it does: ${p.description}
Why it went viral: ${a.why_it_went_viral}
Growth channels: ${a.growth_channels?.join(', ')}
Design patterns: ${a.design_patterns?.join(', ')}
Monetization: ${a.monetization_model}
Lessons for indie founders: ${a.lessons_for_indie_founders?.join('; ')}
Distribution hacks: ${a.distribution_hacks?.join(', ')}
Pivot potential: ${a.pivot_potential}`;
  });

  return sections.join('\n\n');
}
