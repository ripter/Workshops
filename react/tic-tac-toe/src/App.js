import React, { useReducer, useEffect } from 'react';

import { useWASMLoader } from './useWASMLoader';
import { reducer } from './reducer';

import './App.css';

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    board: [
      null, null, null,
      null, null, null,
      null, null, null,
    ],
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
