# Character Controller
#### Inspired by [Unity Character Controller](https://docs.unity3d.com/Manual/class-CharacterController.html)

The Character Controller allows the player to control an Animated Mesh. It does this by moving the Model in global space and transiting between animations.

* Respond to player input.
* Transitions between animations.
* Simple collision detection using [Raycasting](https://threejs.org/docs/#api/en/core/Raycaster) (default is `.solid` objects).
* feet fixed to a [nav-mesh](https://en.wikipedia.org/wiki/Navigation_mesh) or defined y value (default is 0).
* Moves model based on velocity.


Or at least I hope it will do all those things once it is finished.



## Active Goal:
* [ ] User can control two different animated models, walking forward and turning with animations.
* ✅ Add new animated model
* ✅ Add Click handlers on the models.
* ✅ On click, toggle the character-controller component.
* ✅ Refactor `user-controls` to use `key_map`.
* ✅ Refactor `click-to-select` to place an active indicator over the selected model.
* [ ] Use Run animation instead of the Walk. This model uses animations with different names and speeds. The Controller should support both.

## ToDo:
* [ ] Everything.
* [ ] Transition between animations using velocity.
* [ ] Add Run speed & animation. (with transition)
* [ ] Add Crouch with animation and transitions.
* [ ] Create a generic way to add new Action->Animation->Transition groups.
* [ ] Use the new way to add Jump
* [ ] Use the new way to add Interact Standing and Interact Crouched.
* [ ] Refactor older animation groups to use new method.
* [ ] Add Raycaster and basic collision detection.
* [ ] improve quality of collision detection, detect more edge cases.
* [ ] Add nav-mesh for y axis control.
* ✅ Move based on WASD keys while playing animation.
* ✅ Play Idle animation when not moving, and Walking when moving.


## Input System
The `input` system listens to keyboard input and translates it into
custom keys. [KEY_MAP](./src/consts/key_map.js) provides a mapping from
[KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
to a custom named key.

*Example usage:*
```
import { Key } from './consts/key_map';

// Inside a component
const { input } = this.el.sceneEl.systems;
if (input.isKeyDown(Key.Forward)) {
  // Forward key is down.
}
```


## Click To Select
The `click-to-select` component/system combo

Entities with the `click-to-select` component respond to the `click` event, setting the last entity as `selected`.

The selected entity will have the indicator floating above it.
