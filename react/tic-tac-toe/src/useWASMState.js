import { useRef, useState, useEffect, useReducer } from 'react';

import { waitForWASM } from './waitForWASM';

export const STATE_DEFAULT = {
  board: [0,0,0,0,0,0,0,0,0],
  stepNumber: 0,
};


export function useWASMState() {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'init':
        console.log('init called', action)
        const newGame = action.wasm.new_game();
        return {
          board: action.wasm.get_board(newGame),
          game: newGame,
          stepNumber: newGame.step_number,
          wasm: action.wasm,
        };
      case 'click':
        console.log('action', action);
        state.wasm.set_mark(state.game, action.index);
        return {
          ...state,
          board: state.wasm.get_board(state.game),
          stepNumber: state.game.step_number,
        };
      default:
        return state;
    }
  }, {hasLoaded: false, state: STATE_DEFAULT});

  // On mount, fetch the WASM
  useEffect(() => {
    waitForWASM().then(resp => dispatch({type: 'init', wasm: resp}));
  }, []);

  console.log('state', state);
  return {
    hasLoaded: state.game ? true : false,
    state,
    dispatch
  };
}

export function useWASMState2() {
  const refGame = useRef();
  const [wasm, setWASM] = useState();
  const [state, setState] = useState(STATE_DEFAULT);
  const [game, setGame] = useState();

  useEffect(() => {
    waitForWASM().then(resp => {
      const newGame = resp.new_game();
      setGame(newGame);
      setWASM(resp);
      setState({
        ...state,
        board: resp.get_board(newGame),
      });
    });
  }, []);

  return {
    state,
    hasLoaded: game ? true : false,
    dispatch: (action) => {
      console.log('action', action);
      switch (action.type) {
        case 'click':
          console.log('game', game);
          wasm.set_mark(game, action.index);
          // wasm.set_mark(refGame.current, action.index);
          setState({
            ...state,
            // board: wasm.get_board(refGame.current),
            board: wasm.get_board(game),
          });
          break;
        default:

      }
    },
  }
}
