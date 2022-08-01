import { css } from '@emotion/react';

export const typography = {
  h1: css`
    font-family: Satoshi-Bold;
    font-style: normal;
    font-weight: 700;
    font-size: 44px;
    line-height: 48px;
  `,
  h2: css`
    font-family: Satoshi-Bold;
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
  `,
  text: css`
    font-family: Satoshi;
    font-style: normal;
    font-size: 18px;
    line-height: 1.5;
    font-weight: 400;

    b {
      font-family: Satoshi-Bold;
      font-weight: 700;
    }
  `,
  text2: css`
    font-family: Satoshi;
    font-style: normal;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;

    b {
      font-family: Satoshi-Bold;
      font-weight: 700;
    }
  `,
  button: css`
    font-family: Satoshi-Medium;
    font-style: normal;
    font-size: 16px;
    font-weight: 500;
  `,
  link: css`
    font-family: Satoshi-Bold;
    font-style: normal;
    font-size: 18px;
    line-height: 1.5;
    font-weight: 700;
  `,
  tiny: css`
    font-family: Satoshi-Medium;
    font-style: normal;
    font-size: 14px;
    line-height: 1.5;
    font-weight: 500;
  `,
};
