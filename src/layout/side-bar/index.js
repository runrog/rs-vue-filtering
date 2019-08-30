/* eslint consistent-return: 0 */
import Vue from 'vue';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import axios from 'axios';
import filterConfig from '@/filter-config.json';

const template = require('./template.html');

export default Vue.component('side-bar', {
  template,
  name: 'side-bar',
  computed: {
    ...mapGetters(['dataLoading', 'filterData', 'noneChecked']),
  },
  created() {
    this.fetchFilterData();
  },
  mounted() {
    $(this.$refs.sideBar).rsFilterBarAccordion();
  },
  data() {
    return {
      endpointDomain: window.rsVueBasePath || './',
      filters: null,
      queries: {},
      lang: null,
      content: '',
      format: '',
      models: {},
      dataError: false,
    };
  },
  methods: {
    prepareLocalModels() {
      let updateNoneChecked = false;
      this.filters = _.transform(this.filters, (r, v, k) => r[k] = v.list); // eslint-disable-line
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
    updateContent(e) {
      if (!e.target.checked) {
        const checked = [];
        _.forOwn(this.models, (val) => {
          // if at least one is checked we can kill the loop
          _.forOwn(val, (item) => {
            if (item) {
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
      if (!this.noneChecked) {
        _.forOwn(this.models, (val) => {
          _.forOwn(val, (item, key) => {
            val[key] = false;
          });
        });
        this.$store.dispatch('setGlobalValue', {
          item: 'noneChecked',
          value: true,
        });
      }
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
        const request = await axios({
          method: 'get',
          url: `${this.endpointDomain}/${this.lang ? `${this.lang}/` : ''}api/${this.content}?_format=${this.format}`,
        });
        this.$store.dispatch('setGlobalValue', {
          item: 'filterData',
          value: request.data,
        });
      } catch (e) {
        this.dataError = `There was an error fetching data: ${JSON.stringify(e)}`;
      } finally {
        this.$store.dispatch('setGlobalValue', {
          item: 'dataLoading',
          value: false,
        });
      }
    },
  },
});
