import { Key } from '../consts/key_map';

/**
 * User Controls for the demo
 */
AFRAME.registerComponent('user-controls', {
  schema: {
    speed: { default: 0.05 },
  },

  /**
   * Init handler. Similar to attachedCallback.
   * Called during component initialization and is only run once.
   * Components can use this to set initial state.
   */
  init() {
    this.rotation = new THREE.Euler();
    this.velocity = new THREE.Vector3();
    this.rotate = { y: 0 };
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
    const { el } = this;
    const { velocity, rotation } = this.updateVelocityAndRotation();

    // Match rotation
    el.object3D.rotateY(rotation.y);
    // use translate to move the object along it's local axis
    el.object3D.translateX(velocity.x);
    el.object3D.translateZ(velocity.z);

    // if we have velocity, play the walking animation, else use the Idle
    if (velocity.x === 0 && velocity.z === 0) {
      el.setAttribute('anim-mixer', 'clipName: Idle;');
    } else {
      el.setAttribute('anim-mixer', 'clipName: Walk;');
    }
  },

  /**
   * Updates this.velocity and this.rotation based on user input.
   * returns { velocity, rotation } for convenience
  */
  updateVelocityAndRotation() {
    const { rotation, velocity } = this;
    const { speed } = this.data;
    const { input } = this.el.sceneEl.systems;
    const isKeyDown = input.isKeyDown.bind(input);

    // Forward, Backward is like a rocker switch or a one axis joystick.
    if (isKeyDown(Key.Forward)) { velocity.z = speed; }
    else if (isKeyDown(Key.Backward)) { velocity.z = -speed; }
    else { velocity.z = 0; }

    // Rocker switch style input
    if (isKeyDown(Key.TurnLeft)) { rotation.y = speed; }
    else if (isKeyDown(Key.TurnRight)) { rotation.y = -speed; }
    else { rotation.y = 0; }

    return {
      velocity,
      rotation,
    };
  },
});
