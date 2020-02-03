/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/anim-mixer.js":
/*!**************************************!*\
  !*** ./src/components/anim-mixer.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Plays animations on the model.\n * Refrences 'mesh' and 'animRoot' objects.\n * [Three.js AnimationMixer](https://threejs.org/docs/index.html#api/en/animation/AnimationMixer)\n */\nAFRAME.registerComponent('anim-mixer', {\n  /**\n   * Init handler. Similar to attachedCallback.\n   * Called during component initialization and is only run once.\n   * Components can use this to set initial state.\n   */\n  init() {\n    this.mixer = null; // https://threejs.org/docs/index.html#api/en/animation/AnimationMixer\n    this.action = null; // https://threejs.org/docs/index.html#api/en/animation/AnimationAction\n\n    // Listen for add/remove of key objects mesh and armature\n    this.el.addEventListener('object3dset', this);\n  },\n\n  /**\n   * Tick handler.\n   * Called on each tick of the scene render loop.\n   * Affected by play and pause.\n   *\n   * @param {number} time - Scene tick time.\n   * @param {number} timeDelta - Difference in current render time and previous render time.\n   */\n  tick(time, timeDelta) {\n    const deltaInSeconds = timeDelta / 1000;\n\n    if (this.mixer) {\n      this.mixer.update(deltaInSeconds);\n    }\n  },\n\n  /**\n   * Remove handler. Similar to detachedCallback.\n   * Called whenever component is removed from the entity (i.e., removeAttribute).\n   * Components can use this to reset behavior on the entity.\n   */\n  remove() {\n    this.el.removeEventListener('object3dset', this);\n  },\n\n\n  /**\n   * Called when a listening event is observed.\n   * @param  {Event} event the event that has been fired and needs to be processed.\n   * @return {undefined}\n   */\n  handleEvent(event) {\n    switch (event.type) {\n      case 'object3dset':\n        this.setupMixer();\n        break;\n      default:\n        console.warn(`Unhandled event type: ${event.type}`, event); // eslint-disable-line\n    }\n  },\n\n\n  /**\n   * Attempts to setup the AnimationMixer.\n   * Bails if Mesh or Armature are missing.\n   * See more: https://threejs.org/docs/index.html#api/en/animation/AnimationMixer\n  */\n  setupMixer() {\n    const armature = this.el.getObject3D('armature');\n    const mesh = this.el.getObject3D('mesh');\n    // Bail if we are missing anything.\n    if (!armature || !mesh) { return; }\n\n    // Create the mixer to use the new armature.\n    this.mixer = new THREE.AnimationMixer(armature);\n    // Listen to events.\n    // this.mixer.addEventListener('loop', this.handleEvent);\n    // this.mixer.addEventListener('finished', this.handleEvent);\n    // Tell the mesh to allow animations.\n    mesh.material.skinning = true;\n    mesh.material.needsUpdate = true;\n  },\n\n\n  playAction(clipName) {\n    // bail if we are already playing this clip\n    if (this.currentClipName === clipName) { return; }\n    this.currentClipName = clipName;\n\n    const prevAction = this.action;\n    const armature = this.el.getObject3D('armature');\n    if (!armature) { return; }\n    const clip = THREE.AnimationClip.findByName(armature.animations, clipName);\n    if (!clip) { throw new Error(`Clip \"${clipName}\" was not found in the animations array.\\nCheck for misspellings in the clipName, or missing animations in the model file.`); }\n\n    // Get the action for the clip. Actions are cached, so we also need to reset.\n    this.action = this.mixer.clipAction(clip).reset();\n\n    // Fade out the old action into the new one.\n    if (prevAction) {\n      this.action.crossFadeFrom(prevAction, 0.05);\n    }\n    // Start playing the new action.\n    this.action.play();\n  },\n});\n\n\n//# sourceURL=webpack:///./src/components/anim-mixer.js?");

/***/ }),

/***/ "./src/components/click-to-select.js":
/*!*******************************************!*\
  !*** ./src/components/click-to-select.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Clicking on the entity will move the named component to this one.\n */\nAFRAME.registerComponent('click-to-select', {\n  /**\n   * Called to start any dynamic behavior (e.g., animation, AI, events, physics).\n   */\n  play() {\n    this.el.addEventListener('click', this);\n  },\n\n  /**\n   * Called to stop any dynamic behavior (e.g., animation, AI, events, physics).\n   */\n  pause() {\n    this.el.removeEventListener('click', this);\n  },\n\n  /**\n   * DOM Event handler.\n   * Called when a listening event is observed.\n   * @param  {Event} event the event that has been fired and needs to be processed.\n   * @return {undefined}\n   */\n  handleEvent(event) {\n    switch (event.type) {\n      case 'click':\n        this.system.select(this.el);\n        break;\n      default:\n        console.warn(`Unhandled event type: ${event.type}`, event, this); // eslint-disable-line\n    }\n  },\n});\n\n\n//# sourceURL=webpack:///./src/components/click-to-select.js?");

/***/ }),

/***/ "./src/components/dynamic-collider.js":
/*!********************************************!*\
  !*** ./src/components/dynamic-collider.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\nAFRAME.registerComponent('dynamic-collider', {\n  // schema: {\n  //   clipName: { default: 'Idle' },\n  // },\n\n  /**\n   * Init handler. Similar to attachedCallback.\n   * Called during component initialization and is only run once.\n   * Components can use this to set initial state.\n   */\n  init() {\n    const { collision } = this.el.sceneEl.systems;\n    this.systemCollision = collision;\n\n    // Listen for add/remove of key objects mesh\n    this.el.addEventListener('object3dset', this);\n  },\n\n  /**\n   * Update handler. Similar to attributeChangedCallback.\n   * Called whenever component's data changes.\n   * Also called on component initialization when the component receives initial data.\n   *\n   * @param {object} prevData - Previous attributes of the component.\n   */\n  update(prevData) {\n  },\n\n  /**\n   * Tick handler.\n   * Called on each tick of the scene render loop.\n   * Affected by play and pause.\n   *\n   * @param {number} time - Scene tick time.\n   * @param {number} timeDelta - Difference in current render time and previous render time.\n   */\n  tick(time, timeDelta) {\n  },\n\n  /**\n   * Called to start any dynamic behavior (e.g., animation, AI, events, physics).\n   */\n  play() {\n  },\n\n  /**\n   * Called to stop any dynamic behavior (e.g., animation, AI, events, physics).\n   */\n  pause() {\n  },\n\n\n  /**\n   * Remove handler. Similar to detachedCallback.\n   * Called whenever component is removed from the entity (i.e., removeAttribute).\n   * Components can use this to reset behavior on the entity.\n   */\n  remove() {\n    const { el, systemCollision } = this;\n    // remove from collisions\n    systemCollision.removeEntity(el);\n  },\n\n  /**\n   * DOM Event handler.\n   * Called when a listening event is observed.\n   * @param  {Event} event the event that has been fired and needs to be processed.\n   * @return {undefined}\n   */\n  handleEvent(event) {\n    const { el, systemCollision } = this;\n\n    switch (event.type) {\n      case 'object3dset':\n        if (event.detail.type === 'mesh') {\n          // Add ourself to collision detection.\n          systemCollision.add(el);\n          // const box = event.detail.object.geometry.boundingBox;\n          // const helper = new THREE.Box3Helper( box /*event.detail.object*/, 0xffff00 );\n          // console.log('helper', helper);\n          // this.el.object3D.add(helper);\n        }\n        break;\n      default:\n        console.warn(`Unhandled event type: ${event.type}`, event); // eslint-disable-line\n    }\n  },\n});\n\n\n//# sourceURL=webpack:///./src/components/dynamic-collider.js?");

/***/ }),

/***/ "./src/components/gltf-model-2.js":
/*!****************************************!*\
  !*** ./src/components/gltf-model-2.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Patched version of gltf-model that sets 'mesh' to the SkinnedMesh or root object.\n * sets `mesh` and `armature` references\n * `setObject3D('mesh', SkinnedMesh || Mesh)`\n * `setObject3D('armature', {Object3D animations=[]})`\n */\nAFRAME.registerComponent('gltf-model-2', {\n  schema: { type: 'asset' },\n\n  /**\n   * Init handler. Similar to attachedCallback.\n   * Called during component initialization and is only run once.\n   * Components can use this to set initial state.\n   */\n  init() {\n    // QUESTION: Should the loader be on the system, and shared with the components?\n    const dracoLoader = this.el.sceneEl.systems['gltf-model'].getDRACOLoader();\n    this.loader = new THREE.GLTFLoader();\n    if (dracoLoader) {\n      this.loader.setDRACOLoader(dracoLoader);\n    }\n  },\n\n  /**\n   * Update handler. Similar to attributeChangedCallback.\n   * Called whenever component's data changes.\n   * Also called on component initialization when the component receives initial data.\n   *\n   * @param {object} prevData - Previous attributes of the component.\n   */\n  update(oldSrc) {\n    const src = this.data;\n\n    // remove the old version when the source changes.\n    if (src !== oldSrc) {\n      this.remove();\n    }\n\n    // abort if there is no model to load.\n    if (!src) { return; }\n\n    // Load the model.\n    this.loader.load(\n      src,\n      this.onLoad.bind(this),\n      this.onProgress.bind(this),\n      this.onError.bind(this),\n    );\n  },\n\n  /**\n   * Remove handler. Similar to detachedCallback.\n   * Called whenever component is removed from the entity (i.e., removeAttribute).\n   * Components can use this to reset behavior on the entity.\n   */\n  remove() {\n    if (!this.model) { return; }\n    this.el.removeObject3D('mesh');\n    this.el.removeObject3D('armature');\n    this.model.dispose();\n    this.model = null;\n    this.loader = null;\n  },\n\n  /**\n   * Called when a model is loaded.\n   */\n  onLoad(gltfData) {\n    const { el } = this;\n    const { animations } = gltfData;\n\n    // Get the root model aka scene from the file\n    // Save it with the animations array.\n    this.model = gltfData.scene || gltfData.scenes[0];\n    this.model.animations = animations;\n\n    // Find the mesh object\n    const mesh = this.getMesh(this.model);\n\n    // Set the object references\n    el.setObject3D('mesh', mesh);\n    el.setObject3D('armature', this.model);\n    // Emit load finished\n    el.emit('model-loaded', { format: 'gltf', model: this.model });\n  },\n\n  /**\n   * Called when model fails to load.\n   */\n  onError(error) {\n    const { el, data: src } = this;\n    const message = (error && error.message) ? error.message : 'Failed to load glTF model';\n    el.emit('model-error', { format: 'gltf', src });\n    throw new Error(message);\n  },\n\n  /**\n   * Called while the model is loading.\n   */\n  onProgress() {\n    // do nothing\n  },\n\n  /**\n   * Returns the first SkinnedMesh or Mesh found.\n   */\n  getMesh(model) {\n    let mesh;\n    // Look for a Skinned Mesh\n    mesh = model.getObjectByProperty('type', 'SkinnedMesh');\n    if (mesh) {\n      return mesh;\n    }\n\n    // Look for a base Mesh\n    mesh = model.getObjectByProperty('type', 'Mesh');\n    if (mesh) {\n      return mesh;\n    }\n\n    // default to the root\n    return model;\n  },\n});\n\n\n//# sourceURL=webpack:///./src/components/gltf-model-2.js?");

/***/ }),

/***/ "./src/components/user-controls.js":
/*!*****************************************!*\
  !*** ./src/components/user-controls.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _consts_key_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consts/key_map */ \"./src/consts/key_map.js\");\n/* harmony import */ var _utils_readKeysAsRocker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/readKeysAsRocker */ \"./src/utils/readKeysAsRocker.js\");\n\n\n\n/**\n * User Controls for the demo\n */\nAFRAME.registerComponent('user-controls', {\n  schema: {\n    enabled: { default: true },\n    speed: { default: 0.05 },\n    clipWalk: { default: 'Walk' },\n    clipIdle: { default: 'Idle' },\n  },\n\n  /**\n   * Init handler. Similar to attachedCallback.\n   * Called during component initialization and is only run once.\n   * Components can use this to set initial state.\n   */\n  init() {\n    const { collision, input } = this.el.sceneEl.systems;\n    const animMixer = this.el.components['anim-mixer'];\n\n    // Get isKeyDown from the input system. This reads player input\n    this.isKeyDown = input.isKeyDown.bind(input);\n    // Get PlayAnimation from the anim-mixer component.\n    this.playAnimation = animMixer.playAction.bind(animMixer);\n    this.doesCollide = collision.doesCollide.bind(collision);\n    this.updateCollision = collision.update.bind(collision)\n  },\n\n  /**\n   * Tick handler.\n   * Called on each tick of the scene render loop.\n   * Affected by play and pause.\n   *\n   * @param {number} time - Scene tick time.\n   * @param {number} timeDelta - Difference in current render time and previous render time.\n   */\n  tick() {\n    if (!this.data.enabled) { return; } // bail if not enabled\n    const { el, updateCollision } = this;\n    let { velocity, rotation } = this.readUserInput();\n\n    //Check collisins with other moving mobs\n    velocity = this.updateFromCollisions(velocity);\n\n    // use velocity to pick the animation.\n    this.updateAnimation(velocity);\n\n    // Match rotation\n    el.object3D.rotateY(rotation.y);\n    // use translate to move the object along it's local axis\n    el.object3D.translateX(velocity.x);\n    el.object3D.translateZ(velocity.z);\n    // Update collision to match the new position.\n    updateCollision(el);\n  },\n\n\n  /**\n   * Reads isKeyDown to create velocity and rotation values.\n  */\n  readUserInput: (() => {\n    const rotation = new THREE.Euler();\n    const velocity = new THREE.Vector3();\n\n    return function readUserInput() {\n      const { isKeyDown } = this;\n      const { speed } = this.data;\n\n      // Create a rocker style switch with two Keys.\n      velocity.z = Object(_utils_readKeysAsRocker__WEBPACK_IMPORTED_MODULE_1__[\"readKeysAsRocker\"])(isKeyDown, _consts_key_map__WEBPACK_IMPORTED_MODULE_0__[\"Key\"].Forward, _consts_key_map__WEBPACK_IMPORTED_MODULE_0__[\"Key\"].Backward) * speed;\n      rotation.y = Object(_utils_readKeysAsRocker__WEBPACK_IMPORTED_MODULE_1__[\"readKeysAsRocker\"])(isKeyDown, _consts_key_map__WEBPACK_IMPORTED_MODULE_0__[\"Key\"].TurnLeft, _consts_key_map__WEBPACK_IMPORTED_MODULE_0__[\"Key\"].TurnRight) * speed;\n\n      return {\n        velocity,\n        rotation,\n      };\n    };\n  })(),\n\n  /**\n   * Update the animation based on velocity.\n  */\n  updateAnimation(velocity) {\n    const { playAnimation } = this;\n    const { clipWalk, clipIdle } = this.data;\n\n    if (velocity.x === 0 && velocity.z === 0) {\n      playAnimation(clipIdle);\n    } else {\n      playAnimation(clipWalk);\n    }\n  },\n\n  updateFromCollisions(velocity) {\n    const {el, doesCollide } = this;\n\n    if (doesCollide(el)) {\n      console.log('Collided!');\n    }\n    else {\n      console.log('Did not collide');\n    }\n\n    return velocity;\n  }\n});\n\n\n//# sourceURL=webpack:///./src/components/user-controls.js?");

/***/ }),

