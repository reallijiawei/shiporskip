'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Ship } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Ship className="h-6 w-6" />
          ShipOrSkip
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/pricing"
            className={cn(
              'text-sm font-medium transition-colors hover:text-gray-900',
              pathname === '/pricing' ? 'text-gray-900' : 'text-gray-500'
            )}
          >
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className={cn(
              'text-sm font-medium transition-colors hover:text-gray-900',
              pathname === '/dashboard' ? 'text-gray-900' : 'text-gray-500'
            )}
          >
            Dashboard
          </Link>

          {user ? (
            <>
              <span className="max-w-[140px] truncate text-sm text-gray-500" title={user.email || ''}>
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={cn(
                'text-sm font-medium transition-colors hover:text-gray-900',
                pathname === '/login' ? 'text-gray-900' : 'text-gray-500'
              )}
            >
              Log In
            </Link>
          )}

          <Link
            href="/idea/new"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Validate Idea
          </Link>
        </div>
      </div>
    </nav>
  );
}
