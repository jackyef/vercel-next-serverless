import React from 'react';
import App from 'next/app';
import {
  ThemeProvider,
  CSSReset,
  theme,
  ColorModeProvider,
} from '@chakra-ui/core';
import { Global } from '@emotion/core';
import mainStyles from '../styles/main';
import { AuthProvider } from '../context/Auth';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Global styles={mainStyles} />
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ColorModeProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
