<template>
    <div>
        <el-button type="success" @click="showPushStore">推送商家</el-button>

        <el-dialog title="推送商家" :visible.sync="dialogFormPush" width="36%">
            <el-form :label-position="'left'" >
                <el-form-item label="选择展示站" :label-width="'90px'">
                    <el-select v-model="show_site" placeholder="请选择" class="push-store-dialog">
                        <el-option
                                v-for="item in show_sites"
                                :key="item.id"
                                :label="item.name"
                                :value="item.url">
                            <span style="float: left">{{ item.name }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.url }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormPush = false">取 消</el-button>
                <el-button type="primary" @click="pushStore">确 定</el-button>
            </div>
        </el-dialog>

        <el-button type="primary" @click="showAddStore">新增商家</el-button>

        <el-dialog title="新增商家" :visible.sync="dialogFormAdd" :inline="true" width="50%">
            <el-form :label-position="'left'" >
                <el-form-item label="商家名">
                    <el-input v-model="storeForm.name" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="官网">
                    <el-input v-model="storeForm.website" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="LOGO">
                    <el-input v-model="storeForm.picture" disabled class="select-site"></el-input>
                  <el-upload
                    class="upload-demo"
                    drag
                    name="logo"
                    :headers="{Authorization: 'Bearer ' + token}"
                    :action="'http://www.voucherpa.com/api/img?name=' + storeForm.name + '&spider=' + this.site"
                    :multiple="false"
                    :on-success="upload_add_log"
                    :limit="1"
                    :list-type="'picture'">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="storeForm.category" placeholder="请选择" class="push-store-dialog">
                        <el-option
                                v-for="item in manual_category"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                            <span style="float: left">{{ item.name }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="国家">
                    <el-input v-model="storeForm.country" class="select-site"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAdd = false">取 消</el-button>
                <el-button type="primary" @click="addStore">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑商家" :visible.sync="dialogFormEdit" :inline="true" width="50%">
            <el-form :label-position="'left'" >
                <el-form-item label="商家名">
                    <el-input v-model="storeFormEdit.name" class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="官网">
                    <el-input v-model="storeFormEdit.website" disabled class="select-site"></el-input>
                </el-form-item>
                <el-form-item label="LOGO">
                    <el-input v-model="storeFormEdit.picture" disabled class="select-site"></el-input>
                  <br>
                  <el-upload
                    class="upload-demo"
                    drag
                    name="logo"
                    :headers="{Authorization: 'Bearer ' + token}"
                    :action="'http://www.voucherpa.com/api/img?name=' + storeFormEdit.name + '&spider=' + this.site"
                    :multiple="false"
                    :on-success="upload_log"
                    :limit="1"
                    :list-type="'picture'">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="storeFormEdit.category" placeholder="请选择" class="push-store-dialog">
                        <el-option
                                v-for="item in manual_category"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                            <span style="float: left">{{ item.name }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="国家">
                    <el-input v-model="storeFormEdit.country" class="select-site"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="saveStore">确 定</el-button>
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
                    label="国家">
                <template slot-scope="scope">{{ scope.row.country }}</template>
            </el-table-column>
            <el-table-column
                    label="同步数量">
                <template slot-scope="scope">{{ scope.row.site_count }}</template>
            </el-table-column>
            <el-table-column
                    label="LOGO">
                <template slot-scope="scope"><img :src="scope.row.logo" width="30" height="30" alt=""></template>
            </el-table-column>
            <el-table-column
                    label="存在数量">
                <template slot-scope="scope">{{ scope.row.spider_count }}</template>
            </el-table-column>
            <el-table-column
                    label="有效优惠券">
                <template slot-scope="scope">{{ scope.row.unexpire_count }}</template>
            </el-table-column>
            <el-table-column
                    label="过期优惠券">
                <template slot-scope="scope">{{ scope.row.expired_count }}</template>
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="105">
                <template slot-scope="scope">{{ scope.row.is_delete }}</template>
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
                            @click.native.prevent="showCoupon(scope.row.id)"
                            type="text"
                            size="small">
                        查看优惠券
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
  import { getToken } from '@/utils/auth'

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
      const setEditPicture = this.setEditPicture
      const setAddPicture = this.setAddPicture
      return {
        page: 1,
        token: '',
        dialogFormPush: false,
        dialogFormAdd: false,
        dialogFormEdit: false,
        show_sites: [],
        catgory_cache: [],
        manual_category: [],
        show_site: '',
        select_id: [],
        storeForm: {
          name: '',
          website: '',
          picture: '',
          category: '',
          country: 'US'
        },
        storeFormEdit: {
          id: 0,
          name: '',
          website: '',
          picture: '',
          category: 0,
          country: 'US'
        },
        upload_log(response, file, fileList) {
          console.log(response.data)
          setEditPicture(response.data)
        },
        upload_add_log(response, file, fileList) {
          setAddPicture(response.data)
        }
      }
    },
    mounted() {
      this.token = getToken()
    },
    methods: {
      setEditPicture(picture) {
        this.storeFormEdit.picture = picture
      },
      setAddPicture(picture) {
        this.storeForm.picture = picture
      },
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
        this.$request.get('/spider/category/manual').then((res) => {
          this.manual_category = res.data
          if (res.data.length === 0) {
            loading.close()
            this.$message.error('请先添加人工分类')
            return
          }
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
        this.$request.post('/spider/store', this.storeForm).then(() => {
        })
      },
      saveStore() {
        this.$request.post('/spider/store/save', this.storeFormEdit).then(() => {
          this.dialogFormEdit = false
          this.changeStorePage(this.page)
          this.$message.success('保存成功')
        }).catch(() => {
          this.$message.error('保存失败')
        })
      },
      addStore() {
        this.$request.post('/spider/store/save', this.storeForm).then(() => {
          this.storeForm = {
            name: '',
            website: '',
            picture: '',
            category: 0,
            country: ''
          }
          this.dialogFormAdd = false
          this.changeStorePage(this.page)
          this.$message.success('添加成功')
        }).catch(() => {
          this.$message.error('添加失败')
        })
      },
      editStore(id) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.get('/spider/category/manual').then((res) => {
          this.manual_category = res.data
          if (res.data.length === 0) {
            loading.close()
            this.$message.error('请先添加人工分类')
            return
          }
          this.$request.get('/spider/store/info?id=' + id).then((res) => {
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
      },
      showCoupon(id) {
        this.$emit('selectStoreId', id)
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
    .upload-demo {
      margin-top: 20px;
    }
    .el-upload-list {
      display: none;
    }
</style>
