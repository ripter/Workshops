import { 
  HemisphereLight, 
  PerspectiveCamera, 
  Scene, 
  WebGLRenderer, 
} from 'three';
import { loadModel } from './loadModel.mjs';
import { Level } from './Level.mjs';
import { Player } from './Player.mjs';


//
// Load the Level
// Level is specified in the URL query string, e.g. ?level=level001
// Load the level from the URL query string or default to 'cow_level'
const searchParams = new URLSearchParams(location.search)
const levelName = searchParams.get('level') || 'cow_level';
const level = await Level.Load(`/levels/${levelName}/config.json`);
window.level = level;


// Create the Player
const camera = new PerspectiveCamera(75, 5/3, 0.1, 1000);
const player = new Player(camera, level);
window.player = player;

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



const scene = new Scene();
// Add the Level to the scene.
level.scene.position.set(0, 0, 0);
scene.add(level.scene);

// Add a test cube to the scene
const cube = await loadModel('/models/cube.glb');
// cube.position.set(3, 0, -2);
cube.position.set(0, 0, 0);
scene.add(cube);


// Add some light
const light = new HemisphereLight(0xffffff, 0x444444);
light.position.set(1, 1, 1);
scene.add(light);

function animateLoop() {
    requestAnimationFrame(animateLoop);

    // Render the scene
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


