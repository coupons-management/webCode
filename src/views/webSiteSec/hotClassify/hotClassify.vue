<style lang="scss" scoped>
  @import "./hotClassify.scss";
</style>

<template>
  <section class="hotClassify">
    <section class="hotClassifyTitle">
      Electronic&Computer
    </section>
    <section class="TopCoupons">
      <section class="couponsList">
        <div v-for="item in couponsList">
          <img src="static/imgs/nike.jpg"/>
          <div class="coupItem">
            <div>Up to 30% Off End of Season Sale</div>
            <div>Get Deal</div>
          </div>
        </div>
      </section>
    </section>
    <section style="text-align: center">
      <el-pagination background layout="total, prev, pager, next" :total="1000"></el-pagination>
    </section>
  </section>
</template>
<script src="./hotClassify.js"></script>
