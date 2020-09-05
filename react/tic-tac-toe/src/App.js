import React, { useReducer } from 'react';

import { Square } from './Square';
import { Board } from './Board';
import { useWASMState } from './useWASMState';

import './App.css';

export function App() {
  console.group('App');
  const { state, dispatch } = useWASMState();

  console.log('state', state.hasLoaded, state);


  if (!state.hasLoaded) {
    console.groupEnd();
    return <div className="tic-tac-toe">
      <p>Loading...</p>
    </div>;
  }

  const jumpTo = () => {
    console.log('jumpTo')
  }

  console.groupEnd();
  return <Game
    {...state}
    jumpTo={jumpTo}
    click={index => dispatch({type: 'click', index})}
  />;
}


// Game is a copy from the tutorial: https://reactjs.org/tutorial/tutorial.html
// Codepen: https://codepen.io/gaearon/pen/gWWZgR?editors=0110
// Modified to handle the change in state.
function Game(props) {
  console.log('Game', props);
  const { board, stepNumber, xIsNext } = props;
  const winner = calculateWinner(board);

  let moves = [];
  for (let move=0; move < stepNumber; move++) {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    moves.push(
      <li key={move}>
        <button onClick={() => props.jumpTo(move)}>{desc}</button>
      </li>
    );
  }

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
          squares={board}
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



// ========================================


/**
  Tests every possible winning combination.
  If someone has all thress positions, they win!
  @return {string|null} the winner's mark or null
*/
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
