import { createClient } from './supabase-server';

const DEV_EMAILS = ['jiaweili19960@gmail.com'];

export function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

const PLAN_LIMITS: Record<string, { basic_roast: number; deep_validation: number }> = {
  free: { basic_roast: 5, deep_validation: 0 },
  starter: { basic_roast: 10, deep_validation: 4 },
  pro: { basic_roast: 30, deep_validation: 10 },
};

function getPlanLimits(plan: string) {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.free;
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

  // Look up user's plan
  const { data: user } = await supabase
    .from('users')
    .select('plan')
    .eq('id', userId)
    .single();

  const plan = user?.plan || 'free';
  const limits = getPlanLimits(plan);

  const { data: created } = await supabase
    .from('usage_quotas')
    .insert({
      user_id: userId,
      month,
      basic_roast_limit: limits.basic_roast,
      basic_roast_used: 0,
      deep_validation_limit: limits.deep_validation,
      deep_validation_used: 0,
    })
    .select()
    .single();

  return created;
}

export async function checkQuota(userId: string, type: 'basic_roast' | 'deep_validation') {
  // Dev bypass
  const supabase = await createClient();
  const { data: user } = await supabase.from('users').select('email').eq('id', userId).single();
  if (user?.email && DEV_EMAILS.includes(user.email)) {
    return { allowed: true, remaining: 999 };
  }

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

export async function incrementUsage(userId: string, type: 'basic_roast' | 'deep_validation') {
  const supabase = await createClient();
  const month = getCurrentMonth();
  const usedKey = `${type}_used`;

  await supabase.rpc('increment_quota', {
    p_user_id: userId,
    p_month: month,
    p_field: usedKey,
  });
}
