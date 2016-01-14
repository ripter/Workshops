export const ACTIONS = {
  NEW: 'NEW'
  , HIT: 'HIT'
  , UPDATE: {
    SCORE: 'UPDATE_SCORE'
  }
};

export function Action(dispatcher) {
  this.dispatcher = dispatcher;
}
Action.prototype = {
  new() {
    this.dispatcher.dispatch({
      type: ACTIONS.NEW
    });
  }

  , hit(idx) {
    this.dispatcher.dispatch({
      type: ACTIONS.HIT
      , idx: idx
    });
  }
};
