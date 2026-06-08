import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support - ShipOrSkip',
  description:
    'Contact ShipOrSkip support for help with reports, billing, refunds, subscription cancellation, and account questions.',
};

const SUPPORT_EMAIL = 'support@shiporskip.org';

const SUPPORT_TOPICS = [
  {
    title: 'Product help',
    body: 'Questions about idea reports, score breakdowns, deep validations, dashboard access, or report delivery.',
  },
  {
    title: 'Billing and refunds',
    body: 'Questions about charges, invoices, payment receipts, refund requests, failed checkout, or plan credits.',
  },
  {
    title: 'Subscription cancellation',
    body: 'Subscription customers can cancel through the Creem customer portal link in the payment receipt. If you cannot access it, email support and we will help.',
  },
  {
    title: 'Privacy and account requests',
    body: 'Requests to access, correct, export, or delete account and report data, subject to legal and security recordkeeping requirements.',
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-foreground/10 bg-card/45 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="pill-accent">Support</span>
          <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-foreground sm:text-6xl">
            Customer Support
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            Need help with ShipOrSkip reports, billing, refunds, subscriptions, or account access?
            Email us and include the account email plus any relevant order or report details.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-[8px] border border-foreground/10 bg-foreground p-6 text-background">
            <h2 className="font-display text-2xl font-black">Support email</h2>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-3 inline-flex break-all font-display text-3xl font-black text-accent sm:text-4xl"
            >
              {SUPPORT_EMAIL}
            </a>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/65">
              We aim to respond to customer support requests within 3 business days.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {SUPPORT_TOPICS.map((topic) => (
              <article key={topic.title} className="shell-panel p-6">
                <h2 className="font-display text-xl font-black text-foreground">{topic.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{topic.body}</p>
              </article>
            ))}
          </div>

          <div className="shell-panel p-6">
            <h2 className="font-display text-2xl font-black text-foreground">Before you pay</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              ShipOrSkip sells digital idea-validation reports and monthly report credits for
              indie product builders. Pricing is shown on the public pricing page before checkout.
              Reports are AI-assisted decision support and do not guarantee revenue, traffic,
              product-market fit, or business success.
            </p>
            <Link
              href="/pricing"
              className="mt-5 inline-flex rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-black text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/5"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
