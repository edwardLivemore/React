import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

const drawGame = 'Draw Game!';
const nextGame = ', Press any squre to start next game';
let winner = null;
const player = ['X', 'O'];

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button >
  );
}

function caculateWinner(boards, win_index, step) {
  // 倒序遍历win_index
  let start_index = win_index.length - 1;
  for (let i = start_index; i >= 0; i--) {
    let index = win_index[i];
    // 判断boards中可获胜的元素
    let temp_result = true;
    if (boards[index].length > 1) {
      let first = boards[index][0];
      for (let j = 1; j < boards[index].length; j++) {
        if (first !== boards[index][j]) {
          temp_result = false;
          break;
        }
      }
    }
    if (!temp_result) {
      // 若结果为false,则在win_index中剔除该元素
      win_index.splice(i, 1);
      // 判断平局条件
      // TestCase 1:
      // 'x','o','x'
      // 'x',
      // 'o','x','o'

      // TestCase 2:
      // 'x','x',
      // 'o','o','x'
      // 'x','o',

      // TestCase 3:
      // 'x','x',
      // 'o','o','x'
      // 'x',   ,'o'

      // TestCase 4:
      // 'o','x','o'
      // '','x',''
      // 'x','o','x'

      // TestCase 5:
      // 'o','o','x'
      // 'o','x','x'
      // '','x','o'
      if (win_index.length === 0 || (win_index.length === 1 && ((boards[win_index[0]].length < 2) || (step === 7 && boards[win_index[0]][0] !== ((step - 1) & 1))))) {
        winner = drawGame;
        return;
      }
    } else {
      // 若结果为true, 则判断wins中元素个数是否为3, 若为3则有winner
      if (boards[index].length === 3) {
        // 有winner
        winner = player[step & 1];
        return;
      }
    }
  }
  return;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      step: 0,
      boards: Array.from(Array(8), () => Array()),
      win_index: [0, 1, 2, 3, 4, 5, 6, 7]
    };
  }

  resetBoard() {
    this.setState(
      {
        squares: Array(9).fill(null),
        step: 0,
        boards: Array.from(Array(8), () => Array()),
        win_index: [0, 1, 2, 3, 4, 5, 6, 7]
      }
    );
    winner = null;
    // this.forceUpdate();
  }

  setBoards(i, type) {
    let temp_boards = this.state.boards.slice();
    // 设置行
    temp_boards[parseInt(i / 3)].push(type);
    // 设置列
    temp_boards[i % 3 + 3].push(type);
    // 撇
    if ([2, 4, 6].includes(i)) {
      temp_boards[6].push(type);
    }
    // 捺
    if ([0, 4, 8].includes(i)) {
      temp_boards[7].push(type);
    }
    // this.setState({ boards: temp_boards }, () => this.caculateWinner());
    this.setState({ boards: temp_boards });
  }

  handleClick(i) {
    if (winner) {
      this.resetBoard();
      return;
    }

    let squares = this.state.squares.slice();
    let type = this.state.step & 1;

    // 设置当前格子类型
    squares[i] = player[type];
    // this.setState(
    //   {
    //     squares: squares,
    //     step: this.state.step + 1
    //   }, () => this.setBoards(i, type)
    // );
    this.setBoards(i, type);
    caculateWinner(this.state.boards, this.state.win_index, this.state.step);
    this.setState(
      {
        squares: squares,
        step: this.state.step + 1
      }
    );
    // console.log("winner is: " + winner);
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />);
  }

  render() {
    let status;
    if (winner) {
      if (winner === drawGame) {
        status = drawGame;
      } else {
        status = 'Winner is: ' + winner;
      }
      status += nextGame;
    } else {
      status = 'Next Player is: ' + player[this.state.step & 1];
      // winner = caculateWinner(this.state.boards, this.state.win_index, this.state.step);
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line no-unused-vars
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Game />,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

