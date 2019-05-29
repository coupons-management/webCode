<template>
    <div>
        <el-button type="primary" @click="showAddCategory">新增分类</el-button>

        <el-dialog title="新增分类" :visible.sync="dialogFormAdd" width="36%">
            <el-form :label-position="'left'" >
                <el-form-item label="分类名称" :label-width="'90px'">
                    <el-input v-model="newCategory" class="select-site"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAdd = false">取 消</el-button>
                <el-button type="primary" @click="addCategory">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑分类" :visible.sync="dialogFormEdit" :inline="true" width="50%">
            <el-form :label-position="'left'" >
                <el-form-item label="分类名">
                    <el-input v-model="editCategory.name" class="select-site"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="saveCategory">确 定</el-button>
            </div>
        </el-dialog>

        <el-table
                ref="multipleTable"
                :data="category_infos"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="分类标题">
                <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
                    label="创建日期">
                <template slot-scope="scope">{{ scope.row.created_date }}</template>
            </el-table-column>
            <el-table-column
                    label="更新日期">
                <template slot-scope="scope">{{ scope.row.updated_date }}</template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="90">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="editCategoryData(scope.row.id)"
                            type="text"
                            size="small">
                        编辑
                    </el-button>
                    <!--<el-button-->
                            <!--@click.native.prevent=""-->
                            <!--type="text"-->
                            <!--size="small">-->
                        <!--移除-->
                    <!--</el-button>-->
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
                    @current-change="changeCategoryPage">
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
      category_infos: {
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
        dialogFormAdd: false,
        dialogFormEdit: false,
        newCategory: '',
        editCategory: {
          id: '',
          name: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      changeCategoryPage(page) {
        this.page = page
        this.$emit('changeCategoryPage', this.page)
      },
      showAddCategory() {
        this.dialogFormAdd = true
      },
      addCategory() {
        this.$request.post('/spider/category', {
          name: this.newCategory
        }).then(() => {
          this.$message.success('新增成功')
          this.changeCategoryPage(this.page)
          this.dialogFormAdd = false
        }).catch(() => {
          this.$message.error('内部错误')
          this.dialogFormAdd = false
        })
      },
      editCategoryData(id) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.get('/spider/category/info?id=' + id).then((res) => {
          this.editCategory = res.data
          this.dialogFormEdit = true
          loading.close()
        }).catch(() => {
          loading.close()
        })
      },
      saveCategory() {
        this.dialogFormEdit = false
        this.$request.post('/spider/category/save', this.editCategory).then(() => {
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
