import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - ShipOrSkip',
  description: 'The terms that govern your use of ShipOrSkip idea validation reports and related services.',
};

const UPDATED_AT = 'June 4, 2026';

const SECTIONS = [
  {
    title: 'Using ShipOrSkip',
    body: [
      'ShipOrSkip provides AI-assisted product idea validation, report generation, scoring, objection analysis, expert thinking-framework lenses, winner-pattern suggestions, and related dashboard features.',
      'You must use the service only for lawful purposes and only if you are allowed to enter into these Terms.',
      'You are responsible for the accuracy, legality, and permissions of the information you submit.',
    ],
  },
  {
    title: 'Accounts and security',
    body: [
      'You may need an account to generate, save, or view reports.',
      'You are responsible for maintaining access to your login method and for activity under your account.',
      'Tell us if you believe your account has been compromised.',
    ],
  },
  {
    title: 'Your content',
    body: [
      'You keep ownership of the product ideas, prompts, notes, and other content you submit.',
      'You grant ShipOrSkip a limited license to host, process, transmit, display, and analyze your content as needed to provide, secure, support, and improve the service.',
      'Do not submit content that infringes someone else\'s rights, violates law, contains regulated sensitive data, or includes secrets you are not authorized to share.',
    ],
  },
  {
    title: 'Reports and AI outputs',
    body: [
      'Reports are generated with AI and structured analysis systems. They may contain mistakes, omissions, outdated assumptions, or recommendations that do not fit your situation.',
      'ShipOrSkip does not guarantee business success, revenue, investment returns, product-market fit, search traffic, conversion rates, or user growth.',
      'Reports are for product validation and decision support only. They are not legal, financial, investment, tax, medical, or professional advice.',
      'References to named founders, operators, investors, or public figures describe thinking-framework models built from public materials. They do not imply endorsement, sponsorship, involvement, or approval by those people.',
    ],
  },
  {
    title: 'Payments, subscriptions, and credits',
    body: [
      'Paid plans, one-time reports, subscriptions, credits, quotas, and usage limits are shown in the product or checkout flow.',
      'Payments are handled by third-party payment processors. You authorize applicable charges when you purchase a paid plan or report.',
      'Subscription plans may renew until cancelled. Cancellation stops future renewals but does not automatically refund past charges unless required by law or explicitly stated at checkout.',
      'We may change pricing, plan limits, or included features for future billing periods with notice where required.',
    ],
  },
  {
    title: 'Acceptable use',
    body: [
      'Do not use ShipOrSkip to break the law, infringe rights, generate harmful content, attack the service, reverse engineer private systems, overload infrastructure, scrape at scale, bypass quotas, or abuse payments.',
      'Do not rely on ShipOrSkip for regulated or high-stakes decisions without qualified human review.',
      'Do not submit personal data about other people unless you have the right to do so.',
    ],
  },
  {
    title: 'ShipOrSkip intellectual property',
    body: [
      'The website, software, report structure, scoring logic, prompts, design, branding, and service content are owned by ShipOrSkip or its licensors.',
      'You may use your generated reports for your own product evaluation, internal planning, and business decision-making.',
      'You may not copy, resell, clone, or commercially exploit the service itself without permission.',
    ],
  },
  {
    title: 'Third-party services',
    body: [
      'ShipOrSkip depends on third-party services for hosting, authentication, database, analytics, payment processing, AI model processing, and other infrastructure.',
      'Those third-party services may have their own terms and privacy practices. ShipOrSkip is not responsible for third-party services outside our control.',
    ],
  },
  {
    title: 'Service changes and availability',
    body: [
      'We may modify, pause, or discontinue features as the product changes.',
      'We try to keep the service available, but we do not guarantee uninterrupted access, error-free reports, or permanent storage of every generated output.',
    ],
  },
  {
    title: 'Termination',
    body: [
      'You may stop using ShipOrSkip at any time.',
      'We may suspend or terminate access if you violate these Terms, create risk for the service, abuse payments or quotas, or use the product unlawfully.',
    ],
  },
  {
    title: 'Disclaimers',
    body: [
      'ShipOrSkip is provided as is and as available, without warranties of any kind to the extent permitted by law.',
      'We disclaim implied warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, availability, and reliability.',
    ],
  },
  {
    title: 'Limitation of liability',
    body: [
      'To the maximum extent permitted by law, ShipOrSkip will not be liable for lost profits, lost revenue, lost data, business interruption, or indirect, incidental, consequential, special, exemplary, or punitive damages.',
      'To the maximum extent permitted by law, our total liability for any claim related to the service is limited to the amount you paid to ShipOrSkip in the 3 months before the claim, or 100 USD if you paid nothing.',
    ],
  },
  {
    title: 'Governing law and disputes',
    body: [
      'These Terms are governed by the laws of the jurisdiction where the ShipOrSkip operator is established, unless mandatory consumer law requires otherwise.',
      'Before starting a formal dispute, you agree to contact us and try to resolve the issue informally.',
    ],
  },
  {
    title: 'Changes and contact',
    body: [
      'We may update these Terms as the product, pricing, or legal requirements change. The updated date above shows when this page was last revised.',
      'For questions about these Terms, contact us at contact@shiporskip.org.',
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-foreground/10 bg-card/45 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="pill-accent">Terms</span>
          <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-foreground sm:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            These Terms govern your use of ShipOrSkip, including idea validation,
            AI-generated reports, paid plans, and dashboard features.
          </p>
          <p className="mt-5 text-sm font-bold uppercase text-muted">Last updated: {UPDATED_AT}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:px-6 lg:px-8">
          <div className="shell-panel p-6">
            <p className="text-sm leading-7 text-muted">
              By accessing or using ShipOrSkip, you agree to these Terms. If you
              do not agree, do not use the service.
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
            <h2 className="font-display text-2xl font-black">Privacy</h2>
            <p className="mt-3 text-sm leading-7 text-background/65">
              Our Privacy Policy explains how we collect, process, and protect
              information submitted through ShipOrSkip.
            </p>
            <Link
              href="/privacy"
              className="mt-5 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-black text-white transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              Read Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
