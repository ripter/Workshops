import * as PIXI from 'pixi.js';

import { createContainer } from '../utils/createContainer';
import { createSpriteFromTileID } from '../utils/createSpriteFromTileID';
import { WIDTH, TINT } from '../consts/dialog';

export function createChoiceUI(state) {
  const { tileWidth, tileHeight } = state;
  // Create a container layer inside the dialog
  createContainer(state, 'choiceLayer');
  state.dialog.addChild(state.choiceLayer);
  state.choiceLayer.x = (WIDTH * tileWidth) - (tileWidth * 13);
  state.choiceLayer.y = (tileHeight * 1);
  state.choiceLayer.visible = false;

  const icon = createSpriteFromTileID(state, 670);
  icon.name = 'icon';
  icon.scale.set(1.4);
  icon.tint = TINT;
  state.choiceLayer.addChild(icon);

  const confirm = new PIXI.Text('Yes', {
    fontFamily: 'monospace',
    fontSize: 24,
    lineHeight: 24 * 1.4,
    fill: 0xcfc6b8,
    align: 'left',
  });
  confirm.name = 'confirm';
  confirm.x = tileWidth * 2;
  state.choiceLayer.addChild(confirm);

  const cancel = new PIXI.Text('No', {
    fontFamily: 'monospace',
    fontSize: 24,
    lineHeight: 24 * 1.4,
    fill: 0xcfc6b8,
    align: 'left',
  });
  cancel.name = 'cancel';
  cancel.x = tileWidth * 2;
  cancel.y = tileHeight * 2;
  state.choiceLayer.addChild(cancel);
}
