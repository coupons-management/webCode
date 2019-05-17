
<style scoped lang="scss">
  @import "./index.scss";
</style>
<template>
  <el-form class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" v-show="loginState">
      <h3 class="title">控制管理系统</h3>
      <el-form-item prop="userName">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="userName" type="text" v-model="loginForm.userName" autoComplete="on" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="passWord">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="passWord" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.passWord" autoComplete="on"
          placeholder="密码"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
      <span class="registerBtn" @click="loginState = false">register</span>
    </el-form>
    <el-form class="register-form" :model="registerForm" v-show="!loginState">
      <h3 class="title">用户注册</h3>
      <el-form-item label="登录用户" required>
        <el-input v-model="registerForm.userName" clearable></el-input>
      </el-form-item>
      <el-form-item label="登录密码" required>
        <el-input v-model="registerForm.passWord" clearable></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="registerForm.contanctName" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="registerForm.mobile" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <section style="display: flex;justify-content: space-between">
          <el-button type="primary" @click="registerSubmit" :loading="loading">　提　交　</el-button>
          <el-button type="info" @click="loginState = true">　返　回　</el-button>
        </section>
      </el-form-item>
    </el-form>
  </el-form>
</template>

<script type="es6">
import { isvaliduserName } from '@/utils/validate'
import md5 from 'js-md5';

export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        userName: '',
        passWord: ''
      },
      registerForm:{
        userName:'',
        passWord:'',
        contanctName:'',
        mobile:'',
        isPass:'0',
        userType:'0'
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur' }],
        passWord: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'passWord',
      loginState:true
    }
  },
  mounted(){
    sessionStorage.axiosLocalUrl = null;
  },
  methods: {
    registerSubmit(){
      let _this = this,sendData = _this.registerForm;
      if(!sendData.userName && !sendData.passWord){
        _this.$message({ type: "warning", message: "用户名或密码为必填！" });
        return false;
      }
      _this.$axios.post(sessionStorage.axiosLocalUrl + "user-manager/addUser", sendData).then(function(response) {
        if (response.data.code == 200) {
          _this.$message({ type: "success", message: "创建成功，等待审核！" });
          _this.loginState = true;
        }
      });
    },
    showPwd() {
      if (this.pwdType === 'passWord') {
        this.pwdType = ''
      } else {
        this.pwdType = 'passWord'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.loginForm.passWord = md5(this.loginForm.passWord);
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            //sessionStorage.axiosLocalUrl = 'http://39.98.53.2:3332/scrapy/';
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false;
          })
        } else {
          console.log('error submit!!');
          return false
        }
      })
    }
  }
}
</script>
