import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getVerdictColor(verdict: string) {
  switch (verdict) {
    case 'build_now':
      return 'text-green-700 bg-green-100 border-green-500';
    case 'validate_first':
      return 'text-yellow-700 bg-yellow-100 border-yellow-500';
    case 'skip':
    case 'too_crowded':
      return 'text-red-700 bg-red-100 border-red-500';
    case 'pivot':
      return 'text-orange-700 bg-orange-100 border-orange-500';
    default:
      return 'text-blue-700 bg-blue-100 border-blue-500';
  }
}

export function getVerdictLabel(verdict: string) {
  switch (verdict) {
    case 'build_now':
      return 'Build Now';
    case 'validate_first':
      return 'Validate First';
    case 'pivot':
      return 'Pivot';
    case 'skip':
      return 'Skip';
    case 'too_crowded':
      return 'Too Crowded';
    case 'good_seo_play':
      return 'Good SEO Play';
    case 'good_free_tool_bad_business':
      return 'Good Free Tool, Bad Business';
    case 'interesting_but_not_urgent':
      return 'Interesting, But Not Urgent';
    default:
      return verdict;
  }
}

export function getScoreColor(score: number) {
  if (score >= 8) return 'text-green-600';
  if (score >= 6) return 'text-yellow-600';
  if (score >= 4) return 'text-orange-600';
  return 'text-red-600';
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
