/* global riot */
import './gameboard.tag';
import './timer.tag';
import './score.tag';
import './mole-log.tag';
import {images, randomMoleImage} from './assets.js';
import {ACTION, TIMER} from './consts.js';

const END_TIME = 30; // 60 second rounds
let currentTime = 0;
let isRunning = true;
let lastIndex = 0;


// create the mole list
let moles = Array(9).fill({src: images.dirt});
moles = moles.map((mole, index) => {
  return Object.assign({}, mole, {id: index});
});

// Init the timer.
let timerTag = riot.mount('timer')[0];
// init the gameboard with moles
const gameboard = riot.mount('gameboard', {
  moles: moles
})[0];
window.gameboard = gameboard;

// Start the AI
let intervalID = setInterval(tick, TIMER.SECOND);
ai();

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


// Show/Hide moles!
function ai() {
  const index = 0 | Math.random() * moles.length;
  let nextTime = 1000;

  if (moles[lastIndex] ) {
    moles[lastIndex].src = images.dirt;
  }
  if (moles[index]) {
    moles[index].src = randomMoleImage();
  }

  lastIndex = index;
  gameboard.update({
    moles: moles
  });

  // Call the AI again if the game is still running.
  if (isRunning) {
    setTimeout(ai, nextTime);
  }
}

// Called every second.
function tick() {
  currentTime += 1; //It's been a second!

  console.log('tick', currentTime);
  timerTag.update({
    seconds: currentTime
  });

  if (currentTime >= END_TIME) {
    isRunning = false;
    clearInterval(intervalID);
    console.log('Game Over');
  }
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
