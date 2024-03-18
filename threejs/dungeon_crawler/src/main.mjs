import { 
  BoxGeometry, 
  HemisphereLight, 
  Mesh, 
  MeshBasicMaterial, 
  PerspectiveCamera, 
  Scene, 
  WebGLRenderer, 
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


//
// Run
//
const scene = new Scene();
const camera = new PerspectiveCamera(75, 5/3, 0.1, 1000);

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


let cube;
const loader = new GLTFLoader();
loader.load('/models/cube.glb', function (gltf) {
  console.log('loaded', gltf)
  scene.add(gltf.scene);

  // cube = gltf.scene;
  // handle Custom Tags on the models.
  gltf.scene.traverse(function (object) {
    if (object.isMesh) {
      // Check if the object has a 'tag' property and if it's set to 'Mob'
      if (object.userData.tag === 'mob') {
        console.log('Found a mob!', object)
        // Pass the model to your function
        // handleMobModel(object);
      }
    }
  });
},
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  // called when loading has errors
  function (error) {
    console.error('An error happened', error);
  }
);


// const geometry = new BoxGeometry();
// const material = new MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;


// Add some light
const light = new HemisphereLight(0xffffff, 0x444444);
light.position.set(1, 1, 1);
scene.add(light);

function animateLoop() {
    requestAnimationFrame(animateLoop);

    if (cube) {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }

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