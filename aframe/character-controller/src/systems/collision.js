import { ERROR_NO_MESH } from '../consts/error';

/*
 * Basic AABB collision detection.
*/
AFRAME.registerSystem('collision', {
  /**
   * Init handler. Called during scene initialization and is only run once.
   * Systems can use this to set initial state.
   */
  init() {
    this.entityBoxes = new Map();
  },

  /**
   * Adds the entity to collision checks.
  */
  add(entity, box) {
    this.entityBoxes.set(entity, box);

    const helper = new THREE.Box3Helper( box, 0xffff00 );
    entity.sceneEl.object3D.add(helper);
  },

  /**
   * Removes the entity from collision checkes.
  */
  remove(entity) {
    this.entityBoxes.delete(entity);
  },

  /**
   * Updates the entities collision box
  */
  updateCollisionBox(entity) {
    const box = this.entityBoxes.get(entity);
    const mesh = entity.getObject3D('mesh');
    if (!mesh) { throw ERROR_NO_MESH(mesh); }
    // Update the box to match the Mesh's world position
    box.copy( mesh.geometry.boundingBox ).applyMatrix4( mesh.matrixWorld );
  },

  /**
   * Return the colliding entity if there is a collision.
   * else returns null if there is no collision.
  */
  doesCollide(entity) {
    const box = this.entityBoxes.get(entity);
    const mesh = entity.getObject3D('mesh');

    for (let [el, elBox] of this.entityBoxes) {
      if (el === entity) { continue; }
      if (box.intersectsBox(elBox)) {
        return el;
      }
    }
    // No Collisions found.
    return null;
  },
});
