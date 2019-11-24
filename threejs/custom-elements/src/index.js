import 'document-register-element';
import * as THREE from 'three';

// Register custom elements
import ENtity from './elements/e-ntity.js';
customElements.define('e-ntity', ENtity);

// Register components
import SceneComponent from './components/scene.js';
import PerspectiveCameraComponent from './components/PerspectiveCamera.js';
import WebGLRendererComponent from './components/webGLRenderer.js';

const scene = window.scene = new SceneComponent();
const camera = window.camera = new PerspectiveCameraComponent();
const renderer = window.render = new WebGLRendererComponent();

// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
//
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );

const elScene = document.querySelector('[scene]');
elScene.scene.add( cube );

const elCamera = document.querySelector('[camera-perspective]');
elCamera.camera.position.z = 5;
//
var animate = function () {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;

  elScene.renderer.render(elScene.scene, elCamera.camera);
};

animate();
