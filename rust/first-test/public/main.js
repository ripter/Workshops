import init from './pkg/first_test.js';

init().then(wasm => {
  wasm.greet('hi');
}).catch(err => console.log(err));
