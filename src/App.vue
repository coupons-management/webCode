<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
.website-page {
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: linear-gradient(to left, #50a851, #48955d);
  }
  .el-pager li.active,
  .el-pager li:hover,
  .el-pagination button:hover {
    color: #48955d;
  }
  .el-pagination button:disabled {
    color: #c0c4cc;
  }
}
.webSiteSec {
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ec6000;
  }
  .el-pager li.active,
  .el-pager li:hover,
  .el-pagination button:hover {
    color: #ec6000;
  }
  .el-pagination button:disabled {
    color: #c0c4cc;
  }
}
</style>
