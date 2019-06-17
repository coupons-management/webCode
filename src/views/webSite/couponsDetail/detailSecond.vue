<style scoped lang="scss">
@import "../webCom.scss";
@import "./couponsDetail.scss";
</style>
<template>
  <div>
    <section class="topText" style="text-align:left;">
      <div class="detail-info">
        <div class="pic">
          <img :src="storeData.logo" alt>
        </div>
        <div class="info-des">
          <p class="info-des-title">{{storeData.name}}</p>
          <p class="info-des-des">{{storeData.description}}</p>
          <a
            class="visit-btn"
            :href="`http://${storeData.website}`"
            target="_blank"
            rel="nofollow"
          >Visit Website</a>
        </div>
      </div>
    </section>
    <section class="detailFirst">
      <section class="leftPart">
        <section class="top20">
          <div>TOP Stores</div>
          <section class="detail-store">
            <div class="item" v-for="(item,index) in storeList" @click="goStore(item)" :key="index">
              <div class="pic"></div>
              <img :src="item.logoUrl" :alt="item.name">
            </div>
          </section>
        </section>
      </section>
      <section class="rightPart">
        <section class="rightTools">
          <div
            v-for="(item,index) in buttonList"
            :key="index"
            :class="item.state?'buttonActive':''"
            @click="toggleButton(item)"
          >{{item.name}}</div>
          <!-- <div style="float: right;"> -->
          <!-- <el-checkbox v-model="isChecked" @change="boxChange">备选项</el-checkbox> -->
          <!-- </div> -->
        </section>
        <section class="rightContent">
          <section class="topCoupons">
            <section class="couponDetailList listStyle">
              <div v-for="(item,index) in storeData.couponList.list" class="item" :key="index">
                <div class="item-pic">
                  <div class="item-text">{{item.sale}}</div>
                  <span class="item-type type1">{{item.couponType}}</span>
                </div>
                <div class="item-info">
                  <div class="item-info-text">{{item.title}}</div>
                  <div style="text-align:right;">
                    <button class="item-btn" @click="goCoupon(item)">GET DEAL</button>
                  </div>
                </div>
              </div>
            </section>

            <!-- <div style="text-align: center">
              <el-pagination
                layout="total, prev, pager, next"
                @current-change="changePage"
                :total="storeData.couponList.totalCount"
                :page-size="storeData.couponList.pageSize"
              ></el-pagination>
            </div>-->
          </section>
        </section>
      </section>
    </section>
  </div>
</template>

<script type="es6">
export default {
  name: "detailFirst",
  data() {
    return {
      storeData: {
        couponList: {
          pageNumber: 1,
          pageSize: 20
        }
      },
      isChecked: true,
      buttonList: [
        { name: "All Offers", state: true, value: "" },
        { name: "Coupon Codes", state: false, value: "CODE" },
        { name: "Deals", state: false, value: "DEAL" }
      ],
      storeList: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.getTopStore();
      this.getStoreData();
    },
    getTopStore() {
      this.$sendData(
        "post",
        "officialWebsite/getTopStoreList",
        { siteId: /*this.siteId || */ 1 },
        (data, all) => {
          this.storeList = data;
        }
      );
    },
    getStoreData() {
      this.$sendData(
        "post",
        "website/getStoreDetail",
        {
          siteId: /*this.siteId || */ 1,
          storeId: this.$route.params.id,
          // pageNumber: this.storeData.couponList.pageNumber,
          // pageSize: this.storeData.couponList.pageSize,
          couponType: this.buttonList.filter(i => i.state)[0].value
        },
        (data, all) => {
          this.storeData = data;
          this.$sendData(
            "post",
            "website/visitStore",
            { id: data.id },
            (data, all) => {
              console.log(data);
            }
          );
        }
      );
    },
    goStore(item) {
      this.$router.push(`/websiteFir/detailSecond/${item.storeId}`);
    },
    boxChange(e) {
      console.log(e);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    changePage(e) {
      this.storeData.couponList.pageNumber = e;
      this.getStoreData();
    },
    toggleButton(data) {
      for (let i of this.buttonList) {
        i.state = false;
      }
      data.state = true;
      this.getStoreData();
      //this.$forceUpdate();
    },
    goCoupon(item) {
      window.open(`${item.link}`);
    }
  },
  watch: {
    $route() {
      this.getData();
    }
  }
};
</script>
