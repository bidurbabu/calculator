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

function CalculatorDisplay(props) {
  return (
    <div className="Results">
      <div className="Result">{props.display}</div>
      <div className="Result">{props.x}</div>
      <div className="Result">{props.operator}</div>
      <div className="Result">{props.y}</div>
      <div className="Result">{props.results}</div>
    </div>
  );
}

const Calculator = () => {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [operator, setOperator] = useState("");
  const [results, setResults] = useState("");
  const [display, setDisplay] = useState("");

  const handleClickOperation = o => {
    if (o === "=") {
      const yInt= parseInt(display);
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
  const handleClick = i => {
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
        <CalculatorDisplay display={display} x={x} y={y} operator={operator} results={results}/>
      </div>
      <div className="Calculator">
        <div className="CalcRow">
          {[0, 1, 2].map(x => {
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
        <div className="CalcRow">
          {[3, 4, 5].map(x => {
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
        <div className="CalcRow">
          {[6, 7, 8].map(x => {
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
        <div className="CalcRow">
          {["+", "*", "="].map(x => {
            return (
              <CalculatorButton
                key={x}
                handleClick={() => {
                  handleClickOperation(x);
                }}
                value={x}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Calculator />, document.getElementById("root"));
