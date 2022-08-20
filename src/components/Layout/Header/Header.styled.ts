import styled from '@emotion/styled';

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  width: 100%;
  user-select: none;
  box-shadow: rgb(0 0 0 / 8%) 0px 4px 15px;
  background: ${({ theme }) => theme.colors.white};
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 28px 28px 56px;
  }
`;

export const Logo = styled.img`
  height: 70px;
  width: 260px;
  object-fit: cover;
`;

export const RightPane = styled.div`
  display: flex;
  align-items: center;
`;
