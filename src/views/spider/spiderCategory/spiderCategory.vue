<style lang="scss" scoped>
  .el-tag + .el-tag {
    margin-left: 30px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<template>
  <section class="spiderCategory">
    <section>
      <div style="margin: 15px 0;">爬虫分类：</div>
      <el-tag :key="index" v-for="(tag,index) in spiderTags" closable :disable-transitions="false" @close="handleClose1(tag)"> {{tag}} </el-tag><!--:key="tag"-->
    </section>
    <section>
      <div style="margin: 15px 0;">人工分类：</div>
      <el-tag :key="index" v-for="(tag,index) in manualTags" closable :disable-transitions="false" @close="handleClose2(tag)"> <span @click.stop="editorTag(tag)">{{tag}}</span> </el-tag><!--:key="tag"-->
      <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"><i class="el-icon-circle-plus-outline" style="font-size: 20px;vertical-align: sub;"></i> 新增分类</el-button>
    </section>
  </section>
</template>

<script src="./spiderCategory.js"></script>
