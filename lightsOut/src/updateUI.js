import bind from './bind.js';

/**
 * Updates the UI by finding dom elements in the lens
 * Then settings the elements properties based on state.
 */
export default function updateUI(state, lens) {
  console.log('updateUI', state, lens);
  // the lens key is a CSS selector
  Object.keys(lens).forEach((cssSelector) => {
    const elements = document.querySelectorAll(cssSelector);
    const properties = lens[cssSelector];
    // skip selectors that do not match
    //TODO: Remove any events that used to exist on these elements
    if (elements.length === 0) { return; }

    // for each element matched by the css selector
    // update it using the properties object
    elements.forEach(updateElement.bind(state, properties));
  });
}

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

    console.log('propertyName', propertyName, index)
    // if value is a function,
    if (typeof value === 'function') {
      if (eventMatch) {
        let unbind = properties[`_${eventMatch[0]}_${index}_of_${elements.length}`];
        //TODO: don't add if it already exists on the element.

        console.log('bind event', eventMatch[0], unbind);
        //WISH:
        // const unbind = bind(element, eventName, callback);
        //ISSUE: Need a place to store unbind.
        //     : It can not be element because we need to call it when we don't have element.
        // Unbind the old method and add a new one.
        if (typeof unbind === 'function') { unbind(); }
        properties[`_${eventMatch[0]}`] = bind(element, eventMatch[1], (evt) => {
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
