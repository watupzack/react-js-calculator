import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const myButtons = [
  '7', '8', '9', '/',
  '4', '5', '6', 'x',
  '1', '2', '3', '-',
  '0', '.', '=', '+'
];
// const myArrMadeFromForEach = [];

function Button(props) {
  return(
    <button className="calc-button" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
function UserInput(props) {
  return (
    <div className="user-input">{props.input}</div>
  );
}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    // myButtons.forEach((item, i) => myArrMadeFromForEach.push(<Button key={item+i} onClick={this.handleClick(item)} value={item} />));
    this.state = {
      input: '0',
      start: true,
      oneDot: false
    };
  }
  handleClick(whatWasClicked) {
    if (this.state.start) {
      if (whatWasClicked === '/' || whatWasClicked === 'x' || whatWasClicked === '-' || whatWasClicked === '+') {
        return;
      }
      if (whatWasClicked === '.') {
        if (!this.state.oneDot) {
          this.setState({oneDot: true});
        } else {
          return;
        }  
      }
      this.setState({input: whatWasClicked,
                     start: false});
    } else {
      if (whatWasClicked === '.' && this.state.oneDot){
        return;
      }
      if ((whatWasClicked === '/' || whatWasClicked === 'x' || whatWasClicked === '-' || whatWasClicked === '+') &&
           (this.state.input[this.state.input.length - 1] === '/' || this.state.input[this.state.input.length - 1] === '-' ||
           this.state.input[this.state.input.length - 1] === 'x' || this.state.input[this.state.input.length - 1] === '+')) {
        return;
      }
      this.setState({input: this.state.input + whatWasClicked});
      console.log(this.state.input.length);
    }
  }
  equals(statementToSolve) {
    if (statementToSolve === '0' ||
        statementToSolve[statementToSolve.length - 1] === '/' ||
        statementToSolve[statementToSolve.length - 1] === 'x' ||
        statementToSolve[statementToSolve.length - 1] === '-' ||
        statementToSolve[statementToSolve.length - 1] === '+'
        ) {
      return;
    } else {
      if (typeof statementToSolve === 'string') {
        statementToSolve = statementToSolve.replace('x', '*');
      }
      this.setState({input: eval(statementToSolve),
                   start: true,
                   oneDot: false});
    }
  }
  render() {
    return(
      <div className="calc">
        <UserInput input={this.state.input}/>
        <Button onClick={() => this.handleClick('7')} value='7' />
        <Button onClick={() => this.handleClick('8')} value='8' />
        <Button onClick={() => this.handleClick('9')} value='9' />
        <Button onClick={() => this.handleClick('/')} value='/' />
        <br/>
        <Button onClick={() => this.handleClick('4')} value='4' />
        <Button onClick={() => this.handleClick('5')} value='5' />
        <Button onClick={() => this.handleClick('6')} value='6' />
        <Button onClick={() => this.handleClick('x')} value='x' />
        <br/>
        <Button onClick={() => this.handleClick('1')} value='1' />
        <Button onClick={() => this.handleClick('2')} value='2' />
        <Button onClick={() => this.handleClick('3')} value='3' />
        <Button onClick={() => this.handleClick('-')} value='-' />
        <br/>
        <Button onClick={() => this.handleClick('0')} value='0' />
        <Button onClick={() => this.handleClick('.')} value='.' />
        <Button onClick={() => this.equals(this.state.input)} value='=' />
        <Button onClick={() => this.handleClick('+')} value='+' />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator/>,
  document.getElementById('root')
);