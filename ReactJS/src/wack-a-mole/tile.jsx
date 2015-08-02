import React from 'react';
import classNames from 'classNames';

import './less/tile.less';

const Tile = React.createClass({
  propTypes: {
    hasMole: React.PropTypes.bool.isRequired
    , id: React.PropTypes.number.isRequired
    , action: React.PropTypes.func.isRequired
  }

  , render() {
    const hasMole = this.props.hasMole;
    let className = classNames({
      tile: true
      , 'tile--is-mole': hasMole
    });
      
    return (
      <div 
        className={className}
        onClick={this.handleClick}
      >
      </div>
    );
  }
    
  , handleClick() {
    const hasMole = this.props.hasMole;
    const id = this.props.id;
    const action = this.props.action;
      
    // need a mole to hit
    if (!hasMole) { return; }
      
    // trigger the hit
    action(id);
  }
});
export default Tile;