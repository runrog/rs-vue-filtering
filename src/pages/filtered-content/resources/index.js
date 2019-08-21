import Vue from 'vue';
import Code from './code';
import PDF from './document';
import Story from './story';
import Support from './support';
import Video from './video';
import Webinar from './webinar';

const template = require('./template.html');

export default Vue.component('resources', {
  template,
  name: 'resources',
  computed: {
    contentTypes() {
      return {
        analyst_report: PDF,
        data_sheet: PDF,
        infographic: PDF,
        reference_architecture: PDF,
        white_paper: PDF,
        ebook: PDF,
        code_repository: Code,
        customer_stories: Story,
        support_article: Support,
        video: Video,
        webinar: Webinar,
      };
    },
  },
  props: ['data'],
  data() {
    return {
      paginate: ['resources'],
    };
  },
});
