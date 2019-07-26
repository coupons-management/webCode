<style lang="scss" scoped>

</style>

<template>
  <section class="storeManage">
    <span style="margin:0 5px 0 20px;color: grey;">选择员工:</span>
    <el-select v-model="searchForm.choosePerson" placeholder="请选择员工">
      <el-option :label="staffItem.account" :value="staffItem.id" v-for="staffItem in staffList"></el-option>
    </el-select>
    <span style="margin:0 5px 0 20px;color: grey;">站点选择:</span>
    <el-select v-model="searchForm.chooseSite" placeholder="请选择爬虫站">
      <el-option :label="siteItem.name" :value="siteItem.id" v-for="siteItem in siteList"></el-option>
    </el-select>

    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 20px;">

      <el-tab-pane label="分配商家" name="apportion">
        <el-table :data="tableData.list" stripe style="width: 60%" border size="mini">
          <el-table-column prop="name" label="商家名" align="center"></el-table-column>
          <el-table-column prop="website" label="官网" align="center"></el-table-column>
          <el-table-column label="有效优惠券数量" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.couponNum}}/{{scope.row.couponNumTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="editorStore(scope.row,'1')">分配</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="paginationStyle" background layout="total ,prev, pager, next" @current-change="storeChange" :total="tableData.totalCount" :page-size="tableData.pageSize" style="float: left;"></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="查看商家" name="checkStore">
        <el-table :data="tableData2.list" stripe style="width: 60%" border size="mini">
          <el-table-column prop="name" label="商家名" align="center"></el-table-column>
          <el-table-column prop="website" label="官网" align="center"></el-table-column>
          <el-table-column label="有效优惠券数量" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.couponNum}}/{{scope.row.couponNumTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="editorStore(scope.row,'2')">取消管理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="paginationStyle" background layout="total ,prev, pager, next" @current-change="storeChange" :total="tableData2.totalCount" :page-size="tableData2.pageSize" style="float: left;"></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script src="./storeManage.js"></script>
