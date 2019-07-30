export default {
  name: 'storeManage',
  data(){
    return {
      searchForm:{
        userId:'',
        site:'',
        rangeStart:'',
        rangeEnd:'',
        typeId:'',
        search:'',
        pageNumber: 1,
        pageSize: 10
      },
      activeName:'apportion',
      tableData:{},
      tableData2:{},
      siteList:JSON.parse(localStorage.siteList),
      staffList:[],
      typeList:[]
    }
  },
  mounted(){
    this.searchForm.site = this.siteList[0].id;
    this.getCatygory();
    this.getStaffList();
  },
  methods:{
    searchSubmit(){
      this.searchForm.pageNumber = 1;
      if(this.activeName == 'apportion'){
        this.getUnStore();
      }else{
        this.getStore();
      }
    },
    editorStore(data,type){
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'user/assignOrCancel', {
        "userId":_this.searchForm.choosePerson,
        "storeId":data.id,
        "operation":type
      }).then(function(response) {
        if (response.data.code == 0) {
          _this.searchForm.pageNumber = 1;
          _this.getUnStore();
          _this.getStore();
        }
      });
    },
    handleClick(){//切换查看table

    },
    storeChange(e){
      this.searchForm.pageNumber = e;
      if(this.activeName == 'apportion'){
        this.getUnStore();
      }else{
        this.getStore();
      }
    },
    getCatygory() {
      this.$sendData('post', 'showSiteType/getList', {}, (data, all) => {
        this.typeList = data;
      });
    },
    getStaffList(){
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'user/getPage', {pageNumber: 1,pageSize: 100}).then(function(response) {
        if (response.data.code == 0) {
          _this.staffList = response.data.data.list;
          _this.searchForm.userId = _this.staffList[0].id;
          _this.getStore();
          _this.getUnStore();
        }
      });
    },
    getUnStore(){//未分配
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'store/availableAssign', _this.searchForm).then(function(response) {
        if (response.data.code == 0) {
          _this.tableData = response.data.data;
        }
      });
    },
    getStore(){//已分配
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'user/stores', _this.searchForm).then(function(response) {
        if (response.data.code == 0) {
          _this.tableData2 = response.data.data;
        }
      });
    }
  },
  watch:{
    /*'searchForm.choosePerson':function(){
      this.getUnStore();
      this.getStore();
    },
    'searchForm.chooseSite':function(){
      this.getUnStore();
      this.getStore();
    }*/
  }
}
