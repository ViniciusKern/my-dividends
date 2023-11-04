import Head from "next/head";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";

import "../app/globals.css";
import Layout from "../components/layout";

const queryClient = new QueryClient();

const unauthenticatedRoutes = ["/login", "/signup"];

function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  const isUnauthenticated = unauthenticatedRoutes.includes(router?.pathname);
  const head = (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>My Dividends</title>
    </Head>
  );

  let children;

  if (isUnauthenticated) {
    children = (
      <>
        <div>
          <Toaster />
        </div>
        {head}
        <Component {...pageProps} />
      </>
    );
  } else {
    children = (
      <Layout>
        <div>
          <Toaster />
        </div>
        {head}
        <Component {...pageProps} />
      </Layout>
    );
  }

  return (
    <SessionProvider session={session}>
      <MantineProvider
        theme={{
          colors: {
            "custom-green": [
              "#E6FCF5",
              "#C3FAE8",
              "#96F2D7",
              "#63E6BE",
              "#38D9A9",
              "#20C997",
              "#12B886",
              "#0CA678",
              "#099268",
              "#087F5B",
            ],
          },
          primaryColor: "custom-green",
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default App;
