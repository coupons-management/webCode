<style lang="scss" scoped>

</style>

<template>
  <section class="roleManagePage">
    <el-button type="primary" @click="addNew" size="mini" style="margin-bottom: 20px;">新增角色</el-button>

    <el-table :data="tableList" stripe style="width: 50%" border >
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="name" label="角色名" align="center"></el-table-column>
      <el-table-column prop="description" label="描述" align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editorInfo(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="deleteInfo(scope.row)">删除</el-button>
          <el-button type="text" size="mini" @click="permissions(scope.row)">权限配置</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="roleBox" class="roleBox" :title="isAddRole?'新增角色':'修改角色'" width="30%">
      <el-form :model="roleForm" size="small">
        <el-form-item label="角色名称">
          <el-input v-model="roleForm.name" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="submitData" size="mini" style="margin-bottom: 20px;">提交</el-button>
        <el-button type="primary" @click="rebuildData" size="mini" style="margin-bottom: 20px;" v-if="isAddRole">重置</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script src="./roleManage.js"></script>
