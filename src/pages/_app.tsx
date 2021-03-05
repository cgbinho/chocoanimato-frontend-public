import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import AppProvider from '../hooks';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ReactQueryCacheProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import '../styles/plyr.css';

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
