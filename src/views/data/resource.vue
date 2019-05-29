<template>
    <el-card class="box-card">

        <el-form :label-position="'right'" :inline="true" label-width="120px" :model="searchForm" size="mini">
            <el-form-item label="选择爬虫">
                <el-select v-model="site" placeholder="请选择" class="select-site" @change="changeSpiderSearch">
                    <el-option
                            v-for="item in sites"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        <span style="float: left">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商家信息">
                <el-input v-model="searchForm.store_info" class="select-site" @blur=""></el-input>
            </el-form-item>
            <el-form-item label="有效优惠券范围">
                <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-input-number v-model="searchForm.coupon_num_range_gte" ></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-input-number v-model="searchForm.coupon_num_range_lte" @blur=""></el-input-number>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="所属国家">
                <el-select v-model="searchForm.country" placeholder="请选择" class="select-site" @change="">
                    <el-option
                            :label="'美国'"
                            :value="'US'">
                        <span style="float: left">美国</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">US</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否有分类">
                <el-select v-model="searchForm.has_category" placeholder="请选择" class="select-site" @change="">
                    <el-option
                            :label="'有分类'"
                            :value="'Y'">
                        <span style="float: left">有分类</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">Y</span>
                    </el-option>
                    <el-option
                            :label="'无分类'"
                            :value="'N'">
                        <span style="float: left">无分类</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">N</span>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-form  label-width="120px" >
          <el-form-item>
              <el-button type="primary" @click="changeStoreSearch">搜索</el-button>
              <el-button @click="resetStoreSearch">重置</el-button>
          </el-form-item>
        </el-form>

        <el-form :label-position="'right'" :inline="true" label-width="120px" :model="searchForm">
            <el-form-item label="优惠券所属商家">
                <el-input v-model="searchForm.store" class="select-site" @blur=""></el-input>
            </el-form-item>
            <el-form-item label="优惠券标题">
                <el-input v-model="searchForm.coupon_title" class="select-site" @blur=""></el-input>
            </el-form-item>
            <el-form-item label="优惠券是否过期">
                <el-select v-model="searchForm.has_expired" placeholder="请选择" class="select-site" @change="">
                    <el-option
                            :label="'未过期'"
                            :value="'N'">
                        <span style="float: left">未过期</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">N</span>
                    </el-option>
                    <el-option
                            :label="'已过期'"
                            :value="'Y'">
                        <span style="float: left">已过期</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">Y</span>
                    </el-option>
                </el-select>
            </el-form-item>

        </el-form>
        <el-form  label-width="120px" >
          <el-form-item>
              <el-button type="primary" @click="changeCouponSearch">搜索</el-button>
              <el-button @click="resetCouponSearch">重置</el-button>
          </el-form-item>
        </el-form>

        <el-form :label-position="'right'" :inline="true" label-width="120px" :model="searchCategoryForm">
            <el-form-item label="分类类别">
                <el-select v-model="searchCategoryForm.is_manual" placeholder="请选择" class="select-site" @change="">
                    <el-option
                            :label="'全部'"
                            :value="false">
                        <span style="float: left">全部</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">false</span>
                    </el-option>
                    <el-option
                            :label="'人工'"
                            :value="true">
                        <span style="float: left">人工</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">true</span>
                    </el-option>
                </el-select>
            </el-form-item>

        </el-form>
        <el-form  label-width="120px" >
          <el-form-item>
              <el-button type="primary" @click="changeCategorySearch">搜索</el-button>
              <el-button @click="resetCategorySearch">重置</el-button>
          </el-form-item>
        </el-form>

        <el-tabs v-model="activeTab">
            <el-tab-pane label="爬虫信息" name="info">
                <spider-info :site="site" :site_infos="site_infos"></spider-info>
            </el-tab-pane>
            <el-tab-pane label="商家列表" name="store">
                <spider-store
                        :site="site"
                        :store_infos="store_infos"
                        :count="store_count"
                        :page="store_page"
                        @changeStorePage="changeStorePage"
                        @selectStoreId="selectStoreId"></spider-store>
            </el-tab-pane>
            <el-tab-pane label="优惠券列表" name="coupon">
                <spider-coupon
                        :site="site"
                        :coupon_infos="coupon_infos"
                        :count="coupon_count"
                        :page="coupon_page"
                        @changeCouponPage="changeCouponPage"></spider-coupon>
            </el-tab-pane>
            <el-tab-pane label="分类列表" name="category">
                <spider-category
                        :site="site"
                        :category_infos="category_infos"
                        :count="category_count"
                        :page="category_page"
                        @changeCategoryPage="changeCategoryPage"></spider-category>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SpiderCategory from '@/views/data/components/SpiderCategory'
  import SpiderCoupon from '@/views/data/components/SpiderCoupon'
  import SpiderStore from '@/views/data/components/SpiderStore'
  import SpiderInfo from '@/views/data/components/SpiderInfo'

  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    data() {
      return {
        activeTab: '',
        sites: [
          {
            value: 'all',
            label: '全部'
          },
          {
            value: 'manual',
            label: '手动添加'
          },
          {
            value: 'good_search',
            label: 'GoodSearch'
          },
          {
            value: 'offers',
            label: 'Offers'
          }
        ],
        site: 'all',
        site_infos: [],
        store_infos: [],
        coupon_infos: [],
        category_infos: [],
        searchForm: {
          store_info: '',
          coupon_num_range_lte: '',
          coupon_num_range_gte: '',
          country: 'US',
          has_category: '',
          coupon_title: '',
          has_expired: '',
          store: ''
        },
        searchCategoryForm: {
          is_manual: false
        },
        store_count: 0,
        coupon_count: 0,
        category_count: 0,
        store_page: 1,
        coupon_page: 1,
        category_page: 1
      }
    },
    watch: {
      site() {
        // this.getSpiderInfo()
      },
      activeTab() {
        switch (this.activeTab) {
          case 'info':
            this.getSpiderInfo()
            return
          case 'store':
            this.getSpiderStore()
            return
          case 'coupon':
            this.getSpiderCoupon()
            return
          case 'category':
            this.getSpiderCategory()
            return
        }
      }
    },
    mounted() {
      // this.getSpiderInfo()
    },
    methods: {
      getSpiderInfo() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.get('/spider/info?site=' + this.site).then((res) => {
          this.site_infos = res.data
          loading.close()
        }).catch(() => {
          loading.close()
        })
      },
      getSpiderStore() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const searchForm = this.searchForm
        searchForm['site'] = this.site
        searchForm['page'] = this.store_page
        console.log(searchForm)
        this.$request.get('/spider/store', {
          params: searchForm
        }).then((res) => {
          this.store_infos = res.data['store']
          this.store_count = res.data['count']
          this.store_page = res.data['page']
          console.log(this.store_infos)
          loading.close()
        }).catch(() => {
          loading.close()
        })
      },
      getSpiderCoupon() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const searchForm = this.searchForm
        searchForm['site'] = this.site
        searchForm['page'] = this.coupon_page
        console.log(searchForm)
        this.$request.get('/spider/coupon', {
          params: searchForm
        }).then((res) => {
          this.coupon_infos = res.data['coupon']
          this.coupon_count = res.data['count']
          this.coupon_page = res.data['page']
          console.log(this.coupon_infos)
          loading.close()
        }).catch(() => {
          loading.close()
        })
      },
      getSpiderCategory() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const searchForm = this.searchForm
        searchForm['site'] = this.site
        searchForm['page'] = this.category_page
        searchForm['is_manual'] = this.searchCategoryForm.is_manual
        this.$request.get('/spider/category', {
          params: searchForm
        }).then((res) => {
          this.category_infos = res.data['category']
          this.category_count = res.data['count']
          this.category_page = res.data['page']
          loading.close()
        }).catch(() => {
          loading.close()
        })
      },
      changeStorePage(page) {
        this.store_page = page
        this.getSpiderStore()
      },
      changeCouponPage(page) {
        this.coupon_page = page
        this.getSpiderCoupon()
      },
      changeCategoryPage(page) {
        this.category_page = page
        this.getSpiderCategory()
      },
      changeSpiderSearch() {
        switch (this.activeTab) {
          case 'info':
            this.getSpiderInfo()
            return
          case 'store':
            this.getSpiderStore()
            return
          case 'coupon':
            this.getSpiderCoupon()
            return
          case 'category':
            this.getSpiderCategory()
            return
        }
      },
      changeStoreSearch() {
        this.activeTab = 'store'
        this.getSpiderStore()
      },
      changeCouponSearch() {
        this.activeTab = 'coupon'
        this.getSpiderCoupon()
      },
      changeCategorySearch() {
        this.activeTab = 'category'
        this.getSpiderCategory()
      },
      selectStoreId(id) {
        this.searchForm.store = id
        this.activeTab = 'coupon'
      },
      resetStoreSearch() {
        this.searchForm.store_info = ''
        this.searchForm.coupon_num_range_lte = ''
        this.searchForm.coupon_num_range_gte = ''
        this.searchForm.country = 'US'
        this.searchForm.has_category = 'US'
        this.changeStoreSearch()
      },
      resetCouponSearch() {
        this.searchForm.coupon_title = ''
        this.searchForm.has_expired = ''
        this.searchForm.store = ''
        this.changeCouponSearch()
      },
      resetCategorySearch() {
        this.searchCategoryForm.is_manual = false
      }
    },
    components: {
      SpiderCategory,
      SpiderCoupon,
      SpiderStore,
      SpiderInfo
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .box-card {
        margin: 20px 20px;
        min-height: 800px;
    }
    .select-site {
        width: 390px;
    }
    .line {
        text-align: center;
    }
</style>
