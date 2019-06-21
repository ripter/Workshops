const _loadAt = (new Date()).toISOString();
import './axis-controls.js';
import './clickable.js';
import './material-cube.js';
import './block-cursor.js';

// import { MaterialCube } from './elements/material-cube.js';
// window.customElements.define('material-cube', MaterialCube);
import './elements/material-cube.js';

// import './shader-phong.js';
// eslint-disable-next-line no-console
console.log('bundle.js loaded at', _loadAt);
