import { ButtonHTMLAttributes, forwardRef, useCallback } from 'react';

import { TEmotionProps } from '@types';

import { StyledButton } from './Button.styled';

export type TButtonVariant = 'primary' | 'secondary';

export type TButtonSize = 'sm' | 'md';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TButtonSize;
  isLoading?: boolean;
  variant?: TButtonVariant;
  buttonStyle?: TEmotionProps;
}

export const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    { size = 'md', variant = 'primary', isLoading, onClick, disabled, ...rest },
    ref
  ) => {
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isLoading && !disabled && onClick) {
          onClick(e);
        }
      },
      [disabled, isLoading, onClick]
    );

    return (
      <StyledButton
        {...{ ...rest, ref, size, variant }}
        isLoading={isLoading}
        disabled={disabled || isLoading}
        onClick={handleClick}
      />
    );
  }
);
