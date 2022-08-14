import styled from '@emotion/styled';
import { animated } from 'react-spring';

export const Overlay = styled(animated.div)`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const StyledModal = styled.div<{
  withCloseIcon: boolean;
  maxWidth: string;
}>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: ${({ maxWidth }) => maxWidth || '550px'};
  padding-top: ${({ withCloseIcon }) => (withCloseIcon ? 40 : 0)}px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.05);
`;

export const BodyWrapper = styled.div`
  max-height: 70vh;
  overflow-y: auto;
`;

export const Body = styled.div`
  padding: 0 24px;
`;
