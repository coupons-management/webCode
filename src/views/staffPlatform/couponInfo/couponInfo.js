import { mapGetters } from 'vuex';

export default {
  name: 'spiderCoupon',
  props: ['currPageInfo'],
  data() {
    return {
      searchForm: {
        siteId: 1,
        search: '',
        couponType: '',
        expiry: 0,
        cteateType: '',
        pageSize: 10,
        pageNumber: 1,
        state: ''
      },
      siteList:JSON.parse(localStorage.siteList),
      tableData: {}, //从后台获取的数组
      editorCouponsBox: false,
      editorData: {}
    };
  },
  mounted() {
    //this.searchForm.siteId = this.siteId;
    if (this.currPageInfo) {
      //查询商家下的优惠券
      this.searchForm.storeId = this.currPageInfo.storeId;
    } else {
      this.initData(['dataSource', 'couponType', 'expiry', 'approval']);
    }
    this.getTableData();
  },
  methods: {
    searchSubmit() {
      //查询提交
      this.searchForm.pageNumber = 1;
      this.getTableData();
    },
    couponChange(e) {
      //table分页
      this.searchForm.pageNumber = e;
      this.getTableData();
    },
    isPassFun(data, type) {
      //单个审核
      this.editorData = data;
      this.editorData.isPass = type;
      this.approvalSend();
    },
    editorInfo(data) {
      //编辑
      this.editorData = this.deepClone(data);
      this.editorCouponsBox = true;
    },
    deleteCoupon() {
      //删除优惠券
      let _this = this;
      _this.$sendData('post', 'showSiteCoupon/delete', _this.editorData, (data, all) => {
        _this.getTableData();
        _this.$message({ type: 'success', message: '操作成功！' });
        _this.editorCouponsBox = false;
      });
    },
    editorSubmit() {
      //提交修改优惠券
      this.editorData.isPass = 1;
      this.approvalSend();
    },
    approvalSend() {
      //编辑提交
      let _this = this;
      _this.$sendData('post', 'showSiteCoupon/edit', _this.editorData, (sendData, all) => {
        _this.getTableData();
        _this.$message({ type: 'success', message: '操作成功！' });
        _this.editorCouponsBox = false;
      });
    },
    getTableData() {
      //获取优惠券列表
      let _this = this;
      _this.$sendData('post', 'showSiteCoupon/getCouponPage', _this.searchForm, (data, all) => {
        _this.tableData = data;
      });
    }
  },
  watch: {
    currPageInfo: function(e) {
      this.searchForm.storeId = this.currPageInfo.storeId;
      this.searchForm.pageNumber = 1;
      this.getTableData();
    }
  },
  computed: {
    ...mapGetters(['couponTypeList', 'approvalList', 'dataSourceList', 'expiryList', 'siteId'])
  }
};
