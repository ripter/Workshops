import { PerspectiveCamera } from 'three';

class PerspectiveCameraComponent {
  constructor() {
    let elements = document.querySelectorAll('[camera-perspective]');

    elements.forEach((elm) => {
      const { scene } = elm.closest('[scene]');

      elm.camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      scene.add(elm.camera);
    });
  }
}

export default PerspectiveCameraComponent;
