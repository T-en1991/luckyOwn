// import store from '@/store/index.js'
import Vue from 'vue'

// const bu = 'http://tests.nqr.ds888.work' // 'https://www.bzdzfw.xyz'
// const  bu = "http://" + window.location.host;
const bu ='bu'
var Fly = require("flyio/dist/npm/wx");
var request = new Fly();
if(process.env.NODE_ENV === 'development'){
   request.config.baseURL = '/api';
}else{
  request.config.baseURL = bu;
}
 // request.config.baseURL = 'http://sl.ysxapp.cn/admin.php/api/';

Vue.prototype.$Fly = request
Vue.prototype.$url = bu
const url = bu
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
	let errmsg = '';
	const data = response.data;
	if (!data || typeof data !== 'object') {
		errmsg = '服务器响应格式错误';
		uni.showToast({
			title: errmsg,
			icon: 'none'
		})
	} else {
		let {code, msg} = data
		if (code == 401 || code == 502) { //判断code 217|218 表示没有用户id,需要重新授权登


			uni.navigateTo({
				url: '/pages/login/login'
			});
			uni.setStorageSync('isLogin',1)
			return
		} else if (code == 0 || code == 400)  {
			uni.showToast({
				title: data.msg,
				icon: 'none'
			})
		}

	}
	return response.data; //只返回业务数据部分
}, function(err) {
	let errmsg = err.message;
	switch (err.status) {
		case 0:
			errmsg = "网络连接错误";
			uni.showToast({
				title: errmsg,
				icon: 'none'
			})
			break;
		case 401:
			uni.redirectTo({
				url: '/pages/Login/Login'
			})
			break;
		default:
		uni.showToast({
			title: errmsg,
			icon: 'none'
		})
	}
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
