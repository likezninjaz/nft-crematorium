import { useCallback, useRef, useState } from 'react';
import { useTransition } from 'react-spring';

import { useClickOutside } from 'hooks';
import { Icon } from 'components';

import {
  NavigationButton,
  NavigationItem,
  NavigationMenu,
  StyledNavigation,
} from './Navigation.styled';

const NAV_ITEMS = [
  {
    text: 'About',
    href: 'https://*',
    icon: <Icon size="sm" icon="warning" viewBox="0 0 62 62" />,
  },
  {
    text: 'Telegram',
    href: 'https://t.me/*',
    icon: <Icon size="sm" icon="telegram" />,
  },
  {
    text: 'Twitter',
    href: 'https://twitter.com/*',
    icon: <Icon size="sm" icon="twitter" />,
  },
  {
    text: 'Contract',
    href: `https://etherscan.io/token/${process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS}`,
    icon: <Icon size="sm" icon="contract" />,
  },
];

export const Navigation = () => {
  const [isExpanded, setExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>();
  const navRef = useRef<HTMLDivElement>();

  const transition = useTransition(isExpanded, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const handleClose = useCallback(() => {
    setExpanded(false);
  }, []);

  useClickOutside(handleClose, navRef, menuRef);

  return (
    <StyledNavigation
      ref={navRef}
      onClick={() => setExpanded(prevState => !prevState)}
    >
      <NavigationButton />
      {transition(
        (style, item) =>
          item && (
            <NavigationMenu ref={menuRef} {...{ style }}>
              {NAV_ITEMS.map(item => (
                <a key={item.href} href={item.href} target="_blank">
                  <NavigationItem>
                    <div>{item.text}</div>
                    {item.icon}
                  </NavigationItem>
                </a>
              ))}
            </NavigationMenu>
          )
      )}
    </StyledNavigation>
  );
};
