import Vue from 'vue';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import filterConfig from './filter-config.json';

const template = require('./template.html');

export default Vue.component('side-bar', {
  template,
  name: 'side-bar',
  computed: {
    ...mapGetters(['sidebarLinks', 'dataLoading', 'filterData']),
  },
  created() {
    this.fetchFilterData();
  },
  mounted() {
    $(this.$refs.sideBar).rsFilterBarAccordion();
  },
  data() {
    return {
      endpointDomain: 'http://mte-4798-rest-endpoints.www8.dev.website.rackspace.com',
      filters: null,
      queries: {},
      lang: null,
      content: '',
      format: '',
      models: {},
    };
  },
  methods: {
    prepareLocalModels() {
      let updateNoneChecked = false;
      _.forOwn(this.filters, (val, key) => {
        this.$set(this.models, key, {});
        const modelKey = this.models[key];
        let qlist = this.queries[key] && !_.isArray(this.queries[key]) ? [...this.queries[key].split(',')] : this.queries[key];
        if (qlist) {
          qlist = qlist.map(q => _.startCase(q));
        }
        // qlist = qlist.map(q => _.startCase(q));
        _.forEach(val, (list) => {
          // if url has filters via url queries
          if (this.queries[key] && qlist.includes(list)) {
            this.$set(modelKey, list, true);
            if (!updateNoneChecked) {
              this.$store.dispatch('setGlobalValue', {
                item: 'noneChecked',
                value: false,
              });
              updateNoneChecked = true;
            }
          } else {
            this.$set(modelKey, list, false);
          }
        });
      });
    },
    updateContent(e, filter) {
      if (!e.target.checked) {
        const checked = [];
        _.forOwn(this.models, (val, key) => {
          // if at least one is checked we can kill the loop
          _.forOwn(val, (item, itemKey) => {
            if (item) {
              console.log(`${itemKey} is checked`);
              checked.push(item);
              return false;
            }
          });
          if (checked.length > 0) {
            return false;
          }
        });
        if (checked.length === 0) {
          this.$store.dispatch('setGlobalValue', {
            item: 'noneChecked',
            value: true,
          });
        }
      } else {
        this.$store.dispatch('setGlobalValue', {
          item: 'noneChecked',
          value: false,
        });
      }
    },
    clearAll() {
      // console.log('clear all');
    },
    async fetchFilterData() {
      const $route = this.$router.currentRoute;
      this.queries = _.cloneDeep($route.query);
      this.lang = $route.meta.lang;
      this.content = $route.meta.content;
      this.format = $route.meta.format;
      this.filters = filterConfig[$route.meta.content];
      this.prepareLocalModels();
      this.$store.dispatch('setGlobalValue', {
        item: 'dataLoading',
        value: true,
      });
      try {
        const data = await this.$http.get(
          `${this.endpointDomain}/${this.lang ? `${this.lang}/` : ''}api/${this.content}?_format=${this.format}`,
        );
        this.$store.dispatch('setGlobalValue', {
          item: 'filterData',
          value: data.body,
        });
      } catch (e) {
        this.error = `There was an error fetching data: ${JSON.stringify(e)}`;
      } finally {
        this.$store.dispatch('setGlobalValue', {
          item: 'dataLoading',
          value: false,
        });
      }
    },
  },
});
