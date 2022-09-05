import styled from '@emotion/styled';

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  width: 100%;
  padding: 0 20px 0 10px;
  user-select: none;
  box-shadow: rgb(0 0 0 / 8%) 0px 4px 15px;
  background: ${({ theme }) => theme.colors.white};
  z-index: 2;
`;

export const Logo = styled.img<{ isLink?: boolean }>`
  height: 70px;
  width: 260px;
  object-fit: cover;
  cursor: ${({ isLink }) => (isLink ? 'pointer' : 'default')};
`;

export const RightPane = styled.div`
  display: flex;
  align-items: center;
`;
