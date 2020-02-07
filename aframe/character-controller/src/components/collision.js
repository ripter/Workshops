import { getBoundingBoxFromMesh } from '../utils/getBoundingBoxFromMesh';

/**
 * Adds the Mesh to collision detection on object3dset event.
*/
AFRAME.registerComponent('collision', {
  schema: {
    size: { type: 'vec3' },
    center: { type: 'vec3' },
    // offset: { type: 'vec3' },
    useMesh: { default: false },
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

  createBoundingBox() {
    const { el } = this;
    const { useMesh, size, center } = this.data;

    if (useMesh) {
      return getBoundingBoxFromMesh(el);
    }

    const boxCenter = new THREE.Vector3();
    boxCenter.copy(el.object3D.position);
    // boxCenter.add(center);
    // console.log('boxCenter', boxCenter);

    const box = new THREE.Box3();
    box.setFromObject(el.object3D);
    // box.setFromCenterAndSize(boxCenter, size);
    console.log('box', box.min, box.max);
    return box;
  },
});
