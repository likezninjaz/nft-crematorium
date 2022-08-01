import { Theme, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { TEmotionProps } from '@types';
import { getComponentStyle } from 'utils';

import { TButtonSize, TButtonVariant } from './Button';

type TStyledButton = {
  size?: TButtonSize;
  variant?: TButtonVariant;
  isLoading: boolean;
  disabled: boolean;
  buttonStyle?: TEmotionProps;
};

const getButtonPadding = (size: TButtonSize) => {
  if (size === 'sm') return '12px';
  return '14px';
};

const getButtonBackground = (
  disabled: boolean,
  variant: TButtonVariant,
  theme: Theme
) => {
  if (disabled) return theme.colors.black;
  return theme.colors.black;
};

const getButtonHoverBackground = (
  disabled: boolean,
  variant: TButtonVariant,
  theme: Theme
) => {
  if (disabled) return theme.colors.black;
  return 'rgba(0, 0, 0, 0.7)';
};

const getButtonHoverColor = (
  disabled: boolean,
  variant: TButtonVariant,
  theme: Theme
) => {
  if (disabled) return theme.colors.white;
  return theme.colors.white;
};

const getButtonColor = (variant: TButtonVariant, theme: Theme) => {
  if (variant === 'secondary') return theme.colors.white;
  return theme.colors.white;
};

const rotate = keyframes`
	from {
		transform: rotate(0);
	}
	
	to {
		transform: rotate(360deg);
	}
`;

export const StyledButton = styled.button<TStyledButton>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 58px;
  min-width: 150px;
  padding: ${({ size }) => getButtonPadding(size)};
  background: ${({ variant, theme, disabled }) =>
    getButtonBackground(disabled, variant, theme)};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 12px;
  line-height: 16px;
  color: ${({ variant, theme, isLoading }) =>
    !isLoading ? getButtonColor(variant, theme) : 'transparent'};
  ${({ theme }) => theme.typography.button};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled, isLoading }) =>
    disabled || isLoading ? 'not-allowed' : 'pointer'};
  transition: color 0.3s ease-out, background 0.3s ease-out;
  outline: none;
  white-space: nowrap;

  &:hover {
    background: ${({ disabled, variant, theme }) =>
      getButtonHoverBackground(disabled, variant, theme)};
    color: ${({ disabled, variant, theme, isLoading }) =>
      !isLoading
        ? getButtonHoverColor(disabled, variant, theme)
        : 'transparent'};
  }

  &:after {
    content: '';
    position: absolute;
    visibility: ${({ isLoading }) => (isLoading ? 'visible' : 'hidden')};
    top: calc(50% - 10px);
    left: calc(50% - 10px);
    width: 20px;
    height: 20px;
    margin: auto;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-left: 1px solid ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    animation: ${rotate} 0.5s linear infinite;
  }

  ${({ theme, buttonStyle }) => getComponentStyle(buttonStyle, { theme })};
`;
