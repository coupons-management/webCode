import HomePage from '../homePage/homePage.vue';
import Classify from '../classify/classify.vue';
import HotClassify from '../hotClassify/hotClassify.vue';
import HotStores from '../hotStores/hotStores.vue';

export default {
  components:{HomePage,Classify,HotClassify,HotStores},
  name:'homePage',
  data(){
    return {
      searchInput: '',
      webSitePageNav:'homePage'//homePage  classify  hotClassify  hotStores
    }
  },
  mounted(){

  },
  methods:{
    togglePage(page){
      this.webSitePageNav = page;
    }
  }
}
