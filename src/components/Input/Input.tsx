import {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
} from 'react';

import { TEmotionProps } from '@types';

import { StyledInput } from './Input.styled';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  inputStyle?: TEmotionProps;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ onChange, disabled, ...rest }, ref) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (!disabled && onChange) {
          onChange(e);
        }
      },
      [disabled, onChange]
    );

    return (
      <StyledInput
        {...{ ...rest, ref }}
        disabled={disabled}
        onChange={handleChange}
      />
    );
  }
);
