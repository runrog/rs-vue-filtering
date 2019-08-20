import Vue from 'vue';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import ResourceCards from './components/resource-cards';

const template = require('./template.html');

// TODO set this up with mock data
// test components
// test vuex

export default Vue.component('filtered-content', {
  template,
  name: 'filtered-content',
  components: {
    ResourceCards,
  },
  computed: {
    ...mapGetters(['filterData', 'dataLoading', 'noneChecked']),
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
            const text = new RegExp(_.startCase(card[check.filter]));
            if (check.category.match(text, 'gi')) {
              matches.push(card);
            }
          });
        });
        all = matches;
      }
      // const search = new RegExp(this.searchInput, 'gi');
      // all = _.filter(
      //   all, r => r.type.match(search) ||
      //             r.title.match(search) ||
      //             r.product.match(search),
      // );
      // console.log('all: ', all.length);
      return all;
    },
  },
  props: ['models'],
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
