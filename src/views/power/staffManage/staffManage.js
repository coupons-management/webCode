
export default {
  name: 'staffManage',
  data(){
    return {
      roleForm:{
        id:'',
        account:'',
        name:'',
        password:'',
        passwordAgain:'',
        gender:'1'
      },
      sendData: {
        account: "",
        name: "",
        pageNumber: 1,
        pageSize: 10
      },
      tableList: '',
      isAddRole:false,
      roleBox:false,
      showPwd:true,
      assignmentBox:false,
      roleList:[],
      checkList:[],
      currUser:''
    }
  },
  mounted(){
    this.getTableList();
    this.getRoleList();
  },
  methods:{
    getRoleList(){
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'role/list', _this.sendData).then(function(response) {
        if (response.data.code == 0) {
          _this.roleList = response.data.data;
        }
      });
    },
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
      this.showPwd = true;
      this.roleForm = {
        account:'',
        name:'',
        password:'',
        gender:'1'
      }
    },
    editorInfo(data){
      this.showPwd = false;
      this.isAddRole = false;
      this.roleBox = true;
      data.gender = this.roleForm.gender+'';
      this.roleForm = JSON.parse(JSON.stringify(data));
    },
    deleteInfo(data){
      let _this = this;
      _this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '重选',
        type: 'warning'
      }).then(() => {
        _this.$axios.post(sessionStorage.axiosLocalUrl + 'user/delete', {id:data.id}).then(function(response) {
          if (response.data.code == 0) {
            _this.getTableList();
            _this.$message({ type: "success", message: "删除成功！" });
          }else{
            _this.$message({ type: 'danger', message: response.data.message });
          }
        });
      }).catch(() => {});

    },
    editorPwd(){
      this.showPwd = true;
      this.roleForm.passwordOld = this.roleForm.password;
      this.roleForm.password = '';
      this.roleForm.passwordAgain = '';
    },
    cancelEditorPwd(){
      this.showPwd = false;
      this.roleForm.password = this.roleForm.passwordOld;
      this.roleForm.passwordOld = '';
    },
    submitData(){
      let _this = this;
      if(!_this.roleForm.account){
        _this.$message({ type: 'error', message: '账号不能为空！' });
        return false;
      }
      if(!_this.roleForm.name){
        _this.$message({ type: 'error', message: '名称不能为空！' });
        return false;
      }
      if(!_this.roleForm.password){
        _this.$message({ type: 'error', message: '密码不能为空！' });
        return false;
      }
      if(_this.roleForm.password != _this.roleForm.passwordAgain){
        _this.$message({ type: 'error', message: '两次密码不一致，请重新输入！' });
        return false;
      }
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
    permissions(data){
      let _this = this;
      if(data.roleList.length>0){
        for(let i of data.roleList){
          _this.checkList.push(i.id);
        }
      }
      _this.currUser = data.id;
      _this.assignmentBox = true;
    },
    submitRole(){
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'user/assignRole', {
        "userId":_this.currUser,
        "roles":_this.checkList
      }).then(function(response) {
        if (response.data.code == 0) {
          _this.assignmentBox = false;
          _this.getTableList();
        }else{
          _this.$message({ type: 'error', message: response.data.message });
        }
      });
    }
  }
}
