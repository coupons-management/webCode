export default {
  name: 'homePage',
  data() {
    return {
      couponsData: {
        pageNumber: 1,
        pageSize: 10
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$sendData(
        'post',
        'officialWebsite/getStoreCategoryCouponList',
        { outSiteId: /* this.siteId || */ 1, id: this.$route.params.id, pageNumber: this.couponsData.pageNumber, pageSize: this.couponsData.pageSize },
        (data, all) => {
          this.couponsData = data;
        }
      );
    },
    open(item) {
      window.open(item.link);
    }
  }
};
