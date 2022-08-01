export const getAbsoluteUrl = (url: string) =>
  url.includes('http') ? url : `https://${url}`;
