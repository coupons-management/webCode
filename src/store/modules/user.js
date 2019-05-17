import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui';

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    loginData:{}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOGINDATA: (state, loginData) => {
      state.loginData = loginData
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      let _this = this;
      const userName = userInfo.userName.trim();
      return new Promise((resolve, reject) => {
        login(userName, userInfo.passWord).then(response => {
          if(response.data.code == 0){
            const data = response.data.data;
            console.log(data);
            sessionStorage.token = data.sessionKey;
            sessionStorage.axiosLocalUrl = 'http://39.98.53.2:3332/system/';
            setTimeout(()=>{
              sessionStorage.token = '';
              sessionStorage.axiosLocalUrl = '';
            },1000*3600*24);
            commit('SET_NAME', data);
            commit('SET_LOGINDATA', data);
            resolve()
          }else{
            Message({
              showClose: true,
              message:  response.data.message,
              type: 'error',
              duration: 2000
            });
            reject('');
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        sessionStorage.token = '';
        sessionStorage.axiosLocalUrl = '';
        removeToken();
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        sessionStorage.token = '';
        sessionStorage.axiosLocalUrl = '';
        removeToken();
        resolve()
      })
    }
  }
}

export default user
