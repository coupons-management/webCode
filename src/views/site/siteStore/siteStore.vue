<style lang="scss" scoped>
</style>

<template>
  <section class="siteStorePage">
    <section class="pageSearch">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
        <el-form-item label="关键字">
          <el-input v-model="searchForm.search" placeholder="商家名、官网、标签"></el-input>
        </el-form-item>
        <el-form-item label="国家">
          <el-select v-model="searchForm.country" placeholder="请选择国家" style="width: 120px;">
            <el-option
              v-for="countryItem in countryList"
              :key="countryItem.key"
              :value="countryItem.key"
              :label="countryItem.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商家分类">
          <el-select v-model="searchForm.typeId" placeholder="请选择分类" style="width: 120px;">
            <el-option label="全部" value></el-option>
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            <!-- <el-option label="分类1" value="1"></el-option> -->
            <!-- <el-option label="分类2" value="2"></el-option> -->
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="标签">
          <el-select v-model="searchForm.mark" placeholder="请选择标签">
            <el-option label="全部" value=""></el-option>
            <el-option label="标签1" value="1"></el-option>
            <el-option label="标签2" value="2"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label=" 有效优惠券范围">
          <el-input v-model="searchForm.range" placeholder="请输入数量"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="商家类型">
            <el-select v-model="searchForm.storeType" placeholder="请选择">
              <el-option label="全部" value></el-option>
              <el-option label="有新增优惠券的商家" value="0"></el-option>
              <el-option label="无新增优惠券的商家" value="1"></el-option>
              <el-option label="新增的商家" value="2"></el-option>
            </el-select>
            <el-date-picker
              v-model="searchForm.timer"
              type="daterange"
              range-separator="－"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-DD" 
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchSubmit">查询</el-button>
            <el-button type="primary" @click="addStore">新增</el-button>
          </el-form-item>
        </div>
      </el-form>

      <el-table :data="tableData.list" stripe style="width: 100%" border>
        <el-table-column prop="id" label="id" align="center">
          <template slot-scope="scope">
            {{scope.row.id}}
            <input type="hidden" :value="scope.row.storeId">
          </template>
        </el-table-column>
        <el-table-column prop="storeName" label="商家名" align="center">
          <template slot-scope="scope">
            <router-link :to="siteId==1?`/websiteSec`:`/websiteFir`" target="_blank">
              <a>{{scope.row.storeName}}</a>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="webSite" label="官网" align="center">
          <template slot-scope="scope">
            <a :href="scope.row.webSite" target="view_window">{{scope.row.webSite}}</a>
          </template>
        </el-table-column>
        <el-table-column label="logo" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" placement="right">
              <div slot="content">
                <img v-if="scope.row.logo" :src="scope.row.logo" class="tableImg1">
                <img v-else="scope.row.logo" src="static/imgs/noImg.png" class="tableImg1">
              </div>
              <div>
                <img v-if="scope.row.logo" :src="scope.row.logo" class="tableImg">
                <img v-else="scope.row.logo" src="static/imgs/noImg.png" class="tableImg">
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="在爬虫站" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" placement="right">
              <div slot="content">
                <div v-for="item in scope.row.scrapyList" class="sitList">{{item}}</div>
              </div>
              <div>{{scope.row.scrapyList.length}}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="typeName" label="商家分类" align="center"></el-table-column>
        <el-table-column label="有效优惠券数量" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.showCount}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="加入时间" align="center"></el-table-column>
        <el-table-column prop="endTime" label="优惠券最后新增时间" align="center"></el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editorInfo(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="statInfo(scope.row)">报表</el-button>
            <el-button type="text" size="mini" @click="deleteStore(scope.row)">删除</el-button>
            <el-button
              type="text"
              size="mini"
              @click="checkCoupons(scope.row)"
              style="margin-left: 10px;"
            >查看优惠券</el-button>
            <el-button type="text" size="mini" @click="addCoupon(scope.row)">新增优惠券</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="paginationStyle"
        background
        layout="total ,prev, pager, next"
        @current-change="storeChange"
        :total="tableData.totalCount"
        :page-size="tableData.pageSIze"
      ></el-pagination>
    </section>

    <el-dialog :visible.sync="addStoreBox" class="editorStore" title="添加商家" width="60%" top="3%">
      <el-form :model="editorData" size="small" label-width="140px" :inline="true">
        <el-form-item label="商家名">
          <el-input v-model="editorData.storeName" placeholder="请输入商家名"></el-input>
        </el-form-item>
        <el-form-item label="官网">
          <el-input v-model="editorData.webSite"></el-input>
        </el-form-item>
        <el-form-item label="站点分类">
          <el-select v-model="editorData.category" placeholder="请选择语言">
            <el-option label="分类1" value="1"></el-option>
            <el-option label="分类2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国家">
          <el-select v-model="editorData.country" placeholder="请选择语言">
            <el-option
              v-for="countryItem in countryList"
              :key="countryItem.key"
              :value="countryItem.key"
              :label="countryItem.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告地址">
          <el-input v-model="editorData.adAddress"></el-input>
        </el-form-item>
        <!-- <el-form-item label="标签">
          <el-select v-model="editorData.tags" multiple collapse-tags placeholder="请选择">
            <el-option
              v-for="item in tagList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="是否只显示人工增加优惠券" label-width="180px">
          <el-radio v-model="editorData.isManual" label="1">是</el-radio>
          <el-radio v-model="editorData.isManual" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="title">
          <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editorData.title"></el-input>
        </el-form-item>
        <el-form-item label="keywords">
          <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editorData.keywords"></el-input>
        </el-form-item>
        <el-form-item label="description">
          <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editorData.headerDes"></el-input>
        </el-form-item>
        <el-form-item label="商家展示名称">
          <el-input type="textarea" placeholder="请输入内容" :rows="5" v-model="editorData.showName"></el-input>
        </el-form-item>
        <el-form-item label="商家介绍">
          <el-input type="textarea" placeholder="请输入内容" :rows="5" v-model="editorData.storeDes"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom:15px;color: #606266;font-weight: bold;margin-left: 45px;">商家图片上传</div>
      <div style="text-align: center">
        <el-upload
          class="avatar-uploader"
          :action="fileUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="editorData.logo" :src="editorData.logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="primary" @click="addSubmit" style="margin-top:20px;">提 交</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="editorStoreBox" class="editorStore" title="商家编辑" width="60%" top="3%">
      <el-form :model="editorData" size="small" label-width="140px" :inline="true">
        <div>
          <el-form-item label="id">
            <el-input v-model="editorData.id" placeholder="请输入id" disabled></el-input>
          </el-form-item>

          <el-form-item label="优惠券最后新增时间">
            <el-input v-model="editorData.endTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="商家名">
            <el-input v-model="editorData.storeName" placeholder="请输入商家名"></el-input>
          </el-form-item>
          <el-form-item label="官网">
            <el-input v-model="editorData.webSite" disabled></el-input>
          </el-form-item>
          <el-form-item label="站点分类">
            <el-select v-model="editorData.category" placeholder="请选择语言">
              <el-option label="分类1" value="1"></el-option>
              <el-option label="分类2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="加入时间">
            <el-input v-model="editorData.addTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="优惠券点击总次数">
            <el-input v-model="editorData.couponCount"></el-input>
          </el-form-item>
          <el-form-item label="国家">
            <el-select v-model="editorData.country" placeholder="请选择语言">
              <el-option
                v-for="countryItem in countryList"
                :key="countryItem.key"
                :value="countryItem.key"
                :label="countryItem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告地址">
            <el-input v-model="editorData.adAddress"></el-input>
          </el-form-item>
          <el-form-item label="商家浏览次数">
            <el-input v-model="editorData.storeCount" placeholder="请输入商家浏览次数"></el-input>
          </el-form-item>
          <!-- <el-form-item label="标签">
          <el-select v-model="editorData.tags" multiple placeholder="请选择">
            <el-option
              v-for="(item,index) in tagList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          </el-form-item>-->

          <el-form-item label="是否只显示人工增加优惠券" label-width="180px">
            <el-radio v-model="editorData.isManual" label="1">是</el-radio>
            <el-radio v-model="editorData.isManual" label="2">否</el-radio>
          </el-form-item>
        </div>
        <el-form-item label="title">
          <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editorData.title"></el-input>
        </el-form-item>
        <el-form-item label="keywords">
          <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editorData.keywords"></el-input>
        </el-form-item>
        <el-form-item label="description">
          <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editorData.headerDes"></el-input>
        </el-form-item>
        <el-form-item label="商家展示名称">
          <el-input type="textarea" placeholder="请输入内容" :rows="5" v-model="editorData.showName"></el-input>
        </el-form-item>
        <el-form-item label="商家介绍">
          <el-input type="textarea" placeholder="请输入内容" :rows="5" v-model="editorData.storeDes"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom:15px;color: #606266;font-weight: bold;margin-left: 45px;">商家图片上传</div>
      <div style="text-align: center">
        <el-upload
          class="avatar-uploader"
          :action="fileUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="editorData.logo" :src="editorData.logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="primary" @click="editorSubmit" style="margin-top:20px;">提 交</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="checkCouponsBox" class="editorStore" width="60%" title="查看优惠券">
      <couponTable :currPageInfo="currPageInfo"></couponTable>
    </el-dialog>

    <el-dialog :visible.sync="addCouponBox" class="editorStore" title="新增优惠券" width="40%" top="3%">
      <el-form :model="couponItem" size="small" label-width="140px" :inline="true">
        <el-form-item label="名称">
          <el-input v-model="couponItem.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="优惠券码">
          <el-input v-model="couponItem.code" placeholder="请输入code"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="couponItem.couponType" placeholder="请选择类型">
            <el-option
              v-for="couponTypeItem in couponTypeList"
              :key="couponTypeItem.key"
              :value="couponTypeItem.key"
              :label="couponTypeItem.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="couponItem.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="couponItem.des" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="过期时间">
          <el-date-picker v-model="couponItem.expireAtTime" type="date" value-format="yyyy-MM-DD" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button type="primary" @click="couponSubmit" style="margin-top:20px;">提 交</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="reportBox" class="editorStore" title="新增优惠券" width="60%">
      <el-table :data="reportData.list" stripe style="width: 100%" border size="mini">
        <el-table-column prop="id" label="日期" align="center"></el-table-column>
        <el-table-column prop="sourceTile" label="新增优惠券数量" align="center"></el-table-column>
        <el-table-column prop="currentTitle" label="新增的code数量" align="center"></el-table-column>
        <el-table-column prop="couponType" label="优惠券总数" align="center"></el-table-column>
      </el-table>
      <el-pagination
        class="paginationStyle"
        background
        layout="total ,prev, pager, next"
        @current-change="reportChange"
        :total="reportData.totalCount"
        :page-size="reportData.pageSize"
      ></el-pagination>
    </el-dialog>
  </section>
</template>

<script src="./siteStore.js"></script>
