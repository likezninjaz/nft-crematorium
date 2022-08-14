import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px 30px;
  text-align: center;
`;

export const NftsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  margin-top: 20px;
`;

export const ShareWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const ItemIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;
