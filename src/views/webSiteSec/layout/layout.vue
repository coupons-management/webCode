<style lang="scss" scoped>
@import "./layout.scss";
</style>

<template>
  <section class="webSiteSec">
    <section class="topPart">
      <div>
        <img src="static/imgs/logo2-1.png" @click="togglePage('homePage')">
      </div>

      <el-input placeholder="Search for stores,offers or brands" v-model="searchInput" size="small">
        <template slot="append">
          <el-button slot="append" icon="el-icon-search" @click="togglePage('homePage2')"></el-button>
        </template>
      </el-input>

      <div @click="togglePage('storePage')">STORES</div>
      <div @click="togglePage('classify')">CATEGORIES</div>
    </section>
    <section class="contentPart">
      <router-view>
        <!-- <HomePage v-show="webSitePageNav == 'homePage'"></HomePage> -->
        <!-- <Classify v-show="webSitePageNav == 'classify'"></Classify> -->
        <!-- <HotClassify v-show="webSitePageNav == 'hotClassify'"></HotClassify> -->
        <!-- <HotStores v-show="webSitePageNav == 'hotStores'"></HotStores> -->
        <!-- <StorePage v-show="webSitePageNav == 'storePage'"></StorePage> -->
      </router-view>
    </section>

    <section class="bottomPart">
      <section class="bottomNav">
        <div>
          <img src="static/imgs/logo2.png">
        </div>
        <div>
          <span>DISCOUNTMM</span>
          <span @click="goToPage('aboutUs')">About us</span>
          <span @click="goToPage('contactUs')">Contact us</span>
        </div>
        <div>
          <span>SITEMAP</span>
          <span @click="goToPage('homePage')">Home</span>
          <span @click="goToPage('storePage')">Stores</span>
        </div>
        <div>
          <span>OUR CONTACTS</span>
          <span>824 Philadelphia Pike Wilmington, DE 19809</span>
          <span>DISCOUNTMM@gmail.com</span>
        </div>
      </section>
      <section class="bottomInfo">
        <div>Copyright © 2018.All rights reserved.</div>
      </section>
    </section>
  </section>
</template>
<script src="./layout.js"></script>
