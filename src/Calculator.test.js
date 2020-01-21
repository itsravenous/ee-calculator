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

it('clears the display when clear button clicked', () => {
  const {clickCalculatorButton, getCalculatorValue} = renderCalculator();
  clickCalculatorButton('1');
  clickCalculatorButton('2');
  clickCalculatorButton('C');
  expect(getCalculatorValue()).toBe('');
});

const problems = [
  {values: [2, 5], operator: '+', result: 7},
  {values: [2, 5, 8], operator: '+', result: 15},
  {values: [2, 5, 8, 10], operator: '+', result: 25},
  {values: [1000, 999, 27654, 256], operator: '+', result: 29909},
];

problems.forEach(problem => {
  const problemString = problem.values.join(problem.operator);

  it(`calculates ${problemString}`, () => {
    const {clickCalculatorButton, getCalculatorValue} = renderCalculator();

    problem.values.forEach((value, i) => {
      String(value)
        .split('')
        .forEach(digit => clickCalculatorButton(digit));

      const isLastValue = i === problem.values.length - 1;
      if (isLastValue) {
        clickCalculatorButton('=');
      } else {
        clickCalculatorButton(problem.operator);
      }
    });

    expect(getCalculatorValue()).toBe(String(problem.result));
  });
});
