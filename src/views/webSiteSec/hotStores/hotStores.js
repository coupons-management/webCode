
export default {
  name:'homePage',
  data(){
    return {
      couponsList: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
      rightStoreList:[{},{},{},{},{},{},{},{},{},{}],
      activeList:[{cut:'30%',value:4,titleState:'DEAL'},{cut:'SALE',value:4,titleState:'CODE'}],
      expiredList:[{value:4},{value:4}],
      typeList:[{name:'ALL',num:'3',state:true},{name:'CODE',num:'3',state:false},{name:'DEAL',num:'3',state:false}],
      verified:true
    }
  },
  mounted(){

  },
  methods:{
    toggleNav(data){
      for(let i of this.typeList){
        i.state = false;
      }
      data.state = true;
    }
  }
}
