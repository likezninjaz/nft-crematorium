import { CSSObject, Theme, css } from '@emotion/react';

import { colors, media, typography } from '../styled';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors;
    typography: typeof typography;
    media: typeof media;
  }
}

type TCssProps = CSSObject | ReturnType<typeof css>;

type TCssPropsFn = ({ theme }: { theme: Theme }) => TCssProps;

type TEmotionProps = TCssPropsFn | TCssProps;
