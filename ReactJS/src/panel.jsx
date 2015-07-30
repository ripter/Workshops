import React from 'react';
import Button from './input/button.jsx';

class Panel extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Using Props
        </div>
        <div className="panel-body">
          Pick a style:

          <div>
            <Button type="default" />
            <Button type="primary" />
            <Button type="success" />
            <Button type="warning" />
            <Button type="danger" />
          </div>
        </div>
      </div>
    );
  }
}
export default Panel;
