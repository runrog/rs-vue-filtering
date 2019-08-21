import Vue from 'vue';

const template = require('./template.html');

export default Vue.component('resource-document', {
  template,
  name: 'resource-document',
  props: ['card'],
});
