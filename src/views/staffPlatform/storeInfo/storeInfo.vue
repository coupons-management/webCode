<style lang="scss" scoped>
</style>

<template>
  <section class="spiderStorePage">
    <section class="pageSearch">
     <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
        <el-form-item label="关键字">
          <el-input v-model="searchForm.search" placeholder="请输入商家名、官网"></el-input>
        </el-form-item>
       <el-form-item label="商家分类">
         <el-select v-model="searchForm.typeId" placeholder="请选择分类" style="width: 180px;" filterable clearable>
           <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
         </el-select>
       </el-form-item>
       <el-form-item label=" 有效优惠券范围">
         <el-input v-model="searchForm.rangeStart" placeholder="请输入数量" style="width:120px;"></el-input>~
         <el-input v-model="searchForm.rangeEnd" placeholder="请输入数量" style="width:120px;"></el-input>
       </el-form-item>
       <el-form-item label=" 站点">
         <el-select v-model="searchForm.outId">
           <el-option :label="siteItem.name" :value="siteItem.id" v-for="siteItem in siteList"></el-option>
         </el-select>
       </el-form-item>
        <!--<el-form-item label="国家">
          <el-select v-model="searchForm.country" placeholder="请选择国家">
            <el-option
              v-for="countryItem in countryList"
              :key="countryItem.key"
              :value="countryItem.key"
              :label="countryItem.value"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <!--<el-form-item label="数据源分类">
          <el-select v-model="searchForm.scrapyType" placeholder="请选择分类" filterable clearable>
            <el-option
              v-for="typeItem in typeList"
              :key="typeItem.key"
              :value="typeItem.id"
              :label="typeItem.name"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <!-- <el-form-item label=" 有效优惠券范围">
          <el-input type="number" v-model="searchForm.validCouponsCount" placeholder="请输入数量"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="searchSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData.list" stripe style="width: 100%" border>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="storeName" label="商家名" align="center"></el-table-column>
        <el-table-column label="官网" align="center">
          <template slot-scope="scope">
            <a :href="scope.row.webSite" target="view_window">{{scope.row.webSite}}</a>
          </template>
        </el-table-column>
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
            <el-tooltip
              class="item"
              effect="light"
              placement="right"
              v-if="scope.row.showSiteNameList"
            >
              <div slot="content">
                <div v-for="item in scope.row.showSiteNameList" class="sitList">{{item}}</div>
              </div>
              <div>{{scope.row.showSiteNameList.length}}</div>
            </el-tooltip>
            <div v-else>0</div>
          </template>
        </el-table-column>
        <el-table-column label="来源站" align="center">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="light"
              placement="right"
              v-if="scope.row.scrapyList.length>0"
            >
              <div slot="content">
                <div v-for="item in scope.row.scrapyList" class="sitList">{{item}}</div>
              </div>
              <div>{{scope.row.scrapyList.length}}</div>
            </el-tooltip>
            <div v-else>0</div>
          </template>
        </el-table-column>
        <el-table-column prop="toalCount" label="有效优惠券数量" align="center">
        </el-table-column>
        <el-table-column prop="addTime" label="创建时间" align="center"></el-table-column>
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
    </section>

    <el-dialog
      :visible.sync="checkCouponsBox"
      class="checkCoupons"
      title="查看优惠券"
      width="80%"
      top="2%"
    >
      <couponTable :currPageInfo="currPageInfo"></couponTable>
    </el-dialog>

    <el-dialog :visible.sync="editorStoreBox" class="editorStore" title="商家编辑" width="30%">
      <el-form :model="editorData" size="small" label-width="80px" label-position="left">
        <el-form-item label=" 商家名" required>
          <el-col :span="11">
            <el-input v-model="editorData.name" placeholder="请输入名字"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商家分类">
          <el-select v-model="editorData.typeId" placeholder="请选择商家分类" filterable clearable>
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
  </section>
</template>

<script src="./storeInfo.js"></script>
