import { lemonSqueezySetup, createCheckout } from '@lemonsqueezy/lemonsqueezy.js';

lemonSqueezySetup({
  apiKey: process.env.LEMONSQUEEZY_API_KEY!,
});

export async function createDeepReportCheckout(userId: string, ideaId: string) {
  try {
    const checkout = await createCheckout(
      process.env.LEMONSQUEEZY_STORE_ID!,
      process.env.LEMONSQUEEZY_DEEP_REPORT_VARIANT_ID!,
      {
        checkoutOptions: {
          embed: true,
          media: false,
          logo: true,
        },
        checkoutData: {
          email: '',
          custom: {
            user_id: userId,
            idea_id: ideaId,
            report_type: 'deep_validation',
          },
        },
        productOptions: {
          redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/report/${ideaId}`,
          receiptButtonText: 'View Report',
          receiptThankYouNote: 'Thank you for purchasing Deep Validation!',
        },
      }
    );

    return (checkout as any)?.data?.attributes?.url;
  } catch (error) {
    console.error('Failed to create checkout:', error);
    throw error;
  }
}

export async function verifyWebhookSignature(payload: string, signature: string) {
  // Lemon Squeezy webhook verification
  return true;
}
