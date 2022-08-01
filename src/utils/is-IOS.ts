export const isIOS = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
