export default {
  name: 'homePage',
  data() {
    return {
      CategoriesList: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$sendData('post', 'officialWebsite/getCategoriesList', { outSiteId: this.siteId || 1 }, (data, all) => {
        this.CategoriesList = data;
      });
    }
  }
};
