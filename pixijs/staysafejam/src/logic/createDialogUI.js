import * as PIXI from 'pixi.js';

import { createContainer } from '../utils/createContainer';
import { createSpriteFromTileID } from '../utils/createSpriteFromTileID';
import { HEIGHT, WIDTH, TINT } from '../consts/dialog';


// Creates a dialog container.
export function createDialogUI(state) {
  const { tileWidth, tileHeight } = state;
  createContainer(state, 'dialog');
  //
  // Position the dialog near the bottom center.
  state.dialog.y = 576 - (16 * HEIGHT) - 16;
  state.dialog.x = 16 * 7;

  //
  // build the dialog box out of sprites.
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      let tileID = 1; // filler
      // if it's an edge, use the right edge piece
      if (x === 0 && y === 0) { tileID = 625; }
      else if (x === 0 && y === HEIGHT - 1) { tileID = 689; }
      else if (x === WIDTH - 1 && y === 0) { tileID = 627; }
      else if (x === WIDTH - 1 && y === HEIGHT - 1) { tileID = 691; }
      else if (y === 0) { tileID = 626; }
      else if (y === HEIGHT - 1) { tileID = 690; }
      else if (x === 0) { tileID = 657; }
      else if (x === WIDTH - 1) { tileID = 659; }
      // create and add the sprite
      const sprite = createSpriteFromTileID(state, tileID);
      sprite.x = x * tileWidth;
      sprite.y = y * tileHeight;
      sprite.tint = TINT;
      state.dialog.addChild(sprite);
    }
  }

  //
  // Add the Avatar
  const avatar = createSpriteFromTileID(state, 345);
  avatar.x = 16 * 3;
  avatar.y = 16;
  avatar.scale.set(4);
  avatar.name = 'avatar';
  avatar.tint = TINT;
  state.dialog.addChild(avatar);

  //
  // Add The text
  const message = new PIXI.Text('#StaySafeJam @ripter001 (Twitter)\nTheme: Solidary (March 2020)', {
    fontFamily: 'monospace',
    fontSize: 24,
    lineHeight: 24 * 1.4,
    fill: 0xcfc6b8,
    align: 'left',
  });
  message.x = 16 * 8;
  message.y = 16 * 1;
  message.name = 'message';
  state.dialog.addChild(message);


  //
  // Add the waiting for user input icon.
  const iconWait = createSpriteFromTileID(state, 512);
  iconWait.name = 'iconWait';
  iconWait.x = (tileWidth * WIDTH) - (tileWidth * 2);
  iconWait.y = (tileHeight * HEIGHT) - (tileHeight * 2);
  avatar.tint = TINT;
  state.dialog.addChild(iconWait);
}
