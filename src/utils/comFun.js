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
  }
};
