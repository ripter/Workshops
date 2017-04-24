/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

const domLens = __webpack_require__(4);
const updateAttributes = __webpack_require__(5);

// Default to the updateAttributes rules
module.exports = domLens.bind(null, updateAttributes);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// Super Simple State/Store/Model for the application.
class State {
  constructor(initalState) {
    Object.assign(this, {
      width: 1,
      height: 1,
      board: [[0]],
      isGameOver: false
    }, initalState);
    this._changeCallbacks = [];
    this.randomize();
  }

  // Register a callback on the change 'event'.
  // @public
  onChange(callback) {
    this._changeCallbacks.push(callback);
  }

  // converts array index into a point {x,y}
  // @public
  index2Point(index) {
    const { width } = this; // state === this
    const y = 0 | index / width;
    const x = index - y * width;
    return { x, y };
  }

  // Toggles a cross of lights.
  // Checks for win
  // @public
  actionClick(x, y) {
    this.toggleCross(x, y);
    this.updateGameOver();

    // Trigger the change 'event'
    // so the UI can update
    this.triggerChange();
  }

  // Reset the game state
  // @public
  reset() {
    this.randomize();
    this.isGameOver = false;
    this.triggerChange();
  }

  // Trigger the change 'events', calling all the callbacks.
  triggerChange() {
    this._changeCallbacks.forEach(callback => {
      callback(this);
    });
  }

  // Toggle a value on the board
  toggle(x, y) {
    const { board } = this;
    board[x][y] = board[x][y] === 0 ? 1 : 0;
  }

  // Toggle the grid lights starting at point
  // This toggles the lights in a cross pattern
  toggleCross(x, y) {
    const { width, height } = this;

    if (y - 1 >= 0) {
      this.toggle(x, y - 1);
    }
    if (x - 1 >= 0) {
      this.toggle(x - 1, y);
    }
    if (x >= 0) {
      this.toggle(x, y);
    }
    if (x + 1 < width) {
      this.toggle(x + 1, y);
    }
    if (y + 1 < height) {
      this.toggle(x, y + 1);
    }
  }

  // Randomizes the pattern on the board.
  randomize() {
    const { width, height } = this;
    let randomCount = 0 | Math.random() * 20;
    let x, y;

    while (randomCount--) {
      x = 0 | Math.random() * width;
      y = 0 | Math.random() * height;
      this.actionClick(x, y);
    }
  }

  // update the isGameOver state
  updateGameOver() {
    const { board } = this;
    // if every cell is off
    this.isGameOver = board.every(row => {
      return row.every(cel => {
        return cel === 0;
      });
    });
  }

}
/* unused harmony export State */

/* harmony default export */ exports["a"] = State;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(8)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 3 */
/***/ function(module, exports) {

/**
 * bind - listens to event on element, returning a function to stop listening to the event.
 * Inspired by Atom's Disposable
 * @param {EventTarget} element - https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 * @param {String} eventName - Name of the event. Like 'click', or 'did-custom-event'
 * @param {Function} callback -
 * @return unbind - function that unbinds the callback from the event on element.
 */
function bind(element, eventName, callback) {
  element.addEventListener(eventName, callback);

  return function unbind() {
    element.removeEventListener(eventName, callback);
  };
}

// Exports
module.exports = bind;


/***/ },
/* 4 */
/***/ function(module, exports) {


/**
 * Acts as a lens that matches a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) with a context.
 * Loops over rules document.querySelectorAll the key.
 * @param {Function} forEach - A forEach callback function. It will be invoked for every Node matched in every rule.
 * @param {Object} rules - Key is CSS Selector, Value is passed into the forEach with context.
 * @param {Object} context - set as the `this` context in the forEach callback.
 * @module domLens
 */
function domLens(forEach, rules, context) {
  // rule key is a css selector
  // loop over all the rules
  Object.keys(rules).forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    const rule = rules[selector];

    // skip selectors that do not match
    if (elements.length === 0) { return; }
    // call the forEach function bound to context and rule value.
    elements.forEach(forEach.bind(context, rule));
  });
}

