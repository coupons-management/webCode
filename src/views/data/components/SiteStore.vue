<template>
    <div>

        <el-dialog title="编辑商家" :visible.sync="dialogFormEdit" :inline="true" width="50%">
            <el-form :label-position="'left'" >
                <el-form-item label="商家名">
                    <el-input v-model="storeFormEdit.name" disabled class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="官网">
                    <el-input v-model="storeFormEdit.website" disabled class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="LOGO">
                    <el-input v-model="storeFormEdit.picture" disabled class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="storeFormEdit.category" placeholder="请选择" class="push-store-dialog">
                        <el-option
                                v-for="item in catgory_cache"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            <span style="float: left">{{ item.name }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="国家">
                    <el-input v-model="storeFormEdit.country" disabled class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="广告地址">
                    <el-input type="textarea" autosize v-model="storeFormEdit.advertising" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-select v-model="storeFormEdit.tag" multiple placeholder="请选择" class="push-store-dialog">
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
                <el-form-item label="显示爬虫优惠券">
                    <el-select v-model="storeFormEdit.show_spider_coupon" placeholder="请选择" class="push-store-dialog">
                        <el-option
                                :label="'显示'"
                                :value="true">
                            <span style="float: left">显示</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">Y</span>
                        </el-option>
                        <el-option
                                :label="'不显示'"
                                :value="false">
                            <span style="float: left">不显示</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">N</span>
                        </el-option>
                    </el-select>
                </el-form-item>
              <el-form-item label="优惠券点击次数">
                    <el-input v-model="storeFormEdit.coupon_used_times" disabled class="select-site"></el-input>
                </el-form-item>
              <el-form-item label="浏览次数">
                    <el-input v-model="storeFormEdit.view_times" disabled class="select-site"></el-input>
                </el-form-item>
              <el-form-item label="创建时间">
                    <el-input v-model="storeFormEdit.create_time" disabled class="select-site"></el-input>
                </el-form-item>
              <el-form-item label="优惠券更新时间">
                    <el-input v-model="storeFormEdit.coupon_update_time" disabled class="select-site"></el-input>
                </el-form-item>
              <el-form-item label="meta title">
                    <el-input v-model="storeFormEdit.meta_title" class="select-site"></el-input>
                </el-form-item>
              <el-form-item label="mete keyword">
                    <el-input v-model="storeFormEdit.meta_keyword" class="select-site"></el-input>
                </el-form-item>
              <el-form-item label="meta description">
                    <el-input v-model="storeFormEdit.meta_description" class="select-site"></el-input>
                </el-form-item>
              <el-form-item label="商家名标题H1">
                    <el-input v-model="storeFormEdit.h1_title" class="select-site"></el-input>
                </el-form-item>
              <el-form-item label="商家介绍">
                    <el-input v-model="storeFormEdit.description" autosize type="textarea" class="select-site"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="saveStore">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="新增优惠券" :visible.sync="dialogFormAdd" width="50%">
            <el-form :label-position="'top'" >
                <el-form-item label="商家 ID">
                    <el-input v-model="addCouponForm.store_id" disabled class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="商家名">
                    <el-input v-model="addCouponForm.store_name" disabled class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="优惠券标题">
                    <el-input v-model="addCouponForm.name" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="优惠券描述">
                    <el-input v-model="addCouponForm.description" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="优惠券类型">
                  <el-select v-model="addCouponForm.coupon_type" placeholder="请选择" class="push-store-dialog">
                        <el-option
                                :label="'CODE'"
                                :value="'CODE'">
                            <span style="float: left">CODE</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">code</span>
                        </el-option>
                        <el-option
                                :label="'DEAL'"
                                :value="'DEAL'">
                            <span style="float: left">DEAL</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">DEAL</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优惠券码">
                    <el-input v-model="addCouponForm.code" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="是否验证">
                  <el-select v-model="addCouponForm.verify" placeholder="请选择" class="push-store-dialog">
                        <el-option
                                :label="'是'"
                                :value="true">
                            <span style="float: left">已验证</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">true</span>
                        </el-option>
                        <el-option
                                :label="'否'"
                                :value="false">
                            <span style="float: left">未验证</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">false</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="过期时间">
                  <el-date-picker v-model="addCouponForm.expire_at" type="date" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="优惠券链接">
                    <el-input v-model="addCouponForm.link" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="优惠券排序">
                  <el-input-number v-model="addCouponForm.important" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="点击次数">
                    <el-input v-model="addCouponForm.used_times" disabled class="select-site"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAdd = false">取 消</el-button>
                <el-button type="primary" @click="addNewCoupon">确 定</el-button>
            </div>
        </el-dialog>

        <el-table
                ref="multipleTable"
                :data="store_infos"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="changeSelection">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="ID"
                    width="55">
                <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column
                    label="商家名称"
                    width="120">
                <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
                    label="官网"
                    width="120">
                <template slot-scope="scope">{{ scope.row.website }}</template>
            </el-table-column>
            <el-table-column
                    label="LOGO">
                <template slot-scope="scope"><img :src="scope.row.logo" width="30" height="30" alt=""></template>
            </el-table-column>
            <el-table-column
                    label="浏览次数">
                <template slot-scope="scope">{{ scope.row.view_times }}</template>
            </el-table-column>
            <el-table-column
                    label="优惠券使用次数">
                <template slot-scope="scope">{{ scope.row.coupon_use_times }}</template>
            </el-table-column>
            <el-table-column
                    label="过期优惠券">
                <template slot-scope="scope">{{ scope.row.expired_count }}</template>
            </el-table-column>
            <el-table-column
                    label="更新日期"
                    width="180">
                <template slot-scope="scope">{{ scope.row.updated_date }}</template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="120">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="editStore(scope.row.id)"
                            type="text"
                            size="small">
                        编辑
                    </el-button>
                    <br>
                    <el-button
                            @click.native.prevent="setRecommend(scope.row.id)"
                            type="text"
                            size="small">
                        设为推荐
                    </el-button>
                    <br>
                    <el-button
                            @click.native.prevent="showCoupon(scope.row.id)"
                            type="text"
                            size="small">
                        查看优惠券
                    </el-button>
                    <br>
                    <el-button
                            @click.native.prevent="addCoupon(scope.row.id, scope.row.name)"
                            type="text"
                            size="small">
                        新增优惠券
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="count"
                    :page-size="20"
                    :current-page="page"
                    @current-change="changeStorePage">
            </el-pagination>
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
        type: Number,
        default: 'all'
      },
      store_infos: {
        type: Array
      },
      count: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number
      }
    },
    data() {
      return {
        page: 1,
        dialogFormPush: false,
        dialogFormAdd: false,
        dialogFormEdit: false,
        show_sites: [],
        catgory_cache: [],
        tags: [],
        show_site: '',
        select_id: [],
        storeForm: {
          name: '',
          website: '',
          picture: '',
          category: 0,
          country: ''
        },
        addCouponForm: {
          store_id: '',
          store_name: '',
          name: '',
          description: '',
          coupon_type: '',
          code: '',
          verify: true,
          expire_at: '',
          link: '',
          important: 10000,
          used_times: '',
          create_time: '',
          update_time: ''
        },
        storeFormEdit: {
          id: 0,
          name: '',
          website: '',
          picture: '',
          category: {},
          country: '',
          create_time: '',
          coupon_used_times: '',
          coupon_update_time: '',
          advertising: '',
          meta_description: '',
          meta_keyword: '',
          meta_title: '',
          h1_title: '',
          description: '',
          used_times: '',
          view_times: '',
          tag: [],
          show_spider_coupon: true
        }
      }
    },
    mounted() {
    },
    methods: {
      changeStorePage(page) {
        this.page = page
        this.$emit('changeStorePage', this.page)
      },
      deleteStore(id) {
        this.$request.delete('/spider/store', {
          params: {
            store_id: id
          }
        }).then(() => {
          this.changeStorePage(this.page)
          this.$message.success('删除成功')
        }
        ).catch(() => {
          this.$message.error('删除出错')
        }
        )
      },
      changeSelection(selection) {
        let x
        this.select_id = []
        for (x in selection) {
          this.select_id.push(selection[x]['id'])
        }
      },
      showPushStore() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.get('/spider/show_sites').then((res) => {
          this.show_sites = res.data
          loading.close()
          this.dialogFormPush = true
        }).catch(() => {
          this.$message.error('内部出错')
          loading.close()
        })
      },
      showAddStore() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.get('/site/category/all?site=' + this.site).then((res) => {
          this.catgory_cache = res.data
          loading.close()
          this.dialogFormAdd = true
        }).catch(() => {
          this.$message.error('内部出错')
          loading.close()
        })
      },
      pushStore() {
        this.dialogFormPush = false
        this.$request.put('/spider/store', {
          select_id: this.select_id,
          show_site: this.show_site
        }).then(() => {
          this.$message.success('推送成功')
          this.changeStorePage(this.page)
        }).catch(() => {
          this.$message.error('推送失败')
        })
      },
      addNewCoupon() {
        this.dialogFormAdd = false
        const addCouponForm = this.addCouponForm
        addCouponForm['site'] = this.site
        this.$request.post('/site/coupon', addCouponForm).then(() => {
          this.addCouponForm = {
            store_id: '',
            store_name: '',
            name: '',
            description: '',
            coupon_type: '',
            code: '',
            verify: '',
            expire_at: '',
            link: '',
            important: '',
            used_times: ''
          }
          this.$message.success('保存成功')
        }).then(() => {
          // this.$message.error('保存失败')
        })
      },
      saveStore() {
        this.dialogFormEdit = false
        const storeFormEdit = this.storeFormEdit
        storeFormEdit['site'] = this.site
        this.$request.post('/site/store/save', storeFormEdit).then(() => {
          this.$message.success('保存成功')
          this.changeStorePage(this.page)
        }).catch(() => {
          this.$message.error('保存失败')
        })
      },
      editStore(id) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.get('/site/category/all?site=' + this.site).then((res) => {
          this.catgory_cache = res.data
          this.$request.get('/site/tag?site=' + this.site).then((res) => {
            this.tags = res.data
            this.$request.get('/site/store/info?site=' + this.site + '&store_id=' + id).then((res) => {
              loading.close()
              this.storeFormEdit = res.data
              this.dialogFormEdit = true
            }).catch(() => {
              this.$message.error('内部出错')
              loading.close()
            })
          }).catch(() => {
            this.$message.error('内部出错')
            loading.close()
          })
        }).catch(() => {
          this.$message.error('内部出错')
          loading.close()
        })
      },
      setRecommend(id) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.post('/site/store/recommend', {
          id: id,
          site: this.site
        }).then((res) => {
          loading.close()
          if (res.data === 'success') {
            this.$message.success('设置成功')
          } else {
            this.$message.error('内部出错')
          }
        }).catch(() => {
          loading.close()
          this.$message.error('内部出错')
        })
      },
      showCoupon(id) {
        this.$emit('selectStoreId', id)
      },
      addCoupon(id, name) {
        this.addCouponForm.store_id = id
        this.addCouponForm.store_name = name
        this.dialogFormAdd = true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .pagination {
        text-align: center;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .push-store-dialog {
        width: 100%;
    }
</style>
