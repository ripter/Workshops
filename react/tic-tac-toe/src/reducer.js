// import init from './lib/tic_tac_toe';

/**
 * Game Logic for Tic Tac Toe.
 *
*/
export function reducer(state, action) {
  console.group('reducer');
  console.log('state', state);
  console.log('action', action);
  const newState = JSON.parse(JSON.stringify(state)); // deep clone

  switch (action.type) {
    case 'init':
      console.log('init game');
      // wait for the loaded event
      document.addEventListener('load-wasm', (wasm) => {
        console.log('loaded', wasm);
      });
      break;
    default:

  }

  console.groupEnd()
  // return {...state};
  return newState;
}

// async function loadWASM() {
//   const init = await import('./lib/tic_tac_toe.js');
//   // import init from 'lib/tic_tac_toe.js'
//   console.log('init', init);
//
// }
