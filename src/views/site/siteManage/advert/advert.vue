<style scoped lang="scss">
@import "../siteManage.scss";
</style>

<template>
  <section class="advertContent">
    <el-table :data="advertData" stripe style="width: 40%;min-width:500px;" border>
      <el-table-column label="词条名" align="center">
        <template slot-scope="scope">
          <input
            type="text"
            v-model="scope.row.name"
            class="tableInput"
            @blur="inputBlur(scope.row)"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column label="top上限" align="center">
        <template slot-scope="scope">
          <input type="number" v-model="scope.row.topNum" class="tableInput" @blur="inputBlur(scope.row)"/>
        </template>
      </el-table-column>-->
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editorAdvert(scope.row)">查看/排序</el-button>
          <!-- <el-button type="text" size="mini" @click="deleteAdvert(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="advertBox" class="advert" :title="`${modalName}查看/排序`" width="70%">
      <el-alert
        style="margin: 0 20px;width: auto;"
        title="删除更改数据保存后生效！"
        type="warning"
        :closable="false"
      ></el-alert>
      <div class="color-list">
        <div
          class="color-item"
          v-for="item in advData"
          v-dragging="{ item: item, list: advData, group: 'color' }"
          :key="item.id"
        >
          {{type === 'hotCoupon' || type === 'intruduceCoupon'?item.title:item.showName}}
          <i
            class="el-icon-error deleteAdvert"
            @click="deleteAdvertBtn(item)"
          ></i>
        </div>
      </div>
      <section style="display: flex;justify-content: space-around;margin-top: 20px;">
        <el-button
          type="primary"
          round
          @click="addStore"
        >{{type === 'hotCoupon' || type === 'intruduceCoupon'?`编辑优惠券`:`编辑商家`}}</el-button>
        <el-button type="primary" round @click="submitOrder">保存</el-button>
      </section>
    </el-dialog>

    <el-dialog
      :visible.sync="selectStoreBox"
      class="advert"
      title="选择商家"
      width="70%"
      :modal-append-to-body="false"
      append-to-body
      top="3%"
    >
      <el-table
        ref="multipleTable"
        :data="tableData.list"
        stripe
        style="width: 100%"
        border
        row-key="id"
        @select="handleSelectionChange"
      >
        <el-table-column type="selection" reserve-selection width="55"></el-table-column>
        <el-table-column prop="id" label="id" align="center"></el-table-column>
        <el-table-column label="logo" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" placement="right">
              <div slot="content">
                <img v-if="scope.row.logo" :src="scope.row.logo" class="tableImg1" />
                <img v-else="scope.row.logo" src="static/imgs/noImg.png" class="tableImg1" />
              </div>
              <div>
                <img v-if="scope.row.logo" :src="scope.row.logo" class="tableImg" />
                <img v-else="scope.row.logo" src="static/imgs/noImg.png" class="tableImg" />
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="storeName" label="名称" align="center"></el-table-column>
      </el-table>
      <el-pagination
        class="paginationStyle"
        background
        layout="total ,prev, pager, next"
        @current-change="tableChange"
        :total="tableData.totalCount"
        :page-size="tableData.pageSIze"
      ></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectStoreBox = false">取 消</el-button>
        <el-button type="primary" @click="handleSelectCoupon">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="selectCouponBox"
      class="advert"
      title="选择优惠券"
      width="70%"
      :modal-append-to-body="false"
      append-to-body
      top="3%"
    >
      <el-table
        ref="multipleTable"
        :data="tableData.list"
        stripe
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" align="center"></el-table-column>
        <el-table-column prop="currentTitle" label="名称" align="center"></el-table-column>
        <el-table-column prop="couponType" label="类型" align="center"></el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
      </el-table>
      <el-pagination
        class="paginationStyle"
        background
        layout="total ,prev, pager, next"
        @current-change="tableChange"
        :total="tableData.totalCount"
        :page-size="tableData.pageSIze"
      ></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectCouponBox = false">取 消</el-button>
        <el-button type="primary" @click="handleSelectCoupon">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script src="./advert.js"></script>
