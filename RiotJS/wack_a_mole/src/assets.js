export const images = {
  dirt: require('./img/dirt.png'),
  rabbit: require('./img/moles/rabbit.png'),
  elephant: require('./img/moles/elephant.png'),
  hippo: require('./img/moles/hippo.png'),
  monkey: require('./img/moles/monkey.png'),
  panda: require('./img/moles/panda.png'),
  pig: require('./img/moles/pig.png'),
  snake: require('./img/moles/snake.png'),
  giraffe: require('./img/moles/giraffe.png'),
  parrot: require('./img/moles/parrot.png')
};
// The object is easer to type, but the array is easer to code.
// Since they never change, we can have the best of both worlds.
const imageKeys = Object.keys(images);

export function randomMole() {
  const index = 0 | Math.random() * (imageKeys.length-1) + 1;

  return images[imageKeys[index]];
}
