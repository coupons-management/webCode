import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/common.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import request from '@/utils/request'
import VueDND from 'awe-dnd'

Vue.use(VueDND);
import axios from 'axios';

import conFun from './utils/comFun.js';
Vue.use(conFun);

Vue.prototype.$axios = axios;
Vue.prototype.$request = request

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.prototype.$sendData = function(type,url, params, callback){
  var url = sessionStorage.axiosLocalUrl + url+"?sessionKey="+sessionStorage.token;
  var nparams = params;
  axios[type](url, nparams).then((response) => {
    var all = response.data;
    var data = response.data.data;

    if(all.code==0){
      if(callback) callback(data, all);
    }else{
      console.log(all.state, all.message);
      Message({message: '操作失败！', type: 'error'});
    }
  }).catch((error)=>{
    console.log(error);
    Message({message: '操作失败！', type: 'error'});
  });
};
/*Vue.prototype.$sendData = async function(){
  let data = await function(){
    axios.get(sessionStorage.axiosLocalUrl + "commons/getExpiryList?sessionKey="+sessionStorage.token).then(function(response) {
      if (response.data.code == 200) {
        return response.data.data;
      }
    });
    Message({message: '操作成功！', type: 'success'});
    return 123;
  }();
  return data;
  /!*return new Promise((resolve,reject)=>{
    resolve(
      async function getStockPriceByName(name) {
      const symbol = await getStockSymbol(name);
      return symbol;
    }())
  })*!/

 /!* return new Promise((resolve,reject)=>{
    let data;
    axios.get(sessionStorage.axiosLocalUrl + "commons/getExpiryList?sessionKey="+sessionStorage.token).then(function(response) {
      if (response.data.code == 200) {
        data = response.data.data;
        resolve(345)
      }
    });
  })*!/
};*/
