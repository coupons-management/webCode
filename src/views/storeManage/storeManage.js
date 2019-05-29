export default {
  name: 'storeManage',
  data(){
    return {
      searchForm:{
        choosePerson:'0',
        chooseSite:'0'
      },
      activeName:'apportion',
      tableData:{
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
      }
    }
  },
  mounted(){

  },
  methods:{
    editorStore(data){

    },
    handleClick(){//切换查看table

    },
    storeChange(){

    }
  }
}
