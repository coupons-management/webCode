
export default {
  name:'siteManage',
  data(){
    return {
      searchSite: {
        name:'',
        url:''
      },//搜索内容
      siteData: [],//表格数据
      addSiteBox:false,//弹出框
      siteForm:{//新增/修改 的表单
        name:'',
        url:'',
        iconRelativePath:'',// iconRelativePath
        language:'',
        isAutoPush:'1'
      },
      isAddSite:false,//true新增 false修改
      fileUrl:sessionStorage.axiosLocalUrl+'site-manager/uploadFile'
    }
  },
  mounted(){
    this.getSiteList();
  },
  methods:{
    handleAvatarSuccess(e){
      this.siteForm.iconRelativePath = 'http://39.98.53.2:3332/backend_scrapy_site/'+e.data;
    },
    editorInfo(data){//编辑某个站点
      let _this = this;
      _this.addSiteBox = true;
      if(data){
        _this.isAddSite = false;
        data.isAutoPush = data.isAutoPush+'';
        _this.siteForm = JSON.parse(JSON.stringify(data));
      }else{
        _this.isAddSite = true;
        for(let i in _this.siteForm){
          _this.siteForm[i] = '';
        }
        _this.siteForm.isAutoPush = '1';
      }
    },
    deleteInfo(data){//删除某个站点
      let _this = this;
      _this.$confirm('此操作将删除站点：'+data.name+', 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
      }).then(() => {
        _this.$axios.post(sessionStorage.axiosLocalUrl + "site-manager/deleteSite", {pkId:data.pkId}).then(function(response) {
          if (response.data.code == 200) {
            _this.$message({type: 'success',message: '删除成功!'});
            _this.getSiteList();
          }
        });
      }).catch(() => {
        _this.$message({type: 'warning',message: '已取消删除!'});
      });
    },
    changeUpload(e){//选择图片后回显
      this.siteForm.icon = '';
      this.getBase64(URL.createObjectURL(e.raw), this.siteForm,'icon');
    },
    getSiteList(){//查询站点列表
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + "site-manager/getSiteList", {
        name:_this.searchSite.name,
        url:_this.searchSite.url
      }).then(function(response) {
        if (response.data.code == 200) {
          _this.siteData = response.data.data.list;
        }
      });
    },
    submitBtn(){//新增/修改 的提交
      let _this = this,sendUrl = _this.isAddSite?'site-manager/addSite':'site-manager/updateSite';
      if(!_this.siteForm.name && !_this.siteForm.url){
        _this.$message({type: 'error',message: '* 为必填!'});
        return false;
      }
      _this.$confirm('确认此操作?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
      }).then(() => {
        _this.$axios.post(sessionStorage.axiosLocalUrl + sendUrl, _this.siteForm).then(function(response) {
          if (response.data.code == 200) {
            _this.$message({type: 'success',message: '操作成功!'});
            _this.addSiteBox = false;
            _this.getSiteList();
          }
        });
      }).catch(() => {
        _this.$message({type: 'warning',message: '已取消删除!'});
      });
    }
  }
}
