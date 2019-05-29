<style scoped lang="scss">
  @import "../siteManage.scss";
</style>

<template>
  <section class="advertContent">
    <el-table :data="advertData" stripe style="width: 40%;min-width:500px;" border >
      <el-table-column label="词条名" align="center">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.name" class="tableInput" @blur="inputBlur(scope.row)"/>
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
          <el-button type="text" size="mini" @click="deleteAdvert(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="advertBox" class="advert" title="商家查看/排序" width="70%">
      <div class="color-list">
        <div class="color-item" v-for="color in currAdvertData.storeList" v-dragging="{ item: color, list: currAdvertData.storeList, group: 'color' }" :key="color.text">{{color.text}}
          <i class="el-icon-error deleteAdvert" @click="deleteAdvertBtn"></i>
        </div>
      </div>
      <section style="display: flex;justify-content: space-around;margin-top: 20px;">
        <el-button type="primary" round>新增商家</el-button>
        <el-button type="primary" round>提交排序</el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script src="./advert.js"></script>
