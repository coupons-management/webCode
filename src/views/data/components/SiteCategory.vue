<template>
    <div>
        <el-button type="primary" @click="showAddCategory">新增分类</el-button>

        <el-dialog title="新增分类" :visible.sync="dialogFormAdd" width="39%">
            <el-form :label-position="'top'" >
                <el-form-item label="分类名称" :label-width="'90px'">
                    <el-input v-model="newCategory.name" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="分类描述">
                    <el-input v-model="newCategory.description" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="访问次数">
                    <el-input v-model="newCategory.view_times" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="父分类 ID">
                    <el-input v-model="newCategory.parent_id" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="关联爬虫分类" :label-width="'90px'">
                  <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    :titles="['爬虫分类列表', '关联爬虫分类']"
                    filter-placeholder="请输入爬虫分类名称"
                    v-model="newCategory.data_category_cache"
                    :data="category_cache_infos">
                  </el-transfer>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAdd = false">取 消</el-button>
                <el-button type="primary" @click="addCategory">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑分类" :visible.sync="dialogFormEdit" :inline="true" width="39%">
            <el-form :label-position="'top'" >
                <el-form-item label="分类名">
                    <el-input v-model="editCategory.name" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="分类描述">
                    <el-input v-model="editCategory.description" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="访问次数">
                    <el-input v-model="editCategory.view_times" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="父分类 ID">
                    <el-input v-model="editCategory.parent_id" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="关联爬虫分类">
                  <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    :titles="['爬虫分类列表', '关联爬虫分类']"
                    filter-placeholder="请输入爬虫分类名称"
                    v-model="editCategory.data_category_cache"
                    :data="category_cache_infos">
                  </el-transfer>
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
                    label="ID">
                <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column
                    label="分类标题">
                <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
                    label="父分类标题">
                <template slot-scope="scope">
                  <span v-if="scope.row.parent_name !== ''">
                    {{ scope.row.parent_name }}
                  </span>
                  <span v-else>
                    父分类
                  </span>
                </template>
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
                    <el-button
                            @click.native.prevent="deleteCategoryData(scope.row.id)"
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
        type: Number,
        default: 'all'
      },
      category_infos: {
        type: Array
      },
      category_cache_infos: {
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
        newCategory: {
          id: '',
          name: '',
          url_name: '',
          description: '',
          view_times: '',
          is_del: '',
          parent_id: 0,
          parent_name: '',
          data_category_cache: [],
          create_time: '',
          update_time: ''
        },
        editCategory: {
          id: '',
          name: '',
          url_name: '',
          description: '',
          view_times: '',
          is_del: '',
          parent_id: '',
          parent_name: '',
          data_category_cache: [],
          create_time: '',
          update_time: ''
        },
        filterMethod(query, item) {
          return item.label.indexOf(query) > -1
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
        const newCategory = this.newCategory
        newCategory['site'] = this.site
        this.$request.post('/site/category', newCategory).then(() => {
          this.$message.success('新增成功')
          this.changeCategoryPage(this.page)
          this.dialogFormAdd = false
          this.newCategory = {
            id: '',
            name: '',
            url_name: '',
            description: '',
            view_times: '',
            is_del: '',
            parent_id: 0,
            parent_name: '',
            data_category_cache: [],
            create_time: '',
            update_time: ''
          }
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
        this.$request.get('/site/category/info?id=' + id + '&site=' + this.site).then((res) => {
          this.editCategory = res.data
          console.dir(res.data)
          this.dialogFormEdit = true
          loading.close()
        }).catch(() => {
          loading.close()
        })
      },
      saveCategory() {
        this.dialogFormEdit = false
        const editCategory = this.editCategory
        editCategory['site'] = this.site
        this.$request.post('/site/category/info', editCategory).then(() => {
          this.$message.success('保存成功')
          this.editCategory = {
            id: '',
            name: '',
            url_name: '',
            description: '',
            view_times: '',
            is_del: '',
            parent_id: '',
            parent_name: '',
            data_category_cache: [],
            create_time: '',
            update_time: ''
          }
          this.changeCategoryPage(this.page)
        }).catch(() => {
          this.$message.error('保存失败')
        })
      },
      deleteCategoryData(id) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.delete('/site/category?id=' + id + '&site=' + this.site).then((res) => {
          this.$message.success('删除成功')
          this.changeCategoryPage(this.page)
          loading.close()
        }).catch(() => {
          loading.close()
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
