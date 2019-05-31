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
      searchInput: this.$route.query.search || '',
      webSitePageNav: 'homePage' //homePage  classify  hotClassify  hotStores
    };
  },
  mounted() {},
  methods: {
    togglePage(page) {
      if (page === 'homePage') {
        this.$router.push('/websiteSec');
      } else if (page === 'homePage2') {
        this.searchInput ? this.$router.push(`/websiteSec?search=${this.searchInput}`) : this.$router.push('/websiteSec');
      } else {
        this.$router.push(`/websiteSec/${page}`);
      }
    }
  }
};
