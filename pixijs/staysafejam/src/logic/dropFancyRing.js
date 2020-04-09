import { LAYER } from '../consts/tiledMap';
import { createSpriteFromTileID } from '../utils/createSpriteFromTileID';

export function dropFancyRing(state) {
  const { mobLayer, player, tileWidth } = state;
  const layer = state.level.find((i) => i.type === 'objectgroup' && i.name === LAYER.EVENTS);
  const eventObject = layer.objects.find((obj) => obj.name === 'found_fancy_ring');

  if (!eventObject.sprite) {
    // create the ring item
    eventObject.sprite = createSpriteFromTileID(state, 910);
    mobLayer.addChild(eventObject.sprite);
    // Put it under the player, and keep a refrence for next call.
    eventObject.sprite.zIndex = 1;
  }
  // Move the ring/event on space east.
  eventObject.x = player.x + tileWidth;
  eventObject.y = player.y;
  eventObject.sprite.x = eventObject.x;
  eventObject.sprite.y = eventObject.y;
}
