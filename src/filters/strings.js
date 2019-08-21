import _ from 'lodash';

export default {
  capitalize(value) {
    if (!value) return '';
    return _.startCase(value);
  },
  unescape(value) {
    if (!value) return '';
    return _.unescape(value);
  },
};
