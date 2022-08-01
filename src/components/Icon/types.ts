import { SyntheticEvent } from 'react';

import { TEmotionProps } from '@types';

import { icons } from './icons';

export type TIconSize = 'sm' | 'md' | 'lg';

export enum EIconType {
  stroke = 'stroke',
  fill = 'fill',
  fillAndStroke = 'fillAndStroke',
}

export type TIcon = {
  icon: keyof typeof icons;
  viewBox?: string;
  size?: TIconSize;
  color?: string;
  onClick?: (e: SyntheticEvent<SVGSVGElement>) => void;
  iconStyle?: TEmotionProps;
  className?: string;
};
