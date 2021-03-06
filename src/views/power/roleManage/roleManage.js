export default {
  name: 'roleManage',
  data(){
    return {
      roleForm:{
        description:'',
        name:''
      },
      tableList: [],
      isAddRole:false,
      roleBox:false,
      powerBox:false,
      powerList:[],
      checkedList:[],
      defaultProps:{
        children: 'children',
        label: 'name'
      },
      currRole:''
    }
  },
  mounted(){
    this.getTableList();
    this.getPermissList();
  },
  methods:{
    getTableList(){
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'role/list', {}).then(function(response) {
        if (response.data.code == 0) {
          _this.tableList = response.data.data;
        }
      });
    },
    addNew(){
      this.isAddRole = true;
      this.roleBox = true;
      this.roleForm = {
        description:'',
        name:''
      }
    },
    editorInfo(data){
      this.isAddRole = false;
      this.roleBox = true;
      this.roleForm = JSON.parse(JSON.stringify(data));
    },
    deleteInfo(data){
      let _this = this;
      _this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '重选',
        type: 'warning'
      }).then(() => {
        _this.$axios.post(sessionStorage.axiosLocalUrl + 'role/delete', {id:data.id}).then(function(response) {
          if (response.data.code == 0) {
            _this.getTableList();
            _this.$message({ type: 'success', message: response.data.message });
          }else{
            _this.$message({ type: 'danger', message: response.data.message });
          }
        });
      }).catch(() => {});
    },
    submitData(){
      let _this = this;
      if(!_this.roleForm.name){
        _this.$message({ type: 'error', message: '角色名不能为空！' });
        return false;
      }
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'role/'+(_this.isAddRole?'add':'update'), _this.roleForm).then(function(response) {
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
        description:'',
        name:''
      }
    },
    permissions(data){
      let _this = this;
      _this.currRole = data.id;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'role/resource', { "id": data.id}).then(function(response) {
        if (response.data.code == 0) {
          _this.checkedList = [];
          for(let i of response.data.data){
            _this.checkedList.push(i.id);
          }
          _this.powerBox = true;
        }
      });
    },
    getPermissList(){
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'role/allResource', {}).then(function(response) {
        if (response.data.code == 0) {
          _this.powerList = response.data.data
        }
      });
    },
    powerSend(){
      let _this = this,powerSendData = [];
      let powerArray = _this.$refs.tree.getCheckedNodes();
      for(let i of powerArray){
        powerSendData.push(i.id);
      }
      _this.$axios.post(sessionStorage.axiosLocalUrl + 'role/updateResource', {
        "roleId": _this.currRole,
        "resources": powerSendData
      }).then(function(response) {
        if (response.data.code == 0) {
          _this.powerBox = false;
        }
      });
    }
  }
}
