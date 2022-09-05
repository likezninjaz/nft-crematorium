import styled from '@emotion/styled';

export const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 auto;
  padding: 15px 40px;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

export const Copyright = styled.div`
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin-top: 20px;
  }
`;
