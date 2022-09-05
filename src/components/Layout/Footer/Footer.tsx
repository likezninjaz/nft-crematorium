import Link from 'next/link';

import { TERMS_PAGE_ROUTE } from 'routes';

import { Copyright, StyledFooter } from './Footer.styled';

export const Footer = () => (
  <StyledFooter>
    <Copyright>© 2022 NFT Crematorium</Copyright>
    <Link href={TERMS_PAGE_ROUTE}>Terms of Service</Link>
  </StyledFooter>
);