module.exports = domLens;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

// use [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
const bindEvent = __webpack_require__(3);
const UNBIND = Symbol('unbind');

/**
 * Updates node's attributes with the values from attribtues.
 * @example:
 domLens({
   '.cell': {
     // keys are Node attributes (including events), values are anything (including functions).
     className: () => '.cell .is-updated',
   }, updateAttributes, state);
 });
 * @param {Object} attributes - and object of attributes and values to set on the node.
 * @param {Node} node - the node matched by the rule.
 * @param {Number} index - the node's index in the nodeList.
 * @param {NodeList} nodeList - the nodeList returned from the rule.
 * @name updateAttributes
 */
function updateAttributes(attributes, node, index, nodeList) {
  // unbind any existing event listeners before we bind the new ones.
  if (typeof node[UNBIND] === 'function') {
    node[UNBIND]();
  }

  Object.keys(attributes).forEach((attrName) => {
    const attrValue = attributes[attrName];
    const isCallback = typeof attrValue === 'function';
    const isEvent = attrName.match(/on(\w+)/);
    let callback;

    // If the value is not a function, just set it and move on.
    if (!isCallback) {
      node[attrName] = attrValue;
      return;
    }

    // bind the function context.
    // eslint-disable-next-line no-invalid-this
    callback = attrValue.bind(this);

    // if it is an event with callback
    if (isEvent && isCallback) {
      // bind the event handler. save the unbind method on the node.
      node[UNBIND] = bindEvent(node, isEvent[1].toLocaleLowerCase(), (evt) => {
        callback(evt, node, index, nodeList);
      });
      return;
    }
    // Not an event
    // set the value to the result of the attribute function
    node[attrName] = callback(node, index, nodeList);
  });
}

module.exports = updateAttributes;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, "/* COMPONENT STYLES */\n.grid > .row {\n  display: flex;\n}\n.grid > .row > * {\n  font-size: 12px;\n  width: 10em;\n  height: 10em;\n}\n.cell {\n  background-color: #0074D9;\n}\n.active {\n  box-shadow: inset 0px 0px 10em 1em #7FDBFF;\n}\n.win {\n  background-color: #2ECC40;\n  animation: spin 3s linear infinite;\n}\n@keyframes spin {\n  from {\n    transform: rotate3d(0, 0, 0, 0deg);\n  }\n  to {\n    transform: rotate3d(-1, -1, 1, 360deg);\n  }\n}\n", ""]);

// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 8 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__less_index_less__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__less_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__less_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_domLens__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_domLens___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_domLens__);


// import NodeLens from './nodeLens.js';


// Initial Application State
const state = new __WEBPACK_IMPORTED_MODULE_1__state_js__["a" /* default */]({
  width: 5,
  height: 5,
  board: [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 1, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]]
});

// Create rules that map our state to the UI.
const rules = {
  '.grid .cell': {
    /**
     * Sets the cell's className based on `state.board[x][y]`
     */
    className: function (elm, index) {
      const { board, isGameOver } = state;
      const { x, y } = state.index2Point(index);
      const cell = board[x][y];
      const value = 'cell ';

      if (isGameOver) {
        return value + 'win';
      }

      if (cell === 1) {
        return value + 'active';
      }
      return value;
    },

    /**
     * User plays by clicking one of the grid cells.
     * This triggers a game action.
     */
    onClick: function (evt, elm, index) {
      const { x, y } = state.index2Point(index);

      state.actionClick(x, y);
      evt.stopPropagation();
    }
  },

  // match the entire grid so the user can
  // click anywhere to reset the game.
  '.grid': {
    onClick(evt) {
      const { isGameOver } = state;

      if (isGameOver) {
        state.reset();
        evt.stopPropagation();
      }
    }
  }
};

// re-render whenever the state changes
state.onChange(() => {
  __WEBPACK_IMPORTED_MODULE_2_domLens___default()(rules, state);
});
// trigger inital render
state.triggerChange();

// debugging fun
window.state = state;
window.rules = rules;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map