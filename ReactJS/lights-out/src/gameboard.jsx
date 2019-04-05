import React, { useState } from 'react';
const GRID_WIDTH = 5;


export function Gameboard(props) {
  const [grid, setGrid] = useState([
    0,0,0,0,0,
    0,0,1,0,0,
    0,1,0,1,0,
    0,0,1,0,0,
    0,0,0,0,0,]);

  return (
    <div className="grid">{grid.map((isOn, index) => {
      return (
        <div className="grid-cell" onClick={() => setGrid(toggleGridCrossPattern(grid, index, GRID_WIDTH))} key={index}>{isOn ? 1 : 0}</div>
      );
    })}</div>
  );
}


export function toggleGridCrossPattern(grid, index, gridWidth) {
  console.log('hello World', arguments);
  const x = 0| index % gridWidth;
  const y = 0| index / gridWidth;
  const atPos = (x, y) => x + (y * gridWidth);

  // toggle in a cross pattern
  // NOTE: this converts our 1/0s into true/false values, which is ok.
  grid[atPos(x, y)] = !grid[atPos(x, y)];
  grid[atPos(x, y+1)] = !grid[atPos(x, y+1)];
  grid[atPos(x, y-1)] = !grid[atPos(x, y-1)];
  grid[atPos(x+1, y)] = !grid[atPos(x+1, y)];
  grid[atPos(x-1, y)] = !grid[atPos(x-1, y)];

  // console.log('new grid', grid);
  // setGrid(grid);
  return [...grid];
}
