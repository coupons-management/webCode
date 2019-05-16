<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" @click="showAddSite">新增站点</el-button>

      <el-dialog title="新增站点" :visible.sync="dialogFormAdd" width="40%">
        <el-form :label-position="'left'">
          <el-form-item label="站点名称" :label-width="'120px'">
            <el-input v-model="newSite.name" class="select-site"></el-input>
          </el-form-item>
          <el-form-item label="URL" :label-width="'120px'">
            <el-input v-model="newSite.url" class="select-site"></el-input>
          </el-form-item>
          <el-form-item label="推送商家数量" :label-width="'120px'">
            <el-input v-model="newSite.push_store_count" class="select-site"></el-input>
          </el-form-item>
          <el-form-item label="站点语言" :label-width="'120px'">
            <el-input v-model="newSite.language" class="select-site"></el-input>
          </el-form-item>
          <el-form-item label="站点主题" :label-width="'120px'">
            <el-select v-model="newSite.theme" placeholder="请选择" class="select-site" @change="changeSiteSearch">
              <el-option
                v-for="item in theme_list"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                <span style="float: left">{{ item.value }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.key }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="LOGO" :label-width="'120px'">
            <el-input v-model="newSite.logo_url" class="select-site"></el-input>
          </el-form-item>
          <el-form-item label="ICO" :label-width="'120px'">
            <el-input v-model="newSite.ico" class="select-site"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAdd = false">取 消</el-button>
          <el-button type="primary" @click="addSite">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑站点" :visible.sync="dialogFormEdit" :inline="true" width="40%">
        <el-form :label-position="'left'">
          <el-form-item label="站点名" :label-width="'120px'">
            <el-input v-model="editSite.name" class="select-site"></el-input>
          </el-form-item>
          <el-form-item label="URL" :label-width="'120px'">
            <el-input v-model="editSite.url" class="select-site"></el-input>
          </el-form-item>
          <el-form-item label="推送商家数量" :label-width="'120px'">
            <el-input v-model="editSite.push_store_count" class="select-site"></el-input>
          </el-form-item>
          <el-form-item label="站点语言" :label-width="'120px'">
            <el-input v-model="editSite.language" class="select-site"></el-input>
          </el-form-item>
          <el-form-item label="站点主题" :label-width="'120px'">
            <el-select v-model="editSite.theme" placeholder="请选择" class="select-site" @change="changeSiteSearch">
              <el-option
                v-for="item in theme_list"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                <span style="float: left">{{ item.value }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.key }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="LOGO" :label-width="'120px'">
            <el-input v-model="editSite.logo_url" class="select-site"></el-input>
          </el-form-item>
          <el-form-item label="ICO" :label-width="'120px'">
            <el-input v-model="editSite.ico" class="select-site"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEdit = false">取 消</el-button>
          <el-button type="primary" @click="saveSite">确 定</el-button>
        </div>
      </el-dialog>

      <el-table
        ref="multipleTable"
        :data="site_infos"
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
          label="站点名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          label="URL">
          <template slot-scope="scope">{{ scope.row.url }}</template>
        </el-table-column>
        <el-table-column
          label="推送商家数量">
          <template slot-scope="scope">{{ scope.row.push_store_count }}</template>
        </el-table-column>
        <el-table-column
          label="站点语言">
          <template slot-scope="scope">{{ scope.row.language }}</template>
        </el-table-column>
        <el-table-column
          label="站点主题">
          <template slot-scope="scope">{{ scope.row.theme }}</template>
        </el-table-column>
        <el-table-column
          label="LOGO">
          <template slot-scope="scope">{{ scope.row.logo_url }}</template>
        </el-table-column>
        <el-table-column
          label="ICO">
          <template slot-scope="scope">{{ scope.row.ico }}</template>
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
              @click.native.prevent="editSiteData(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteSiteData(scope.row.id)"
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
          @current-change="changeSitePage">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script type="es6">
  import { mapGetters } from 'vuex'

  export default {
    name: 'dashboard',
    data() {
      return {
        site_infos: [],
        count: 0,
        pageSize: 0,
        page: 1,
        dialogFormAdd: false,
        dialogFormEdit: false,
        newSite: {
          name: '',
          url: '',
          push_frequency: 0,
          push_store_count: 0,
          language: '',
          theme: '',
          logo_url: null,
          ico: null,
          create_time: '',
          update_time: ''
        },
        editSite: {
          id: 1,
          name: '',
          url: '',
          push_frequency: '',
          push_store_count: '',
          language: '',
          theme: '',
          logo_url: null,
          ico: null,
          create_time: '',
          update_time: ''
        },
        theme_list: [
          {
            key: 'green',
            value: 'green'
          },
          {
            key: 'yellow',
            value: 'yellow'
          },
          {
            key: 'cbd',
            value: 'cbd'
          }
        ]
      }
    },
    mounted() {
      this.getSite()
    },
    methods: {
      changeSitePage(page) {
        this.page = page
        this.getSite()
      },
      getSite() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.get('/setting/site?page=' + this.page).then((res) => {
          this.site_infos = res.data['site']
          this.count = res.data['count']
          this.page = res.data['page']
          loading.close()
        }).catch(() => {
          this.$message.error('内部出错')
          loading.close()
        })
      },
      showAddSite() {
        this.dialogFormAdd = true
      },
      addSite() {
        this.$request.put('/setting/site', this.newSite).then(() => {
          this.$message.success('新增成功')
          this.getSite()
          this.dialogFormAdd = false
          this.newSite = {
            name: ''
          }
          this.$notify({
            title: '成功',
            message: '站点添加成功, 为确保能够访问, 请前往数据管理, 添加相关数据',
            type: 'warning'
          })
          this.getSite()
        }).catch(() => {
          this.$message.error('内部错误')
          this.dialogFormAdd = false
        })
      },
      editSiteData(row) {
        this.editSite = row
        this.dialogFormEdit = true
      },
      saveSite() {
        this.dialogFormEdit = false
        this.$request.post('/setting/site', this.editSite).then(() => {
          this.$message.success('保存成功')
          this.editSite = {
            id: '',
            name: ''
          }
          this.getSite()
        }).catch(() => {
          this.$message.error('保存失败')
        })
      },
      deleteSiteData(id) {
        this.$confirm('此操作将永久删除该站点及所有数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.delete('/setting/site?id=' + id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getSite()
          })
        })
      }
    },
    computed: {
      ...mapGetters([
      'name',
      'roles'
    ])
  }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .pagination {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }

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
