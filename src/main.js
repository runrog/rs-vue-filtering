// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueLogger from 'vuejs-logger';
import _ from 'lodash';
import VueHighlightJS from 'vue-highlightjs';
import VuePaginate from 'vue-paginate'
import '@nm/zoolander/dist/css/derek.css';
import '@nm/zoolander/dist/js/global-components/filter-bar/filter-accordion';
import './scss/main.scss';
import './theme-reload';
import App from './app-view';
import router from './router';
import store from './store';

Vue.use(VueLogger, {
  logLevels: ['debug', 'info', 'warn', 'error', 'fatal'],
  stringifyArguments: true,
  showLogLevel: true,
  showMethodName: true,
  showConsoleColors: true,
});

Vue.use(VuePaginate);
Vue.use(VueResource);
Vue.use(VueHighlightJS);

// lend me a hand lodash! to all components
Vue.prototype.$_ = _; // eslint-disable-line
Vue.config.productionTip = false;
Vue.config.devtools = true;
// Vue.config.performance = true;

/* eslint-disable no-new */
new Vue({
  el: '#picazzo',
  router,
  store,
  components: { App },
  template: '<App/>',
});
