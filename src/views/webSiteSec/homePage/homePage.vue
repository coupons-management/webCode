<style lang="scss" scoped>
@import "./homePage.scss";
</style>

<template>
  <section class="homePage">
    <section class="topStores">
      <div>Top Stores</div>
      <section v-if="storeList&&storeList.length>0">
        <div
          class="item"
          v-for="(item,index) in storeList"
          :key="index"
          :style="{backgroundImage: `url(${item.logoUrl})`}"
        >
          <div class="cover"></div>
          <div class="text">{{item.name}}</div>
        </div>
        <!-- <img v-for="item in storeList" :src="item.logo" :alt="item.showName"> -->
      </section>
      <section v-else>No Result!</section>
    </section>
    <section class="TopCoupons">
      <div>Top Coupons</div>
      <section class="couponsList" v-if="couponList&&couponList.length>0">
        <div v-for="(item, index) in couponList" :key="index">
          <img src="static/imgs/nike.jpg">
          <div class="coupItem">
            <div>{{item.name}}</div>
            <div @click="goUrl(item.link)">Get Deal</div>
          </div>
        </div>
      </section>
      <section v-else>No Result!</section>
    </section>
    <section class="TopCategories">
      <div>Top Categories</div>
      <section class="CategoriesList" v-if="categoryList&&categoryList.length>0">
        <div
          v-for="(item,index) in categoryList"
          :key="index"
          :class="(index+1)%5==0?'':'borderStyle'"
        >
          <i class="el-icon-tickets"></i>
          <span>{{item.name}}</span>
        </div>
      </section>
      <section v-else>No Result!</section>
    </section>
  </section>
</template>
<script src="./homePage.js"></script>
