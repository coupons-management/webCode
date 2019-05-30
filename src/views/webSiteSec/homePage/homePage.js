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
      this.$sendData('post', 'storeAudit/getTopHotStroreList', { outId: this.siteId || 1 }, (data, all) => {
        this.storeList = data;
      });
    },
    getCoupon() {
      this.$sendData('post', 'storeAudit/getTopAdviseCouponList', { outSiteId: this.siteId || 1 }, (data, all) => {
        this.couponList = data;
      });
    },
    getCategory() {
      this.$sendData('post', 'officialWebsite/getCategoriesList', { outSiteId: this.siteId || 1 }, (data, all) => {
        this.categoryList = data;
      });
    }
  }
};
