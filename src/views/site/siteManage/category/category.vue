<style scoped lang="scss">
  @import "../siteManage.scss";
  .cateItem{
    position: relative;
  }
  .delCate{
    position: absolute;
    right: 10px;
  }
  .delSecCate{
    top: 5px;
    right: 3px;
    color: darkgrey;
  }
</style>

<template>
  <section class="cateContent">
    <section class="firCate">
      <div @click="addCategory(1)">
        <i class="el-icon-plus"></i>
      </div>
      <div v-for="cateFir in siteCateList" :key="cateFir.id" @click="toggleCate(cateFir)" class="cateItem">
        <span :class="cateFir.active?'activeFir':''">{{cateFir.name}}</span>
        <span class="delCate" @click.stop="delCategory(cateFir)">
          <i class="el-icon-close"></i>
        </span>
      </div>
    </section>
    <section class="secCate">
      <section class="topCate">
        <div @click="addCategory(2)">
          <i class="el-icon-plus"></i>
        </div>
        <div v-for="cateSec in secondData.childList" :key="cateSec.id" :class="cateSec.active?'activeSec':''" @click="toggleCate(cateSec)" class="cateItem">
          <span>{{cateSec.name}}</span>
          <span class="delCate delSecCate" @click.stop="delCategory(cateSec)">
            <i class="el-icon-circle-close"></i>
          </span>
        </div>
      </section>
      <section class="bottomContent" v-if="secCateName">
        <section>
          <el-col :span="10">
            <el-input placeholder="请输入内容" v-model="firCateName.name">
              <el-button slot="prepend">一级类名:</el-button>
              <el-button slot="append" @click="changeCateName(firCateName)">确定</el-button>
            </el-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-input placeholder="请输入内容" v-model="secCateName.name">
              <el-button slot="prepend">二级类名:</el-button>
              <el-button slot="append" @click="changeCateName(secCateName)">确定</el-button>
            </el-input>
          </el-col>
        </section>
        <section>
          <span>匹配爬虫分类：</span><el-button type="primary" size="mini" style="margin-left: 50px;" @click="matchData">匹配完成</el-button>（展示出来的分类为：已被分到该类的和没有任何分类对应了的）
          <section>
            <el-checkbox-group v-model="currCheckList">
              <el-checkbox :label="item.id" :key="item.id" v-for="item in spiderCategoryList" style="margin-left: 30px;margin-top: 10px;">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script src="./category.js"></script>
