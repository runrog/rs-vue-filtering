import Vue from 'vue';

const template = require('./template.html');

export default Vue.component('resources', {
  template,
  name: 'resources',
  props: ['data'],
  data() {
    return {
      paginate: ['resources'],
    };
  },
});
