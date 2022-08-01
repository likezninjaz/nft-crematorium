import styled from '@emotion/styled';

import { TEmotionProps } from '@types';
import { getComponentStyle } from 'utils';

type TStyledInput = {
  disabled: boolean;
  inputStyle?: TEmotionProps;
};

export const StyledInput = styled.input<TStyledInput>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  min-width: 150px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  font-size: 16px;
  line-height: 20px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: color 0.3s ease-out, background 0.3s ease-out;
  outline: none;
  white-space: nowrap;
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.black};
  }

  ${({ theme, inputStyle }) => getComponentStyle(inputStyle, { theme })};
`;
