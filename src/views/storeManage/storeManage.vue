<style lang="scss" scoped>

</style>

<template>
  <section class="storeManage">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
      <el-form-item label="关键字">
        <el-input v-model="searchForm.search" placeholder="请输入商家名、官网"></el-input>
      </el-form-item>
      <el-form-item label="商家分类">
        <el-select v-model="searchForm.typeId" placeholder="请选择分类" style="width: 180px;" filterable clearable>
          <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" 有效优惠券范围">
        <el-input v-model="searchForm.rangeStart" placeholder="请输入数量" style="width:120px;"></el-input>~
        <el-input v-model="searchForm.rangeEnd" placeholder="请输入数量" style="width:120px;"></el-input>
      </el-form-item>
      <el-form-item label=" 选择员工">
        <el-select v-model="searchForm.userId" placeholder="请选择员工">
          <el-option :label="staffItem.account" :value="staffItem.id" v-for="staffItem in staffList"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" 站点选择">
        <el-select v-model="searchForm.site" placeholder="请选择站">
          <el-option :label="siteItem.name" :value="siteItem.id" v-for="siteItem in siteList"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit">查询</el-button>
      </el-form-item>
    </el-form>

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
