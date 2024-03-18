import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Loads a GLTF/GLB model from the given URL.
 * @param {string} url 
 * @returns 
 */
export async function loadModel(url) {
  const loader = new GLTFLoader();

  try {
    const gltf = await loader.loadAsync(url);

    // Process any custom tags on the models.
    gltf.scene.traverse(function (object) {
      if (object.isMesh) {
        // Check if the object has a 'tag' property and if it's set to 'Mob'
        if (object.userData.tag === 'mob') {
          console.log('Found a mob!', object);
        }
      }
    });

    return gltf.scene;
  } catch (error) {
    throw error; // Rethrow the error to handle it outside or indicate failure
  }
}
