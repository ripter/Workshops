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
