import { SyntheticEvent } from 'react';
import styled from '@emotion/styled';

import { TEmotionProps } from '@types';
import { getComponentStyle } from 'utils';

import { EIconType, TIconSize } from './types';

type TStyledIcon = {
  size: TIconSize;
  iconType: EIconType;
  svgColor: string;
  onClick?: (e: SyntheticEvent<SVGSVGElement>) => void;
  iconStyle?: TEmotionProps;
};

const getIconSize = (size: TIconSize) => {
  if (size === 'lg') return '30px';
  if (size === 'sm') return '14px';
  return '24px';
};

export const StyledIcon = styled.svg<TStyledIcon>`
  width: ${({ size }) => getIconSize(size)};
  min-width: ${({ size }) => getIconSize(size)};
  fill: ${({ iconType, svgColor }) =>
    [EIconType.fill, EIconType.fillAndStroke].includes(iconType)
      ? svgColor
      : 'none'};
  stroke: ${({ iconType, svgColor }) =>
    [EIconType.stroke, EIconType.fillAndStroke].includes(iconType)
      ? svgColor
      : 'none'};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'inherit')};

  ${({ theme, iconStyle }) => getComponentStyle(iconStyle, { theme })}
`;
