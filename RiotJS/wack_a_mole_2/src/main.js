/* global riot */
import './gameboard.tag';
import './timer.tag';
import './score.tag';
import './mole-log.tag';
import Store from './store.js';
import {images, randomMoleImage} from './assets.js';
import {ACTION} from './consts.js';

// Create a new game
var store = new Store();
//DEBUGGING:
window.store = store;

// create the mole list
let moles = Array(9).fill({src: images.dirt});
moles = moles.map((mole, index) => {
  return Object.assign({}, mole, {id: index});
});

// init the gameboard with moles
const gameboard = riot.mount('gameboard', {
  moles: moles
})[0];
window.gameboard = gameboard;

// Start the AI
tick();

// when a mole is clicked
gameboard.on(ACTION.CLICKED, function(item) {
  // Ignore clicks on dirt
  if (isDirt(item)) { return; }
  //TODO: register the hit
  const index = item.id;
  console.log('gameboard.click', item);

  moles[index].src = images.dirt;
  gameboard.update({
    moles: moles
  });
});


function tick() {
  const index = 0 | Math.random() * moles.length;

  moles[index].src = randomMoleImage();

  gameboard.update({
    moles: moles
  });
}


// Filters
function isDirt(mole) {
  return mole.src === images.dirt;
}

// render all the tags and pass them gamestate
// riot.mount('*', store);

//
// // <timer /> emits TIMER.TICK every second.
// gamestate.on(TIMER.TICK, function(seconds) {
//   var {lastIndex} = gamestate;
//   var index = lastIndex;
//
//   // find a hidden mole
//   while (index === lastIndex) {
//     index = 0 | Math.random() * 9;
//   }
//
//   // hide the last mole we showed and show a new one instead.
//   gamestate.trigger(ACTION.MOLE.HIDE, [lastIndex], true);
//   gamestate.trigger(ACTION.MOLE.SHOW, [index], true);
//   gamestate.update({
//     lastIndex: index
//   });
// });
//
// // when a mole has been 'hit' by the player
// // this is different than ACTION.CLICKED, HIT only emits when the mole was clicked and showing.
// gamestate.on(MOLE.HIT, function(mole) {
//   const src = mole.src;
//   let {score, moleLog} = gamestate;
//   let log = moleLog[src];
//
//   if (!log) { log = 1; }
//   else { log += 1; }
//
//   moleLog[src] = log;
//
//   gamestate.update({
//     score: score + 10,
//     moleLog: moleLog
//   });
// });
//
//
//
// //
// // Auto START
// gamestate.trigger('TIMER.START');
