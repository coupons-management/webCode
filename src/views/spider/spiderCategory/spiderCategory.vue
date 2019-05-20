<style lang="scss" scoped>
  @import "./spiderCategory.scss";
</style>

<template>
  <section class="spiderCategory">
    <section>
      <div style="margin: 15px 0;">爬虫分类({{spiderList.length}})：</div>
      <div>
        <el-input v-model="spiderKey" placeholder="请输入关键字" size="small" clearable></el-input><el-button type="primary" @click="spiderSearch" size="small">查询</el-button>
      </div>
      <div class="tagList">
        <el-tag v-for="(tag,index) in spiderList" :key="tag.id" closable :disable-transitions="false" @close="handleClose(tag,'spiderList')"> {{tag.name}} </el-tag>
      </div>
    </section>
    <section>
      <div style="margin: 15px 0;">人工分类({{manualList.length}})：</div>
      <div>
        <el-input v-model="humanKey" placeholder="请输入关键字" size="small" clearable></el-input><el-button type="primary" @click="humanSearch" size="small">查询</el-button>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"><i class="el-icon-circle-plus-outline" style="font-size: 20px;vertical-align: sub;"></i> 新增分类</el-button>
      </div>
      <div class="tagList">

        <el-tag v-for="(tag,index) in manualList" :key="tag.id" closable :disable-transitions="false" @close="handleClose(tag,'manualList')"> <span @click.stop="editorTag(tag)">{{tag.name}}</span> </el-tag><!--:key="tag"-->
      </div>
    </section>
  </section>
</template>

<script src="./spiderCategory.js"></script>
