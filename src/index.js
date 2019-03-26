import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import "./index.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "updateX":
      return { ...state, x: action.value };
    case "updateY":
      return { ...state, y: action.value };
    case "updateO":
      return { ...state, operator: action.value };
    case "updateD":
      return { ...state, display: action.value };
    case "updateR":
      return { ...state, results: action.value };
    default:
      return state;
  }
};

const initialState = {
  x: "",
  y: "",
  operator: "",
  results: "",
  display: ""
};
const store = createStore(reducer, initialState);

const updateX = value => {
  return { type: "updateX", value };
};

const updateY = value => {
  return { type: "updateY", value };
};

const updateO = value => {
  return { type: "updateO", value };
};

const updateR = value => {
  return { type: "updateR", value };
};

const updateD = value => {
  return { type: "updateD", value };
};


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
    <div>
      <h4>{`${x ? x : display} ${operator ? operator : ""} ${
        y ? y : x ? display : ""
      }  ${results ? "=" + results : ""}`}</h4>
    </div>
  );
}

const Calculator = () => {
  const { x, y, operator, results, display } = store.getState();
  const handleOperationClick = o => {
    if (o === "=") {
      const yInt = parseInt(display);
      if (operator === "*") {
        store.dispatch(updateR(x * yInt));
      } else if (operator === "-") {
        store.dispatch(updateR(x - yInt));
      } else {
        store.dispatch(updateR(x + yInt));
      }
      store.dispatch(updateD(""));
      store.dispatch(updateY(yInt));
    } else {
      store.dispatch(updateX(parseInt(display)));
      store.dispatch(updateD(""));
      store.dispatch(updateO(o));
    }
  };

  const reset = () => {
    // setDisplay("");
    // setOperator("");
    // setX("");
    // setY("");
    // setResults("");
  };

  const handleNumberClick = i => {
    store.dispatch(updateD(display + i));
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
      <div className="Calculator">
        {[[0, 1, 2], [3, 4, 5], [6, 7, 8]].map(arr => {
          return ButtonRow(arr, handleNumberClick);
        })}
        {ButtonRow(["+", "*", "="], handleOperationClick)}
      </div>
      <div>
        <CalculatorDisplay
          display={store.getState().display}
          x={store.getState().x}
          y={store.getState().y}
          operator={store.getState().operator}
          results={store.getState().results}
        />
      </div>
    </div>
  );
};

// ========================================

const render = () => {
  return ReactDOM.render(<Calculator />, document.getElementById("root"));
}
render();
store.subscribe(render);
