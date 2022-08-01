import Head from 'next/head';
import { SpringValues } from '@react-spring/core';
import { ReactNode, forwardRef } from 'react';

import { TEmotionProps } from '@types';

import { Header } from './Header';
import { Footer } from './Footer';
import { Content, StyledLayout } from './Layout.styled';

type TLayout = {
  withHeader?: boolean;
  withFooter?: boolean;
  layoutStyle?: SpringValues<{ transform: string }>;
  contentStyle?: TEmotionProps;
  children: ReactNode;
};

export const Layout = forwardRef<HTMLDivElement, TLayout>(
  (
    {
      withHeader = true,
      withFooter = true,
      layoutStyle,
      contentStyle,
      children,
    },
    ref
  ) => (
    <StyledLayout {...{ ref }} style={layoutStyle}>
      <Head>
        <title>NFT Crematorium</title>
      </Head>
      {withHeader && <Header />}
      <Content {...{ contentStyle }}>{children}</Content>
      {withFooter && <Footer />}
    </StyledLayout>
  )
);
