import { BoxGeometry } from 'three';

class GeometryComponent {
  constructor() {
    let elements = document.querySelectorAll('[scene]');
    console.log('scene component', elements);

    elements.forEach((element) => {
      element.scene = new Scene();
    });
  }
}

export default GeometryComponent;
