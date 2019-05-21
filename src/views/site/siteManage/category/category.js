import { mapGetters } from 'vuex'

export default {
  name: 'siteCategory',
  data(){
    return {
      spiderCategoryList:[//爬虫的总数据
        {name:'爬虫分类1'},{name:'爬虫分类2'},{name:'爬虫分类3'},{name:'爬虫分类4'},{name:'爬虫分类5'},{name:'爬虫分类6'},
        {name:'爬虫分类7'},{name:'爬虫分类8'},{name:'爬虫分类9'},{name:'爬虫分类10'},{name:'爬虫分类11'},{name:'爬虫分类12'}
      ],
      currCheckData:{},//选中的某个分类数据
      categoryBox:false,//分类匹配的开关
      currCheckList:['爬虫分类1','爬虫分类2','爬虫分类3','爬虫分类4'],//选中的某个分类数据的勾选数组
      input3:'二级分类1'
    }
  },
  mounted(){
    this.getCateTree();
  },
  methods:{
    getCateTree(){
      let _this = this;
      _this.$sendData('post','showSiteType/getTypeTree',{siteId:this.siteId},(data,all)=>{//爬虫优惠券列表

      });
    }
    /*editorCategory(e){//编辑 某个分类的匹配项
     let _this = this;
     _this.currCheckData = e;
     _this.currCheckList = [];
     for(let i of e.hasCategoryList){
     _this.currCheckList.push(i.name);
     }
     _this.categoryBox = true;
     },
     deleteCategory(){//删除站点某个分类

     },*/
  },
  computed: {
    ...mapGetters([
      'siteId'
    ])
  }
}
