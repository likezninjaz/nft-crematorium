import styled from '@emotion/styled';

import { TEmotionProps } from '@types';
import { getComponentStyle } from 'utils';

export const StyledImg = styled.img<{ imageStyle?: TEmotionProps }>`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${({ theme, imageStyle }) => getComponentStyle(imageStyle, { theme })};
`;

export const Placeholder = styled.div<{ imageStyle?: TEmotionProps }>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  ${({ theme, imageStyle }) => getComponentStyle(imageStyle, { theme })};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -50%;
    width: 50%;
    height: 100%;
  }
`;
