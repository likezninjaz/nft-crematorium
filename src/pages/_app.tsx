import App from 'next/app';

import { Layout } from 'components';
import { ThemeProvider } from 'styled';
import { withAuth } from 'hocs';

class EnhancedApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
}

export default withAuth(EnhancedApp);
