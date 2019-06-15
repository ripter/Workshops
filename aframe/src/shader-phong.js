
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
