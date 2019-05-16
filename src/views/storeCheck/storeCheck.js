export default {
  name: 'storeCheck',
  data(){
    return {
      searchForm: {//查询条件
        keyWord: '',
        country: '0',
        spiderType: '0',
        couponNum:''
      },
      tableData: {//商家列表table数据
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
      editorData:{//修改页面内容
        logoUrl:''
      },
      editorStoreBox:false,//商家修改界面开关
      currPageInfo:{
        pageName:'spiderStore',
        storeId:''
      },
      fileUrl:localStorage.axiosLocalUrl+'site-manager/uploadFile',//图片上传地址
      isBatch:false,//批量操作按钮
      storeList:[]//勾选数组
    }
  },
  mounted(){

  },
  methods:{
    checkRow(row, event, column){//点击一行 进行勾选
      if(this.isBatch){
        this.$refs.storeListTable.toggleRowSelection(row);
      }
    },
    selectStore(val){//勾选后获得的勾选数组
      this.storeList = val;
    },
    batchAdd(){//批量添加
      this.isBatch = true;
    },
    batchCancel(){//批量添加 取消
      this.isBatch = false;
    },
    batchSubmit(){//批量提交
      this.isBatch = false;
    },
    batchPass(){//批量合格
      this.isBatch = false;
    },
    searchSubmit(){//查询按钮

    },
    editorInfo(data){//编辑
      this.editorStoreBox = true;
    },
    joinSite(){//加入站点

    },
    pass(){//合格

    },
    noPass(){//不合格

    },
    storeChange(){//分页

    },
    editorSubmit(){//编辑提交

    },
    handleAvatarSuccess(e){
      this.editorData.logoUrl = 'http://39.98.53.2:3332/backend_scrapy_site/'+e.data;
    }
  }
}
