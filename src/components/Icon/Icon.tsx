import { forwardRef } from 'react';

import { icons } from './icons';
import { EIconType, TIcon } from './types';
import { StyledIcon } from './Icon.styled';

export const Icon = forwardRef<SVGSVGElement, TIcon>(
  (
    {
      icon,
      color: svgColor = 'currentColor',
      size = 'md',
      viewBox,
      ...rest
    }: TIcon,
    ref
  ) => {
    const { type: iconType = EIconType.fill, jsx } = icons[icon];

    return (
      <StyledIcon
        {...{ ref, size, iconType, svgColor, ...rest }}
        viewBox={viewBox || '0 0 24 24'}
      >
        {jsx}
      </StyledIcon>
    );
  }
);
