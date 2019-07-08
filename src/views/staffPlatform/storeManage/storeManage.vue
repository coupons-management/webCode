<style lang="scss" scoped>
@import "./storeManage.scss";
</style>

<template>
  <section class="siteHomePage">
    <section class="topNavList">
      <div v-for="item in navList" @click="toggleNav(item)" :class="item.state?'activeBtn':''">{{item.name}}</div>
    </section>
    <maintainStore v-if="navState.maintain"></maintainStore>
    <couponInfo v-if="navState.coupon"></couponInfo>
    <storeInfo v-if="navState.store"></storeInfo>
  </section>
</template>

<script src="./storeManage.js"></script>
