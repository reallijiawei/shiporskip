import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { formatDate, getVerdictColor, getVerdictLabel } from '@/lib/utils';
import { Plus } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirectTo=/dashboard');
  }

  const { data: ideas } = await supabase
    .from('ideas')
    .select(`
      *,
      reports (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground">
              Dashboard
            </h1>
            <p className="mt-2 text-muted">
              Your validated ideas and reports.
            </p>
          </div>
          <Link
            href="/idea/new"
            className="inline-flex items-center gap-2 bg-accent px-5 py-2.5 text-sm font-bold tracking-tight text-white transition-transform hover:scale-105 hover:bg-accent-hover"
          >
            <Plus className="h-4 w-4" />
            New Idea
          </Link>
        </div>

        <div className="mt-10">
          {ideas && ideas.length > 0 ? (
            <div className="space-y-4">
              {ideas.map((idea) => {
                const report = idea.reports?.[0];
                return (
                  <Link
                    key={idea.id}
                    href={report ? `/report/${report.id}` : '#'}
                    className="group block border-2 border-foreground/10 bg-card p-5 transition-all hover:border-foreground/25 hover:shadow-[4px_4px_0_0_rgba(13,13,13,0.1)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg font-bold text-foreground truncate">
                          {idea.title}
                        </p>
                        <p className="mt-1 text-sm text-muted line-clamp-1">
                          {idea.description}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-4">
                        {report?.verdict ? (
                          <span
                            className={`pill-accent ${getVerdictColor(report.verdict)}`}
                          >
                            {getVerdictLabel(report.verdict)}
                          </span>
                        ) : null}

                        {report?.overall_score ? (
                          <span className="font-display text-2xl font-extrabold text-foreground">
                            {report.overall_score}
                          </span>
                        ) : null}

                        <span className="text-xs text-muted">
                          {formatDate(idea.created_at)}
                        </span>

                        {report ? (
                          <span className="text-sm font-medium text-foreground/50 transition-colors group-hover:text-accent">
                            View →
                          </span>
                        ) : (
                          <span className="text-sm text-muted">No report</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="border-2 border-dashed border-foreground/15 py-16 text-center">
              <p className="font-display text-2xl font-bold text-foreground/20">No ideas yet</p>
              <p className="mt-2 text-muted">Start by validating your first idea!</p>
              <Link
                href="/idea/new"
                className="mt-6 inline-flex items-center gap-2 bg-accent px-5 py-2.5 text-sm font-bold tracking-tight text-white transition-transform hover:scale-105 hover:bg-accent-hover"
              >
                <Plus className="h-4 w-4" />
                Validate Your First Idea
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
