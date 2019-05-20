<style lang="scss" scoped>
  @import "./siteManage.scss";
</style>

<template>
  <section class="siteManagePage">
    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane label="广告推荐" name="first">
        <advert></advert>
      </el-tab-pane>

      <el-tab-pane label="分类设置" name="second">
        <category></category>
      </el-tab-pane>

      <el-tab-pane label="站点统计" name="third">
        <statistics></statistics>
      </el-tab-pane>

      <el-tab-pane label="页面内容修改" name="fourth" stripe style="">
        <pageContent></pageContent>
      </el-tab-pane>

      <el-tab-pane label="站点页面设置" name="fifth">
        <siteContent></siteContent>
      </el-tab-pane>
    </el-tabs>

  </section>
</template>

<script src="./siteManage.js"></script>
