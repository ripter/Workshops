/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	window.TOUT = {
	  // Called when a slot has loaded on the page and waiting for our response.

	  loadSlot: function loadSlot(elm, intervalID) {
	    // Cancel the call home.
	    clearInterval(intervalID);

	    // Do whatever we want here.
	    console.log('loaded slot', elm);
	  },


	  // This will create a slot with id
	  createSlot: function createSlot(id) {
	    var slotCode = '!function(a){var b=setInterval(function(){window.TOUT&&TOUT.loadSlot(a,b)},100)}("' + id + '");';
	    var div = document.createElement('div');
	    var script = document.createElement('script');

	    div.id = id;
	    script.innerHTML = slotCode;
	    div.appendChild(script);
	    return div;
	  }
	};

/***/ }
/******/ ]);