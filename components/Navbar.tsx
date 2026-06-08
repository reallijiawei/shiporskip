'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase';
import type { SupabaseClient, User } from '@supabase/supabase-js';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabaseRef = useRef<SupabaseClient | null>(null);

  function getSupabase() {
    if (!supabaseRef.current) {
      supabaseRef.current = createClient();
    }
    return supabaseRef.current;
  }

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await getSupabase().auth.signOut();
    router.push('/');
    router.refresh();
  }

  const navLinks = [
    { href: '/pricing', label: 'Pricing' },
    { href: '/support', label: 'Support' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-foreground text-sm font-black text-background">
            S
          </span>
          ShipOrSkip
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative text-sm font-medium transition-colors hover:text-foreground',
                pathname === link.href ? 'text-foreground' : 'text-muted'
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent" />
              )}
            </Link>
          ))}

          {user ? (
            <>
              <span className="max-w-[140px] truncate text-sm text-muted" title={user.email || ''}>
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={cn(
                'text-sm font-medium transition-colors hover:text-foreground',
                pathname === '/login' ? 'text-foreground' : 'text-muted'
              )}
            >
              Log In
            </Link>
          )}

          <Link
            href="/idea/new"
            className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-tight"
          >
            Validate Idea
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="btn-secondary grid h-10 w-10 place-items-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-foreground/10 bg-background/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'text-sm font-medium',
                  pathname === link.href ? 'text-foreground' : 'text-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <span className="text-sm text-muted">{user.email}</span>
                <button onClick={handleSignOut} className="text-left text-sm font-medium text-muted">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-muted">
                Log In
              </Link>
            )}
            <Link
              href="/idea/new"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-2 px-4 py-2 text-center text-sm font-bold"
            >
              Validate Idea
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
