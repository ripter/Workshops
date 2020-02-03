import { getBoundingBox } from '../utils/getBoundingBox';

/**
 * Adds the Mesh to collision detection on object3dset event.
*/
AFRAME.registerComponent('collision', {
  /**
   * Init handler. Similar to attachedCallback.
   * Called during component initialization and is only run once.
   * Components can use this to set initial state.
  */
  init() {
    // Listen for add/remove of key objects mesh
    this.el.addEventListener('object3dset', this);
  },

  /**
   * Tick handler.
   * Called on each tick of the scene render loop.
   * Affected by play and pause.
   *
   * @param {number} time - Scene tick time.
   * @param {number} timeDelta - Difference in current render time and previous render time.
   */
  tick() {
    const mesh = this.el.getObject3D('mesh');
    if (!mesh) { return; }
    this.system.updateCollisionBox(this.el);
  },

  /**
   * Remove handler. Similar to detachedCallback.
   * Called whenever component is removed from the entity (i.e., removeAttribute).
   * Components can use this to reset behavior on the entity.
   */
  remove() {
    const { el, system } = this;
    // remove from collisions
    system.removeEntity(el);
  },

  /**
   * DOM Event handler.
   * Called when a listening event is observed.
   * @param  {Event} event the event that has been fired and needs to be processed.
   * @return {undefined}
   */
  handleEvent(event) {
    const { el, system } = this;

    switch (event.type) {
      case 'object3dset':
        if (event.detail.type === 'mesh') {
          const box = getBoundingBox(el);
          system.add(el, box);
        }
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`, event); // eslint-disable-line
    }
  },
});
