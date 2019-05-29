export default {
  name: 'dataStat',
  data(){
    return {
      spiderSite:'0',
      chooseTime:'',
      tableData:{
        pageSize:10,
        pageTotal:3,
        page:1,
        tableList: [
          {startTime:'2019-04-21',endTime:'2019-04-21',storeNum:'1',newStoreNum:'2',addNewStoreNum:'3',couponNum:'4',newCouponNum:'5'},
          {startTime:'2019-04-21',endTime:'2019-04-21',storeNum:'1',newStoreNum:'2',addNewStoreNum:'3',couponNum:'4',newCouponNum:'5'},
          {startTime:'2019-04-21',endTime:'2019-04-21',storeNum:'1',newStoreNum:'2',addNewStoreNum:'3',couponNum:'4',newCouponNum:'5'}
        ]
      }
    }
  },
  mounted(){

  },
  methods:{
    searchSubmit(){
      console.log(this.chooseTime);
    },
    tableChange(){

    }
  }
}
