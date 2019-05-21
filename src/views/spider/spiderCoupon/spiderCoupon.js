import { mapGetters } from 'vuex'

export default {
  props:['currPageInfo'],
  name: 'spiderCoupon',
  data(){
    return {
      searchForm: {//提交给后台的 查询条件
        title: '',
        type: '',
        expired: 0,
        scrapy:0,
        pageNumber:1,
        pageSize:10,
        storeId:''
      },
      tableData: {}//从后台获取的数组
    }
  },
  mounted(){
    if(this.currPageInfo){//查询商家下的优惠券
      this.searchForm.storeId = this.currPageInfo;
    }else{
      this.initData(['spiderSite','couponType','expiry']);
    }
    this.searchForm.pageNumber = 1;
    this.getTableList();
  },
  methods:{
    couponChange(e){
      this.searchForm.pageNumber = e;
      this.getTableList();
    },
    searchSubmit(){
      this.searchForm.pageNumber = 1;
      this.getTableList();
    },
    getTableList(){
      let _this = this;
      _this.$sendData('post','coupon/getPage',_this.searchForm,(data,all)=>{//爬虫优惠券列表
        _this.tableData = data;
      });
    }
  },
  watch:{
    'currPageInfo':function(e){
      this.searchForm.storeId = this.currPageInfo;
      this.searchForm.pageNumber = 1;
      this.getTableList();
    }
  },
  computed: {
    ...mapGetters([
      'spiderList','couponTypeList','expiryList'
    ])
  }
}
