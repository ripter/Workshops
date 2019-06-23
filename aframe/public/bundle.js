(function () {
  'use strict';

  /**
   * Movement System
   * Each tick, the system checks `agent.movementVector`
   * @type {Array}
   */
  AFRAME.registerSystem('movement', {
    init() {
      this.agents = [];
    },


    tick(/*time, delta*/) {
      const { agents } = this;

      // Update the position of all the agents
      agents.forEach((component) => {
        const { el, movementVector } = component;
        if (!movementVector) { return; }
        // Add the movementVector each tick if it exists.
        el.object3D.position.add(movementVector);
      });
    },

    /**
     * Adds a component as an agent of the system.
     * Each tick, the system checks for agent.movementVector
     */
    addAsAgent(agent) {
      this.agents.push(agent);
    },
  });

  const KEYCODE_TO_CODE = {
    '38': 'ArrowUp',
    '37': 'ArrowLeft',
    '40': 'ArrowDown',
    '39': 'ArrowRight',
    '87': 'KeyW',
    '65': 'KeyA',
    '83': 'KeyS',
    '68': 'KeyD',
  };
  const CLAMP_VELOCITY = 0.00001;
  const MAX_DELTA = 0.2;
  const KEYS = [
    'KeyW', 'KeyA', 'KeyS', 'KeyD',
    'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown',
  ];

  AFRAME.registerComponent('desktop-movement', {
    schema: {
      acceleration: {default: 65},
      adAxis: {default: 'x', oneOf: ['x', 'y', 'z']},
      adEnabled: {default: true},
      adInverted: {default: false},
      enabled: {default: true},
      fly: {default: false},
      wsAxis: {default: 'z', oneOf: ['x', 'y', 'z']},
      wsEnabled: {default: true},
      wsInverted: {default: false},
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
      var data = this.data;
      var velocity = this.velocity;

      if (!velocity[data.adAxis] && !velocity[data.wsAxis] &&
        isEmptyObject(this.keys)) { return; }

      // Update velocity.
      delta = delta / 1000;
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
      var acceleration;
      var adAxis;
      var adSign;
      var data = this.data;
      var keys = this.keys;
      var velocity = this.velocity;
      var wsAxis;
      var wsSign;

      adAxis = data.adAxis;
      wsAxis = data.wsAxis;

      // If FPS too low, reset velocity.
      if (delta > MAX_DELTA) {
        velocity[adAxis] = 0;
        velocity[wsAxis] = 0;
        return;
      }

      // https://gamedev.stackexchange.com/questions/151383/frame-rate-independant-movement-with-acceleration
      var scaledEasing = Math.pow(1 / this.easing, delta * 60);
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
      var directionVector = new THREE.Vector3(0, 0, 0);
      var rotationEuler = new THREE.Euler(0, 0, 0, 'YXZ');

      return function (delta) {
        var rotation = this.el.getAttribute('rotation');
        var velocity = this.velocity;
        var xRotation;

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
    })(),

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
      }
      else {
        this.onFocus();
      }
    },

    onKeyDown(event) {
      var code;
      code = event.code || KEYCODE_TO_CODE[event.keyCode];
      if (KEYS.indexOf(code) !== -1) { this.keys[code] = true; }
    },

    onKeyUp(event) {
      var code;
      code = event.code || KEYCODE_TO_CODE[event.keyCode];
      delete this.keys[code];
    },
  });

  function isEmptyObject (obj) {
    // eslint-disable-next-line guard-for-in
    for (let key in obj) { return false; }
    return true;
  }

  function fmtNumber(number) {
    return '' + ((0|number*100)/100);
  }

  const CLAMP_VELOCITY$1 = 0.00001;
  const MAX_DELTA$1 = 0.2;

  AFRAME.registerComponent('axis-movement', {
    dependencies: ['tracked-controls'],
    schema: {
      acceleration: {default: 65},
      enabled: {default: true},
    },

    init() {
      const { el/*, sceneEl*/ } = this;

      this.player = document.querySelector('#player').object3D;
      this.camera = document.querySelector('#player [camera]').object3D;
      this.velocity = new THREE.Vector3();
      this.easing = 1.1;
      this.axis = [0,0];
      // this.systemMovement = sceneEl.systems.movement;
      //
      // console.log('this.systemMovement', this.systemMovement);

      el.addEventListener('trackpadchanged', (e) => {
        const { pressed } = e.detail;
        const axis = this.el.components['tracked-controls'].axis.map(fmtNumber);

        if (pressed) {
          this.axis = axis;
        }
        else {
          this.axis = [0,0];
        }
      });
    },


    tick(time, delta) {
      const { player } = this;

      // Update velocity.
      delta = delta / 1000;
      this.updateVelocity(delta);

      if (!this.velocity.x && !this.velocity.z) { return; }
      // Get movement vector and translate position.
      player.position.add(this.getMovementVector(delta));
    },

    /**
     * Updates this.velocity based on axis state.
     */
    updateVelocity(delta) {
      const { axis, data, easing, velocity } = this;
      const { acceleration } = data;

      // If FPS too low, reset velocity.
      if (delta > MAX_DELTA$1) {
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
      if (Math.abs(velocity.x) < CLAMP_VELOCITY$1) { velocity.x = 0; }
      if (Math.abs(velocity.z) < CLAMP_VELOCITY$1) { velocity.z = 0; }

      if (!this.data.enabled) { return; }

      // Find the strongest direction, and only accelerate in that direction.
      if (Math.abs(axis[1]) >= Math.abs(axis[0])) {
        if (axis[1] < 0) { velocity.z -= acceleration * delta; }
        else if (axis[1] > 0) { velocity.z += acceleration * delta; }
      }
      else {
        if (axis[0] < 0) { velocity.x -= acceleration * delta; }
        else if (axis[0] > 0) { velocity.x += acceleration * delta; }
      }
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
    })(),
  });

  const intersectionDirection = (() => {
    const worldPosition = new THREE.Vector3();
    const offset = new THREE.Vector3();

    return (width, {point, object}) => {
      // half width of the object, which we are assuming because it's always a 1x1x1 block for now.
      const halfWidth = 0.5;

      // convert the object position into a world position.
      object.getWorldPosition(worldPosition);
      // Subtrack the point, so we can figure out which side to use.
      offset.copy(worldPosition).sub(point);

      if (Math.abs(offset.y) === halfWidth) {
        worldPosition.y += offset.y < 0 ? width : -1 * width;
      }
      else if (Math.abs(offset.x) === halfWidth) {
        worldPosition.x += offset.x < 0 ? width : -1 * width;
      }
      else {
        worldPosition.z += offset.z < 0 ? width : -1 * width;
      }

      return worldPosition;
    };
  })();

  AFRAME.registerComponent('clickable', {
    // schema: {
    // },

    init() {
      this.cursorPosition = new THREE.Vector3();
      this.cusorOffset = new THREE.Vector3();
      this.el.addEventListener('click', this.onClick.bind(this));
    },

    onClick(event) {
      const direction = intersectionDirection(1, event.detail.intersection);
      this.placeBlock(direction);
    },

    placeBlock(position) {
      const elBlock = this.createBlock();
      elBlock.setAttribute('position', position);
    },

    createBlock() {
      const elm = document.createElement('c-cube');
      this.el.sceneEl.append(elm);
      return elm;
    },
  });

  /**
   * Material that takes six textures, one for each side fo the cube.
   * @type {Object}
   */
  AFRAME.registerComponent('material-cube', {
    schema: {
      top: {type: 'map'},
      bottom: {type: 'map'},
      front: {type: 'map'},
      back: {type: 'map'},
      left: {type: 'map'},
      right: {type: 'map'},
    },

    init() {
      // Use the standard material system.
      this.system = this.el.sceneEl.systems.material;
      this.loadMaterial();
    },

    loadMaterial() {
      const { el, system } = this;
      const { top, bottom, front, back, left, right } = this.data;
      const mesh = el.getObject3D('mesh');
      if (!mesh) { throw new Error('No Mesh!'); }

      // Load all the textures into the system before using the materials
      Promise.all([
        loadTexture(system, right),
        loadTexture(system, left),
        loadTexture(system, top),
        loadTexture(system, bottom),
        loadTexture(system, front),
        loadTexture(system, back),
      ]).then((textures) => {
        for (let i=0; i < textures.length; i++) {
          mesh.material[i].map = textures[i];
        }
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });

      // Setup default blank materials while we load the textures
      mesh.material = Array(6).fill().map(() => new THREE.MeshPhongMaterial({}));
    },

  });

  // Wrapper to return Promise from system.loadImage
  function loadTexture(system, src, data = {}) {
    if (!data.src) {
      data.src = src;
    }
    return new Promise((resolve) => {
      system.loadImage(src, data, (texture) => {
        resolve(texture);
      });
    });
  }

  AFRAME.registerComponent('block-cursor', {
    init() {
      this.elCursor = this.initCursor();
      this.cursor = this.elCursor.object3D;
    },

    tick() {
      const { cursor } = this;
      const { raycaster } = this.el.components;
      if (!raycaster) { return; }
      const { intersections } = raycaster;

      if (!intersections || intersections.length === 0) {
        cursor.visible = false;
        return;
      }

      const direction = intersectionDirection(0.5, intersections[0]);
      cursor.visible = true;
      cursor.position.copy(direction);
    },

    initCursor() {
      const elm = document.createElement('a-box');
      elm.id = 'block-cursor--cursor';
      elm.setAttribute('color', 'orange');
      elm.setAttribute('depth', 0.5);
      elm.setAttribute('width', 0.5);
      elm.setAttribute('height', 0.5);
      elm.setAttribute('transparent', true);
      elm.setAttribute('opacity', 0.75);
      this.el.sceneEl.append(elm);
      return elm;
    },
  });

  /**
   * Returns materials for a cube with the sides randomized.
   * @param  {String} [assetType='birch'] [description]
   * @return {Object}
   */
  function getRandomCubeMaterials(assetType = 'birch') {
    const imgTop = document.querySelector(`.img-${assetType}-top`);
    const imgBottom = document.querySelector(`.img-${assetType}-bottom`);
    const imgSides = Array.from(document.querySelectorAll(`.img-${assetType}-side`)).sort(() => 0.5 - Math.random());

    return {
      top: '#' + imgTop.id,
      bottom: '#' + imgBottom.id,
      front: '#' + imgSides[0].id,
      back: '#' + imgSides[1].id,
      left: '#' + imgSides[2].id,
      right: '#' + imgSides[3].id,
    };
  }

  // Create a new element based on a-entity
  // We can do things here that are not possible with a mixin
  AFRAME.registerElement('c-cube', {
    prototype: Object.create(AFRAME.AEntity.prototype, {
      // Called when created.
      createdCallback: {
        value: function () {
          this.setAttribute('geometry', 'primitive: box; width: 1; height: 1; depth: 1');
          this.setAttribute('material-cube', getRandomCubeMaterials());
          this.classList.add('clickable');
          this.setAttribute('clickable', true);
        },
      },
    }), // end prototype:
  });

  const _loadAt = (new Date()).toISOString();

  // import './shader-phong.js';
  // eslint-disable-next-line no-console
  console.log('bundle.js loaded at', _loadAt);

}());
