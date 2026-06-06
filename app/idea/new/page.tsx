import IdeaInput from '@/components/IdeaInput';
import { createClient } from '@/lib/supabase-server';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Validate a Product Idea - ShipOrSkip',
  description:
    'Submit an indie product idea to ShipOrSkip and generate a build, skip, or validate-first report with score breakdown, objections, and improvement paths.',
  robots: {
    index: false,
    follow: true,
  },
};

interface NewIdeaPageProps {
  searchParams: Promise<{ example?: string }>;
}

export default async function NewIdeaPage({ searchParams }: NewIdeaPageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirectTo=/idea/new');
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="pill-accent">Idea intake</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Validate Your Idea
          </h1>
          <p className="mt-3 text-lg text-muted">
            Describe your indie product idea and get a brutal, honest evaluation.
          </p>
        </div>

        <div className="mt-10">
          <IdeaInput initialExample={params.example} isLoggedIn={!!user} />
        </div>
      </div>
    </div>
  );
}
