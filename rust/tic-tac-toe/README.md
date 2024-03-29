
# Simple Tic-Tac-Toe state

Rust code compiled to WASM for use by JavaScript. Create a new object with new_game() and pass it into the wasm functions to get the state for that game.

* [Codepen Example](https://codepen.io/ripter/pen/wvGxmVg)
* [React Hook (on Codepen)](https://codepen.io/ripter/pen/vYGaRVB?editors=1010)

```js
// Create a new game state
const gameState = wasm.new_game();
// gameState.step_number
// gameState.winner
// gameState.is_x_next

// Get the current game board as an array of numbers.
const boardU8 = wasm.get_board(gameState);
// Get the board as an array of letters.
const boardChar = Array.from(wasm.get_board(gameState)).map(u8 => String.fromCharCode(u8)),

// Mark a square
wasm.set_mark(gameState, squareIndex);

// Rewind to a previous step.
wasm.rewind(gameState, newStep);
```


## Installing

You can use the module `src/loader.js` to load the WASM and to trigger a `load-wasm` event. The event is called by a beacon, so your handling script needs to `ack()` the beacon to stop it from broadcasting.

### Load via script type="module"
```html
<script src="https://cdn.jsdelivr.net/gh/ripter/Workshops@master/rust/tic-tac-toe/js/loader.js" type="module"></script>
```

### Load from existing JS Module.
```js
// from existing JS Module.
import 'https://cdn.jsdelivr.net/gh/ripter/Workshops@master/rust/tic-tac-toe/js/loader.js';
```

### Async Loading
You can use the promise returned `js/waitForWASM.js` to know when the WASM has been loaded and is ready for use.

```js
waitForWASM().then(wasm => {
  // do something with the loaded wasm interface.
  // like, make a new game!
  const gameState = wasm.new_game();
});
```




---
Following this book: https://rustwasm.github.io/docs/wasm-bindgen/
## 🔋 Batteries Included

* [`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen) for communicating
  between WebAssembly and JavaScript.
* [`console_error_panic_hook`](https://github.com/rustwasm/console_error_panic_hook)
  for logging panic messages to the developer console.
* [`wee_alloc`](https://github.com/rustwasm/wee_alloc), an allocator optimized
  for small code size.
