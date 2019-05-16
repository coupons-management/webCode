<style lang="scss" scoped>
  @import "./classify.scss";
</style>

<template>
  <section class="classify">

    <section class="classifyTitle">
      Categories in DISCOUNTMM
    </section>

    <section class="TopCategories">
      <section class="CategoriesList">
        <div v-for="(item,index) in CategoriesList" :class="(index+1)%5==0?'':'borderStyle'">
          <i class="el-icon-tickets"></i>
          <span>ShoppingMall</span>
        </div>
      </section>
    </section>

  </section>
</template>
<script src="./classify.js"></script>
