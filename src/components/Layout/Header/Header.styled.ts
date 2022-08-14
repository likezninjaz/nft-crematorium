import styled from '@emotion/styled';

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 100px;
  width: 100%;
  padding: 28px 16px;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 28px 28px 56px;
  }
`;

export const Logo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
`;

export const RightPane = styled.div`
  display: flex;
  align-items: center;
`;
