<template>
    <div>
        <el-button type="primary" @click="showAddTag">新增标签</el-button>

        <el-dialog title="新增标签" :visible.sync="dialogFormAdd" width="39%">
            <el-form :label-position="'left'" >
                <el-form-item label="标签名称" :label-width="'90px'">
                    <el-input v-model="newTag.name" class="select-site"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAdd = false">取 消</el-button>
                <el-button type="primary" @click="addTag">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑标签" :visible.sync="dialogFormEdit" :inline="true" width="39%">
            <el-form :label-position="'left'" >
                <el-form-item label="标签名">
                    <el-input v-model="editTag.name" class="select-site"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="saveTag">确 定</el-button>
            </div>
        </el-dialog>

        <el-table
                ref="multipleTable"
                :data="tag_infos"
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
                    label="标签标题">
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
                            @click.native.prevent="editTagData(scope.row)"
                            type="text"
                            size="small">
                        编辑
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
                    @current-change="changeTagPage">
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
      tag_infos: {
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
        newTag: {
          name: ''
        },
        editTag: {
          id: '',
          name: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      changeTagPage(page) {
        this.page = page
        this.$emit('changeTagPage', this.page)
      },
      showAddTag() {
        this.dialogFormAdd = true
      },
      addTag() {
        const newTag = this.newTag
        newTag['site'] = this.site
        this.$request.put('/site/tag', newTag).then(() => {
          this.$message.success('新增成功')
          this.changeTagPage(this.page)
          this.dialogFormAdd = false
          this.newTag = {
            name: ''
          }
        }).catch(() => {
          this.$message.error('内部错误')
          this.dialogFormAdd = false
        })
      },
      editTagData(row) {
        this.editTag = row
        this.dialogFormEdit = true
      },
      saveTag() {
        this.dialogFormEdit = false
        const editTag = this.editTag
        editTag['site'] = this.site
        this.$request.post('/site/tag', editTag).then(() => {
          this.$message.success('保存成功')
          this.editTag = {
            id: '',
            name: ''
          }
          this.changeTagPage(this.page)
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
