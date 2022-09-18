import styled from '@emotion/styled';

import { Typography } from 'components';

export const StyledHome = styled.div<{ hasFooter: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: auto;
  padding: 0 20px;
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
  margin: 20px 0 50px;
`;

export const NftsItem = styled.div<{ selected?: boolean }>`
  position: relative;
  margin: 10px;
  width: 350px;
  height: 400px;
  box-shadow: ${({ selected }) =>
    selected ? 'rgba(0, 0, 0, 0.2) 0px 0px 10px' : 'none'};
  background-color: ${({ theme }) => theme.colors.white};
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 100%;
    height: 400px;
  }
`;

export const ImageWrapper = styled.div<{ selected: boolean }>`
  position: relative;
  overflow: hidden;
  height: 350px;

  img {
    transition: all 0.3s ease;
    filter: ${({ selected }) =>
      selected ? 'grayscale(0)' : 'grayscale(100%)'};

    &:hover {
      transition: all 0.3s ease;
      transform: scale(1.05);
    }
  }

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
