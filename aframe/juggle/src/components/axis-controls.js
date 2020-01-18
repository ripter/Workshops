import { fmtNumber } from '../util/fmtNumber';

const CLAMP_VELOCITY = 0.00001;
const MAX_DELTA = 0.2;

AFRAME.registerComponent('axis-controls', {
  schema: {
    acceleration: { default: 65 },
    enabled: { default: true },
  },

  init() {
    const { el/* , sceneEl */ } = this;

    this.player = document.querySelector('#player').object3D;
    this.camera = document.querySelector('#player [camera]').object3D;
    this.velocity = new THREE.Vector3();
    this.easing = 1.1;
    this.axis = [0, 0];
    // this.systemMovement = sceneEl.systems.movement;
    //
    // console.log('this.systemMovement', this.systemMovement);

    el.addEventListener('trackpadchanged', (e) => {
      const { pressed } = e.detail;
      const axis = this.el.components['tracked-controls'].axis.map(fmtNumber);

      if (pressed) {
        this.axis = axis;
      } else {
        this.axis = [0, 0];
      }
    });
  },


  tick(time, delta) {
    const { player } = this;

    // Update velocity.
    delta /= 1000;
    this.updateVelocity(delta);

    if (!this.velocity.x && !this.velocity.z) { return; }
    // Get movement vector and translate position.
    player.position.add(this.getMovementVector(delta));
  },

  /**
   * Updates this.velocity based on axis state.
   */
  updateVelocity(delta) {
    const {
      axis, data, easing, velocity,
    } = this;
    const { acceleration } = data;

    // If FPS too low, reset velocity.
    if (delta > MAX_DELTA) {
      velocity.x = 0;
      velocity.z = 0;
      return;
    }

    // https://gamedev.stackexchange.com/questions/151383/frame-rate-independant-movement-with-acceleration
    const scaledEasing = Math.pow(1 / easing, delta * 60);
    // Velocity Easing.
    if (velocity.x !== 0) {
      velocity.x -= velocity.x * scaledEasing;
    }
    if (velocity.z !== 0) {
      velocity.z -= velocity.z * scaledEasing;
    }

    // Clamp velocity easing.
    if (Math.abs(velocity.x) < CLAMP_VELOCITY) { velocity.x = 0; }
    if (Math.abs(velocity.z) < CLAMP_VELOCITY) { velocity.z = 0; }

    if (!this.data.enabled) { return; }

    // Find the strongest direction, and only accelerate in that direction.
    if (Math.abs(axis[1]) >= Math.abs(axis[0])) {
      if (axis[1] < 0) { velocity.z -= acceleration * delta; } else if (axis[1] > 0) { velocity.z += acceleration * delta; }
    } else if (axis[0] < 0) { velocity.x -= acceleration * delta; } else if (axis[0] > 0) { velocity.x += acceleration * delta; }
  },

  /**
   * Returns a Vector3 rotated with velocity applied
   * @return {Vector3}
   */
  getMovementVector: (function () {
    const directionVector = new THREE.Vector3(0, 0, 0);
    const quaternion = new THREE.Quaternion();

    return function (delta) {
      const { camera, velocity } = this;

      directionVector.copy(velocity);
      directionVector.multiplyScalar(delta);

      camera.getWorldQuaternion(quaternion);
      // Cancel rotation on x and z to keep us flat
      quaternion.x = 0;
      quaternion.z = 0;
      // Rotate the direction
      directionVector.applyQuaternion(quaternion);
      return directionVector;
    };
  }()),
});
