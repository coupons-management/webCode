<style scoped lang="scss">
  .storePic{
    width: 100px;
  }

  .tableImg1{
    width: 100px;
    height: 100px;
  }
  .storeList{
    flex-wrap:wrap;
    display: flex;
    .storeItem{
      display: flex;
      width: 10%;
      min-width: 120px;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
      cursor: pointer;
      padding: 5px 0;
      border: 1px solid rgb(255,255,255);
    }
    .storeItem:hover{
      border: 1px solid grey;
    }
  }
</style>

<template>
  <section class="couponManage">

    <section v-show="!searchForm.siteId">
      <span>请先选择站点：</span>
      <el-select v-model="searchForm.siteId" placeholder="请选择" @change="storeForm.siteId = searchForm.siteId">
        <el-option v-for="(item,index) in siteList" :key="index" :label="item.name" :value="item.pkId"></el-option>
      </el-select>
    </section>

    <section v-show="searchForm.siteId">
      <el-form :model="searchForm" :inline="true" class="searchForm" size="mini">

        <el-form-item label="站点选择">
          <el-select v-model="searchForm.siteId" placeholder="请选择" @change="storeForm.siteId = searchForm.siteId">
            <el-option v-for="(item,index) in siteList" :key="index" :label="item.name" :value="item.pkId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商家选择">
          <el-input v-model="searchForm.storeName" placeholder="请点选" readonly @focus="storeBox = true"></el-input>
        </el-form-item>
        <el-form-item label="是否审核">
          <el-radio-group v-model="searchForm.isPass">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="有无code">
          <el-radio-group v-model="searchForm.isCode">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关键字查询">
          <el-input v-model="searchForm.name" placeholder="请输入关键字" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getCouponData">查询</el-button>
          <el-button type="primary" @click="addNewCoupon">新增优惠券</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="batchBtn">{{batchItem?'取消操作':'批量操作'}}</el-button>
          <el-button type="primary" @click="batchSend" v-show="batchItem">批量审核</el-button>
          <el-button type="primary" @click="batchDel" v-show="batchItem">批量删除</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="couponData.list" stripe style="width: 100%" size="small" border class="couponData" @selection-change="selectionChange" @row-click="(row)=>clickRow(row,'add')" ref="couponList">
        <el-table-column type="selection" width="55" v-if="batchItem"></el-table-column>
        <el-table-column prop="storeName" label="商家名称" align="center"></el-table-column>
        <el-table-column prop="couponName" label="原始名称" align="center"></el-table-column>
        <el-table-column prop="couponName" label="展示名称" align="center"></el-table-column>
        <el-table-column prop="desc" label="优惠详情" align="center"></el-table-column>
        <el-table-column prop="code" label="优惠券码" align="center"></el-table-column>
        <el-table-column prop="code" label="优惠券链接" align="center"></el-table-column>
        <el-table-column prop="code" label="类型" align="center"></el-table-column>
        <el-table-column label="过期时间" align="center">
          <template slot-scope="scope">
            {{changeDate(scope.row.expireAt)}}
          </template></el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            {{changeDate(scope.row.createTime)}}
          </template></el-table-column>
        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">
           {{changeDate(scope.row.lastUpTime)}}
          </template>
        </el-table-column>
        <el-table-column prop="checkAccount" label="审核人" align="center"></el-table-column>

        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="mini" v-if="scope.row.isPass == 1">已审核</el-button>
            <el-button type="warning" size="mini" v-if="scope.row.isPass == 0" @click="getPass(scope.row)">未审核</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editorInfo(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="deleteInfo(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="position: relative;float:right;top:20px;right:30px" background layout="total ,prev, pager, next" @current-change="couponChange" :total="couponData.total" :page-size="10"></el-pagination>
    </section>

    <el-dialog :visible.sync="couponBox" class="couponBox" title="优惠券详情" width="40%">
      <el-form :model="couponForm" class="couponForm" size="small" :inline="true" label-width="100px">
        <el-form-item label="优惠券名称">
          <el-input v-model="couponForm.couponName"></el-input>
        </el-form-item>
      </el-form>
      <section style="text-align: center">
        <el-button type="primary" @click="saveInfo">保存</el-button>
      </section>
    </el-dialog>

    <el-dialog :visible.sync="storeBox" title="商家选择" width="80%" top="3%">
      <section>
        <el-form :inline="true" :model="storeForm" class="demo-form-inline" size="small" label-width="60px">
          <el-form-item label="关键字">
            <el-input v-model="storeForm.keyWords" placeholder="请输入名称/网址" clearable></el-input>
          </el-form-item>
          <el-form-item label="国家">
            <el-select v-model="storeForm.country" placeholder="请选择国家" clearable>
              <el-option v-for="item in countryList" :key="item.COUNTRY" :label="item.COUNTRY" :value="item.COUNTRY"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="storeForm.catgoryId" placeholder="请选择分类" clearable>
              <el-option v-for="item in categoryList" :key="item.pkId" :label="item.name" :value="item.pkId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优惠券数量大于" label-width="120px">
            <div style="width: 100px;">
              <el-input v-model="storeForm.minCouponCount" type="number"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="getShopData">查询</el-button>
          </el-form-item>
        </el-form>

        <section class="storeList">
          <div v-for="item in shopData.list" class="storeItem" @click="storeChecked(item)">
            <img v-if="item.picture" :src="item.picture" class="tableImg1">
            <img v-else="item.picture" src="static/imgs/noImg.png" class="tableImg1">
            <span style="text-align: center">{{item.name}}</span>
          </div>
        </section>
        <el-pagination v-show="shopData.list" background layout="total ,prev, pager, next" @current-change="storeChange" :total="shopData.pages*shopData.pageSize" :page-size="40"></el-pagination>

      </section>
    </el-dialog>

  </section>
</template>

<script src="./couponManage.js"></script>
