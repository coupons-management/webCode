import HomePage from '../homePage/homePage.vue';
import Classify from '../classify/classify.vue';
import HotClassify from '../hotClassify/hotClassify.vue';
import HotStores from '../hotStores/hotStores.vue';
import StorePage from '../storePage/storePage.vue';

export default {
  components: { HomePage, Classify, HotClassify, HotStores, StorePage },
  name: 'homePage',
  data() {
    return {
      searchInput: '',
      webSitePageNav: 'homePage' //homePage  classify  hotClassify  hotStores
    };
  },
  mounted() {},
  methods: {
    togglePage(page) {
      this.webSitePageNav = page;
      if (page === 'hotStores') {
        console.log(this.searchInput);
      }
    }
  }
};
