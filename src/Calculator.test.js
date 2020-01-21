import React from 'react';
import {render, fireEvent, act} from '@testing-library/react';
import {Calculator} from './Calculator';

const renderCalculator = () => {
  const renderResult = render(<Calculator />);

  const clickCalculatorButton = text =>
    act(() => {
      fireEvent.click(renderResult.getByText(text));
    });
  const getCalculatorValue = () => renderResult.getByLabelText('Value').value;

  return {
    ...renderResult,
    clickCalculatorButton,
    getCalculatorValue,
  };
};

it('displays initial value of zero', () => {
  const {getCalculatorValue} = renderCalculator();
  expect(getCalculatorValue()).toBe('0');
});

it('has functioning number buttons', () => {
  const {clickCalculatorButton, getCalculatorValue} = renderCalculator();
  for (let i = 0; i <= 9; i++) {
    clickCalculatorButton(String(i));
  }
  expect(getCalculatorValue()).toBe('0123456789');
});

describe('addition', () => {
  it('can add two digits', () => {
    const {clickCalculatorButton, getCalculatorValue} = renderCalculator();
    clickCalculatorButton('2');
    clickCalculatorButton('+');
    clickCalculatorButton('5');
    clickCalculatorButton('=');

    expect(getCalculatorValue()).toBe('7');
  });

  it('can add two numbers', () => {
    const {clickCalculatorButton, getCalculatorValue} = renderCalculator();
    clickCalculatorButton('4');
    clickCalculatorButton('2');
    clickCalculatorButton('+');
    clickCalculatorButton('5');
    clickCalculatorButton('6');
    clickCalculatorButton('=');

    expect(getCalculatorValue()).toBe('98');
  });
});
