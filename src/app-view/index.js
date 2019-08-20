import Vue from 'vue';
import { mapGetters } from 'vuex';

const template = require('./template.html');

export default Vue.component('app-view', {
  template,
  name: 'full-page',
  computed: {
    ...mapGetters(['currentTheme']),
    theme() {
      return `/static/css/themes/${this.currentTheme}/main.min.css`;
    },
  },
  data() {
    return {
      // loading: false,
      // resources: [],
    };
  },
  created() {
    if (process.env.NODE_ENV === 'development') {
      window.Drupal = {
        t(s) {
          return s;
        },
      };
    }
    // this.fetchEndpoint();
    // this.$store.dispatch('getPages');
    // this.$log.info('fetch all pages for searching');
  },
  methods: {
    // async fetchEndpoint() {
    //   this.loading = true;
    //   try {
    //     const data = await this.$http.get('http://poc-resource-web-service.www8.dev.website.rackspace.com/api/resources?_format=json');
    //     this.resources = data.body;
    //   } catch (e) {
    //     this.error = `There was an error fetching data: ${JSON.stringify(e)}`;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
  },
});
