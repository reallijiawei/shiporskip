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
      return 'text-green-600 bg-green-50 border-green-200';
    case 'validate_first':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'skip':
    case 'too_crowded':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'pivot':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    default:
      return 'text-blue-600 bg-blue-50 border-blue-200';
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
