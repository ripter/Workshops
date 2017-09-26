import hyperHTML from 'hyperhtml';

/**
 * [description]
 */
class {{pascalCase tagName}} extends HTMLElement {
   /**
   * When one of these attributes changes value, it triggers attributeChangedCallback
   * @return {Array} attribute names.
   */
  static get observedAttributes() {return ['id'];}

  // https://github.com/WebReflection/document-register-element#v1-caveat
  constructor(self) {
    self = super(self);
    return self;
  }
 /**
   * Triggered when the component is mounted on a DOM.
   */
  connectedCallback() {
    const state = {};
    this.render(state);
  }

  /**
   * Triggered when an an observedAttribute has changed.
   * @param {String} attrName - the attribute name.
   * @param {Object} oldValue - the old value.
   * @param {Object} newValue - the new value.
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    console.log('attr changed', attrName, oldValue, newValue);
  }

  render(state) {
    this.classList = ['{{camelCase tagName}}'];
    hyperHTML.bind(this)`<h1>Component Loaded and Rendering</h1>`;
  }
}
export default {{pascalCase tagName}};
