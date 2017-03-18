import bind from './bind.js';

export class LensDOM {
  constructor(rules) {
    this.rules = rules;
    this.events = [];
  }

  /**
   * Updates the DOM
   * @param {Object} state - object is bound to `this` when rule functions are called.
   */
  render(state) {
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

  updateElement(state, properties, element, index, elements) {
    // for each of the properties we want to change
    Object.keys(properties).forEach((propertyName) => {
      const eventMatch = propertyName.match(/on(\w+)/);
      let value = properties[propertyName];

      // if value is a function,
      if (typeof value === 'function') {
        if (eventMatch) {
          // Bind the event
          const unbind = bind(element, eventMatch[1], (evt) => {
            value.call(state, evt, element, index, elements)
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
export default LensDOM;

/**
 * Updates element with properties
 * `updateElement.call(state, properties, index, elements)`
 * @this - functions will have their this set to our this.
 * @param {Object} properties - {propertyName: value|function,}
 * @param {Element} element - DOM/Object with properties, addEventListener
 * @param {Number} index - element's index in elements
 * @param {Array} elements - array that contains element.
 */
function updateElement(properties, element, index, elements) {
  // this === state
  // for each of the properties we want to change
  Object.keys(properties).forEach((propertyName) => {
    const eventMatch = propertyName.match(/on(\w+)/);
    let value = properties[propertyName];

    // console.log('propertyName', propertyName, index)
    // if value is a function,
    if (typeof value === 'function') {
      if (eventMatch) {
        console.log('bind event', eventMatch[0]);
        let unbind = bind(element, eventMatch[1], (evt) => {
          value.call(this, evt, element, index, elements)
        });

        //BUG: duplicates the events on every callback.
        // element.addEventListener(eventMatch[1], (evt) => {
        //   value.call(this, evt, element, index, elements)
        // });
      }
      else {
        // call it with a forEach signature
        // set this to the state object
        value = value.call(this, element, index, elements);
        element[propertyName] = value;
      }
    }
    // Not a function, just set the value
    else {
      element[propertyName] = value;
    }
  });
}
