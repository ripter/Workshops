/**
 * Adds the Mesh to collision detection on object3dset event.
*/
AFRAME.registerComponent('collision', {
  schema: {
    size: { type: 'vec3', default: { x: 1, y: 1.8, z: 1 } },
  },

  /**
   * Init handler. Similar to attachedCallback.
   * Called during component initialization and is only run once.
   * Components can use this to set initial state.
  */
  init() {
    this.box = new THREE.Box3();
    this.center = new THREE.Vector3();

    // Register our box in the collision system.
    this.system.add(this.el, this.box);
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
    const { size } = this.data;
    const { box, center } = this;

    // Update the Box to match position/size/rotation
    box.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);
    // Update the size to match the schema, keeping the center.
    box.getCenter(center);
    box.setFromCenterAndSize(center, size);
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
});
