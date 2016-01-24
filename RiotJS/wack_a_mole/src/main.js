const riot = require('riot');
const Store = require('./store');

// We need to include the puppy tag because we use it in index.html
require('./gameboard.tag');

var gamestate = new Store();
console.log('gamestate', gamestate);

// render all the tags
const tags = riot.mount('*');
// for debugging
window.tags = tags;
