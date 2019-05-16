<template>
  <el-card class="box-card">

    <el-form :label-position="'right'" :inline="true" label-width="120px" :model="searchForm">
      <el-form-item label="选择站点">
        <el-select v-model="site" placeholder="请选择" class="select-site" @change="changeSiteSearch">
          <el-option
            v-for="item in site_infos"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.url }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商家信息">
        <el-input v-model="searchForm.store_info" class="select-site" @blur=""></el-input>
      </el-form-item>
      <el-form-item label="有效优惠券范围">
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-input-number v-model="searchForm.coupon_num_range_gte"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-input-number v-model="searchForm.coupon_num_range_lte" @blur=""></el-input-number>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="选择标签">
        <el-select v-model="searchForm.tag" placeholder="请选择" class="select-site" @change="">
          <el-option
            v-for="item in tags"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
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

    <el-tabs v-model="activeTab">
      <el-tab-pane label="站点监测" name="info">
        <site-info :site="site" :site_infos="site_infos"></site-info>
      </el-tab-pane>
      <el-tab-pane label="商家列表" name="store">
        <site-store
          :site="site"
          :store_infos="store_infos"
          :count="store_count"
          :page="store_page"
          @changeStorePage="changeStorePage"
          @selectStoreId="selectStoreId"></site-store>
      </el-tab-pane>
      <el-tab-pane label="优惠券列表" name="coupon">
        <site-coupon
          :site="site"
          :coupon_infos="coupon_infos"
          :count="coupon_count"
          :page="coupon_page"
          @changeCouponPage="changeCouponPage"></site-coupon>
      </el-tab-pane>
      <el-tab-pane label="分类列表" name="category">
        <site-category
          :site="site"
          :category_infos="category_infos"
          :count="category_count"
          :page="category_page"
          :category_cache_infos="category_cache_infos"
          @changeCategoryPage="changeCategoryPage">
        </site-category>
      </el-tab-pane>
      <el-tab-pane label="标签列表" name="tag">
        <site-tag
          :site="site"
          :tag_infos="tag_infos"
          :count="tag_count"
          :page="tag_page"
          @changeTagPage="changeTagPage"></site-tag>
      </el-tab-pane>
      <el-tab-pane label="推荐" name="recommend">
        <site-recommend
          :site="site"
          :store_recommend_infos="store_recommend_infos"
          :coupon_recommend_infos="coupon_recommend_infos"
          :store_count="store_recommend_count"
          :coupon_count="coupon_recommend_count"
          :store_page="store_recommend_page"
          :coupon_page="coupon_recommend_page"
          @changeStoreRecommendPage="changeStoreRecommendPage"
          @changeCouponRecommendPage="changeCouponRecommendPage"
          ></site-recommend>
      </el-tab-pane>
      <el-tab-pane label="模板" name="template">
        <site-template
          :site="site"
          :template_infos="template_infos"
          :count="template_count"
          :page="template_page"
          @changeTemplatePage="changeTemplatePage"
          @changeSelectType="changeSelectType"></site-template>
      </el-tab-pane>
    </el-tabs>

  </el-card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SiteCategory from '@/views/data/components/SiteCategory'
  import SiteCoupon from '@/views/data/components/SiteCoupon'
  import SiteStore from '@/views/data/components/SiteStore'
  import SiteInfo from '@/views/data/components/SiteInfo'
  import SiteTag from '@/views/data/components/SiteTag'
  import SiteTemplate from '@/views/data/components/SiteTemplate'
  import SiteRecommend from '@/views/data/components/SiteRecommend'

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
        site: null,
        site_infos: [],
        store_infos: [],
        coupon_infos: [],
        category_infos: [],
        store_recommend_infos: [],
        coupon_recommend_infos: [],
        tag_infos: [],
        category_cache_infos: [],
        template_infos: [],
        tags: [],
        tag: null,
        searchForm: {
          store_info: '',
          coupon_num_range_lte: '',
          coupon_num_range_gte: '',
          country: 'US',
          has_category: '',
          coupon_title: '',
          has_expired: '',
          store: '',
          tag: ''
        },
        template: {
          location: '',
          type: ''
        },
        store_count: 0,
        coupon_count: 0,
        category_count: 0,
        tag_count: 0,
        template_count: 0,
        store_recommend_count: 0,
        coupon_recommend_count: 0,
        store_page: 1,
        coupon_page: 1,
        category_page: 1,
        tag_page: 1,
        template_page: 1,
        store_recommend_page: 1,
        coupon_recommend_page: 1
      }
    },
    watch: {
      site() {
        // this.getSiteInfo()
      },
      activeTab() {
        switch (this.activeTab) {
          case 'info':
            this.getSiteInfo()
            return
          case 'store':
            if (this.site !== null) {
              this.getSiteStore()
            } else {
              this.$message.info('请先选择站点')
            }
            return
          case 'coupon':
            if (this.site !== null) {
              this.getSiteCoupon()
              setTimeout(() => {
                this.searchForm.store = ''
              }, 2000)
            } else {
              this.$message.info('请先选择站点')
            }
            return
          case 'category':
            if (this.site !== null) {
              this.getSiteCategory()
            } else {
              this.$message.info('请先选择站点')
            }
            return
          case 'tag':
            if (this.site !== null) {
              this.getSiteTag()
            } else {
              this.$message.info('请先选择站点')
            }
            return
          case 'recommend':
            if (this.site !== null) {
              this.getSiteRecommend()
            } else {
              this.$message.info('请先选择站点')
            }
            return
          case 'template':
            if (this.site !== null) {
              this.getSiteTemplate()
            } else {
              this.$message.info('请先选择站点')
            }
            return
        }
      }
    },
    mounted() {
      this.getSiteInfo()
      this.getAllCategoryCache()
    },
    methods: {
      getSiteInfo() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.get('/site/info?site=' + this.site).then((res) => {
          this.site_infos = res.data
          loading.close()
        }).catch(() => {
          loading.close()
        })
      },
      getTagInfo() {
        this.$request.get('/site/tag?site=' + this.site).then((res) => {
          this.tags = res.data
        }).catch(() => {
        })
      },
      getSiteStore() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const searchForm = this.searchForm
        searchForm['site'] = this.site
        searchForm['page'] = this.store_page
        this.$request.get('/site/store', {
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
      getSiteCoupon() {
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
        this.$request.get('/site/coupon', {
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
      getSiteCategory() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const searchForm = this.searchForm
        searchForm['site'] = this.site
        searchForm['page'] = this.category_page
        this.$request.get('/site/category', {
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
      getSiteTag() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const searchForm = this.searchForm
        searchForm['page'] = this.category_page
        this.$request.get('/site/tag/list?page=' + this.tag_page + '&site=' + this.site).then((res) => {
          this.tag_infos = res.data['tag']
          this.tag_count = res.data['count']
          this.tag_page = res.data['page']
          loading.close()
        }).catch(() => {
          loading.close()
        })
      },
      getSiteRecommend() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.get('/site/store/recommend?page=' + this.store_recommend_page + '&site=' + this.site).then((res) => {
          this.store_recommend_infos = res.data['store']
          this.store_recommend_count = res.data['count']
          this.store_recommend_page = res.data['page']
          this.$request.get('/site/coupon/recommend?page=' + this.coupon_recommend_page + '&site=' + this.site).then((res) => {
            this.coupon_recommend_infos = res.data['coupon']
            this.coupon_recommend_count = res.data['count']
            this.coupon_recommend_page = res.data['page']
            loading.close()
          }).catch(() => {
            this.$message.error('获取推荐数据出错')
            loading.close()
          })
        }).catch(() => {
          this.$message.error('获取推荐数据出错')
          loading.close()
        })
      },
      getSiteTemplate() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.get('/site/template?site=' + this.site + '&location=' + this.template.location + '&type=' + this.template.type).then((res) => {
          this.template_infos = res.data
          loading.close()
        }).catch(() => {
          loading.close()
        })
      },
      changeStorePage(page) {
        this.store_page = page
        this.getSiteStore()
      },
      changeCouponPage(page) {
        this.coupon_page = page
        this.getSiteCoupon()
      },
      changeCategoryPage(page) {
        this.category_page = page
        this.getSiteCategory()
      },
      changeTagPage(page) {
        this.tag_page = page
        this.getSiteTag()
      },
      changeStoreRecommendPage(page) {
        this.store_recommend_page = page
        this.getSiteRecommend()
      },
      changeCouponRecommendPage(page) {
        this.coupon_recommend_page = page
        this.getSiteRecommend()
      },
      changeTemplatePage(page) {
        this.template_page = page
        this.getSiteTemplate()
      },
      changeSelectType(data) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.get('/site/template?site=' + this.site + '&location=' + data.location + '&type=' + data.type).then((res) => {
          this.template.location = data.location
          this.template.type = data.type
          this.template_infos = res.data
          loading.close()
        }).catch(() => {
          loading.close()
        })
      },
      changeSiteSearch() {
        this.getTagInfo()
        switch (this.activeTab) {
          case 'info':
            this.getSiteInfo()
            return
          case 'store':
            this.getSiteStore()
            return
          case 'coupon':
            this.getSiteCoupon()
            return
          case 'category':
            this.getSiteCategory()
            return
          case 'tag':
            this.getSiteTag()
            return
          case 'recommend':
            this.getSiteRecommend()
            return
          case 'template':
            this.getSiteTemplate()
            return
        }
      },
      changeStoreSearch() {
        this.activeTab = 'store'
        this.getSiteStore()
      },
      changeCouponSearch() {
        this.activeTab = 'coupon'
        this.getSiteCoupon()
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
        this.searchForm.tag = null
      },
      resetCouponSearch() {
        this.searchForm.coupon_title = ''
        this.searchForm.has_expired = ''
        this.searchForm.store = ''
      },
      getAllCategoryCache() {
        this.$request.get('/site/category_cache/all').then((res) => {
          this.category_cache_infos = res.data
        }).catch(() => {
          this.$message.error('爬虫分类获取出错')
        })
      }
    },
    components: {
      SiteCategory,
      SiteCoupon,
      SiteStore,
      SiteInfo,
      SiteTag,
      SiteTemplate,
      SiteRecommend
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
