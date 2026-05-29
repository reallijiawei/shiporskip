import IdeaInput from '@/components/IdeaInput';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

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
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900">Validate Your Idea</h1>
          <p className="mt-2 text-gray-600">
            Describe your indie product idea and get a brutal, honest evaluation.
          </p>
        </div>

        <div className="mt-8">
          <IdeaInput initialExample={params.example} isLoggedIn={!!user} />
        </div>
      </div>
    </div>
  );
}
