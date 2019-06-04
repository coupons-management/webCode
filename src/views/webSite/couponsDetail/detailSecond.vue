<style scoped lang="scss">
@import "../webCom.scss";
@import "./couponsDetail.scss";
</style>
<template>
  <div>
    <section class="topText" style="text-align:left;">
      <div class="detail-info"></div>
    </section>
    <section class="detailFirst">
      <section class="leftPart">
        <section class="top20">
          <div>TOP Stores</div>
          <section class="detail-store">
            <div class="item" v-for="item in storeList" @click="goStore(item)">
              <div class="pic"></div>
              <img :src="item.logoUrl" :alt="item.name">
            </div>
          </section>
        </section>
      </section>
      <section class="rightPart">
        <section class="rightTools">
          <div
            v-for="item in buttonList"
            :class="item.state?'buttonActive':''"
            @click="toggleButton(item)"
          >{{item.name}}</div>
          <div style="float: right;">
            <el-checkbox v-model="isChecked" @change="boxChange">备选项</el-checkbox>
          </div>
        </section>
        <section class="rightContent">
          <section class="topCoupons">
            <section class="couponDetailList listStyle">
              <div v-for="item in couponList" class="item">
                <div class="item-pic">
                  <div class="item-text">80% OFF</div>
                  <span class="item-type type1">CODE</span>
                </div>
                <div class="item-info">
                  <div
                    class="item-info-text"
                  >Up to 30% Off End of Season Sale,Up to 30% Off End of Season Sale</div>
                  <div style="text-align:right;">
                    <button class="item-btn">GET DEAL</button>
                  </div>
                </div>
              </div>
            </section>
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
      couponList: [
        { img: "", name: "图片1", value: 1 },
        { img: "", name: "图片2", value: 2 },
        { img: "", name: "图片3", value: 3 },
        { img: "", name: "图片4", value: 4 },
        { img: "", name: "图片5", value: 5 },
        { img: "", name: "图片6", value: 5 },
        { img: "", name: "图片7", value: 5 },
        { img: "", name: "图片8", value: 5 },
        { img: "", name: "图片5", value: 5 },
        { img: "", name: "图片6", value: 5 },
        { img: "", name: "图片7", value: 5 },
        { img: "", name: "图片8", value: 5 },
        { img: "", name: "图片5", value: 5 },
        { img: "", name: "图片6", value: 5 },
        { img: "", name: "图片7", value: 5 },
        { img: "", name: "图片8", value: 5 }
      ],
      isChecked: true,
      buttonList: [
        { name: "All Offers", state: true },
        { name: "Coupon Codes", state: false },
        { name: "Deals", state: false }
      ],
      isShowMore: false,
      storeList: [],
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.getTopStore();
    },
    getTopStore() {
      this.$sendData(
        "post",
        "officialWebsite/getTopStoreList",
        { siteId: /*this.siteId || */ 2 },
        (data, all) => {
          this.storeList = data;
        }
      );
    },
    goStore(item) {
      this.$router.push(`/websiteFir/detailSecond/${item.webSite}`);
    },
    boxChange(e) {
      console.log(e);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    toggleButton(data) {
      for (let i of this.buttonList) {
        i.state = false;
      }
      data.state = true;
      //this.$forceUpdate();
    }
  }
};
</script>
