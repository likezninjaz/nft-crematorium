export const chunk = <T = unknown>(array: T[], chunk: number) => {
  const res = [];

  for (let i = 0; i < array.length; i += chunk) {
    res.push(array.slice(i, i + chunk));
  }

  return res;
};
