<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>

<template>
  <section class="staffdDailyPage">
    <!-- <el-date-picker v-model="searchForm.searchTime" type="daterange" range-separator="－" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker> -->

    <span style="margin:0 5px 0 20px;color: grey;">选择员工:</span>
    <el-select v-model="searchForm.choosePerson" placeholder="请选择员工">
      <el-option label="员工1" value="0"></el-option>
      <el-option label="员工2" value="1"></el-option>
      <el-option label="员工3" value="2"></el-option>
    </el-select>
    <!-- <span style="margin:0 5px 0 20px;color: grey;">站点选择:</span>
    <el-select v-model="searchForm.chooseSite" placeholder="请选择爬虫站">
      <el-option label="站点1" value="0"></el-option>
      <el-option label="站点2" value="1"></el-option>
      <el-option label="站点3" value="2"></el-option>
    </el-select>-->

    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 20px;">
      <!-- <el-tab-pane label="商家" name="storePage">
        <el-table :data="storeData.storeList" stripe style="width: 60%" border size="mini">
          <el-table-column prop="name" label="商家名" align="center"></el-table-column>
          <el-table-column label="官网" align="center">
            <template slot-scope="scope">
              <a href="scope.row.website" target="_blank">{{scope.row.website}}</a>
            </template>
          </el-table-column>
          <el-table-column label="logo" align="center">
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
          <el-table-column prop="time" label="审核时间" align="center"></el-table-column>
        </el-table>
        <el-pagination class="" background layout="total ,prev, pager, next" @current-change="storeChange" :total="storeData.pageTotal" :page-size="storeData.pageSize"></el-pagination>
      </el-tab-pane>-->

      <!-- <el-tab-pane label="审核的优惠券" name="couponPage">
        <el-table :data="couponData.couponList" stripe style="width: 80%" border size="mini">
          <el-table-column prop="storeName" label="商家名" align="center"></el-table-column>
          <el-table-column prop="title" label="原标题" align="center"></el-table-column>
          <el-table-column prop="newTitle" label="现标题" align="center"></el-table-column>
          <el-table-column prop="code" label="code码" align="center"></el-table-column>
          <el-table-column prop="siteName" label="站点名" align="center"></el-table-column>
          <el-table-column prop="time" label="审核时间" align="center"></el-table-column>
        </el-table>
        <el-pagination class="" background layout="total ,prev, pager, next" @current-change="couponChange" :total="couponData.pageTotal" :page-size="couponData.pageSize"></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="审核的商家" name="manageStorePage">
        <el-table :data="manageStoreData.manageStoreList" stripe style="width: 60%" border size="mini">
          <el-table-column prop="name" label="商家名" align="center"></el-table-column>
          <el-table-column label="官网" align="center">
            <template slot-scope="scope">
              <a href="scope.row.website" target="_blank">{{scope.row.website}}</a>
            </template>
          </el-table-column>
          <el-table-column label="logo" align="center">
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
          <el-table-column prop="couponNum" label="优惠券数量" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.couponNum}}/{{scope.row.couponNumTotal}} ≈ {{fixedNum(scope.row.couponNum/scope.row.couponNumTotal,'percent')}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="" background layout="total ,prev, pager, next" @current-change="manageStoreChange" :total="manageStoreData.pageTotal" :page-size="manageStoreData.pageSize"></el-pagination>
      </el-tab-pane>-->

      <el-tab-pane label="日志" name="daily">
        <el-table :data="numData.numList" stripe style="width: 40%" border size="mini">
          <el-table-column prop="date" label="日期" align="center"></el-table-column>
          <el-table-column prop="storeNum" label="审核商家数量" align="center"></el-table-column>
          <el-table-column prop="couponNum" label="审核优惠券数量" align="center"></el-table-column>
        </el-table>
        <el-pagination
          class
          background
          layout="total ,prev, pager, next"
          @current-change="couponChange"
          :total="numData.pageTotal"
          :page-size="numData.pageSize"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script src="./staffdDaily.js"></script>
