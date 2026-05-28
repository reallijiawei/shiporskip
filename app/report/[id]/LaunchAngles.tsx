'use client';

import { useState } from 'react';
import { LaunchAngles as LaunchAnglesType } from '@/types/report';
import { Copy, Check } from 'lucide-react';

interface LaunchAnglesProps {
  angles: LaunchAnglesType;
}

export default function LaunchAngles({ angles }: LaunchAnglesProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyToClipboard = async (text: string, index: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">Launch Angles</h3>

      <div className="mt-6 space-y-6">
        {angles.product_hunt_tagline && (
          <div>
            <h4 className="text-sm font-medium text-gray-700">Product Hunt Tagline</h4>
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-gray-50 p-3">
              <p className="flex-1 text-gray-900">{angles.product_hunt_tagline}</p>
              <button
                onClick={() => copyToClipboard(angles.product_hunt_tagline, 'ph')}
                className="text-gray-400 hover:text-gray-600"
              >
                {copiedIndex === 'ph' ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        )}

        {angles.x_posts && angles.x_posts.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700">X (Twitter) Posts</h4>
            <div className="mt-2 space-y-2">
              {angles.x_posts.map((post, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
                  <p className="flex-1 text-sm text-gray-900">{post}</p>
                  <button
                    onClick={() => copyToClipboard(post, `x-${i}`)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {copiedIndex === `x-${i}` ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {angles.reddit && angles.reddit.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700">Reddit Posts</h4>
            <div className="mt-2 space-y-2">
              {angles.reddit.map((post, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
                  <p className="flex-1 text-sm text-gray-900">{post}</p>
                  <button
                    onClick={() => copyToClipboard(post, `reddit-${i}`)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {copiedIndex === `reddit-${i}` ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {angles.seo_pages && angles.seo_pages.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700">SEO Page Ideas</h4>
            <ul className="mt-2 space-y-1">
              {angles.seo_pages.map((page, i) => (
                <li key={i} className="text-sm text-gray-600">• {page}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
