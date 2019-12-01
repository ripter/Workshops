
// returns a promise that resovles with the 'mesh' object.
export function getMesh(el) {
  let mesh = el.getObject3D('mesh');
  // return the cached mesh if we have it.
  if (mesh) { return Promise.resolve(mesh); }

  // Wait for the mesh to load
  return new Promise((resolve, reject) => {
    el.addEventListener('object3dset', function waitForMesh (evt) {
      // bail the object is not the mesh on our element.
      if (evt.detail.type !== 'mesh' || evt.target !== el) { return; }
      // now that we have the mesh, remove the listener.
      el.removeEventListener('object3dset', waitForMesh);

      // Look for a Skinned Mesh
      mesh = el.getObject3D('mesh').getObjectByProperty('type', 'SkinnedMesh');
      if (mesh) {
        return resolve(mesh)
      }
      // Look for a base Mesh
      mesh = el.getObject3D('mesh').getObjectByProperty('type', 'Mesh');
      if (mesh) {
        return resolve(mesh)
      }
      // default to the root object.
      return resolve(el.object3D);
    });
  });
}
