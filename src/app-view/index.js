import Vue from 'vue';

const template = require('./template.html');

export default Vue.component('app-view', {
  template,
  name: 'full-page',
  created() {
    if (process.env.NODE_ENV === 'development') {
      window.Drupal = {
        t(s) {
          return s;
        },
      };
    }
  },
});
