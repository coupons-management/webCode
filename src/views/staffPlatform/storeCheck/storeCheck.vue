<style lang="scss" scoped>
</style>

<template>
  <section class="storeCheckPage">
    <section class="pageSearch">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
        <el-form-item label="关键字">
          <el-input v-model="searchForm.search" placeholder="请输入商家名、官网"></el-input>
        </el-form-item>
        <el-form-item label="国家">
          <el-select v-model="searchForm.country" placeholder="请选择国家">
            <el-option
              v-for="countryItem in countryList"
              :key="countryItem.key"
              :value="countryItem.key"
              :label="countryItem.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信息是否完整">
          <el-select v-model="searchForm.isComplete" placeholder="请选择分类">
            <el-option
              v-for="completeItem in isCompleteList"
              :key="completeItem.key"
              :value="completeItem.key"
              :label="completeItem.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="searchForm.approval" placeholder="请选择分类">
            <el-option
              v-for="approvalItem in approvalList"
              :key="approvalItem.key"
              :value="approvalItem.key"
              :label="approvalItem.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据源">
          <el-select v-model="searchForm.spiderId" placeholder="请选择数据源">
            <el-option
              v-for="spiderItem in spiderList"
              :key="spiderItem.key"
              :value="spiderItem.key"
              :label="spiderItem.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排除站点列表">
          <el-select v-model="searchForm.siteId" placeholder="请选择站点">
            <el-option :key="Date.now()" value label="无"></el-option>
            <el-option
              v-for="siteItem in siteList"
              :key="siteItem.id"
              :value="siteItem.id"
              :label="siteItem.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 有效优惠券范围">
          <el-input v-model="searchForm.rangeStart" placeholder="请输入数量" style="width:120px;"></el-input>~
          <el-input v-model="searchForm.rangeEnd" placeholder="请输入数量" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <section style="float: right;margin-bottom: 10px;">
        <el-button type="primary" @click="batchAdd" size="mini" v-show="!isBatch">批量操作</el-button>
        <el-button type="primary" @click="batchSubmit" size="mini" v-show="isBatch">批量加入站点</el-button>
        <el-button type="primary" @click="batchPass" size="mini" v-show="isBatch">批量合格</el-button>
        <el-button type="primary" @click="batchCancel" size="mini" v-show="isBatch">取消操作</el-button>
      </section>
      <el-table
        :data="tableData.list"
        stripe
        style="width: 100%"
        border
        @selection-change="selectStore"
        @row-click="checkRow"
        ref="storeListTable"
      >
        <el-table-column type="selection" width="55" align="center" v-if="isBatch"></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="name" label="商家名" align="center"></el-table-column>
        <el-table-column label="官网" align="center">
          <template slot-scope="scope">
            <a href="scope.row.website" target="_blank">{{scope.row.website}}</a>
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
        <el-table-column prop="scrapyType" label="爬虫分类" align="center"></el-table-column>
        <el-table-column prop="validCouponsCount" label="有效优惠券数量" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
        <el-table-column prop="couponUpdateTime" label="优惠券最后新增时间" align="center"></el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" v-if="scope.row.approval == 0">待审核</el-button>
            <el-button type="success" size="mini" v-else-if="scope.row.approval == 1">合 格</el-button>
            <el-button type="danger" size="mini" v-else="scope.row.approval == 2">不合格</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="editorInfo(scope.row)"
              style="margin-left: 20px;"
            >编辑</el-button>
            <el-button type="text" size="mini" @click="joinSite(scope.row)">加入站点</el-button>
            <el-button type="text" size="mini" @click="pass(scope.row,1)">合格</el-button>
            <el-button type="text" size="mini" @click="pass(scope.row,2)">不合格</el-button>
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

    <el-dialog :visible.sync="editorStoreBox" class="editorStore" title="商家编辑" width="30%">
      <el-form :model="editorData" size="small" label-width="80px" label-position="left">
        <el-form-item label=" 商家名" required>
          <el-col :span="11">
            <el-input v-model="editorData.name" placeholder="请输入名字"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商家分类">
          <el-select v-model="editorData.typeId" placeholder="请选择商家分类">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
  </section>
</template>

<script src="./storeCheck.js"></script>
