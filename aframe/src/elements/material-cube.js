
AFRAME.registerElement('c-cube', {
  prototype: Object.create(AFRAME.AEntity.prototype, {

    createdCallback: {
      value: function () {
        console.log('createdCallback called', this);
        this.classList.add('clickable');
        this.setAttribute('geometry', 'primitive: box; width: 1; height: 1; depth: 1');
        this.setAttribute('material-cube', 'top: #cubeTop; bottom: #cubeTop; front: #cubeSide1; back: #cubeSide2; left: #cubeSide3; right: #cubeSide4;');
        this.setAttribute('clickable', true);
      }
    },

    play: {
      value: function() {
        console.log('play called', this);
      }
    }
  }),
});


// export class MaterialCube extends HTMLElement {
//   constructor() {
//     super();
//     console.log('constructor', arguments, this);
//     const elScene = document.querySelector('a-scene');
//     this.entity = this.createEntity();
//     elScene.append(this.entity);
//     return this.entity;
//   }
//
//   createEntity() {
//     const entity = document.createElement('a-entity');
//     entity.setAttribute('clickable', true);
//     entity.setAttribute('geometry', {primitive: 'box', depth: 1, height: 1, width: 1});
//     entity.setAttribute('material-cube', {
//       top: '#cubeTop',
//       bottom: '#cubeTop',
//       front: '#cubeSide1',
//       back: '#cubeSide2',
//       left: '#cubeSide3',
//       right: '#cubeSide4',
//     });
//     return entity;
//   }
// }

// AFRAME.registerPrimitive('cube-birch-log', {
//   init() {
//      console.log('c-cube init', this);
//   },
//   // Preset default components. These components and component properties will be attached to the entity out-of-the-box.
//   defaultComponents: {
//     clickable: {},
//     geometry: {primitive: 'box', depth: 1, height: 1, width: 1},
//     'material-cube': {},
//   },
//
//   // Defined mappings from HTML attributes to component properties (using dots as delimiters).
//   // If we set `depth="5"` in HTML, then the primitive will automatically set `geometry="depth: 5"`.
//   mappings: {
//     // depth: 'geometry.depth',
//     // height: 'geometry.height',
//     // width: 'geometry.width'
//   },
// });

/*

      geometry="primitive: box; width: 1; height: 1; depth: 1"
      material-cube="top: #cubeTop; bottom: #cubeTop; front: #cubeSide1; back: #cubeSide2; left: #cubeSide3; right: #cubeSide4;"
      clickable

 */
