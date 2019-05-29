<style lang="scss" scoped>
  .tableImg{
    width: 50px;
    height: 50px;
  }
  .tableImg1{
    width: 200px;
    height: 200px;
  }
  .sitList{
    padding: 10px 0;
    min-width: 100px;
    font-size: 14px;
    text-align: center;
    border-bottom: 1px solid lightgrey;
  }
  .sitList:last-child{
    border: 0;
  }
  .paginationStyle{
    text-align: right;
    margin: 20px 10px;
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
</style>

<template>
  <section class="spiderMaintainPage">

    <span style="color:grey;">选择爬虫：</span>
    <el-select v-model="spiderSite" placeholder="请选择分类">
      <el-option label="爬虫1" value="0"></el-option>
      <el-option label="爬虫2" value="1"></el-option>
      <el-option label="爬虫3" value="2"></el-option>
    </el-select>
    <el-date-picker v-model="value6" type="daterange" range-separator="－" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
    <el-radio-group v-model="radio3" style="margin: 20px 30px;">
      <el-radio-button label="1">有新增优惠券的商家</el-radio-button>
      <el-radio-button label="2">无新增优惠券的商家</el-radio-button>
      <el-radio-button label="3">新增的商家</el-radio-button>
    </el-radio-group>
    <el-table :data="tableData.tableList" stripe style="width: 100%" border>
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="storeName" label="商家名" align="center"></el-table-column>
      <el-table-column prop="website" label="官网" align="center"></el-table-column>
      <el-table-column label="LOGO" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" placement="right">
            <div slot="content">
              <img v-if="scope.row.logo" :src="scope.row.logo" class="tableImg1">
              <img v-else="scope.row.logo" src="static/imgs/noImg.png" class="tableImg1">
            </div>
            <div>
              <img v-if="scope.row.logo" :src="scope.row.logo" class="tableImg">
              <img v-else="scope.row.logo" src="static/imgs/noImg.png" class="tableImg">
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="在展示站" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" placement="right">
            <div slot="content">
              <div v-for="item in scope.row.sitList" class="sitList">{{item.name}}</div>
            </div>
            <div>{{scope.row.sitNum}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="在爬虫站" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" placement="right">
            <div slot="content">
              <div v-for="item in scope.row.spiderSitList" class="sitList">{{item.name}}</div>
            </div>
            <div>{{scope.row.spiderSitNum}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="spiderType" label="爬虫分类" align="center"></el-table-column>
      <el-table-column label="有效优惠券数量" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.couponNum}}/{{scope.row.couponNumTotal}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="lastUpdateTime" label="更新时间" align="center"></el-table-column>
      <el-table-column prop="lastAddTime" label="优惠券最后新增时间" align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editorInfo(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="checkCoupons(scope.row)">查看优惠券</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="paginationStyle" background layout="total ,prev, pager, next" @current-change="storeChange" :total="tableData.pageTotal" :page-size="tableData.pageSize"></el-pagination>

    <el-dialog :visible.sync="checkCouponsBox" class="checkCoupons" title="查看优惠券">
      <couponTable :currPageInfo="currPageInfo"></couponTable>
    </el-dialog>

    <el-dialog :visible.sync="editorStoreBox" class="editorStore" title="商家编辑" width="30%">
      <el-form :model="editorData" size="small" label-width="80px" label-position="left">
        <el-form-item label=" 商家名" required>
          <el-col :span="11">
            <el-input v-model="editorData.name" placeholder="请输入名字"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="　国家">
          <el-select v-model="editorData.language" placeholder="请选择语言">
            <el-option label="美国" value="english"></el-option>
            <el-option label="中国" value="chinese"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="margin-bottom:15px;color: #606266;font-weight: bold;">　站点图片上传</div>
      <div style="text-align: center;">
        <el-upload class="avatar-uploader" :action="fileUrl" :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="editorData.logoUrl" :src="editorData.logoUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="primary" @click="editorSubmit" style="margin-top:20px;">　提　交　</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script src="./spiderMaintain.js"></script>
