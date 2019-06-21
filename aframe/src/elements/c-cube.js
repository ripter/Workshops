
// Create a new element based on a-entity
// We can do things here that are not possible with a mixin
AFRAME.registerElement('c-cube', {
  prototype: Object.create(AFRAME.AEntity.prototype, {

    createdCallback: {
      value: function () {
        this.classList.add('clickable');
        this.setAttribute('geometry', 'primitive: box; width: 1; height: 1; depth: 1');
        this.setAttribute('material-cube', 'top: #cubeTop; bottom: #cubeTop; front: #cubeSide1; back: #cubeSide2; left: #cubeSide3; right: #cubeSide4;');
        this.setAttribute('clickable', true);
      }
    },
    // play: {
    //   value: function() {
    //     console.log('play called', this);
    //   }
    // }
  }),
});
