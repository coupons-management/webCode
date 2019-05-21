import category from './category/category.vue'
import advert from './advert/advert.vue'
import statistics from './statistics/statistics.vue'
import pageContent from './pageContent/pageContent.vue'
import siteContent from './siteContent/siteContent.vue'
import { mapGetters } from 'vuex'

export default {
  components:{category,advert,statistics,pageContent,siteContent},
  data(){
    return {
      activeName:'first',//站点管理的标签页
      showFlag:false
    }
  },
  mounted () {
    this.showFlag = true;
  },
  methods:{
    handleClick(tab, event){//切换站点管理的标签页 回调函数
      //console.log(tab);
      //console.log(event);
    }
  },
  watch:{
    'siteId':function(id){
      console.log(id);
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
