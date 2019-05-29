const site = {
  state: {
    siteId:false,
    spiderList:[],
    couponTypeList:[],
    expiryList:[],
    countryList:[],
    isCompleteList:[],
    approvalList:[],
    dataSourceList:[],
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
    },
    setIsCompleteList: (state, list) => {
      state.isCompleteList = list
    },
    setApprovalList: (state, list) => {
      state.approvalList = list
    },
    setDataSourceList: (state, list) => {
      state.dataSourceList = list
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
    },
    setIsComplete: ({ commit },list) => {
      commit('setIsCompleteList',list)
    },
    setApproval: ({ commit },list) => {
      commit('setApprovalList',list)
    },
    setDataSource: ({ commit },list) => {
      commit('setDataSourceList',list)
    }
  }
};
export default site
