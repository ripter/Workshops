import bind from 'bind/src/bind.dom.js';

/**
 * Creates a lens on the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
 * using CSS Selectors to focus on a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
 * to set propteries on Nodes, HTMLElements, WebComponents, etc.
 */
export class NodeLens {
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

      // console.log('setting', elements, properties);
      // for each element matched by the css selector
      // update it using the properties object
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
          const unbind = bind(element, eventName, (evt) => {
            value.call(state, evt, element, index, elements);
          });

          // save the unbind event.
          this.events.push(unbind);
        }
        else {
          // call it with a forEach signature
          // set this to the state object
          value = value.call(state, element, index, elements);
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
export default NodeLens;
