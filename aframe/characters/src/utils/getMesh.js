export const KEY_MESH = 'mesh';

// returns a promise that resovles with the 'mesh' object.
/**
 * [getMesh description]
 * @param  {HTMLElement} el root entity when looking for the mesh.
 * @return {Promise} resolves with mesh object.
 */
export function getMesh(el) {
  // BUG: cached is the orignial mesh object, while non-cached finds the type Mesh object.
  let mesh = el.getObject3D(KEY_MESH);
  // return the cached mesh if we have it.
  if (mesh) { return Promise.resolve(mesh); }

  // Wait for the mesh to load
  return new Promise((resolve) => {
    el.addEventListener('object3dset', function waitForMesh(evt) {
      const rootObj = evt.detail.object;
      // bail the object is not the mesh on our element.
      if (evt.detail.type !== KEY_MESH || evt.target !== el) { return void 0; }
      // now that we have the mesh, remove the listener.
      el.removeEventListener('object3dset', waitForMesh);

      // Look for a Skinned Mesh
      mesh = rootObj.getObjectByProperty('type', 'SkinnedMesh');
      if (mesh) {
        return resolve(mesh);
      }

      // Look for a base Mesh
      mesh = rootObj.getObjectByProperty('type', 'Mesh');
      if (mesh) {
        return resolve(mesh);
      }

      // default to the root object.
      return resolve(rootObj);
    });
  });
}
