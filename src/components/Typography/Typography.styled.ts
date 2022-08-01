import styled from '@emotion/styled';

import { TEmotionProps } from '@types';
import { getComponentStyle } from 'utils';

import { TTypographyVariant } from './Typography';

type TStyledTypography = {
  variant: TTypographyVariant;
  typographyStyle?: TEmotionProps;
};

export const StyledTypography = styled.div<TStyledTypography>`
  ${({ theme, variant }) => theme.typography[variant]};
  ${({ theme, typographyStyle }) =>
    getComponentStyle(typographyStyle, { theme })};
`;
