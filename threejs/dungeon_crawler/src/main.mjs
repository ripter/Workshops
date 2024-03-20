import { 
  HemisphereLight, 
  PerspectiveCamera, 
  Scene, 
  WebGLRenderer, 
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { loadModel } from './loadModel.mjs';
import { Level } from './Level.mjs';
import { degToRad } from 'three/src/math/MathUtils';

// Level is specified in the URL query string, e.g. ?level=level001
// Load the level from the URL query string or default to 'cow_level'
const searchParams = new URLSearchParams(location.search)
const levelName = searchParams.get('level') || 'cow_level';
// const level = new Level(`/levels/${levelName}.json`);
const level = await Level.Load(`/levels/${levelName}/config.json`);
window.level = level;
console.log('Level:', level);




//
// Run
//
const scene = new Scene();
const camera = new PerspectiveCamera(75, 5/3, 0.1, 1000);
camera.position.set(0, 1, 0);

//
// Create the renderer
const renderer = new WebGLRenderer();
const { width, height } = calculateSize();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);


// Ensure the renderer size is updated if the window size changes
window.addEventListener('resize', () => {
  const { width, height } = calculateSize();
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});



// Add the Level to the scene.
// level.scene.position.set(level.config.gridWidth / -2, 0, level.config.gridHeight / -2);
level.scene.position.set(0, 0, 0);
scene.add(level.scene);

// Add a test cube to the scene
const cube = await loadModel('/models/cube.glb');
// cube.position.set(3, 0, -2);
cube.position.set(0, 0, 0);
scene.add(cube);


function updatePosition(event) {
  event.preventDefault();
  switch (event.key) {
    case 'ArrowUp':
    case 'w':
      camera.position.z -= 1;
      break;
    case 'ArrowDown':
    case 's':
      camera.position.z += 1;
      break;
    case 'ArrowLeft':
    case 'a':
      camera.position.x -= 1;
      break;
    case 'ArrowRight':
    case 'd':
      camera.position.x += 1;
      break;
    case 'q':
      camera.rotateY(degToRad(90));
      break;
    case 'e':
      camera.rotateY(degToRad(-90));
      break;
  }
}
document.addEventListener('keydown', updatePosition);



// Add some light
const light = new HemisphereLight(0xffffff, 0x444444);
light.position.set(1, 1, 1);
scene.add(light);

function animateLoop() {
    requestAnimationFrame(animateLoop);

    // if (cube) {
    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;
    // }

    // controls.update(); // Only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(scene, camera);
}


// Start the Animation Loop
animateLoop();




// Calculate the largest 5:3 aspect ratio dimensions that fit entirely in the current screen
function calculateSize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  const aspectRatio = 5 / 3;

  // Adjust width and height based on the aspect ratio
  if (width / height > aspectRatio) {
      // Window is too wide
      width = height * aspectRatio;
  } else {
      // Window is too tall
      height = width / aspectRatio;
  }

  return { width, height };
}


