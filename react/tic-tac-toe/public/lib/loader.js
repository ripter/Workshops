import init from './tic_tac_toe.js';

init().then(wasm => {
  wasm.greet();
}).catch(err => console.log(err));
