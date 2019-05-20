<style scoped lang="scss">
  @import "../siteManage.scss";
</style>

<template>
  <section class="cateContent">
    <section class="firCate">
      <div>
        <i class="el-icon-plus"></i>
      </div>
      <div class="activeFir">一级分类1</div>
      <div>一级分类2</div>
      <div>一级分类3</div>
      <div>一级分类4</div>
      <div>一级分类1</div>
      <div>一级分类2</div>
      <div>一级分类3</div>
      <div>一级分类4</div>
    </section>
    <section class="secCate">
      <section class="topCate">
        <div>
          <i class="el-icon-plus"></i>
        </div>
        <div class="activeSec">二级分类1</div>
        <div>二级分类2</div>
        <div>二级分类3</div>
        <div>二级分类4</div>
        <div>二级分类1</div>
        <div>二级分类2</div>
        <div>二级分类3</div>
        <div>二级分类4</div>
      </section>
      <section class="bottomContent">
        <section>
          <el-col :span="10">
            <el-input placeholder="请输入内容" v-model="input3">
              <el-button slot="prepend">类名：</el-button>
              <el-button slot="append">确定</el-button>
              <el-button slot="append">删除</el-button>
            </el-input>
          </el-col>
        </section>
        <section>
          <span>匹配爬虫分类：</span><el-button type="primary" size="mini" style="margin-left: 50px;">匹配完成</el-button>（展示出来的分类为：已被分到该类的和没有任何分类对应了的）
          <section>
            <el-checkbox-group v-model="currCheckList">
              <el-checkbox :label="item.name" :key="index" v-for="(item,index) in spiderCategoryList" style="margin-left: 30px;margin-top: 10px;"></el-checkbox>
            </el-checkbox-group>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script src="./category.js"></script>
