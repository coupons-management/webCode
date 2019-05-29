<style lang="scss" scoped>

</style>

<template>
  <section class="dataStatPage">

    <span style="color:grey;">选择爬虫：</span>
    <el-select v-model="spiderSite" placeholder="请选择分类">
      <el-option label="爬虫1" value="0"></el-option>
      <el-option label="爬虫2" value="1"></el-option>
      <el-option label="爬虫3" value="2"></el-option>
    </el-select>
    <el-date-picker v-model="chooseTime" type="daterange" range-separator="－" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
    <el-button type="primary" @click="searchSubmit" size="small">查询</el-button>

    <el-table :data="tableData.tableList" stripe style="width: 100%;margin-top: 20px;" border>
      <el-table-column prop="startTime" label="开始时间" align="center"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" align="center"></el-table-column>
      <el-table-column prop="storeNum" label="商家数量" align="center"></el-table-column>
      <el-table-column prop="newStoreNum" label="新增商家数量" align="center"></el-table-column>
      <el-table-column prop="addNewStoreNum" label="新增优惠券的商家数量" align="center"></el-table-column>
      <el-table-column prop="couponNum" label="优惠券数量" align="center"></el-table-column>
      <el-table-column prop="newCouponNum" label="新增优惠券数量" align="center"></el-table-column>
    </el-table>

    <el-pagination class="paginationStyle" background layout="total ,prev, pager, next" @current-change="tableChange" :total="tableData.pageTotal" :page-size="tableData.pageSize"></el-pagination>
  </section>
</template>

<script src="./dataStat.js"></script>
