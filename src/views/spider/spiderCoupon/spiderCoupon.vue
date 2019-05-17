<style lang="scss" scoped>

</style>

<template>
  <section class="spiderCouponPage">
    <section v-if="!currPageInfo">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
        <el-form-item label="选择爬虫">
          <el-select v-model="searchForm.scrapy" placeholder="请选择爬虫">
            <el-option v-for="spiderItem in spiderList" :key="spiderItem.key" :value="spiderItem.key" :label="spiderItem.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="searchForm.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="优惠券类型">
          <el-select v-model="searchForm.typel" placeholder="优惠券类型">
            <el-option v-for="couponTypeItem in couponTypeList" :key="couponTypeItem.key" :value="couponTypeItem.key" :label="couponTypeItem.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否过期">
          <el-select v-model="searchForm.expired" placeholder="是否过期">
            <el-option v-for="expiryItem in expiryList" :key="expiryItem.key" :value="expiryItem.key" :label="expiryItem.value"></el-option>
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
