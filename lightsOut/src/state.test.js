import expect from 'expect.js';
import State from './state.js';

describe('Game State', () => {
  let state;
  console.log('State', State);

  beforeEach(() => {
    state = new State({
      width: 5,
      height: 5,
    });
  });

  describe('initalize', () => {
    it('board width', () => {
      expect(state.board.length).to.eql(5);
    });
    it('board height', () => {
      expect(state.board[0].length).to.eql(5);
    });
  });

  describe('.index2Point', () => {
    it('0 = 0,0', () => {
      expect(state.index2Point(0)).to.eql({
        x: 0,
        y: 0,
      });
    });

    it('4 = 4,0', () => {
      expect(state.index2Point(4)).to.eql({
        x: 4,
        y: 0,
      });
    });

    it('7 = 1,2', () => {
      expect(state.index2Point(7)).to.eql({
        x: 2,
        y: 1,
      });
    });

    it('24 = 4,4', () => {
      expect(state.index2Point(24)).to.eql({
        x: 4,
        y: 4,
      });
    });
  }); // index2Point

  describe('.action', () => {
    beforeEach(() => {
      // set the inital state.
      state.board = [
        [1,1,0,1,1],
        [1,0,1,0,1],
        [0,1,1,1,0],
        [0,0,1,0,0],
        [0,0,0,0,0],
      ];
    });

    it('toggles lights in a cross pattern', () => {
      state.actionClick(1, 3);
      expect(state.board).to.eql([
        [1,1,0,1,1],
        [1,0,1,0,1],
        [0,0,1,1,0],
        [1,1,0,0,0],
        [0,1,0,0,0],
      ]);
    });
  }); // .action
});

function printBoard(board) {
  board.forEach((row) => {
    console.log(row);
  });
}
