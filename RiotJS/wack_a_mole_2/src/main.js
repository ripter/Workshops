/* global riot */
import './gameboard.tag';
import './timer.tag';
import './score.tag';
import './mole-log.tag';
import {images, randomMoleImage} from './assets.js';
import {ACTION, TIMER} from './consts.js';

const END_TIME = 20; // 60 second rounds
let currentTime = 0;
let isRunning = true;
let lastIndex = 0;
let score = 0;
let log = {};

// create the mole list
let moles = Array(9).fill({isUp: false});
moles = moles.map((mole, index) => {
  return Object.assign({}, mole, {id: index, src: randomMoleImage()});
});

// Mount the tags
const timerTag = riot.mount('timer')[0];
const scoreTag = riot.mount('score')[0];
const logTag = riot.mount('mole-log')[0];
const gameboard = riot.mount('gameboard')[0];
window.gameboard = gameboard;


//
// Main
// Start the game
let intervalID = setInterval(tick, TIMER.SECOND);
ai();

//
// Events
// when a mole is clicked
gameboard.on(ACTION.CLICKED, function(prevMole) {
  const {id, src, isUp} = prevMole;
  // Ignore clicks when the mole isn't up
  if (!isUp) { return; }

  // create an updated mole
  const mole = Object.assign({}, prevMole, {
    src: randomMoleImage(),
    isUp: false
  });
  // global moles list
  moles[id] = mole;

  // create an updated logItem
  const logItem = Object.assign({}, {hit: 0, src: src}, log[src]);
  logItem.hit += 1;
  // global log object
  log[src] = logItem;

  // Update the score
  score += 1 + (score * 1.35);

  // Render all the tags with the new states
  renderGameboard(moles);
  renderLog(log);
  scoreTag.update({
    score: score
  });
});


// Show/Hide moles!
function ai() {
  const index = 0 | Math.random() * moles.length;
  let nextTime = 1000 - (score * 5);

  if (moles[lastIndex] ) {
    moles[lastIndex].isUp = false;
  }
  if (moles[index]) {
    moles[index].isUp = true;
    // if the image is dirt, pick a random mole instead
    if (moles[index].src === images.dirt) {
      moles[index].src = randomMoleImage();
    }
  }

  lastIndex = index;
  renderGameboard(moles);

  // Call the AI again if the game is still running.
  if (isRunning) {
    setTimeout(ai, nextTime);
  }
}

// Called every second.
function tick() {
  currentTime += 1; //It's been a second!

  timerTag.update({
    seconds: currentTime
  });

  if (currentTime >= END_TIME) {
    isRunning = false;
    clearInterval(intervalID);
    console.log('Game Over');
  }
}

// Render the gameboard tag
function renderGameboard(moles) {
  gameboard.update({
    moles: moles.map(setProp.bind(null, 'src', (mole) => {
      return mole.isUp ? mole.src : images.dirt;
    }))
  });
}

// Render the log tag
function renderLog(log) {
  logTag.update({
    moles: Object.keys(log).map((key) => { return log[key]; })
  });
}


// helpers
function setProp(key, getValue, obj) {
  obj[key] = getValue(obj, key);
  return obj;
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
