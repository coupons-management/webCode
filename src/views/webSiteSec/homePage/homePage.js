export default {
  name: 'homePage',
  data() {
    return {
      storeList: [],
      couponList: [],
      categoryList: []
    };
  },
  mounted() {
    this.siteId = this.$route.query.id;
    this.getData();
  },
  methods: {
    getData() {
      this.getStore();
      this.getCoupon();
      this.getCategory();
    },
    getStore() {
      if (this.$route.query.search) {
        this.$sendData('post', 'officialWebsite/getTopStoreList', { name: this.$route.query.search, siteId: /* this.siteId || */ 1 }, (data, all) => {
          this.storeList = data;
        });
      } else {
        this.$sendData('post', 'officialWebsite/getTopStoreList', { siteId: /* this.siteId || */ 1 }, (data, all) => {
          this.storeList = data;
        });
      }
    },
    getCoupon() {
      if (this.$route.query.search) {
        this.$sendData('post', 'officialWebsite/getTopCouponList', { name: this.$route.query.search, outSiteId: /* this.siteId || */ 1 }, (data, all) => {
          this.couponList = data;
        });
      } else {
        this.$sendData('post', 'officialWebsite/getTopCouponList', { outSiteId: /* this.siteId || */ 1 }, (data, all) => {
          this.couponList = data;
        });
      }
    },
    getCategory() {
      if (this.$route.query.search) {
        this.$sendData('post', 'officialWebsite/getCategoriesList', { outSiteId: /* this.siteId || */ 1 }, (data, all) => {
          this.categoryList = data.splice(0, 20);
        });
      } else {
        this.$sendData('post', 'officialWebsite/getCategoriesList', { name: this.$route.query.search, outSiteId: /* this.siteId || */ 1 }, (data, all) => {
          this.categoryList = data.splice(0, 20);
        });
      }
    },
    goUrl(url) {
      window.open(url);
    },
    goStore(item) {
      this.$router.push(`/websiteSec/hotStores/${item.webSite}`);
    },
    goCategory(item) {
      this.$router.push(`/websiteSec/hotClassify/1`);
    }
  },
  watch: {
    $route(to, from) {
      this.getData();
    }
  }
};
