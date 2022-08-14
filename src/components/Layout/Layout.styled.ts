import styled from '@emotion/styled';
import { animated } from 'react-spring';

import { TEmotionProps } from '@types';
import { getComponentStyle } from 'utils';

export const StyledLayout = styled(animated.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100% - 20px);
`;

export const Content = styled.div<{ contentStyle?: TEmotionProps }>`
  flex: 1 0 auto;

  ${({ theme, contentStyle }) => getComponentStyle(contentStyle, { theme })};
`;
