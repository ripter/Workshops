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

eval("/**\n * Plays animations on the model.\n * Refrences 'mesh' and 'animRoot' objects.\n */\nAFRAME.registerComponent('anim-mixer', {\n  schema: {\n    clipName: { default: 'Idle' },\n  },\n\n  /**\n   * Init handler. Similar to attachedCallback.\n   * Called during component initialization and is only run once.\n   * Components can use this to set initial state.\n   */\n  init() {\n    this.mixer = null; // https://threejs.org/docs/index.html#api/en/animation/AnimationMixer\n    this.action = null; // https://threejs.org/docs/index.html#api/en/animation/AnimationAction\n\n    // listen to changes on the refrence objects like 'mesh'\n    this.el.addEventListener('object3dset', this);\n  },\n\n  /**\n   * Update handler. Similar to attributeChangedCallback.\n   * Called whenever component's data changes.\n   * Also called on component initialization when the component receives initial data.\n   *\n   * @param {object} prevData - Previous attributes of the component.\n   */\n  update(prevData) {\n    const { clipName } = this.data;\n\n    if (clipName && clipName !== '' && clipName !== prevData.clipName) {\n      this.playClip();\n    }\n  },\n\n  /**\n   * Tick handler.\n   * Called on each tick of the scene render loop.\n   * Affected by play and pause.\n   *\n   * @param {number} time - Scene tick time.\n   * @param {number} timeDelta - Difference in current render time and previous render time.\n   */\n  tick(time, timeDelta) {\n    const deltaInSeconds = timeDelta / 1000;\n\n    if (this.mixer) {\n      this.mixer.update(deltaInSeconds);\n    }\n  },\n\n  /**\n   * Remove handler. Similar to detachedCallback.\n   * Called whenever component is removed from the entity (i.e., removeAttribute).\n   * Components can use this to reset behavior on the entity.\n   */\n  remove() {\n    delete this.mixer;\n    delete this.action;\n  },\n\n\n  /**\n   * Called when a listening event is observed.\n   * @param  {Event} event the event that has been fired and needs to be processed.\n   * @return {undefined}\n   */\n  handleEvent(event) {\n    switch (event.type) {\n      case 'object3dset':\n        this.updateMixer();\n        break;\n      default:\n        console.warn(`Unhandled event type: ${event.type}`, event); // eslint-disable-line\n    }\n  },\n\n\n  // Update the Mixer with a new Root Object\n  updateMixer() {\n    const { clipName } = this.data;\n    const armature = this.el.getObject3D('armature');\n    const mesh = this.el.getObject3D('mesh');\n    // Bail if we are missing anything.\n    if (!armature || !clipName || clipName === '') { return; }\n\n    // Create the mixer to use the new armature.\n    this.mixer = new THREE.AnimationMixer(armature);\n\n    // Tell the mesh to allow animations.\n    mesh.material.skinning = true;\n    mesh.material.needsUpdate = true;\n\n    // get and play the named action\n    this.playClip();\n  },\n\n  playClip() {\n    const { clipName } = this.data;\n    const armature = this.el.getObject3D('armature');\n    // Bail if we are missing anything.\n    if (!armature || !clipName || clipName === '') { return; }\n    const clip = THREE.AnimationClip.findByName(armature.animations, clipName);\n    const prevAction = this.action;\n\n    if (!clip) { throw new Error(`Clip \"${clipName}\" was not found in the animations array.\\nCheck for misspellings in the clipName, or missing animations in the model file.`); }\n\n    // Set the new action\n    this.action = this.mixer.clipAction(clip);\n\n    if (prevAction) {\n      prevAction.stop();\n    }\n    this.action.play();\n  },\n});\n\n\n//# sourceURL=webpack:///./src/components/anim-mixer.js?");

/***/ }),

