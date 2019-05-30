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
      this.$sendData('post', 'officialWebsite/getTopStoreList', { siteId: /* this.siteId || */ 1 }, (data, all) => {
        this.storeList = data;
      });
    },
    getCoupon() {
      this.$sendData('post', 'officialWebsite/getTopCouponList', { outSiteId: /* this.siteId || */ 1 }, (data, all) => {
        this.couponList = data;
      });
    },
    getCategory() {
      this.$sendData('post', 'officialWebsite/getCategoriesList', { outSiteId: /* this.siteId || */ 1 }, (data, all) => {
        this.categoryList = data.splice(0, 20);
      });
    }
  }
};
