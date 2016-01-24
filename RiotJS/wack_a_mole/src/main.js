import Store from './store.js';
import {TIMER, MOLE} from './consts.js';
require('./gameboard.tag');
require('./timer.tag');

// Create a new game
var gamestate = new Store();
console.log('gamestate', gamestate, TIMER);
window.gamestate = gamestate;

// render all the tags
const tagBoard = riot.mount('gameboard', gamestate)[0];
const tagTimer = riot.mount('timer', gamestate)[0]

// Change the mole every second.
tagTimer.on(TIMER.TICK, function(seconds) {
  var {lastIndex} = gamestate;
  var index = 0 | Math.random() * 9;

  gamestate.trigger(MOLE.TOGGLE, [lastIndex, index]);
  gamestate.update({
    lastIndex: index
  });
});
