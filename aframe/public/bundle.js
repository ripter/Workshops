(function () {
  'use strict';

  AFRAME.registerComponent('material-cube', {
    schema: {
      // Add properties.
      top: {default: ''},
      bottom: {default: ''},
      front: {default: ''},
      back: {default: ''},
      left: {default: ''},
      right: {default: ''},
    },

    init() {
      console.log('c-cube .init', this);
      this.loadMaterial();
      // this.material = this.el.getOrCreateObject3D('mesh').material = new THREE.ShaderMaterial({
      //   // ...
      // });
    },

    update() {
      console.log('c-cube .update', this.data);
      // Update `this.material`.
    },

    loadMaterial() {
      const { top, bottom, front, back, left, right } = this.data;
      const loader = new THREE.CubeTextureLoader();
      loader.setPath( 'assets/' );
      const textureCube = loader.load([
        'birch_log_top.png', 'birch_log_top.png',
        'birch_log1.png', 'birch_log1.png',
        'birch_log3.png', 'birch_log4.png',
      ]);
      // const textureCube = loader.load([
      //   top, bottom,
      //   front, back,
      //   left, right,
      // ]);

      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        envMap: textureCube
      });
      console.log('material', material);
      this.setMaterial(material);
    },

    /**
     * (Re)create new material. Has side-effects of setting `this.material` and updating
     * material registration in scene.
     *
     * @param {object} data - Material component data.
     * @param {object} type - Material type to create.
     * @returns {object} Material.
     */
    setMaterial(material) {
      var el = this.el;
      var mesh;
      // var system = this.system;

      if (this.material) { disposeMaterial(this.material); }

      this.material = material;
      // system.registerMaterial(material);

      // Set on mesh. If mesh does not exist, wait for it.
      mesh = el.getObject3D('mesh');
      if (mesh) {
        mesh.material = material;
      } else {
        el.addEventListener('object3dset', function waitForMesh (evt) {
          if (evt.detail.type !== 'mesh' || evt.target !== el) { return; }
          el.getObject3D('mesh').material = material;
          el.removeEventListener('object3dset', waitForMesh);
        });
      }
    },
  });


  /**
   * Dispose of material from memory and unsubscribe material from scene updates like fog.
   */
  function disposeMaterial (material, system) {
    material.dispose();
    // system.unregisterMaterial(material);
  }

  AFRAME.registerShader('cubeshader', {
    schema: {
      emissive: {default: '#000'},
      wireframe: {default: true},
      src: {default: ''},
    },

    update() {
      console.group('cubeshader.update');
      console.log('this', this);
      console.log('arguments', arguments);
      console.groupEnd();
    }
  });

  console.log('Index loaded');

}());
