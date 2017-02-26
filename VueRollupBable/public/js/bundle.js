(function (Vue) {
'use strict';

Vue = 'default' in Vue ? Vue['default'] : Vue;

var appModel = window.appModel = new Vue({
  el: '#app',
  data: {
    mobs: [{ name: 'Goblin', hp: 4 }, { name: 'Goblin', hp: 6 }]
  }
});
console.log('Hello World');

}(Vue));
//# sourceMappingURL=bundle.js.map
