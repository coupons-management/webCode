import { mapGetters } from 'vuex';
export default {
  name: 'lastData',
  data() {
    return {
      spiderSite: '0',
      activeName: 'storePage',
      couponSearch: {
        //提交给后台的 查询条件
        scrapyId: 0,
        title: '',
        type: '',
        expired: '0'
      },
      couponData: {
        pageNumber: 1,
        pageSize: 10
      },
      storeSearch: {
        search: '',
        country: '',
        scrapyId: 0,
        couponNum: ''
      },
      storeData: {
        pageNumber: 1,
        pageSize: 10
      }
    };
  },
  mounted() {
    this.initData(['spiderSite', 'spiderType', 'couponType', 'country']);
    this.getData();
  },
  methods: {
    getData() {
      console.log(this.activeName);
      if (this.activeName === 'storePage') {
        this.$sendData('post', 'scrapyStore/getListPage', { ...this.storeSearch, pageNumber: this.storeData.pageNumber, pageSize: this.storeData.pageSize }, (data, all) => {
          this.storeData = data;
        });
      }
      if (this.activeName === 'unusualStore') {
        this.$sendData('post', 'scrapyStore/getErrListPage', { ...this.storeSearch, pageNumber: this.storeData.pageNumber, pageSize: this.storeData.pageSize }, (data, all) => {
          this.storeData = data;
        });
      }
      if (this.activeName === 'couponPage') {
        this.$sendData(
          'post',
          'scrapyStore/getScrapyCouponPageList',
          { ...this.couponSearch, pageNumber: this.couponData.pageNumber, pageSize: this.couponData.pageSize },
          (data, all) => {
            this.couponData = data;
          }
        );
      }
      if (this.activeName === 'unusualCoupon') {
        this.$sendData(
          'post',
          'scrapyStore/getErrScrapyCouponPageList',
          { ...this.couponSearch, pageNumber: this.couponData.pageNumber, pageSize: this.couponData.pageSize },
          (data, all) => {
            this.couponData = data;
          }
        );
      }
    },
    handleChangeSpider(val) {
      this.couponSearch.scrapyId = val;
      this.getData();
    },
    handleClick() {
      this.couponData.pageNumber = 1;
      this.storeData.pageNumber = 1;
      this.getData();
    },
    couponSubmit() {},
    storeSubmit() {},
    storeChange() {},
    couponChange() {}
  },
  computed: {
    ...mapGetters(['spiderList', 'typeList', 'couponTypeList', 'countryList'])
  }
};
