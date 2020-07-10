import React from 'react';
import App from 'next/app';
import {
  ThemeProvider,
  CSSReset,
  theme,
  ColorModeProvider,
  useColorMode,
  Flex,
} from '@chakra-ui/core';
import { Global } from '@emotion/core';
import mainStyles from '../styles/main';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Global styles={mainStyles} />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
