import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { checkQuota } from '@/lib/quota';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [basic, deep, userProfile] = await Promise.all([
      checkQuota(user.id, 'basic_roast'),
      checkQuota(user.id, 'deep_validation'),
      supabase.from('users').select('plan').eq('id', user.id).single(),
    ]);

    return NextResponse.json({
      plan: userProfile?.data?.plan || 'free',
      basic_roast_remaining: basic.remaining,
      deep_validation_remaining: deep.remaining,
    });
  } catch (error) {
    console.error('Quota API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
