import React from 'react';

import { Board } from './Board';
import { useWASMState } from './useWASMState';

import './App.css';



export function App() {
  const { state, hasLoaded, dispatch } = useWASMState();

  if (!hasLoaded) {
    return <div className="tic-tac-toe">
      <p>Loading...</p>
    </div>;
  }

  return <Game
    {...state}
    jumpTo={stepNumber => dispatch({type: 'rewind', stepNumber})}
    click={index => dispatch({type: 'click', index})}
  />;
}


// Game is a copy from the tutorial: https://reactjs.org/tutorial/tutorial.html
// Codepen: https://codepen.io/gaearon/pen/gWWZgR?editors=0110
// Modified to handle the change in state.
function Game(props) {
  const { board, stepNumber, isXNext, winner } = props;

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
    status = "Next player: " + (isXNext ? "X" : "O");
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
