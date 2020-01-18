# Animated Models
This project's goal is to load rigged and animated models and play them in A-Frame.

Models from [Kenney](https://kenney.itch.io/kenney-character-assets).

![Final Gif](./blog/imgs/anim_text_working.gif)

# How it works

Use `gltf-model-2` instead of the default `gltf-model`. The updated version sets the `mesh` and `armature` Object3Ds.

Use `anim-mixer` to play animations loaded into the `armature.animations` array.

```
<a-entity id="elmModel"
  gltf-model-2="#model"
  anim-mixer="clipName: Punch"
  >
</a-entity>
```


## TL;DR How to Start
Have [NodeJS](https://nodejs.org/en/) installed and run this command:

```
$ make
```

### Start the Server
```
$ make server
```

### Build
```
$ make build
```

### Lint
```
$ make lint
```

### Dependencies
* [NodeJS](https://nodejs.org/en/)



# Progress

1. [Intro](../blog/1.%20Intro.md)
2. [The Issue](../blog/2.%20The%20Issue.md)
3. [Result](../blog/3.%20Result.md)
