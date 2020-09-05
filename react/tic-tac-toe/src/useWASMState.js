import { useRef, useState, useReducer, useEffect } from 'react';

import { waitForWASM } from './waitForWASM';
// import { useWASMLoader } from './useWASMLoader';
// import { reducer } from './reducer';

const STATE_DEFAULT = {
  board: [0,0,0,0,0,0,0,0,0],
  hasLoaded: false,
  stepNumber: 0,
};

export function useWASMState() {
  const refGame = useRef();
  const [wasm, setWASM] = useState();

  useEffect(() => {
    waitForWASM().then(resp => {
      console.log('loaded wasm', resp);
      refGame.current = resp.new_game();
      setWASM(resp);
    });
  }, []);

  console.log('useWASMState', refGame);
  console.log('hasLoaded', refGame.current ? true : false);
  const newState = {
    hasLoaded: refGame.current ? true : false,
    state: STATE_DEFAULT,
    dispatch: (action) => {
      console.log('action', action);
    },
  }
  console.log('newState', newState);
  return newState;
  // return {
  //   // state: !refGame.current ? STATE_DEFAULT : {
  //   //   board: wasm.get_board()
  //   // },
  //   hasLoaded: refGame.current ? true : false,
  //   state: STATE_DEFAULT,
  //   dispatch: (action) => {
  //     console.log('action', action);
  //   },
  // };
}
