import siteCoupon from '../siteCoupon/siteCoupon.vue';
import siteManage from '../siteManage/siteManage.vue';
import siteMaintain from '../siteMaintain/siteMaintain.vue';
import siteStat from '../siteStat/siteStat.vue';
import siteStore from '../siteStore/siteStore.vue';
import { mapGetters } from 'vuex'

export default {
  components:{
    siteCoupon,
    siteManage,
    siteMaintain,
    siteStat,
    siteStore
  },
  name: 'siteHome',
  data(){
    return {
      navList:[{name:'站点管理',value:'site',state:true},{name:'商家管理',value:'store',state:false},{name:'优惠券管理',value:'coupon',state:false},{name:'统计',value:'stat',state:false}],
      navState:{
        site:false,
        store:false,
        coupon:false,
        stat:false,
        maintain:false
      },
      currSiteId:this.siteId
    }
  },
  mounted(){
    let _this = this;
    this.pageInit();
  },
  methods:{
    toggleNav(data){
      let _this = this;
      for(let i in _this.navState){
        _this.navState[i] = false;
      }
      for(let j of _this.navList){
        j.state = false;
      }
      data.state = true;
      _this.navState[data.value] = true;
    },
    pageInit(){
      let _this = this;
      for(let i in _this.navState){
        _this.navState[i] = false;
      }

      for(let j of _this.navList){
        j.state = false;
      }
      _this.navList[0].state = true;
      _this.navState.site = true;
    }
  },
  watch:{
    'siteId':function(id){
      console.log(id);
      this.pageInit();
    }
  },
  computed: {
    ...mapGetters([
      'siteId'
    ])
  }
}
