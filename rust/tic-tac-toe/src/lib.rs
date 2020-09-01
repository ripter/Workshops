mod utils;
use wasm_bindgen::prelude::*;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// #[wasm_bindgen]
// pub enum TileValue {
//     Empty="empty",
//     Player1="player1",
//     Player2="player2",
// }


#[wasm_bindgen]
pub fn greet() {
    utils::log("tic-tac-toe test is progressing!");
}

// #[wasm_bindgen(js_name=newGame)]
// pub fn new_game() -> String  {
//     "Hello JsValue".into()
// }

#[wasm_bindgen]
pub fn return_string() -> String {
    utils::log("Fuller House");
    "hello".to_string()
}

// #[wasm_bindgen]
#[wasm_bindgen(js_name=newGame)]
pub fn new_game() -> Vec<i32> {
    vec![1, 2, 3, 4]
    // vec!["empty", "empty", "player1"]
    // [TileValue::Empty, TileValue::Empty, TileValue::Empty]
}


#[wasm_bindgen]
pub fn empty_board() -> Vec<u8> {
    vec![9, 8, 7]
}
