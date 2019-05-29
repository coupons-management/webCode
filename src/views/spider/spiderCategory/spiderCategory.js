export default {
  name: 'siteManage',
  data() {
    return {
      spiderList: [],
      storeSpider:[],
      manualList: [],
      storeManual:[],
      searchList:[],
      inputVisible: false,
      inputValue: '',
      spiderKey:'',
      humanKey:''
    };
  },
  mounted(){
    this.getTypeList();
  },
  methods: {
    spiderSearch(){
      let _this = this;
      if(_this.spiderKey){
        _this.searchList = [];
        for(let i of _this.storeSpider){
          if(i.name.indexOf(_this.spiderKey) != -1){
            _this.searchList.push(i);
          }
        }
        _this.spiderList = _this.searchList;
      }else{
        _this.spiderList = _this.storeSpider
      }
    },
    humanSearch(){
      let _this = this;
      if(_this.humanKey){
        _this.searchList = [];
        for(let i of _this.storeManual){
          if(i.name.indexOf(_this.humanKey) != -1){
            _this.searchList.push(i);
          }
        }
        _this.manualList = _this.searchList;
      }else{
        _this.manualList = _this.storeManual
      }
    },
    showInput() {
      let _this = this;
      _this.inputVisible = true;
      _this.$nextTick(_ => {
        _this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {//新增人工分类名字
      let _this = this,inputValue = this.inputValue;
      if (inputValue) {
        _this.$sendData('post','sourceType/create',{name:inputValue},(data,all)=>{//爬虫分类列表
          _this.getTypeList();
          _this.inputVisible = false;
          _this.inputValue = '';
          _this.$message({type: 'success',message: '添加成功！'});
        });
      }
    },
    handleClose(tag,type) {//删除分类
      let deleteData,_this = this;
      _this.$confirm('确定删除该 '+ tag.name +' 吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteData = tag.id;
        _this.$sendData('post','sourceType/delete',{id:deleteData},(data,all)=>{
          _this.getTypeList();
          _this.$message({type: 'success',message: '删除成功!'});
        });
      }).catch(() => {
        this.$message({type: 'info',message: '已取消删除'});
      });
    },
    editorTag(tag){//修改人工分类名字
      let _this = this;
      _this.$prompt('', '分类名', {
        confirmButtonText: '修改',
        cancelButtonText: '取消',
        inputValue:tag.name
      }).then(({ value }) => {
        _this.$sendData('post','sourceType/edit',{name:value,id:tag.id},(data,all)=>{
          _this.getTypeList();
          _this.$message({type: 'success',message: '修改为: ' + value});
        });
      }).catch(() => {});
    },
    getTypeList(){//查询爬虫分类列表
      let _this = this;
      _this.$sendData('get','sourceType/getList','',(data,all)=>{
        _this.manualList = _this.storeManual =  data.manualList;
        _this.spiderList = _this.storeSpider = data.spiderList;
      });
    }
  }
}
