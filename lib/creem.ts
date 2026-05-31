import { Creem } from 'creem';

let _creem: Creem | null = null;

function getCreem() {
  if (!_creem) {
    _creem = new Creem({
      apiKey: process.env.CREEM_API_KEY!,
      serverIdx: process.env.CREEM_API_KEY?.startsWith('creem_test_') ? 1 : 0,
    });
  }
  return _creem;
}

export default getCreem;

export async function createDeepReportCheckout(userId: string, ideaId: string) {
  const creem = getCreem();

  const checkout = await creem.checkouts.create({
    productId: process.env.CREEM_DEEP_REPORT_PRODUCT_ID!,
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/report/${ideaId}`,
    metadata: {
      user_id: userId,
      idea_id: ideaId,
      type: 'single',
    },
  });

  return checkout.checkoutUrl;
}

export async function createSubscriptionCheckout(userId: string, plan: 'starter' | 'pro') {
  const creem = getCreem();

  const productId = plan === 'starter'
    ? process.env.CREEM_STARTER_PRODUCT_ID!
    : process.env.CREEM_PRO_PRODUCT_ID!;

  const checkout = await creem.checkouts.create({
    productId,
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    metadata: {
      user_id: userId,
      plan,
      type: 'subscription',
    },
  });

  return checkout.checkoutUrl;
}

export function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const crypto = require('crypto');
  const computed = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return computed === signature;
}
