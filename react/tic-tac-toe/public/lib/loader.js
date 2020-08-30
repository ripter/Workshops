import init from './tic_tac_toe.js';

let wasAcked = false;
let wasm = null;

// Load the WASM and JS interface
init().then(module => {
  wasAcked = false;
  wasm = module;
  beacon();
}).catch(err => console.log(err));


// Acknowledge the load event so the beacon stops.
function receaveAck() {
  wasAcked = true;
}

// Beacon will continue to trigger the load event until acknowledged.
function beacon() {
  const event = new CustomEvent('load-wasm', {detail: {
    wasm: wasm,
    ack: receaveAck,
  }});
  document.dispatchEvent(event);

  if (!wasAcked) {
    setTimeout(beacon, 10);
  }
}
