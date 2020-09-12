import { useRef, useEffect, useReducer } from 'react';

import { waitForWASM } from './waitForWASM';

export const STATE_DEFAULT = {
  board: [0,0,0,0,0,0,0,0,0],
  stepNumber: 0,
};


// Returns the JS version of the Game State
function getGameState(wasm, game) {
  return {
    game,
    stepNumber: game.step_number,
    // Rust's wasm_bindgen doens't export char array.
    // So we export Char codes as u8 instead.
    // then we convert them into a char array.
    board: Array.from(wasm.get_board(game)).map(u8 => String.fromCharCode(u8)),
  };
}



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
        return getGameState(wasm, wasm.new_game());
      case 'click':
        wasm.set_mark(state.game, action.index);
        return getGameState(wasm, state.game);
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
      // turn on better debugging.
      console.log('resp', resp);
      // resp.
      dispatch({type: 'init'});
    });
  }, []);

  return {
    hasLoaded: state.game ? true : false,
    state,
    dispatch
  };
}
