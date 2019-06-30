<style lang="scss" scoped>
.tableImg {
  width: 50px;
  height: 50px;
}
.tableImg1 {
  width: 200px;
  height: 200px;
}
.sitList {
  padding: 10px 0;
  min-width: 100px;
  font-size: 14px;
  text-align: center;
  border-bottom: 1px solid lightgrey;
}
.sitList:last-child {
  border: 0;
}
.paginationStyle {
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
  border-color: #409eff;
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
.el-upload-list__item-name {
  display: none;
}
</style>

<template>
  <section class="spiderMaintainPage">
    <span style="color:grey;">选择数据源：</span>
    <el-select v-model="spiderId" placeholder="请选择数据源" @change="handleSelectChange">
      <el-option
        v-for="spiderItem in spiderList"
        :key="spiderItem.key"
        :value="spiderItem.key"
        :label="spiderItem.value"
      ></el-option>
    </el-select>
    <el-date-picker
      v-model="time"
      type="daterange"
      range-separator="－"
      value-format="timestamp"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="handleSelectChange"
    ></el-date-picker>
    <el-radio-group v-model="range" style="margin: 20px 30px;" @change="handleSelectChange">
      <el-radio-button label="1">有新增优惠券的商家</el-radio-button>
      <el-radio-button label="2">无新增优惠券的商家</el-radio-button>
      <el-radio-button label="3">新增的商家</el-radio-button>
    </el-radio-group>
    <el-table :data="tableData.list" stripe style="width: 100%" border>
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="name" label="商家名" align="center"></el-table-column>
      <el-table-column prop="website" label="官网" align="center"></el-table-column>
      <el-table-column label="LOGO" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" placement="right">
            <div slot="content">
              <img v-if="scope.row.logo" :src="scope.row.logo" class="tableImg1" />
              <img v-else="scope.row.logo" src="static/imgs/noImg.png" class="tableImg1" />
            </div>
            <div>
              <img v-if="scope.row.logo" :src="scope.row.logo" class="tableImg" />
              <img v-else="scope.row.logo" src="static/imgs/noImg.png" class="tableImg" />
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="在展示站" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" placement="right">
            <div slot="content">
              <div v-for="item in scope.row.showSiteNameList" class="sitList">{{item}}</div>
            </div>
            <div>{{scope.row.showSiteNameList&&scope.row.showSiteNameList.length}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="在爬虫站" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" placement="right">
            <div slot="content">
              <div v-for="item in scope.row.spiderSiteNameList" class="sitList">{{item}}</div>
            </div>
            <div>{{scope.row.spiderSiteNameList&&scope.row.spiderSiteNameList.length}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="scrapyType" label="数据源分类" align="center"></el-table-column>
      <el-table-column label="有效优惠券数量" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.validCouponsCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
      <el-table-column prop="couponUpdateTime" label="优惠券最后新增时间" align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editorInfo(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="checkCoupons(scope.row)">查看优惠券</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="paginationStyle"
      background
      layout="total ,prev, pager, next"
      @current-change="storeChange"
      :total="tableData.totalCount"
      :page-size="tableData.pageSize"
    ></el-pagination>

    <el-dialog :visible.sync="checkCouponsBox" class="checkCoupons" title="查看优惠券" width="60%">
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
          <el-select v-model="editorData.country" placeholder="请选择语言">
            <el-option
              v-for="countryItem in countryList"
              :key="countryItem.key"
              :value="countryItem.key"
              :label="countryItem.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="margin-bottom:15px;color: #606266;font-weight: bold;">站点图片上传</div>
      <div style="text-align: center;">
        <el-upload
          class="avatar-uploader"
          :action="fileUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="editorData.logo" :src="editorData.logo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="primary" @click="editorSubmit" style="margin-top:20px;">提 交</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog :visible.sync="editorStoreBox" class="editorStore" title="商家编辑" width="60%" top="3%">
      <el-form :model="editorData" size="small" label-width="140px" :inline="true">
        <div>
          <el-form-item label="id">
            <el-input v-model="editorData.id" placeholder="请输入id" disabled></el-input>
          </el-form-item>

          <el-form-item label="优惠券最后新增时间">
            <el-input v-model="editorData.endTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="商家名">
            <el-input v-model="editorData.storeName" placeholder="请输入商家名"></el-input>
          </el-form-item>
          <el-form-item label="官网">
            <el-input v-model="editorData.webSite" disabled></el-input>
          </el-form-item>
          <el-form-item label="商家类别">
            <el-select v-model="editorData.category" placeholder="请选择语言">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="加入时间">
            <el-input v-model="editorData.addTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="优惠券点击总次数">
            <el-input v-model="editorData.couponCount"></el-input>
          </el-form-item>
          <el-form-item label="国家">
            <el-select v-model="editorData.country" placeholder="请选择语言">
              <el-option
                v-for="countryItem in countryList"
                :key="countryItem.key"
                :value="countryItem.key"
                :label="countryItem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告地址">
            <el-input v-model="editorData.adAddress"></el-input>
          </el-form-item>
          <el-form-item label="商家浏览次数">
            <el-input v-model="editorData.storeCount" placeholder="请输入商家浏览次数"></el-input>
          </el-form-item>

          <el-form-item label="是否只显示人工增加优惠券" label-width="180px">
            <el-radio v-model="editorData.isManual" label="1">是</el-radio>
            <el-radio v-model="editorData.isManual" label="2">否</el-radio>
          </el-form-item>
        </div>
        <el-form-item label="title">
          <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editorData.title"></el-input>
        </el-form-item>
        <el-form-item label="keywords">
          <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editorData.keywords"></el-input>
        </el-form-item>
        <el-form-item label="description">
          <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editorData.des"></el-input>
        </el-form-item>
        <el-form-item label="商家展示名称">
          <el-input type="textarea" placeholder="请输入内容" :rows="5" v-model="editorData.showName"></el-input>
        </el-form-item>
        <el-form-item label="商家介绍">
          <el-input type="textarea" placeholder="请输入内容" :rows="5" v-model="editorData.storeDes"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom:15px;color: #606266;font-weight: bold;margin-left: 45px;">商家图片上传</div>
      <div style="text-align: center">
        <el-upload
          class="avatar-uploader"
          :action="fileUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="editorData.logo" :src="editorData.logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="primary" @click="editorSubmit" style="margin-top:20px;">提 交</el-button>
      </div>
    </el-dialog>-->
  </section>
</template>

<script src="./spiderMaintain.js"></script>
