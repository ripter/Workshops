import { useRef, useState, useReducer } from 'react';
import { useWASMLoader } from './useWASMLoader';
import { reducer } from './reducer';

const STATE_DEFAULT = {
  board: [0,0,0,0,0,0,0,0,0],
  hasLoaded: false,
  stepNumber: 0,
};

export function useWASMState() {
  const refGame = useRef();
  const [wasm, setWASM] = useState();
  const [state, dispatch] = useReducer((state, action) => {
    console.log('reducer called', state, action);
    switch (action.type) {
      case 'init':
        // ignore dup calls once the WASM has been loaded.
        if (action.wasm === wasm) { return state; }
        console.log('init got wasm', action.wasm);
        // Create a new game!
        refGame.current = action.wasm.new_game();
        setWASM(action.wasm);
        console.log('returing loaded');
        return {
          hasLoaded: true,
          board: action.wasm.get_board(refGame.current),
          stepNumber: refGame.current.step_number,
        }
        break;
        case 'click':
          wasm.set_mark(refGame.current, action.index);
          return {
            ...state,
            board: wasm.get_board(refGame.current),
            stepNumber: refGame.current.step_number,
          };
      default:
        return state;
    }
  }, STATE_DEFAULT);
  // when WASM has loaded, dispatch game init.
  useWASMLoader((wasm) => dispatch({
    type: 'init',
    wasm,
  }));

  console.log('useWASMState return', state);
  return {
    state,
    dispatch,
  };
}
