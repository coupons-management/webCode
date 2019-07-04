import { mapGetters } from 'vuex';

export default {
  name: 'sitePageContent',
  data() {
    return {
      activePageName: '', //修改页面信息标签页
      aboutUsText: '', //关于我页面内容设置
      contactUsText: '', //联系我页面内容设置
      data: [],
      loading: false,
      pageList: [
        //页面字段设置数据列表
        { name: '首页', value: '1', pageWordForm: { title: '1', keywords: '2', description: '3' } },
        { name: '分类列表', value: '2', pageWordForm: { title: '4', keywords: '5', description: '6' } },
        { name: '详细分类', value: '3', pageWordForm: { title: '', keywords: '', description: '' } },
        { name: '商店列表', value: '4', pageWordForm: { title: '', keywords: '', description: '' } },
        { name: 'About us', value: '5', pageWordForm: { title: '', keywords: '', description: '' } },
        { name: 'Contact us', value: '6', pageWordForm: { title: '', keywords: '', description: '' } }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.$sendData('post', 'showSite/getPageInfoList', { id: this.siteId }, (data, all) => {
        this.data = data;
        this.loading = false;
      });
    },
    togglePage(e) {
      //页面字段设置 page页的切换
      console.log();
    },
    submitTextBtn() {
      let temp = this.data.filter(i => i.id === this.activePageName);
      console.log(temp[0]);
      if (temp.length > 0) {
        this.$sendData('post', 'showSite/savePageInfo', temp[0], (data, all) => {
          this.$message({ type: 'success', message: '保存成功！' });
        });
      }
    }
  },
  computed: {
    ...mapGetters(['siteId'])
  }
};
