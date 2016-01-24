import Store from './store.js';
require('./gameboard.tag');
require('./timer.tag');

// Create a new game
var gamestate = new Store();
console.log('gamestate', gamestate);
window.gamestate = gamestate;

// render all the tags
const tagBoard = riot.mount('gameboard', gamestate)[0];
const tagTimer = riot.mount('timer', gamestate)[0]

// Change the mole every second.
tagTimer.on('tick', function(seconds) {
  var index = 0 | Math.random() * 9;
  gamestate.toggleMole(index);
});
