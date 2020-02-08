import { ERROR_NO_MESH } from '../consts/error';
import { createBoundingBox } from '../utils/createBoundingBox';

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
  updateCollisionBox(entity, offset) {
    const { matrixWorld, position } = entity.object3D;
    const box = this.entityBoxes.get(entity);

    // Translate won't work. It moves the box in local space from it's current position.
    // It does not set it's position to a new one.
    // box.translate(position);

    // Just applying the matrixWorld has the same issue as Translate.
    // box.applyMatrix4(matrixWorld);

    // Same issue, Box runs off
    // const matrix = new THREE.Matrix4();
    // matrix.setPosition(position);
    // box.applyMatrix4(matrix);

    // Works, has some issues. The Collision box changes sizes when selected.
    const newBox = createBoundingBox(entity, offset);
    box.copy(newBox);
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
