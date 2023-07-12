import Head from 'next/head';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';

import '../app/globals.css';
import Layout from '../components/layout';

const queryClient = new QueryClient();

const unauthenticatedRoutes = ['/login', '/signup'];

function App({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {
  const isUnauthenticated = unauthenticatedRoutes.includes(router?.pathname);
  const head = (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>My Dividends</title>
    </Head>
  );

  let children;

  if (isUnauthenticated) {
    children = (
      <>
        <Notifications position='top-right' />
        {head}
        <Component {...pageProps} />
      </>
    );
  } else {
    children = (
      <Layout>
        <Notifications />
        {head}
        <Component {...pageProps} />
      </Layout>
    );
  }

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}

export default App;
