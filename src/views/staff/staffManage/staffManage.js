
export default {
  name:'staffManage',
  data(){
    return{
      staffSearch:{
        userType:'',
        isPass:'',
        keyWords:''
      },
      staffData:[],
      userNum:0,
      editorBox:false,
      editorForm:{
        userName:'',
        oldPassWord:null,
        passWord:null,
        passWordAgain:null,
        contanctName:'',
        mobile:'',
        radio:'2'
      },
      loading:false,
      activeNames:[]
    }
  },
  mounted(){
    this.getStaffData();
  },
  methods:{
    handleCurrentChange(e){
      this.getStaffData(e);
    },
    getPass(data){
      let _this = this;
      _this.$confirm('是否通过'+data.userName+'的注册审核？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$axios.post(sessionStorage.axiosLocalUrl + "user-manager/updateUser", {
          pkId:data.pkId,
          isPass:'1'
        }).then(function(response) {
          if (response.data.code == 200) {
            _this.getStaffData();
            _this.$message({ type: "success", message: "审核成功！" });
          }
        });
      }).catch(()=>{
        _this.$message({ type: "warning", message: "取消操作！" });
      })
    },
    deleteInfo(data){
      let _this = this;
      _this.$confirm('是否要删除人员：'+data.userName+'？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$axios.post(sessionStorage.axiosLocalUrl + "user-manager/delUser", {
          pkId:data.pkId
        }).then(function(response) {
          if (response.data.code == 200) {
            _this.getStaffData();
            _this.$message({ type: "success", message: "删除成功！" });
          }
        });
      }).catch(()=>{
        _this.$message({ type: "warning", message: "取消删除！" });
      })
    },
    editorInfo(data){
      this.editorBox = true;
      this.editorForm.userName = data.userName;
      this.editorForm.pkId = data.pkId;
      this.editorForm.contanctName = data.contanctName;
      this.editorForm.mobile = data.mobile;
    },
    editorSubmit(){
      let formData = this.editorForm;
      if(formData.radio == 1){
        if(!formData.oldPassWord || !formData.passWord || !formData.passWordAgain){
          this.$message({ type: "warning", message: "红色*为必填项！" });
          return false;
        }
      }
      if(formData.passWord != formData.passWordAgain){
        this.$message({ type: "warning", message: "两次输入的密码不一致，请确认！" });
        return false;
      }
      let _this = this;
      _this.$confirm('是否修改？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$axios.post(sessionStorage.axiosLocalUrl + "user-manager/updateUser", formData).then(function(response) {
          if (response.data.code == 200) {
            _this.getStaffData();
            _this.editorBox = false;
            _this.$message({ type: "success", message: "修改成功！" });
          }
        });
      }).catch(()=>{
        _this.$message({ type: "warning", message: "取消操作！" });
      })
    },
    handleCurrentChange(e){
      this.getStaffData(e);
    },
    searchBtn(){
      this.getStaffData();
    },
    getStaffData(page){
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + "user-manager/userlist", {
        keyWords:_this.staffSearch.keyWords,
        isPass:_this.staffSearch.isPass,
        userType:_this.staffSearch.userType,
        page:page?page:'1',
        pageSize:'10'
      }).then(function(response) {
        if (response.data.code == 200) {
          _this.staffData = response.data.data.list;
          _this.userNum = response.data.data.total;
        }
      });
    }
  }
}
