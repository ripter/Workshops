import { ERROR_NO_MESH } from '../consts/error';

/*
 * Basic AABB collision detection.
*/
AFRAME.registerSystem('collision', {
  schema: {
    renderBox: { default: false },
  },

  /**
   * Init handler. Called during scene initialization and is only run once.
   * Systems can use this to set initial state.
   */
  init() {
    this.entityBoxes = new Map();
    this.tmpBox = new THREE.Box3;
  },

  /**
   * Adds the entity to collision checks.
  */
  add(entity, box) {
    const { renderBox } = this.data;

    this.entityBoxes.set(entity, box);

    if (renderBox) {
      const helper = new THREE.Box3Helper(box, 0xffff00);
      entity.sceneEl.object3D.add(helper);
    }
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

    // box.applyMatrix4(mesh.matrixWorld);
    // Update the box to match the Mesh's world position
    box.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);
  },

  /**
   * Return the colliding entity if there is a collision.
   * else returns null if there is no collision.
  */
  willCollide(entity, velocity) {
    const { tmpBox } = this;
    const box = this.entityBoxes.get(entity);

    // move the box as if the entity did move
    // This lets us test where the box will be, not were it is.
    //QUESTION: is this needed?
    // box.translate(velocity);

    for (const [el, elBox] of this.entityBoxes) {
      if (el === entity) { continue; }
      if (box.intersectsBox(elBox)) {
        return el;
      }
    }
    // No Collisions found.
    return null;
  },

  /**
   * returns the [intersect](https://threejs.org/docs/index.html#api/en/math/Box3.intersect) of the two entity's colliding boxes.
  */
  intersection(entityA, entityB) {
    const { entityBoxes } = this;
    const boxA = entityBoxes.get(entityA);
    const boxB = entityBoxes.get(entityB);
    return boxA.intersect(boxB);
  },
});
