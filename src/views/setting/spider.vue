<template>
  <div>
    <el-dialog title="指定商家爬取" :visible.sync="dialogFormAdd" width="40%">
        <el-form :label-position="'top'">
          <el-form-item label="爬虫名称">
            <el-input v-model="spiderStore.spider_name" disabled class="select-site"></el-input>
          </el-form-item>
          <el-form-item label="商家官网">
            <el-input v-model="spiderStore.store_website" class="select-site"></el-input>
          </el-form-item>
          <el-form-item label="爬虫商家 URL">
            <el-input v-model="spiderStore.store_in_spider_url" class="select-site"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAdd = false">取 消</el-button>
          <el-button type="primary" @click="startStoreSpider">确 定</el-button>
        </div>
      </el-dialog>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>运行中</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="running_infos"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change=""
        :empty-text="'无运行任务'">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="ID">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          label="PID">
          <template slot-scope="scope">{{ scope.row.pid }}</template>
        </el-table-column>
        <el-table-column
          label="爬虫名称">
          <template slot-scope="scope">{{ scope.row.spider }}</template>
        </el-table-column>
        <el-table-column
          label="开始时间">
          <template slot-scope="scope">{{ scope.row.start_time }}</template>
        </el-table-column>
        <el-table-column
          label="运行时间">
          <template slot-scope="scope">{{ scope.row.running_seconds }}</template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="90">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="stopSpider(scope.row.id)"
              type="text"
              size="small">
              停止
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>准备执行</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="pending_infos"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change=""
        :empty-text="'无准备执行任务'">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="ID">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          label="PID">
          <template slot-scope="scope">{{ scope.row.pid }}</template>
        </el-table-column>
        <el-table-column
          label="爬虫名称">
          <template slot-scope="scope">{{ scope.row.spider }}</template>
        </el-table-column>
        <el-table-column
          label="开始时间">
          <template slot-scope="scope">{{ scope.row.start_time }}</template>
        </el-table-column>
        <el-table-column
          label="运行时间">
          <template slot-scope="scope">{{ scope.row.running_seconds }}</template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>已停止</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="finished_infos"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change=""
        :empty-text="'无已停止任务'">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="ID">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          label="PID">
          <template slot-scope="scope">{{ scope.row.pid }}</template>
        </el-table-column>
        <el-table-column
          label="爬虫名称">
          <template slot-scope="scope">{{ scope.row.spider }}</template>
        </el-table-column>
        <el-table-column
          label="开始时间">
          <template slot-scope="scope">{{ scope.row.start_time }}</template>
        </el-table-column>
        <el-table-column
          label="运行时间">
          <template slot-scope="scope">{{ scope.row.running_seconds }}</template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>爬虫列表</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="spider_infos"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column
          label="爬虫名称">
          <template slot-scope="scope">{{ scope.row }}</template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="90">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="startSpider(scope.row)"
              type="text"
              size="small">
              正常开始
            </el-button>
            <br>
            <el-button
              @click.native.prevent="showStoreSpider(scope.row)"
              type="text"
              size="small">
              指定商家
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script type="es6">
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    data() {
      return {
        running_infos: [],
        pending_infos: [],
        finished_infos: [],
        spider_infos: [],
        dialogFormAdd: false,
        spiderStore: {
          spider_name: '',
          store_website: '',
          store_in_spider_url: ''
        },
        timeoutData: 0
      }
    },
    mounted() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$request.get('/setting/spider').then((res) => {
        this.spider_infos = res.data['spider']
        this.running_infos = res.data['running']
        this.pending_infos = res.data['pending']
        this.finished_infos = res.data['finished']
        loading.close()
        this.timeoutData = setInterval(() => {
          this.getSpider()
        }, 5000)
      }).catch(() => {
        this.$message.error('内部出错')
        loading.close()
      })
    },
    destroyed() {
      clearInterval(this.timeoutData)
    },
    methods: {
      startStoreSpider() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.post('/setting/spider', this.spiderStore).then(() => {
          this.dialogFormAdd = false
          loading.close()
          this.$message.success('提交成功')
        }).catch(() => {
          loading.close()
          this.$message.success('内部出错')
        })
      },
      stopSpider(id) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.delete('/setting/spider?job=' + id).then(() => {
          loading.close()
        }).catch(() => {
          loading.close()
        })
      },
      startSpider(name) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$request.put('/setting/spider', {
          spider_name: name
        }).then(() => {
          loading.close()
        }).catch(() => {
          loading.close()
        })
      },
      getSpider() {
        this.$request.get('/setting/spider').then((res) => {
          this.spider_infos = res.data['spider']
          this.running_infos = res.data['running']
          this.pending_infos = res.data['pending']
          this.finished_infos = res.data['finished']
        }).catch(() => {
          this.$message.error('内部出错')
        })
      },
      showStoreSpider(name) {
        this.dialogFormAdd = true
        this.spiderStore.spider_name = name
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

  .box-card {
    margin: 20px 20px;
    min-height: 300px;
  }

  .select-site {
    width: 390px;
  }

  .line {
    text-align: center;
  }
</style>
