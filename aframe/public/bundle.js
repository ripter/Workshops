(function () {
  'use strict';

  function fmtNumber(number) {
    return '' + ((0|number*100)/100);
  }

  const CLAMP_VELOCITY = 0.00001;
  const MAX_DELTA = 0.2;

  AFRAME.registerComponent('axis-controls', {
    schema: {
      acceleration: {default: 65},
      enabled: {default: true},
    },

    init() {
      const { el } = this;

      this.player = document.querySelector('#player').object3D;
      this.camera = document.querySelector('#player [camera]').object3D;
      this.velocity = new THREE.Vector3();
      this.easing = 1.1;
      this.axis = [0,0];

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

  AFRAME.registerComponent('clickable', {
    // schema: {
    // },

    init() {
      this.el.addEventListener('click', function (evt) {
        const { distance } = evt.detail.intersection;
        console.log('click', evt.detail);

        //DEBUG:
        const elLog = document.querySelector('#logDebug2');
        elLog.setAttribute('value', `click: ${(0|distance*100)/100}`);
        //DEBUG END
      });
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

      // Load all the textures before updating the materials
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

  // Helper to log something in front of the camera.
  function logCamera(msg) {
    const elLog = document.querySelector('#logDebug2');
    elLog.setAttribute('value', msg);
  }

  AFRAME.registerComponent('block-cursor', {
    // schema: {
    //   target: {type: 'selector'},
    // },

    init() {
      // console.log('init block-cursor', this.data, this);
      this.elCursor = this.initCursor();

      // this.el.addEventListener('raycaster-intersection', (evt) => {
      //   console.log('intersection', evt);
      //   this.raycaster = evt.detail.els
      // });
      // this.el.addEventListener('raycaster-intersected-cleared', () => {
      //   console.log('clear intersection')
      //   this.raycaster = null
      // });
    },

    tick() {
      const { raycaster } = this.el.components;
      if (!raycaster) { return; }
      const { intersections } = raycaster;
      if (!intersections || intersections.length === 0) {
        logCamera('');
        return;
      }
      // console.log('intersection', intersections[0]);
      const { distance } = intersections[0];
      logCamera(`dist: ${fmtNumber(distance)}`);
    },

    initCursor() {
      const elm = document.createElement('a-entity');
      elm.id = 'block-cursor--cursor';
      this.el.sceneEl.append(elm);
      return elm;
    },
  });

  const _loadAt = (new Date()).toISOString();

  // import './shader-phong.js';
  // eslint-disable-next-line no-console
  console.log('bundle.js loaded at', _loadAt);

}());
