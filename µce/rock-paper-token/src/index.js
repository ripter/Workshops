import { define } from 'uce/esm';
// import { define } from 'https://unpkg.com/uce?module';
console.log('define', define);

define('my-component', {
  // if specified, it's like the constructor
  // it's granted to be invoked *only once* on bootstrap
  // and *always* before connected/attributeChanged
  init() {
    // µhtml is provided automatically via this.html
    // it will populate the shadow root, even if closed
    // or simply the node, if no attachShadow is defined
    this.html`<h1>Hello 👋 µce</h1>`;
  },

  // if specified, observe the list of attributes
  observedAttributes: ['test'],

  // if specified, will be notified per each
  // observed attribute change
  attributeChanged(name, oldValue, newValue){},

  // if specified, will be invoked when the node
  // is either appended live, or removed
  connected() {},
  disconnected() {},

  // events are automatically attached, as long
  // as they start with the `on` prefix
  // the context is *always* the component,
  // you'll never need to bind a method here
  onClick(event) {
    console.log(this); // always the current Custom Element
  },

  // if specified with `on` prefix and `Options` suffix,
  // allows adding the listener with a proper third argument
  onClickOptions: {once: true}, // or true, or default false

  // any other method, property, or getter/setter will be
  // properly configured in the defined class prototype
  get test() { return Math.random(); },

  set test(value) { console.log(value); },

  sharedData: [1, 2, 3],

  method() {
    return this.test;
  }

});
