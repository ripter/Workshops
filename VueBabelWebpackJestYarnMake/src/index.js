import App from './components/app.js';
import Vue from 'vue';

Vue.component('app', App);
// Create the vue app.
const app = new Vue({
  el: document.getElementById('app'),
  template: '<app></app>',
});
// Global for easy debugging
window.app = app;
