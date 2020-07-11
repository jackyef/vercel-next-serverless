import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, theme } from '@chakra-ui/core';

export const renderWithProviders = (Comp: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {Comp}
    </ThemeProvider>,
  );
};
