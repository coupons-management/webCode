<style scoped lang="scss">
  .editorForm{
    width: 90%;
    margin: 5px auto;
  }
</style>

<template>
  <section class="staffManage">
    <section>
      <el-form :model="staffSearch" :inline="true" class="staffSearch">
        <el-form-item label="用户类型" style="margin: 0 20px;">
          <el-radio-group v-model="staffSearch.userType" size="mini">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="1">管理员</el-radio-button>
            <el-radio-button label="0">员工</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否审核" style="margin: 0 20px;">
          <el-radio-group v-model="staffSearch.isPass" size="mini">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="0">未审核</el-radio-button>
            <el-radio-button label="1">已审核</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-input v-model="staffSearch.keyWords" placeholder="请输入关键字" size="mini" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="searchBtn">查询</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section>
      <el-table :data="staffData" stripe style="width: 100%" size="small" border >
        <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
        <el-table-column label="用户类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.userType != 1">普通用户</span>
            <el-button type="text" size="mini" v-if="scope.row.userType == 1">管理员</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="contanctName" label="昵称" align="center"></el-table-column>
        <el-table-column prop="mobile" label="联系电话" align="center"></el-table-column>
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
      <el-pagination style="position: relative;float:right;top:20px;right:30px" background layout="total ,prev, pager, next" @current-change="handleCurrentChange" :total=userNum :page-size="10"></el-pagination>
    </section>

    <el-dialog :visible.sync="editorBox" class="editorBox" title="用户信息修改" width="22%">
      <el-form :model="editorForm" class="editorForm" size="small" :inline="true" label-width="100px">
        <el-form-item label="登录用户">
          <el-input v-model="editorForm.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="修改密码">
          <el-radio v-model="editorForm.radio" label="1">是</el-radio>
          <el-radio v-model="editorForm.radio" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="旧密码" v-if="editorForm.radio == 1" required>
          <el-input v-model="editorForm.oldPassWord" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码" v-if="editorForm.radio == 1" required>
          <el-input v-model="editorForm.passWord" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="再次输入" v-if="editorForm.radio == 1" required>
          <el-input v-model="editorForm.passWordAgain" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="editorForm.contanctName" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="editorForm.mobile" clearable></el-input>
        </el-form-item>
        <el-form-item style="margin: 0 20%;">
          <section>
            <el-button type="primary" @click="editorSubmit" :loading="loading">　提　交　</el-button>
            <el-button type="info" @click="editorBox = false">　返　回　</el-button>
          </section>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script src="./staffManage.js"></script>
