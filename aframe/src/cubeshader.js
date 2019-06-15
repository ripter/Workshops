AFRAME.registerShader('cubeshader', {
  schema: {
    emissive: {default: '#000'},
    wireframe: {default: true},
    src: {default: ''},
  },

  update() {
    console.group('cubeshader.update');
    console.log('this', this);
    console.log('arguments', arguments);
    console.groupEnd();
  }
});
