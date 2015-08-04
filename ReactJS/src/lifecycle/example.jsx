import React from 'react';


const LifecycleExample = React.createClass({
  render() {
    return (
      <div id="example" className={this.props.backgroundStyle}>
        <h1>Lifecycle Example</h1>
        <p>All the action is on the console</p>
      </div>
    ); 
  }
    
    
  , getInitialState() {
    console.log('getInitialState');
    return {};
  }
    
  , getDefaultProps() {
    console.log('getDefaultProps')
    return {
      backgroundStyle: 'bg-primary'
    };
  }
    
  , componentWillMount() {
    console.log('componentWillMount');
  }
    
  , componentDidMount() {
    console.log('componentDidMount');
  }
    
  , componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  }
    
  , shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    return true;
  }
    
  , componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', nextProps, nextState);
  }
    
  , componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevProps, prevState);
  }
    
  , componentWillUnmount() {
    console.log('componentWillUnmount');
  }
});
export default LifecycleExample;