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
      const { el } = this;
      const { top, bottom, front, back, left, right } = this.data;
      // const loader = new THREE.CubeTextureLoader();
      // loader.setPath( 'assets/' );
      // const textureCube = loader.load([
      //   'birch_log_top.png', 'birch_log_top.png',
      //   'birch_log1.png', 'birch_log1.png',
      //   'birch_log3.png', 'birch_log4.png',
      // ]);
      // const textureCube = loader.load([
      //   top, bottom,
      //   front, back,
      //   left, right,
      // ]);

      // const material = new THREE.MeshBasicMaterial({
      //   color: 0xffffff,
      //   envMap: textureCube
      // });
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
      });


      console.log('material', material);

      const mesh = el.getObject3D('mesh');
      if (!mesh) { throw new Error('No Mesh!'); }
      mesh.material = material;
    },

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

  console.log('bundle.js loaded at', _loadAt);

}());
