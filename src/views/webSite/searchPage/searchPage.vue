<style scoped lang="scss">
@import "../webCom.scss";
</style>
<template>
  <div>
    <section class="topText" style="text-align: left;">Search Result For "WOw"</section>
    <section class="pageStyle">
      <section class="topStores">
        <div class="centerText">
          <i>Store results</i>
        </div>
        <section class="storeList listStyle">
          <div v-for="item in storeList" @click="goStore(item)">
            <div class="pic"></div>
            <img :src="item.logoUrl" :alt="item.name">
          </div>
        </section>
      </section>
      <section class="topCoupons">
        <div class="centerText">
          <i>TOP COUPONS</i>
        </div>
        <section class="couponList listStyle">
          <div v-for="item in couponList" class="itemCoupons" @click="goCoupon(item)">
            <div class="couponImg">
              <div>CODE</div>
              <img :src="item.storeLogo" alt>
            </div>
            <div class="couponInfo">
              <span
                style="font-size: 14px;"
              >Up to 30% Off End of Season Sale,Up to 30% Off End of Season Sale</span>
              <div>
                <span>15 USED</span>
                <span>
                  <span style="display: inline-block;vertical-align: middle;">
                    <el-rate v-model="item.value" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                  </span>
                  <span>SUCCESS</span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  </div>
</template>

<script src="./searchPage.js"></script>
