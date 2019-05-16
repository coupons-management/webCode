export default {
  name: 'siteCategory',
  data(){
    return {
      activeName:'first',//站点管理的标签页
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
      ],
      advertData:[//广告推荐的数据
        {name:'热门商家',topNum:'10',storeList: [
          {text: "Aquamarine"}, {text: "Hotpink"}, {text: "Gold"}, {text: "Crimson"}, {text: "Blueviolet"}, {text: "Lightblue"}, {text: "Cornflowerblue"}, {text: "Skyblue"}, {text: "Burlywood"}
        ]},
        {name:'推荐商家',topNum:'10',storeList: [
          {text: "Aquamarine"}, {text: "Hotpink"}, {text: "Gold"}, {text: "Crimson"}, {text: "Blueviolet"}, {text: "Lightblue"}, {text: "Cornflowerblue"}, {text: "Skyblue"}, {text: "Burlywood"}
        ]},
        {name:'热门优惠券',topNum:'10',storeList: [
          {text: "Aquamarine"}, {text: "Hotpink"}, {text: "Gold"}, {text: "Crimson"}, {text: "Blueviolet"}, {text: "Lightblue"}, {text: "Cornflowerblue"}, {text: "Skyblue"}, {text: "Burlywood"}
        ]},
        {name:'推荐优惠券',topNum:'10',storeList: [
          {text: "Aquamarine"}, {text: "Hotpink"}, {text: "Gold"}, {text: "Crimson"}, {text: "Blueviolet"}, {text: "Lightblue"}, {text: "Cornflowerblue"}, {text: "Skyblue"}, {text: "Burlywood"}
        ]}
      ],
     /* categoryDate:[//站点分类数据
        {name:'分类1',hasCategoryList:[{name:'爬虫分类1'},{name:'爬虫分类2'},{name:'爬虫分类3'}]},
        {name:'分类2',hasCategoryList:[{name:'爬虫分类4'},{name:'爬虫分类5'},{name:'爬虫分类6'}]},
        {name:'分类3',hasCategoryList:[{name:'爬虫分类7'},{name:'爬虫分类8'},{name:'爬虫分类9'}]}
      ],*/
      spiderCategoryList:[//爬虫的总数据
        {name:'爬虫分类1'},{name:'爬虫分类2'},{name:'爬虫分类3'},{name:'爬虫分类4'},{name:'爬虫分类5'},{name:'爬虫分类6'},
        {name:'爬虫分类7'},{name:'爬虫分类8'},{name:'爬虫分类9'},{name:'爬虫分类10'},{name:'爬虫分类11'},{name:'爬虫分类12'}
      ],
      statDate:[
        {value1:'9',value2:'18',value3:'7',value4:'6'}
      ],
      currCheckData:{},//选中的某个分类数据
      currCheckList:['爬虫分类1','爬虫分类2','爬虫分类3','爬虫分类4'],//选中的某个分类数据的勾选数组
      advertBox:false,//广告推荐排序的开关
      categoryBox:false,//分类匹配的开关
      currAdvertData:{},//选中的某个广告词条数据
      orderList:[],//广告推荐排序后的数组顺序
      input3:'二级分类1'
    }
  },
  mounted () {
    this.$dragging.$on('dragged', ({ value }) => {//排序拖拽后的数组重建
      this.orderList = value.list;
    });
    /*this.$dragging.$on('dragend', ({ value }) => {
      console.log(this.orderList);
    })*/
  },
  methods:{
    handleClick(tab, event){//切换站点管理的标签页 回调函数
      //console.log(tab);
      //console.log(event);
    },
    editorAdvert(e){//单个广告词条的编辑
      this.currAdvertData = e;
      this.advertBox = true;
    },
    deleteAdvert(){//单个广告词条的删除

    },
    deleteAdvertBtn(){//单个广告词条中 商家的单个删除

    },
    inputBlur(data){//table表中的直接编辑
      console.log(data);
    },
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
    submitTextBtn(){

    },
    togglePage(e){//页面字段设置 page页的切换
      console.log(e);
    }
  }
}
