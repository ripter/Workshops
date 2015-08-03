import React from 'react';

/*
 * React doesn't have a notion of controllers.
 * We use it to mean a component that is tied to a store.
 */

import {Store, Actions} from './store.js';
import ACTIONS from './constants.js';
import Button from './button.jsx';

// For ease of learning, we are including the store directly.
// We could also pass a store in the props instead.
// Create a store to use for all instances of Controller
const sampleStore = new Store();


let Controller = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <div className={`panel panel-${this.state.theme}`}>
            <div className="panel-heading">
              Flux Example: Theme is {this.state.theme}
            </div>
            <div className="panel-body">
              Pick a theme:

              <div>
                <Button
                  type="default"
                  action={Actions.setTheme}
                />
                <Button
                  type="primary"
                  action={Actions.setTheme}
                />
                <Button
                  type="success"
                  action={Actions.setTheme}
                />
                <Button
                  type="warning"
                  action={Actions.setTheme}
                />
                <Button
                  type="danger"
                  action={Actions.setTheme}
                />

                {
                // Actions has two functions,
                //  can you create a button that calls the other one?
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h2>Action:</h2>
          <code>
            {this.state.message}
          </code>
        </div>
      </div>
    );
  }

  , getState() {
    const store = this.props.store;

    // We get our state directly from the store because we are a controller.
    return {
      message: store.message
      , theme: store.theme
    };
  }


  , onStoreChange() {
    this.setState(this.getState());
  }

  //
  // Lifecycle Events
  //

  // Called when the component is mounted to the DOM
  , componentWillMount() {
    const store = this.props.store;

    // Now that we are mounted to the DOM, start listening for changes.
    store.onChange(this.onStoreChange);
  }

  // Called when the component is unmounted from the DOM
  , componentWillUnmount() {
    const store = this.props.store;

    // Cleanup our refrences now that we have been removed from the DOM.
    // If we left this refrence, we could cause a memory leak.
    store.offChange(this.onStoreChange);
  }

  // Called once before componentWillMount
  , getInitialState() {
    return this.getState();
  }

  // Called once when ReactJS creates our 'class'
  // Any references will be shared accross all instances.
  , getDefaultProps() {
    return {
      store: sampleStore
    };
  }
});
export default Controller;
