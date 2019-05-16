<style lang="scss" scoped>

</style>

<template>
  <section class="storeCheckPage">
    <section class="pageSearch" >
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
        <el-form-item label="关键字">
          <el-input v-model="searchForm.keyWord" placeholder="请输入商家名、官网"></el-input>
        </el-form-item>
        <el-form-item label="国家">
          <el-select v-model="searchForm.country" placeholder="请选择国家">
            <el-option label="全部" value="0"></el-option>
            <el-option label="美国" value="1"></el-option>
            <el-option label="英国" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信息是否完整">
          <el-select v-model="searchForm.fullInfo" placeholder="请选择分类">
            <el-option label="全部" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="searchForm.storeState" placeholder="请选择分类">
            <el-option label="全部" value="0"></el-option>
            <el-option label="合格" value="1"></el-option>
            <el-option label="不合格" value="2"></el-option>
            <el-option label="未审核" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排除爬虫列表">
          <el-select v-model="searchForm.spiderSite" placeholder="请选择爬虫站">
            <el-option label="全部" value="0"></el-option>
            <el-option label="爬虫1" value="1"></el-option>
            <el-option label="爬虫2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="站点列表">
          <el-select v-model="searchForm.site" placeholder="请选择站点">
            <el-option label="站点1" value="1"></el-option>
            <el-option label="站点2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 有效优惠券范围">
          <el-input v-model="searchForm.couponNum" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <section style="float: right;margin-bottom: 10px;">
        <el-button type="primary" @click="batchAdd" size="mini" v-show="!isBatch">批量添加</el-button>
        <el-button type="primary" @click="batchSubmit" size="mini" v-show="isBatch">批量加入站点</el-button>
        <el-button type="primary" @click="batchPass" size="mini" v-show="isBatch">批量合格</el-button>
        <el-button type="primary" @click="batchCancel" size="mini" v-show="isBatch">取消操作</el-button>
      </section>
      <el-table :data="tableData.tableList" stripe style="width: 100%" border @selection-change="selectStore" @row-click="checkRow" ref="storeListTable">
        <el-table-column type="selection" width="55" align="center" v-if="isBatch"></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="storeName" label="商家名" align="center"></el-table-column>
        <el-table-column prop="website" label="官网" align="center">
          <template slot-scope="scope">
            <a href="https://www.baidu.com" target="_blank">{{scope.row.website}}</a>
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
        <el-table-column prop="spiderType" label="爬虫分类" align="center"></el-table-column>
        <el-table-column label="有效优惠券数量" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.couponNum}}/{{scope.row.couponNumTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="lastUpdateTime" label="更新时间" align="center"></el-table-column>
        <el-table-column prop="lastAddTime" label="优惠券最后新增时间" align="center"></el-table-column>
        <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editorInfo(scope.row)" style="margin-left: 20px;">编辑</el-button>
            <el-button type="text" size="mini" @click="joinSite(scope.row)">加入站点</el-button>
            <el-button type="text" size="mini" @click="pass(scope.row)">合格</el-button>
            <el-button type="text" size="mini" @click="noPass(scope.row)">不合格</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="paginationStyle" background layout="total ,prev, pager, next" @current-change="storeChange" :total="tableData.pageTotal" :page-size="tableData.pageSize"></el-pagination>
    </section>

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

<script src="./storeCheck.js"></script>
