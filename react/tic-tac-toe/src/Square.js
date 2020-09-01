import React from 'react';

// from the tutorial: https://reactjs.org/tutorial/tutorial.html
// Codepen: https://codepen.io/gaearon/pen/gWWZgR?editors=0110
export function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
