<style scoped lang="scss">
@import "../siteManage.scss";
</style>

<template>
  <section class="statisticsContent">
    <el-table :data="data" stripe style="width: 40%" border>
      <el-table-column prop="storeNum" label="商家数量" align="center"></el-table-column>
      <el-table-column prop="couponNum" label="优惠券数量" align="center"></el-table-column>
      <el-table-column prop="validCouponNum" label="有效优惠券数量" align="center"></el-table-column>
      <el-table-column prop="codeCouponNum" label="有code数量" align="center"></el-table-column>
      <el-table-column prop="dealCouponNum" label="无code数量" align="center"></el-table-column>
    </el-table>
  </section>
</template>

<script src="./statistics.js"></script>
