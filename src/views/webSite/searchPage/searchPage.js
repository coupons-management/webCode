export default {
  name: 'homePage',
  data() {
    return {
      storeList: [],
      couponList: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.getStore();
      this.getCoupon();
    },
    getStore() {
      this.$sendData('post', 'officialWebsite/getTopStoreList', { name: this.$route.query.search, siteId: /*this.siteId || */ 2 }, (data, all) => {
        this.storeList = data;
      });
    },
    getCoupon() {
      this.$sendData('post', 'officialWebsite/getTopCouponList', { name: this.$route.query.search, outSiteId: /*this.siteId || */ 2 }, (data, all) => {
        this.couponList = data;
      });
    },
    goCoupon(item) {
      window.open(item.link);
    },
    goStore(item) {
      this.$router.push(`/websiteFir/detailSecond/${item.storeId}`);
    }
  },
  watch: {
    $route(to, from) {
      this.getData();
    }
  }
};
