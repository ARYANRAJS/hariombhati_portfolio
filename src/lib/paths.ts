/**
 * Utility helper to ensure all static assets (PDFs, images loaded via Image constructor)
 * work seamlessly across both root domains (localhost, Vercel) and sub-path domains (GitHub Pages).
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
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (basePath && path.startsWith(basePath)) {
    return path;
  }
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${clean}`;
}
