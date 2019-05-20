const site = {
  state: {
    siteId:false,
    spiderList:[],
    couponTypeList:[],
    expiryList:[],
    countryList:[],
    typeList:[]
  },
  mutations: {
    setSiteId: (state, id) => {
      state.siteId = id
    },
    setTypeList: (state, list) => {
      state.typeList = list
    },
    setCountryList: (state, list) => {
      state.countryList = list
    },
    setSpiderList: (state, list) => {
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
    setType: ({ commit },list) => {
      commit('setTypeList',list)
    },
    setCountry: ({ commit },list) => {
      commit('setCountryList',list)
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
