import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-signature') || '';

    // Verify webhook signature using HMAC-SHA256
    const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (webhookSecret) {
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(webhookSecret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
      const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      if (signature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(body);
    const eventName = payload.meta?.event_name;

    if (eventName === 'order_created') {
      const orderId = payload.data?.id;
      const userId = payload.data?.attributes?.custom_data?.user_id;
      const ideaId = payload.data?.attributes?.custom_data?.idea_id;
      const amount = payload.data?.attributes?.total;

      if (!userId) {
        return NextResponse.json({ error: 'Missing user_id in custom_data' }, { status: 400 });
      }

      const supabase = await createClient();

      // Record the payment
      await supabase.from('payments').insert({
        user_id: userId,
        lemonsqueezy_order_id: orderId,
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
        // Add 1 deep_validation and 1 launch_kit credit
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
