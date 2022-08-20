import { useCallback } from 'react';

import { Button } from 'components';
import { useAuth } from 'hooks';

import { Logo, RightPane, StyledHeader } from './Header.styled';

export const Header = () => {
  const { account, login, logout } = useAuth();

  const handleClickConnectWallet = useCallback(
    async () => await (account ? logout() : login()),
    [account, login, logout]
  );

  return (
    <StyledHeader>
      <Logo src="/logo.svg" />
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
