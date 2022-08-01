import Link from 'next/link';
import { useCallback } from 'react';
import { useMedia } from 'react-use';

import { Button, Img } from 'components';
import { truncateHash } from 'utils';
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
      <Link href="/">
        <Logo>
          <Img
            src="/logo.svg"
            imageStyle={{ width: isMobile ? 60 : 160, objectFit: 'contain' }}
          />
        </Logo>
      </Link>
      <RightPane>
        <Button
          onClick={handleClickConnectWallet}
          buttonStyle={{ opacity: account ? 0.5 : 1 }}
        >
          {account ? truncateHash(account) : 'Connect Wallet'}
        </Button>
      </RightPane>
    </StyledHeader>
  );
};
