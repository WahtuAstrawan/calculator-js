import React, { useState } from 'react';
import './App.scss';

const Calculator = () => {
  const [val, setVal] = useState(null);
  const [displayVal, setDisplayVal] = useState('0');
  const [waitForOperand, setWaitForOperand] = useState(false);
  const [operator, setOperator] = useState('');

  const handleNumbers = (digit) => {
    if (waitForOperand) {
      setDisplayVal(String(digit));
      setWaitForOperand(false);
    } else {
      setDisplayVal(displayVal === '0' ? String(digit) : displayVal + digit);
    }
  };

  const handleDot = (dot) => {
    if (waitForOperand) {
      setDisplayVal('0.');
      setWaitForOperand(false);
    } else {
      setDisplayVal(displayVal.indexOf('.') !== -1 ? displayVal : displayVal + dot);
    }
  };

  const handleClear = () => {
    setVal(null);
    setDisplayVal('0');
    setOperator('');
    setWaitForOperand(false);
  };

  const doOperation = (nextOperator) => {
    const nextVal = parseFloat(displayVal);
    const operations = {
      '+': (preVal, nextVal) => preVal + nextVal,
      '-': (preVal, nextVal) => preVal - nextVal,
      '/': (preVal, nextVal) => preVal / nextVal,
      '*': (preVal, nextVal) => preVal * nextVal,
      '=': (preVal, nextVal) => nextVal
    };

    if (val == null) {
      setVal(nextVal);
    } else if (nextOperator && !waitForOperand) {
      const value = val || 0;
      const compute = operations[operator](value, nextVal);
      setVal(compute);
      setDisplayVal(String(compute));
    }
    setWaitForOperand(true);
    setOperator(nextOperator);
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="display">
          <span id="display">{displayVal}</span>
        </div>
        <div className="buttons">
          <div className="numbers">
            <button id="one" onClick={() => handleNumbers(1)}>1</button>
            <button id="two" onClick={() => handleNumbers(2)}>2</button>
            <button id="three" onClick={() => handleNumbers(3)}>3</button>
            <button id="four" onClick={() => handleNumbers(4)}>4</button>
            <button id="five" onClick={() => handleNumbers(5)}>5</button>
            <button id="six" onClick={() => handleNumbers(6)}>6</button>
            <button id="seven" onClick={() => handleNumbers(7)}>7</button>
            <button id="eight" onClick={() => handleNumbers(8)}>8</button>
            <button id="nine" onClick={() => handleNumbers(9)}>9</button>
            <button id="clear" onClick={handleClear}>C</button>
            <button id="zero" onClick={() => handleNumbers(0)}>0</button>
            <button id="decimal" onClick={() => handleDot('.')}>.</button>
          </div>
          <div className="operators">
            <button id="add" onClick={() => doOperation('+')}>+</button>
            <button id="subtract" onClick={() => doOperation('-')}>-</button>
            <button id="divide" onClick={() => doOperation('/')}>/</button>
            <button id="multiply" onClick={() => doOperation('*')}>*</button>
            <button id="equals" onClick={() => doOperation('=')}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
