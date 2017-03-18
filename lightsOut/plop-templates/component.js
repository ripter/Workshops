/**
 * <{{kebabCase tagName}} >
 */
export class {{camelCase tagName}} extends HTMLElement {
  /**
   * When one of these attributes changes value, it triggers attributeChangedCallback
   * @return {Array} attribute names.
   */
  static get observedAttributes() {return ['id'];}
  constructor() {
    super();
  }

  /**
   * Triggered when the component is mounted on a DOM.
   * This is a good place to 'render' the component
   */
  connectedCallback() {
    this.innerHTML = '<h1>Plop Component</h1>';
  }

  /**
   * Triggered when an an observedAttribute has changed.
   * @param {String} attrName - the attribute name.
   * @param {Object} oldValue - the old value.
   * @param {Object} newValue - the new value.
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    console.log('{{camelCase tagName}}', attrName, oldValue, newValue);
  }
}
export default {{camelCase tagName}};