/***/ "./src/components/click-to-select.js":
/*!*******************************************!*\
  !*** ./src/components/click-to-select.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Clicking on the entity will move the named component to this one.\n */\nAFRAME.registerComponent('click-to-select', {\n  /**\n   * Called to start any dynamic behavior (e.g., animation, AI, events, physics).\n   */\n  play() {\n    this.el.addEventListener('click', this);\n  },\n\n  /**\n   * Called to stop any dynamic behavior (e.g., animation, AI, events, physics).\n   */\n  pause() {\n    this.el.removeEventListener('click', this);\n  },\n\n  /**\n   * DOM Event handler.\n   * Called when a listening event is observed.\n   * @param  {Event} event the event that has been fired and needs to be processed.\n   * @return {undefined}\n   */\n  handleEvent(event) {\n    switch (event.type) {\n      case 'click':\n        this.system.select(this.el);\n        break;\n      default:\n        console.warn(`Unhandled event type: ${event.type}`, event, this); // eslint-disable-line\n    }\n  },\n});\n\n\n//# sourceURL=webpack:///./src/components/click-to-select.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _consts_key_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consts/key_map */ \"./src/consts/key_map.js\");\n\n\n/**\n * User Controls for the demo\n */\nAFRAME.registerComponent('user-controls', {\n  schema: {\n    speed: { default: 0.05 },\n  },\n\n  /**\n   * Init handler. Similar to attachedCallback.\n   * Called during component initialization and is only run once.\n   * Components can use this to set initial state.\n   */\n  init() {\n    this.rotation = new THREE.Euler();\n    this.velocity = new THREE.Vector3();\n    this.rotate = { y: 0 };\n  },\n\n  /**\n   * Tick handler.\n   * Called on each tick of the scene render loop.\n   * Affected by play and pause.\n   *\n   * @param {number} time - Scene tick time.\n   * @param {number} timeDelta - Difference in current render time and previous render time.\n   */\n  tick() {\n    const { el } = this;\n    const { velocity, rotation } = this.updateVelocityAndRotation();\n\n    // Match rotation\n    el.object3D.rotateY(rotation.y);\n    // use translate to move the object along it's local axis\n    el.object3D.translateX(velocity.x);\n    el.object3D.translateZ(velocity.z);\n\n    // if we have velocity, play the walking animation, else use the Idle\n    if (velocity.x === 0 && velocity.z === 0) {\n      el.setAttribute('anim-mixer', 'clipName: Idle;');\n    } else {\n      el.setAttribute('anim-mixer', 'clipName: Walk;');\n    }\n  },\n\n  /**\n   * Updates this.velocity and this.rotation based on user input.\n   * returns { velocity, rotation } for convenience\n  */\n  updateVelocityAndRotation() {\n    const { rotation, velocity } = this;\n    const { speed } = this.data;\n    const { input } = this.el.sceneEl.systems;\n    const isKeyDown = input.isKeyDown.bind(input);\n\n    // Forward, Backward is like a rocker switch or a one axis joystick.\n    if (isKeyDown(_consts_key_map__WEBPACK_IMPORTED_MODULE_0__[\"Key\"].Forward)) { velocity.z = speed; }\n    else if (isKeyDown(_consts_key_map__WEBPACK_IMPORTED_MODULE_0__[\"Key\"].Backward)) { velocity.z = -speed; }\n    else { velocity.z = 0; }\n\n    // Rocker switch style input\n    if (isKeyDown(_consts_key_map__WEBPACK_IMPORTED_MODULE_0__[\"Key\"].TurnLeft)) { rotation.y = speed; }\n    else if (isKeyDown(_consts_key_map__WEBPACK_IMPORTED_MODULE_0__[\"Key\"].TurnRight)) { rotation.y = -speed; }\n    else { rotation.y = 0; }\n\n    return {\n      velocity,\n      rotation,\n    };\n  },\n});\n\n\n//# sourceURL=webpack:///./src/components/user-controls.js?");

/***/ }),

/***/ "./src/consts/key_map.js":
/*!*******************************!*\
  !*** ./src/consts/key_map.js ***!
  \*******************************/
/*! exports provided: Key, KEY_MAP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Key\", function() { return Key; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"KEY_MAP\", function() { return KEY_MAP; });\n\nconst Key = {\n  Forward: 'key_forward',\n  Backward: 'key_backward',\n  TurnLeft: 'key_turn_left',\n  TurnRight: 'key_turn_right',\n}\n\n/**\n * Map key codes to our custom keys\n */\nconst KEY_MAP = {\n  ArrowUp: Key.Forward,\n  KeyW: Key.Forward,\n  ArrowDown: Key.Backward,\n  KeyS: Key.Backward,\n  ArrowLeft: Key.TurnLeft,\n  KeyA: Key.TurnLeft,\n  ArrowRight: Key.TurnRight,\n  KeyD: Key.TurnRight,\n}\n\n\n//# sourceURL=webpack:///./src/consts/key_map.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_gltf_model_2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/gltf-model-2 */ \"./src/components/gltf-model-2.js\");\n/* harmony import */ var _components_gltf_model_2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_gltf_model_2__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_anim_mixer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/anim-mixer */ \"./src/components/anim-mixer.js\");\n/* harmony import */ var _components_anim_mixer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_anim_mixer__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_user_controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/user-controls */ \"./src/components/user-controls.js\");\n/* harmony import */ var _systems_click_to_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./systems/click-to-select */ \"./src/systems/click-to-select.js\");\n/* harmony import */ var _systems_click_to_select__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_systems_click_to_select__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_click_to_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/click-to-select */ \"./src/components/click-to-select.js\");\n/* harmony import */ var _components_click_to_select__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_components_click_to_select__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _systems_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./systems/input */ \"./src/systems/input.js\");\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/systems/click-to-select.js":
/*!****************************************!*\
  !*** ./src/systems/click-to-select.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Click-to-Select allows toggling of the 'selected' entity.\n */\nAFRAME.registerSystem('click-to-select', {\n  schema: {\n    elmIndicator: { type: 'selector' },\n  },\n  /**\n   * Init handler. Called during scene initialization and is only run once.\n   * Systems can use this to set initial state.\n   */\n  init() {\n    this.selected = null;\n    console.log('click-to-select', this.data);\n  },\n\n  /**\n   * Sets user-controls on the entity and removes it from the previous entity.\n   */\n  select(entity) {\n    const { selected } = this;\n    const { elmIndicator } = this.data;\n\n    if (selected) {\n      selected.removeAttribute('user-controls');\n    }\n\n    entity.setAttribute('user-controls', '');\n    entity.appendChild(elmIndicator);\n    this.selected = entity;\n  },\n});\n\n\n//# sourceURL=webpack:///./src/systems/click-to-select.js?");

/***/ }),

