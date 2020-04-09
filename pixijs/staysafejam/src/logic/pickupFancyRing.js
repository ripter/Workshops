import { ACTION } from '../consts/action';
import { LAYER } from '../consts/tiledMap';

export function pickupFancyRing(state) {
  const { mobLayer } = state;
  const layer = state.level.find((i) => i.type === 'objectgroup' && i.name === LAYER.EVENTS);
  const eventObject = layer.objects.find((obj) => obj.name === 'found_fancy_ring');
  console.log('You picked up the ring');

  // remove the event now that we have the ring.
  if (eventObject.sprite) {
    mobLayer.removeChild(eventObject.sprite);
    eventObject.sprite.destroy();
  }
  layer.objects = layer.objects.filter((obj) => obj !== eventObject);

  // Mark that we have the ring, and trigger an message about it.
  state.hasFancyRing = true;
  state.pendingActions.push({
    type: ACTION.DIALOG,
    key: 'take_fancy_ring',
  });
}
