<template>
  <el-breadcrumb class="app-breadcrumb" separator="">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <!--<router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>-->
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script type="es6">
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      if(this.$route.matched[0].name == "内站点数据"){
        let siteList = JSON.parse(localStorage.siteList);
        let currSite = siteList[this.$route.matched[1].meta.siteId - 1];
        this.$route.matched[1].meta.title = currSite.name;
      }
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
      font-size: 18px;
      margin-left: -10px;
    }
  }
</style>