/***/ "./src/systems/input.js":
/*!******************************!*\
  !*** ./src/systems/input.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _consts_key_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consts/key_map */ \"./src/consts/key_map.js\");\n\n\n/**\n * Maps key presses to InputAction, allowsing components to repond to user input.\n*/\nAFRAME.registerSystem('input', {\n  /**\n   * Init handler. Called during scene initialization and is only run once.\n   * Systems can use this to set initial state.\n   */\n  init() {\n    this.keysDown = {}; // holds\n    this.bindEvents();\n  },\n\n  /**\n   * Returns true if the Key is currenly pressed.\n  */\n\n  isKeyDown(key) {\n    return this.keysDown[key] || false;\n  },\n\n  // isKeyUp(key) {\n  //   return this.keysDown[key] === true || false;\n  // },\n\n  /**\n   * Called to start any dynamic behavior (e.g., animation, AI, events, physics).\n   */\n  bindEvents() {\n    window.addEventListener('keydown', this);\n    window.addEventListener('keyup', this);\n  },\n\n  /**\n   * Called to stop any dynamic behavior (e.g., animation, AI, events, physics).\n   */\n  unBindEvents() {\n    window.removeEventListener('keydown', this);\n    window.removeEventListener('keyup', this);\n  },\n\n  /**\n   * DOM Event handler.\n   * Called when a listening event is observed.\n   * @param  {Event} event the event that has been fired and needs to be processed.\n   * @return {undefined}\n   */\n  handleEvent(event) {\n    const keyCode = event.code;\n    const mappedKey = _consts_key_map__WEBPACK_IMPORTED_MODULE_0__[\"KEY_MAP\"][keyCode];\n\n    // Ignore keys not in the mapping.\n    if (!mappedKey) { return; }\n\n    // Change the state of the mapped key based on the event type.\n    switch (event.type) {\n      case 'keydown':\n        this.keysDown[mappedKey] = true;\n        break;\n      case 'keyup':\n        this.keysDown[mappedKey] = false;\n        break;\n      default:\n        console.warn(`Unhandled event type: ${event.type}`, event, this); // eslint-disable-line\n    }\n  },\n});\n\n\n//# sourceURL=webpack:///./src/systems/input.js?");

/***/ })

/******/ });