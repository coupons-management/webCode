export default {
  name: 'homePage',
  data() {
    return {
      siteId: '',
      input2: '',
      storeList: [
        { logo: '', showName: '图片1' },
        { logo: '', showName: '图片2' },
        { logo: '', showName: '图片3' },
        { logo: '', showName: '图片4' },
        { logo: '', showName: '图片5' },
        { logo: '', showName: '图片6' },
        { logo: '', showName: '图片7' },
        { logo: '', showName: '图片8' },
        { logo: '', showName: '图片9' },
        { logo: '', showName: '图片10' }
      ],
      couponList: [
        { img: '', name: '图片1', value: 1 },
        { img: '', name: '图片2', value: 2 },
        { img: '', name: '图片3', value: 3 },
        { img: '', name: '图片4', value: 4 },
        { img: '', name: '图片5', value: 5 },
        { img: '', name: '图片6', value: 5 },
        { img: '', name: '图片7', value: 5 },
        { img: '', name: '图片8', value: 5 }
      ],
      categoryList: [
        { img: '', name: '图片1' },
        { img: '', name: '图片2' },
        { img: '', name: '图片3' },
        { img: '', name: '图片4' },
        { img: '', name: '图片5' },
        { img: '', name: '图片6' },
        { img: '', name: '图片1' },
        { img: '', name: '图片2' },
        { img: '', name: '图片3' },
        { img: '', name: '图片4' },
        { img: '', name: '图片5' },
        { img: '', name: '图片6' },
        { img: '', name: '图片1' },
        { img: '', name: '图片2' },
        { img: '', name: '图片3' },
        { img: '', name: '图片4' },
        { img: '', name: '图片5' },
        { img: '', name: '图片6' }
      ],
      popularList: [
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' },
        { name: 'Amazon' }
      ]
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
      this.getPopular();
    },
    getStore() {
      this.$sendData('post', 'officialWebsite/getTopStoreList', { siteId: /*this.siteId || */ 1 }, (data, all) => {
        this.storeList = data;
      });
    },
    getCoupon() {
      this.$sendData('post', 'officialWebsite/getTopCouponList', { outSiteId: /*this.siteId || */ 1 }, (data, all) => {
        this.couponList = data;
      });
    },
    getCategory() {
      this.$sendData('post', 'officialWebsite/getCategoriesList', { outSiteId: /*this.siteId || */ 1 }, (data, all) => {
        this.categoryList = data;
      });
    },
    getPopular() {
      this.$sendData('post', 'officialWebsite/getPopularStoresList', { outSiteId: /*this.siteId || */ 1 }, (data, all) => {
        this.popularList = data;
      });
    },
    goCoupon(item) {
      window.open(item.link);
    },
    goStore(item) {
      this.$router.push(`/websiteFir/detailSecond/${item.storeId}`);
    },
    goCategory(item) {
      this.$router.push(`/websiteFir/detailFirst/${item.id}?name=${item.name}`);
    },
    search() {
      console.log(this.input2);
      this.$parent.goToPage('searchPage', this.input2);
    }
  },
  watch: {
    $route(to, from) {
      this.getData();
    }
  }
};
