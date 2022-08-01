import { ElementType, HTMLAttributes, forwardRef } from 'react';

import { TEmotionProps } from '@types';

import { StyledTypography } from './Typography.styled';

export type TTypographyVariant =
  | 'h1'
  | 'h2'
  | 'text'
  | 'text2'
  | 'button'
  | 'link'
  | 'tiny';

interface ITypography extends HTMLAttributes<HTMLElement> {
  variant?: TTypographyVariant;
  tag?: ElementType;
  typographyStyle?: TEmotionProps;
}

export const Typography = forwardRef<HTMLDivElement, ITypography>(
  ({ children, variant = 'text', tag = 'div', ...rest }, ref) => (
    <StyledTypography as={tag} {...{ ...rest, ref, variant }}>
      {children}
    </StyledTypography>
  )
);
