<template>
    <div>
        <el-dialog title="编辑推荐商家顺序" :visible.sync="dialogFormEditStore" :inline="true" width="39%">
            <el-form :label-position="'left'" >
                <el-form-item label="顺序">
                    <el-input v-model="editRecommend.index" class="select-site"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEditStore = false">取 消</el-button>
                <el-button type="primary" @click="saveStoreRecommend">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑推荐优惠券顺序" :visible.sync="dialogFormEditCoupon" :inline="true" width="39%">
            <el-form :label-position="'left'" >
                <el-form-item label="顺序">
                    <el-input v-model="editRecommend.index" class="select-site"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEditCoupon = false">取 消</el-button>
                <el-button type="primary" @click="saveCouponRecommend">确 定</el-button>
            </div>
        </el-dialog>

        <el-table
                ref="multipleTable"
                :data="store_recommend_infos"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="ID">
                <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column
                    label="排序">
                <template slot-scope="scope">{{ scope.row.index }}</template>
            </el-table-column>
            <el-table-column
                    label="商家 ID">
                <template slot-scope="scope">{{ scope.row.store_id }}</template>
            </el-table-column>
            <el-table-column
                    label="商家名">
                <template slot-scope="scope">{{ scope.row.store_name }}</template>
            </el-table-column>
            <el-table-column
                    label="创建日期">
                <template slot-scope="scope">{{ scope.row.create_time }}</template>
            </el-table-column>
            <el-table-column
                    label="更新日期">
                <template slot-scope="scope">{{ scope.row.update_time }}</template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="90">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="editStoreRecommendData(scope.row)"
                            type="text"
                            size="small">
                        编辑
                    </el-button>
                    <br>
                    <el-button
                            @click.native.prevent="deleteStoreRecommendData(scope.row.id)"
                            type="text"
                            size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="store_count"
                    :page-size="20"
                    :current-page="store_page"
                    @current-change="changeStoreRecommendPage">
            </el-pagination>
        </div>

        <el-table
                ref="multipleTable"
                :data="coupon_recommend_infos"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="ID">
                <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column
                    label="排序">
                <template slot-scope="scope">{{ scope.row.index }}</template>
            </el-table-column>
            <el-table-column
                    label="优惠券 ID">
                <template slot-scope="scope">{{ scope.row.coupon_id }}</template>
            </el-table-column>
            <el-table-column
                    label="优惠券名">
                <template slot-scope="scope">{{ scope.row.coupon_name }}</template>
            </el-table-column>
            <el-table-column
                    label="创建日期">
                <template slot-scope="scope">{{ scope.row.create_time }}</template>
            </el-table-column>
            <el-table-column
                    label="更新日期">
                <template slot-scope="scope">{{ scope.row.update_time }}</template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="90">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="editCouponRecommendData(scope.row)"
                            type="text"
                            size="small">
                        编辑
                    </el-button>
                    <br>
                    <el-button
                            @click.native.prevent="deleteCouponRecommendData(scope.row.id)"
                            type="text"
                            size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="coupon_count"
                    :page-size="20"
                    :current-page="coupon_page"
                    @current-change="changeCouponRecommendPage">
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
      store_recommend_infos: {
        type: Array
      },
      coupon_recommend_infos: {
        type: Array
      },
      store_count: {
        type: Number,
        default: 0
      },
      coupon_count: {
        type: Number,
        default: 0
      },
      store_pageSize: {
        type: Number
      },
      coupon_pageSize: {
        type: Number
      }
    },
    data() {
      return {
        store_page: 1,
        coupon_page: 1,
        dialogFormAdd: false,
        dialogFormEditStore: false,
        dialogFormEditCoupon: false,
        editRecommend: {
          id: '',
          index: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      changeStoreRecommendPage(page) {
        this.store_page = page
        this.$emit('changeStoreRecommendPage', this.store_page)
      },
      changeCouponRecommendPage(page) {
        this.coupon_page = page
        this.$emit('changeCouponRecommendPage', this.coupon_page)
      },
      editStoreRecommendData(row) {
        this.editRecommend = row
        this.dialogFormEditStore = true
      },
      editCouponRecommendData(row) {
        this.editRecommend = row
        this.dialogFormEditCoupon = true
      },
      saveStoreRecommend() {
        this.dialogFormEditStore = false
        const editRecommend = this.editRecommend
        editRecommend['site'] = this.site
        this.$request.put('/site/store/recommend', editRecommend).then(() => {
          this.$message.success('保存成功')
          this.editRecommend = {
            id: '',
            index: ''
          }
          this.changeStoreRecommendPage(this.store_page)
        }).catch(() => {
          this.$message.error('保存失败')
        })
      },
      deleteCouponRecommendData(id) {
        this.$request.delete('site/coupon/recommend?id=' + id).then(() => {
          this.$message.success('删除成功')
          this.changeCouponRecommendPage(this.coupon_page)
        }).catch(() => {
          this.$message.error('删除失败')
        })
      },
      deleteStoreRecommendData(id) {
        this.$request.delete('site/store/recommend?id=' + id).then(() => {
          this.$message.success('删除成功')
          this.changeStoreRecommendPage(this.store_page)
        }).catch(() => {
          this.$message.error('删除失败')
        })
      },
      saveCouponRecommend() {
        this.dialogFormEditCoupon = false
        const editRecommend = this.editRecommend
        editRecommend['site'] = this.site
        this.$request.put('/site/coupon/recommend', editRecommend).then(() => {
          this.$message.success('保存成功')
          this.editRecommend = {
            id: '',
            index: ''
          }
          this.changeCouponRecommendPage(this.coupon_page)
        }).catch(() => {
          this.$message.error('保存失败')
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
