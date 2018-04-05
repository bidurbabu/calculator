import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function CalculatorButton(props) {
  return (
    <span>
      <button onClick={props.handleClick} className="ButtonClass" value={props.value}>{props.value}</button>
    </span>
  );
}

function CalculatorDisplay(prop) {
  return (
    <span className="Display">
      {prop.result}
    </span>
  );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: '',
      operator: '',
      display: ''
    };
  }

  handleClickOperation(x) {
    if (x === '=') {
      if (this.state.operator === '*') {
        this.setState({
          display: this.state.x * parseInt(this.state.display)
        });
      } else if (this.state.operator === '-') {
        this.setState({
          display: this.state.x - parseInt(this.state.display)
        });
      } else {
        this.setState({
          display: this.state.x + parseInt(this.state.display)
        });
      }

    } else {
      this.setState({
        x: parseInt(this.state.display),
        display: '',
        operator: x
      });
    }
  }

  reset() {
    this.setState({x: '', operator: '', display: ''});
  }
  handleClick(i) {
    this.setState({
      display: this.state.display + i
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => {
          this.reset()
        }}>Reset</button>
        <CalculatorDisplay result={this.state.display}/>
        <div className="Calculator">
          <div className="CalcRow">
            {[0, 1, 2].map((x) => {
              return (<CalculatorButton
                key={x}
                handleClick={() => {
                this.handleClick(x)
              }}
                value={x}/>)
            })}
          </div>
          <div className="CalcRow">
            {[3, 4, 5].map((x) => {
              return (<CalculatorButton
                key={x}
                handleClick={() => {
                this.handleClick(x)
              }}
                value={x}/>)
            })}
          </div>
          <div className="CalcRow">
            {[6, 7, 8].map((x) => {
              return (<CalculatorButton
                key={x}
                handleClick={() => {
                this.handleClick(x)
              }}
                value={x}/>)
            })}
          </div>
          <div className="CalcRow">
            {['+', '*', '='].map((x) => {
              return (<CalculatorButton
                key={x}
                handleClick={() => {
                this.handleClickOperation(x)
              }}
                value={x}/>)
            })}
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Calculator/>, document.getElementById('root'));
