const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  loginData: state => state.user.loginData,


  siteId: state => state.site.siteId,
  spiderList: state => state.site.spiderList,
  couponTypeList: state => state.site.couponTypeList,
  countryList: state => state.site.countryList,
  typeList: state => state.site.typeList,
  expiryList: state => state.site.expiryList
}
export default getters