/***/ "./src/consts/error.js":
/*!*****************************!*\
  !*** ./src/consts/error.js ***!
  \*****************************/
/*! exports provided: ERROR_NO_MESH */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ERROR_NO_MESH\", function() { return ERROR_NO_MESH; });\n\nconst ERROR_NO_MESH = (entity) => new Error(`No Mesh found on entity.\\n\\t${entity}`);\n\n\n//# sourceURL=webpack:///./src/consts/error.js?");

/***/ }),

/***/ "./src/consts/key_map.js":
/*!*******************************!*\
  !*** ./src/consts/key_map.js ***!
  \*******************************/
/*! exports provided: Key, KEY_MAP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Key\", function() { return Key; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"KEY_MAP\", function() { return KEY_MAP; });\n\nconst Key = {\n  Forward: 'key_forward',\n  Backward: 'key_backward',\n  TurnLeft: 'key_turn_left',\n  TurnRight: 'key_turn_right',\n};\n\n/**\n * Map key codes to our custom keys\n */\nconst KEY_MAP = {\n  ArrowUp: Key.Forward,\n  KeyW: Key.Forward,\n  ArrowDown: Key.Backward,\n  KeyS: Key.Backward,\n  ArrowLeft: Key.TurnLeft,\n  KeyA: Key.TurnLeft,\n  ArrowRight: Key.TurnRight,\n  KeyD: Key.TurnRight,\n};\n\n\n//# sourceURL=webpack:///./src/consts/key_map.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_gltf_model_2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/gltf-model-2 */ \"./src/components/gltf-model-2.js\");\n/* harmony import */ var _components_gltf_model_2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_gltf_model_2__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_anim_mixer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/anim-mixer */ \"./src/components/anim-mixer.js\");\n/* harmony import */ var _components_anim_mixer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_anim_mixer__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_user_controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/user-controls */ \"./src/components/user-controls.js\");\n/* harmony import */ var _systems_collision__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./systems/collision */ \"./src/systems/collision.js\");\n/* harmony import */ var _components_dynamic_collider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/dynamic-collider */ \"./src/components/dynamic-collider.js\");\n/* harmony import */ var _components_dynamic_collider__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_components_dynamic_collider__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _systems_click_to_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./systems/click-to-select */ \"./src/systems/click-to-select.js\");\n/* harmony import */ var _components_click_to_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/click-to-select */ \"./src/components/click-to-select.js\");\n/* harmony import */ var _components_click_to_select__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_components_click_to_select__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _systems_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./systems/input */ \"./src/systems/input.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/systems/click-to-select.js":
/*!****************************************!*\
  !*** ./src/systems/click-to-select.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_getBoundingBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBoundingBox */ \"./src/utils/getBoundingBox.js\");\n\n/**\n * Click-to-Select allows toggling of the 'selected' entity.\n */\nAFRAME.registerSystem('click-to-select', {\n  schema: {\n    elmIndicator: { type: 'selector' },\n    offsetY: { default: 0.5 },\n    componentName: { type: 'string' },\n    propertyName: { default: 'enabled' },\n  },\n  /**\n   * Init handler. Called during scene initialization and is only run once.\n   * Systems can use this to set initial state.\n   */\n  init() {\n    this.selected = null;\n  },\n\n  /**\n   * Sets user-controls on the entity and removes it from the previous entity.\n   */\n  select(entity) {\n    const { selected } = this;\n    const {\n      elmIndicator, offsetY, componentName, propertyName,\n    } = this.data;\n\n    // Toggle the user-controls on only the selected entity\n    if (selected) {\n      selected.setAttribute(componentName, propertyName, false);\n    }\n    entity.setAttribute(componentName, propertyName, true);\n\n\n    // Move the indicator as a child of entity.\n    entity.object3D.add(elmIndicator.object3D);\n    // Position it above the new entity\n    const box = Object(_utils_getBoundingBox__WEBPACK_IMPORTED_MODULE_0__[\"getBoundingBox\"])(entity);\n    elmIndicator.object3D.position.y = box.y + offsetY;\n\n    // Set the entity as the new selected and return it\n    this.selected = entity;\n    return entity;\n  },\n});\n\n\n//# sourceURL=webpack:///./src/systems/click-to-select.js?");

