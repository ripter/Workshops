'use strict';

import {Dispatcher} from 'flux';
import EventEmitter from 'event-emitter';

import ACTIONS from './constants.js';

const CHANGE_EVENT = 'CHANGE_EVENT';
export const dispatcher = new Dispatcher();

/**
 * Example of a Store
 */
export function Store() {
  this.message = '';
  this.theme = 'default';
  this.eventEmitter = new EventEmitter({});
  this.dispatchToken = dispatcher.register(this.onAction.bind(this));
}
Store.prototype = {
  /**
   * Adds func as a listener for change events.
   * @param {Function} func - The function to add.
   */
  onChange(func) {
    this.eventEmitter.on(CHANGE_EVENT, func);
  }

  /**
   * Removes func as a listener for change events.
   * @param {Function} func - The function to remove.
   */
  , offChange(func) {
    this.eventEmitter.off(CHANGE_EVENT, func);
  }

  /**
   * Triggers a change event, and calls all listeners.
   */
  , emitChange() {
    this.eventEmitter.emit(CHANGE_EVENT);
  }
  
  /**
   * Called by dispatcher when an action method is called.
   * Unlike a pub-sub, this method is called for every action, not just
   * the actions it cares about. 
   */
  , onAction(action) {
    console.log('ACTION!', action);
    switch(action.type) {
      case ACTIONS.MESSAGE.CHANGE:
        this.message = action.message;
        this.emitChange();
        break;
      case ACTIONS.THEME.CHANGE:
        this.message = `Action.setTheme('${action.theme}')`;
        this.theme = action.theme;
        this.emitChange();
        break;
    }
  }
};


/**
 * Actions provide a reliable way to dispatch events.
 * In reality they are just a wrapper around the dispatch call.
 * But the dispatch call just takes an object. It is difficult to document and 
 * reason about. Wrapping them in action functions provides a form of documentation/spec.
 * The wrapping function can also do validation to make sure everything is correct before
 * dispatching.
 *
 * Actions are designed to be Fire and Forget. So callbacks (which are used in pub-sub)
 * are not allowed in Actions.
 */
export const Actions = {
  /**
   * Set the message.
   * @param {String} message - the message to set. 
   */
  setMessage(message) {
    dispatcher.dispatch({
      type: ACTIONS.MESSAGE.CHANGE
      , message: `Action.setMessage('${message}')`
    });
  }
  
  /**
   * Set the theme
   * @param {String} theme - the theme to use. (default, success, etc)
   */
  , setTheme(theme) {
    dispatcher.dispatch({
      type: ACTIONS.THEME.CHANGE
      , theme: theme
    });
  }
};
/**
 * Try actions in the console!
 * This puts Actions in the global window namespace so you can play around with it.
 * In a production application you shouldn't do this, but it great for debugging/learning.
 */
window.Actions = Actions;


