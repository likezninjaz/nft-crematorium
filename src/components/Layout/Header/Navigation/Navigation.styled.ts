import styled from '@emotion/styled';
import { animated } from 'react-spring';

export const StyledNavigation = styled.div`
  position: relative;
  margin-left: 20px;
`;

export const NavigationButton = styled.div`
  width: 58px;
  height: 58px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.white};
  background-image: url('./dots.png');
  background-position: 50% 50%;
  background-size: 25px 25px;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray};
  }
`;

export const NavigationMenu = styled(animated.div)`
  position: absolute;
  right: 0;
  top: calc(100% + 12px);
  min-width: 162px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 4px 2px rgb(34 36 38 / 12%);
  user-select: none;
  z-index: 2;
`;

export const NavigationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grayLight};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
