<style lang="scss" scoped>
  @import "./siteManage.scss";
</style>

<template>
  <section class="siteManagePage">
    <el-tabs v-model="activeName" @tab-click="handleClick" v-if="showFlag">
      <el-tab-pane label="广告推荐" name="first">
        <advert v-if="activeName == 'first'"></advert>
      </el-tab-pane>

      <el-tab-pane label="分类设置" name="second">
        <category v-if="activeName == 'second'"></category>
      </el-tab-pane>

      <el-tab-pane label="站点统计" name="third">
        <statistics v-if="activeName == 'third'"></statistics>
      </el-tab-pane>

      <el-tab-pane label="页面内容修改" name="fourth" stripe>
        <pageContent v-if="activeName == 'fourth'"></pageContent>
      </el-tab-pane>

      <el-tab-pane label="站点页面设置" name="fifth">
        <siteContent v-if="activeName == 'fifth'"></siteContent>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script src="./siteManage.js"></script>
