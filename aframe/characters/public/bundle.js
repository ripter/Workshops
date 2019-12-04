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

/***/ "./src/animation-control.js":
/*!**********************************!*\
  !*** ./src/animation-control.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nAFRAME.registerComponent('animation-control', {\n  schema: {\n    actionName: { default: 'Idle' },\n  },\n\n  /**\n   * Init handler. Similar to attachedCallback.\n   * Called during component initialization and is only run once.\n   * Components can use this to set initial state.\n   */\n  init() {\n    this.mixer = null; // https://threejs.org/docs/index.html#api/en/animation/AnimationMixer\n    this.action = null; // https://threejs.org/docs/index.html#api/en/animation/AnimationAction\n\n    // listen to changes on the refrence objects like 'mesh'\n    this.el.addEventListener('object3dset', this);\n  },\n\n  /**\n   * Update handler. Similar to attributeChangedCallback.\n   * Called whenever component's data changes.\n   * Also called on component initialization when the component receives initial data.\n   *\n   * @param {object} prevData - Previous attributes of the component.\n   */\n  update() {\n    // console.log('animation-control.update', this.data, oldData);\n  },\n\n  /**\n   * Tick handler.\n   * Called on each tick of the scene render loop.\n   * Affected by play and pause.\n   *\n   * @param {number} time - Scene tick time.\n   * @param {number} timeDelta - Difference in current render time and previous render time.\n   */\n  tick(time, timeDelta) {\n    const deltaInSeconds = timeDelta / 1000;\n\n    if (this.mixer) {\n      this.mixer.update(deltaInSeconds);\n    }\n  },\n\n  /**\n   * Remove handler. Similar to detachedCallback.\n   * Called whenever component is removed from the entity (i.e., removeAttribute).\n   * Components can use this to reset behavior on the entity.\n   */\n  remove() {\n    delete this.mixer;\n    delete this.action;\n  },\n\n\n  /**\n   * Called when a listening event is observed.\n   * @param  {Event} event the event that has been fired and needs to be processed.\n   * @return {undefined}\n   */\n  handleEvent(event) {\n    switch (event.type) {\n      case 'object3dset':\n        // // only respond to 'mesh' changes\n        // if (event.detail.type !== 'mesh') { return; }\n        // update mixer with the new mesh\n        // this.updateMixer(event.detail.object);\n        this.updateMixer();\n        break;\n      default:\n        console.warn(`Unhandled event type: ${event.type}`, event); // eslint-disable-line\n    }\n  },\n\n\n  // Update the Mixer with a new Root Object\n  updateMixer() {\n    const { actionName } = this.data;\n    const animRoot = this.el.getObject3D('animRoot');\n    // Bail if we are missing anything.\n    if (!animRoot || !actionName || actionName === '') { return; }\n    const { animations } = animRoot;\n\n    // Update the mixer to use the new root object.\n    this.mixer = new THREE.AnimationMixer(animRoot);\n\n    // get and play the named action\n    const clip = THREE.AnimationClip.findByName(animations, actionName);\n    this.action = this.mixer.clipAction(clip);\n    this.action.play();\n  },\n});\n\n\n//# sourceURL=webpack:///./src/animation-control.js?");

/***/ }),

