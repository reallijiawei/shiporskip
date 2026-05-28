import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-signature') || '';

    // TODO: Verify Lemon Squeezy webhook signature
    // const isValid = await verifyWebhookSignature(body, signature);
    // if (!isValid) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    const event = JSON.parse(body);
    const supabase = await createClient();

    if (event.meta?.event_name === 'order_created') {
      const { custom } = event.data?.attributes?.checkout_data || {};
      const userId = custom?.user_id;
      const ideaId = custom?.idea_id;

      if (userId) {
        await supabase.from('payments').insert({
          user_id: userId,
          lemonsqueezy_order_id: event.data?.id,
          amount: event.data?.attributes?.total,
          currency: event.data?.attributes?.currency,
          status: 'pending',
        });
      }
    }

    if (event.meta?.event_name === 'order_paid') {
      const orderId = event.data?.id;

      const { data: payment } = await supabase
        .from('payments')
        .select('*')
        .eq('lemonsqueezy_order_id', orderId)
        .single();

      if (payment) {
        await supabase
          .from('payments')
          .update({ status: 'paid' })
          .eq('id', payment.id);

        await supabase
          .from('users')
          .update({ plan: 'deep' })
          .eq('id', payment.user_id);

        const { data: quota } = await supabase
          .from('usage_quotas')
          .select('*')
          .eq('user_id', payment.user_id)
          .single();

        if (quota) {
          await supabase
            .from('usage_quotas')
            .update({ deep_validation_limit: 1 })
            .eq('id', quota.id);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
