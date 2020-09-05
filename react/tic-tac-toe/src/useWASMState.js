import { useRef, useState, useEffect } from 'react';

import { waitForWASM } from './waitForWASM';

export const STATE_DEFAULT = {
  board: [0,0,0,0,0,0,0,0,0],
  stepNumber: 0,
};

export function useWASMState() {
  const refGame = useRef();
  const [wasm, setWASM] = useState();
  const [state, setState] = useState(STATE_DEFAULT);

  useEffect(() => {
    waitForWASM().then(resp => {
      refGame.current = resp.new_game();
      window.game = refGame.current;
      setWASM(resp);
      setState({
        ...state,
        board: resp.get_board(refGame.current),
      });
    });
  }, []);

  return {
    state,
    hasLoaded: refGame.current ? true : false,
    dispatch: (action) => {
      console.log('action', action);
      switch (action.type) {
        case 'click':
          console.log('before mark', wasm.get_board(refGame.current));
          wasm.set_mark(refGame.current, action.index);
          console.log('after mark', wasm.get_board(refGame.current));
          setState({
            ...state,
            board: wasm.get_board(refGame.current),
          });
          break;
        default:

      }
    },
  }
}
