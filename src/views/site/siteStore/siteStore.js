import couponTable from './couponTable.vue';
import { mapGetters } from 'vuex';

export default {
  components: { couponTable },
  name: 'sitStore',
  data() {
    return {
      searchForm: {
        outId: '',
        country: '',
        typeId: '',
        mark: '',
        range: '',
        startTime: '',
        endTime: '',
        search: '',
        timer: '',
        pageSize: 10,
        pageNumber: 1,
        storeType: ''
      },
      tableData: {
        pageSize: 10,
        totalPage: 0,
        page: 1,
        list: []
      },
      editorData: {
        tags: [],
        logo: ''
      },
      addCouponBox: false,
      couponItem: {},
      reportBox: false,
      reportData: {
        pageSize: 10,
        totalPage: 0,
        page: 1,
        list: []
      },
      checkCouponsBox: false,
      addStoreBox: false,
      editorStoreBox: false,
      currPageInfo: {
        pageName: 'siteStore',
        storeId: ''
      },
      typeList: [],
      tagList: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      fileUrl: sessionStorage.axiosLocalUrl + 'site-manager/uploadFile',
      sortCouponBox: false,
      couponSelected: []
    };
  },
  mounted() {
    //this.getStoreCate();
    this.initData(['country', 'couponType']);
    this.searchForm.outId = this.siteId;
    this.getCatygory();
    this.getTableData();

    this.$dragging.$on('dragged', ({ value }) => {
      this.couponSelected = value.list;
    });
  },
  methods: {
    getCatygory() {
      this.$sendData('post', 'showSiteTwo/getStoreSort', { outId: this.siteId }, (data, all) => {
        this.typeList = data;
      });
    },
    searchSubmit() {
      // console.log(this.searchForm);
      this.searchForm.pageNumber = 1;
      this.getTableData();
    },
    statInfo(item) {
      //报表
      this.reportData.outId = this.siteId;
      this.getReport();
      this.reportBox = true;
    },
    addStore() {
      //添加商家
      console.log('add store');
      this.editorData = {
        tags: []
      };
      this.addStoreBox = true;
    },
    editorInfo(data) {
      //编辑
      this.editorData = this.deepClone(data);
      this.$sendData('post', 'showSiteTwo/getSiteStroreById', { id: data.id }, (data, all) => {
        this.editorData = {
          ...this.editorData,
          ...data
        };
        this.editorStoreBox = true;
      });
    },
    checkCoupons(item) {
      //查看优惠券
      this.currPageInfo = item;
      this.checkCouponsBox = true;
      this.couponSelectedDefault = [];
      this.couponSelected = [];
      this.getSortCoupon(item.storeId);
    },
    addCoupon(item) {
      //新增优惠券
      this.couponItem = {
        storeId: item.storeId,
        siteId: this.siteId
      };
      this.addCouponBox = true;
    },
    deleteStore(item) {
      //删除
      this.$sendData('post', 'showSiteTwo/deleteSiteStore', { siteId: ~~this.siteId, storeId: item.storeId }, (data, all) => {
        this.getTableData();
        this.$message({ type: 'success', message: '操作成功！' });
      });
    },
    storeChange(e) {
      this.searchForm.pageNumber = e;
      this.getTableData();
    },
    addSubmit() {
      //添加商家提交
      // this.$sendData('post', 'showSiteTwo/deleteSiteStore', this.editorData, (data, all) => {
      //   this.getTableData();
      //   this.$message({ type: 'success', message: '添加成功！' });
      // });
    },
    editorSubmit() {
      //编辑商家提交
      this.$sendData('post', 'showSiteTwo/updateSiteStore', this.editorData, (data, all) => {
        this.getTableData();
        this.editorStoreBox = false;
        this.$message({ type: 'success', message: '编辑成功！' });
      });
    },
    handleAvatarSuccess(e) {
      this.editorData.logo = 'http://39.98.53.2:3332/backend_scrapy_site/' + e.data;
    },
    getTableData() {
      //获取table表
      let _this = this;
      if (_this.searchForm.timer) {
        _this.searchForm.startTime = _this.changeDate(_this.searchForm.timer[0]);
        _this.searchForm.endTime = _this.changeDate(_this.searchForm.timer[1]);
      }
      _this.$sendData('post', 'showSiteTwo/getTwoList', _this.searchForm, (data, all) => {
        // console.log(data);
        this.tableData = data;
      });
    },
    getStoreCate() {
      //获取商家分类
      let _this = this;
      _this.$sendData('post', 'showSiteTwo/getStoreSort', { siteId: _this.siteId }, (data, all) => {});
    },
    couponSubmit() {
      this.$sendData('post', 'coupon/create', this.couponItem, (data, all) => {
        this.addCouponBox = false;
      });
    },
    reportChange(e) {
      this.reportData.pageNumber = e;
      this.getReport();
    },
    getReport() {
      this.$sendData('post', '', this.reportData, (data, all) => {
        this.reportData = data;
      });
    },
    /* 获取已排序的优惠券 */
    getSortCoupon(storeId) {
      this.$sendData('post', 'showSiteCoupon/getCouponListWithSort', { storeId }, (data, all) => {
        this.couponSelectedDefault = data;
        this.couponSelected = data;
      });
    },

    /* 删除表中的优惠券 */
    deleteSelectedCoupon(item) {
      this.couponSelected = this.couponSelected.filter(i => i.id !== item.id);
    },
    /* 选择表中的优惠券 */
    handleCouponTableSelectChange(val) {
      this.couponSelected = val;
    },
    /* 优惠券排序弹窗 */
    handleSortCoupon() {
      console.log(this.couponSelected);
      if (this.couponSelected && this.couponSelected.length > 0) {
        this.sortCouponBox = true;
      } else {
        this.$message({ type: 'error', message: '请选择排序的优惠券！' });
      }
    },
    /* 提交排序 */
    submitCouponOrder() {
      console.log(this.couponSelected);
      this.$sendData('post', 'coupon/updateSort', this.couponSelected.map((i, j) => ({ couponId: i.id, sort: j + 1 })), (data, all) => {
        this.$message({ type: 'error', message: '排序成功！' });
        this.couponSelected = this.couponSelectedDefault;
        this.sortCouponBox = false;
      });
    },
    /* 取消排序 */
    cancelCouponOrder() {
      this.couponSelected = this.couponSelectedDefault;
      this.sortCouponBox = false;
    }
  },
  computed: {
    ...mapGetters(['siteId', 'countryList', 'couponTypeList'])
  }
};
