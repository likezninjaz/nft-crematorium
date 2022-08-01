import { Global, css } from '@emotion/react';

type TFonts = {
  path?: string;
};

export const GlobalFontStyles = ({ path = '' }: TFonts) => (
  <Global
    styles={css`
      @font-face {
        font-family: 'Satoshi';
        src: url(${`${path}/fonts/Satoshi-Regular.ttf`}) format('opentype');
        font-weight: normal;
      }

      @font-face {
        font-family: 'Satoshi-Light';
        src: url(${`${path}/fonts/Satoshi-Light.ttf`}) format('opentype');
        font-weight: 400;
      }

      @font-face {
        font-family: 'Satoshi-Medium';
        src: url(${`${path}/fonts/Satoshi-Medium.ttf`}) format('opentype');
        font-weight: 500;
      }

      @font-face {
        font-family: 'Satoshi-Bold';
        src: url(${`${path}/fonts/Satoshi-Bold.ttf`}) format('opentype');
        font-weight: 700;
      }
    `}
  />
);
