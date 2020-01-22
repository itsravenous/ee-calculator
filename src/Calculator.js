import React, {useState} from 'react';
import './Calculator.css';
import logo from './logo.svg';

const numbers = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];

export const Calculator = () => {
  const [leftValue, setLeftValue] = useState('0');
  const [rightValue, setRightValue] = useState();
  const [operator, setOperator] = useState();
  const [isDisplayingResult, setIsDisplayingResult] = useState(false);

  const handleNumberClick = number => {
    setIsDisplayingResult(false);

    if (operator) {
      if (number === '.' && rightValue.includes('.')) return;
      return setRightValue(`${rightValue || ''}${number}`);
    } else {
      if (number === '.' && leftValue.includes('.')) return;
      return leftValue === '0'
        ? setLeftValue(String(number))
        : setLeftValue(`${leftValue}${number}`);
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
    setLeftValue('0');
    setRightValue();
    setOperator();
  };

  const displayValue = isDisplayingResult
    ? Math.round(leftValue * 100000000000000) / 100000000000000
    : leftValue + (operator || '') + (rightValue || '');
  return (
    <div className="c-calculator">
      <label className="c-calculator__display-label" htmlFor="value">
        Value
      </label>
      <input
        className="c-calculator__display-value"
        id="value"
        value={displayValue}
        readOnly
      />

      <div className="c-calculator__controls">
        <div className="c-calculator__numbers">
          {numbers.map(number => (
            <button key={number} onClick={() => handleNumberClick(number)}>
              {number}
            </button>
          ))}

          <button onClick={() => handleNumberClick('.')}>.</button>
        </div>

        <div className="c-calculator__operators">
          <button onClick={() => handleOperatorClick('+')}>+</button>
          <button onClick={() => handleOperatorClick('-')}>-</button>
          <button onClick={() => handleOperatorClick('*')}>×</button>
          <button onClick={() => handleOperatorClick('/')}>÷</button>
          <button onClick={handleEqualsClick}>
            <img alt="=" src={logo} />
          </button>
        </div>
        <button onClick={handleClearClick} aria-label="Clear">
          C
        </button>
      </div>
    </div>
  );
};
