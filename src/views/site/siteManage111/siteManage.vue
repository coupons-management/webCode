<style scoped lang="scss">
  .siteManage{
    color: grey;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dashed lightgrey;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
  .el-upload-list__item-name{
    display: none;
  }
  .tableImg{
    width: 100px;
    height: 60px;
  }
  .tableImg1{
    width: 300px;
    height: 180px;
  }
</style>

<template>
  <section class="siteManage">
    <section>
      <span style="margin-left: 20px;">名称：</span>
      <div style="display: inline-block;">
        <el-input v-model="searchSite.name" placeholder="请输入名称" size="small" clearable></el-input>
      </div>
      <span style="margin-left: 20px;">网址：</span>
      <div style="display: inline-block;">
        <el-input v-model="searchSite.url" placeholder="请输入网址" size="small" clearable></el-input>
      </div>
      <el-button type="primary" size="mini" icon="el-icon-search" style="margin: 0 15px;" @click="getSiteList">查询</el-button>
      <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="editorInfo()">新增站点</el-button>
    </section>
    <section style="margin-top: 20px;">
      <el-table :data="siteData" stripe style="width: 100%" border >
        <el-table-column prop="iconRelativePath" label="站点LOGO" align="center" width="180">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" placement="right">
              <div slot="content">
                <img v-if="scope.row.iconRelativePath" :src="scope.row.iconRelativePath" class="tableImg1">
                <img v-else="scope.row.iconRelativePath" src="static/imgs/noImg.png" class="tableImg1">
              </div>
              <div>
            <img v-if="scope.row.iconRelativePath" :src="scope.row.iconRelativePath" class="tableImg">
            <img v-else="scope.row.iconRelativePath" src="static/imgs/noImg.png" class="tableImg"></div>

            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="站点名" align="center"></el-table-column>
        <el-table-column prop="url" label="站点网址" align="center"></el-table-column>
        <el-table-column prop="laguage" label="语言" align="center"></el-table-column>
        <el-table-column prop="isAutoPush" label="是否自动导入" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isAutoPush == 1">是</span>
            <span v-if="scope.row.isAutoPush != 1">否</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editorInfo(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="deleteInfo(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <el-dialog :visible.sync="addSiteBox" class="addSiteBox" :title="isAddSite?'新增站点':'修改站点'" width="30%">
      <el-form :model="siteForm" :inline="true" size="small">
        <el-form-item label=" 站点名字" required>
          <el-input v-model="siteForm.name" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label=" 站点地址" required>
          <el-input v-model="siteForm.url" placeholder="请输入网址"></el-input>
          </el-select>
        </el-form-item>
        <el-form-item label=" 是否自动导入优惠券" required>
          <el-radio v-model="siteForm.isAutoPush" label="1">是</el-radio>
          <el-radio v-model="siteForm.isAutoPush" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="　站点语言">
          <el-select v-model="siteForm.language" placeholder="请选择语言">
            <el-option label="English" value="english"></el-option>
            <el-option label="中文" value="chinese"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="margin-bottom:15px;color: #606266;font-weight: bold;">　站点图片上传</div>
      <div style="text-align: center;">
        <el-upload class="avatar-uploader" :action="fileUrl" :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="siteForm.iconRelativePath" :src="siteForm.iconRelativePath" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!--<el-upload class="avatar-uploader" action="" ref="upload" :auto-upload='false' :show-file-list="false" :on-change='changeUpload' accept="image/jpeg,image/gif,image/png,image/bmp">
          <img v-if="siteForm.icon" :src="siteForm.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>-->
        <el-button type="primary" @click="submitBtn" style="margin-top:20px;">　提　交　</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script src="./siteManage.js"></script>
