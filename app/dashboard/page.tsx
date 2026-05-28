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
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              View your validated ideas and reports.
            </p>
          </div>
          <Link
            href="/idea/new"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            New Idea
          </Link>
        </div>

        <div className="mt-8">
          {ideas && ideas.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Idea
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Verdict
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {ideas.map((idea) => {
                    const report = idea.reports?.[0];
                    return (
                      <tr key={idea.id}>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{idea.title}</p>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                            {idea.description}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          {report?.verdict ? (
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getVerdictColor(report.verdict)}`}
                            >
                              {getVerdictLabel(report.verdict)}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {report?.overall_score ? (
                            <span className="font-semibold">{report.overall_score}</span>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 capitalize">{idea.status}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(idea.created_at)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {report ? (
                            <Link
                              href={`/report/${report.id}`}
                              className="text-sm font-medium text-gray-900 hover:text-gray-700"
                            >
                              View Report →
                            </Link>
                          ) : (
                            <span className="text-sm text-gray-400">No report</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 py-12 text-center">
              <p className="text-gray-500">No ideas yet. Start by validating your first idea!</p>
              <Link
                href="/idea/new"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
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
