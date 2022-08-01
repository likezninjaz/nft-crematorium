import { dayjs } from './dayjs';

export const getTimeFromNow = (from: Date) => {
  const now = dayjs();
  const date = dayjs(from);
  const diff = date.diff(now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    ended: diff < 0,
  };
};
