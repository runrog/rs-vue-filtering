import * as types from '@/store/mutation-types';

const state = {
  filterData: null,
  dataLoading: false,
  noneChecked: true,
};

const getters = {
  filterData(s) {
    return s.filterData;
  },
  dataLoading(s) {
    return s.dataLoading;
  },
  noneChecked(s) {
    return s.noneChecked;
  },
};

const mutations = {
  [types.SET_FILTER_DATA](s, p) {
    s.filterData = p;
  },
  [types.SET_GLOBAL_VALUE](s, p) {
    if (p.key) {
      p.item[p.key] = p.value;
    } else {
      s[p.item] = p.value;
    }
  },
};

const actions = {
  setFilterData: ({ commit }, payload) => commit(types.SET_FILTER_DATA, payload),
  setGlobalValue: ({ commit }, payload) => commit(types.SET_GLOBAL_VALUE, payload),
};

export default {
  state,
  getters,
  mutations,
  actions,
};
