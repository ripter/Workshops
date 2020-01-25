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
[ ] User can control two different animated models, walking forward and turning with animations.
✅ Add new animated model
[ ]

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
