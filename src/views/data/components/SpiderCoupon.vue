<template>
    <div>
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
                    label="优惠券标题"
                    width="200">
                <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
                    label="优惠券商家名"
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
                    label="过期时间"
                    width="180">
                <template slot-scope="scope">{{ scope.row.expire_at }}</template>
            </el-table-column>
            <el-table-column
                    label="创建日期"
                    width="180">
                <template slot-scope="scope">{{ scope.row.created_date }}</template>
            </el-table-column>
            <el-table-column
                    label="更新日期"
                    width="180">
                <template slot-scope="scope">{{ scope.row.updated_date }}</template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="60">
                <template slot-scope="scope">
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
        type: String,
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
        page: 1
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
        this.$request.delete('/spider/coupon', {
          params: {
            coupon_id: id
          }
        }).then(() => {
          this.changeCouponPage(this.page)
          this.$message.success('删除成功')
        }
        ).catch(() => {
          this.$message.error('删除出错')
        }
        )
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
