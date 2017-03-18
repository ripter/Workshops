/**
 *    <game-grid width="5" height="5">
 *     <p>this can be any element. it will be cloned for each cell in the grid</p>
 *    </game-grid>
 */
export class gameGrid extends HTMLElement {
  /**
   * When one of these attributes changes value, it triggers attributeChangedCallback
   * @return {Array} attribute names.
   */
  static get observedAttributes() {return ['width', 'height'];}

  // turn our attributes into properties
  // convert the attribute strings into numbers
  get width() {
    const { width } = this.attributes;
    return parseInt(width.value || 0, 10);
  }
  set width(val) {
    const { width } = this.attributes;
    width.value = val;
  }

  get height() {
    const { height } = this.attributes;
    return parseInt(height.value || 0, 10);
  }
  set height(val) {
    const { height } = this.attributes;
    height.value = val;
  }

  constructor() {
    super();

    // turn the inital child into a template
    this.template = this.removeChild(this.children[0]);
  }

  /**
   * Triggered when the component is mounted on a DOM.
   * This is a good place to 'render' the component
   */
  connectedCallback() {
    const { template, width, height } = this;

    //
    // DOM API version
    for(let y=0; y < height; y++) {
      const elmRow = document.createElement('div');
      elmRow.classList.add('row');
      this.appendChild(elmRow);

      for(let x=0; x < width; x++) {
        // clone the template and add it as the next cell.
        const clone = template.cloneNode(true);
        elmRow.appendChild(clone);
      }
    }

    //
    // for loop version
    // let html = '';
    // // Create a grid of cloned templates
    // for(let y=0; y < height; y++) {
    //   html += '<div class="row">';
    //   for(let x=0; x < width; x++) {
    //     html += template.outerHTML;
    //   }
    //   html += '</div>';
    // }
    // this.innerHTML = html;
  }
}
export default gameGrid;
