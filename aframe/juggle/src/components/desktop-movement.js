const KEYCODE_TO_CODE = {
  38: 'ArrowUp',
  37: 'ArrowLeft',
  40: 'ArrowDown',
  39: 'ArrowRight',
  87: 'KeyW',
  65: 'KeyA',
  83: 'KeyS',
  68: 'KeyD',
};
const CLAMP_VELOCITY = 0.00001;
const MAX_DELTA = 0.2;
const KEYS = [
  'KeyW', 'KeyA', 'KeyS', 'KeyD',
  'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown',
];

AFRAME.registerComponent('desktop-movement', {
  schema: {
    acceleration: { default: 65 },
    adAxis: { default: 'x', oneOf: ['x', 'y', 'z'] },
    adEnabled: { default: true },
    adInverted: { default: false },
    enabled: { default: true },
    fly: { default: false },
    wsAxis: { default: 'z', oneOf: ['x', 'y', 'z'] },
    wsEnabled: { default: true },
    wsInverted: { default: false },
  },

  init() {
    // Add ourself to the movement system which handles actual movements.
    this.system = this.el.sceneEl.systems.movement;
    this.system.addAsAgent(this);

    // To keep track of the pressed keys.
    this.keys = {};
    this.easing = 1.1;

    this.velocity = new THREE.Vector3();

    // Bind methods and add event listeners.
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    this.attachVisibilityEventListeners();
  },

  tick(time, delta) {
    // console.log('component.tick');
    const { data } = this;
    const { velocity } = this;

    if (!velocity[data.adAxis] && !velocity[data.wsAxis]
      && isEmptyObject(this.keys)) { return; }

    // Update velocity.
    delta /= 1000;
    this.updateVelocity(delta);

    if (!velocity[data.adAxis] && !velocity[data.wsAxis]) { return; }

    // Get movement vector and translate position.
    this.movementVector = this.getMovementVector(delta);
  },

  remove() {
    this.removeKeyEventListeners();
    this.removeVisibilityEventListeners();
  },

  play() {
    this.attachKeyEventListeners();
  },

  pause() {
    this.keys = {};
    this.removeKeyEventListeners();
  },

  updateVelocity(delta) {
    let acceleration;
    let adAxis;
    let adSign;
    const { data } = this;
    const { keys } = this;
    const { velocity } = this;
    let wsAxis;
    let wsSign;

    adAxis = data.adAxis;
    wsAxis = data.wsAxis;

    // If FPS too low, reset velocity.
    if (delta > MAX_DELTA) {
      velocity[adAxis] = 0;
      velocity[wsAxis] = 0;
      return;
    }

    // https://gamedev.stackexchange.com/questions/151383/frame-rate-independant-movement-with-acceleration
    const scaledEasing = Math.pow(1 / this.easing, delta * 60);
    // Velocity Easing.
    if (velocity[adAxis] !== 0) {
      velocity[adAxis] -= velocity[adAxis] * scaledEasing;
    }
    if (velocity[wsAxis] !== 0) {
      velocity[wsAxis] -= velocity[wsAxis] * scaledEasing;
    }

    // Clamp velocity easing.
    if (Math.abs(velocity[adAxis]) < CLAMP_VELOCITY) { velocity[adAxis] = 0; }
    if (Math.abs(velocity[wsAxis]) < CLAMP_VELOCITY) { velocity[wsAxis] = 0; }

    if (!data.enabled) { return; }

    // Update velocity using keys pressed.
    acceleration = data.acceleration;
    if (data.adEnabled) {
      adSign = data.adInverted ? -1 : 1;
      if (keys.KeyA || keys.ArrowLeft) { velocity[adAxis] -= adSign * acceleration * delta; }
      if (keys.KeyD || keys.ArrowRight) { velocity[adAxis] += adSign * acceleration * delta; }
    }
    if (data.wsEnabled) {
      wsSign = data.wsInverted ? -1 : 1;
      if (keys.KeyW || keys.ArrowUp) { velocity[wsAxis] -= wsSign * acceleration * delta; }
      if (keys.KeyS || keys.ArrowDown) { velocity[wsAxis] += wsSign * acceleration * delta; }
    }
  },

  getMovementVector: (function () {
    const directionVector = new THREE.Vector3(0, 0, 0);
    const rotationEuler = new THREE.Euler(0, 0, 0, 'YXZ');

    return function (delta) {
      const rotation = this.el.getAttribute('rotation');
      const { velocity } = this;
      let xRotation;

      directionVector.copy(velocity);
      directionVector.multiplyScalar(delta);

      // Absolute.
      if (!rotation) { return directionVector; }

      xRotation = this.data.fly ? rotation.x : 0;

      // Transform direction relative to heading.
      rotationEuler.set(THREE.Math.degToRad(xRotation), THREE.Math.degToRad(rotation.y), 0);
      directionVector.applyEuler(rotationEuler);
      return directionVector;
    };
  }()),

  attachVisibilityEventListeners() {
    window.addEventListener('blur', this.onBlur);
    window.addEventListener('focus', this.onFocus);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  },

  removeVisibilityEventListeners() {
    window.removeEventListener('blur', this.onBlur);
    window.removeEventListener('focus', this.onFocus);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  },

  attachKeyEventListeners() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },

  removeKeyEventListeners() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  },

  onBlur() {
    this.pause();
  },

  onFocus() {
    this.play();
  },

  onVisibilityChange() {
    if (document.hidden) {
      this.onBlur();
    } else {
      this.onFocus();
    }
  },

  onKeyDown(event) {
    let code;
    code = event.code || KEYCODE_TO_CODE[event.keyCode];
    if (KEYS.indexOf(code) !== -1) { this.keys[code] = true; }
  },

  onKeyUp(event) {
    let code;
    code = event.code || KEYCODE_TO_CODE[event.keyCode];
    delete this.keys[code];
  },
});

function isEmptyObject(obj) {
  // eslint-disable-next-line guard-for-in
  for (const key in obj) { return false; }
  return true;
}
