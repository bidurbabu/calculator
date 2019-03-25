import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function CalculatorButton(props) {
  return (
    <span>
      <button
        onClick={props.handleClick}
        className="ButtonClass"
        value={props.value}
      >
        {props.value}
      </button>
    </span>
  );
}

const ButtonRow = (rowArray, handleClick) => {
  return (
    <div className="CalcRow">
      {rowArray.map(x => {
        return (
          <CalculatorButton
            key={x}
            handleClick={() => {
              handleClick(x);
            }}
            value={x}
          />
        );
      })}
    </div>
  );
};

function CalculatorDisplay(props) {
  const { display, x, operator, y, results } = props;

  return (
    <div className="Results">
      {[display, x, operator, y, results].map(v => (
        <div className="Result">{v}</div>
      ))}
    </div>
  );
}

const Calculator = () => {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [operator, setOperator] = useState("");
  const [results, setResults] = useState("");
  const [display, setDisplay] = useState("");

  const handleOperationClick = o => {
    if (o === "=") {
      const yInt = parseInt(display);
      if (operator === "*") {
        setResults(x * yInt);
      } else if (operator === "-") {
        setResults(x - yInt);
      } else {
        setResults(x + yInt);
      }
      setDisplay("");
      setY(yInt);
    } else {
      setX(parseInt(display));
      setDisplay("");
      setOperator(o);
    }
  };

  const reset = () => {
    setDisplay("");
    setOperator("");
    setX("");
    setY("");
    setResults("");
  };
  const handleNumberClick = i => {
    setDisplay(display + i);
  };



  return (
    <div>
      <button
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
      <div>
        <CalculatorDisplay
          display={display}
          x={x}
          y={y}
          operator={operator}
          results={results}
        />
      </div>
      <div className="Calculator">
        {[[0, 1, 2], [3, 4, 5], [6, 7, 8]].map(arr => {
          return ButtonRow(arr, handleNumberClick);
        })}
        {ButtonRow(["+", "*", "="], handleOperationClick)}
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Calculator />, document.getElementById("root"));
