<style lang="scss" scoped>

</style>

<template>
  <section class="storeManage">
    <span style="margin:0 5px 0 20px;color: grey;">选择员工:</span>
    <el-select v-model="searchForm.choosePerson" placeholder="请选择员工">
      <el-option label="员工1" value="0"></el-option>
      <el-option label="员工2" value="1"></el-option>
      <el-option label="员工3" value="2"></el-option>
    </el-select>
    <span style="margin:0 5px 0 20px;color: grey;">站点选择:</span>
    <el-select v-model="searchForm.chooseSite" placeholder="请选择爬虫站">
      <el-option label="站点1" value="0"></el-option>
      <el-option label="站点2" value="1"></el-option>
      <el-option label="站点3" value="2"></el-option>
    </el-select>

    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 20px;">

      <el-tab-pane label="分配商家" name="apportion">
        <el-table :data="tableData.tableList" stripe style="width: 60%" border size="mini">
          <el-table-column prop="storeName" label="商家名" align="center"></el-table-column>
          <el-table-column prop="website" label="官网" align="center"></el-table-column>
          <el-table-column label="有效优惠券数量" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.couponNum}}/{{scope.row.couponNumTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="editorStore(scope.row)">分配</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="paginationStyle" background layout="total ,prev, pager, next" @current-change="storeChange" :total="tableData.pageTotal" :page-size="tableData.pageSize" style="float: left;"></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="查看商家" name="checkStore">
        <el-table :data="tableData.tableList" stripe style="width: 60%" border size="mini">
          <el-table-column prop="storeName" label="商家名" align="center"></el-table-column>
          <el-table-column prop="website" label="官网" align="center"></el-table-column>
          <el-table-column label="有效优惠券数量" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.couponNum}}/{{scope.row.couponNumTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="editorStore(scope.row)">取消管理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="paginationStyle" background layout="total ,prev, pager, next" @current-change="storeChange" :total="tableData.pageTotal" :page-size="tableData.pageSize" style="float: left;"></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script src="./storeManage.js"></script>
