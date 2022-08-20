import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { TEmotionProps } from '@types';
import { getComponentStyle } from 'utils';

const rotate = keyframes`
	from {
		transform: rotate(0);
	}
	
	to {
		transform: rotate(360deg);
	}
`;

export const StyledLoader = styled.div<{ loaderStyle?: TEmotionProps }>`
  width: 50px;
  height: 50px;
  margin: auto;
  border: 3px solid ${({ theme }) => theme.colors.gray};
  border-left: 3px solid ${({ theme }) => theme.colors.black};
  border-radius: 50%;
  animation: ${rotate} 0.5s linear infinite;

  ${({ theme, loaderStyle }) => getComponentStyle(loaderStyle, { theme })};
`;
