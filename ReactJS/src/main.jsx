/*global $ */
import React from 'react';

// React doesn't have the notion of controllers.
// We are using the term controller to mean a component that is tied to a store.
import Controller from './flux_with_class/controller.jsx';

// Webpack let's us include less like it was a JS library
import './less/main.less';

// Start React
// Provide a component to render. This could be any react component.
// Contain it to #content
// After rendering run postRender to handle 3rd party stuff (bootstrap)
React.render(<Controller />, $('#content')[0], postRender);

// init all the bootstrap stuff
function postRender() {
  // init tooltps
  $('[data-toggle="tooltip"]').tooltip();
}
