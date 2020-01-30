import { Key } from '../consts/key_map';

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
    const { input } = this.el.sceneEl.systems;
    const animMixer = this.el.components['anim-mixer'];

    this.rotation = new THREE.Euler();
    this.velocity = new THREE.Vector3();
    this.rotate = { y: 0 };

    // Get isKeyDown from the input system. This reads player input
    this.isKeyDown = input.isKeyDown.bind(input);
    // Get PlayAnimation from the anim-mixer component.
    this.playAnimation = animMixer.playAction.bind(animMixer);
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
    const { el, playAnimation } = this;
    const { clipWalk, clipIdle } = this.data;
    const { velocity, rotation } = this.updateVelocityAndRotation();
    //TODO: Check static collisions
    //TODO: Check dynamic collisions

    // Match rotation
    el.object3D.rotateY(rotation.y);
    // use translate to move the object along it's local axis
    el.object3D.translateX(velocity.x);
    el.object3D.translateZ(velocity.z);

    //TODO: avoid setAttribute in tick(), it is slow.
    // use velocity to pick the current movement animation.
    if (velocity.x === 0 && velocity.z === 0) {
      playAnimation(clipIdle);
      // el.setAttribute('anim-mixer', 'activeClip: Idle;');
    } else {
      playAnimation(clipWalk);
      // el.setAttribute('anim-mixer', 'activeClip: Walk;');
    }
  },

  /**
   * Updates this.velocity and this.rotation based on isKeyDown.
   * returns { velocity, rotation } for convenience
  */
  updateVelocityAndRotation() {
    const { rotation, velocity, isKeyDown } = this;
    const { speed } = this.data;

    // Create a rocker style switch with two Keys.
    if (isKeyDown(Key.Forward)) { velocity.z = speed; }
    else if (isKeyDown(Key.Backward)) { velocity.z = -speed; }
    else { velocity.z = 0; }

    // Create a rocker style switch with two Keys.
    if (isKeyDown(Key.TurnLeft)) { rotation.y = speed; }
    else if (isKeyDown(Key.TurnRight)) { rotation.y = -speed; }
    else { rotation.y = 0; }

    // Return the updated values for a nicer API.
    return {
      velocity,
      rotation,
    };
  },
});
