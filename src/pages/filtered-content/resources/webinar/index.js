import Vue from 'vue';

const template = require('./template.html');

export default Vue.component('resource-webinar', {
  template,
  name: 'resource-webinar',
  props: ['card'],
});
