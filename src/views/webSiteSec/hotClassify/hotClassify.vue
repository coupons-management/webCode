<style lang="scss" scoped>
@import "./hotClassify.scss";
</style>

<template>
  <section class="hotClassify">
    <section class="hotClassifyTitle">Electronic&Computer</section>
    <section class="TopCoupons">
      <section class="couponsList">
        <div v-for="(item,index) in couponsData.list" @click="open(item)" :key="index">
          <img :src="item.storeLogo">
          <div class="coupItem">
            <div>{{item.name}}</div>
            <div>Get Deal</div>
          </div>
        </div>
      </section>
    </section>
    <section style="text-align: center">
      <el-pagination background layout="total, prev, pager, next" :total="couponsData.totalCount"></el-pagination>
    </section>
  </section>
</template>
<script src="./hotClassify.js"></script>
