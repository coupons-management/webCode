import advert from './advert/advert.vue';
import category from './category/category.vue';
import pageContent from './pageContent/pageContent.vue';
import siteContent from './siteContent/siteContent.vue';
import statistics from './statistics/statistics.vue';
import { mapGetters } from 'vuex'

export default {
  components:{advert,category,pageContent,siteContent,statistics},
  name: 'siteCategory',
  data(){
    return {
      activeName:'first',//站点管理的标签页
      showFlag:false
    }
  },
  mounted () {
    this.showFlag = true;
    if(localStorage.siteNav){
      this.activeName = localStorage.siteNav;
    }else{
      this.activeName = 'first';
    }
  },
  methods:{
    handleClick(tab, event){//切换站点管理的标签页 回调函数
      console.log(tab.name);
      localStorage.siteNav = tab.name;
    }
  },
  watch:{
    'siteId':function(id){
      this.showFlag = false;
      setTimeout(()=>{
        this.showFlag = true;
      },0)
    }
  },
  computed: {
    ...mapGetters([
    'siteId'
  ])
}
}
