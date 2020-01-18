
export const intersectionDirection = (() => {
  const worldPosition = new THREE.Vector3();
  const offset = new THREE.Vector3();

  return (width, { point, object }) => {
    // half width of the object, which we are assuming because it's always a 1x1x1 block for now.
    const halfWidth = 0.5;

    // convert the object position into a world position.
    object.getWorldPosition(worldPosition);
    // Subtrack the point, so we can figure out which side to use.
    offset.copy(worldPosition).sub(point);

    if (Math.abs(offset.y) === halfWidth) {
      worldPosition.y += offset.y < 0 ? width : -1 * width;
    } else if (Math.abs(offset.x) === halfWidth) {
      worldPosition.x += offset.x < 0 ? width : -1 * width;
    } else {
      worldPosition.z += offset.z < 0 ? width : -1 * width;
    }

    return worldPosition;
  };
})();
