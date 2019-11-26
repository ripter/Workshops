// Make sure we have all the required libraries.
if (!THREE.FBXLoader) { throw new Error('THREE.FBXLoader not found.\nYou can find the file at https://github.com/mrdoob/three.js/blob/dev/examples/js/loaders/FBXLoader.js')}

/**
 * Loads an fbx file as the Object3D [mesh](https://threejs.org/docs/index.html#api/en/objects/Mesh).
 */
AFRAME.registerComponent('fbx-model', {
  schema: {type: 'asset'},
  init() {
    const url = this.data;
    const loader = this.loader = new THREE.FBXLoader();

    loader.load(url, (model) => {
      console.log('model', model);
    }, void 0, (error) => {
      console.error('Error Loading file', error);
    });
  },
});
