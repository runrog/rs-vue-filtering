import * as types from '@/store/mutation-types';
import SideBar from '@/layout/side-bar/links.json';

const state = {
  sidebarLinks: [],
  filterData: null,
  dataLoading: false,
  noneChecked: true,
};

const getters = {
  sidebarLinks(s) {
    return s.sidebarLinks;
  },
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
  [types.GET_SIDE_BAR_LINKS](s) {
    s.sidebarLinks = SideBar.links;
  },
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
  getSideBarLinks: ({ commit, state }, payload) =>
    new Promise((resolve) => {
      commit(types.GET_SIDE_BAR_LINKS, payload);
      resolve(state.sidebarLinks);
    }),
  setFilterData: ({ commit }, payload) => commit(types.SET_FILTER_DATA, payload),
  setGlobalValue: ({ commit }, payload) => commit(types.SET_GLOBAL_VALUE, payload),
};

export default {
  state,
  getters,
  mutations,
  actions,
};
