<style lang="scss" scoped>

</style>

<template>
  <section class="dataStatPage">
    <el-date-picker v-model="value6" type="daterange" range-separator="－" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
    <span style="margin:0 5px 0 20px;color: grey;">站点选择:</span>
    <el-select v-model="chooseSite" placeholder="请选择爬虫站">
      <el-option label="全部爬虫" value="0"></el-option>
      <el-option label="站点1" value="1"></el-option>
      <el-option label="站点2" value="2"></el-option>
    </el-select>
    <el-radio-group v-model="radio3" style="margin: 20px 30px;">
      <el-radio-button label="1">按日</el-radio-button>
      <el-radio-button label="2">按周</el-radio-button>
      <el-radio-button label="3">按月</el-radio-button>
    </el-radio-group>
    <el-radio-group v-model="radio4" style="margin:20px 30px;">
      <el-radio-button label="1">报表统计</el-radio-button>
      <el-radio-button label="2">商家统计</el-radio-button>
    </el-radio-group>

    <el-table :data="totalStat.totalList" stripe style="width: 100%" border v-show="radio4 == 1">
      <el-table-column prop="date" label="日期" align="center"></el-table-column>
      <el-table-column prop="newStoreNum" label="新增商家数量" align="center"></el-table-column>
      <el-table-column prop="storeNum" label="更新的商家数量" align="center">
        <template slot-scope="scope">
          {{scope.row.storeNum}}/{{scope.row.totalStoreNum}} ≈ {{fixedNum(scope.row.storeNum/scope.row.totalStoreNum,'percent')}}
        </template>
      </el-table-column>
      <el-table-column prop="couponNum" label="新增优惠券数量" align="center"></el-table-column>
      <el-table-column prop="rightCouponNum" label="有效优惠券总数" align="center"></el-table-column>
      <el-table-column prop="totalCouponNum" label="优惠券总数" align="center"></el-table-column>
    </el-table>

    <el-table :data="storeStat.storeList" stripe style="width: 100%" border v-show="radio4 == 2">
      <el-table-column prop="date" label="日期" align="center"></el-table-column>
      <el-table-column prop="num0" label="数量为0" align="center"></el-table-column>
      <el-table-column prop="num3" label="数量1-3" align="center"></el-table-column>
      <el-table-column prop="num5" label="数量3-5" align="center"></el-table-column>
      <el-table-column prop="numMore" label="数量>5" align="center"></el-table-column>
    </el-table>
  </section>
</template>

<script src="./dataStat.js"></script>
