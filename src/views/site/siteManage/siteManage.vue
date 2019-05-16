<style lang="scss" scoped>
  @import "./siteManage.scss";
</style>

<template>
  <section class="siteManagePage">
    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane label="广告推荐" name="first">
        <el-table :data="advertData" stripe style="width: 40%" border >
          <el-table-column label="词条名" align="center">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.name" class="tableInput" @blur="inputBlur(scope.row)"/>
            </template>
          </el-table-column>
          <el-table-column label="top上限" align="center">
            <template slot-scope="scope">
              <input type="number" v-model="scope.row.topNum" class="tableInput" @blur="inputBlur(scope.row)"/>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="editorAdvert(scope.row)">查看/排序</el-button>
              <el-button type="text" size="mini" @click="deleteAdvert(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="分类设置" name="second">
        <section class="cateContent">
          <section class="firCate">
            <div>
              <i class="el-icon-plus"></i>
            </div>
            <div class="activeFir">一级分类1</div>
            <div>一级分类2</div>
            <div>一级分类3</div>
            <div>一级分类4</div>
            <div>一级分类1</div>
            <div>一级分类2</div>
            <div>一级分类3</div>
            <div>一级分类4</div>
          </section>
          <section class="secCate">
            <section class="topCate">
              <div>
                <i class="el-icon-plus"></i>
              </div>
              <div class="activeSec">二级分类1</div>
              <div>二级分类2</div>
              <div>二级分类3</div>
              <div>二级分类4</div>
              <div>二级分类1</div>
              <div>二级分类2</div>
              <div>二级分类3</div>
              <div>二级分类4</div>
            </section>
            <section class="bottomContent">
              <section>
                <el-col :span="10">
                  <el-input placeholder="请输入内容" v-model="input3">
                    <el-button slot="prepend">类名：</el-button>
                    <el-button slot="append">确定</el-button>
                    <el-button slot="append">删除</el-button>
                  </el-input>
                </el-col>
              </section>
              <section>
                <span>匹配爬虫分类：</span><el-button type="primary" size="mini" style="margin-left: 50px;">匹配完成</el-button>（展示出来的分类为：已被分到该类的和没有任何分类对应了的）
                <section>
                  <el-checkbox-group v-model="currCheckList">
                    <el-checkbox :label="item.name" :key="index" v-for="(item,index) in spiderCategoryList" style="margin-left: 30px;margin-top: 10px;"></el-checkbox>
                  </el-checkbox-group>
                </section>
              </section>
            </section>
          </section>
        </section>
        <!--<span class="secondCate">
          <el-tag type="success" class="categoryIcon">
            <span>标签二</span>
            <i class="el-icon-circle-plus-outline"></i>
            <i class="el-icon-circle-close"></i>
          </el-tag>
        </span>-->
        <!--<el-table :data="categoryDate" stripe style="width: 40%" border >
          <el-table-column label="分类名" align="center">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.name" class="tableInput" @blur="inputBlur(scope.row)"/>
            </template>
          </el-table-column>
          <el-table-column label="爬虫分类数量" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.hasCategoryList.length}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="editorCategory(scope.row)">查看/匹配</el-button>
              <el-button type="text" size="mini" @click="deleteCategory(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>-->
      </el-tab-pane>

      <el-tab-pane label="站点统计" name="third">
        <el-table :data="statDate" stripe style="width: 40%" border >
          <el-table-column prop="value1" label="商家数量" align="center"></el-table-column>
          <el-table-column prop="value2" label="优惠券数量" align="center"></el-table-column>
          <el-table-column prop="value4" label="有效优惠券数量" align="center"></el-table-column>
          <el-table-column prop="value3" label="有code数量" align="center"></el-table-column>
          <el-table-column prop="value4" label="无code数量" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="页面内容修改" name="fourth" stripe style="">

        <el-collapse v-model="activePageName" accordion style="background-color: white;padding: 0 20px;width: 40%;">
          <el-collapse-item title="About us页面" name="1">
            <div style="padding: 10px 20px 0 20px;border-top: 1px solid lightgrey;">
              <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="aboutUsText"></el-input>
              <div style="text-align: right">
                <el-button type="primary" @click="submitTextBtn" style="margin-top:20px;">　提　交　</el-button>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="Contact us页面" name="2">
            <div style="padding: 10px 20px 0 20px;border-top: 1px solid lightgrey;">
              <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="contactUsText"></el-input>
              <div style="text-align: right">
                <el-button type="primary" @click="submitTextBtn" style="margin-top:20px;">　提　交　</el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>

      </el-tab-pane>

      <el-tab-pane label="站点页面设置" name="fifth">

        <el-collapse v-model="activePageName" accordion style="background-color: white;padding: 0 20px;width: 40%;" @change="togglePage">

          <el-collapse-item :title="item.name" :name="item.value" v-for="item in pageList" :key="item.value">
            <div style="padding-top: 10px;border-top: 1px solid lightgrey;">
              <el-form label-width="80px" :model="item.pageWordForm">
                <el-form-item label="title">
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="item.pageWordForm.title"></el-input>
                </el-form-item>
                <el-form-item label="keywords">
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="item.pageWordForm.keywords"></el-input>
                </el-form-item>
                <el-form-item label="description">
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="item.pageWordForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                  <div style="text-align: right">
                    <el-button type="primary" @click="submitTextBtn">　提　交　</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-item>
        </el-collapse>

      </el-tab-pane>
    </el-tabs>


    <el-dialog :visible.sync="advertBox" class="advert" title="商家查看/排序" width="70%">
      <div class="color-list">
        <div class="color-item" v-for="color in currAdvertData.storeList" v-dragging="{ item: color, list: currAdvertData.storeList, group: 'color' }" :key="color.text">{{color.text}}
          <i class="el-icon-error deleteAdvert" @click="deleteAdvertBtn"></i>
        </div>
      </div>
      <section style="display: flex;justify-content: space-around;margin-top: 20px;">
        <el-button type="primary" round>新增商家</el-button>
        <el-button type="primary" round>提交排序</el-button>
      </section>
    </el-dialog>

    <!--<el-dialog :visible.sync="categoryBox" class="categoryBox" title="分类匹配">
      <section style="margin-top: -30px;margin-bottom:10px;font-size: 18px;">请勾选与{{currCheckData.name}}匹配的爬虫分类：</section>
      <el-checkbox-group v-model="currCheckList">
        <el-checkbox :label="item.name" :key="index" v-for="(item,index) in spiderCategoryList" style="margin-left: 30px;margin-top: 10px;"></el-checkbox>
      </el-checkbox-group>

      <section style="text-align: right;margin-top: 20px;">
        <el-button type="primary" round>匹配完成</el-button>
      </section>
    </el-dialog>-->
  </section>
</template>

<script src="./siteManage.js"></script>
