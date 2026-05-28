'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Ship, CheckCircle, XCircle } from 'lucide-react';
import { Suspense } from 'react';

function CallbackContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || searchParams.get('redirectTo') || '/dashboard';

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.exchangeCodeForSession(window.location.search).then(({ error }) => {
      if (error) {
        setStatus('error');
      } else {
        setStatus('success');
        setTimeout(() => router.push(next), 2000);
      }
    });
  }, []);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <Ship className="mx-auto h-10 w-10 text-gray-900" />

        {status === 'loading' && (
          <>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Confirming your email...</h2>
            <p className="mt-2 text-sm text-gray-500">Please wait a moment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="mx-auto mt-4 h-8 w-8 text-green-600" />
            <h2 className="mt-2 text-xl font-semibold text-gray-900">Email confirmed!</h2>
            <p className="mt-2 text-sm text-gray-500">
              Your account is activated. Redirecting to dashboard...
            </p>
            <button
              onClick={() => router.push(next)}
              className="mt-4 text-sm font-medium text-gray-900 underline hover:text-gray-700"
            >
              Go now
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="mx-auto mt-4 h-8 w-8 text-red-600" />
            <h2 className="mt-2 text-xl font-semibold text-gray-900">Confirmation failed</h2>
            <p className="mt-2 text-sm text-gray-500">
              The link may have expired. Please try logging in or sign up again.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <CallbackContent />
    </Suspense>
  );
}
