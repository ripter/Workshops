mod utils;
use wasm_bindgen::prelude::*;

// Use `wee_alloc` as the global allocator.
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;



#[wasm_bindgen]
pub struct State {
    history: [[u8; 9]; 10], // can't be converted to wasm, so not public
    pub step_number: usize,
    pub is_x_next: bool,
    pub winner: Option<u8>,
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
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
        ],
        step_number: 0,
        is_x_next: true,
        winner: Option::None,
    }
}

#[wasm_bindgen]
pub fn set_mark(state: &mut State, index: usize) {
    let old: [u8; 9] = state.history[state.step_number];
    let mark: u8 = if state.is_x_next { 88 } else { 79 };

    // Invalid to mark the same index twice.
    // bail out in that case.
    if old[index] != 0 {
        return;
    }

    state.step_number += 1;
    state.history[state.step_number] = old.clone();
    state.history[state.step_number][index] = mark;
    state.is_x_next = !state.is_x_next;
    state.winner = get_winner(&state);
}

#[wasm_bindgen]
pub fn rewind(state: &mut State, step: usize) {
    state.step_number = step;
    state.is_x_next = if step % 2 == 0  { true } else { false };
    state.winner = get_winner(&state);
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


/**
    Returns the winner u8 or None
    Copied from the react tutorial and converted to rust.
*/
#[wasm_bindgen]
pub fn get_winner(state: &State) -> Option<u8> {
    let board = get_board(state);
    let lines: [[usize; 3]; 8] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for line in lines.iter() {
        let a = line[0];
        let b = line[1];
        let c = line[2];

        // if the first square is 0, it's not a winner.
        if board[a] == 0 {
            continue;
        }
        // if all squares are equal, we have a winner!
        if board[a] == board[b] && board[b] == board[c] {
            return Option::Some(board[a])
        }
    }

    return Option::None;
}



/**
* Tests!
*/
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_can_make_new_game() {
        let state = new_game();
        assert_eq!(state.winner, Option::None);
        assert_eq!(state.step_number, 0);
        assert_eq!(state.is_x_next, true);
        assert_eq!(get_board(&state).to_vec(), [0,0,0,0,0,0,0,0,0]);
    }

    #[test]
    fn turn_1() {
        let mut state = new_game();
        set_mark(& mut state, 5);
        assert_eq!(state.winner, Option::None);
        assert_eq!(state.step_number, 1);
        assert_eq!(state.is_x_next, false);
        assert_eq!(get_board(&state).to_vec(), [0,0,0,0,0,88,0,0,0]);
    }

    #[test]
    fn turn_2() {
        let mut state = new_game();
        set_mark(& mut state, 5);
        set_mark(& mut state, 3);
        assert_eq!(state.winner, Option::None);
        assert_eq!(state.step_number, 2);
        assert_eq!(state.is_x_next, true);
        assert_eq!(get_board(&state).to_vec(), [
            0, 0,0,
            79,0,88,
            0, 0,0
            ]);
    }

    #[test]
    fn turn_3() {
        let mut state = new_game();
        set_mark(& mut state, 5);
        set_mark(& mut state, 3);
        set_mark(& mut state, 2);
        assert_eq!(state.winner, Option::None);
        assert_eq!(state.step_number, 3);
        assert_eq!(state.is_x_next, false);
        assert_eq!(get_board(&state).to_vec(), [
            0, 0,88,
            79,0,88,
            0, 0,0
            ]);
    }


    #[test]
    fn turn_4_invalid_move() {
        let mut state = new_game();
        set_mark(& mut state, 5);
        set_mark(& mut state, 3);
        set_mark(& mut state, 2);
        set_mark(& mut state, 2); // Invalid because there is already a mark there.
        assert_eq!(state.winner, Option::None);
        assert_eq!(state.step_number, 3);
        assert_eq!(state.is_x_next, false);
        assert_eq!(get_board(&state).to_vec(), [
            0, 0,88,
            79,0,88,
            0, 0,0
            ]);
    }

    #[test]
    fn turn_4() {
        let mut state = new_game();
        set_mark(& mut state, 5);
        set_mark(& mut state, 3);
        set_mark(& mut state, 2);
        set_mark(& mut state, 8);
        assert_eq!(state.winner, Option::None);
        assert_eq!(state.step_number, 4);
        assert_eq!(state.is_x_next, true);
        assert_eq!(get_board(&state).to_vec(), [
            0, 0,88,
            79,0,88,
            0, 0,79
            ]);
    }

    #[test]
    fn turn_5() {
        let mut state = new_game();
        set_mark(& mut state, 5);
        set_mark(& mut state, 3);
        set_mark(& mut state, 2);
        set_mark(& mut state, 8);
        set_mark(& mut state, 1);
        assert_eq!(state.winner, Option::None);
        assert_eq!(state.step_number, 5);
        assert_eq!(state.is_x_next, false);
        assert_eq!(get_board(&state).to_vec(), [
             0, 88, 88,
            79,  0, 88,
             0,  0, 79
            ]);
    }

    #[test]
    fn turn_5_winning_move() {
        let mut state = new_game();
        set_mark(& mut state, 0);
        set_mark(& mut state, 3);
        set_mark(& mut state, 1);
        set_mark(& mut state, 4);
        set_mark(& mut state, 2);
        assert_eq!(state.winner, Option::Some(88));
        assert_eq!(state.step_number, 5);
        assert_eq!(state.is_x_next, false);
        assert_eq!(get_board(&state).to_vec(), [
            88, 88, 88,
            79,  79,  0,
             0,  0,  0
            ]);
    }


    #[test]
    fn turn_6() {
        let mut state = new_game();
        set_mark(& mut state, 5);
        set_mark(& mut state, 3);
        set_mark(& mut state, 2);
        set_mark(& mut state, 8);
        set_mark(& mut state, 1);
        set_mark(& mut state, 7);
        assert_eq!(state.winner, Option::None);
        assert_eq!(state.step_number, 6);
        assert_eq!(state.is_x_next, true);
        assert_eq!(get_board(&state).to_vec(), [
             0, 88, 88,
            79,  0, 88,
             0, 79, 79
            ]);
    }

    #[test]
    fn turn_6_winning_move() {
        let mut state = new_game();
        set_mark(& mut state, 5);
        set_mark(& mut state, 6);
        set_mark(& mut state, 2);
        set_mark(& mut state, 8);
        set_mark(& mut state, 1);
        set_mark(& mut state, 7);
        assert_eq!(state.winner, Option::Some(79));
        assert_eq!(state.step_number, 6);
        assert_eq!(state.is_x_next, true);
        assert_eq!(get_board(&state).to_vec(), [
             0, 88, 88,
             0,  0, 88,
            79, 79, 79
            ]);
    }

    #[test]
    fn turn_7() {
        let mut state = new_game();
        set_mark(& mut state, 5);
        set_mark(& mut state, 3);
        set_mark(& mut state, 2);
        set_mark(& mut state, 8);
        set_mark(& mut state, 1);
        set_mark(& mut state, 7);
        set_mark(& mut state, 6);
        assert_eq!(state.winner, Option::None);
        assert_eq!(state.step_number, 7);
        assert_eq!(state.is_x_next, false);
        assert_eq!(get_board(&state).to_vec(), [
             0, 88, 88,
            79,  0, 88,
            88, 79, 79
            ]);
    }

    #[test]
    fn turn_8() {
        let mut state = new_game();
        set_mark(& mut state, 5);
        set_mark(& mut state, 3);
        set_mark(& mut state, 2);
        set_mark(& mut state, 8);
        set_mark(& mut state, 1);
        set_mark(& mut state, 7);
        set_mark(& mut state, 6);
        set_mark(& mut state, 4);
        assert_eq!(state.winner, Option::None);
        assert_eq!(state.step_number, 8);
        assert_eq!(state.is_x_next, true);
        assert_eq!(get_board(&state).to_vec(), [
             0, 88, 88,
            79, 79, 88,
            88, 79, 79
            ]);
    }

    #[test]
    fn turn_8_o_win() {
        let mut state = new_game();
        set_mark(& mut state, 5);
        set_mark(& mut state, 3);
        set_mark(& mut state, 2);
        set_mark(& mut state, 8);
        set_mark(& mut state, 1);
        set_mark(& mut state, 4);
        set_mark(& mut state, 6);
        set_mark(& mut state, 0);
        assert_eq!(state.winner, Option::Some(79));
        assert_eq!(state.step_number, 8);
        assert_eq!(state.is_x_next, true);
        assert_eq!(get_board(&state).to_vec(), [
            79, 88, 88,
            79, 79, 88,
            88,  0, 79
            ]);

    }

    #[test]
    fn turn_9_x_win() {
        let mut state = new_game();
        set_mark(& mut state, 5);
        set_mark(& mut state, 3);
        set_mark(& mut state, 2);
        set_mark(& mut state, 8);
        set_mark(& mut state, 1);
        set_mark(& mut state, 7);
        set_mark(& mut state, 6);
        set_mark(& mut state, 4);
        set_mark(& mut state, 0);
        assert_eq!(state.winner, Option::Some(88));
        assert_eq!(state.step_number, 9);
        assert_eq!(state.is_x_next, false);
        assert_eq!(get_board(&state).to_vec(), [
            88, 88, 88,
            79, 79, 88,
            88, 79, 79
            ]);
    }

    #[test]
    fn turn_10_is_invalid() {
        let mut state = new_game();
        set_mark(& mut state, 5);
        set_mark(& mut state, 3);
        set_mark(& mut state, 2);
        set_mark(& mut state, 8);
        set_mark(& mut state, 1);
        set_mark(& mut state, 7);
        set_mark(& mut state, 6);
        set_mark(& mut state, 4);
        set_mark(& mut state, 0);
        set_mark(& mut state, 3);
        assert_eq!(state.winner, Option::Some(88));
        assert_eq!(state.step_number, 9);
        assert_eq!(state.is_x_next, false);
        assert_eq!(get_board(&state).to_vec(), [
            88, 88, 88,
            79, 79, 88,
            88, 79, 79
            ]);
    }

    #[test]
    fn turn_7_rewind_to_step_3() {
        let mut state = new_game();
        set_mark(&mut state, 5);
        set_mark(&mut state, 3);
        set_mark(&mut state, 2);
        set_mark(&mut state, 8);
        set_mark(&mut state, 1);
        set_mark(&mut state, 7);
        set_mark(&mut state, 6);

        // rewind to turn 3
        rewind(&mut state, 3);


        assert_eq!(state.winner, Option::None);
        assert_eq!(state.step_number, 3);
        assert_eq!(state.is_x_next, false);
        assert_eq!(get_board(&state).to_vec(), [
            0, 0,88,
            79,0,88,
            0, 0,0
            ]);
    }

}
