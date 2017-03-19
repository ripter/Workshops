# Workshops


# LightsOut
Based on the [game](https://en.wikipedia.org/wiki/Lights_Out_(game)).

Uses a Lens that can update the DOM. Each version shows how a lens can remove the need to passing state/properties to ancestor components.

A lens allows you to project application state onto DOM elements via CSS Selector.
```
const lens = new Lens({
  // set the source to a random video
  '.cssSelector video': {
    // set the src property on the matched element.
    // `this === state` from `update(state)`
    src: () => { return this.get('videoSrc'); },
  }  
});

// update the DOM with state.
lens.update(state);
```


* [Web Component](https://github.com/ripter/Workshops/tree/custom_element/lightsOut) version. All native, one polyfill for `customElements`
  * Build: Make
  * Module: Webpack
  * Styles: Less
  * polyfill: [document-register-element]( https://github.com/WebReflection/document-register-element)

* [Raw HTML/JS](https://github.com/ripter/Workshops/tree/raw_html)
  * Build: Make
  * Module: Webpack
  * Styles: Less
