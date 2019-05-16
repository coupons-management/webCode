<style lang="scss" scoped>
  .couponNum{
    display: flex;
    >div{
      width:80px;
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dashed lightgrey;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
  .el-upload-list__item-name{
    display: none;
  }
  .tableImg{
    width: 100px;
    height: 60px;
  }
  .tableImg1{
    width: 300px;
    height: 180px;
  }
</style>

<template>
  <section>
    <section v-show="!searchForm.siteId">
      <span>请先选择站点：</span>
      <el-select v-model="searchForm.siteId" placeholder="请选择" @change="getShopData">
        <el-option v-for="(item,index) in siteList" :key="index" :label="item.name" :value="item.pkId"></el-option>
      </el-select>
    </section>
    <section v-show="searchForm.siteId">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item label="站点选择">
          <el-select v-model="searchForm.siteId" placeholder="请选择" @change="getShopData">
            <el-option v-for="(item,index) in siteList" :key="index" :label="item.name" :value="item.pkId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="searchForm.keyWords" placeholder="请输入名称/网址" clearable></el-input>
        </el-form-item>
        <el-form-item label="国家">
          <el-select v-model="searchForm.country" placeholder="请选择国家" clearable>
            <el-option v-for="item in countryList" :key="item.COUNTRY" :label="item.COUNTRY" :value="item.COUNTRY"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="searchForm.categoryId" placeholder="请选择分类" clearable>
            <el-option v-for="item in categoryList" :key="item.pkId" :label="item.name" :value="item.pkId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优惠券数量大于">
          <div class="couponNum">
            <el-input v-model="searchForm.minCouponCount" type="number"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="是否审核">
          <el-radio-group v-model="searchForm.isPass">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="getShopData">查询</el-button>
          <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="editorInfo()">新增商家</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="shopData.list" stripe style="width: 100%" border >
        <el-table-column prop="picture" label="商家图片" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" placement="right">
              <div slot="content">
                <img v-if="scope.row.picture" :src="scope.row.picture" class="tableImg1">
                <img v-else="scope.row.picture" src="static/imgs/noImg.png" class="tableImg1">
              </div>
              <div>
                <img v-if="scope.row.picture" :src="scope.row.picture" class="tableImg">
                <img v-else="scope.row.picture" src="static/imgs/noImg.png" class="tableImg"></div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商家名称" align="center"></el-table-column>
        <el-table-column prop="website" label="商家网址" align="center"></el-table-column>
        <el-table-column prop="country" label="国家" align="center"></el-table-column>
        <el-table-column prop="categoryId" label="分类" align="center"></el-table-column>
        <el-table-column prop="couponCount" label="优惠券数量" align="center"></el-table-column>

        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="mini" v-if="scope.row.isPass == 1">已审核</el-button>
            <el-button type="warning" size="mini" v-if="scope.row.isPass == 0" @click="getPass(scope.row)">未审核</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="desc" label="备注" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" placement="right" v-if="scope.row.desc">
              <div slot="content" style="width: 400px;">
                <span>{{scope.row.desc}}</span>
              </div>
              <div>
                <span style="cursor: pointer;">{{scope.row.desc|showText}}</span>
              </div>
            </el-tooltip>
            <span v-else="scope.row.desc">{{scope.row.desc}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="updateInfo(scope.row)">更新</el-button>
            <el-button type="text" size="mini" @click="editorInfo(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="deleteInfo(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total, prev, pager, next" :total="shopData.pages * shopData.pageSize" @current-change="checkPage" style="margin-top: 20px;float: right;"></el-pagination>
    </section>

    <el-dialog :visible.sync="siteBox" class="siteBox" :title="isAddSite?'新增站点':'修改站点'" width="30%">
      <el-form :model="storeForm" :inline="true" size="small" label-width="100px">
        <el-form-item label=" 商家名字" required>
          <el-input v-model="storeForm.name" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label=" 商家地址" required>
          <el-input v-model="storeForm.website" placeholder="请输入网址"></el-input>
          </el-select>
        </el-form-item>
        <el-form-item label="国家">
          <el-select v-model="storeForm.country" placeholder="请选择国家" clearable>
            <el-option v-for="item in countryList" :key="item.COUNTRY" :label="item.COUNTRY" :value="item.COUNTRY"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类" class="category">
          <el-select v-model="storeForm.categoryId" placeholder="请选择分类" clearable>
            <el-option v-for="item in categoryList" :key="item.pkId" :label="item.name" :value="item.pkId"></el-option>
          </el-select>

          <!--<el-select v-model="storeForm.categoryId" multiple collapse-tags placeholder="请选择分类" class="category" style="width: 300px;">
            <el-option v-for="item in categoryList" :key="item.pkId" :label="item.name" :value="item.pkId"></el-option>
          </el-select>-->

        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="storeForm.desc" style="width: 300px;"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom:15px;color: #606266;font-weight: bold;">　商家图片上传</div>
      <div style="text-align: center;">
        <el-upload class="avatar-uploader" :action="fileUrl" :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="storeForm.picture" :src="storeForm.picture" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="primary" @click="submitBtn" style="margin-top:20px;">　提　交　</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script src="./shopsManage.js"></script>
