import styled from '@emotion/styled';

export const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  padding: 22px 40px;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    justify-content: center;
  }
`;
