import { WebGLRenderer } from 'three';

class WebGLRendererComponent {
  constructor() {
    let elements = document.querySelectorAll('[renderer-webgl]');

    elements.forEach((elm) => {
      const renderer = new WebGLRenderer();

      renderer.setSize( window.innerWidth, window.innerHeight );

      elm.renderer = renderer;
      elm.appendChild(renderer.domElement);
    });
  }
}

export default WebGLRendererComponent;
