(function () {
  'use strict';

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

  const CLAMP_VELOCITY = 0.00001;
  const MAX_DELTA = 0.2;

  AFRAME.registerComponent('axis-controls', {
    // dependencies: ['laser-controls'],
    schema: {
      acceleration: {default: 65},
      enabled: {default: true},
    },

    init() {
      const { el } = this;

      this.player = document.querySelector('#player').object3D;
      this.velocity = new THREE.Vector3();
      this.easing = 1.1;
      this.axis = [0,0];

      el.addEventListener('trackpadchanged', (e) => {
        const { pressed } = e.detail;
        const axis = this.el.components['tracked-controls'].axis.map(num => (0|num*100)/100);

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

    updateVelocity(delta) {
      const { axis, data, velocity } = this;
      const { acceleration } = data;

      // If FPS too low, reset velocity.
      if (delta > MAX_DELTA) {
        velocity.x = 0;
        velocity.z = 0;
        return;
      }

      // https://gamedev.stackexchange.com/questions/151383/frame-rate-independant-movement-with-acceleration
      const scaledEasing = Math.pow(1 / this.easing, delta * 60);
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
        if (this.axis[1] < 0) { velocity.z -= acceleration * delta; }
        else if (this.axis[1] > 0) { velocity.z += acceleration * delta; }
      }
      else {
        if (this.axis[0] < 0) { velocity.x -= acceleration * delta; }
        else if (this.axis[0] > 0) { velocity.x += acceleration * delta; }
      }


      //DEBUG:
      const elLog = document.querySelector('#logDebug2');
      elLog.setAttribute('value', `axis: ${this.axis}`);
      //DEBUG END
    },

    getMovementVector: (function () {
      const directionVector = new THREE.Vector3(0, 0, 0);
      const rotationEuler = new THREE.Euler(0, 0, 0, 'YXZ');

      return function (delta) {
        const { player, velocity } = this;
        const { rotation } = player;
        let xRotation = 0;

        directionVector.copy(velocity);
        directionVector.multiplyScalar(delta);

        // Absolute.
        if (!rotation) { return directionVector; }

        // Transform direction relative to heading.
        rotationEuler.set(THREE.Math.degToRad(xRotation), THREE.Math.degToRad(rotation.y), 0);
        directionVector.applyEuler(rotationEuler);
        return directionVector;
      };
    })(),
  });

  AFRAME.registerShader('phong', {
    schema: {
      color: {default: '#fff'},
      wireframe: {default: false},
      src: {type: 'map'},
    },

    init(data) {
      const system = this.el.sceneEl.systems.material;
      // Load the src as a Texture and apply it to the material
      system.loadImage(data.src, data, (texture) => {
        // Update the material with the loaded texture
        this.material.map = texture;
        this.material.needsUpdate = true;
      });

      // initial material
      this.material = new THREE.MeshPhongMaterial({
        color: data.color,
        wireframe: data.wireframe,
      });
    },
  });

  const _loadAt = (new Date()).toISOString();

  // eslint-disable-next-line no-console
  console.log('bundle.js loaded at', _loadAt);

}());
