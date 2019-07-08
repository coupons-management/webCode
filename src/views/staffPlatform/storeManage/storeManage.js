import maintainStore from '../maintainStore/maintainStore.vue';
import couponInfo from '../couponInfo/couponInfo.vue';
import storeInfo from '../storeInfo/storeInfo.vue';
import { mapGetters } from 'vuex'

export default {
  components:{
    maintainStore,
    couponInfo,
    storeInfo
  },
  name: 'siteHome',
  data(){
    return {
      navList:[{name:'商家管理',value:'store',state:false},{name:'维护商家',value:'maintain',state:false},{name:'优惠券管理',value:'coupon',state:false}],
      navState:{
        store:false,
        maintain:false,
        coupon:false
      }
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
      _this.navState.store = true;
    }
  }
}
