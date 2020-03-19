import React from 'react';
import cn from 'classnames';
import './styles.css';

import { Rock } from '../Rock';
import { Paper } from '../Paper';
import { Scissors } from '../Scissors';



export function HandPicker(props) {
  const { selected, onClick } = props;
  console.log('props', props);

  const handleClick = (hand) => {
    // click handler is optional
    if (!onClick) { return; }
    onClick(hand);
  }

  return <div className={cn({'handPicker': true, 'selected': selected !== null})}>
    <div
      className={cn({selected: 'rock' === selected})}
      onClick={() => handleClick('rock')}>
      <Rock />
    </div>
    <div
      className={cn({selected: 'paper' === selected})}
      onClick={() => handleClick('paper')}>
      <Paper />
    </div>
    <div
      className={cn({selected: 'scissors' === selected})}
      onClick={() => handleClick('scissors')}>
      <Scissors />
    </div>
  </div>;
}
