<style lang="scss" scoped>
</style>

<template>
  <section class="siteCouponPage">
    <el-form
      v-if="!currPageInfo"
      :inline="true"
      :model="searchForm"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="关键字">
        <el-input v-model="searchForm.search" placeholder="请输入标题/商家"></el-input>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <el-select v-model="searchForm.couponType" placeholder="优惠券类型" style="width: 150px;">
          <el-option
            v-for="couponTypeItem in couponTypeList"
            :key="couponTypeItem.key"
            :value="couponTypeItem.key"
            :label="couponTypeItem.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否过期">
        <el-select v-model="searchForm.expiry" placeholder="是否过期" style="width: 150px;">
          <el-option
            v-for="expiryItem in expiryList"
            :key="expiryItem.key"
            :value="expiryItem.key"
            :label="expiryItem.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据来源">
        <el-select v-model="searchForm.cteateType" placeholder="是否过期" style="width: 150px;">
          <el-option
            v-for="sourceItem in dataSourceList"
            :key="sourceItem.key"
            :value="sourceItem.key"
            :label="sourceItem.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.state" placeholder="是否过期" style="width: 150px;">
          <el-option
            v-for="approvalItem in approvalList"
            :key="approvalItem.key"
            :value="approvalItem.key"
            :label="approvalItem.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="是否查看新增的优惠券">
        <el-select v-model="searchForm.couponType" placeholder="请选择" style="width: 100px;">
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" @click="searchSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData.list" stripe style="width: 100%" border size="mini">
      <el-table-column prop="id" label="ID" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.inType == 0">{{scope.row.id}}</span>
          <span v-if="scope.row.inType == 1" style="color: red;">{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sourceTitle" label="原标题" align="center"></el-table-column>
      <el-table-column prop="currentTitle" label="本站标题" align="center"></el-table-column>
      <el-table-column prop="couponType" label="类型" align="center"></el-table-column>
      <el-table-column prop="code" label="code" align="center"></el-table-column>
      <el-table-column prop="description" label="描述" align="center"></el-table-column>
      <el-table-column label="是否过期" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.expired == true">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="expiryTime" label="过期时间" align="center">
        <template slot-scope="scope">
          <span>{{!currPageInfo?changeDate(scope.row.expiryTime):changeDate(scope.row.expireAt)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" v-if="scope.row.isPass == 0">待审核</el-button>
          <el-button type="success" size="mini" v-else-if="scope.row.isPass == 1">合 格</el-button>
          <el-button type="danger" size="mini" v-else="scope.row.isPass == 2">不合格</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{changeDate(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editorInfo(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="isPassFun(scope.row,1)">合格</el-button>
          <el-button type="text" size="mini" @click="isPassFun(scope.row,2)">不合格</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="paginationStyle"
      background
      layout="total ,prev, pager, next"
      @current-change="couponChange"
      :total="tableData.totalCount"
      :page-size="tableData.pageSize"
    ></el-pagination>

    <el-dialog
      :visible.sync="editorCouponsBox"
      class="checkCoupons"
      title="编辑优惠券"
      width="400px"
      :modal-append-to-body="false"
      append-to-body
    >
      <el-form :model="editorData" size="small" label-width="80px" label-position="left">
        <el-form-item label=" 现标题">
          <el-input v-model="editorData.currentTitle" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label=" 描述" v-if="editorData.inType==1">
          <el-input v-model="editorData.description" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label=" code" v-if="editorData.inType==1">
          <el-input v-model="editorData.code" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label=" 过期时间" v-if="editorData.inType==1">
          <el-input v-model="editorData.pastTime" placeholder="请输入名字"></el-input>
        </el-form-item>
      </el-form>
      <section style="display: flex;justify-content: space-around;">
        <el-button type="danger" @click="deleteCoupon" size="small" v-if="editorData.inType==1">删除</el-button>
        <el-button type="primary" @click="editorSubmit" size="small">提交</el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script src="./siteCoupon.js"></script>
