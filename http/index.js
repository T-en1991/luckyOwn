import Vue from 'vue'

var Fly = require("flyio/dist/npm/wx");
var request = new Fly();

const base=`https://www.hzdqwl.com/index.php`


request.config.baseURL=base

Vue.prototype.$Fly = request
Vue.prototype.$url = base

request.interceptors.request.use((request) => {
  if (request.body && request.body.msg) {
    uni.showLoading({title:request.body.msg || ''})
  }
  const token = uni.getStorageSync('token') || '';
  request.headers["token"]=token;
  // request.headers["Content-Type"] = 'application/x-www-form-urlencoded'

  // 防止缓存
  if (request.method === 'POST') {
    request.body = {
      ...request.body,
      // token, // body 添加自定义token
      // _t: getNowFormatDate()
    }
  } else if (request.method === 'GET') {
    request.params = {
      // _t: getNowFormatDate(),
      // token, // body 添加自定义token
      ...request.params
    }
  }
  return request
})


request.interceptors.response.use(function(response) { //不要使用箭头函数，否则调用this.lock()时，this指向不对
  uni.hideLoading();
  return response.data; //只返回业务数据部分
}, function(err) {
  return err; //只返回业务数据部分
})

export default request

// ------------------当前时间格式化 S------------------------------------------
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}
// ------------------当前时间格式化 E------------------------------------------
