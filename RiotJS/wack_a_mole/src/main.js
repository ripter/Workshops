import Store from './store.js';
require('./gameboard.tag');

// Create a new game
var gamestate = new Store();
console.log('gamestate', gamestate);

// render all the tags
const tags = riot.mount('gameboard', gamestate);
// for debugging
window.tags = tags;
