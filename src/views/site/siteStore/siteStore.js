import couponTable from '../siteCoupon/siteCoupon.vue'
export default {
  components:{couponTable},
  name: 'sitStore',
  data(){
    return {
      searchForm: {
        keyWord: '',
        country: '0',
        spiderType: '0',
        tags:'0',
        storeType:'1',
        couponNum:''
      },
      tableData: {
        pageSize:10,
        pageTotal:3,
        page:1,
        tableList:[
          {id: '1', storeName: '商家1', website: 'https://www.baidu.com', logo: 'static/imgs/nike.jpg', sitNum: '3',sitList:[{name:'站点1'},{name:'站点2'},{name:'站点3'}],
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
      tagList:[
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      fileUrl:localStorage.axiosLocalUrl+'site-manager/uploadFile'
    }
  },
  mounted(){

  },
  methods:{
    searchSubmit(){

    },
    statInfo(){//报表

    },
    editorInfo(data){//编辑
      this.editorStoreBox = true;
    },
    checkCoupons(){//查看优惠券
      this.checkCouponsBox = true;
    },
    addCoupon(){//新增优惠券

    },
    deleteStore(){//删除优惠券

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
