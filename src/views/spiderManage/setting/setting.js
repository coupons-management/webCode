export default {
  name: 'setting',
  data() {
    return {
      siteList: [],
      spiderSite: '',
      isOpen: true,
      isAddSite: true,
      storeWebsite: ''
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$sendData('get', 'commons/getSpiderList', {}, (data, all) => {
        this.siteList = data.filter(i => i.key != 0);
        if (this.siteList.length > 0) {
          this.spiderSite = this.siteList[0].key;
        }
      });
    }
  }
};
