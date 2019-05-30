<style scoped lang="scss">
@import "../webCom.scss";
@import "./couponsDetail.scss";
</style>
<template>
  <section class="detailFirst">
    <section class="leftPart">
      <section class="allNum">8766 Offers</section>
      <section class="treeForCoup">
        <div style="cursor: pointer;">Categories</div>
        <div>
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div style="cursor: pointer;">all Categories</div>
      </section>
      <section class="top20">
        <div>TOP Stores</div>
        <section :style="{'height': '240px','overflow-y': isShowMore?'scroll':'inherit'}">
          <div v-for="(item,index) in top20List" :key="index" v-if="isShowMore">{{item.name}}</div>
          <div
            v-for="(item,index) in top20List"
            :key="index"
            v-show="index<10"
            v-if="!isShowMore"
          >{{item.name}}</div>
        </section>
        <div
          style="text-align: center;color: #1cd611;cursor: pointer;"
          @click="isShowMore = !isShowMore"
        >{{isShowMore?'close up':'show more'}}</div>
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
          <section class="couponList listStyle">
            <div v-for="item in couponList" class="itemCoupons">
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
                      <el-rate v-model="item.value" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                    </span>
                    <span>SUCCESS</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </section>
        <div style="text-align: center">
          <el-pagination layout="total, prev, pager, next" :total="1000"></el-pagination>
        </div>
      </section>
    </section>
  </section>
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
      top20List: [
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" },
        { name: "buybuy BABY" }
      ],
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
  methods: {
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
