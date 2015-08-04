import React from 'react';
import {Dispatcher} from 'flux';

import Tile from './tile.jsx';
import GameStore from './store.js';
import {Action} from './actions.js';

import './less/gameboard.less';

// We are acting as a controller
// So create all the parts for flux.
const dispatcher = new Dispatcher();
const store = new GameStore();
const action = new Action(dispatcher);

// Dispatcher could be used with any number of stores
// We only have one store.
store.registerDispatcher(dispatcher);

// Debugging
window.store = store;


const Gameboard = React.createClass({
  render() {
    return (
      <div className="gameboard">
        <div className="row">
          <div className="col-md-6">
            <h1>Score: {this.state.score}</h1>

            <div className="gameboard__board">
              {this.state.tiles.map((hasMole, idx) => {
                // We need to bind the action before passing it
                // because it saved the dispatcher in this, which means
                // the context has to be correct for it to work.
                return (
                  <Tile
                    key={idx}
                    id={idx}
                    hasMole={hasMole}
                    action={action.hit.bind(action)}
                  />
                  );
              })}
            </div>
          </div>

          <div className="col-md-6">
            <h1>
              Classic Wack-A-Mole.
            </h1>

            <p>Click on the green squares to get a point.</p>

            <button
              className="btn btn-warning"
              onClick={this.handleNewClick}
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  , handleNewClick() {
    action.new();
  }

  , onChange() {
    this.setState(getState());
  }

  //
  // Component Lifecycle
  //

  , getInitialState() {
    return getState();
  }

  , componentWillMount() {
    store.onChange(this.onChange);
  }

  , componentWillUnmount() {
    store.offChange(this.onChange);
  }
});
export default Gameboard;


function getState() {
  return store.toJSON();
}
