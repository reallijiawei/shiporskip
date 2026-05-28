import Link from 'next/link';
import { Ship } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Ship className="h-5 w-5" />
            <span className="font-semibold">ShipOrSkip</span>
          </div>

          <p className="text-sm text-gray-500">
            Brutally validate your indie product idea before you waste weeks building it.
          </p>

          <div className="flex gap-6">
            <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">
              Dashboard
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} ShipOrSkip. Not for VC pitch decks. Not for vague startup theory.
        </div>
      </div>
    </footer>
  );
}
