import { LaunchAngles as LaunchAnglesType } from '@/types/report';
import { MessageSquare, Search, Trophy } from 'lucide-react';

interface LaunchAnglesProps {
  angles: LaunchAnglesType;
}

export default function LaunchAngles({ angles }: LaunchAnglesProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">Launch Angles</h3>
      <p className="mt-1 text-sm text-gray-500">
        Ready-to-use copy for your launch channels.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Reddit */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-orange-500" />
            <h4 className="text-sm font-semibold text-gray-700">Reddit Posts</h4>
          </div>
          <ul className="space-y-2">
            {angles.reddit.map((post, i) => (
              <li key={i} className="text-sm text-gray-600">
                {post}
              </li>
            ))}
          </ul>
        </div>

        {/* X/Twitter */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm text-blue-500">𝕏</span>
            <h4 className="text-sm font-semibold text-gray-700">X Posts</h4>
          </div>
          <ul className="space-y-2">
            {angles.x_posts.map((post, i) => (
              <li key={i} className="text-sm text-gray-600">
                {post}
              </li>
            ))}
          </ul>
        </div>

        {/* SEO Pages */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Search className="h-4 w-4 text-green-500" />
            <h4 className="text-sm font-semibold text-gray-700">SEO Pages</h4>
          </div>
          <ul className="space-y-2">
            {angles.seo_pages.map((page, i) => (
              <li key={i} className="text-sm text-gray-600">
                {page}
              </li>
            ))}
          </ul>
        </div>

        {/* Product Hunt */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-red-500" />
            <h4 className="text-sm font-semibold text-gray-700">Product Hunt Tagline</h4>
          </div>
          <p className="text-sm font-medium text-gray-800">
            {angles.product_hunt_tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
