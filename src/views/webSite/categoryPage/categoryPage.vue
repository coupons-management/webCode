<style scoped lang="scss">
@import "../webCom.scss";
</style>
<template>
  <div>
    <section class="topText">Categories in Cannabispromocodes.com</section>
    <section class="pageStyle">
      <section class="topCategories">
        <section class="categoryList listStyle">
          <div v-for="item in categoryData" @click="goCategory(item)">{{item.name}}</div>
        </section>
        <!-- <div style="text-align: center;margin-top: 15px;">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="categoryData.totalCount"
            @current-change="changePage"
          ></el-pagination>
        </div>-->
      </section>
    </section>
  </div>
</template>

<script type="es6">
export default {
  name: "homePage",
  data() {
    return {
      categoryData: {
        pageNumber: 1,
        pageSize: 10
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$sendData(
        "post",
        "officialWebsite/getCategoriesPageList",
        {
          outSiteId: this.siteId || 1,
          pageNumber: this.categoryData.pageNumber,
          pageSize: this.categoryData.pageSize
        },
        (data, all) => {
          this.categoryData = data;
        }
      );
    },
    goCategory(item) {
      this.$router.push(`/websiteFir/detailFirst/${item.id}`);
    },
    changePage(e) {
      this.categoryData.pageNumber = e;
      this.getData();
    }
  }
};
</script>
