import init, { new_game, get_board, set_mark, State, rewind } from './tic_tac_toe.js';

let wasAcked = false;

// Acknowledge the load event so the beacon stops.
function receaveAck() {
  wasAcked = true;
}

// Beacon will continue to trigger the load event until acknowledged.
function beacon(wasm) {
  const event = new CustomEvent('load-wasm', {detail: {
    wasm: wasm,
    ack: receaveAck,
  }});
  document.dispatchEvent(event);

  if (!wasAcked) {
    setTimeout(beacon, 10, wasm);
  }
}


//
// Load the WASM and JS interface
init().then(module => {
  wasAcked = false;
  beacon({
    get_board,
    new_game,
    set_mark,
    rewind,
    _wasm: module,
  });
}).catch(err => console.log(err));