/***/ "./src/gltf-animations.js":
/*!********************************!*\
  !*** ./src/gltf-animations.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// gltf-animations\n\nAFRAME.registerComponent('gltf-animations', {\n  schema: { type: 'asset' },\n\n  /**\n   * Init handler. Similar to attachedCallback.\n   * Called during component initialization and is only run once.\n   * Components can use this to set initial state.\n   */\n  init() {\n    const dracoLoader = this.el.sceneEl.systems['gltf-model'].getDRACOLoader();\n    this.loader = new THREE.GLTFLoader();\n    if (dracoLoader) {\n      this.loader.setDRACOLoader(dracoLoader);\n    }\n  },\n\n  /**\n   * Update handler. Similar to attributeChangedCallback.\n   * Called whenever component's data changes.\n   * Also called on component initialization when the component receives initial data.\n   *\n   * @param {object} prevData - Previous attributes of the component.\n   */\n  update(oldSrc) {\n    const src = this.data;\n\n    // remove the old version when the source changes.\n    if (src !== oldSrc) {\n      this.remove();\n    }\n\n    // abort if there is no model to load.\n    if (!src) { return; }\n\n    // Load the model.\n    this.loader.load(\n      src,\n      this.onLoad.bind(this),\n      this.onProgress.bind(this),\n      this.onError.bind(this),\n    );\n  },\n\n\n  /**\n   * Called on each tick or frame of the scene’s render loop.\n   * @param  {[type]} time      [description]\n   * @param  {[type]} timeDelta [description]\n   * @return {[type]}           [description]\n   */\n  tick(time, timeDelta) {\n    if (this.mixer) {\n      const deltaInSeconds = timeDelta / 1000;\n      this.mixer.update(deltaInSeconds);\n    }\n  },\n\n  /**\n  * Called whenever the component is detached from the entity.\n  */\n  remove() {\n    // if (!this.model) { return; }\n    // this.el.removeObject3D('mesh');\n    // this.model = null;\n\n    delete this.animations;\n    delete this.mixer;\n  },\n\n  /**\n   * Called when a model is loaded.\n   */\n  onLoad(model) {\n    const { el } = this;\n    const animations = this.animations = model.animations;\n    const mesh = el.getObject3D('mesh');\n    const mixer = this.mixer = new THREE.AnimationMixer(mesh);\n\n    // Play a specific animation\n    const clip = THREE.AnimationClip.findByName(animations, 'Idle');\n    const action = mixer.clipAction(clip);\n    action.play();\n  },\n\n  /**\n   * Called when model fails to load.\n   */\n  onError(error) {\n    const { el, data: src } = this;\n    const message = (error && error.message) ? error.message : 'Failed to load glTF model';\n    el.emit('model-error', { format: 'gltf', src });\n    throw new Error(message);\n  },\n\n  /**\n   * Called while the model is loading.\n   */\n  onProgress() {\n    // do nothing\n  },\n});\n\n\n//# sourceURL=webpack:///./src/gltf-animations.js?");

/***/ }),

