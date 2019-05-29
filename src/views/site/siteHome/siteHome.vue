<style lang="scss" scoped>
@import "./siteHome.scss";
</style>

<template>
  <section class="siteHomePage">
    <section class="topNavList">
      <div v-for="item in navList" @click="toggleNav(item)" :class="item.state?'activeBtn':''">{{item.name}}</div>
    </section>
    <siteCoupon v-if="navState.coupon"></siteCoupon>
    <siteManage v-if="navState.site"></siteManage>
    <siteMaintain v-if="navState.maintain"></siteMaintain>
    <siteStat v-if="navState.stat"></siteStat>
    <siteStore v-if="navState.store"></siteStore>
  </section>
</template>

<script src="./siteHome.js"></script>
