import couponTable from '../siteCoupon/siteCoupon.vue';
import { mapGetters } from 'vuex';

export default {
  components: { couponTable },
  name: 'sitStore',
  data() {
    return {
      searchForm: {
        siteId: '',
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
      fileUrl: sessionStorage.axiosLocalUrl + 'site-manager/uploadFile'
    };
  },
  mounted() {
    //this.getStoreCate();
    this.initData(['country', 'couponType']);
    this.searchForm.siteId = this.siteId;
    this.getCatygory();
    this.getTableData();
  },
  methods: {
    getCatygory() {
      this.$sendData('post', '/showSiteTwo/getStoreSort', { outId: this.siteId }, (data, all) => {
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
      this.reportData.outId = item.outSiteId;
      this.getReport();
      this.reportBox = true;
    },
    editorInfo(data) {
      //编辑
      this.editorData = this.deepClone(data);
      this.editorStoreBox = true;
    },
    checkCoupons(item) {
      //查看优惠券
      this.currPageInfo = item.outSiteId;
      this.checkCouponsBox = true;
    },
    addCoupon() {
      //新增优惠券
      this.couponItem = {};
      this.addCouponBox = true;
    },
    deleteStore(item) {
      //删除
      this.$sendData('post', 'showSiteCoupon/delete', { outId: item.outSiteId }, (data, all) => {
        this.getTableData();
        this.$message({ type: 'success', message: '操作成功！' });
      });
    },
    storeChange(e) {
      this.searchForm.pageNumber = e;
      this.getTableData();
    },
    editorSubmit() {},
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
      this.$sendData('post', '', this.couponItem, (data, all) => {
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
    }
  },
  computed: {
    ...mapGetters(['siteId', 'countryList', 'couponTypeList'])
  }
};
