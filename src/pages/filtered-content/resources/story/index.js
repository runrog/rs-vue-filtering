import Vue from 'vue';

const template = require('./template.html');

export default Vue.component('resource-story', {
  template,
  name: 'resource-story',
  props: ['card'],
});
