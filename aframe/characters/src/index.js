import './gltf-model-2';
import './material-2';
import './gltf-animations';
import './animation-control';

import { Pedestal } from './elements/pedestal';

const scene = document.querySelector('a-scene');

if (scene.hasLoaded) {
  run();
} else {
  scene.addEventListener('loaded', run);
}

function run () {
  console.log('Everything Loaded and Ready!', scene); // eslint-disable-line
  // var entity = scene.querySelector('a-entity');
  // entity.setAttribute('material', 'color', 'red');
  const tmp = Pedestal({
    src: '#model',
  });
  console.log('tmp', tmp);
  scene.append(tmp);
}
