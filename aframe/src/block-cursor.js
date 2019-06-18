
AFRAME.registerComponent('block-cursor', {
  schema: {
    target: {type: 'selector'},
  },

  init() {
    console.log('init block-cursor', this.data);
    const cursor = this.data.target.object3D;
    // const cursor = this.cursor = document.querySelector(this.data.target).object3D;

    this.el.addEventListener('raycaster-intersection', (evt) => {
      const { els, intersections } = evt.detail;
      if (intersections.length < 1) { return; }
      const { distance, point } = intersections[0];

      console.log('cursor intersection', point);
      cursor.position.set(point.x, point.y, point.z);

      //DEBUG:
      const elLog = document.querySelector('#logDebug2');
      elLog.setAttribute('value', `intersection ${point.x},${point.y},${point.z}`);
      //DEBUG END
    });
  },
});
