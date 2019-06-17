<style scoped lang="scss">
@import "../webCom.scss";
@import "./couponsDetail.scss";
</style>
<template>
  <div>
    <section class="topText" style="text-align:left;">
      {{$route.query.name}}
      <p
        style="font-size:14px;"
      >Update the most popular stores daily, Have the best coupons & Deals!</p>
    </section>
    <section class="detailFirst">
      <section class="leftPart">
        <section class="allNum">{{couponsData.totalCount}} Offers</section>
        <section class="treeForCoup">
          <div style="cursor: pointer;">Categories</div>
          <div>
            <el-tree
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
              empty-text="数据为空"
            ></el-tree>
          </div>
          <!-- <div style="cursor: pointer;">all Categories</div> -->
        </section>
        <section class="top20">
          <div>TOP Stores</div>
          <section :style="{'height': '240px','overflow-y': isShowMore?'scroll':'inherit'}">
            <div v-for="(item,index) in storeList" :key="index" @click="goStore(item)">{{item.name}}</div>
            <!-- <div
            v-for="(item,index) in storeList"
            :key="index"
            v-show="index<10"
            v-if="!isShowMore"
            >{{item.name}}</div>-->
          </section>
          <!-- <div
          style="text-align: center;color: #1cd611;cursor: pointer;"
          @click="isShowMore = !isShowMore"
          >{{isShowMore?'close up':'show more'}}</div>-->
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
          <div style="float: right;">
            <el-checkbox v-model="isChecked" @change="boxChange">备选项</el-checkbox>
          </div>
        </section>
        <section class="rightContent">
          <section class="topCoupons">
            <section class="couponList listStyle" v-if="couponsData.list">
              <div
                v-for="(item,index) in couponsData.list"
                class="itemCoupons"
                :key="index"
                @click="handleClickCoupon(item)"
              >
                <div class="couponImg">
                  <div v-if="item.couponType">{{item.couponType}}</div>
                  <img :src="item.storeLogo" alt>
                </div>
                <div class="couponInfo">
                  <span style="font-size: 14px;text-align:center;">{{item.title}}</span>
                  <div>
                    <span>USED</span>
                    <span>
                      <span style="display: inline-block;vertical-align: middle;">
                        <el-rate
                          :value="5"
                          score-template="{value}"
                          disabled
                          :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                        ></el-rate>
                      </span>
                      <span>SUCCESS</span>
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <div style="text-align: center">
            <el-pagination
              layout="total, prev, pager, next"
              @current-change="changePage"
              :total="couponsData.totalCount"
              :page-size="couponsData.pageSize"
            ></el-pagination>
          </div>
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
      couponsData: { pageNumber: 1, pageSize: 10, list: [] },
      isChecked: true,
      buttonList: [
        { name: "All Offers", state: true, value: "" },
        { name: "Coupon Codes", state: false, value: "CODE" },
        { name: "Deals", state: false, value: "DEAL" }
      ],
      isShowMore: false,
      storeList: [],
      couponType: [],
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
        children: "childList",
        label: "name"
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.getTopStore();
      this.getCouponList();
      this.getCategoryTree();
    },
    getCouponList() {
      this.$sendData(
        "post",
        "website/getCouponsByCategory",
        {
          siteId: /* this.siteId || */ 1,
          id: ~~this.$route.params.id,
          pageNumber: this.couponsData.pageNumber,
          pageSize: this.couponsData.pageSize,
          couponType: this.buttonList.filter(i => i.state)[0].value
        },
        (data, all) => {
          this.couponsData = data;
        }
      );
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
    getCategoryTree() {
      this.$sendData(
        "post",
        "website/getCategoryChild",
        { siteId: 1, id: ~~this.$route.params.id },
        (data, all) => {
          console.log(data);
          this.data = data;
        }
      );
    },
    boxChange(e) {
      console.log(e);
    },
    handleNodeClick(data) {
      console.log(data);
      this.$router.replace(
        `/websiteFir/detailFirst/${data.id}?name=${data.name}`
      );
    },
    toggleButton(data) {
      for (let i of this.buttonList) {
        i.state = false;
      }
      data.state = true;
      this.couponsData.pageNumber = 1;
      this.getCouponList();
      //this.$forceUpdate();
    },

    changePage(e) {
      this.storeData.pageNumber = e;
      this.getCouponList();
    },
    goStore(item) {
      this.$router.push(`/websiteFir/detailSecond/${item.storeId}`);
    },
    handleClickCoupon(item) {
      this.$router.push(`/websiteFir/detailSecond/${item.storeId}`);
    }
  },
  watch: {
    $route() {
      this.getData();
    }
  }
};
</script>
