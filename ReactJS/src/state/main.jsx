import React from 'react';


const StateExample = React.createClass({
  render() {
    // You can set the prop here, or directly on the tag (like className).
    const typeProp = 'text';

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>React Component</h2>

            <input 
              id="react-input" 
              type={typeProp}
            /> 
        
            Text after input
          </div>
          <div className="col-md-6">
            <p>Try changing the properties in the source</p>
            <p> Input changes a lot depending on its type.</p>
            <p>
              Try these:
              <ul>
                <li> 
                  <button 
                    className="btn btn-default"
                    onClick={this.handleClick('radio')}
                  >
                    <code>type="radio"</code>
                  </button>
                </li>
                <li>
                  <button 
                    className="btn btn-primary"
                    onClick={this.handleClick('button')}
                  >
                    <code>type="button"</code>
                  </button>
                </li>
                <li>
                  <button 
                    className="btn btn-success"
                    onClick={this.handleClick}
                  >
                    <code>type="date"</code>
                  </button>
                </li>
                <li>
                  <button 
                    className="btn btn-warning"
                    onClick={this.handleClick}
                  >
                    <code>type="color"</code>
                  </button>
                </li>
                <li>
                  <button 
                    className="btn btn-danger"
                    onClick={this.handleClick}
                  >
                    <code>type="file"</code>
                  </button>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    );
  }
    
  , handleClick(type) {
    // instead of making a function for each button, I'm using a closure.
    return (evt) => {
      console.log('type', type); 
    };
  }
});
export default StateExample;