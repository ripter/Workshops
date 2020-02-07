import { getBoundingBoxFromMesh } from '../utils/getBoundingBoxFromMesh';

/**
 * Adds the Mesh to collision detection on object3dset event.
*/
AFRAME.registerComponent('collision', {
  schema: {
    offset: { type: 'vec3' },
  },

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

    // Bail if it's not the right event
    if (event.type !== 'object3dset') { return; }
    if (event.detail.type !== 'mesh') { return; }

    // Add the collision box to the system.
    system.add(el, this.createBoundingBox());
  },

  /**
   * Creates a Collision Bounding Box for the entity
  */
  createBoundingBox() {
    const { el } = this;
    const { offset } = this.data;
    const box = new THREE.Box3();

    // Set it around the object
    box.setFromObject(el.object3D);
    // Apply offset to the box
    box.min.add(offset);
    box.max.sub(offset);

    return box;
  },
});
