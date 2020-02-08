import { Key } from '../consts/key_map';
import { readKeysAsRocker } from '../utils/readKeysAsRocker';

/**
 * User Controls for the demo
 */
AFRAME.registerComponent('user-controls', {
  schema: {
    enabled: { default: true },
    speed: { default: 0.05 },
    clipWalk: { default: 'Walk' },
    clipIdle: { default: 'Idle' },
  },

  /**
   * Init handler. Similar to attachedCallback.
   * Called during component initialization and is only run once.
   * Components can use this to set initial state.
   */
  init() {
    const { collision, input } = this.el.sceneEl.systems;
    const animMixer = this.el.components['anim-mixer'];

    // Get isKeyDown from the input system. This reads player input
    this.isKeyDown = input.isKeyDown.bind(input);
    // Get PlayAnimation from the anim-mixer component.
    this.playAnimation = animMixer.playAction.bind(animMixer);
    this.willCollide = collision.willCollide.bind(collision);
    // this.collisionIntersection = collision.intersection.bind(collision);
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
    if (!this.data.enabled) { return; } // bail if not enabled
    const { el } = this;
    let { velocity, rotation } = this.readUserInput();

    // Check collisins with other moving mobs
    velocity = this.updateFromCollisions(velocity);

    // use velocity to pick the animation.
    this.updateAnimation(velocity);

    // Match rotation
    el.object3D.rotateY(rotation.y);
    // use translate to move the object along it's local axis
    el.object3D.translateX(velocity.x);
    el.object3D.translateZ(velocity.z);
  },


  /**
   * Reads isKeyDown to create velocity and rotation values.
  */
  readUserInput: (() => {
    const rotation = new THREE.Euler();
    const velocity = new THREE.Vector3();

    return function readUserInput() {
      const { isKeyDown } = this;
      const { speed } = this.data;

      // Reset the velocity back to 0
      velocity.set(0, 0, 0);

      // Create a rocker style switch with two Keys.
      velocity.z = readKeysAsRocker(isKeyDown, Key.Forward, Key.Backward) * speed;
      rotation.y = readKeysAsRocker(isKeyDown, Key.TurnLeft, Key.TurnRight) * speed;

      return {
        velocity,
        rotation,
      };
    };
  })(),

  /**
   * Update the animation based on velocity.
  */
  updateAnimation(velocity) {
    const { playAnimation } = this;
    const { clipWalk, clipIdle } = this.data;

    if (velocity.x === 0 && velocity.z === 0) {
      playAnimation(clipIdle);
    } else {
      playAnimation(clipWalk);
    }
  },

  updateFromCollisions(velocity) {
    const { el, willCollide } = this;
    // const { speed } = this.data;
    const collidedEl = willCollide(el, velocity);

    if (collidedEl !== null) {
      // velocity.z = 0; // Problem: Causes model to freeze, unable to move once they collide with another.
      // Problem with negative speed, is that if the player backs into someting, they will slowly backwards walk out of it.
      // velocity.z = -speed; // Problem: Causes model to  jitter as it bounces back and forth.
      // velocity.z = -speed * 0.25; // Problem: causes jitter, but smoother jitter
      if (velocity.z > 0) {
        velocity.z = 0;
      }
    }

    return velocity;
  },
});
