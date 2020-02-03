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
   * Remove handler. Similar to detachedCallback.
   * Called whenever component is removed from the entity (i.e., removeAttribute).
   * Components can use this to reset behavior on the entity.
   */
  remove() {
    const { el, systemCollision } = this;
    // remove from collisions
    systemCollision.removeEntity(el);
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
          // Add ourself to collision detection.
          system.add(el, box);
        }
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`, event); // eslint-disable-line
    }
  },
});
