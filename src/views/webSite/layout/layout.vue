<style scoped lang="scss">
@import "./layout.scss";
</style>
<template>
  <section class="pageStyle" style="height: 100vh;">
    <section class="topNav">
      <img src="static/imgs/logo1.jpg" @click="goToPage('homePage')" style="cursor: pointer">
      <!--<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-submenu index="1">
          <template slot="title">STROES</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
            <el-menu-item index="1-4-2">选项2</el-menu-item>
            <el-menu-item index="1-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">CATEGORIES</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">TOP COUPONS</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
          <el-menu-item index="3-3">选项3</el-menu-item>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项1</el-menu-item>
            <el-menu-item index="3-4-2">选项2</el-menu-item>
            <el-menu-item index="3-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>-->
      <div class="topBtns">
        <span @click="goToPage('storePage')">STORES</span>
        <span @click="goToPage('categoryPage')">CATEGORIES</span>
        <span @click="goToPage('detailFirst/1')">TOP COUPONS</span>
        <el-input placeholder="Search for stores,offers or brands" v-model="input2" size="mini">
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            style="cursor: pointer"
            @click="search"
          ></i>
        </el-input>
      </div>
    </section>

    <!--<section class="topText">{{greenText}}</section> -->
    <!--v-show="greenTextState"-->
    <!--<section class="topText" style="text-align: left;">
      <div>Clothes</div>
      <div style="font-size: 14px;">In the summer holiday day,I like eating watermelon.</div>
    </section>-->
    <section class="topText" style="text-align: left;"></section>
    <!--<section class="wordsList"><span v-for="word in wordsList">{{word}}</span></section>-->
    <div class="website-page">
      <router-view>
        <!-- <homePage v-show="showPage.homePage"></homePage>
      <searchPage v-show="showPage.searchPage"></searchPage>
      <aboutUs v-show="showPage.aboutUs"></aboutUs>
      <categoryPage v-show="showPage.categoryPage"></categoryPage>
      <storePage v-show="showPage.storePage"></storePage>
        <detailFirst v-show="showPage.detailFirst"></detailFirst>-->
      </router-view>
    </div>

    <section class="bottomNav">
      <img src="static/imgs/logo1.jpg">
      <section>
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
    </section>
    <section class="bottomText">
      <div>Copyright © 2018.All rights reserved.</div>
    </section>
  </section>
</template>

<script src="./layout.js"></script>
