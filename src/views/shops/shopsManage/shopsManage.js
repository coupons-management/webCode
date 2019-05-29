
export default {
  name:'shopsManage',
  data(){
    return {
      searchForm:{
        siteId:'',
        keyWords:'',
        country:'',
        categoryId:'',
        minCouponCount:'',
        isPass:'',
        page:1,
        pageSize:8
      },
      storeForm:{//
        siteId:'',
        name:'',
        website:'',
        country:'',
        categoryId:'',
        desc:'',
        picture:'',
        pkId:''
      },
      siteBox:false,
      isAddSite:true,
      countryList:[],
      categoryList:[],
      shopData:[],
      siteList:[],
      fileUrl:sessionStorage.axiosLocalUrl+'site-manager/uploadFile'
    }
  },
  mounted(){
    this.getInitData();
    this.getSiteList();
  },
  methods:{
    checkPage(e){//分页
      this.searchForm.page = e;
      this.getShopData();
    },
    handleAvatarSuccess(e){//图片上传
      this.storeForm.picture = 'http://39.98.53.2:3332/backend_scrapy_site/'+e.data;
    },
    editorInfo(data){//新增/修改 入口
      let _this = this;
      _this.siteBox = true;
      _this.isAddSite = data?false:true;
      if(data){
        _this.storeForm = JSON.parse(JSON.stringify(data));
      }else{
        _this.storeForm = {
          siteId:_this.searchForm.siteId,
          name:'',
          website:'',
          country:'',
          categoryId:'',
          desc:'',
          picture:'',
          pkId:''
        }
      }
    },
    submitBtn(e){//新增/修改 提交
      let _this = this,sendUrl;
      if(_this.isAddSite){
        sendUrl = 'storesite-manager/addStore';
      }else{
        sendUrl = 'storesite-manager/updateStoreById';
      }
      //console.log(e);
      _this.$axios.post(sessionStorage.axiosLocalUrl + sendUrl, e.isPass?e:_this.storeForm).then(function(response) {
        if (response.data.code == 200) {
          _this.getShopData();
          _this.siteBox = false;
        }
      });
    },
    getPass(e){//审核
      console.log(e);
      let _this = this;
      _this.$confirm('审核的商家为：'+e.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '重选',
        type: 'warning'
      }).then(() => {
        _this.isAddSite = false;
        e = JSON.parse(JSON.stringify(e));
        e.isPass = 1;
        e.siteId = _this.searchForm.siteId;
        _this.submitBtn(e);
      }).catch(() => {});
    },
    updateInfo(data){//更新单个商家数据

    },
    deleteInfo(data){//删除单个商家
      let _this = this;
      _this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '重选',
        type: 'warning'
      }).then(() => {
        _this.$axios.post(sessionStorage.axiosLocalUrl + "couponsite-manager/deleteCouponOrStore", {
          siteId:_this.searchForm.siteId,
          pkIdList:[data.pkId],
          interfaceType:"store"
        }).then(function (response) {
          if (response.data.code == 200) {
            _this.getShopData();
            _this.$message({ type: "success", message: "删除成功！" });
          }
        });
      }).catch(() => {});
    },
    getShopData(){//获取商家列表
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + "storesite-manager/storeListByPage", _this.searchForm).then(function(response) {
        if (response.data.code == 200) {
          _this.shopData = response.data.data;
          _this.storeForm.siteId = _this.searchForm.siteId;
        }
      });
    },
    getSiteList(){//获取站点列表
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + "site-manager/getSiteList", {}).then(function(response) {
        if (response.data.code == 200) {
          _this.siteList = response.data.data.list;
        }
      });
    },
    getInitData(){
      let _this = this;
      _this.$axios.post(sessionStorage.axiosLocalUrl + "storesite-manager/queryCategory", {}).then(function(response) {//分类
        if (response.data.code == 200) {
          _this.categoryList = response.data.data
        }
      });
      _this.$axios.post(sessionStorage.axiosLocalUrl + "storesite-manager/queryCountry", {}).then(function(response) {//国家
        if (response.data.code == 200) {
          _this.countryList = response.data.data
        }
      });
    }
  },
  filters:{
    showText:function(e){
      if(e.length>75){
        return e.substr(0,75)+'...';
      }else{
        return e;
      }
    }
  }
}
