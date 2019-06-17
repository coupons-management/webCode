import { mapGetters } from 'vuex';
import couponTable from '../spiderCoupon/spiderCoupon.vue';
export default {
  components: { couponTable },
  name: 'spiderMaintain',
  data() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    return {
      time: [start.getTime(), end.getTime()],
      spiderId: '',
      range: '1',
      value6: '',
      radio3: '1',
      spiderSite: '1',
      typeList: [],
      tableData: {
        pageSize: 10,
        pageNumber: 1,
        list: [
          {
            id: '1',
            storeName: '商家1',
            website: 'www.baidu.com',
            logo: 'static/imgs/nike.jpg',
            sitNum: '3',
            sitList: [{ name: '站点1' }, { name: '站点2' }, { name: '站点3' }],
            spiderSitNum: '2',
            spiderSitList: [{ name: '爬虫站1' }, { name: '爬虫站2' }],
            spiderType: 'abc',
            couponNum: '10',
            couponNumTotal: '10',
            createTime: '2019-04-16',
            lastUpdateTime: '2019-04-16',
            lastAddTime: '2019-04-16'
          },
          {
            id: '1',
            storeName: '商家1',
            website: 'www.baidu.com',
            logo: 'static/imgs/nike.jpg',
            sitNum: '3',
            sitList: [{ name: '站点1' }, { name: '站点2' }, { name: '站点3' }],
            spiderSitNum: '2',
            spiderSitList: [{ name: '爬虫站1' }, { name: '爬虫站2' }],
            spiderType: 'abc',
            couponNum: '10',
            couponNumTotal: '12',
            createTime: '2019-04-16',
            lastUpdateTime: '2019-04-16',
            lastAddTime: '2019-04-16'
          },
          {
            id: '1',
            storeName: '商家1',
            website: 'www.baidu.com',
            logo: 'static/imgs/nike.jpg',
            sitNum: '3',
            sitList: [{ name: '站点1' }, { name: '站点2' }, { name: '站点3' }],
            spiderSitNum: '2',
            spiderSitList: [{ name: '爬虫站1' }, { name: '爬虫站2' }],
            spiderType: 'abc',
            couponNum: '10',
            couponNumTotal: '14',
            createTime: '2019-04-16',
            lastUpdateTime: '2019-04-16',
            lastAddTime: '2019-04-16'
          }
        ]
      },
      editorData: {
        logoUrl: ''
      },
      checkCouponsBox: false,
      editorStoreBox: false,
      currPageInfo: {
        pageName: 'spiderStore',
        storeId: ''
      },
      fileUrl: sessionStorage.axiosLocalUrl + 'site-manager/uploadFile'
    };
  },
  computed: {
    ...mapGetters(['siteId', 'countryList', 'couponTypeList', 'spiderList'])
  },
  mounted() {
    this.getData();
    this.getCatygory();
  },
  methods: {
    getCatygory() {
      this.$sendData('post', '/showSiteTwo/getStoreSort', { outId: this.siteId }, (data, all) => {
        this.typeList = data;
      });
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
      this.currPageInfo = item;
      this.checkCouponsBox = true;
    },
    storeChange() {},
    editorSubmit() {},
    handleSelectChange() {
      this.$nextTrick(() => {
        this.getData();
      });
    },
    getData() {
      this.$sendData(
        'post',
        'storeOperation/getPageInSpider',
        {
          beginTime: this.time[0] || '',
          endTime: this.time[1] || '',
          spiderId: this.spiderId,
          range: this.range,
          pageSize: this.tableData.pageSize,
          pageNumber: this.tableData.pageNumber
        },
        (data, all) => {
          this.tableData = data;
        }
      );
    },
    handleAvatarSuccess(e) {
      this.editorData.logoUrl = 'http://39.98.53.2:3332/backend_scrapy_site/' + e.data;
    }
  }
};
