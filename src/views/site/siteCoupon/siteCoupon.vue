<style lang="scss" scoped>

</style>

<template>
  <section class="siteCouponPage">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
      <el-form-item label="关键字">
        <el-input v-model="searchForm.title" placeholder="请输入标题/商家"></el-input>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <el-select v-model="searchForm.type" placeholder="优惠券类型" style="width: 100px;">
          <el-option label="全部" value="0"></el-option>
          <el-option label="code" value="1"></el-option>
          <el-option label="deal" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否过期">
        <el-select v-model="searchForm.isPast" placeholder="是否过期" style="width: 100px;">
          <el-option label="全部" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否为人工创建">
        <el-select v-model="searchForm.isArtificial" placeholder="是否过期" style="width: 100px;">
          <el-option label="全部" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.state" placeholder="是否过期" style="width: 100px;">
          <el-option label="全部" value="0"></el-option>
          <el-option label="合格" value="1"></el-option>
          <el-option label="不合格" value="2"></el-option>
          <el-option label="未审核" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否查看新增的优惠券">
        <el-select v-model="searchForm.couponType" placeholder="请选择" style="width: 100px;">
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="searchSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData.tableList" stripe style="width: 100%" border>
      <el-table-column prop="id" label="ID" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isArtificial == 1">{{scope.row.id}}</span>
          <span v-if="scope.row.isArtificial == 2" style="color: red;">{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="couponName" label="原标题" align="center"></el-table-column>
      <el-table-column prop="couponNameNew" label="现标题" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center"></el-table-column>
      <el-table-column prop="code" label="code" align="center"></el-table-column>
      <el-table-column prop="describe" label="描述" align="center"></el-table-column>
      <el-table-column label="是否过期" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isPast == 1">否</span>
          <span v-if="scope.row.isPast == 2">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="pastTime" label="过期时间" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 1">合格</span>
          <span v-if="scope.row.state == 2">不合格</span>
          <span v-if="scope.row.state == 0">未审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editorInfo(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="isPassFun(scope.row,'yes')">合格</el-button>
          <el-button type="text" size="mini" @click="isPassFun(scope.row,'no')">不合格</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="paginationStyle" background layout="total ,prev, pager, next" @current-change="couponChange" :total="tableData.pageTotal" :page-size="tableData.pageSize"></el-pagination>

    <el-dialog :visible.sync="editorCouponsBox" class="checkCoupons" title="编辑优惠券" width="400px">
      <el-form :model="editorData" size="small" label-width="80px" label-position="left">

        <el-form-item label=" 现标题">
          <el-input v-model="editorData.couponNameNew" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label=" 描述" v-if="editorData.isArtificial==2">
          <el-input v-model="editorData.describe" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label=" code" v-if="editorData.isArtificial==2">
          <el-input v-model="editorData.code" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label=" 过期时间" v-if="editorData.isArtificial==2">
          <el-input v-model="editorData.pastTime" placeholder="请输入名字"></el-input>
        </el-form-item>
      </el-form>
      <section style="display: flex;justify-content: space-around;">
        <el-button type="danger" @click="deleteCoupon" size="small" v-if="editorData.isArtificial==2">删除</el-button>
        <el-button type="primary" @click="editorSubmit" size="small">提交</el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script src="./siteCoupon.js"></script>
