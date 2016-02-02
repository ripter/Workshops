/* global riot */
import './gameboard.tag';
import './timer.tag';
import './score.tag';
import './mole-log.tag';
import './banner.tag';
import {images, randomMoleImage} from './assets.js';
import {ACTION, TIMER} from './consts.js';

const END_TIME = 20; // 60 second rounds
let currentTime = 0;
let isRunning = true;
let lastIndex = 0;
let score = 0;
let hitCount = 0;
let log = {};
let intervalID;

// create the mole list
let moles = Array(9).fill({isUp: false});
moles = moles.map((mole, index) => {
  return Object.assign({}, mole, {id: index, src: randomMoleImage()});
});

// Mount the tags
const timerTag = riot.mount('timer')[0];
const scoreTag = riot.mount('score')[0];
const logTag = riot.mount('mole-log')[0];
const gameboard = window.gameboard = riot.mount('gameboard')[0];
const bannerTag = riot.mount('banner')[0];

//
// Main
function startGame() {
  bannerTag.update({
    visible: false
  });
  intervalID = setInterval(tick, TIMER.SECOND);
  ai();
}
// Start the game
startGame();

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

  hitCount += 1;
  // Update the score
  score += 1 + (hitCount * 1.5);

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
  // speed up a little with every hit
  let nextTime = 1000 - (hitCount * 55);

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
    bannerTag.update({
      visible: true  
    });
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
