import React, {useState} from 'react';
import './Calculator.css';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const Calculator = () => {
  const [value, setValue] = useState('0');
  const handleNumberClick = number => {
    if (number === '0' && value === '0') return;
    setValue(`${value}${number}`);
  };

  return (
    <>
      <label htmlFor="value">Value</label>
      <input id="value" value={value} />
      {numbers.map(number => (
        <button key={number} onClick={() => handleNumberClick(number)}>
          {number}
        </button>
      ))}
    </>
  );
};
