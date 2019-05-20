
export default {
  name: 'siteAdvert',
  data(){
    return {

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
      advertBox:false,//广告推荐排序的开关
      currAdvertData:{},//选中的某个广告词条数据
      orderList:[]//广告推荐排序后的数组顺序
    }
  },
  mounted(){
    this.$dragging.$on('dragged', ({ value }) => {//排序拖拽后的数组重建
      this.orderList = value.list;
    });
  },
  methods:{

    inputBlur(data){//table表中的直接编辑
      console.log(data);
    },
    editorAdvert(e){//单个广告词条的编辑
      this.currAdvertData = e;
      this.advertBox = true;
    },
    deleteAdvert(){//单个广告词条的删除

    },
    deleteAdvertBtn(){//单个广告词条中 商家的单个删除

    }
  }
}
