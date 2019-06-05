<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      :unique-opened="true"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path" v-if="routes.length>0"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script type="es6">
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data(){
    return{
      routes:[]
    }
  },
  created(){
    if(sessionStorage.token){
      this.getSiteList(this.$router.options.routes);
    }
  },
  methods:{
    getSiteList(routeList){
      let _this = this,siteList = [];
      for(let i of routeList){
        if(i.name == "网站数据"){
          _this.$sendData('get','showSite/getList','',(data,all)=>{//爬虫优惠券列表
            localStorage.siteList = JSON.stringify(data);
            for(let j of data){
              let currObj = _this.deepClone(i.children[0]);
              currObj.meta.siteId = j.id;
              currObj.meta.title = j.name;
              currObj.name = j.name;
              currObj.path = 'site'+j.id;
              siteList.push(currObj);
            }
            i.children = siteList;
            _this.routes = routeList;
          });
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
