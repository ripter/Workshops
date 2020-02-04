# Character Controller
#### Inspired by [Unity Character Controller](https://docs.unity3d.com/Manual/class-CharacterController.html)

The Character Controller is the glue the ties together several components into a controllable character or mob. It can be controlled by the player or programmatically.

This component is more of an architecture than a specific library or piece of code. The idea is to make the glue code easy to write, fork, and modify to the specific game and specific need.




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



## Collision system
The `collision` system and `collision` components create a simple AABB collision system. Components can use this system to react to the collision, like preventing characters from moving through each other. Or preventing the player from moving through blocks and other obstacles.
