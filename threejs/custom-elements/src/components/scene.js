import { Scene } from 'three';

class SceneComponent {
  constructor() {
    let elements = document.querySelectorAll('[scene]');
    console.log('scene component', elements);

    elements.forEach((element) => {
      element.scene = new Scene();
    });
  }
}

export default SceneComponent;
