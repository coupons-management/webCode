exports.install = function (Vue, options) {
  let _addZero = function (num) {//时间数字个位数时添加0
    return num < 10 ? "0" + num : num;
  };

  Vue.prototype.changeDate = function (time, type) {//dataTime date
    if(!time){
      return '';
    }
    let currDate = new Date(time);
    let changeDate = currDate.getFullYear() + "-" + _addZero(currDate.getMonth() + 1) + "-" + _addZero(currDate.getDate());
    let changeDateTime = changeDate + " " + _addZero(currDate.getHours()) + ":" + _addZero(currDate.getMinutes()) + ":" + _addZero(currDate.getSeconds());
    return type == "dateTime" ? changeDateTime : changeDate;
  };

  Vue.prototype.getBase64 = function (imgUrl,node,str) {
    window.URL = window.URL || window.webkitURL;
    var xhr = new XMLHttpRequest();
    xhr.open("get", imgUrl, true);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
      if (this.status == 200) {
        var blob = this.response;
        let oFileReader = new FileReader();
        oFileReader.onloadend = function (e) {
          node[str] = e.target.result;
        };
        oFileReader.readAsDataURL(blob);
      }
    };
    xhr.send();
  };

  Vue.prototype.fixedNum = function (data,type) {
    if(type){
      return parseFloat(data).toFixed(2)*100+'%';
    }else{
      return parseFloat(data).toFixed(2);
    }
  };

  Vue.prototype.initData = function(list){//spiderType spiderSite country couponType expiry isComplete approval dataSource
    let _this = this;
    for(let i = 0; i<list.length;i++){
      if(list[i] == 'spiderType'){//爬虫分类列表
        _this.$sendData('get','commons/getTypeList','',(data,all)=>{
          _this.$store.dispatch('setType', data);
        });
      }else if(list[i] == 'country'){//国家列表
        _this.$sendData('get','commons/getCountryDict','',(data,all)=>{
          _this.$store.dispatch('setCountry', data);
        });
      }else if(list[i] == 'spiderSite'){//爬虫列表
        _this.$sendData('get','commons/getSpiderList','',(data,all)=>{
          _this.$store.dispatch('setSpider', data);
        });
      }else if(list[i] == 'couponType'){//优惠券类型
        _this.$sendData('get','commons/getCouponTypeList','',(data,all)=>{
          _this.$store.dispatch('setCouponType', data);
        });
      }else if(list[i] == 'expiry'){//过期时间
        _this.$sendData('get','commons/getExpiryList','',(data,all)=>{
          _this.$store.dispatch('setExpiry', data);
        })
      }else if(list[i] == 'isComplete'){//信息是否完整
        _this.$sendData('get','commons/getIsCompleteDict','',(data,all)=>{
          _this.$store.dispatch('setIsComplete', data);
        })
      }else if(list[i] == 'approval'){//审核状态
        _this.$sendData('get','commons/getApprovalDict','',(data,all)=>{
          _this.$store.dispatch('setApproval', data);
        })
      }else if(list[i] == 'dataSource'){//数据来源
        _this.$sendData('get','commons/getCreateTypeDict','',(data,all)=>{
          _this.$store.dispatch('setDataSource', data);
        })
      }
    }
  };
  Vue.prototype.deepClone = function(obj){
    function isClass(o){
      if(o===null) return "Null";
      if(o===undefined) return "Undefined";
      return Object.prototype.toString.call(o).slice(8,-1);
    }
    var result,oClass=isClass(obj);
    //确定result的类型
    if(oClass==="Object"){
      result={};
    }else if(oClass==="Array"){
      result=[];
    }else{
      return obj;
    }
    for(let key in obj){
      var copy=obj[key];
      if(isClass(copy)=="Object"){
        result[key]=arguments.callee(copy);//递归调用
      }else if(isClass(copy)=="Array"){
        result[key]=arguments.callee(copy);
      }else{
        result[key]=obj[key];
      }
    }
    return result;
  };
};
