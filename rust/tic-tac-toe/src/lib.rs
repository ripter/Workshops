mod utils;
use wasm_bindgen::prelude::*;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


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

#[wasm_bindgen(js_name=newGame)]
pub fn new_game() -> Vec<u32> {
    vec![1, 2, 3]
}
