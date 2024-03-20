import { Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

export class Player {
  constructor(camera) {
    this.camera = camera;
    camera.position.set(0, 1, 0);
    document.addEventListener('keydown', this);
  }

  handleEvent(event) {
    const { camera } = this;
    // Clone the current position so we don't alter the camera's actual position
    const newPosition = camera.position.clone();
    // Get the direction the camera is facing
    const direction = new Vector3();
    camera.getWorldDirection(direction);

    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        // Move forward in the direction the camera is facing
        camera.position.addScaledVector(direction, 1);
        event.preventDefault();
        break;
      case 'ArrowDown':
      case 's':
        // Move backward in the direction the camera is facing
        camera.position.addScaledVector(direction, -1);
        event.preventDefault();
        break;
      case 'ArrowLeft':
      case 'a':
        // Move left perpendicular to the direction the camera is facing
        camera.position.addScaledVector(new Vector3().crossVectors(camera.up, direction), 1);
        event.preventDefault();
        break;
      case 'ArrowRight':
      case 'd':
        // Move right perpendicular to the direction the camera is facing
        camera.position.addScaledVector(new Vector3().crossVectors(camera.up, direction), -1);
        event.preventDefault();
        break;
      case 'q':
        // Rotate left
        camera.rotateY(degToRad(90));
        event.preventDefault();
        break;
      case 'e':
        // Rotate right
        camera.rotateY(degToRad(-90));
        event.preventDefault();
        break;
    }
  }
}