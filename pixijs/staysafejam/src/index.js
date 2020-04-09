import * as PIXI from 'pixi.js';

import { ACTION } from './consts/action';
import { dispatch } from './dispatch';
import { startWASD } from './playerControls';

// Starting Level
import level from './assets/level_1.json';

const WIDTH = 1024;
const HEIGHT = 576;
const RESOLUTION = 1;

// Create a Pixi Application
const app = window.app = new PIXI.Application({ width: WIDTH, height: HEIGHT, resolution: RESOLUTION });
// Add the canvas that Pixi automatically created for you to the HTML document
window.elRoot.appendChild(app.view);


// Load our assets
PIXI.Loader.shared
  .add('tilesheet', 'assets/colored.json')
  .load((loader, resources) => {
    // Once all the async resources are loaded,
    // dispatch the init action to start the game.
    dispatch({
      type: ACTION.INIT,
      resources,
      tiledMap: level,
      app,
    });
    // Start listening for player input
    startWASD();
  });
