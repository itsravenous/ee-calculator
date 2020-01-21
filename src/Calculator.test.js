import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Calculator} from './Calculator';

it('displays initial value of zero', () => {
  const {getByLabelText} = render(<Calculator />);
  expect(getByLabelText('Value').value).toBe('0');
});

it('has functioning number buttons', () => {
  const {getByLabelText, getByText} = render(<Calculator />);
  for (let i = 0; i <= 9; i++) {
    fireEvent.click(getByText(String(i)));
  }
  expect(getByLabelText('Value').value).toBe('0123456789');
});
