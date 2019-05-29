<template>
    <div>

        <el-dialog title="新增模板" :visible.sync="dialogFormAdd" width="39%">
            <el-form :label-position="'left'" >
                <el-form-item label="模板名称" :label-width="'90px'">
                    <el-input v-model="newTemplate.template" class="select-site"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAdd = false">取 消</el-button>
                <el-button type="primary" @click="addTemplate">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑模板" :visible.sync="dialogFormEdit" :inline="true" width="39%">
            <el-form :label-position="'left'" >
                <el-form-item label="模板名称" :label-width="'90px'">
                    <el-input v-model="editTemplate.template" class="select-site"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="saveTemplate">确 定</el-button>
            </div>
        </el-dialog>

        <div style="margin-top: 20px">
          <el-radio-group v-model="selectLocation" @change="changeSelectLocation">
            <el-radio-button v-for="item in location_list"
                                :label="item.key" :key="item.key">{{ item.value }}</el-radio-button>
          </el-radio-group>
        </div>

        <div style="margin-top: 20px; margin-bottom: 20px">
          <el-radio-group v-model="selectType" @change="changeSelectType">
            <el-radio-button v-for="item in type_list"
                                :label="item.key" :key="item.key">{{ item.value }}</el-radio-button>
          </el-radio-group>
        </div>

        <el-button type="primary" v-if="this.selectType !== ''" @click="showAddTemplate">新增模板</el-button>

        <el-table
                ref="multipleTable"
                :data="template_infos"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="ID"
                    width="105">
                <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column
                    label="模板名称">
                <template slot-scope="scope">{{ scope.row.template }}</template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="90">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="editTemplateData(scope.row)"
                            type="text"
                            size="small">
                        编辑
                    </el-button>
                    <br>
                    <el-button
                            @click.native.prevent="deleteTemplateData(scope.row.id)"
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
                    :total="count"
                    :page-size="20"
                    :current-page="page"
                    @current-change="changeTemplatePage">
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
      template_infos: {
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
        newTemplate: {
          id: '',
          template: '',
          type: '',
          location: ''
        },
        editTemplate: {
          id: '',
          template: '',
          type: '',
          location: ''
        },
        selectLocation: '',
        selectType: '',
        type_list: [],
        type_list_org: {
          coupon_title: [{
            key: 'b3a2',
            value: 'b3a2'
          }, {
            key: 'kb2a4',
            value: 'kb2a4'
          }, {
            key: 'ka3',
            value: 'ka3'
          }, {
            key: 'b3a4',
            value: 'b3a4'
          }, {
            key: 'kb2a2',
            value: 'kb2a2'
          }, {
            key: 'b2a1',
            value: 'b2a1'
          }, {
            key: 'a2',
            value: 'a2'
          }, {
            key: 'kb2a1',
            value: 'kb2a1'
          }, {
            key: 'ka2',
            value: 'ka2'
          }, {
            key: 'kb2a3',
            value: 'kb2a3'
          }, {
            key: 'kb3a2',
            value: 'kb3a2'
          }, {
            key: 'b2a4',
            value: 'b2a4'
          }, {
            key: 'b2a3',
            value: 'b2a3'
          }, {
            key: 'b2a2',
            value: 'b2a2'
          }, {
            key: 'b3a3',
            value: 'b3a3'
          }, {
            key: 'a4',
            value: 'a4'
          }, {
            key: 'ka4',
            value: 'ka4'
          }, {
            key: 'a3',
            value: 'a3'
          }, {
            key: 'ka1',
            value: 'ka1'
          }, {
            key: 'a1',
            value: 'a1'
          }, {
            key: 'kb3a4',
            value: 'kb3a4'
          }, {
            key: 'kb3a3',
            value: 'kb3a3'
          }, {
            key: 'kb3a1',
            value: 'kb3a1'
          }, {
            key: 'b3a1',
            value: 'b3a1'
          }],
          store: [{
            key: 'meta_title',
            value: 'meta_title'
          }],
          store_detail: [{
            key: 'store_description',
            value: '商店描述'
          }, {
            key: 'store_title',
            value: '商店标题'
          }, {
            key: 'store_h1',
            value: '商店 H1'
          }],
          category_detail: [{
            key: 'meta_keyword',
            value: 'Meta keyword'
          }, {
            key: 'meta_description',
            value: 'meta_description'
          }, {
            key: 'meta_title',
            value: 'meta_title'
          }],
          category: [{
            key: 'meta_description',
            value: 'meta_description'
          }, {
            key: 'meta_title',
            value: 'meta_title'
          }],
          index: [{
            key: 'meta_description',
            value: 'meta_description'
          }, {
            key: 'meta_title',
            value: 'meta_title'
          }]
        },
        location_list: [
          {
            key: 'store',
            value: '商店默认页'
          },
          {
            key: 'coupon_title',
            value: '优惠券标题'
          },
          {
            key: 'category_detail',
            value: '分类主页'
          },
          {
            key: 'store_detail',
            value: '商店主页'
          },
          {
            key: 'category',
            value: '分类默认页'
          },
          {
            key: 'index',
            value: '首页默认页'
          }
        ]
      }
    },
    mounted() {
    },
    methods: {
      changeSelectType() {
        this.$emit('changeSelectType', { location: this.selectLocation, type: this.selectType })
      },
      changeSelectLocation(key) {
        console.log(key)
        this.type_list = this.type_list_org[key]
        this.template_infos = []
      },
      changeTemplatePage(page) {
        this.page = page
        this.$emit('changeTemplatePage', this.page)
      },
      showAddTemplate() {
        this.dialogFormAdd = true
        this.newTemplate.location = this.selectLocation
        this.newTemplate.type = this.selectType
      },
      addTemplate() {
        const newTemplate = this.newTemplate
        newTemplate['site'] = this.site
        this.$request.put('/site/template', newTemplate).then(() => {
          this.$message.success('新增成功')
          this.changeTemplatePage(this.page)
          this.dialogFormAdd = false
          this.newTemplate = {
            id: '',
            template: '',
            type: '',
            location: ''
          }
        }).catch(() => {
          this.$message.error('内部错误')
          this.dialogFormAdd = false
        })
      },
      editTemplateData(row) {
        this.editTemplate = row
        this.dialogFormEdit = true
      },
      saveTemplate() {
        this.dialogFormEdit = false
        const editTemplate = this.editTemplate
        editTemplate['site'] = this.site
        this.$request.post('/site/template', editTemplate).then(() => {
          this.$message.success('保存成功')
          this.editTemplate = {
            id: '',
            template: '',
            type: '',
            location: ''
          }
          this.changeTemplatePage(this.page)
        }).catch(() => {
          this.$message.error('保存失败')
        })
      },
      deleteTemplateData(id) {
        this.$request.delete('/site/template?id=' + id + '&site=' + this.site).then(() => {
          this.$message.success('删除成功')
          this.changeTemplatePage(this.page)
        }).catch(() => {
          this.$message.error('删除失败')
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
