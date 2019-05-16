<template>
    <div>
        <el-dialog title="编辑优惠券" :visible.sync="dialogFormAdd" width="50%">
            <el-form :label-position="'top'" >
                <el-form-item label="所属商家">
                    <el-input v-model="addCouponForm.store" disabled class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="addCouponForm.name" disabled class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="转换后标题">
                    <el-input v-model="addCouponForm.alias_name" class="select-site"></el-input>
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
                                :value="true"
                                :key="true">
                            <span style="float: left">已验证</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">true</span>
                        </el-option>
                        <el-option
                                :label="'否'"
                                :key="false"
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
                <el-form-item label="创建时间">
                    <el-input v-model="addCouponForm.create_time" disabled class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="更新时间">
                    <el-input v-model="addCouponForm.update_time" disabled class="select-site"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAdd = false">取 消</el-button>
                <el-button type="primary" @click="saveCoupon">确 定</el-button>
            </div>
        </el-dialog>

        <el-table
                ref="multipleTable"
                :data="coupon_infos"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="">
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
                    label="原标题"
                    width="200">
                <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
          <el-table-column
                    label="转换后标题"
                    width="200">
                <template slot-scope="scope">
                  <div v-if="scope.row.alias_name !== ''">
                    {{ scope.row.alias_name }}
                  </div>
                  <div v-else>
                    未转化
                  </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="所属商家"
                    width="120">
                <template slot-scope="scope">{{ scope.row.store }}</template>
            </el-table-column>
            <el-table-column
                    label="CODE">
                <template slot-scope="scope">{{ scope.row.code }}</template>
            </el-table-column>
            <el-table-column
                    label="类型">
                <template slot-scope="scope">{{ scope.row.coupon_type }}</template>
            </el-table-column>
            <el-table-column
                    label="优惠券链接"
                    width="180">
                <template slot-scope="scope"><a :href="scope.row.link">{{scope.row.link}}</a></template>
            </el-table-column>
            <el-table-column
                    label="是否过期">
                <template slot-scope="scope">{{ scope.row.is_expire }}</template>
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="105">
                <template slot-scope="scope">{{ scope.row.is_delete }}</template>
            </el-table-column>
            <el-table-column
                    label="创建日期"
                    width="180">
                <template slot-scope="scope">{{ scope.row.create_time }}</template>
            </el-table-column>
            <el-table-column
                    label="更新日期"
                    width="180">
                <template slot-scope="scope">{{ scope.row.update_time }}</template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="120">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="editCoupon(scope.row)"
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
                            @click.native.prevent="deleteCoupon(scope.row.id)"
                            type="text"
                            size="small">
                        移除
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
                    @current-change="changeCouponPage">
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
      coupon_infos: {
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
        dialogFormAdd: false,
        page: 1,
        addCouponForm: {
          id: '',
          store: '',
          name: '',
          alias_name: '',
          description: '',
          coupon_type: '',
          code: '',
          verify: '',
          expire_at: '',
          link: '',
          important: '',
          used_times: '',
          create_time: '',
          update_time: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      changeCouponPage(page) {
        this.page = page
        this.$emit('changeCouponPage', this.page)
      },
      deleteCoupon(id) {
        this.$request.delete('/site/coupon?coupon_id=' + id).then(() => {
          this.$message.success('删除成功')
          this.changeCouponPage(this.page)
        }
        ).catch(() => {
          this.$message.error('删除出错')
        }
        )
      },
      setRecommend(id) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.post('/site/coupon/recommend', {
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
      editCoupon(row) {
        this.dialogFormAdd = true
        this.addCouponForm = row
      },
      saveCoupon() {
        const addCouponForm = this.addCouponForm
        addCouponForm['site'] = this.site
        this.$request.put('/site/coupon', addCouponForm).then(() => {
          this.changeCouponPage(this.page)
          this.$message.success('保存成功')
          this.dialogFormAdd = false
        }).catch(() => {
          this.$message.error('保存出错')
          this.dialogFormAdd = false
        })
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
</style>
