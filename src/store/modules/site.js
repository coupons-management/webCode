const site = {
  state: {
    siteId:false
  },
  mutations: {
    setSiteId: (state, id) => {
      state.siteId = id
    }
  },
  actions: {
    setNavSiteId: ({ commit },id) => {
      commit('setSiteId',id)
    }
  }
};
export default site
