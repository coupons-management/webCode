export default {
  name: 'roleManage',
  data(){
    return {
      roleForm:{
        id:'',
        account:'',
        name:'',
        password:'',
        gender:'1'
      },
      sendData: {
        account: '',
        name: '',
        pageNumber: 1,
        pageSize: 10
      },
      tableList: '',
      isAddRole:false,
      roleBox:false
    }
  },
  mounted(){
    this.getTableList();
  },
  methods:{
    getTableList(){
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'user/getPage', _this.sendData).then(function(response) {
        if (response.data.code == 0) {
          _this.tableList = response.data.data;
        }
      });
    },
    checkPage(e){
      this.sendData.pageNumber = e;
      this.getTableList();
    },
    addNew(){
      this.isAddRole = true;
      this.roleBox = true;
      this.roleForm = {
          account:'',
          name:'',
          password:'',
          gender:'1'
      }
    },
    editorInfo(data){
      this.isAddRole = false;
      this.roleBox = true;
      data.gender = this.roleForm.gender+'';
      this.roleForm = JSON.parse(JSON.stringify(data));
    },
    deleteInfo(data){
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'user/delete', {account:data.account}).then(function(response) {
        if (response.data.code == 0) {
          _this.$message({ type: 'error', message: response.data.message });
        }else{
          _this.$message({ type: 'danger', message: response.data.message });
        }
      });
    },
    submitData(){
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'user/'+(_this.isAddRole?'add':'update'), _this.roleForm).then(function(response) {
        if (response.data.code == 0) {
          _this.roleBox = false;
          _this.getTableList();
        }else{
          _this.$message({ type: 'error', message: response.data.message });
        }
      });
    },
    rebuildData(){
      this.roleForm = {
        account:'',
        name:'',
        password:'',
        gender:'1'
      }
    },
    permissions(){

    }
  }
}
