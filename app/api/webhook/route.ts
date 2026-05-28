import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { verifyWebhookSignature } from '@/lib/creem';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('creem-signature') || '';

    // Verify webhook signature
    const webhookSecret = process.env.CREEM_WEBHOOK_SECRET;
    if (webhookSecret) {
      const valid = verifyWebhookSignature(body, signature, webhookSecret);
      if (!valid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(body);
    const eventType = payload.eventType;

    if (eventType === 'checkout.completed') {
      const order = payload.object?.order;
      const metadata = payload.object?.subscription?.metadata || payload.object?.metadata || {};
      const userId = metadata.user_id;
      const ideaId = metadata.idea_id;
      const orderId = order?.id;
      const amount = order?.amount;

      if (!userId) {
        return NextResponse.json({ error: 'Missing user_id in metadata' }, { status: 400 });
      }

      const supabase = await createClient();

      // Record the payment
      await supabase.from('payments').insert({
        user_id: userId,
        creem_order_id: orderId,
        amount: amount || 900,
        currency: 'usd',
        status: 'paid',
      });

      // Get or create current month's quota
      const now = new Date();
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

      const { data: existingQuota } = await supabase
        .from('usage_quotas')
        .select('*')
        .eq('user_id', userId)
        .eq('month', month)
        .single();

      if (existingQuota) {
        await supabase
          .from('usage_quotas')
          .update({
            deep_validation_limit: existingQuota.deep_validation_limit + 1,
            launch_kit_limit: existingQuota.launch_kit_limit + 1,
          })
          .eq('id', existingQuota.id);
      } else {
        await supabase.from('usage_quotas').insert({
          user_id: userId,
          month,
          basic_roast_limit: 3,
          basic_roast_used: 0,
          deep_validation_limit: 1,
          deep_validation_used: 0,
          launch_kit_limit: 1,
          launch_kit_used: 0,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
