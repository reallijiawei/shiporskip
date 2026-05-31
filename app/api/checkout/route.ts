import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { createDeepReportCheckout, createSubscriptionCheckout } from '@/lib/creem';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, ideaId, plan } = body;

    if (type === 'starter' || type === 'pro') {
      // Subscription checkout
      const checkoutUrl = await createSubscriptionCheckout(user.id, type);
      if (!checkoutUrl) {
        return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
      }
      return NextResponse.json({ url: checkoutUrl });
    }

    // Single deep validation purchase
    if (!ideaId) {
      return NextResponse.json({ error: 'ideaId is required for single purchase' }, { status: 400 });
    }

    const { data: idea, error: ideaError } = await supabase
      .from('ideas')
      .select('id')
      .eq('id', ideaId)
      .eq('user_id', user.id)
      .single();

    if (ideaError || !idea) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
    }

    const checkoutUrl = await createDeepReportCheckout(user.id, ideaId);

    if (!checkoutUrl) {
      return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
