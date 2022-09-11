import styled from '@emotion/styled';
import { animated } from 'react-spring';

import { TEmotionProps } from '@types';
import { getComponentStyle } from 'utils';

export const StyledLayout = styled(animated.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div<{ contentStyle?: TEmotionProps }>`
  flex: 1 0 auto;
  margin-top: 80px;

  ${({ theme, contentStyle }) => getComponentStyle(contentStyle, { theme })};
`;

export const Background = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0.02;
`;
