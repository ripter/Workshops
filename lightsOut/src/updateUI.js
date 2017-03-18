
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
    // const properties = Object.keys(lens[cssSelector]);
    // skip selectors that do not match
    if (elements.length === 0) { return; }

    // for each element matched by the css selector
    elements.forEach((element, index) => {
      // for each of the properties we want to change
      Object.keys(properties).forEach((propertyName) => {
        let value = properties[propertyName];

        // if value is a function,
        if (typeof value === 'function') {
          // call it with a forEach signature
          // set this to the state object
          value = value.call(state, element, index, elements);
        }

        // Update the Element
        element[propertyName] = value;
      });
    });

    console.log('elements', elements);
  });
}
