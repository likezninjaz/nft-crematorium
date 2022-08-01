import styled from '@emotion/styled';

import { TEmotionProps } from '@types';
import { getComponentStyle } from 'utils';

export const StyledAlert = styled.div<{ alertStyle?: TEmotionProps }>`
  display: flex;

  ${({ theme, alertStyle }) => getComponentStyle(alertStyle, { theme })};
`;
