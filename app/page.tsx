import Hero from '@/components/Hero';
import PricingTable from '@/components/PricingTable';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Hero />

      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Stop asking friends if your idea is good. They will be polite. We won&apos;t.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Describe your idea',
                description: 'Tell us what you want to build. The more detail, the better the roast.',
              },
              {
                step: '2',
                title: 'Get a brutal verdict',
                description: 'Our AI evaluates your idea with founder-inspired critique lenses and market signals.',
              },
              {
                step: '3',
                title: 'Validate or kill it',
                description: 'Get a 7-day validation sprint plan. Build it if it passes. Kill it if it doesn\'t.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">What you get</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { text: 'A clear Build / Skip / Validate First verdict', included: true },
              { text: 'Founder-inspired critique lenses', included: true },
              { text: 'Market signal checks', included: true },
              { text: 'Failure pattern detection', included: true },
              { text: 'A 7-day validation sprint', included: true },
              { text: 'Launch angles for Reddit, X, Product Hunt, and SEO', included: true },
              { text: 'Vague startup theory', included: false },
              { text: 'VC pitch deck advice', included: false },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                {item.included ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
                <span className={item.included ? 'text-gray-700' : 'text-gray-400 line-through'}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <PricingTable />
      </section>

      <section className="border-t bg-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-12 space-y-8">
            {[
              {
                question: 'Who is this for?',
                answer:
                  'Solo founders, indie hackers, and makers building micro-SaaS, AI tools, directories, content sites, Chrome extensions, and small online products.',
              },
              {
                question: 'Who is this NOT for?',
                answer:
                  'VC-backed startups, offline businesses, hardware, biotech, or anyone looking for a business plan generator.',
              },
              {
                question: 'Is the AI actually accurate?',
                answer:
                  'It gives you a structured framework to evaluate your idea. It\'s not perfect, but it\'s better than asking your friends who will just say "sounds cool!"',
              },
              {
                question: 'Can I get a refund?',
                answer:
                  'Yes, if you\'re not satisfied with your Deep Report, contact us within 7 days for a full refund.',
              },
            ].map((faq) => (
              <div key={faq.question}>
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/idea/new"
              className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white hover:bg-gray-800"
            >
              Validate Your Idea Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
