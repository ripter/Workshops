
# Simple Tic-Tac-Toe state

Rust code compiled to WASM for use by JavaScript. Create a new object with new_game() and pass it into the wasm functions to get the state for that game.

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


Following this book: https://rustwasm.github.io/docs/wasm-bindgen/
## 🔋 Batteries Included

* [`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen) for communicating
  between WebAssembly and JavaScript.
* [`console_error_panic_hook`](https://github.com/rustwasm/console_error_panic_hook)
  for logging panic messages to the developer console.
* [`wee_alloc`](https://github.com/rustwasm/wee_alloc), an allocator optimized
  for small code size.
