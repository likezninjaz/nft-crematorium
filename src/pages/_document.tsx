import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta name="title" content="NFT Crematorium" />
          <meta
            name="description"
            content="You don't know what to do with all those NFTs you bought? Cremate them! Don't worry because sooner or later they can be resurrected."
          />
          <meta property="og:title" content="NFT Crematorium" />
          <meta
            property="og:description"
            content="You don't know what to do with all those NFTs you bought? Cremate them! Don't worry because sooner or later they can be resurrected."
          />
          <meta property="og:url" content="https://www.nft-crematorium.com" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/logo.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://www.nft-crematorium.com"
          />
          <meta property="twitter:title" content="NFT Crematorium" />
          <meta
            property="twitter:description"
            content="You don't know what to do with all those NFTs you bought? Cremate them! Don't worry because sooner or later they can be resurrected."
          />
          <meta property="twitter:image" content="/logo.png" />
          <link rel="shortcut icon" href="/favicon.png" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_KEY}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_KEY}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