/***/ }),

/***/ "./src/systems/collision.js":
/*!**********************************!*\
  !*** ./src/systems/collision.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_getBoundingBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBoundingBox */ \"./src/utils/getBoundingBox.js\");\n/* harmony import */ var _consts_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../consts/error */ \"./src/consts/error.js\");\n\n\n\n/*\n * Basic AABB collision detection.\n*/\nAFRAME.registerSystem('collision', {\n  /**\n   * Init handler. Called during scene initialization and is only run once.\n   * Systems can use this to set initial state.\n   */\n  init() {\n    this.entityBoxes = new Map();\n  },\n\n  /**\n   * Adds the entity's mesh to the collision system.\n  */\n  add(entity) {\n    const box = Object(_utils_getBoundingBox__WEBPACK_IMPORTED_MODULE_0__[\"getBoundingBox\"])(entity);\n    this.entityBoxes.set(entity, box);\n\n    const helper = new THREE.Box3Helper( box, 0xffff00 );\n    entity.sceneEl.object3D.add(helper);\n  },\n\n  remove(entity) {\n    this.entityBoxes.delete(entity);\n  },\n\n\n  /**\n   * Updates the entities collision box\n  */\n  update(entity) {\n    const box = this.entityBoxes.get(entity);\n    const mesh = entity.getObject3D('mesh');\n    if (!mesh) { throw Object(_consts_error__WEBPACK_IMPORTED_MODULE_1__[\"ERROR_NO_MESH\"])(mesh); }\n    // Update the box to match the Mesh's world position\n    box.copy( mesh.geometry.boundingBox ).applyMatrix4( mesh.matrixWorld );\n  },\n\n  /**\n   * Return the colliding entity if there is a collision.\n   * else returns null if there is no collision.\n  */\n  doesCollide: (() => {\n    const testBox = new THREE.Box3();\n\n    return function doesCollide(entity) {\n      const box = this.getBox(entity);\n      // testBox.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);\n\n      for (let [el, elBox] of this.entityBoxes) {\n        if (el === entity) { continue; }\n        if (testBox.intersectsBox(elBox)) {\n          return el;\n        }\n      }\n      // No Collisions found.\n      return null;\n    };\n  })(),\n});\n\n\n//# sourceURL=webpack:///./src/systems/collision.js?");

