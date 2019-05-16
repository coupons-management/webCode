export default {
  name: 'siteManage',
  data() {
    return {
      spiderTags: ['分类一', '分类二', '分类三','分类一', '分类二', '分类三','分类一', '分类二', '分类三'],
      manualTags: ['分类一', '分类二', '分类三','分类一', '分类二', '分类三','分类一', '分类二', '分类三'],
      inputVisible: false,
      inputValue: ''
    };
  },
  mounted(){

  },
  methods: {
    handleClose1(tag) {
      this.$confirm('确定删除该分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.spiderTags.splice(this.spiderTags.indexOf(tag), 1);
        this.$message({type: 'success',message: '删除成功!'});
      }).catch(() => {
        this.$message({type: 'info',message: '已取消删除'});
      });
    },
    handleClose2(tag) {
      this.$confirm('确定删除该分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.manualTags.splice(this.manualTags.indexOf(tag), 1);
        this.$message({type: 'success',message: '删除成功!'});
      }).catch(() => {
        this.$message({type: 'info',message: '已取消删除'});
      });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.manualTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    editorTag(tag){
      this.$prompt('', '分类名', {
        confirmButtonText: '修改',
        cancelButtonText: '取消',
        inputValue:tag
      }).then(({ value }) => {
        this.$message({type: 'success',message: '修改为: ' + tag});
      }).catch(() => {});
    }
  }
}
