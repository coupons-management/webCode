export default {
  name: 'homePage',
  data() {
    return {
      categoryData: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$sendData('post', 'officialWebsite/getCategoriesPageList', { outSiteId: this.siteId || 2 }, (data, all) => {
        this.categoryData = data;
      });
    },
    goCategory(item) {
      console.log(item);
      this.$router.push(`/websiteSec/hotClassify/${item.id}`);
    },
    changePage(e) {
      this.categoryData.pageNumber = e;
      this.getData();
    }
  }
};
