const React = require('react');

const Toggle = React.createClass({
  render() {
    const {status} = this.props;

    return (
      <div>
        <h1>The Puppy is: {status}</h1>
        <button onClick={this.onClick}>Toggle</button>
      </div>
    );
  },

  onClick(evt) {
    const {action} = this.props;
    console.log('target', evt.target);

    action();
  },
});
module.exports = Toggle;
