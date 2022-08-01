import { Theme } from '@emotion/react';

import { TEmotionProps } from '@types';

export const getComponentStyle = (
  style: TEmotionProps | undefined,
  { theme, ...rest }: { theme: Theme } & Record<string, unknown>
) => {
  if (!style) return {};
  return typeof style === 'function' ? style({ theme, ...rest }) : style;
};
