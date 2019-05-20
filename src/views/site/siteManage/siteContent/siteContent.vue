<style scoped lang="scss">
  @import "../siteManage.scss";
</style>

<template>
  <section class="pageContent">
    <el-collapse v-model="activePageName" accordion style="background-color: white;padding: 0 20px;width: 40%;">
      <el-collapse-item title="About us页面" name="1">
        <div style="padding: 10px 20px 0 20px;border-top: 1px solid lightgrey;">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="aboutUsText"></el-input>
          <div style="text-align: right">
            <el-button type="primary" @click="submitTextBtn" style="margin-top:20px;">　提　交　</el-button>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Contact us页面" name="2">
        <div style="padding: 10px 20px 0 20px;border-top: 1px solid lightgrey;">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="contactUsText"></el-input>
          <div style="text-align: right">
            <el-button type="primary" @click="submitTextBtn" style="margin-top:20px;">　提　交　</el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script src="./siteContent.js"></script>
