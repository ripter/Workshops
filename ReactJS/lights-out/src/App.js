import React, { Component } from 'react';
import { Gameboard } from './gameboard.jsx';
import './App.css';


const GRID_WIDTH = 5;

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     grid: [
  //       0,0,0,0,0,
  //       0,0,1,0,0,
  //       0,1,1,1,0,
  //       0,0,1,0,0,
  //       0,0,0,0,0,
  //     ],
  //   };
  // }
  // toggleGridCell(index) {
  //   const { grid } = this.state;
  //   const x = 0| index % GRID_WIDTH;
  //   const y = 0| index / GRID_WIDTH;
  //   const atPos = (x, y) => x + (y * GRID_WIDTH);
  //
  //   // toggle in a cross pattern
  //   // NOTE: this converts our 1/0s into true/false values, which is ok.
  //   grid[atPos(x, y)] = !grid[atPos(x, y)];
  //   grid[atPos(x, y+1)] = !grid[atPos(x, y+1)];
  //   grid[atPos(x, y-1)] = !grid[atPos(x, y-1)];
  //   grid[atPos(x+1, y)] = !grid[atPos(x+1, y)];
  //   grid[atPos(x-1, y)] = !grid[atPos(x-1, y)];
  //
  //   this.setState({grid});
  // }
  // render() {
  //   const { grid } = this.state;
  //   return (
  //     <div>
  //       <div className="grid">{grid.map((isOn, index) => {
  //         return (
  //           <div className="grid-cell" onClick={() => this.toggleGridCell(index)} key={index}>{isOn ? 1 : 0}</div>
  //         );
  //       })}</div>
  //     </div>
  //   );
  // }
  render() {
    return (
      <Gameboard />
    );
  }
}

export default App;
