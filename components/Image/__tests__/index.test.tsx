import * as React from 'react';
import { Image } from '../index';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';

describe('components/Image/index tests', () => {
  it('should render correctly without errors', async () => {
    const { findByAltText } = renderWithProviders(<Image alt="hello" />);

    expect(await findByAltText('hello')).not.toBe(null);
  });
});
