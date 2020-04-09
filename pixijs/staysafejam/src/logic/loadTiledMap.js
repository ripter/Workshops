import { arrayToGridSprite } from '../utils/convertPosition';
import { createContainer } from '../utils/createContainer';
import { createSpriteFromTileID } from '../utils/createSpriteFromTileID';
import { LAYER } from '../consts/tiledMap';

/**
 * Loads the level, creating sprites as needed.
 * Mutates state
*/
export function loadTiledMap(state, { tiledMap }) {
  //
  // Save shortcuts to requred data.
  state.level = tiledMap.layers;
  state.tileWidth = tiledMap.tilewidth;
  state.tileHeight = tiledMap.tileheight;

  //
  // Load all the tile layers as sprites in containers
  Object.values(LAYER).forEach((layerName) => {
    const layer = state.level.find((i) => i.type === 'tilelayer' && i.name === layerName);
    if (!layer) { return; } // ignore objectgroups
    const { width } = layer;

    // Create a container to hold the background sprites.
    createContainer(state, layerName);

    // Create a sprite for each tile.
    layer.data.forEach((tileID, index) => {
      const sprite = createSpriteFromTileID(state, tileID);
      const position = arrayToGridSprite(state, { index, width });
      sprite.position.copyFrom(position);
      state[layerName].addChild(sprite);
    });
  });
}
