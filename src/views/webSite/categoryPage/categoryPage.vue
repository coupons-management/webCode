<style scoped lang="scss">
@import "../webCom.scss";
</style>
<template>
  <section class="pageStyle">
    <section class="topCategories">
      <section class="categoryList listStyle">
        <div v-for="item in categoryList">{{item.name}}</div>
      </section>
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
        "officialWebsite/getCategoriesList",
        { outSiteId: this.$route.query.id || 1 },
        (data, all) => {
          this.categoryList = data;
        }
      );
    }
  }
};
</script>
