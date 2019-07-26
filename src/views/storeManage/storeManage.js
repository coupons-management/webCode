export default {
  name: 'storeManage',
  data(){
    return {
      searchForm:{
        choosePerson:'',
        chooseSite:''
      },
      activeName:'apportion',
      tableData:{},
      tableData2:{},
      siteList:JSON.parse(localStorage.siteList),
      staffList:[]
    }
  },
  mounted(){
    this.searchForm.chooseSite = this.siteList[0].id;
    this.getStaffList();
    this.getUnStore();
  },
  methods:{
    editorStore(data,type){
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'user/assignOrCancel', {
        "userId":_this.searchForm.choosePerson,
        "storeId":data.id,
        "operation":type
      }).then(function(response) {
        if (response.data.code == 0) {
          _this.getUnStore();
          _this.getStore();
        }
      });
    },
    handleClick(){//切换查看table

    },
    storeChange(){

    },
    getStaffList(){
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'user/getPage', {pageNumber: 1,pageSize: 100}).then(function(response) {
        if (response.data.code == 0) {
          _this.staffList = response.data.data.list;
          _this.searchForm.choosePerson = _this.staffList[0].id;
          _this.getStore();
        }
      });
    },
    getUnStore(){//未分配
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'store/availableAssign', {name:"",pageNumber: 1,pageSize: 10}).then(function(response) {
        if (response.data.code == 0) {
          _this.tableData = response.data.data;
        }
      });
    },
    getStore(){//已分配
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'user/stores', {userId:_this.searchForm.choosePerson,name:"",pageNumber: 1,pageSize: 10}).then(function(response) {
        if (response.data.code == 0) {
          _this.tableData2 = response.data.data;
        }
      });
    }
  },
  watch:{
    'searchForm.choosePerson':function(){
      this.getUnStore();
      this.getStore();
    },
    'searchForm.chooseSite':function(){
      this.getUnStore();
      this.getStore();
    }
  }
}
