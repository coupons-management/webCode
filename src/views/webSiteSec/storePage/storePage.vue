<template>
  <div class="store">
    <div class="title">Stores in VOUCHERPA-TEST</div>
    <div class="store-list">
      <div class="item" v-for="item in storeData.list" @click="goStore(item)">{{item.showName}}</div>
    </div>

    <div style="text-align: center;margin-top: 15px;">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="storeData.totalCount"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "storePage",
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
          siteId: /* this.siteId || */ 2,
          pageNumber: this.storeData.pageNumber,
          pageSize: this.storeData.pageSize
        },
        (data, all) => {
          this.storeData = data;
        }
      );
    },
    goStore(item) {
      this.$router.push(`/websiteSec/hotStores/${item.webSite}`);
    },
    changePage(e) {
      this.storeData.pageNumber = e;
      this.getData();
    }
  }
};
</script>

<style scoped lang="scss">
.store {
  .title {
    text-align: center;
    padding: 20px 0;
    font-size: 22px;
    background-color: #fff;
  }
  .store-list {
    padding: 20px 13%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .item {
      flex: 0 0 25%;
      padding: 5px 0;
      font-size: 22px;
      text-decoration: none;
      color: black;
      cursor: pointer;
    }
  }
}
</style>