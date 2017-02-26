import Vue from 'vue';

const appModel = window.appModel = new Vue({
  el: '#app',
  data: {
    mobs: [
      {name: 'Goblin', hp: 4},
      {name: 'Goblin', hp: 6},
    ],
  }
});
console.log('Hello World');
