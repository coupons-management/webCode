import { mapGetters } from 'vuex'

export default {
  name: 'storeCheck',
  data(){
    return {
      searchForm: {//查询条件
        search: '',
        spiderId:0,
        country: '',
        validCouponsCount:'',
        pageNumber:1,
        pageSize:10,
        siteId:1,
        approval:'',
        isComplete:''
      },
      siteList:[],
      tableData: {},//商家列表table数据
      editorData:{},
      editorStoreBox:false,//商家修改界面开关
      currPageInfo:{
        pageName:'spiderStore',
        storeId:''
      },
      fileUrl:sessionStorage.axiosLocalUrl+'file/upload',
      isBatch:false,//批量操作按钮
      storeList:[]//勾选数组
    }
  },
  mounted(){
    this.initData(['spiderSite','country','isComplete','approval']);
    this.siteList = JSON.parse(localStorage.siteList);
    this.getTableList();
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
    batchAdd(){//打开 批量操作
      this.isBatch = true;
    },
    batchCancel(){//取消 批量操作
      this.isBatch = false;
    },
    searchSubmit(){//查询按钮
      this.searchForm.pageNumber = 1;
      this.getTableList();
    },
    editorInfo(data){//编辑
      this.editorData = JSON.parse(JSON.stringify(data));
      this.editorStoreBox = true;
    },
    batchSubmit(){//批量加入站点
      let _this = this,dataList = [];
      for(let i of _this.storeList){
        dataList.push({siteId:_this.searchForm.siteId,storeId:i.id});
      }
      _this.batchAddSite(dataList);
    },
    joinSite(data){//加入站点
      this.singleAddSite(data.id);
    },
    batchPass(){//批量审核
      let _this = this,validList = [],invalidList = [],currList = JSON.parse(JSON.stringify(_this.tableData.list));
      for(let j = 0;j<currList.length; j++){
        for(let i of _this.storeList){
          if(currList[j].id == i.id){
            validList.push(i.id);
            currList.splice(j,1);
          }
        }
      }
      for(let k of currList){
        invalidList.push(k.id);
      }
      _this.batchApproval(validList,invalidList);
    },
    pass(data,type){//审核 1 合格  2 不合格
      this.singleApproval(data.id,type);
    },
    storeChange(e){//分页
      this.searchForm.pageNumber = e;
      this.getTableList();
    },
    editorSubmit(){//编辑提交
      let _this = this;
      _this.$sendData('post','store/edit',_this.editorData,(data,all)=>{//爬虫商家编辑提交
        _this.getTableList();
        _this.$message({type: 'success',message: '修改成功!'});
        _this.editorStoreBox = false;
      });
    },
    getTableList(){//爬虫商家列表
      let _this = this;
      _this.$sendData('post','store/getPage',_this.searchForm,(data,all)=>{
        _this.tableData = data;
      });
    },
    singleApproval(storeId,approval){//单个审核
      let _this = this;
      _this.$sendData('post','store/verify',{id:storeId,approval:approval},(data,all)=>{
        _this.getTableList();
        _this.$message({type: 'success',message: '审核成功!'});
      });
    },
    batchApproval(validList,invalidList){//批量审核
      let _this = this;
      _this.$sendData('post','store/verifyBatch',{validList:validList,invalidList:invalidList},(data,all)=>{
        _this.getTableList();
        _this.isBatch = false;
        _this.$message({type: 'success',message: '批量审核成功!'});
      });
    },
    singleAddSite(storeId){//单个加入站点
      let _this = this;
      _this.$sendData('post','showSite/addStoreToSite',{siteId:_this.searchForm.siteId,storeId:storeId},(data,all)=>{
        _this.$message({type: 'success',message: '加入成功!'});
      });
    },
    batchAddSite(dataList){//批量加入站点
      let _this = this;
      _this.$sendData('post','showSite/addStoreToSiteBatch',dataList,(data,all)=>{
        _this.isBatch = false;
        _this.$message({type: 'success',message: '批量加入成功!'});
      });
    },
    handleAvatarSuccess(e){
      this.editorData.logo = 'http://'+e.data;
      this.editorData.logoUrl = 'http://'+e.data;
    }
  },
  computed: {
    ...mapGetters([
    'spiderList','countryList','approvalList','isCompleteList'
  ])
}
}
