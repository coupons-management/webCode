<style lang="scss" scoped>

</style>

<template>
  <section class="staffManagePage">
    <el-button type="primary" @click="addNew" size="mini" style="margin-bottom: 20px;">新增用户</el-button>

    <el-table :data="tableList.list" stripe style="width: 50%" border >
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="account" label="员工账号" align="center"></el-table-column>
      <el-table-column prop="name" label="用户名" align="center"></el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.gender == 1">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editorInfo(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="deleteInfo(scope.row)">删除</el-button>
          <el-button type="text" size="mini" @click="permissions(scope.row)">角色配置</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="total, prev, pager, next" :total="tableList.totalCount" @current-change="checkPage" style="margin-top: 20px;"></el-pagination>

    <el-dialog :visible.sync="roleBox" class="roleBox" :title="isAddRole?'新增用户':'修改用户'" width="30%">
      <el-form :model="roleForm" size="small">
        <el-form-item label="员工账号">
          <el-input v-model="roleForm.account" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="roleForm.name" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" v-if="showPwd">
          <el-input type="password" v-model="roleForm.password" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" v-if="showPwd">
          <el-input type="password" v-model="roleForm.passwordAgain" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="roleForm.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="submitData" size="mini" style="margin-bottom: 20px;">提交</el-button>
        <el-button type="primary" @click="rebuildData" size="mini" style="margin-bottom: 20px;" v-if="isAddRole">重置</el-button>
        <el-button type="primary" @click="editorPwd" size="mini" style="margin-bottom: 20px;" v-if="!isAddRole">修改密码</el-button>
        <el-button type="primary" @click="cancelEditorPwd" size="mini" style="margin-bottom: 20px;" v-if="roleForm.passwordOld">取消修改密码</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script src="./staffManage.js"></script>
