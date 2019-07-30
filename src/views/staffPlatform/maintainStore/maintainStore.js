import couponTable from '../couponInfo/couponInfo.vue';
import { mapGetters } from 'vuex';

export default {
  components: { couponTable },
  name: 'siteMaintain',
  data() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    return {
      searchForm: {
        siteId: 1,
        country: '',
        typeId: '',
        mark: '',
        range: '1',
        startTime: '',
        endTime: '',
        search: '',
        timer: [start, end],
        pageSize: 10,
        pageNumber: 1
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

      siteList:JSON.parse(localStorage.siteList),
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
      fileUrl: sessionStorage.axiosLocalUrl + 'site-manager/uploadFile'
    };
  },
  mounted() {
    //this.getStoreCate();
    this.initData(['country', 'couponType']);
    //this.searchForm.siteId = this.siteId;
    this.getCatygory();
    this.getTableData();
  },
  methods: {
    getCatygory() {
      this.$sendData('post', 'showSiteType/getList', { siteId: this.searchForm.siteId }, (data, all) => {
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
      this.reportData.siteId = this.siteId;
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
      this.editorStoreBox = true;
      // this.$sendData('post', 'showSiteTwo/getSiteStroreById', { id: data.id }, (data, all) => {
      //   this.editorData = {
      //     ...this.editorData,
      //     ...data
      //   };
      //   this.editorStoreBox = true;
      // });
    },
    checkCoupons(item) {
      //查看优惠券
      this.currPageInfo = item;
      this.checkCouponsBox = true;
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
      // this.$sendData('post', 'showSiteTwo/updateSiteStore', this.editorData, (data, all) => {
      //   this.getTableData();
      //   this.editorStoreBox = false;
      //   this.$message({ type: 'success', message: '编辑成功！' });
      // });

      let _this = this;
      _this.$sendData('post', 'store/edit', _this.editorData, (data, all) => {
        //爬虫商家编辑提交
        _this.getTableData();
        _this.$message({ type: 'success', message: '修改成功!' });
        _this.editorStoreBox = false;
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
      _this.$sendData('post', 'storeOperation/getPageInSite', _this.searchForm, (data, all) => {
        // console.log(data);
        this.tableData = data;
      });
    },
    // getStoreCate() {
    //   //获取商家分类
    //   let _this = this;
    //   _this.$sendData('post', 'showSiteType/getList', { siteId: _this.siteId }, (data, all) => {
    //     this.typeList = data;
    //   });
    // },
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
    }
  },
  watch:{
    'searchForm.siteId':function(e){
      console.log(e);
      this.searchForm.pageNumber = 1;
      this.getTableData();
    }
  },
  computed: {
    ...mapGetters(['siteId', 'countryList', 'couponTypeList'])
  }
};
