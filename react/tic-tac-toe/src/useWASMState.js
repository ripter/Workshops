import { useRef, useState, useEffect, useReducer } from 'react';

import { waitForWASM } from './waitForWASM';

export const STATE_DEFAULT = {
  board: [0,0,0,0,0,0,0,0,0],
  stepNumber: 0,
};


/**
 * Uses a WASM compiled from Rust for game state.
 * Returns a reducer interface for the component.
*/
export function useWASMState() {
  const refwasm = useRef(null);
  const wasm = refwasm.current;
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'init':
        // creates a new game in rust, JS gets a pointer to it.
        const newGame = wasm.new_game();
        window.newGame = newGame;
        return {
          game: newGame, // Keep the pointer for the next action.
          board: wasm.get_board(newGame), // Use the pointer to get the current gameboard.
          stepNumber: newGame.step_number, // Use the getter on the pointer to get the step number.
        };
      case 'click':
        wasm.set_mark(state.game, action.index);
        return {
          ...state,
          board: wasm.get_board(state.game),
          stepNumber: state.game.step_number,
        };
      default:
        console.log('Unhandled Action', action);
        return state;
    }
  }, {hasLoaded: false, state: STATE_DEFAULT});

  // On mount, fetch the WASM
  // Once we have it, init the game.
  useEffect(() => {
    waitForWASM().then(resp => {
      refwasm.current =  resp;
      dispatch({type: 'init'});
    });
  }, []);

  return {
    hasLoaded: state.game ? true : false,
    state,
    dispatch
  };
}
