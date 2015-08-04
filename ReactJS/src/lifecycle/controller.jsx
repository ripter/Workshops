import React from 'react';
import LifecycleExample from './example.jsx';


const STYLES = ['bg-primary', 'bg-success', 'bg-info', 'bg-warning', 'bg-danger'];

const Controller = React.createClass({
  render() {
    const bgStyle = STYLES[this.state.styleIndex];
    let lifecycleExample = <LifecycleExample backgroundStyle={bgStyle} />;
      
    if (!this.state.shouldRenderExample) {
      lifecycleExample = '';
    }

    return (
      <div className="row">
        <div className="col-md-6">
          {lifecycleExample}
        </div>
        <div className="col-md-6">
          <h1>Trigger some lifecycle events!</h1>
          <p>
            <button onClick={this.toggleRender} className="btn btn-default">
              <code>
                shouldRenderExample: 
                {this.state.shouldRenderExample.toString()}
              </code>
            </button>
          </p>
          <p>
            <button onClick={this.cycleStyle} className="btn btn-default">
              <code>
                backgroundStyle: 
                {STYLES[this.state.styleIndex]}
              </code>
            </button>
          </p>
        </div>
      </div>
    );
  }
    
  , toggleRender() {
    this.setState({
      shouldRenderExample: !this.state.shouldRenderExample
    });
  }
    
  , cycleStyle() {
    let index = this.state.styleIndex;
      
    // Incriment, if we go do far, we will cycle back
    index += 1;
    if (index === STYLES.length) {
      index = 0;
    }
      
    this.setState({
      styleIndex: index
    });
  }
    
  , getInitialState() {
    return {
      shouldRenderExample: true
      , styleIndex: 1
    }
  }
});
export default Controller;