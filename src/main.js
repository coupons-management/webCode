import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n

import '@/styles/index.scss'; // global css
import '@/styles/common.scss'; // global css

import App from './App';
import router from './router';
import store from './store';

import '@/icons'; // icon
import '@/permission'; // permission control
import request from '@/utils/request';
import VueDND from 'awe-dnd';

Vue.use(VueDND);
import axios from 'axios';

import conFun from './utils/comFun.js';
Vue.use(conFun);

Vue.prototype.$axios = axios;
Vue.prototype.$request = request;

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

Vue.prototype.$sendData = function(type, url, params, callback) {
  var url = url;
  if (sessionStorage.axiosLocalUrl) {
    url = `${sessionStorage.axiosLocalUrl}${url}`;
  } else {
    url = `http://39.98.53.2:3332/system/${url}`;
  }
  if (sessionStorage.token) {
    url = `${url}?sessionKey=${sessionStorage.token}`;
  }
  var nparams = params;
  axios[type](url, nparams)
    .then(response => {
      var all = response.data;
      var data = response.data.data;
      if (all.code == 0) {
        if (callback) callback(data, all);
      } else {
        console.log(all.state, all.message);
        Message({ message: '操作失败！', type: 'error' });
      }
    })
    .catch(error => {
      console.log(error);
      Message({ message: '操作失败！', type: 'error' });
    });
};
