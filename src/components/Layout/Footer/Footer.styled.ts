import styled from '@emotion/styled';

export const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  padding: 15px 40px 5px;
  user-select: none;

  a {
    font-weight: bold;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    justify-content: center;
  }
`;
