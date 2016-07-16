/* global riot */
import './gameboard.tag';
import './timer.tag';
import './score.tag';
import './mole-log.tag';
import './banner.tag';
import './button.tag';
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
let moles = createMoles();


// Mount the tags
const timerTag = riot.mount('timer')[0];
const scoreTag = riot.mount('score')[0];
const logTag = riot.mount('mole-log')[0];
const gameboard = window.gameboard = riot.mount('gameboard')[0];
const bannerTag = riot.mount('banner')[0];

//
// Start the game
actionStartGame();



// ACTION: user clicks a mole
function actionClickMole(clickedMole) {
  const {id, src, isUp} = clickedMole.item;
  // Ignore clicks when the mole isn't up
  if (!isUp) { return; }

  // Update the mole and the moles list
  const mole = Object.assign({}, clickedMole, {
    src: randomMoleImage(),
    isUp: false
  });
  // global moles object
  moles[id] = mole;

  // Update the log list
  const logItem = Object.assign({}, {hit: 0, src: src}, log[src]);
  logItem.hit += 1;
  // global log object
  log[src] = logItem;

  // global total hit count
  hitCount += 1;
  // global score
  score += 1 + (hitCount * 1.5);

  // Render all the tags with the new states
  renderGameboard();
  renderLog();
  scoreTag.update({
    score: score
  });
};

function actionStartGame() {
  currentTime = 0;
  isRunning = true;
  lastIndex = 0;
  score = 0;
  hitCount = 0;
  log = {};
  intervalID;
  moles = createMoles();

  renderGameboard();
  bannerTag.update({
    visible: false
  });
  intervalID = setInterval(tick, TIMER.SECOND);
  ai();
}


// Show/Hide moles!
function ai() {
  // pick a square at random
  const index = 0 | Math.random() * moles.length;
  // speed up a little with every hit
  let nextTime = 1000 - (hitCount * 55);

  // have the old mole pop down.
  if (moles[lastIndex] ) {
    moles[lastIndex].isUp = false;
  }

  // flip a mole
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
      visible: true,
      message: 'Game Over',
      buttonText: 'Restart Game',
      onClick: actionStartGame
    });
    console.log('Game Over');
  }
}

// create the mole list
function createMoles() {
  // Create an array of 9 moles.
  return Array(9).fill({}).map((index) => {
    return {
      id: index,
      isUp: false,
      src: randomMoleImage(),
      onClick: actionClickMole
    };
  });
}

// Render the gameboard tag
function renderGameboard() {
  gameboard.update({
    moles: moles.map(setProp.bind(null, 'src', (mole) => {
      return mole.isUp ? mole.src : images.dirt;
    }))
  });
}

// Render the log tag
function renderLog() {
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
