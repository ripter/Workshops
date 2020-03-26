import { define } from 'uce';

/**
 * Rock Paper Scissors Picker.
 * Component that lets the user pick from the possible RPS hands.
*/
const privates = new WeakMap();
define('rps-hand-picker', {
  init() {
    // Setup instance level private state.
    privates.set(this, {
      selected: null,
    });
    this.render();
  },

  render() {
    // µhtml is provided automatically via this.html
    this.html`
    <div value="rock" onClick=${() => this.selectedValue = 'rock'}>
      <svg>
        <use href="#svg-rock-hand"  />
      </svg>
    </div>
    <div value="paper" onClick=${() => this.selectedValue = 'paper'}>
      <svg>
        <use href="#svg-paper-hand"  />
      </svg>
    </div>
    <div value="scissors" onClick=${() => this.selectedValue = 'scissors'}>
      <svg>
        <use href="#svg-scissors-hand"  />
      </svg>
    </div>
    `;
  },

  get selectedValue() {
    // Return the private state for this instance.
    return privates.get(this).selected;
  },
  set selectedValue(value) {
    // Update the private state for this instance.
    const state = privates.get(this);
    state.selected = value;
    privates.set(this, state);

    // Update our selectedValue attribute.
    if (value !== null) {
      this.setAttribute('selected-value', value);
    }
    else {
      this.removeAttribute('selected-value');
    }

    // Emit a changed event
    this.dispatchEvent(new CustomEvent('selected', {
      detail: {
        value,
      },
    }));
  },
});
