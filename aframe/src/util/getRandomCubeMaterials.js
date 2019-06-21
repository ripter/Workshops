
/**
 * Returns materials for a cube with the sides randomized.
 * @param  {String} [assetType='birch'] [description]
 * @return {Object}
 */
export function getRandomCubeMaterials(assetType = 'birch') {
  const imgTop = document.querySelector(`.img-${assetType}-top`);
  const imgBottom = document.querySelector(`.img-${assetType}-bottom`);
  const imgSides = Array.from(document.querySelectorAll(`.img-${assetType}-side`)).sort(() => 0.5 - Math.random());

  return {
    top: '#' + imgTop.id,
    bottom: '#' + imgBottom.id,
    front: '#' + imgSides[0].id,
    back: '#' + imgSides[1].id,
    left: '#' + imgSides[2].id,
    right: '#' + imgSides[3].id,
  }
}
