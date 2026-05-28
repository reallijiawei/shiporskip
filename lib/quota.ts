import { createClient } from './supabase-server';

export async function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export async function getOrCreateQuota(userId: string) {
  const supabase = await createClient();
  const month = getCurrentMonth();

  const { data: existing } = await supabase
    .from('usage_quotas')
    .select('*')
    .eq('user_id', userId)
    .eq('month', month)
    .single();

  if (existing) return existing;

  const { data: created } = await supabase
    .from('usage_quotas')
    .insert({
      user_id: userId,
      month,
      basic_roast_limit: 3,
      basic_roast_used: 0,
      deep_validation_limit: 0,
      deep_validation_used: 0,
      launch_kit_limit: 0,
      launch_kit_used: 0,
    })
    .select()
    .single();

  return created;
}

export async function checkQuota(userId: string, type: 'basic_roast' | 'deep_validation' | 'launch_kit') {
  const quota = await getOrCreateQuota(userId);
  if (!quota) return { allowed: false, remaining: 0 };

  const limitKey = `${type}_limit` as keyof typeof quota;
  const usedKey = `${type}_used` as keyof typeof quota;

  const limit = quota[limitKey] as number;
  const used = quota[usedKey] as number;

  return {
    allowed: used < limit,
    remaining: Math.max(0, limit - used),
  };
}

export async function incrementUsage(userId: string, type: 'basic_roast' | 'deep_validation' | 'launch_kit') {
  const supabase = await createClient();
  const month = getCurrentMonth();
  const usedKey = `${type}_used`;

  await supabase.rpc('increment_quota', {
    p_user_id: userId,
    p_month: month,
    p_field: usedKey,
  });
}
