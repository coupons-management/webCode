<style lang="scss" scoped>
  .marginStyle{
    margin:40px 30px;
  }
</style>

<template>
  <section class="settingPage">
    <span style="color:grey;">选择爬虫：</span>
    <el-select v-model="spiderSite" placeholder="请选择分类">
      <el-option label="爬虫1" value="0"></el-option>
      <el-option label="爬虫2" value="1"></el-option>
      <el-option label="爬虫3" value="2"></el-option>
    </el-select>
    <section class="marginStyle">
      <span style="color:grey;">爬虫开启状态：</span>
      <el-switch v-model="isOpen" active-color="#13ce66" inactive-color="#ff4949" active-text="开启" inactive-text="关闭"></el-switch>
    </section>
    <section class="marginStyle">
      <span style="color:grey;">测试运行：</span>
      <el-switch v-model="isAddSite" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
    </section>
    <section class="marginStyle" >
      <span style="color:grey;">爬取指定商家：</span>
      <el-input placeholder="请输入商家地址" v-model="storeWebsite" clearable style="width: 400px;">
        <template slot="append">
          <span style="cursor: pointer;padding: 10px 0;">确定</span>
        </template>
      </el-input>
    </section>
  </section>
</template>

<script src="./setting.js"></script>
