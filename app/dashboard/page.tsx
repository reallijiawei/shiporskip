import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { formatDate, getVerdictColor, getVerdictLabel } from '@/lib/utils';
import { Plus } from 'lucide-react';

const PLAN_LABELS: Record<string, string> = {
  free: 'Free',
  starter: 'Starter',
  pro: 'Pro',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirectTo=/dashboard');
  }

  // Fetch user plan and quota
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const [{ data: userProfile }, { data: quota }, { data: ideas }] = await Promise.all([
    supabase.from('users').select('plan').eq('id', user.id).single(),
    supabase.from('usage_quotas').select('*').eq('user_id', user.id).eq('month', month).single(),
    supabase
      .from('ideas')
      .select(`*, reports (*)`)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
  ]);

  const plan = userProfile?.plan || 'free';
  const basicRemaining = quota ? Math.max(0, quota.basic_roast_limit - quota.basic_roast_used) : 5;
  const basicLimit = quota?.basic_roast_limit ?? 5;
  const deepRemaining = quota ? Math.max(0, quota.deep_validation_limit - quota.deep_validation_used) : 0;
  const deepLimit = quota?.deep_validation_limit ?? 0;

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
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold tracking-tight"
          >
            <Plus className="h-4 w-4" />
            New Idea
          </Link>
        </div>

        {/* Quota bar */}
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="rounded-[8px] border border-foreground/10 bg-card/90 px-5 py-3 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Plan</span>
            <p className="mt-1 font-display text-lg font-extrabold text-foreground">
              {PLAN_LABELS[plan] || plan}
            </p>
          </div>
          <div className="rounded-[8px] border border-foreground/10 bg-card/90 px-5 py-3 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Basic Roasts</span>
            <p className="mt-1 font-display text-lg font-extrabold text-foreground">
              {basicRemaining}<span className="text-sm font-bold text-muted">/{basicLimit}</span>
              <span className="ml-1 text-xs text-muted">remaining</span>
            </p>
          </div>
          <div className="rounded-[8px] border border-foreground/10 bg-card/90 px-5 py-3 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Deep Validations</span>
            <p className="mt-1 font-display text-lg font-extrabold text-foreground">
              {deepRemaining}<span className="text-sm font-bold text-muted">/{deepLimit}</span>
              <span className="ml-1 text-xs text-muted">remaining</span>
            </p>
          </div>
          {plan === 'free' && (
            <Link
              href="/pricing"
              className="self-center rounded-full border border-foreground/20 px-4 py-2 text-xs font-bold text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/5"
            >
              Upgrade plan →
            </Link>
          )}
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
                    className="group block rounded-[8px] border border-foreground/10 bg-card/90 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-xl"
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
            <div className="rounded-[8px] border border-dashed border-foreground/20 bg-card/60 py-16 text-center">
              <p className="font-display text-2xl font-bold text-foreground/20">No ideas yet</p>
              <p className="mt-2 text-muted">Start by validating your first idea!</p>
              <Link
                href="/idea/new"
                className="btn-primary mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold tracking-tight"
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
