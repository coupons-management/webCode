<style lang="scss" scoped>
  @import "./layout.scss";
</style>

<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container" v-if="isLogin">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script src="./layout.js"></script>