/***/ "./src/gltf-model-2.js":
/*!*****************************!*\
  !*** ./src/gltf-model-2.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Patched version of gltf-model that sets 'mesh' to the SkinnedMesh or root object.\n */\nAFRAME.registerComponent('gltf-model-2', {\n  schema: { type: 'asset' },\n\n  /**\n   * Init handler. Similar to attachedCallback.\n   * Called during component initialization and is only run once.\n   * Components can use this to set initial state.\n   */\n  init() {\n    const dracoLoader = this.el.sceneEl.systems['gltf-model'].getDRACOLoader();\n    this.loader = new THREE.GLTFLoader();\n    if (dracoLoader) {\n      this.loader.setDRACOLoader(dracoLoader);\n    }\n  },\n\n  /**\n   * Update handler. Similar to attributeChangedCallback.\n   * Called whenever component's data changes.\n   * Also called on component initialization when the component receives initial data.\n   *\n   * @param {object} prevData - Previous attributes of the component.\n   */\n  update(oldSrc) {\n    const src = this.data;\n\n    // remove the old version when the source changes.\n    if (src !== oldSrc) {\n      this.remove();\n    }\n\n    // abort if there is no model to load.\n    if (!src) { return; }\n\n    // Load the model.\n    this.loader.load(\n      src,\n      this.onLoad.bind(this),\n      this.onProgress.bind(this),\n      this.onError.bind(this),\n    );\n  },\n\n  /**\n   * Remove handler. Similar to detachedCallback.\n   * Called whenever component is removed from the entity (i.e., removeAttribute).\n   * Components can use this to reset behavior on the entity.\n   */\n  remove() {\n    if (!this.model) { return; }\n    this.el.removeObject3D('mesh');\n    this.model = null;\n  },\n\n  /**\n   * Called when a model is loaded.\n   */\n  onLoad(modelFile) {\n    const { el } = this;\n    const animations = modelFile.animations;\n\n    // Get the root model aka scene from the file\n    // Save it with the animations array.\n    this.model = modelFile.scene || modelFile.scenes[0];\n    this.model.animations = animations;\n\n    // Find the mesh object\n    const mesh = this.getMesh(this.model);\n\n    // Set the object refrences\n    el.setObject3D('mesh', mesh);\n    el.setObject3D('animRoot', this.model);\n    // Emit load finished\n    el.emit('model-loaded', { format: 'gltf', model: this.model });\n  },\n\n  /**\n   * Called when model fails to load.\n   */\n  onError(error) {\n    const { el, data: src } = this;\n    const message = (error && error.message) ? error.message : 'Failed to load glTF model';\n    el.emit('model-error', { format: 'gltf', src });\n    throw new Error(message);\n  },\n\n  /**\n   * Called while the model is loading.\n   */\n  onProgress() {\n    // do nothing\n  },\n\n  /**\n   * Find the Mesh in the model\n   */\n  getMesh(model) {\n    let mesh;\n    // Look for a Skinned Mesh\n    mesh = model.getObjectByProperty('type', 'SkinnedMesh');\n    if (mesh) {\n      return mesh;\n    }\n\n    // Look for a base Mesh\n    mesh = model.getObjectByProperty('type', 'Mesh');\n    if (mesh) {\n      return mesh;\n    }\n\n    // default to the root\n    return model;\n  },\n});\n\n\n//# sourceURL=webpack:///./src/gltf-model-2.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gltf_model_2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gltf-model-2 */ \"./src/gltf-model-2.js\");\n/* harmony import */ var _gltf_model_2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_gltf_model_2__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./material-2 */ \"./src/material-2.js\");\n/* harmony import */ var _gltf_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gltf-animations */ \"./src/gltf-animations.js\");\n/* harmony import */ var _gltf_animations__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gltf_animations__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _animation_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animation-control */ \"./src/animation-control.js\");\n/* harmony import */ var _animation_control__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_animation_control__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconsole.log('Everything Loaded and Ready!'); // eslint-disable-line\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/material-2.js":
/*!***************************!*\
  !*** ./src/material-2.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_getMesh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getMesh */ \"./src/utils/getMesh.js\");\n\n\nconst { shaders } = AFRAME;\nconst shaderNames = Object.keys(AFRAME.shaders);\n\n\n/**\n * Return a three.js constant determining which material face sides to render\n * based on the side parameter (passed as a component property).\n *\n * @param {string} [side=front] - `front`, `back`, or `double`.\n * @returns {number} THREE.FrontSide, THREE.BackSide, or THREE.DoubleSide.\n */\nfunction parseSide(side) {\n  switch (side) {\n    case 'back': {\n      return THREE.BackSide;\n    }\n    case 'double': {\n      return THREE.DoubleSide;\n    }\n    default: {\n      // Including case `front`.\n      return THREE.FrontSide;\n    }\n  }\n}\n\n/**\n * Return a three.js constant determining vertex coloring.\n */\nfunction parseVertexColors(coloring) {\n  switch (coloring) {\n    case 'face': {\n      return THREE.FaceColors;\n    }\n    case 'vertex': {\n      return THREE.VertexColors;\n    }\n    default: {\n      return THREE.NoColors;\n    }\n  }\n}\n\n/**\n * Return a three.js constant determining blending\n *\n * @param {string} [blending=normal]\n * - `none`, additive`, `subtractive`,`multiply` or `normal`.\n * @returns {number}\n */\nfunction parseBlending(blending) {\n  switch (blending) {\n    case 'none': {\n      return THREE.NoBlending;\n    }\n    case 'additive': {\n      return THREE.AdditiveBlending;\n    }\n    case 'subtractive': {\n      return THREE.SubtractiveBlending;\n    }\n    case 'multiply': {\n      return THREE.MultiplyBlending;\n    }\n    default: {\n      return THREE.NormalBlending;\n    }\n  }\n}\n\n/**\n * Dispose of material from memory and unsubscribe material from scene updates like fog.\n */\nfunction disposeMaterial(material, system) {\n  material.dispose();\n  system.unregisterMaterial(material);\n}\n\n\n/**\n* Patched version of material\n*/\nAFRAME.registerComponent('material-2', {\n  schema: {\n    alphaTest: { default: 0.0, min: 0.0, max: 1.0 },\n    depthTest: { default: true },\n    depthWrite: { default: true },\n    flatShading: { default: false },\n    npot: { default: false },\n    offset: { type: 'vec2', default: { x: 0, y: 0 } },\n    opacity: { default: 1.0, min: 0.0, max: 1.0 },\n    repeat: { type: 'vec2', default: { x: 1, y: 1 } },\n    shader: { default: 'standard', oneOf: shaderNames, schemaChange: true },\n    side: { default: 'front', oneOf: ['front', 'back', 'double'] },\n    transparent: { default: false },\n    vertexColors: { type: 'string', default: 'none', oneOf: ['face', 'vertex'] },\n    visible: { default: true },\n    blending: { default: 'normal', oneOf: ['none', 'normal', 'additive', 'subtractive', 'multiply'] },\n  },\n\n  init() {\n    this.material = null;\n    this.system = this.el.sceneEl.systems.material;\n  },\n\n  /**\n  * Update or create material.\n  *\n  * @param {object|null} oldData\n  */\n  update(oldData) {\n    const { data } = this;\n    if (!this.shader || data.shader !== oldData.shader) {\n      this.updateShader(data.shader);\n    }\n    this.shader.update(this.data);\n    this.updateMaterial(oldData);\n  },\n\n  updateSchema(data) {\n    const newShader = data && data.shader;\n    const currentShader = this.oldData && this.oldData.shader;\n    const shader = newShader || currentShader;\n    const schema = shaders[shader] && shaders[shader].schema;\n\n    if (!schema) { throw new Error(`Unknown shader schema ${shader}`); }\n    if (currentShader && newShader === currentShader) { return; }\n    this.extendSchema(schema);\n    this.updateBehavior();\n  },\n\n  updateBehavior() {\n    const { sceneEl } = this.el;\n    const { schema } = this;\n    const self = this;\n    let tickProperties;\n\n    function tickTime(time) {\n      /* eslint-disable no-restricted-syntax, guard-for-in */\n      for (const key in tickProperties) {\n        tickProperties[key] = time;\n      }\n      /* eslint-enable no-restricted-syntax, guard-for-in */\n      self.shader.update(tickProperties);\n    }\n\n    this.tick = undefined;\n\n    tickProperties = {};\n    /* eslint-disable no-restricted-syntax, guard-for-in */\n    for (const key in schema) {\n      if (schema[key].type === 'time') {\n        this.tick = tickTime;\n        tickProperties[key] = true;\n      }\n    }\n    /* eslint-enable no-restricted-syntax, guard-for-in */\n\n    if (!sceneEl) { return; }\n    if (this.tick) {\n      sceneEl.addBehavior(this);\n    } else {\n      sceneEl.removeBehavior(this);\n    }\n  },\n\n  updateShader(shaderName) {\n    const { data } = this;\n    const Shader = shaders[shaderName] && shaders[shaderName].Shader;\n    if (!Shader) { throw new Error(`Unknown shader ${shaderName}`); }\n\n    // Get material from A-Frame shader.\n    const shaderInstance = this.shader = new Shader();\n    shaderInstance.el = this.el;\n    shaderInstance.init(data);\n    this.setMaterial(shaderInstance.material);\n    this.updateSchema(data);\n  },\n\n  /**\n  * Set and update base material properties.\n  * Set `needsUpdate` when needed.\n  */\n  updateMaterial(oldData) {\n    const { data } = this;\n    const { material } = this;\n    let oldDataHasKeys;\n\n    // Base material properties.\n    material.alphaTest = data.alphaTest;\n    material.depthTest = data.depthTest !== false;\n    material.depthWrite = data.depthWrite !== false;\n    material.opacity = data.opacity;\n    material.flatShading = data.flatShading;\n    material.side = parseSide(data.side);\n    material.transparent = data.transparent !== false || data.opacity < 1.0;\n    material.vertexColors = parseVertexColors(data.vertexColors);\n    material.visible = data.visible;\n    material.blending = parseBlending(data.blending);\n\n    // Check if material needs update.\n\n    /* eslint-disable no-restricted-syntax, guard-for-in */\n    for (oldDataHasKeys in oldData) { break; }\n    /* eslint-enable no-restricted-syntax, guard-for-in */\n    if (oldDataHasKeys\n      && (oldData.alphaTest !== data.alphaTest\n        || oldData.side !== data.side\n        || oldData.vertexColors !== data.vertexColors)) {\n      material.needsUpdate = true;\n    }\n  },\n\n  /**\n  * Remove material on remove (callback).\n  * Dispose of it from memory and unsubscribe from scene updates.\n  */\n  remove() {\n    const defaultMaterial = new THREE.MeshBasicMaterial();\n    const { material } = this;\n    const object3D = this.el.getObject3D('mesh');\n    if (object3D) { object3D.material = defaultMaterial; }\n    disposeMaterial(material, this.system);\n  },\n\n  /**\n  * (Re)create new material. Has side-effects of setting `this.material` and updating\n  * material registration in scene.\n  *\n  * @param {object} data - Material component data.\n  * @param {object} type - Material type to create.\n  * @returns {object} Material.\n  */\n  setMaterial(material) {\n    const { el } = this;\n    const { system } = this;\n\n    if (this.material) { disposeMaterial(this.material, system); }\n\n    this.material = material;\n    system.registerMaterial(material);\n\n    // Get the mesh and set/replace the existing material\n    Object(_utils_getMesh__WEBPACK_IMPORTED_MODULE_0__[\"getMesh\"])(el).then((mesh) => {\n      // SkinnedMesh needs skinning turned on for animations to work.\n      if (mesh.type === 'SkinnedMesh') {\n        this.material.skinning = true;\n      }\n      // Update the mesh with the new material.\n      mesh.material = this.material;\n    });\n  },\n});\n\n\n//# sourceURL=webpack:///./src/material-2.js?");

/***/ }),

