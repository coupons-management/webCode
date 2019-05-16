export default {
  props:['currPageInfo'],
  name: 'spiderCoupon',
  data(){
    return {
      searchForm: {//提交给后台的 查询条件
        title: '',
        type: '0',
        isPast: '0',
        spiderSite:'1'
      },
      tableData: [//从后台获取的数组
        {id: '1', storeName: '商家1', couponName: '优惠券1', code: 'code', describe: '描述1', isPast: '2', pastTime: '2019-04-16',createTime:'2019-04-16'},
        {id: '2', storeName: '商家2', couponName: '优惠券2', code: 'deal', describe: '描述2', isPast: '1', pastTime: '2019-04-16',createTime:'2019-04-16'},
        {id: '3', storeName: '商家3', couponName: '优惠券3', code: 'code', describe: '描述3', isPast: '2', pastTime: '2019-04-16',createTime:'2019-04-16'}
      ]
    }
  },
  mounted(){
    console.log(this.currPageInfo);
  },
  methods:{
    searchSubmit(){

    }
  }
}
