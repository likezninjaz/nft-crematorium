import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <title>NFT Crematorium</title>
          <meta name="title" content="NFT Crematorium" />
          <meta name="description" content="NFT Crematorium" />
          <meta property="og:title" content="NFT Crematorium" />
          <meta property="og:description" content="NFT Crematorium" />
          <meta property="og:url" content="https://*" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://*" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://*" />
          <meta property="twitter:title" content="NFT Crematorium" />
          <meta property="twitter:description" content="NFT Crematorium" />
          <meta property="twitter:image" content="https://*" />
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
