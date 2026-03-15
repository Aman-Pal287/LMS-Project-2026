const defaultEndpoint = 'https://ik.imagekit.io/demo';

export function getImageKitVideoUrl(path: string): string {
  const endpoint = (process.env.IMAGEKIT_URL_ENDPOINT || defaultEndpoint).replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${endpoint}${cleanPath}`;
}
