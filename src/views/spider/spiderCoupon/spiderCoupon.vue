<style lang="scss" scoped>

</style>

<template>
  <section class="spiderCouponPage">
    <section v-if="!currPageInfo">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
        <el-form-item label="选择爬虫">
          <el-select v-model="searchForm.spiderSite" placeholder="请选择爬虫">
            <el-option label="爬虫1" value="0"></el-option>
            <el-option label="爬虫2" value="1"></el-option>
            <el-option label="爬虫3" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="searchForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="优惠券类型">
          <el-select v-model="searchForm.type" placeholder="优惠券类型">
            <el-option label="全部" value="0"></el-option>
            <el-option label="code" value="1"></el-option>
            <el-option label="deal" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否过期">
          <el-select v-model="searchForm.isPast" placeholder="是否过期">
            <el-option label="全部" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="storeName" label="商家名" align="center"></el-table-column>
        <el-table-column prop="couponName" label="原标题" align="center"></el-table-column>
        <el-table-column prop="code" label="类型" align="center"></el-table-column>
        <el-table-column prop="describe" label="描述" align="center"></el-table-column>
        <el-table-column prop="isPast" label="是否过期" align="center"></el-table-column>
        <el-table-column prop="pastTime" label="过期时间" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      </el-table>
    </section>

    <section v-if="currPageInfo">
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="couponName" label="原标题" align="center"></el-table-column>
        <el-table-column prop="code" label="类型" align="center"></el-table-column>
        <el-table-column prop="describe" label="描述" align="center"></el-table-column>
        <el-table-column prop="isPast" label="是否过期" align="center"></el-table-column>
        <el-table-column prop="pastTime" label="过期时间" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      </el-table>
    </section>

  </section>
</template>

<script src="./spiderCoupon.js"></script>
