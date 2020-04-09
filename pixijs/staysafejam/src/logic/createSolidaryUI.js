import { createContainer } from '../utils/createContainer';
import { createSpriteFromTileID } from '../utils/createSpriteFromTileID';

const MAX = 4;
const TINT = 0xAAAAAA;

export function createSolidaryUI(state) {
  const { tileWidth, tileHeight } = state;
  createContainer(state, 'solidary');

  //
  // Position the UI to the left of the Dialog
  state.solidary.x = tileWidth * 8;
  state.solidary.y = tileHeight * 30;

  for (let i = 0; i < MAX; i++) {
    const sprite = createSpriteFromTileID(state, 729);
    sprite.y = i * tileHeight;
    sprite.tint = TINT;
    state.solidary.addChild(sprite);
  }
}
