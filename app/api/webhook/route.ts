import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-service';
import { verifyWebhookSignature } from '@/lib/creem';
import { getCurrentMonth } from '@/lib/quota';

const PLAN_LIMITS: Record<string, { basic_roast: number; deep_validation: number }> = {
  starter: { basic_roast: 10, deep_validation: 4 },
  pro: { basic_roast: 30, deep_validation: 10 },
};

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
    const supabase = createServiceClient();

    if (eventType === 'checkout.completed') {
      // Single deep validation purchase ($3)
      const metadata = payload.object?.metadata || {};
      const userId = metadata.user_id;

      if (!userId) {
        return NextResponse.json({ error: 'Missing user_id in metadata' }, { status: 400 });
      }

      const order = payload.object?.order;
      const orderId = order?.id;
      const amount = order?.amount;

      // Record the payment
      await supabase.from('payments').insert({
        user_id: userId,
        creem_order_id: orderId,
        amount: amount || 300,
        currency: 'usd',
        status: 'paid',
      });

      // Add +1 deep_validation credit
      const month = getCurrentMonth();
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
          })
          .eq('id', existingQuota.id);
      } else {
        await supabase.from('usage_quotas').insert({
          user_id: userId,
          month,
          basic_roast_limit: 5,
          basic_roast_used: 0,
          deep_validation_limit: 1,
          deep_validation_used: 0,
        });
      }
    }

    if (eventType === 'subscription.created') {
      // Subscription checkout ($9/mo or $21/mo)
      const metadata = payload.object?.metadata || {};
      const userId = metadata.user_id;
      const plan = metadata.plan; // 'starter' or 'pro'

      if (!userId || !plan) {
        return NextResponse.json({ error: 'Missing user_id or plan in metadata' }, { status: 400 });
      }

      const limits = PLAN_LIMITS[plan];
      if (!limits) {
        return NextResponse.json({ error: `Unknown plan: ${plan}` }, { status: 400 });
      }

      // Record the payment
      const order = payload.object?.order;
      await supabase.from('payments').insert({
        user_id: userId,
        creem_order_id: order?.id,
        amount: order?.amount || (plan === 'starter' ? 900 : 2100),
        currency: 'usd',
        status: 'paid',
      });

      // Update user's plan
      await supabase
        .from('users')
        .update({ plan })
        .eq('id', userId);

      // Create or update quota for current month
      const month = getCurrentMonth();
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
            basic_roast_limit: limits.basic_roast,
            deep_validation_limit: limits.deep_validation,
          })
          .eq('id', existingQuota.id);
      } else {
        await supabase.from('usage_quotas').insert({
          user_id: userId,
          month,
          basic_roast_limit: limits.basic_roast,
          basic_roast_used: 0,
          deep_validation_limit: limits.deep_validation,
          deep_validation_used: 0,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
