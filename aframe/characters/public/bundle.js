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

/***/ "./src/gltf-model-2.js":
/*!*****************************!*\
  !*** ./src/gltf-model-2.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Patched version of gltf-model\n */\nAFRAME.registerComponent('gltf-model-2', {\n  schema: { type: 'asset' },\n\n  /**\n   * Called once at the beginning of the component’s lifecycle.\n   */\n  init() {\n    const dracoLoader = this.el.sceneEl.systems['gltf-model'].getDRACOLoader();\n    this.loader = new THREE.GLTFLoader();\n    if (dracoLoader) {\n      this.loader.setDRACOLoader(dracoLoader);\n    }\n  },\n\n  /**\n   * Called whenever the component’s properties change, including at the beginning of the component’s lifecycle.\n   */\n  update(oldSrc) {\n    const src = this.data;\n\n    // remove the old version when the source changes.\n    if (src !== oldSrc) {\n      this.remove();\n    }\n\n    // abort if there is no model to load.\n    if (!src) { return; }\n\n    // Load the model.\n    this.loader.load(\n      src,\n      this.onLoad.bind(this),\n      this.onProgress.bind(this),\n      this.onError.bind(this),\n    );\n  },\n\n  /**\n   * Called whenever the component is detached from the entity.\n   */\n  remove() {\n    if (!this.model) { return; }\n    this.el.removeObject3D('mesh');\n    this.model = null;\n  },\n\n  /**\n   * Called when a model is loaded.\n   */\n  onLoad(model) {\n    const { el } = this;\n\n    this.model = model.scene || model.scenes[0];\n    this.model.animations = model.animations;\n\n    const mesh = this.getMesh(this.model);\n    el.setObject3D('mesh', mesh);\n    el.emit('model-loaded', { format: 'gltf', model: this.model });\n  },\n\n  /**\n   * Called when model fails to load.\n   */\n  onError(error) {\n    const { el, data: src } = this;\n    const message = (error && error.message) ? error.message : 'Failed to load glTF model';\n    el.emit('model-error', { format: 'gltf', src });\n    throw new Error(message);\n  },\n\n  /**\n   * Called while the model is loading.\n   */\n  onProgress() {\n    // do nothing\n  },\n\n  /**\n   * Find the Mesh in the model\n   */\n  getMesh(model) {\n    const mesh = model.getObjectByProperty('type', 'SkinnedMesh');\n    if (mesh) { return mesh; }\n    // default to the root\n    return model;\n  },\n});\n\n\n//# sourceURL=webpack:///./src/gltf-model-2.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gltf_model_2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gltf-model-2 */ \"./src/gltf-model-2.js\");\n/* harmony import */ var _gltf_model_2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_gltf_model_2__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconsole.log('Everything Loaded and Ready!');\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });