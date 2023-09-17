import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import { initializeApollo } from '../libs/apolloClient'

if (process.env.NODE_ENV == 'development') {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
};


const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const apolloClient = initializeApollo();
  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}