/***/ }),

/***/ "./src/systems/input.js":
/*!******************************!*\
  !*** ./src/systems/input.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _consts_key_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consts/key_map */ \"./src/consts/key_map.js\");\n\n\n/**\n * Maps key presses to InputAction, allowsing components to repond to user input.\n*/\nAFRAME.registerSystem('input', {\n  /**\n   * Init handler. Called during scene initialization and is only run once.\n   * Systems can use this to set initial state.\n   */\n  init() {\n    this.keysDown = {}; // holds\n    this.bindEvents();\n  },\n\n  /**\n   * Returns true if the Key is currenly pressed.\n  */\n  isKeyDown(key) {\n    return this.keysDown[key] || false;\n  },\n\n  /**\n   * Called to start any dynamic behavior (e.g., animation, AI, events, physics).\n   */\n  bindEvents() {\n    window.addEventListener('keydown', this);\n    window.addEventListener('keyup', this);\n  },\n\n  /**\n   * Called to stop any dynamic behavior (e.g., animation, AI, events, physics).\n   */\n  unBindEvents() {\n    window.removeEventListener('keydown', this);\n    window.removeEventListener('keyup', this);\n  },\n\n  /**\n   * DOM Event handler.\n   * Called when a listening event is observed.\n   * @param  {Event} event the event that has been fired and needs to be processed.\n   * @return {undefined}\n   */\n  handleEvent(event) {\n    const keyCode = event.code;\n    const mappedKey = _consts_key_map__WEBPACK_IMPORTED_MODULE_0__[\"KEY_MAP\"][keyCode];\n\n    // Ignore keys not in the mapping.\n    if (!mappedKey) { return; }\n\n    // Change the state of the mapped key based on the event type.\n    switch (event.type) {\n      case 'keydown':\n        this.keysDown[mappedKey] = true;\n        break;\n      case 'keyup':\n        this.keysDown[mappedKey] = false;\n        break;\n      default:\n        console.warn(`Unhandled event type: ${event.type}`, event, this); // eslint-disable-line\n    }\n  },\n});\n\n\n//# sourceURL=webpack:///./src/systems/input.js?");

