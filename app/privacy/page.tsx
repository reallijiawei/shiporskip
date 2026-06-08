import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - ShipOrSkip',
  description: 'How ShipOrSkip collects, uses, protects, and processes data for idea validation reports.',
};

const UPDATED_AT = 'June 4, 2026';

const SECTIONS = [
  {
    title: 'Information we collect',
    body: [
      'Account information, such as your email address, authentication identifiers, subscription status, and basic account activity.',
      'Idea and report information, including the product idea, audience, monetization assumptions, distribution notes, generated analysis, saved reports, quotas, and related usage history.',
      'Payment information needed to manage checkout, subscription status, billing events, invoices, refunds where applicable, and fraud prevention. Payment card details are handled by our payment processor, not stored directly by ShipOrSkip.',
      'Usage, device, and diagnostic information, such as pages viewed, browser type, approximate location from network data, timestamps, referring pages, error logs, and analytics events.',
      'Support or communication information you choose to send us.',
    ],
  },
  {
    title: 'How we use information',
    body: [
      'Provide the ShipOrSkip product, including generating idea validation reports, saving dashboard history, enforcing quotas, and managing paid plans.',
      'Process payments, detect abuse, secure accounts, debug errors, and maintain service reliability.',
      'Improve the product experience, report quality, prompts, scoring, and winner-pattern recommendations.',
      'Measure product usage through analytics and understand which pages, plans, and flows are working.',
      'Comply with legal obligations, enforce our Terms, and respond to lawful requests.',
    ],
  },
  {
    title: 'AI processing',
    body: [
      'ShipOrSkip uses DeepSeek API as its current AI model provider for customer report generation. The production report model currently used is deepseek-v4-pro.',
      'Your submitted idea content, target audience, product type, monetization notes, distribution assumptions, and related report inputs may be sent to DeepSeek for processing so ShipOrSkip can generate the requested report.',
      'We may update the provider or model used for report generation as the product changes. If the production provider or model changes, we will update this disclosure.',
      'Do not submit passwords, API keys, trade secrets, confidential customer data, regulated health data, financial account data, or anything you are not authorized to share.',
      'AI outputs can be incomplete or wrong. Reports are structured decision support for product validation, not legal, financial, investment, medical, or professional advice.',
    ],
  },
  {
    title: 'Idea privacy',
    body: [
      'We do not sell your private idea submissions.',
      'We do not publish your private reports without your permission.',
      'We do not use your private submissions to create a public idea database for other users.',
      'We may use aggregated, de-identified, or operational data to understand product performance and improve ShipOrSkip.',
    ],
  },
  {
    title: 'Sharing and service providers',
    body: [
      'We share information with service providers that help run ShipOrSkip, including hosting, database, authentication, analytics, payment processing, AI processing, security, and support tools.',
      'We may disclose information if required by law, to protect rights and safety, to investigate abuse, or as part of a merger, acquisition, financing, or sale of assets.',
      'We do not authorize service providers to use your data for their own independent marketing purposes.',
    ],
  },
  {
    title: 'Cookies and analytics',
    body: [
      'ShipOrSkip uses cookies and similar technologies for login sessions, security, preferences, checkout, and analytics.',
      'We use Google Analytics to understand traffic and product usage. You can use browser controls, ad settings, or analytics opt-out tools to limit tracking where available.',
    ],
  },
  {
    title: 'Retention and deletion',
    body: [
      'We keep account, report, payment, and diagnostic information for as long as needed to provide the service, maintain records, enforce limits, resolve disputes, improve the product, and meet legal obligations.',
      'You may request deletion of your account or report data. We may retain limited records when required for security, fraud prevention, accounting, legal compliance, or backup integrity.',
    ],
  },
  {
    title: 'Your choices and rights',
    body: [
      'You can choose what idea information you submit, access your dashboard, and update account information through the product where supported.',
      'Depending on where you live, you may have rights to access, correct, delete, export, or object to certain processing of personal information.',
      'You can control cookies through your browser and can contact us to make a privacy request.',
    ],
  },
  {
    title: 'Security',
    body: [
      'We use reasonable technical and organizational measures to protect information, including access controls and service-provider safeguards.',
      'No online service is perfectly secure, so you should avoid submitting highly sensitive or confidential information.',
    ],
  },
  {
    title: 'Children',
    body: [
      'ShipOrSkip is not intended for children under 13, and we do not knowingly collect personal information from children under 13.',
    ],
  },
  {
    title: 'International use',
    body: [
      'Your information may be processed in countries other than where you live. Those countries may have different data protection laws.',
    ],
  },
  {
    title: 'Changes and contact',
    body: [
      'We may update this Privacy Policy as the product changes. The updated date above shows when this page was last revised.',
      'For privacy requests or customer support, contact us at support@shiporskip.org. We aim to respond within 3 business days.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-foreground/10 bg-card/45 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="pill-accent">Privacy</span>
          <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-foreground sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            This page explains what ShipOrSkip collects, how the idea-validation
            report works, and how we handle private idea submissions.
          </p>
          <p className="mt-5 text-sm font-bold uppercase text-muted">Last updated: {UPDATED_AT}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:px-6 lg:px-8">
          <div className="shell-panel p-6">
            <p className="text-sm leading-7 text-muted">
              ShipOrSkip helps founders pressure-test product ideas with AI-assisted
              scoring, expert thinking-framework analysis, winner-pattern matching,
              and report generation. This Privacy Policy applies to the website,
              dashboard, reports, checkout flows, and related services.
            </p>
          </div>

          {SECTIONS.map((section) => (
            <article key={section.title} className="shell-panel p-6">
              <h2 className="font-display text-2xl font-black text-foreground">
                {section.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {section.body.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-muted">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <div className="rounded-[8px] border border-foreground/10 bg-foreground p-6 text-background">
            <h2 className="font-display text-2xl font-black">Related terms</h2>
            <p className="mt-3 text-sm leading-7 text-background/65">
              The Privacy Policy should be read together with the ShipOrSkip Terms
              of Service.
            </p>
            <Link
              href="/terms"
              className="mt-5 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-black text-white transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              Read Terms of Service
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
