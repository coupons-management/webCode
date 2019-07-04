<style scoped lang="scss">
@import "../siteManage.scss";
</style>

<template>
  <section class="siteContent">
    <el-collapse
      v-model="activePageName"
      accordion
      style="background-color: white;padding: 0 20px;width: 40%;"
      @change="togglePage"
      v-loading="loading"
    >
      <el-collapse-item v-for="item in data" :title="item.name" :name="item.id" :key="item.id">
        <div style="padding-top: 10px;border-top: 1px solid lightgrey;">
          <el-form label-width="80px">
            <el-form-item label="title">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item label="keywords">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="item.keyWords"></el-input>
            </el-form-item>
            <el-form-item label="description">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="item.description"></el-input>
            </el-form-item>
            <el-form-item>
              <div style="text-align: right">
                <el-button type="primary" @click="submitTextBtn">提 交</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script src="./pageContent.js"></script>
