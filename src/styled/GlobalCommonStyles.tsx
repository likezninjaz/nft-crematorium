import { Global, Theme, css } from '@emotion/react';

type TGlobalCommonStyles = {
  theme: Theme;
};

export const GlobalCommonStyles = ({ theme }: TGlobalCommonStyles) => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      html,
      body,
      #__next {
        height: 100%;
      }

      body {
        font-family: 'Satoshi-Regular', Arial, 'sans-serif';
        font-size: 16px;
        color: ${theme.colors.primary};
        background-color: #f7f8fa;
      }

      input {
        font-family: 'Satoshi-Regular', Arial, 'sans-serif';
      }

      a {
        transition: color ease-out 0.3s;

        &:hover {
          color: ${theme.colors.secondary};
        }
      }

      .web3modal-modal-card {
        display: block !important;
        max-width: 500px !important;
      }
    `}
  />
);
