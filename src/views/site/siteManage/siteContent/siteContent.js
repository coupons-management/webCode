
export default {
  name: 'siteSiteContent',
  data(){
    return {
      activePageName:'',//修改页面信息标签页
      aboutUsText:'',//关于我页面内容设置
      contactUsText:'',//联系我页面内容设置
      pageList:[//页面字段设置数据列表
        {name:'首页',value:'1',pageWordForm:{title:'1',keywords:'2',description:'3'}},
        {name:'分类列表',value:'2',pageWordForm:{title:'4',keywords:'5',description:'6'}},
        {name:'详细分类',value:'3',pageWordForm:{title:'',keywords:'',description:''}},
        {name:'商店列表',value:'4',pageWordForm:{title:'',keywords:'',description:''}},
        {name:'About us',value:'5',pageWordForm:{title:'',keywords:'',description:''}},
        {name:'Contact us',value:'6',pageWordForm:{title:'',keywords:'',description:''}}
      ]
    }
  },
  mounted(){

  },
  methods:{
    submitTextBtn(){

    }
  }
}
