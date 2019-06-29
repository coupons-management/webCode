<style lang="scss" scoped>
</style>

<template>
  <section class="lastDataPage">
    <span style="color:grey;">选择爬虫：</span>
    <el-select v-model="storeSearch.scrapyId" placeholder="请选择分类" @change="handleChangeSpider">
      <el-option
        v-for="spiderItem in spiderList"
        :key="spiderItem.key"
        :value="spiderItem.key"
        :label="spiderItem.value"
      ></el-option>
    </el-select>

    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 20px;">
      <el-tab-pane label="商家" name="storePage">
        <el-form :inline="true" :model="storeSearch" class="demo-form-inline" size="mini">
          <el-form-item label="关键字">
            <el-input v-model="storeSearch.search" placeholder="请输入商家名、官网"></el-input>
          </el-form-item>
          <el-form-item label="国家">
            <el-select v-model="storeSearch.scrapyId" placeholder="请选择国家">
              <el-option
                v-for="countryItem in countryList"
                :key="countryItem.key"
                :value="countryItem.key"
                :label="countryItem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="爬虫分类">
            <el-select v-model="storeSearch.spiderType" placeholder="请选择分类">
              <el-option
                v-for="typeItem in typeList"
                :key="typeItem.key"
                :value="typeItem.key"
                :label="typeItem.value"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <!-- <el-form-item label=" 有效优惠券范围">
            <el-input v-model="storeSearch.couponNum" placeholder="请输入数量"></el-input>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="storeSubmit">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="storeData.list" stripe style="width: 100%" border>
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="name" label="商家名" align="center"></el-table-column>
          <el-table-column prop="website" label="官网" align="center"></el-table-column>
          <el-table-column label="LOGO" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" placement="right">
                <div slot="content">
                  <img v-if="scope.row.logo" :src="scope.row.logo" class="tableImg1" />
                  <img v-else="scope.row.logo" src="static/imgs/noImg.png" class="tableImg1" />
                </div>
                <div>
                  <img v-if="scope.row.logo" :src="scope.row.logo" class="tableImg" />
                  <img v-else="scope.row.logo" src="static/imgs/noImg.png" class="tableImg" />
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="spiderType" label="爬虫分类" align="center"></el-table-column>
          <el-table-column label="有效优惠券数量" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.couponNum}}/{{scope.row.couponNumTotal}} ≈ {{fixedNum(scope.row.couponNum/scope.row.couponNumTotal,'percent')}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="checkCoupons(scope.row)">查看优惠券</el-button>
            </template>
          </el-table-column>-->
        </el-table>
        <el-pagination
          class="paginationStyle"
          background
          layout="total ,prev, pager, next"
          @current-change="storeChange"
          :total="storeData.totalCount"
          :page-size="storeData.pageSize"
        ></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="异常商家" name="unusualStore">
        <el-form :inline="true" :model="storeSearch" class="demo-form-inline" size="mini">
          <el-form-item label="关键字">
            <el-input v-model="storeSearch.search" placeholder="请输入商家名、官网"></el-input>
          </el-form-item>
          <el-form-item label="国家">
            <el-select v-model="storeSearch.scrapyId" placeholder="请选择国家">
              <el-option
                v-for="countryItem in countryList"
                :key="countryItem.key"
                :value="countryItem.key"
                :label="countryItem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="爬虫分类">
            <el-select v-model="storeSearch.spiderType" placeholder="请选择分类">
              <el-option label="全部" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" 有效优惠券范围">
            <el-input v-model="storeSearch.couponNum" placeholder="请输入数量"></el-input>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="storeSubmit">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="storeData.list" stripe style="width: 100%" border>
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="storeName" label="商家名" align="center"></el-table-column>
          <el-table-column prop="website" label="官网" align="center"></el-table-column>
          <el-table-column label="LOGO" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" placement="right">
                <div slot="content">
                  <img v-if="scope.row.logo" :src="scope.row.logo" class="tableImg1" />
                  <img v-else="scope.row.logo" src="static/imgs/noImg.png" class="tableImg1" />
                </div>
                <div>
                  <img v-if="scope.row.logo" :src="scope.row.logo" class="tableImg" />
                  <img v-else="scope.row.logo" src="static/imgs/noImg.png" class="tableImg" />
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="spiderType" label="爬虫分类" align="center"></el-table-column>
          <el-table-column label="有效优惠券数量" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.couponNum}}/{{scope.row.couponNumTotal}} ≈ {{fixedNum(scope.row.couponNum/scope.row.couponNumTotal,'percent')}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="checkCoupons(scope.row)">查看优惠券</el-button>
            </template>
          </el-table-column>-->
        </el-table>
        <el-pagination
          class="paginationStyle"
          background
          layout="total ,prev, pager, next"
          @current-change="storeChange"
          :total="storeData.totalCount"
          :page-size="storeData.pageSize"
        ></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="优惠券" name="couponPage">
        <section>
          <el-form :inline="true" :model="couponSearch" class="demo-form-inline" size="mini">
            <el-form-item label="标题">
              <el-input v-model="couponSearch.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="优惠券类型">
              <el-select v-model="couponSearch.type" placeholder="优惠券类型">
                <el-option
                  v-for="couponTypeItem in couponTypeList"
                  :key="couponTypeItem.key"
                  :value="couponTypeItem.key"
                  :label="couponTypeItem.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否过期">
              <el-select v-model="couponSearch.isPast" placeholder="是否过期">
                <el-option label="全部" value="0"></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="couponSubmit">查询</el-button>
            </el-form-item>
          </el-form>

          <el-table :data="couponData.list" stripe style="width: 100%" border>
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="title" label="商家名" align="center"></el-table-column>
            <el-table-column prop="couponName" label="原标题" align="center"></el-table-column>
            <el-table-column prop="couponType" label="类型" align="center"></el-table-column>
            <el-table-column prop="des" label="描述" align="center"></el-table-column>
            <el-table-column prop="isPast" label="是否过期" align="center"></el-table-column>
            <el-table-column prop="expireAt" label="过期时间" align="center"></el-table-column>
          </el-table>
          <el-pagination
            class="paginationStyle"
            background
            layout="total ,prev, pager, next"
            @current-change="couponChange"
            :total="couponData.totalCount"
            :page-size="couponData.pageSize"
          ></el-pagination>
        </section>
      </el-tab-pane>

      <el-tab-pane label="异常优惠券" name="unusualCoupon">
        <section>
          <el-form :inline="true" :model="couponSearch" class="demo-form-inline" size="mini">
            <el-form-item label="标题">
              <el-input v-model="couponSearch.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="优惠券类型">
              <el-select v-model="couponSearch.type" placeholder="优惠券类型">
                <el-option
                  v-for="couponTypeItem in couponTypeList"
                  :key="couponTypeItem.key"
                  :value="couponTypeItem.key"
                  :label="couponTypeItem.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否过期">
              <el-select v-model="couponSearch.expired" placeholder="是否过期">
                <el-option label="全部" value="0"></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="couponSubmit">查询</el-button>
            </el-form-item>
          </el-form>

          <el-table :data="couponData.list" stripe style="width: 100%" border>
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="title" label="商家名" align="center"></el-table-column>
            <el-table-column prop="couponName" label="原标题" align="center"></el-table-column>
            <el-table-column prop="couponType" label="类型" align="center"></el-table-column>
            <el-table-column prop="des" label="描述" align="center"></el-table-column>
            <el-table-column prop="isPast" label="是否过期" align="center"></el-table-column>
            <el-table-column prop="expireAt" label="过期时间" align="center"></el-table-column>
          </el-table>
          <el-pagination
            class="paginationStyle"
            background
            layout="total ,prev, pager, next"
            @current-change="couponChange"
            :total="couponData.totalCount"
            :page-size="couponData.pageSize"
          ></el-pagination>
        </section>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script src="./lastData.js"></script>
