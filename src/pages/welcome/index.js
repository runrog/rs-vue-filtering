import Vue from 'vue';

const template = require('./template.html');

export default Vue.component('welcome-page', {
  template,
  name: 'welcome-page',
  computed: {
    filteredResources() {
      let all = this.resources;
      const checked = this.$_.filter(this.types, t => t.checked);
      if (checked.length > 0) {
        const group = this.$_.map(checked, c => c.name);
        all = this.$_.filter(this.resources, r => group.includes(r.type));
      }
      const search = new RegExp(this.searchInput, 'gi');
      all = this.$_.filter(
        all, r => r.type.match(search) ||
                  r.title.match(search) ||
                  r.product.match(search),
      );
      return all;
    },
  },
  data() {
    return {
      types: [
        {
          name: 'data_sheet',
          checked: false,
        },
        {
          name: 'reference_architecture',
          checked: false,
        },
        {
          name: 'customer_stories',
          checked: false,
        },
        {
          name: 'video',
          checked: false,
        },
        {
          name: 'white_paper',
          checked: false,
        },
        {
          name: 'support_article',
          checked: false,
        },
        {
          name: 'webinar',
          checked: false,
        },
        {
          name: 'ebook',
          checked: false,
        },
        {
          name: 'analyst_report',
          checked: false,
        },
        {
          name: 'infographic',
          checked: false,
        },
      ],
      loading: false,
      error: false,
      searchInput: '',
      resources: [],
    };
  },
  created() {
    this.fetchResources();
  },
  methods: {
    debounceSearch(e) {
      this.searchInput = e.target.value;
    },
    async fetchResources() {
      this.loading = true;
      try {
        const data = await this.$http.get('http://poc-resource-web-service.www8.dev.website.rackspace.com/api/resources?_format=json');
        this.resources = data.body;
      } catch (e) {
        this.error = `There was an error fetching data: ${JSON.stringify(e)}`;
      } finally {
        this.loading = false;
      }
    },
  },
});
