import React, {useState} from 'react';
import './Calculator.css';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const Calculator = () => {
  const [leftValue, setLeftValue] = useState('0');
  const [rightValue, setRightValue] = useState();
  const [operator, setOperator] = useState();
  const [isDisplayingResult, setIsDisplayingResult] = useState(false);

  const handleNumberClick = number => {
    setIsDisplayingResult(false);
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
    setIsDisplayingResult(true);
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

  const displayValue = isDisplayingResult
    ? Math.round(leftValue * 100000000000000) / 100000000000000
    : (leftValue || '') + (operator || '') + (rightValue || '');
  return (
    <>
      <label htmlFor="value">Value</label>
      <input id="value" value={displayValue} />
      {numbers.map(number => (
        <button key={number} onClick={() => handleNumberClick(number)}>
          {number}
        </button>
      ))}

      <button onClick={() => handleNumberClick('.')}>.</button>

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
