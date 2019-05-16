<style lang="scss" scoped>


</style>

<template>
  <section class="siteStorePage">
    <section class="pageSearch" >
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
        <el-form-item label="关键字">
          <el-input v-model="searchForm.keyWord" placeholder="商家名、官网、标签"></el-input>
        </el-form-item>
        <el-form-item label="国家">
          <el-select v-model="searchForm.country" placeholder="请选择国家" style="width: 120px;">
            <el-option label="全部" value="0"></el-option>
            <el-option label="美国" value="1"></el-option>
            <el-option label="英国" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="站点分类">
          <el-select v-model="searchForm.spiderType" placeholder="请选择分类" style="width: 120px;">
            <el-option label="全部" value="0"></el-option>
            <el-option label="分类1" value="1"></el-option>
            <el-option label="分类2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="searchForm.tags" placeholder="请选择标签">
            <el-option label="全部" value="0"></el-option>
            <el-option label="标签1" value="1"></el-option>
            <el-option label="标签2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商家类型">
          <el-select v-model="searchForm.storeType" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="有新增优惠券的商家" value="1"></el-option>
            <el-option label="无新增优惠券的商家" value="2"></el-option>
            <el-option label="新增的商家" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 有效优惠券范围">
          <el-input v-model="searchForm.couponNum" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="value6" type="daterange" range-separator="－" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubmit">查询</el-button>
          <el-button type="primary" @click="searchSubmit">新增</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData.tableList" stripe style="width: 100%" border>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="storeName" label="商家名" align="center">
          <template slot-scope="scope">
            <router-link to="/websiteFir" target="_blank">
              <a>{{scope.row.storeName}}</a>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="website" label="官网" align="center">
          <template slot-scope="scope">
            <a :href="scope.row.website" target="view_window">{{scope.row.website}}</a>
          </template>
        </el-table-column>
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
        <el-table-column prop="spiderType" label="站点分类" align="center"></el-table-column>
        <el-table-column label="有效优惠券数量" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.couponNum}}/{{scope.row.couponNumTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="加入时间" align="center"></el-table-column>
        <el-table-column prop="lastAddTime" label="优惠券最后新增时间" align="center"></el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editorInfo(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="statInfo(scope.row)">报表</el-button>
            <el-button type="text" size="mini" @click="deleteStore(scope.row)">删除</el-button>
            <el-button type="text" size="mini" @click="checkCoupons(scope.row)" style="margin-left: 10px;">查看优惠券</el-button>
            <el-button type="text" size="mini" @click="addCoupon(scope.row)">新增优惠券</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="paginationStyle" background layout="total ,prev, pager, next" @current-change="storeChange" :total="tableData.pageTotal" :page-size="tableData.pageSize"></el-pagination>
    </section>

    <el-dialog :visible.sync="editorStoreBox" class="editorStore" title="商家编辑" width="60%" top="3%">
      <el-form :model="editorData" size="small" label-width="140px" :inline="true">
        <el-form-item label="id">
          <el-input v-model="editorData.id" placeholder="请输入id" disabled></el-input>
        </el-form-item>

        <el-form-item label="优惠券最后新增时间">
          <el-input v-model="editorData.website" disabled></el-input>
        </el-form-item>
        <el-form-item label="商家名">
          <el-input v-model="editorData.website" placeholder="请输入官网"></el-input>
        </el-form-item>
        <el-form-item label="官网">
          <el-input v-model="editorData.website" disabled></el-input>
        </el-form-item>
        <el-form-item label="站点分类">
          <el-select v-model="editorData.category" placeholder="请选择语言">
            <el-option label="分类1" value="1"></el-option>
            <el-option label="分类2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加入时间">
          <el-input v-model="editorData.website" disabled></el-input>
        </el-form-item>
        <el-form-item label="优惠券点击总次数">
          <el-input v-model="editorData.website"></el-input>
        </el-form-item>
        <el-form-item label="国家">
          <el-select v-model="editorData.country" placeholder="请选择语言">
            <el-option label="美国" value="1"></el-option>
            <el-option label="中国" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告地址">
          <el-input v-model="editorData.website"></el-input>
        </el-form-item>
        <el-form-item label="商家浏览次数">
          <el-input v-model="editorData.name" placeholder="请输入商家名"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="editorData.tags" multiple collapse-tags placeholder="请选择">
            <el-option v-for="item in tagList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否只显示人工增加优惠券" label-width="180px">
          <el-radio v-model="editorData.radio" label="1">是</el-radio>
          <el-radio v-model="editorData.radio" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="title">
          <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editorData.textarea2"></el-input>
        </el-form-item>
        <el-form-item label="keywords">
          <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editorData.textarea2"></el-input>
        </el-form-item>
        <el-form-item label="description">
          <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editorData.textarea2"></el-input>
        </el-form-item>
        <el-form-item label="商家展示名称">
          <el-input type="textarea" placeholder="请输入内容" :rows="5" v-model="editorData.textarea2"></el-input>
        </el-form-item>
        <el-form-item label="商家介绍">
          <el-input type="textarea" placeholder="请输入内容" :rows="5" v-model="editorData.textarea2"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom:15px;color: #606266;font-weight: bold;margin-left: 45px;">商家图片上传</div>
      <div style="text-align: center">
        <el-upload class="avatar-uploader" :action="fileUrl" :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="editorData.logoUrl" :src="editorData.logoUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="primary" @click="editorSubmit" style="margin-top:20px;">　提　交　</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script src="./siteStore.js"></script>
