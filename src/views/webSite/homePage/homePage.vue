<style scoped lang="scss">
  @import '../webCom.scss';
</style>
<template>
  <section class="pageStyle">
    <section class="homeSearch">
      <div class="searchTitle">Save money on cannabis purchases online</div>
      <el-input placeholder="Search for stroes,offers or brands"  v-model="input2"><i slot="suffix" class="el-input__icon el-icon-search searchBtnStyle" style="cursor: pointer"></i></el-input>
    </section>
    <section class="topStores">
      <div class="centerText"><i>TOP STORES</i></div>
      <section class="storeList listStyle">
        <div v-for="item in storeList">{{item.name}}</div>
      </section>
    </section>
    <section class="topCoupons">
      <div class="centerText"><i>TOP COUPONS</i></div>
      <section class="couponList listStyle">
        <div v-for="item in couponList" class="itemCoupons">
          <div class="couponImg">
            <div>CODE</div>
            <img src="static/imgs/coupon.jpg" alt=""/>
          </div>
          <div class="couponInfo">
            <span style="font-size: 14px;">Up to 30% Off End of Season Sale,Up to 30% Off End of Season Sale</span>
            <div>
              <span>15 USED</span>
              <span>
                <span style="display: inline-block;vertical-align: middle;"><el-rate v-model="item.value" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate></span>
                <span>SUCCESS</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section class="topCategories">
      <div class="centerText"><i>TOP CATEGORIES</i></div>
      <section class="categoryList listStyle">
        <div v-for="item in categoryList">{{item.name}}</div>
      </section>
    </section>
    <section class="popularStores">
      <div class="centerText"><i>POPULAR STORES</i></div>
      <section class="popularList listStyle">
        <div v-for="item in popularList">{{item.name}}</div>
      </section>
    </section>
  </section>
</template>

<script src="./homePage.js"></script>
