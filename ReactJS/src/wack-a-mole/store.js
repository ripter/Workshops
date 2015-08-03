import EventEmitter from 'event-emitter';
import {ACTIONS} from './actions.js';
import * as util from './util.js';

const CHANGE_EVENT = 'CHANGE_EVENT';
const POPPED = true;
const NOT_POPPED = false;



export function GameStore() {
  this.MAX_MOLES = 1;
  this.lastFrame = 0;
  this.waitTime = 1000;
  this.eventEmitter = new EventEmitter({});
  this.reset();
}
GameStore.prototype = {
  run() {
    requestAnimationFrame((timestamp) => {
      const lastFrame = this.lastFrame;
      const waitTime = this.waitTime;
      const canPlayNextFrame = util.canPlayNextFrame(lastFrame, waitTime, timestamp);
      
      // throttle the speed
      if (!canPlayNextFrame) {
        this.run();
        return;
      }

      // is it time to unpop the moles?
      if (this.canUnpopMole(timestamp)) {
        this.unpopMole(timestamp);
      }

      // can we pop another mole?
      // there can only be n number of moles poped at once.
      if (this.canPopMole(timestamp)) {
        this.popMole(timestamp);
      }

      this.lastFrame = timestamp;
      this.emitChange();
      this.run();
    });
  }
  
  , canPopMole(timestamp) {
    const numberPopped = this.numberPopped || 0;
    const maxPoped = this.MAX_MOLES;
    
    // don't pop past max.
    if (numberPopped === maxPoped) {
      return false;
    }
    
    return true;
  }
  
  , canUnpopMole(timestamp) {
    const numberPopped = this.numberPopped || 0;
    
    if (numberPopped === 0) {
      return false;
    }

    return true;
  }
  
  , popMole(timestamp) {
    const numberPopped = this.numberPopped || 0;
    let tiles = this.tiles;
    const idx = util.randomValidTile(NOT_POPPED, tiles);
    
    // make sure we have a valid index
    if (idx === -1) {
      return tiles;
    }

    // pop it!
    this.numberPopped = numberPopped + 1;
    this.lastPop = timestamp;
    tiles[idx] = POPPED;
    return tiles;
  }
  
  , unpopMole(timestamp) {
    const numberPopped = this.numberPopped || 0;
    let tiles = this.tiles;
    const idx = util.randomValidTile(POPPED, tiles);

    // make sure we have a valid index
    if (idx === -1) {
      return tiles;
    }

    // unpop it!
    this.numberPopped = numberPopped - 1;
    this.lastUnpop = timestamp;
    tiles[idx] = NOT_POPPED;
    return tiles;
  }
  
  , hit(idx) {
    const numberPopped = this.numberPopped || 0;
    let tiles = this.tiles;
    
    this.numberPopped = numberPopped - 1;
    tiles[idx] = NOT_POPPED;
    this.score += 1;
  }

  /**
   * Reset the game.
   */
  , reset() {
    this.score = 0;
    // all tiles start false (no mole)
    this.tiles = [false, false, false,
                  false, false, false,
                  false, false, false];
  }

  /**
   * Return a copy of our public properties
   */
  , toJSON() {
    return {
      tiles: this.tiles
      , score: this.score
    };
  }
  
  /**
   * Adds func as a listener for change events.
   * @param {Function} func - The function to add.
   */
  , onChange(func) {
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
   * Register a dispatcher and listen for actions.
   */
  , registerDispatcher(dispatcher) {
    this.dispatchToken = dispatcher.register((action) => {
      switch (action.type) {
        case ACTIONS.NEW:
          this.reset();
          this.run();
          break;
        case ACTIONS.HIT:
          this.hit(action.idx);
          break;
      }
    });
  }
};
export default GameStore;
