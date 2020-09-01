import React, { useReducer } from 'react';

import { useWASMLoader } from './useWASMLoader';
import { reducer } from './reducer';
import { Square } from './Square';
import { Board } from './Board';

import './App.css';

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    stepNumber: 0,
    xIsNext: true,
    hasLoaded: false,
  });
  // when WASM has loaded, dispatch the game init.
  useWASMLoader((wasm) => dispatch({
    type: 'init',
    wasm,
  }));


  console.group('App');
  console.log('state', state);
  console.groupEnd();
  if (!state.hasLoaded) {
    return <div className="tic-tac-toe">
      <p>Loading...</p>
    </div>;
  }


  const jumpTo = () => {
    console.log('jumpTo')
  }

  const handleClick = () => {
    console.log('handleClick')
  }

  // return (
  //   <div className="tic-tac-toe">
  //     {state.board.map((tile, i) => (
  //       <div key={i} className="tile" onClick={() => dispatch({type: 'click', index: i})}>
  //         {tile}
  //       </div>
  //     ))}
  //   </div>
  // );
  return <Game {...state} jumpTo={jumpTo} click={handleClick} />;
}


// React App is a copy from the tutorial: https://reactjs.org/tutorial/tutorial.html
// Codepen: https://codepen.io/gaearon/pen/gWWZgR?editors=0110
// Removed the state from the original Game and replaced with with props;
function Game(props) {
  const { history, stepNumber, xIsNext } = props;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => props.jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => props.click(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


export class Game2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
