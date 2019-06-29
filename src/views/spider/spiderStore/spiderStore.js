import couponTable from '../spiderCoupon/spiderCoupon.vue';
import { mapGetters } from 'vuex';

export default {
  components: { couponTable },
  name: 'spiderStore',
  data() {
    return {
      searchForm: {
        search: '',
        country: '',
        scrapyType: 0,
        validCouponsCount: '',
        pageNumber: 1,
        pageSize: 10,
        spiderId: 0
      },
      tableData: {},
      editorData: {},
      checkCouponsBox: false,
      editorStoreBox: false,
      currPageInfo: {
        pageName: 'spiderStore',
        storeId: ''
      },
      fileUrl: sessionStorage.axiosLocalUrl + 'file/upload'
    };
  },
  mounted() {
    this.initData(['spiderSite', 'spiderType', 'country']);
    this.searchForm.pageNumber = 1;
    this.getTableList();
  },
  methods: {
    searchSubmit() {
      this.searchForm.pageNumber = 1;
      this.getTableList();
    },
    editorInfo(data) {
      this.editorData = JSON.parse(JSON.stringify(data));
      this.editorStoreBox = true;
    },
    checkCoupons(data) {
      this.currPageInfo = data.id;
      this.checkCouponsBox = true;
    },
    storeChange(e) {
      this.searchForm.pageNumber = e;
      this.getTableList();
    },
    getTableList() {
      let _this = this;
      _this.$sendData('post', 'store/getPage', _this.searchForm, (data, all) => {
        //爬虫商家列表
        _this.tableData = data;
      });
    },
    editorSubmit() {
      let _this = this;
      _this.$sendData('post', 'store/edit', _this.editorData, (data, all) => {
        //爬虫商家编辑提交
        _this.getTableList();
        _this.$message({ type: 'success', message: '修改成功!' });
        _this.editorStoreBox = false;
      });
    },
    handleAvatarSuccess(e) {
      this.editorData.logo = 'http://' + e.data;
      this.editorData.logoUrl = 'http://' + e.data;
    }
  },
  computed: {
    ...mapGetters(['spiderList', 'countryList', 'typeList'])
  }
};
