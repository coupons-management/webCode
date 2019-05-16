import couponTable from '../spiderCoupon/spiderCoupon.vue'
export default {
  components:{couponTable},
  name: 'spiderStore',
  data(){
    return {
      searchForm: {
        keyWord: '',
        country: '0',
        spiderType: '0',
        couponNum:'',
        spiderSite:'1'
      },
      tableData: {
        pageSize:10,
        pageTotal:3,
        page:1,
        tableList:[
          {id: '1', storeName: '商家1', website: 'www.baidu.com', logo: 'static/imgs/nike.jpg', sitNum: '3',sitList:[{name:'站点1'},{name:'站点2'},{name:'站点3'}],
            spiderSitNum: '2',spiderSitList:[{name:'爬虫站1'},{name:'爬虫站2'}],spiderType: 'abc', couponNum: '10',couponNumTotal: '10', createTime: '2019-04-16',
            lastUpdateTime: '2019-04-16', lastAddTime: '2019-04-16'},
          {id: '1', storeName: '商家1', website: 'www.baidu.com', logo: 'static/imgs/nike.jpg', sitNum: '3',sitList:[{name:'站点1'},{name:'站点2'},{name:'站点3'}],
            spiderSitNum: '2',spiderSitList:[{name:'爬虫站1'},{name:'爬虫站2'}],spiderType: 'abc', couponNum: '10',couponNumTotal: '12', createTime: '2019-04-16',
            lastUpdateTime: '2019-04-16', lastAddTime: '2019-04-16'},
          {id: '1', storeName: '商家1', website: 'www.baidu.com', logo: 'static/imgs/nike.jpg', sitNum: '3',sitList:[{name:'站点1'},{name:'站点2'},{name:'站点3'}],
            spiderSitNum: '2',spiderSitList:[{name:'爬虫站1'},{name:'爬虫站2'}],spiderType: 'abc', couponNum: '10',couponNumTotal: '14', createTime: '2019-04-16',
            lastUpdateTime: '2019-04-16', lastAddTime: '2019-04-16'}
        ]
      },
      editorData:{
        logoUrl:''
      },
      checkCouponsBox:false,
      editorStoreBox:false,
      currPageInfo:{
        pageName:'spiderStore',
        storeId:''
      },
      fileUrl:localStorage.axiosLocalUrl+'site-manager/uploadFile'
    }
  },
  mounted(){

  },
  methods:{
    searchSubmit(){

    },
    editorInfo(data){
      this.editorStoreBox = true;
    },
    checkCoupons(){
      this.checkCouponsBox = true;
    },
    storeChange(){

    },
    editorSubmit(){

    },
    handleAvatarSuccess(e){
      this.editorData.logoUrl = 'http://39.98.53.2:3332/backend_scrapy_site/'+e.data;
    }
  }
}