/***/ }),

/***/ "./src/utils/getBoundingBox.js":
/*!*************************************!*\
  !*** ./src/utils/getBoundingBox.js ***!
  \*************************************/
/*! exports provided: getBoundingBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBoundingBox\", function() { return getBoundingBox; });\n/* harmony import */ var _consts_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consts/error */ \"./src/consts/error.js\");\n\n\n/**\n * Returns the min, max Bounding Box of the Mesh geometry.\n * Returns a [Box3](https://threejs.org/docs/index.html#api/en/math/Box3)\n * @helper\n*/\nfunction getBoundingBox(entity) {\n  const mesh = entity.getObject3D('mesh');\n  if (!mesh) { throw Object(_consts_error__WEBPACK_IMPORTED_MODULE_0__[\"ERROR_NO_MESH\"])(mesh); }\n  const box = new THREE.Box3();\n  box.copy( mesh.geometry.boundingBox ).applyMatrix4( mesh.matrixWorld );\n  return box;\n}\n\n\n//# sourceURL=webpack:///./src/utils/getBoundingBox.js?");

/***/ }),

/***/ "./src/utils/readKeysAsRocker.js":
/*!***************************************!*\
  !*** ./src/utils/readKeysAsRocker.js ***!
  \***************************************/
/*! exports provided: readKeysAsRocker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"readKeysAsRocker\", function() { return readKeysAsRocker; });\n\n/**\n * Helper to read two keys as a rocker switch.\n * if keyA is down, return 1\n * if keyB is down, reutrn -1\n * else return 0\n*/\nfunction readKeysAsRocker(isKeyDown, keyA, keyB) {\n  if (isKeyDown(keyA)) {\n    return 1;\n  } if (isKeyDown(keyB)) {\n    return -1;\n  }\n  return 0;\n}\n\n\n//# sourceURL=webpack:///./src/utils/readKeysAsRocker.js?");

/***/ })

/******/ });