import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import {
  ThemeProvider,
  CSSReset,
  theme,
  ColorModeProvider,
} from '@chakra-ui/core';
import { Global } from '@emotion/core';
import mainStyles from '../styles/main';
import { AuthProvider } from '../context/Auth';
import { NewsletterSubscriptionProvider } from '../context/NewsletterSubscription';
import { MetaTags } from '../components/Seo/MetaTags';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <MetaTags />
          <CSSReset />
          <Global styles={mainStyles} />
          <AuthProvider>
            <NewsletterSubscriptionProvider>
              <Component {...pageProps} />
            </NewsletterSubscriptionProvider>
          </AuthProvider>
        </ColorModeProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
