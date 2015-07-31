import React from 'react';

const Button = React.createClass({
  propTypes:  {
    type: React.PropTypes.string.isRequired
    , action: React.PropTypes.func.isRequired
  }

  , render() {
    const type = this.props.type;

    return (
      <button
        className={`btn btn-${type}`}
        onClick={this.handleClick}
      >
        Click Me!
      </button>
    );
  }

  , handleClick() {
    const type = this.props.type;
    const action = this.props.action;

    action(type);
  }
});
export default Button;
