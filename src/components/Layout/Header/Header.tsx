import Link from 'next/link';
import { useRouter } from 'next/router';

import { Typography } from 'components';
import { useAuth } from 'hooks';
import { HOME_PAGE_ROUTE } from 'routes';
import { truncateHash } from 'utils';

import { Logo, StyledHeader } from './Header.styled';

export const Header = () => {
  const { pathname } = useRouter();
  const { account } = useAuth();

  return (
    <StyledHeader>
      {pathname === HOME_PAGE_ROUTE ? (
        <Logo src="/logo.svg" />
      ) : (
        <Link href={HOME_PAGE_ROUTE}>
          <Logo isLink src="/logo.svg" />
        </Link>
      )}
      {account && (
        <div>
          <Typography>{truncateHash(account)}</Typography>
        </div>
      )}
    </StyledHeader>
  );
};
