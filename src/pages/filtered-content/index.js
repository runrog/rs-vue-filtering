import Vue from 'vue';
import { mapGetters } from 'vuex';
import _ from 'lodash';
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
        _.filter(this.models, (v, k) => _.forOwn(v, (vl, ky) => {
          if (vl) { checked.push({ filter: k, category: ky }); }
        }));
        const matches = [];
        _.forEach(all, (card) => {
          // if card matches at least 1 checked category, add it
          _.forEach(checked, (check) => {
            const value = _.unescape(card[check.filter].replace('_', ' '));
            // console.log(`value for ${check.filter}: `, value);
            const category = new RegExp(check.category, 'gi');
            // TODO if more than 1 are checked, need to only show cards that
            // match exactly those, right now it's showing and or
            // perhaps not though because most will not have both
            if (value.match(category, 'gi')) {
              // console.log(`card matched for ${check.filter}: ${value}`);
              matches.push(card);
            }
            // TODO if we want a search bar we can include the card if it matches
            // user's search input
            // const search = new RegExp(this.searchInput, 'gi');
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
      lodash: _,
    };
  },
  methods: {
    debounceSearch(e) {
      this.searchInput = e.target.value;
    },
  },
});
