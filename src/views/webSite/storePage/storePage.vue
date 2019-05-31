<style scoped lang="scss">
@import "../webCom.scss";
</style>
<template>
  <section class="pageStyle">
    <section class="topCategories popularStores">
      <!--<section class="categoryList listStyle">
        <div v-for="item in categoryList">{{item.name}}</div>
      </section>-->
      <section class="storePage listStyle">
        <div v-for="item in storeData.list" @click="goStore(item)">
          <div class="pic"></div>
          <img :src="item.logoUrl" alt>
        </div>
      </section>

      <div style="text-align: center;margin-top: 15px;">
        <el-pagination
          layout="total, prev, pager, next"
          :total="storeData.totalCount"
          @current-change="changePage"
        ></el-pagination>
      </div>
    </section>
  </section>
</template>

<script type="es6">
export default {
  name: "homePage",
  data() {
    return {
      storeData: {
        pageNumber: 1,
        pageSize: 10
      },
      wordsList: [
        "TOP",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
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
        "officialWebsite/getStorePageList",
        {
          siteId: /* this.siteId || */ 1,
          pageNumber: this.storeData.pageNumber,
          pageSize: this.storeData.pageSize
        },
        (data, all) => {
          this.storeData = data;
        }
      );
    },
    goStore(item) {
      this.$router.push("/websiteFir/detailFirst/1");
    },
    changePage(e) {
      this.storeData.pageNumber = e;
      this.getData();
    }
  }
};
</script>
