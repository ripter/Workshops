import React from 'react';

// JS Example of props
let JSProps = {
  aProp: 'with a string value'
  , anotherProp: ['any', 'value', 'works']
  , aMethod: function() {}
};

// You can change them!
JSProps.aProp = 'A changed value!';



// // HTML props aka attributes
// let HTMLProps = (
//     <a 
//       href="href is a prop"
//       class="class is also a prop"
//     >
//       Link
//     </a>);

// // You *can not* change them!
// // This will *NOT* work as expected.
// HTMLProps.href = '#does not work';


// React
// Props are set just like html props. They may *not* be set like JavaScript props.
// For the most part they are idential to HTML props.
// http://facebook.github.io/react/docs/tags-and-attributes.html

const PropExample = React.createClass({
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>React Component</h2>

            <input 
              id="react-input" 
              type="text" 
            /> 
        
            Text after input
          </div>
          <div className="col-md-6">
            <p>Try changing the properties in the source</p>
            <p> Input changes a lot depending on it's type.</p>
            <p>
              Try these:
              <ul>
                <li><code>type="radio"</code></li>
                <li><code>type="button"</code></li>
                <li><code>type="date"</code></li>
                <li><code>type="color"</code></li>
                <li><code>type="file"</code></li>
                <li><code>type="password"</code></li>
                <li><code>type="range"</code></li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    );
  }
});
export default PropExample;