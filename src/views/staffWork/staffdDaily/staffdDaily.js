export default {
  name: 'staffdDaily',
  data(){
    return {
      searchForm:{
        searchTime:'',
        choosePerson:'0',
        chooseSite:'0'
      },
      activeName:'daily',
      storeData:{
        pageSize:10,
        pageTotal:3,
        page:1,
        storeList: [
          {name:'商家1',website:'https://www.baidu.com',logo:'static/imgs/nike.jpg',time:'2019-04-16'},
          {name:'商家2',website:'https://www.baidu.com',logo:'static/imgs/nike.jpg',time:'2019-04-16'},
          {name:'商家3',website:'https://www.baidu.com',logo:'static/imgs/nike.jpg',time:'2019-04-16'}
        ]
      },
      couponData:{
        pageSize:10,
        pageTotal:3,
        page:1,
        couponList: [
          {storeName:'商家1',title:'原名1',newTitle:'现名1',code:'code1',siteName:'站点1',time:'2019-04-21'},
          {storeName:'商家2',title:'原名2',newTitle:'现名2',code:'code2',siteName:'站点2',time:'2019-04-21'},
          {storeName:'商家3',title:'原名3',newTitle:'现名3',code:'code3',siteName:'站点3',time:'2019-04-21'}
        ]
      },
      manageStoreData: {
        pageSize:10,
        pageTotal:3,
        page:1,
        manageStoreList: [
          {name:'商家1',website:'https://www.baidu.com',logo:'static/imgs/nike.jpg',time:'2019-04-16',couponNum:'8',couponNumTotal:'10'},
          {name:'商家2',website:'https://www.baidu.com',logo:'static/imgs/nike.jpg',time:'2019-04-16',couponNum:'4',couponNumTotal:'10'},
          {name:'商家3',website:'https://www.baidu.com',logo:'static/imgs/nike.jpg',time:'2019-04-16',couponNum:'6',couponNumTotal:'10'}
        ]
      },
      numData:{
        pageSize:10,
        pageTotal:3,
        page:1,
        numList: [
          {date:'2019-04-19',storeNum:'4',couponNum:'5'},
          {date:'2019-04-20',storeNum:'6',couponNum:'8'},
          {date:'2019-04-21',storeNum:'7',couponNum:'9'}
        ]
      },
      staffList:[]
    }
  },
  mounted(){
    this.getStaffList();
  },
  methods:{
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
    handleClick(){//切换查看table

    },
    storeChange(){//商家分页

    },
    couponChange(){//优惠券分页

    },
    manageStoreChange(){//管理的商家分页

    }
  }
}
