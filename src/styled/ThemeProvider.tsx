import { FC } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import { colors } from './colors';
import { typography } from './typography';
import { media } from './media';
import { GlobalResetStyles } from './GlobalResetStyles';
import { GlobalFontStyles } from './GlobalFontStyles';
import { GlobalCommonStyles } from './GlobalCommonStyles';

const theme = {
  colors,
  typography,
  media,
};

export const ThemeProvider: FC = ({ children }) => (
  <EmotionThemeProvider {...{ theme }}>
    <GlobalResetStyles />
    <GlobalFontStyles />
    <GlobalCommonStyles {...{ theme }} />
    {children}
  </EmotionThemeProvider>
);
