const CDN_URL = process.env.NODE_ENV === 'production'
  ? 'https://theantijobboard.b-cdn.net'
  : '';

export function cdn(path: string): string {
  return `${CDN_URL}${path}`;
}
