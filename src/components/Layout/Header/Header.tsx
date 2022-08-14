import { useCallback } from 'react';
import { useMedia } from 'react-use';

import { Button, Img } from 'components';
import { media } from 'styled';
import { useAuth } from 'hooks';

import { Logo, RightPane, StyledHeader } from './Header.styled';

export const Header = () => {
  const { account, login, logout } = useAuth();
  const isMobile = useMedia(`(max-width: ${media.mobile})`);

  const handleClickConnectWallet = useCallback(
    async () => await (account ? logout() : login()),
    [account, login, logout]
  );

  return (
    <StyledHeader>
      <Logo>
        <Img src="/logo.svg" imageStyle={{ width: isMobile ? 160 : 260 }} />
      </Logo>
      <RightPane>
        {!account && (
          <Button
            onClick={handleClickConnectWallet}
            buttonStyle={{ opacity: account ? 0.5 : 1 }}
          >
            Connect Wallet
          </Button>
        )}
      </RightPane>
    </StyledHeader>
  );
};
