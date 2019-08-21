import Vue from 'vue';

const template = require('./template.html');

export default Vue.component('resource-support', {
  template,
  name: 'resource-support',
  props: ['card'],
});
