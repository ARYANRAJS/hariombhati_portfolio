/**
 * Utility helper to ensure all static assets (PDFs, images loaded via Image constructor)
 * work seamlessly across both root domains (localhost, Vercel) and sub-path domains (GitHub Pages).
 * Detects both build-time NEXT_PUBLIC_BASE_PATH and client-side runtime pathname.
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

  let basePath = '';
  if (typeof window !== 'undefined' && window.location?.pathname?.startsWith('/hariombhati_portfolio')) {
    basePath = '/hariombhati_portfolio';
  } else {
    basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  }

  if (basePath && path.startsWith(basePath)) {
    return path;
  }
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${clean}`;
}
