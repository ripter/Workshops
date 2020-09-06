mod utils;
use wasm_bindgen::prelude::*;

// Use `wee_alloc` as the global allocator.
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;



#[wasm_bindgen]
pub struct State {
    history: [[u8; 9]; 9], // can't be converted to wasm, so not public
    pub step_number: usize,
    is_x_next: bool,
}



/**
    Creates a new Game State.
*/
#[wasm_bindgen]
pub fn new_game() -> State {
    State {
        history: [
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]
        ],
        step_number: 0,
        is_x_next: true,
    }
}

#[wasm_bindgen]
pub fn set_mark(state: &mut State, index: usize) {
    let old: [u8; 9] = state.history[state.step_number];
    let mark: u8 = if state.is_x_next { 107 } else { 117 };

    state.step_number += 1;
    state.history[state.step_number] = old.clone();
    state.history[state.step_number][index] = mark;
    state.is_x_next = !state.is_x_next;
}


/**
    Returns the Game Board at the current step.
    The WASM doens't support exporting the history array,
    THis will return the current board as a Box.
*/
#[wasm_bindgen]
pub fn get_board(state: &State) -> Box<[u8]> {
    Box::new(state.history[state.step_number])
}


/*

//
// Doesn't work
// the trait `wasm_bindgen::convert::IntoWasmAbi` is not implemented for `std::boxed::Box<State>`
#[wasm_bindgen]
pub fn new_game() -> Box<State> {
    Box::new(State {
        history: [
            [1,2,3,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]
        ],
        step_number: 0,
        is_x_next: true,
    })
}
//
// Doesn't work
// can't #[wasm_bindgen] functions with lifetime or type parameters
#[wasm_bindgen]
pub fn new_game<'a>() -> &'a State {
    &State {
        history: [
            [1,2,3,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]
        ],
        step_number: 0,
        is_x_next: true,
    }
}
*/









// let game_state: &'static State = State {
//     history: [
//         [1,2,3,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]
//     ],
//     step_number: 0,
//     is_x_next: true,
// };


// #[wasm_bindgen]
// pub fn new_board() -> Box<[u8]> {
//     Box::new([
//         0, 0, 0,
//         0, 0, 0,
//         0, 0, 0,])
// }








// The JS side wants:
// history: List of gameboards. Each gameboard is an array of 9 items.
// Might be able to get away with:
// board, an array of 9 items.


// static mut GAME: State = State {
//     history: [
//         [1,2,3,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]
//     ],
//     step_number: 0,
//     is_x_next: true,
// };



// #[wasm_bindgen]
// pub fn get_board() -> Box<[u8]> {
    // state.history[state.step_number]
    // Box::new(GAME.history[GAME.step_number])
    // GAME.history[GAME.step_number]
// }


// #[wasm_bindgen]
// pub fn new_game() -> State {
//     State {
//         history: [
//             [0,0,0,4,5,6,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
//             [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
//             [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]
//         ],
//         step_number: 0,
//         is_x_next: true,
//     }
// }
//     let val = State {
//         // history: vec![[
//         //     String::from(""),String::from(""),String::from(""),
//         //     String::from(""),String::from(""),String::from(""),
//         //     String::from(""),String::from(""),String::from(""),
//         //     ]],
//         // history: Box([""]),
//         history: Box::new(vec![new_board()]),
//         // history: [
//         //     new_board(), None, None,
//         //     None, None, None,
//         //     None, None, None,
//         // ],
//         step_number: 0,
//         is_x_next: true,
//     };
//     val
// }






// #[wasm_bindgen]
// pub fn greet() {
//     utils::log("tic-tac-toe test is progressing!");
// }

// #[wasm_bindgen(js_name=newGame)]
// pub fn new_game() -> String  {
//     "Hello JsValue".into()
// }

// #[wasm_bindgen]
// pub fn return_string() -> String {
//     utils::log("Fuller House");
//     "hello".to_string()
// }
