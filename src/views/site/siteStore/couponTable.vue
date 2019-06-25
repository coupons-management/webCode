<template>
  <div>
    <el-table
      :data="tableData.list"
      stripe
      style="width: 100%"
      border
      size="mini"
      row-key="id"
      :reserve-selection="true"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.inType == 0">{{scope.row.id}}</span>
          <span v-if="scope.row.inType == 1" style="color: red;">{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sourceTile" label="原标题" align="center"></el-table-column>
      <el-table-column prop="currentTitle" label="本站标题" align="center"></el-table-column>
      <el-table-column prop="couponType" label="类型" align="center"></el-table-column>
      <el-table-column prop="code" label="code" align="center"></el-table-column>
      <el-table-column prop="description" label="描述" align="center"></el-table-column>
      <el-table-column label="是否过期" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.expired == true">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="expiryTime" label="过期时间" align="center">
        <template slot-scope="scope">
          <span>{{!currPageInfo?changeDate(scope.row.expiryTime):changeDate(scope.row.expireAt)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" v-if="scope.row.isPass == 0">待审核</el-button>
          <el-button type="success" size="mini" v-else-if="scope.row.isPass == 1">合 格</el-button>
          <el-button type="danger" size="mini" v-else="scope.row.isPass == 2">不合格</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{changeDate(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editorInfo(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="isPassFun(scope.row,1)">合格</el-button>
          <el-button type="text" size="mini" @click="isPassFun(scope.row,2)">不合格</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="paginationStyle"
      background
      layout="total ,prev, pager, next"
      @current-change="couponChange"
      :total="tableData.totalCount"
      :page-size="tableData.pageSize"
    ></el-pagination>
    <el-dialog
      :visible.sync="editorCouponsBox"
      class="checkCoupons"
      title="编辑优惠券"
      width="400px"
      :modal-append-to-body="false"
      append-to-body
    >
      <el-form :model="editorData" size="small" label-width="80px" label-position="left">
        <el-form-item label=" 现标题">
          <el-input v-model="editorData.currentTitle" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label=" 描述" v-if="editorData.inType==1">
          <el-input v-model="editorData.description" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label=" code" v-if="editorData.inType==1">
          <el-input v-model="editorData.code" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label=" 过期时间" v-if="editorData.inType==1">
          <el-input v-model="editorData.pastTime" placeholder="请输入名字"></el-input>
        </el-form-item>
      </el-form>
      <section style="display: flex;justify-content: space-around;">
        <el-button type="danger" @click="deleteCoupon" size="small" v-if="editorData.inType==1">删除</el-button>
        <el-button type="primary" @click="editorSubmit" size="small">提交</el-button>
      </section>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "spiderCoupon",
  props: ["currPageInfo", "selected", "changeSort"],
  data() {
    return {
      searchForm: {
        siteId: "",
        search: "",
        couponType: "",
        expiry: 0,
        cteateType: "",
        pageSize: 10,
        pageNumber: 1,
        state: ""
      },
      sortChange: false,
      tableData: {}, //从后台获取的数组
      editorCouponsBox: false,
      editorData: {}
    };
  },
  mounted() {
    this.searchForm.siteId = this.siteId;
    if (this.currPageInfo) {
      //查询商家下的优惠券
      this.searchForm.storeId = this.currPageInfo.storeId;
    } else {
      this.initData(["dataSource", "couponType", "expiry", "approval"]);
    }
    this.getTableData();
  },
  methods: {
    searchSubmit() {
      //查询提交
      this.searchForm.pageNumber = 1;
      this.getTableData();
    },
    couponChange(e) {
      //table分页
      this.searchForm.pageNumber = e;
      this.getTableData();
    },
    isPassFun(data, type) {
      //单个审核
      this.editorData = data;
      this.editorData.isPass = type;
      this.approvalSend();
    },
    editorInfo(data) {
      //编辑
      this.editorData = this.deepClone(data);
      this.editorCouponsBox = true;
    },
    deleteCoupon() {
      //删除优惠券
      let _this = this;
      _this.$sendData(
        "post",
        "showSiteCoupon/delete",
        _this.editorData,
        (data, all) => {
          _this.getTableData();
          _this.$message({ type: "success", message: "操作成功！" });
          _this.editorCouponsBox = false;
        }
      );
    },
    editorSubmit() {
      //提交修改优惠券
      this.editorData.isPass = 1;
      this.approvalSend();
    },
    approvalSend() {
      //编辑提交
      let _this = this;
      _this.$sendData(
        "post",
        "showSiteCoupon/edit",
        _this.editorData,
        (sendData, all) => {
          _this.getTableData();
          _this.$message({ type: "success", message: "操作成功！" });
          _this.editorCouponsBox = false;
        }
      );
    },
    getTableData() {
      //获取优惠券列表
      let _this = this;
      _this.$sendData(
        "post",
        "showSiteCoupon/getCouponPage",
        _this.searchForm,
        (data, all) => {
          _this.tableData = data;
          this.$nextTick(() => {
            this.sortChange = false;
            if (this.selected) {
              this.toggleSelection(this.selected);
            }
          });
        }
      );
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          let temp = this.tableData.list.filter(i => i.id === row.id);
          if (temp.length > 0) {
            this.$refs.multipleTable.toggleRowSelection(temp[0], true);
          }
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      if (!this.sortChange) {
        this.$emit("change", val);
      }
    }
  },
  watch: {
    currPageInfo: function(e) {
      this.searchForm.storeId = this.currPageInfo.storeId;
      this.searchForm.pageNumber = 1;
      this.getTableData();
    },
    changeSort: function() {
      this.sortChange = true;
      this.getTableData();
    }
  },
  computed: {
    ...mapGetters([
      "couponTypeList",
      "approvalList",
      "dataSourceList",
      "expiryList",
      "siteId"
    ])
  }
};
</script>
