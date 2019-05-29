export default {
  name: 'dataStat',
  data(){
    return {
      value6:'',
      radio3:'1',
      radio4:'1',
      chooseSite:'0',
      totalStat:{
        pageSize:10,
        pageTotal:3,
        page:1,
        totalList: [
          {date:'2019-04-18',couponNum:'1',newStoreNum:'5',totalStoreNum:'6',storeNum:'2',rightCouponNum:'3',totalCouponNum:'4'},
          {date:'2019-04-18',couponNum:'1',newStoreNum:'5',totalStoreNum:'6',storeNum:'2',rightCouponNum:'3',totalCouponNum:'4'},
          {date:'2019-04-18',couponNum:'1',newStoreNum:'5',totalStoreNum:'6',storeNum:'2',rightCouponNum:'3',totalCouponNum:'4'},
          {date:'2019-04-18',couponNum:'1',newStoreNum:'5',totalStoreNum:'6',storeNum:'2',rightCouponNum:'3',totalCouponNum:'4'},
          {date:'2019-04-18',couponNum:'1',newStoreNum:'5',totalStoreNum:'6',storeNum:'2',rightCouponNum:'3',totalCouponNum:'4'}
        ]
      },
      storeStat: {
        pageSize:10,
        pageTotal:3,
        page:1,
        storeList: [
          {date:'2019-04-18',num0:'1',num3:'2',num5:'3',numMore:'4'},
          {date:'2019-04-18',num0:'1',num3:'2',num5:'3',numMore:'4'},
          {date:'2019-04-18',num0:'1',num3:'2',num5:'3',numMore:'4'},
          {date:'2019-04-18',num0:'1',num3:'2',num5:'3',numMore:'4'}
        ]
      }
    }
  },
  mounted(){

  },
  methods:{

  }
}
