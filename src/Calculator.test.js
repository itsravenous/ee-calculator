import React from 'react';
import {render, fireEvent, act} from '@testing-library/react';
import {Calculator} from './Calculator';

const renderCalculator = () => {
  const renderResult = render(<Calculator />);

  const clickCalculatorButton = text =>
    act(() => {
      fireEvent.click(renderResult.getByText(text));
    });
  const clickCalculatorEqualsButton = () =>
    fireEvent.click(renderResult.getByText('='));
  const getCalculatorValue = () => renderResult.getByLabelText('Value').value;

  return {
    ...renderResult,
    clickCalculatorButton,
    clickCalculatorEqualsButton,
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
  {operator: '+', values: [2, 5], result: 7},
  {operator: '+', values: [2, 5, 8], result: 15},
  {operator: '+', values: [2, 5, 8, 10], result: 25},
  {operator: '+', values: [1000, 999, 27654, 256], result: 29909},

  {operator: '-', values: [60, 2], result: 58},
  {operator: '-', values: [30, 40], result: -10},
  {operator: '-', values: [100, 7, 52], result: 41},
  {operator: '-', values: [4320, 1050, 101, 547], result: 2622},

  {operator: '×', values: [4, 2], result: 8},
  {operator: '×', values: [10, 10], result: 100},
  {operator: '×', values: [3, 2, 4], result: 24},
  {operator: '×', values: [1024, 2, 48, 16], result: 1572864},

  {operator: '÷', values: [9, 3], result: 3},
  {operator: '÷', values: [256, 10], result: 25.6},
  {operator: '÷', values: [3, 2, 2], result: 0.75},
  {operator: '÷', values: [10000, 2, 10, 4], result: 125},
];

problems.forEach(problem => {
  const problemString = problem.values.join(problem.operator);

  it(`calculates ${problemString}`, () => {
    const {
      clickCalculatorButton,
      clickCalculatorEqualsButton,
      getCalculatorValue,
    } = renderCalculator();

    problem.values.forEach((value, i) => {
      String(value)
        .split('')
        .forEach(digit => clickCalculatorButton(digit));

      const isLastValue = i === problem.values.length - 1;
      if (isLastValue) {
        clickCalculatorEqualsButton();
      } else {
        clickCalculatorButton(problem.operator);
      }
    });

    expect(getCalculatorValue()).toBe(String(problem.result));
  });
});

it('calculates a problem with multiple operators', () => {
  const {
    clickCalculatorButton,
    clickCalculatorEqualsButton,
    getCalculatorValue,
  } = renderCalculator();
  clickCalculatorButton('2');
  clickCalculatorButton('+');
  clickCalculatorButton('6');
  clickCalculatorButton('×');
  clickCalculatorButton('4');
  clickCalculatorButton('-');
  clickCalculatorButton('5');
  clickCalculatorButton('÷');
  clickCalculatorButton('3');
  clickCalculatorEqualsButton();

  expect(getCalculatorValue()).toBe('9');
});
