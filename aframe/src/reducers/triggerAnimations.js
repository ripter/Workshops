/**
 * Triggers animations by emiting events
 * DIRTY!!!
 * This is needed because the alongpath component can not play on event yet.
 * So we need to emit action on alongpath-trigger-activated, listen for the action, then trigger the play.
 */
export default function triggerAnimations(state, action) {
  const { type } = action;
  const { activeCamera } = state;
  const { puzzle, animations } = state;

  // When the level starts
  // Start the Oppenheimer timer
  if (activeCamera === 'level') {
    playPath('oppie');
    playPath('deliveryGuy');
  }

  // Actions for starting animations
  switch (type) {
    case 'touchDelivery':
      playPath('rollingOrange');
      break;
    case 'toggleDeliveryInventory':
      // console.log('updating Inventory');
      // updateInventory('deliveryInventory');
      break;
    case 'lockFailSoldier':
      // console.log('Resetting Soldier');
      // reversePlayPath('soldier');
      break;
    case 'touchSoldier':
      playPath('soldier');
      break;
    case 'pieceResetSoldier':
      if (animations.soldier === 'failed') {
        resetPath('soldier');
        animations.soldier = 'stopped'
      }
      break;
    case 'pieceLockSoldier':
      // if the lock failed, reset
      if (!puzzle.lockSoldier) {
        animations.soldier = 'failed'
        reversePlayPath('soldier');
      }
      else {
        // Lock success, switch paths and play
        switchPaths('soldier', '#trackSoldier2');
        playPath('soldier');
        // Have him 'pick up' the orange
        toggleVisible('rollingOrange');
        toggleVisible('soldierInventory');
      }
      break;
    case 'pieceLockTable':
      if (puzzle.lockOrange) {
        toggleVisible('soldierInventory');
        toggleVisible('tableInventory');
      }
      break;
    default:
      // no default
  }

  state.animations = animations;
  return state;
}

function playPath(elmID) {
  const elm = document.getElementById(elmID);
  const alongpath = elm.getAttribute('alongpath');

  // start playing the path
  alongpath.isPlaying = true;
  elm.setAttribute('alongpath', alongpath);
}

function reversePlayPath(elmID) {
  const elm = document.getElementById(elmID);
  const alongpath = elm.getAttribute('alongpath');

  // start playing the path
  alongpath.isPlaying = true;
  alongpath.isReversing = true;
  elm.setAttribute('alongpath', alongpath);
}

function resetPath(elmID) {
  const elm = document.getElementById(elmID);
  const alongpath = elm.getAttribute('alongpath');

  // start playing the path
  alongpath.isPlaying = false;
  alongpath.isReversing = false;
  elm.setAttribute('alongpath', alongpath);
}

function toggleVisible(elmID) {
  const elm = document.getElementById(elmID);
  const visible = elm.getAttribute('visible');

  elm.setAttribute('visible', !visible);
}


function switchPaths(elmID, newPath) {
  const elm = document.getElementById(elmID);
  const alongpath = elm.getAttribute('alongpath');

  // start playing the path
  alongpath.curve = newPath;
  elm.setAttribute('alongpath', alongpath);
}
