import styled from '@emotion/styled';

import { Typography } from 'components';

export const StyledHome = styled.div<{ hasFooter: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: auto;
  padding: ${({ hasFooter }) => (hasFooter ? '0 20px 100px' : '0 20px')};
  text-align: center;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: ${({ hasFooter }) => (hasFooter ? '0 5px 150px' : '0 5px')};
  }
`;

export const Introducing = styled(Typography)`
  margin-top: 45px;
  color: ${({ theme }) => theme.colors.grayLight};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.media.tablet}) {
    margin-top: 21px;
  }
`;

export const NftsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const NftsItem = styled.div<{ selected?: boolean }>`
  position: relative;
  margin: 10px;
  width: 250px;
  height: 300px;
  border-radius: 4px;
  opacity: ${({ selected }) => (selected ? 1 : 0.4)};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 100%;
    height: 400px;
  }
`;

export const ImageWrapper = styled.div<{ selected: boolean }>`
  position: relative;
  overflow: hidden;
  height: 250px;
  box-shadow: ${({ selected }) =>
    selected ? 'rgb(0 0 0 / 8%) 0px 4px 15px' : 'none'};

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    height: 350px;
  }
`;

export const BurnWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px 2px rgb(34 36 38 / 12%);

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    flex-direction: column;

    & button {
      margin-top: 20px;
    }
  }
`;
