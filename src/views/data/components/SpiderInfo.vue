<template>
    <div>
        <div v-for="info in site_infos" class="info-list">
            <el-card class="box-card">
            <p>爬虫别名: {{info.name}}</p>
            <p>商家数量: {{info.count}}</p>
            <p>优惠券数量: {{info.coupon_count}}</p>
            </el-card>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    props: {
      site: {
        type: String,
        default: 'all'
      },
      site_infos: {
        type: Array
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .info-list {
        font-size: small;
        margin-bottom: 30px;
    }
</style>
