import { Camera, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { Level } from './Level.mjs';

export class Player {
  #level;
  #camera;

  /**
   * Creates a new Player in the Level.
   * @param {Camera} camera 
   * @param {Level} level 
   */
  constructor(camera, level) {
    this.#level = level;
    this.#camera = camera;
    camera.position.set(0, 1, 0);
    document.addEventListener('keydown', this);
  }

  // position of the player.
  get position() {
    return this.#camera.position;
  }

  handleEvent(event) {
    const camera = this.#camera
    const { position } = this;
    // Clone the current position so we don't alter the camera's actual position
    const newPosition = position.clone();
    // Get the direction the camera is facing
    const direction = new Vector3();
    camera.getWorldDirection(direction);

    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        newPosition.addScaledVector(direction, 1);
        event.preventDefault();
        break;
      case 'ArrowDown':
      case 's':
        newPosition.addScaledVector(direction, -1);
        event.preventDefault();
        break;
      case 'ArrowLeft':
      case 'a':
        newPosition.addScaledVector(new Vector3().crossVectors(camera.up, direction), 1);
        event.preventDefault();
        break;
      case 'ArrowRight':
      case 'd':
        newPosition.addScaledVector(new Vector3().crossVectors(camera.up, direction), -1);
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

    // Round the new position to the nearest whole number
    newPosition.x = Math.round(newPosition.x);
    newPosition.z = Math.round(newPosition.z);
    // Attempt to move to the new position.
    this.attemptMove(newPosition);
  }

  /**
   * Attempt to move the Player to the new position.
   * Will stop if moving to an impassable position.
   * @param {Vector3} newPosition 
   */
  attemptMove(newPosition) {
    const level = this.#level;
    // Check if the new positon is impassable
    const tile = level.getTile(newPosition);
    // Nope, can't move there. We are tile-locked.
    if (!tile) { return; }
    // Tile not passable, can't move there.
    if (tile.impassable) { return; }

    // Move to the new position.
    return this.position.copy(newPosition);
  }
}
