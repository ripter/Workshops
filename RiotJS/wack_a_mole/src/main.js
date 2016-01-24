import './gameboard.tag';
import './timer.tag';
import './score.tag';
import Store from './store.js';
import {TIMER, ACTION, MOLE} from './consts.js';

// Create a new game
var gamestate = new Store();
//DEBUGGING:
window.gamestate = gamestate;

// render all the tags
riot.mount('*', gamestate);

// Change the mole every second.
gamestate.on(TIMER.TICK, function(seconds) {
  var {lastIndex} = gamestate;
  var index = lastIndex;

  // find a hidden mole
  while (index === lastIndex) {
    index = 0 | Math.random() * 9;
  }

  // hide the last mole we showed and show a new one instead.
  gamestate.trigger(ACTION.MOLE.HIDE, [lastIndex], true);
  gamestate.trigger(ACTION.MOLE.SHOW, [index], true);
  gamestate.update({
    lastIndex: index
  });
});

// when a mole has been 'hit' by the player
gamestate.on(MOLE.HIT, function(mole) {
  var score = gamestate.score;

  gamestate.update({
    score: score + 10
  });
});



//
// Auto START
gamestate.trigger('TIMER.START');
