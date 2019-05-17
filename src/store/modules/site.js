const site = {
  state: {
    siteId:false,
    spiderList:[],
    couponTypeList:[],
    expiryList:[]
  },
  mutations: {
    setSiteId: (state, id) => {
      state.siteId = id
    },
    setSpiderList: (state, list) => {
      console.log(list);
      state.spiderList = list
    },
    setCouponTypeList: (state, list) => {
      state.couponTypeList = list
    },
    setExpiryList: (state, list) => {
      state.expiryList = list
    }
  },
  actions: {
    setNavSiteId: ({ commit },id) => {
      commit('setSiteId',id)
    },
    setSpider: ({ commit },list) => {
      commit('setSpiderList',list)
    },
    setCouponType: ({ commit },list) => {
      commit('setCouponTypeList',list)
    },
    setExpiry: ({ commit },list) => {
      commit('setExpiryList',list)
    }
  }
};
export default site
