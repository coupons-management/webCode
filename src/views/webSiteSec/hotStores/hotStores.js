export default {
  name: 'homePage',
  data() {
    return {
      couponList: [],
      rightStoreList: [],
      activeList: [],
      expiredList: [],
      typeList: [{ name: 'ALL', value: '', state: true }, { name: 'CODE', value: 'CODE3', state: false }, { name: 'DEAL', value: 'DEAL3', state: false }],
      verified: true,
      type: ''
    };
  },
  mounted() {
    this.getStoreData();
    this.getTopCoupon();
    this.getCouponByType();
  },
  methods: {
    toggleNav(data) {
      for (let i of this.typeList) {
        i.state = false;
      }
      data.state = true;
      this.type = data.value;
      this.getCouponByType();
    },
    getCouponByType() {
      this.$sendData('post', 'officialWebsite/getStoreCouponList', { outSiteId: /* this.siteId || */ 1, storeUrl: this.$route.params.id, type: this.type }, (data, all) => {
        this.activeList = data;
      });
    },
    getExpiredCouponByType() {
      this.$sendData('post', 'officialWebsite/getStoreExpCouponList', { outSiteId: /* this.siteId || */ 1, storeUrl: this.$route.params.id, type: this.type }, (data, all) => {
        this.expiredList = data;
      });
    },
    getStoreData() {
      this.$sendData('post', 'officialWebsite/getTopStoreList', { siteId: /* this.siteId || */ 1 }, (data, all) => {
        this.rightStoreList = data;
      });
    },
    getTopCoupon() {
      this.$sendData('post', 'officialWebsite/getTopCouponList', { outSiteId: /* this.siteId || */ 1 }, (data, all) => {
        this.couponList = data;
      });
    },
    goCoupon(item) {
      window.open(item.link);
    },
    goStore(item) {
      console.log(item);
      this.$router.push(`/websiteSec/hotStores/${item.webSite}`);
    }
  }
};
