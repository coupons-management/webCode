<style scoped lang="scss">
@import "../webCom.scss";
@import "./couponsDetail.scss";
</style>
<template>
  <div>
    <section class="topText" style="text-align:left;">
      Vaporizers
      <p
        style="font-size:14px;"
      >Update the most popular stores daily, Have the best coupons & Deals!</p>
    </section>
    <section class="detailFirst">
      <section class="leftPart">
        <section class="allNum">8766 Offers</section>
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
          <div style="cursor: pointer;">all Categories</div>
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
              <div v-for="(item,index) in couponsData.list" class="itemCoupons" :key="index">
                <div class="couponImg">
                  <div>CODE</div>
                  <img src="static/imgs/coupon.jpg" alt>
                </div>
                <div class="couponInfo">
                  <span
                    style="font-size: 14px;"
                  >Up to 30% Off End of Season Sale,Up to 30% Off End of Season Sale</span>
                  <div>
                    <span>15 USED</span>
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
            <el-pagination layout="total, prev, pager, next" :total="couponsData.to"></el-pagination>
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
        "officialWebsite/getStoreCategoryCouponList",
        {
          outSiteId: /* this.siteId || */ 2,
          id: this.$route.params.id,
          pageNumber: this.couponsData.pageNumber,
          pageSize: this.couponsData.pageSize
        },
        (data, all) => {
          this.couponsData.list = data;
        }
      );
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
    getCategoryTree() {
      this.$sendData(
        "post",
        "showSiteType/getTree",
        { siteId: 2 },
        (data, all) => {
          console.log(data);
          this.data = data.childList;
        }
      );
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
    },
    goStore(item) {
      this.$router.push(`/websiteFir/detailSecond/${item.webSite}`);
    }
  }
};
</script>
