import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ThemeProvider } from 'styled-components';
import AppProvider from '../hooks';
import GlobalStyle from '../styles/global';
import '../styles/plyr.css';
import theme from '../styles/theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ReactQueryCacheProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
          <ToastContainer autoClose={4000} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryCacheProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default MyApp;
