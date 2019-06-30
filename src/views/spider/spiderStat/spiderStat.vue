<style lang="scss" scoped>
</style>

<template>
  <section class="spiderStatPage">
    <span style="color:grey;">选择数据源：</span>
    <el-select v-model="spiderId" placeholder="请选择数据源" @change="handleSelectChange">
      <el-option
        v-for="spiderItem in spiderList"
        :key="spiderItem.key"
        :value="spiderItem.key"
        :label="spiderItem.value"
      ></el-option>
    </el-select>
    <el-date-picker
      v-model="time"
      type="daterange"
      range-separator="－"
      value-format="timestamp"
      start-placeholder="开始日期"
      end-placeholder="结束日期"

      @change="handleSelectChange"
    ></el-date-picker>
    <el-radio-group v-model="range" style="margin: 20px 30px;" @change="handleSelectChange">
      <el-radio-button label="1">按日</el-radio-button>
      <el-radio-button label="2">按周</el-radio-button>
      <el-radio-button label="3">按月</el-radio-button>
    </el-radio-group>
    <el-radio-group v-model="type" style="margin:20px 30px;" @change="handleSelectChange">
      <el-radio-button label="1">报表统计</el-radio-button>
      <el-radio-button label="2">商家统计</el-radio-button>
    </el-radio-group>

    <el-table :data="data" stripe style="width: 100%" border v-show="type == 1">
      <el-table-column prop="date" label="日期" align="center"></el-table-column>
      <el-table-column prop="incrementStore" label="新增商家数量" align="center"></el-table-column>
      <el-table-column prop="updateStore" label="更新的商家数量" align="center"></el-table-column>
      <el-table-column prop="incrementCoupon" label="新增优惠券数量" align="center"></el-table-column>
      <el-table-column prop="validCoupon" label="有效优惠券总数" align="center"></el-table-column>
      <el-table-column prop="totalCoupon" label="优惠券总数" align="center"></el-table-column>
    </el-table>
    <section
      v-show="type == 2"
      style="color: darkgrey;margin-bottom: 10px;font-size: 14px;"
    >以下数量为：商家的有效优惠券数量</section>
    <el-table :data="storeData" stripe style="width: 100%" border v-show="type == 2">
      <el-table-column prop="date" label="日期" align="center"></el-table-column>
      <el-table-column prop="num1" label="数量为0" align="center"></el-table-column>
      <el-table-column prop="num2" label="数量1-3" align="center"></el-table-column>
      <el-table-column prop="num3" label="数量4-6" align="center"></el-table-column>
      <el-table-column prop="num4" label="数量>=7" align="center"></el-table-column>
    </el-table>
  </section>
</template>

<script src="./spiderStat.js"></script>