/***/ "./src/utils/getMesh.js":
/*!******************************!*\
  !*** ./src/utils/getMesh.js ***!
  \******************************/
/*! exports provided: KEY_MESH, getMesh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"KEY_MESH\", function() { return KEY_MESH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMesh\", function() { return getMesh; });\nconst KEY_MESH = 'mesh';\n\n// returns a promise that resovles with the 'mesh' object.\n/**\n * [getMesh description]\n * @param  {HTMLElement} el root entity when looking for the mesh.\n * @return {Promise} resolves with mesh object.\n */\nfunction getMesh(el) {\n  // BUG: cached is the orignial mesh object, while non-cached finds the type Mesh object.\n  let mesh = el.getObject3D(KEY_MESH);\n  // return the cached mesh if we have it.\n  if (mesh) { return Promise.resolve(mesh); }\n\n  // Wait for the mesh to load\n  return new Promise((resolve) => {\n    el.addEventListener('object3dset', function waitForMesh(evt) {\n      const rootObj = evt.detail.object;\n      // bail the object is not the mesh on our element.\n      if (evt.detail.type !== KEY_MESH || evt.target !== el) { return void 0; }\n      // now that we have the mesh, remove the listener.\n      el.removeEventListener('object3dset', waitForMesh);\n\n      // Look for a Skinned Mesh\n      mesh = rootObj.getObjectByProperty('type', 'SkinnedMesh');\n      if (mesh) {\n        return resolve(mesh);\n      }\n\n      // Look for a base Mesh\n      mesh = rootObj.getObjectByProperty('type', 'Mesh');\n      if (mesh) {\n        return resolve(mesh);\n      }\n\n      // default to the root object.\n      return resolve(rootObj);\n    });\n  });\n}\n\n\n//# sourceURL=webpack:///./src/utils/getMesh.js?");

/***/ })

/******/ });