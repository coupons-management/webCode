
import { mapGetters } from 'vuex'

export default {
  name:'couponManage',
  data(){
    return{
      searchForm:{
        siteId:'',
        storeId:'',
        storeName:'',
        name:'',
        isPass:'',
        isCode:'',
        page:1,
        pageSize:7
      },
      storeForm:{
        siteId:'',
        keyWords:'',
        country:'',
        catgoryId:'',
        minCouponCount:'',
        page:1,
        pageSize:40
      },
      shopData:[],
      countryList:[],
      categoryList:[],
      storeBox:false,
      siteList:[],
      couponData:[],
      couponBox:false,
      couponForm:{},
      batchItem:false,
      selection:[]
    }

  },
  mounted(){
    this.getSiteList();
    //this.getCouponData();
  },
  methods:{
    getCouponData(page){//获取优惠券
      let _this = this;
      _this.$axios.post(localStorage.axiosLocalUrl + "couponsite-manager/getCouponList", _this.searchForm).then(function(response) {
        if (response.data.code == 200) {
          _this.couponData = response.data.data;
        }
      });
    },
    getPass(e){
      console.log(e);
      let _this = this;
      _this.$confirm('审核的优惠券为：'+e.couponName, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '重选',
        type: 'warning'
      }).then(() => {
        e = JSON.parse(JSON.stringify(e));
        e.isPass = 1;
        e.siteId = _this.searchForm.siteId;
        _this.sendSingleData(e);
      }).catch(() => {});
    },
    sendSingleData(data){//提交单个优惠券信息
      let _this = this;
      _this.searchForm.page = 1;
      _this.$axios.post(localStorage.axiosLocalUrl + "couponsite-manager/upDateCoupon", data).then(function(response) {
        if (response.data.code == 200) {
          _this.getCouponData();
        }
      });
    },
    searchBtn(){

    },
    couponChange(e){
      this.searchForm.page = e;
      this.getCouponData();
    },
    storeChange(e){
      this.storeForm.page = e;
      this.getShopData();
    },
    editorInfo(data){
      this.getCouponDetail(data);
    },
    clickRow(row){
      if(this.batchItem){
        this.$refs.couponList.toggleRowSelection(row);
      }
    },
    batchBtn(){//批量操作
      console.log(1);
      this.selection = [];
      this.$refs.couponList.clearSelection();
      this.batchItem = !this.batchItem;
    },
    deleteInfo(data){
      this.deleteCoupon([data.pkId]);
    },
    batchSend(){//批量审核
      let dataList = JSON.parse(JSON.stringify(this.selection));
      if(dataList.length != 0){
        for(let i of dataList){
          i.isPass = 1;
        }
      }else{
        this.$message({ type: "warning", message: "请至少勾选一条优惠券！" });
      }
    },
    batchDel(){//批量删除
      let _this = this,dataList = JSON.parse(JSON.stringify(this.selection)),couponList = [];
      console.log(dataList);
      if(dataList.length != 0){
        for(let i of dataList){
          couponList.push(i.pkId);
        }
        _this.deleteCoupon(couponList);
      }else{
        this.$message({ type: "warning", message: "请至少勾选一条优惠券！" });
      }
    },
    addNewCoupon(){//新增优惠券

    },
    selectionChange(e){//勾选后、
      console.log(e);
      this.selection = e;
    },
    getCouponDetail(data){//优惠券详情
      let _this = this;
      _this.couponForm = data;
      _this.couponBox = true;
    },
    saveInfo(){//修改单个优惠券

    },
    deleteCoupon(list){
      let _this = this;
      _this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '重选',
        type: 'warning'
      }).then(() => {
        _this.$axios.post(localStorage.axiosLocalUrl + "couponsite-manager/deleteCouponOrStore", {
          siteId:_this.searchForm.siteId,
          pkIdList:list,
          interfaceType:"coupon"
        }).then(function(response) {
          if (response.data.code == 200) {
            _this.$message({ type: "success", message: "删除成功！" });
            _this.getCouponData();
          }
        })
      }).catch(() => {});
    },
    storeChecked(data){//选择商家
      let _this = this;
      _this.$confirm('选择的商家为：'+data.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '重选',
        type: 'warning'
      }).then(() => {
        _this.searchForm.storeId = data.pkId;
        _this.searchForm.storeName = data.name;
        _this.storeBox = false;
      }).catch(() => {});
    },
    getShopData(){//获取商家列表
      let _this = this;
      this.storeForm.page = 1;
      _this.$axios.post(localStorage.axiosLocalUrl + "storesite-manager/storeListByPage", _this.storeForm).then(function(response) {
        if (response.data.code == 200) {
          _this.shopData = response.data.data;
        }
      });
    },
    getSiteList(){//获取站点列表
      let _this = this;
      _this.$axios.post(localStorage.axiosLocalUrl + "site-manager/getSiteList", {}).then(function(response) {
        if (response.data.code == 200) {
          _this.siteList = response.data.data.list;
        }
      });
      _this.$axios.post(localStorage.axiosLocalUrl + "storesite-manager/queryCategory", {}).then(function(response) {//分类
        if (response.data.code == 200) {
          _this.categoryList = response.data.data
        }
      });
      _this.$axios.post(localStorage.axiosLocalUrl + "storesite-manager/queryCountry", {}).then(function(response) {//国家
        if (response.data.code == 200) {
          _this.countryList = response.data.data
        }
      });
    }
  },
  computed: {
    ...mapGetters(['loginData'])
  }
}
