const React = require('react');

const Toggle = React.createClass({
  render() {
    const {status} = this.props;
    const styleLabel = status === 'IN' ? 'success' : 'danger';

    return (
      <div>
        <h1>The Puppy is:
          <span className={`label label-${styleLabel}`}>{status}</span>
        </h1>
        <button onClick={this.onClick} type="button" className="btn btn-primary">
          Toggle
        </button>
      </div>
    );
  },

  onClick(evt) {
    const {action} = this.props;

    action();
  },
});
module.exports = Toggle;
