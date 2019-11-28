# Loading an FBX File in A-Frame.

There is an existing FBX Loader in [Don McCurdy's A-frame extras](https://github.com/donmccurdy/aframe-extras/tree/master/src/loaders). So if you just want a good way to load FBX Files in a-frame, go with his version. The one I am going to create will not have all the features. I'm only going to implement enough to convert to our desired GLTF format.

## Setup

We need a [FBXLoader](https://github.com/mrdoob/three.js/blob/dev/examples/js/loaders/FBXLoader.js) for Three.JS. You should grab the latest version from github.

Include the loader for FBX files.
```
<script src="./libs/FBXLoader.js"></script>
```


Load the FBX File using A-Frame's asset system.
```
<a-assets>
  <a-asset-item id="fbxModelFemale" src="./assets/characterLargeFemale.fbx"></a-asset-item>
</a-assets>
```

Then we just need to use the asset in a component. We need an A-Frame component that can load FBX Models. We could use [Don McCurdy's fbx-model component](https://github.com/donmccurdy/aframe-extras/blob/master/src/loaders/fbx-model.js). But I think we will learn more if we build our own.


## Creating fbx-model component
We will call the new component `fbx-model` to fit in with the existing naming scheme used by A-Frame.

We want to make this:

```
<a-entity fbx-model="#fbxModelFemale"></a-entity>
```

You can read the basics on how to [write a component](https://aframe.io/docs/0.9.0/introduction/writing-a-component.html) and [component API](https://aframe.io/docs/0.9.0/core/component.html) online. I am going to assume you have read those already, and move on to interesting parts of the code.


The first step is to try and load a file and get the model back.

```
AFRAME.registerComponent('fbx-model', {
  schema: {type: 'asset'},
  init() {
    const url = this.data;
    const loader = new THREE.FBXLoader();

    loader.load(url, (model) => {
      console.log('model', model);
    }, void 0, (error) => {
      console.error('Error Loading file', error);
    });
  },
});
```


### First Error

> Loading file Error: THREE.FBXLoader: Cannot find the version number for the file given.
    at getFbxVersion (FBXLoader.js:3876)


Thinking that maybe this was a problem with the way the file was exported (missing version number and all) I tried loading the model into Blender and re-exporting it. I still got the same error message.

That leaves me with three options.
1. Debug the problem and see if it is something I can fix.
2. Try other files and see if it is specific to this file.
3. Avoid the problem by using Blender to convert the file into GLTF


The easiest solution is number three. I am only creating this converter for fun. Anyone with real modeling skill should use Blender. But I am not ready to give up just yet.

I can rule out a problem with the file since it works in the [THREE editor](https://threejs.org/editor/), so that means the problem is on my side.

I found importing FBX in the [THREE editor](https://threejs.org/editor/), shows the model at a very large size. (The file is called large so this is not totally unexpected.) Trying to export it to GTLF and then re-import it shows a messed up model. While the version I exported from blender loads and looks fine.

Since [Blender](https://www.blender.org/) is free and works very well. I think I'm going to abort this attempt for now. There are plenty of problems to solve like textures and animations. I do not need to solve loading FBX files.

It only took me a few minutes to open each file in Blender and export it as gltf.
