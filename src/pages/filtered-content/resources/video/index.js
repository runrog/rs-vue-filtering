import Vue from 'vue';

const template = require('./template.html');

export default Vue.component('resource-video', {
  template,
  name: 'resource-video',
  props: ['card'],
});
