import React, { useReducer } from 'react';

import { reducer } from './reducer';

import './App.css';

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    board: [
      null, null, null,
      null, null, null,
      null, null, null,
    ],
  });

  return (
    <div className="tic-tac-toe">
      {state.board.map((tile, i) => (
        <div key={i} className="tile" onClick={() => dispatch({type: 'click', index: i})}>
          {tile}
        </div>
      ))}
    </div>
  );
}
