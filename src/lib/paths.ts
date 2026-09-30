/**
 * Utility helper to ensure all static assets (PDFs, images loaded via Image constructor)
 * work seamlessly across both root domains (localhost, Vercel) and sub-path domains (GitHub Pages).
 * Detects build-time GITHUB_PAGES, NEXT_PUBLIC_BASE_PATH, and client-side runtime pathname.
 */
export function getAssetPath(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('data:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  const isGitHubPages =
    process.env.GITHUB_PAGES === 'true' ||
    process.env.NEXT_PUBLIC_BASE_PATH === '/hariombhati_portfolio' ||
    (typeof window !== 'undefined' && window.location?.pathname?.startsWith('/hariombhati_portfolio'));

  const basePath = isGitHubPages ? '/hariombhati_portfolio' : (process.env.NEXT_PUBLIC_BASE_PATH || '');

  if (basePath && path.startsWith(basePath)) {
    return path;
  }
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${clean}`;
}
