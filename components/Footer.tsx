import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-accent text-sm font-black text-white">
              S
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-background">
              ShipOrSkip
            </span>
          </div>

          <p className="max-w-md text-center text-sm text-background/45 sm:text-left">
            Brutally validate your indie product idea before you waste weeks building it.
          </p>

          <div className="flex gap-6">
            <Link href="/pricing" className="text-sm text-background/55 transition-colors hover:text-accent">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-sm text-background/55 transition-colors hover:text-accent">
              Dashboard
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-background/10 pt-6 text-center text-xs text-background/35">
          © {new Date().getFullYear()} ShipOrSkip. Not for VC pitch decks. Not for vague startup theory.
        </div>
      </div>
    </footer>
  );
}
