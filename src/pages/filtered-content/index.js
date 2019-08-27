import Vue from 'vue';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import filterConfig from '@/filter-config.json';
import Resources from './resources';

const template = require('./template.html');

export default Vue.component('filtered-content', {
  template,
  name: 'filtered-content',
  components: {
    Resources,
  },
  computed: {
    ...mapGetters(['filterData', 'dataLoading', 'noneChecked']),
    types() {
      return { resources: Resources };
    },
    filteredResources() {
      let all = this.filterData;
      // if at least one filter is checked, we need to do the filtering
      // if not we can return all of the data
      if (!this.noneChecked) {
        const checked = [];
        const typesChecked = [];
        _.filter(this.models, (v, k) => _.forOwn(v, (vl, ky) => {
          if (vl) {
            checked.push({ filter: k, category: ky });
            if (!typesChecked.includes(k)) {
              typesChecked.push(k);
            }
          }
        }));
        const matches = [];
        _.forEach(all, (card) => {
          _.forEach(checked, (check, i) => { // eslint-disable-line
            const key = check.filter;
            const value = _.unescape(card[key].replace('_', ' '));
            const category = new RegExp(check.category, 'gi');
            if (typesChecked.length > 1) {
              const allowMultiple = filterConfig[this.content][key].allowMultiple;
              // if something does not match then move to next card as this
              // should not be shown in the filter
              if (!value.match(category, 'gi') && allowMultiple) {
                return false;
              }
              // if we have a filter that only accepts 1 value (like type),
              // it's possible a user checked multiple types to filter, so
              // we just need to make sure the card has one of those
              if (!allowMultiple && !this.singleItemExists({ checked, value, key })) {
                return false;
              }
              // last filter was reached, if all checks reached here we can add card
              if (i === checked.length - 1) {
                matches.push(card);
              }
            } else if (value.match(category, 'gi')) {
              // if only one filter type is checked, we can add the card
              // if that value matches
              matches.push(card);
            }
          });
        });
        all = matches;
      }
      return all;
    },
  },
  props: ['models', 'data-error', 'content'],
  data() {
    return {
      loading: false,
      error: false,
      searchInput: '',
    };
  },
  methods: {
    singleItemExists(p) {
      return _.find(p.checked, c => c.filter === p.key && c.category.match(new RegExp(p.value, 'gi')));
    },
    debounceSearch(e) {
      this.searchInput = e.target.value;
    },
  },
});
