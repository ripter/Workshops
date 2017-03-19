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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(5)(content, {});
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
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bind_js__ = __webpack_require__(6);


class LensDOM {
  constructor(rules) {
    this.rules = rules;
    this.events = [];
  }

  /**
   * Updates the DOM
   * @param {Object} state - object is bound to `this` when rule functions are called.
   */
  update(state) {
    const { rules } = this;

    // unbind the old events
    // This prevents duplicate events and events on detached elements.
    this.events.forEach((unbind) => {
      unbind();
    });

    // rule key is a css selector
    // loop over all the rules
    Object.keys(rules).forEach((cssSelector) => {
      const elements = document.querySelectorAll(cssSelector);
      const properties = rules[cssSelector];
      // skip selectors that do not match
      if (elements.length === 0) { return; }

      // for each element matched by the css selector
      // update it using the properties object
      // elements.forEach(updateElement.bind(state, properties));
      elements.forEach(this.updateElement.bind(this, state, properties));
    });
  }

  /**
   * Updates element with properties
   * `updateElement.call(state, properties, index, elements)`
   * @param {Object} state - state is set to `this` when calling function
   * @param {Object} properties - {propertyName: value|function,}
   * @param {Element} element - DOM/Object with properties, addEventListener
   * @param {Number} index - element's index in elements
   * @param {Array} elements - array that contains element.
   */
  updateElement(state, properties, element, index, elements) {
    // for each of the properties we want to change
    Object.keys(properties).forEach((propertyName) => {
      const eventMatch = propertyName.match(/on(\w+)/);
      let value = properties[propertyName];

      // if value is a function,
      if (typeof value === 'function') {
        if (eventMatch) {
          const eventName = eventMatch[1].toLocaleLowerCase();
          // Bind the event
          const unbind = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__bind_js__["a" /* default */])(element, eventName, (evt) => {
            value.call(state, evt, element, index, elements);
          });

          // save the unbind event.
          this.events.push(unbind);
        }
        else {
          // call it with a forEach signature
          // set this to the state object
          value = value.call(state, element, index, elements);
          // console.log('setting property value', propertyName, value, element);
          element[propertyName] = value;
        }
      }
      // Not a function, just set the value
      else {
        element[propertyName] = value;
      }
    });
  }
}
/* unused harmony export LensDOM */

/* harmony default export */ exports["a"] = LensDOM;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// Super Simple State/Store/Model for the application.
class State {
  constructor(initalState) {
    Object.assign(this, initalState);
    this._changeCallbacks = [];
    this.randomize();
  }

  // Register a callback on the change 'event'.
  onChange(callback) {
    this._changeCallbacks.push(callback);
  }

  // Trigger the change 'events', calling all the callbacks.
  triggerChange() {
    this._changeCallbacks.forEach((callback) => {
      callback(this);
    });
  }

  // Toggle a value on the board
  toggle(x, y) {
    const { board } = this;
    board[x][y] = board[x][y] === 0 ? 1 : 0;
  }

  // converts array index into a point {x,y}
  index2Point(index) {
    const { width } = this; // state === this
    const y = 0 | index / width;
    const x = index - (y * width);
    return {x, y};
  }

  // Toggle the grid lights starting at point
  // This toggles the lights in a cross pattern
  action(x, y) {
    const { width, height } = this;

    if (y-1 >= 0) {
      this.toggle(x, y-1);
    }
    if (x-1 >= 0) {
      this.toggle(x-1, y);
    }
    if (x >= 0) {
      this.toggle(x, y);
    }
    if (x+1 < width) {
      this.toggle(x+1, y);
    }
    if (y+1 < height) {
      this.toggle(x, y+1);
    }

    // Trigger the change 'event'
    this.triggerChange();
  }

  // Randomizes the pattern on the board.
  randomize() {
    const { width, height } = this;
    let randomCount = 0|Math.random() * 20;
    let x, y;

    while (randomCount--) {
      x = 0|Math.random() * width;
      y = 0|Math.random() * height;
      this.action(x, y);
    }
  }

}
/* unused harmony export State */

/* harmony default export */ exports["a"] = State;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "/* COMPONENT STYLES */\n.grid > .row {\n  display: flex;\n}\n.cell {\n  font-size: 12px;\n  width: 10em;\n  height: 10em;\n  background-color: #0074D9;\n}\n.active {\n  box-shadow: inset 0px 0px 10em 1em #7FDBFF;\n}\n", ""]);

// exports


/***/ },
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export bind */

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
/* harmony default export */ exports["a"] = bind;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__less_index_less__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__less_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__less_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lensDOM_js__ = __webpack_require__(1);





// Application State
const state = new __WEBPACK_IMPORTED_MODULE_1__state_js__["a" /* default */]({
  width: 5,
  height: 5,
  board: [
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
  ],
});

// UI Lens
// Use CSS Selectos to update Elements.
const lens = new __WEBPACK_IMPORTED_MODULE_2__lensDOM_js__["a" /* default */]({
  // Match each cell in the grid.
  '.grid .cell': {
    // sets elm.className
    className: function(elm, index) {
      const { board } = this;
      const { x, y } = this.index2Point(index);
      const val = board[x][y];
      let result = 'cell'; //keep the cell class so we will still match next update.

      // if the value in the array is 1
      // give it the class active
      if (val === 1) {
        result += ' active';
      }

      return result;
    },

    // onclick event (event names are always lower case)
    onClick(evt, elm, index) {
      const { x, y } = this.index2Point(index);
      this.action(x,y);
    },
  },
});

// On change, re-render
state.onChange(() => {
  lens.update(state);
});
// trigger inital render
state.triggerChange();

// debugging fun
window.state = state;
window.lens = lens;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map