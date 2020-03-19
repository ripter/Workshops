import React, { useReducer } from 'react';
import './styles.css';

import { HandPicker } from '../HandPicker';
import { stateReducer } from './stateReducer';
import { getSavedPlayerState } from '../../utils/getSavedPlayerState';
import { getLinkedOpponentState } from '../../utils/getLinkedOpponentState';

export function GameRoot() {
  const [state, dispatch] = useReducer(stateReducer, {
    player: getSavedPlayerState(),
    opponent: getLinkedOpponentState(),
  });

  console.log('Game state', state);

  return <div className="rps-game">
    <h1>Rock Paper Scissors!</h1>

    <h2>Pick your hand!</h2>
    <HandPicker
      selected={state.player ? state.player.hand : null}
      onClick={hand => dispatch({type: 'click', hand})}
      />

    <h2>Verify Results</h2>
    <HandPicker />
  </div>;
}
