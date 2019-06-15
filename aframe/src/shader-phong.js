
AFRAME.registerShader('phong', {
  schema: {
    color: {default: '#fff'},
    emissive: {default: '#fff'},
    wireframe: {default: true},
    src: {type: 'map'},
  },

  init(data) {
    const system = this.el.sceneEl.systems.material;
    console.group('phong shader');
    console.log('system.material', system);
    console.table('data', data);

    system.loadImage(data.src, data, (texture) => {
      console.log('image loaded', arguments);
      console.log('texture', texture);
      // Update the material with the loaded texture
      this.material.map = texture;
      this.material.needsUpdate = true;
    });

    // Create the inital material
    this.material = new THREE.MeshPhongMaterial({
      color: data.color,
    });
    console.groupEnd();
  },
});
