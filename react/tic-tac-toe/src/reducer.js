/**
 * Game Logic for Tic Tac Toe.
 * State logic is writen in Rust and loaded via WASM
*/
let wasm;
export function reducer(state, action) {
  console.group('reducer');
  console.log('state', state);
  console.log('action', action);
  const newState = JSON.parse(JSON.stringify(state)); // deep clone

  switch (action.type) {
    case 'init':
      console.log('init game');
      wasm = action.wasm;
      newState.hasLoaded = true;
      // newState.board = wasm.newGame();
      newState.game = wasm.new_game();
      newState.board = wasm.get_board(newState.game);

      window.lib = wasm;
      break;
    case 'click':
      console.log('Do the click!', action);
      wasm.set_mark(newState.game, action.index);
      break;
    default:

  }

  console.log('newState', newState);
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
