<style lang="scss" scoped>
  @import "./hotStores.scss";
</style>

<template>
  <section class="hotStores">
    <section class="storeInfo">
      <div>
        <img src="static/imgs/nike.jpg"/>
      </div>
      <div class="detailInfo">
        <div class="storeTitle">NIKE Promo Codes & Coupons</div>
        <div class="storeDetail">
          <div><span>50</span> Offers Available</div>
          <div><span>21</span> Verified Coupons</div>
          <div><span>12</span> Coupons Codes</div>
          <div><span>13</span> Sales, </div>
          <div> Update at June 30,2018</div>
        </div>
        <div class="gotoStore">Visit Website</div>
      </div>
    </section>
    <section class="storeContent">
      <section class="contentLeft">
        <section class="leftTopNav">
          <section>
            <div :class="item.state?'btnActive':''" v-for="item in typeList" @click="toggleNav(item)"><span>{{item.name}} {{item.num}}</span></div>
          </section>
          <div>
            <el-checkbox v-model="verified">VERIFIED 1</el-checkbox>
          </div>
        </section>
        <section class="activeCoupons">
          <section class="leftCoupStyle" v-for="item in activeList"><!-- v-for="item in activeList"-->
            <section class="cutSale">
              <div>{{item.cut}}</div>
              <div v-if="item.cut != 'SALE'">OFF</div>
            </section>
            <section>
              <div><span :class="item.titleState == 'DEAL'?'titleBtn dealBtn':'titleBtn codeBtn'">{{item.titleState}}</span><span class="coupTitle">Up to 30% Off End Of Season Sale</span></div>
              <div><span>Grab this fantastic offer and get Up to 30% Off End Of Season Sale.</span></div>
              <div class="coupBottom">
                <div><i class="el-icon-tickets"></i><span>VERIFIED</span></div>
                <div><i class="el-icon-tickets"></i><span>15 USED</span></div>
                <div><el-rate v-model="item.value" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" disabled></el-rate><span>SUCCESS</span></div>
              </div>
            </section>
            <section><div class="activeBtn">GET DEAL</div></section>
          </section>
        </section>
        <div style="margin: 25px 0;font-size: 20px;color: grey">Expired Coupons</div>
        <section class="expiredCoupons">
          <section class="leftCoupStyle" v-for="item in expiredList"><!-- v-for="item in expiredList"-->
            <section>
              <div>30%</div>
              <div>OFF</div>
            </section>
            <section>
              <div><span class="titleBtn">DEAL</span><span class="coupTitle">Up to 30% Off End Of Season Sale</span></div>
              <div><span>Grab this fantastic offer and get Up to 30% Off End Of Season Sale.</span></div>
              <div class="coupBottom">
                <div><i class="el-icon-tickets"></i><span>VERIFIED</span></div>
                <div><i class="el-icon-tickets"></i><span>15 USED</span></div>
                <div><el-rate v-model="item.value" :colors="['#99A9BF', '#F7BA2A', 'rgb(189,189,189)']" disabled></el-rate><span>SUCCESS</span></div>
              </div>
            </section>
            <section><div>GET DEAL</div></section>
          </section>
        </section>
      </section>
      <!-----------------右侧部分--------------------->
      <section class="contentRight">
        <section class="rightTop">
          <div>Top Coupons</div>
          <div><i class="el-icon-tickets"></i><span>20% Off Your Order</span></div>
        </section>
        <section class="rightStore">
          <div>Top Stores</div>
          <section class="rightStoreList">
            <div v-for="item in rightStoreList">
              <img src="static/imgs/nike.jpg"/>
            </div>
          </section>
        </section>
      </section>
    </section>

  </section>
</template>
<script src="./hotStores.js"></script>
