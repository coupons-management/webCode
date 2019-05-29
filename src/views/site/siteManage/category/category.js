import { mapGetters } from 'vuex'

export default {
  name: 'siteCategory',
  data(){
    return {
      siteCateList:[],
      secondData:{},
      spiderCategoryList:[],//爬虫的总数据
      currCheckData:{},//选中的某个分类数据
      categoryBox:false,//分类匹配的开关
      currCheckList:[],//选中的某个分类数据的勾选数组
      firCateName:{},
      secCateName:{},
      pid:''
    }
  },
  mounted(){
    this.getCateTree();
    //console.log(this.siteId);

  },
  methods:{
    getCateTree(){//站点分类列表
      let _this = this;
      //console.log(_this.pid);
      _this.$sendData('post','showSiteType/getTree',{siteId:this.siteId},(data,all)=>{
        if(_this.pid){
          for(let i of data.childList){
            if(i.id == _this.pid){
              i.active = true;
              _this.firCateName = _this.deepClone(i);
              i.childList[0].active = true;
              _this.secCateName = _this.deepClone(i.childList[0]);
              _this.secondData = i;
              _this.getSecCateList(i.childList[0].id);
            }
          }
        }else{
          data.childList[0].active = true;
          _this.firCateName = _this.deepClone(data.childList[0]);
          if(data.childList[0].childList[0]){
            data.childList[0].childList[0].active = true;
            _this.secCateName = _this.deepClone(data.childList[0].childList[0]);
            _this.getSecCateList(data.childList[0].childList[0].id);
          }
          _this.secondData = data.childList[0];
        }

        _this.siteCateList = data.childList
      });
    },
    toggleCate(data){//切换分类
      let _this = this;
      if(data.level == 1){// 切换1级分类
        _this.secondData = data;
        _this.firCateName = _this.deepClone(data);
        for(let i of _this.siteCateList){
          i.active  = false;
        }
        if(data.childList.length>0){
          for(let i of _this.secondData.childList){
            i.active  = false;
          }
          _this.secondData.childList[0].active = true;
          _this.secCateName = _this.deepClone(_this.secondData.childList[0]);
          _this.getSecCateList(_this.secondData.childList[0].id)
        }else{
          _this.secCateName = {};
        }
      }else{//切换2级分类
        for(let i of _this.secondData.childList){
          i.active  = false;
        }
        _this.secCateName = _this.deepClone(data);
        _this.getSecCateList(data.id);
      }
      data.active  = true;
      _this.$forceUpdate();
    },
    addCategory(flag){//站点新增分类
      let _this = this;
      _this.$prompt('请输入'+(flag == 1?'一级':'二级')+'分类名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        let sendCate = {name:value,level:flag,pid:(flag == 1?'':_this.secondData.id),outSiteId:_this.siteId};
        _this.$sendData('post','showSiteType/create',sendCate,(data,all)=>{
          if(flag == 2){
            _this.pid = _this.secondData.id;
          }
          _this.getCateTree();
          _this.$message({type: 'success',message: '创建成功！'});
        });
      }).catch(() => {
        _this.$message({type: 'info',message: '取消创建'});
      });
    },
    delCategory(delData){//删除分类
      let _this = this;
      _this.$confirm('确认删除分类:'+delData.name+'?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$sendData('post','showSiteType/delete',{id:delData.id},(data,all)=>{
          if(delData.level == 2){
            _this.pid = delData.pid;
          }
          _this.getCateTree();
          _this.$message({type: 'success',message: '删除成功！'});
        });
      }).catch(() => {
        _this.$message({type: 'info',message: '取消删除'});
      });
    },
    matchData(){//提交勾选了的分类
      let _this = this,currObj;
      for(let i of _this.secondData.childList){
        if(i.active){
          currObj = i;
        }
      }
      _this.$sendData('post','showSiteType/addTypeMap',{siteId:_this.siteId,siteTypeId:currObj.id,sourceTypeIdList:_this.currCheckList},(data,all)=>{
        if(currObj.level == 2){
          _this.pid = currObj.pid;
        }
        _this.getCateTree();
        _this.$message({type: 'success',message: '添加成功！'});
      });
    },
    getSecCateList(id){//获取二级分类下的 未匹配和已匹配的分类
      let _this = this;
      _this.spiderCategoryList =[];
      _this.currCheckList =[];
      _this.$sendData('post','showSiteType/getSourceTypeList',{siteId:_this.siteId,siteTypeId:id},(data,all)=>{
        _this.spiderCategoryList = data;
        for(let i of data){
          if(i.selected){
            _this.currCheckList.push(i.id);
          }
        }
        _this.$forceUpdate();
        console.log(_this.currCheckList);
      });
    },
    changeCateName(data){//改分类名
      let _this = this,currObj;
      for(let i of _this.secondData.childList){
        if(i.active){
          currObj = i;
        }
      }
      _this.$sendData('post','showSiteType/edit',{id:data.id,name:data.name},(data,all)=>{
        if(currObj.level == 2){
          _this.pid = currObj.pid;
        }
        _this.getCateTree();
        _this.$message({type: 'success',message: '修改成功！'});
      });
    }
  },
  computed: {
    ...mapGetters([
      'siteId'
    ])
  }
}
