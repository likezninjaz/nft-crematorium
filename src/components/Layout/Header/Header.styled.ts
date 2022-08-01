import styled from '@emotion/styled';

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 28px 16px;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 28px 28px 56px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  cursor: pointer;
`;

export const RightPane = styled.div`
  display: flex;
  align-items: center;
`;
