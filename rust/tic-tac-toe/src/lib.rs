mod utils;
use wasm_bindgen::prelude::*;


#[wasm_bindgen]
pub fn greet() {
    utils::log("tic-tac-toe test is progressing!");
}
