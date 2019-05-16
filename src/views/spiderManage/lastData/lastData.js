export default {
  name: 'lastData',
  data(){
    return {
      spiderSite:'0',
      activeName:'storePage',
      couponSearch: {//提交给后台的 查询条件
        title: '',
        type: '0',
        isPast: '0'
      },
      couponData: {//从后台获取的数组
        page:1,
        pageTotal:3,
        pageSize:10,
        couponList:[
          {id: '1', storeName: '商家1', couponName: '优惠券1', code: 'code', describe: '描述1', isPast: '2', pastTime: '2019-04-16',createTime:'2019-04-16'},
          {id: '2', storeName: '商家2', couponName: '优惠券2', code: 'deal', describe: '描述2', isPast: '1', pastTime: '2019-04-16',createTime:'2019-04-16'},
          {id: '3', storeName: '商家3', couponName: '优惠券3', code: 'code', describe: '描述3', isPast: '2', pastTime: '2019-04-16',createTime:'2019-04-16'}
        ]
      },
      storeSearch: {
        keyWord: '',
        country: '0',
        spiderType: '0',
        couponNum:''
      },
      storeData: {
        pageSize:10,
        pageTotal:3,
        page:1,
        storeList:[
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
      }
    }
  },
  mounted(){

  },
  methods:{
    handleClick(){

    },
    couponSubmit(){

    },
    storeSubmit(){

    },
    storeChange(){

    },
    couponChange(){

    }
  }
}
