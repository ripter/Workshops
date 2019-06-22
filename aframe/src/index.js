const _loadAt = (new Date()).toISOString();

import './systems/movement.js';

import './components/desktop-movement.js';
import './components/axis-movement.js';
import './components/clickable.js';
import './components/material-cube.js';
import './components/block-cursor.js';

import './elements/c-cube.js';

// import './shader-phong.js';
// eslint-disable-next-line no-console
console.log('bundle.js loaded at', _loadAt);
