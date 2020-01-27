
/**
 * Returns the Max Bounding Box of the Mesh geometry.
 * @helper
*/
export function getBoundingBox(entity) {
  const mesh = entity.getObject3D('mesh');
  return mesh.geometry.boundingBox.max;
}
