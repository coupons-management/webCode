<style lang="scss" scoped>
@import "./classify.scss";
</style>

<template>
  <section class="classify">
    <section class="classifyTitle">Categories in DISCOUNTMM</section>
    <section class="TopCategories">
      <section class="CategoriesList">
        <div
          v-for="(item,index) in categoryData"
          :class="(index+1)%5==0?'':'borderStyle'"
          @click="goCategory(item)"
        >
          <i class="el-icon-tickets"></i>
          <span>{{item.name}}</span>
        </div>
      </section>

      <!-- <div style="text-align: center;margin-top: 15px;">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="categoryData.totalCount"
          @current-change="changePage"
        ></el-pagination>
      </div> -->
    </section>
  </section>
</template>
<script src="./classify.js"></script>
