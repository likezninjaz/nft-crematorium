import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px 30px;
  margin-bottom: 60px;
  text-align: center;
`;

export const NftsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  margin-top: 20px;
`;

export const NftsItem = styled.div`
  position: relative;
  margin: 10px;
  width: 250px;
  height: 300px;
  border-radius: 4px;

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
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px 2px rgb(34 36 38 / 12%);
`;
