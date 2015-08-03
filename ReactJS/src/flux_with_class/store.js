'use strict';

import {Dispatcher} from 'flux';
import EventEmitter from 'event-emitter';

import ACTIONS from './constants.js';

const CHANGE_EVENT = 'CHANGE_EVENT';
export const dispatcher = new Dispatcher();

/**
 * Example of a DataStore used by src/page/props.jsx
 */
export class Store {
  constructor() {
    this.message = '';
    this.theme = 'default';
    this.eventEmitter = new EventEmitter({});
    this.dispatchToken = dispatcher.register(this.onAction.bind(this));
  }

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
  offChange(func) {
    this.eventEmitter.off(CHANGE_EVENT, func);
  }

  /**
   * Triggers a change event, and calls all listeners.
   */
  emitChange() {
    this.eventEmitter.emit(CHANGE_EVENT);
  }

  onAction(action) {
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
}

export const Actions = {
  setMessage(message) {
    dispatcher.dispatch({
      type: ACTIONS.MESSAGE.CHANGE
      , message: `Action.setMessage('${message}')`
    });
  }

  , setTheme(theme) {
    dispatcher.dispatch({
      type: ACTIONS.THEME.CHANGE
      , theme: theme
    });
  }
};
window.Actions = Actions;
