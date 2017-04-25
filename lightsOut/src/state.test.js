const expect = require('expect.js');
const State = require('./state.js');

describe('Game State', () => {
  let state;

  beforeEach(() => {
    state = new State({
      width: 5,
      height: 5,
      board: [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,1,1,1,0],
        [0,0,1,0,0],
        [0,0,0,0,0],
      ],
    });
  });

  describe('index2Point', () => {
    it('0 = 0,0', () => {
      expect(state.index2Point(0)).to.eql({
        x: 0,
        y: 0,
      });
    });
  });
});
