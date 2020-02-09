/**
 * Adds the Mesh to collision detection on object3dset event.
*/
AFRAME.registerComponent('collision', {
  schema: {
    size: { type: 'vec3', default: { x: 1, y: 1.8, z: 1 }},
    offset: { type: 'vec3', default: { x: 0, y: 1, z: 0 }},
  },

  /**
   * Init handler. Similar to attachedCallback.
   * Called during component initialization and is only run once.
   * Components can use this to set initial state.
  */
  init() {
    this.box = new THREE.Box3();
    this.center = new THREE.Vector3();

    this.matrix = new THREE.Matrix4();
    this.position = new THREE.Vector3();
    this.quaternion = new THREE.Quaternion();
    this.scale = new THREE.Vector3();

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
    const { size, offset } = this.data;
    const { box, center, position, quaternion, scale, matrix } = this;

    // We need the Box to move/rotate along with the Mesh.
    // We create a Matrix4 that only contains Position/Rotation.
    mesh.matrixWorld.decompose(position, quaternion, scale);
    matrix.makeRotationFromQuaternion(quaternion);
    matrix.setPosition(position);

    // Copy the geometry's boundingBox so we can find the entity's center in world space.
    box.copy(mesh.geometry.boundingBox);
    // Our custom size/position for the collision box.
    box.getCenter(center);
    box.setFromCenterAndSize(center, size);

    // Lastly, Apply the position/rotation to match the Mesh.
    box.applyMatrix4(matrix);
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
