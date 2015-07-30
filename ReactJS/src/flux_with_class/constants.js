/*global module*/
'use strict';

// convention:
// NOUN.ACTION

const ACTIONS = {
  MESSAGE: {
    CHANGE: 'MESSAGE_CHANGE'
  }
  , THEME: {
    CHANGE: 'THEME_CHANGE'
  }
};
export default ACTIONS;

window.ACTIONS = ACTIONS;
