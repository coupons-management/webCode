<style lang="scss" scoped>
  @import "./homePage.scss";
</style>

<template>
  <section class="homePage">
    <section class="topStores">
      <div>Top Stores</div>
      <section>
        <img src="static/imgs/nike.jpg"/>
        <img src="static/imgs/nike.jpg"/>
        <img src="static/imgs/nike.jpg"/>
        <img src="static/imgs/nike.jpg"/>
        <img src="static/imgs/nike.jpg"/>
        <img src="static/imgs/nike.jpg"/>
      </section>
    </section>
    <section class="TopCoupons">
      <div>Top Coupons</div>
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
    <section class="TopCategories">
      <div>Top Categories</div>
      <section class="CategoriesList">
        <div v-for="(item,index) in CategoriesList" :class="(index+1)%5==0?'':'borderStyle'">
          <i class="el-icon-tickets"></i>
          <span>ShoppingMall</span>
        </div>
      </section>
    </section>
  </section>
</template>
<script src="./homePage.js"></script>
