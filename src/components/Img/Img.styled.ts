import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { TEmotionProps } from '@types';
import { getComponentStyle } from 'utils';

export const StyledImg = styled.img<{ imageStyle?: TEmotionProps }>`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${({ theme, imageStyle }) => getComponentStyle(imageStyle, { theme })};
`;

const pulse = keyframes`
	0% {
		opacity: 0;
	}
	
	50% {
		background: 0.7;
	}

  100% {
		background: 0;
	}
`;

export const Loader = styled.div<{
  imageStyle?: TEmotionProps;
  hasPlaceholder: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: opacity 0.3s ease-out;
  background: ${({ theme }) => theme.colors.black};
  animation: ${pulse} 2s linear infinite;
`;

export const Placeholder = styled.div<{
  imageStyle?: TEmotionProps;
  hasPlaceholder: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${({ hasPlaceholder }) =>
    hasPlaceholder ? "url('./nft.png') center no-repeat" : 'none'};
  background-size: 20%;
`;
