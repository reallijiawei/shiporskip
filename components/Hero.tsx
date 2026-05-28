import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Validate your indie product idea{' '}
            <span className="text-gray-500">before you waste weeks building it.</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Most people will tell you your idea sounds interesting. We tell you whether it&apos;s
            worth building. Get a brutal Build / Skip / Validate First verdict with market signals
            and failure pattern detection.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/idea/new"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800"
            >
              Validate Your Idea
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="text-base font-semibold text-gray-600 hover:text-gray-900"
            >
              How it works →
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-gray-500">Try an example:</span>
            {[
              'AI habit tracker for smokers',
              'Directory of one-time purchase software',
              'Chrome extension for saving Reddit posts',
            ].map((example) => (
              <Link
                key={example}
                href={`/idea/new?example=${encodeURIComponent(example)}`}
                className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              >
                {example}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
