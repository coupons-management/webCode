export default {
  name: 'spiderCoupon',
  data(){
    return {
      searchForm: {//提交给后台的 查询条件
        title: '',
        type: '0',
        isPast: '0',
        isArtificial:'0',
        state:'0',
        couponType:'1'
      },
      tableData: {//从后台获取的数组
        pageSize:10,
        pageTotal:3,
        page:1,
        tableList:[
          {id: '1', storeName: '商家1', couponName: '优惠券1', couponNameNew: '优惠券1-1',state:'0', type:'code',code: '123123', describe: '描述1',
            isPast: '1', pastTime: '2019-04-16',createTime:'2019-04-16',isArtificial:'1'},
          {id: '2', storeName: '商家1', couponName: '优惠券2', couponNameNew: '优惠券2-1',state:'1', type:'deal',code: '123123', describe: '描述2',
            isPast: '2', pastTime: '2019-04-16',createTime:'2019-04-16',isArtificial:'2'},
          {id: '3', storeName: '商家1', couponName: '优惠券3', couponNameNew: '优惠券3-1',state:'2', type:'code',code: '123123', describe: '描述3',
            isPast: '2', pastTime: '2019-04-16',createTime:'2019-04-16',isArtificial:'2'}
        ]
      },
      editorCouponsBox:false,
      editorData:{}
    }
  },
  mounted(){
  },
  methods:{
    searchSubmit(){//查询提交

    },
    couponChange(){//table分页

    },
    isPassFun(data,type){//单个审核

    },
    editorInfo(data){//编辑
      this.editorData = data;
      this.editorCouponsBox = true;
    },
    deleteCoupon(){//删除优惠券

    },
    editorSubmit(){//提交修改优惠券

    }
  }
}
