import * as React from 'react';
import { Button } from '../index';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { act, fireEvent } from '@testing-library/react';

describe('components/Button/index tests', () => {
  it('should render correctly without errors', async () => {
    const { findByText } = renderWithProviders(<Button>Hello</Button>);

    expect(await findByText('Hello')).not.toBe(null);
  });

  it('should fire onClick when clicked', async () => {
    const mockFn = jest.fn();
    const { findByText } = renderWithProviders(<Button onClick={mockFn}>Hello</Button>);

    expect(mockFn).not.toHaveBeenCalled();

    await act(async () => {
      const button = await findByText('Hello');

      fireEvent.click(button);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
