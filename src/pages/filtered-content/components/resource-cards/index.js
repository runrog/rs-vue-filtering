import Vue from 'vue';

const template = require('./template.html');

export default Vue.component('resource-cards', {
  template,
  name: 'resource-cards',
  props: ['data'],
  data() {
    return {
      paginate: ['resources'],
    };
  },
});
