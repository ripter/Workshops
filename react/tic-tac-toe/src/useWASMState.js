import { useRef, useState, useEffect } from 'react';

import { waitForWASM } from './waitForWASM';

export const STATE_DEFAULT = {
  board: [0,0,0,0,0,0,0,0,0],
  stepNumber: 0,
};

export function useWASMState() {
  console.group('useWASMState')
  const refGame = useRef();
  const [wasm, setWASM] = useState();

  useEffect(() => {
    waitForWASM().then(resp => {
      console.group('useWASMState - waitForWASM.then')
      console.log('loaded wasm', resp);
      refGame.current = resp.new_game();
      console.log('setting WASM', resp)
      setWASM(resp);
      console.groupEnd();
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
  console.groupEnd();
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
