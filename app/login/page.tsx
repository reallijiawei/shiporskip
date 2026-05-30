'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { cn } from '@/lib/utils';

function LoginForm() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      router.push(redirectTo);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}` },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setSignupSuccess(true);
      setLoading(false);
    }
  }

  if (signupSuccess) {
    return (
      <div className="w-full max-w-md border-2 border-foreground/10 bg-card p-8 text-center">
        <span className="inline-block h-8 w-8 bg-accent" />
        <h2 className="mt-4 font-display text-2xl font-extrabold text-foreground">Check your email</h2>
        <p className="mt-2 text-sm text-muted">
          We sent a confirmation link to <strong className="text-foreground">{email}</strong>. Click the link to activate your account.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md border-2 border-foreground/10 bg-card p-8">
      <div className="text-center">
        <span className="inline-block h-8 w-8 bg-accent" />
        <h2 className="mt-4 font-display text-2xl font-extrabold text-foreground">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {mode === 'login' ? 'Sign in to validate your ideas' : 'Start validating your indie product ideas'}
        </p>
      </div>

      <div className="mt-6 flex border-2 border-foreground/10 p-1">
        {(['login', 'signup'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setError(''); }}
            className={cn(
              'flex-1 py-2 text-sm font-bold transition-colors',
              mode === m
                ? 'bg-foreground text-background'
                : 'text-muted hover:text-foreground'
            )}
          >
            {m === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 block w-full border-b-2 border-foreground/15 bg-transparent py-2.5 text-foreground focus:border-accent focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-muted">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 block w-full border-b-2 border-foreground/15 bg-transparent py-2.5 text-foreground focus:border-accent focus:outline-none"
            placeholder="At least 6 characters"
          />
        </div>

        {error && (
          <p className="border-l-4 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent py-3 text-sm font-bold tracking-tight text-white transition-all hover:bg-accent-hover hover:scale-[1.02] disabled:opacity-50"
        >
          {loading ? 'Loading...' : mode === 'login' ? 'Log In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="noise flex min-h-[60vh] items-center justify-center px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
