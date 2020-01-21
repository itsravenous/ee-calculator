import React, {useState} from 'react';
import './Calculator.css';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const Calculator = () => {
  const [leftValue, setLeftValue] = useState('0');
  const [rightValue, setRightValue] = useState();
  const [operator, setOperator] = useState();

  const handleNumberClick = number => {
    if (number === '0' && leftValue === '0') return;

    if (operator) {
      return setRightValue(`${rightValue || ''}${number}`);
    } else {
      return setLeftValue(`${leftValue}${number}`);
    }
  };

  const doProblem = () => {
    switch (operator) {
      case '+':
        setLeftValue(parseFloat(leftValue) + parseFloat(rightValue));
        break;
      case '-':
        setLeftValue(parseFloat(leftValue) - parseFloat(rightValue));
        break;
      case '*':
        setLeftValue(parseFloat(leftValue) * parseFloat(rightValue));
        break;
      case '/':
        setLeftValue(parseFloat(leftValue) / parseFloat(rightValue));
        break;
    }
    setOperator();
    setRightValue();
  };
  const handleOperatorClick = operator => {
    if (rightValue) {
      doProblem();
    }
    setOperator(operator);
  };

  const handleEqualsClick = () => {
    doProblem();
  };

  const handleClearClick = () => {
    setLeftValue();
    setRightValue();
    setOperator();
  };

  return (
    <>
      <label htmlFor="value">Value</label>
      <input
        id="value"
        value={(leftValue || '') + (operator || '') + (rightValue || '')}
      />
      {numbers.map(number => (
        <button key={number} onClick={() => handleNumberClick(number)}>
          {number}
        </button>
      ))}

      <button onClick={() => handleOperatorClick('+')}>+</button>
      <button onClick={() => handleOperatorClick('-')}>-</button>
      <button onClick={() => handleOperatorClick('*')}>×</button>
      <button onClick={() => handleOperatorClick('/')}>÷</button>
      <button onClick={handleEqualsClick}>=</button>
      <button onClick={handleClearClick} aria-label="Clear">
        C
      </button>
    </>
  );
};
