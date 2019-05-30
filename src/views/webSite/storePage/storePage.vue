<style scoped lang="scss">
@import "../webCom.scss";
</style>
<template>
  <section class="pageStyle">
    <section class="topCategories popularStores">
      <!--<section class="categoryList listStyle">
        <div v-for="item in categoryList">{{item.name}}</div>
      </section>-->
      <section class="popularList listStyle">
        <div v-for="item in storeList">{{item.showName}}</div>
      </section>

      <div style="text-align: center;margin-top: 15px;">
        <el-pagination layout="total, prev, pager, next" :total="1000"></el-pagination>
      </div>
    </section>
  </section>
</template>

<script type="es6">
export default {
  name: "homePage",
  data() {
    return {
      categoryList: [
        { img: "", name: "图片1" },
        { img: "", name: "图片2" },
        { img: "", name: "图片3" },
        { img: "", name: "图片4" },
        { img: "", name: "图片5" },
        { img: "", name: "图片6" },
        { img: "", name: "图片1" },
        { img: "", name: "图片2" },
        { img: "", name: "图片3" },
        { img: "", name: "图片4" },
        { img: "", name: "图片5" },
        { img: "", name: "图片6" },
        { img: "", name: "图片1" },
        { img: "", name: "图片2" },
        { img: "", name: "图片3" },
        { img: "", name: "图片4" },
        { img: "", name: "图片5" },
        { img: "", name: "图片6" }
      ],
      storeList: [
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" },
        { name: "Amazon" }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$sendData(
        "post",
        "storeAudit/getTopHotStroreList",
        { outId: this.$route.query.id || 1 },
        (data, all) => {
          this.storeList = data;
        }
      );
    }
  }
};
</script>
