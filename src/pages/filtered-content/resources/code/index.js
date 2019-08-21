import Vue from 'vue';

const template = require('./template.html');

export default Vue.component('resource-code', {
  template,
  name: 'resource-code',
  props: ['card'],
});
