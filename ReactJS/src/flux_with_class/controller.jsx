import React from 'react';

/*
 * React doesn't have a notion of controllers.
 * We use it to mean a component that is tied to a store.
 */

// For ease of learning, we are including the store directly.
// We could also pass a store in the props instead.
import {Store, Actions} from './store.js';
import ACTIONS from './constants.js';
import Button from './button.jsx';

class Controller extends React.Component {
  constructor() {
    super();
      
    // create the store
    this.store = new Store();
    // Whenever the store emits a change, update our state
    this.store.onChange(() => {
      this.setState(this.getState());
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <div className={`panel panel-${this.state.theme}`}>
            <div className="panel-heading">
              Flux Example
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
    
  getState() {
    return {
      message: this.store.message
      , theme: this.store.theme
    }
  }
    
  //
  // Lifecycle Events
  //

  // Called when the component is mounted to the DOM
  componentWillMount() {
    this.setState(this.getState());
  }
}
export default Controller;
