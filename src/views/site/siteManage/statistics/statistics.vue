<style scoped lang="scss">
  @import "../siteManage.scss";
</style>

<template>
  <section class="statisticsContent">
    <el-table :data="statDate" stripe style="width: 40%" border >
      <el-table-column prop="value1" label="商家数量" align="center"></el-table-column>
      <el-table-column prop="value2" label="优惠券数量" align="center"></el-table-column>
      <el-table-column prop="value4" label="有效优惠券数量" align="center"></el-table-column>
      <el-table-column prop="value3" label="有code数量" align="center"></el-table-column>
      <el-table-column prop="value4" label="无code数量" align="center"></el-table-column>
    </el-table>
  </section>
</template>

<script src="./statistics.js"></script>
