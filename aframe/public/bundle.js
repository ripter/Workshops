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
    }
  })();

  const COLORS = ['#0074D9', '#FF851B', '#7FDBFF', '#FF4136', '#2ECC40', '#B10DC9', '#FFDC00'];
  let COLOR_INDEX = 0;

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
      const elm = document.createElement('a-box');
      elm.setAttribute('color', COLORS[COLOR_INDEX]);
      elm.setAttribute('clickable', true);
      elm.classList.add('clickable');
      this.el.sceneEl.append(elm);

      COLOR_INDEX = (COLOR_INDEX + 1) % COLORS.length;
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

  AFRAME.registerComponent('block-cursor', {
    init() {
      this.intersectedPosition = new THREE.Vector3();
      this.elCursor = this.initCursor();
      this.cursor = this.elCursor.object3D;
    },

    tick() {
      const { cursor, intersectedPosition } = this;
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

  AFRAME.registerElement('c-cube', {
    prototype: Object.create(AFRAME.AEntity.prototype, {

      createdCallback: {
        value: function () {
          console.log('createdCallback called', this);
          this.classList.add('clickable');
          this.setAttribute('geometry', 'primitive: box; width: 1; height: 1; depth: 1');
          this.setAttribute('material-cube', 'top: #cubeTop; bottom: #cubeTop; front: #cubeSide1; back: #cubeSide2; left: #cubeSide3; right: #cubeSide4;');
          this.setAttribute('clickable', true);
        }
      },

      play: {
        value: function() {
          console.log('play called', this);
        }
      }
    }),
  });


  // export class MaterialCube extends HTMLElement {
  //   constructor() {
  //     super();
  //     console.log('constructor', arguments, this);
  //     const elScene = document.querySelector('a-scene');
  //     this.entity = this.createEntity();
  //     elScene.append(this.entity);
  //     return this.entity;
  //   }
  //
  //   createEntity() {
  //     const entity = document.createElement('a-entity');
  //     entity.setAttribute('clickable', true);
  //     entity.setAttribute('geometry', {primitive: 'box', depth: 1, height: 1, width: 1});
  //     entity.setAttribute('material-cube', {
  //       top: '#cubeTop',
  //       bottom: '#cubeTop',
  //       front: '#cubeSide1',
  //       back: '#cubeSide2',
  //       left: '#cubeSide3',
  //       right: '#cubeSide4',
  //     });
  //     return entity;
  //   }
  // }

  // AFRAME.registerPrimitive('cube-birch-log', {
  //   init() {
  //      console.log('c-cube init', this);
  //   },
  //   // Preset default components. These components and component properties will be attached to the entity out-of-the-box.
  //   defaultComponents: {
  //     clickable: {},
  //     geometry: {primitive: 'box', depth: 1, height: 1, width: 1},
  //     'material-cube': {},
  //   },
  //
  //   // Defined mappings from HTML attributes to component properties (using dots as delimiters).
  //   // If we set `depth="5"` in HTML, then the primitive will automatically set `geometry="depth: 5"`.
  //   mappings: {
  //     // depth: 'geometry.depth',
  //     // height: 'geometry.height',
  //     // width: 'geometry.width'
  //   },
  // });

  /*

        geometry="primitive: box; width: 1; height: 1; depth: 1"
        material-cube="top: #cubeTop; bottom: #cubeTop; front: #cubeSide1; back: #cubeSide2; left: #cubeSide3; right: #cubeSide4;"
        clickable

   */

  const _loadAt = (new Date()).toISOString();

  // import './shader-phong.js';
  // eslint-disable-next-line no-console
  console.log('bundle.js loaded at', _loadAt);

}());
