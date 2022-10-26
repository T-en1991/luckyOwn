import url  from './index.js'
const send = (data)=> url.post('/api/sms/send',data);
const mobilelogin = (data)=> url.post('/api/user/mobilelogin',data);
const passwordLogin = (data)=> url.post('/api/user/login',data);
const resetpwd = (data)=> url.post('/api/user/resetpwd',data);
const agreement = (data)=> url.post('/api/common/agreement',data);

// 首页接口
const getPayKey = (data)=> url.post('/api/wechat/getPayKey',data);
const sumuv = (data)=> url.post('/api/index/sumUv',{});
const wechatLoginRedirect = (data)=> url.post('/api/wechat/wechatLoginRedirect',data);
const baseInfo = (data)=> url.post('/api/index/baseInfo',data);
const categoryList = (data)=> url.post('/api/index/categoryList',data);
const recommend = (data)=> url.post('/api/index/recommend',data);
const newestOpen = (data)=> url.post('/api/index/newestOpen',data);
const star = (data)=> url.post('/api/index/star',data);
const boxListByCategory = (data)=> url.post('/api/index/boxListByCategory',data);
const boxDetail = (data)=> url.post('/api/index/boxDetail',data);
const hotBox = (data)=> url.post('/api/index/hotBox',data);
const cheapBox = (data)=> url.post('/api/index/cheapBox',data);
const rechargeList = (data)=> url.post('/api/index/rechargeList',data);
const openByOrderTrade = (data)=> url.get('/api/index/openByOrderTrade',data);
const createRechargeOrder = (data)=> url.post('/api/index/createRechargeOrder',data);
const getServiceInfo = (data)=> url.post('/api/index/getServiceInfo',data);
const getWechatLoginUrl = (data)=> url.post('/api/index/getWechatLoginUrl',data);

const tryBoxDetail = (data)=> url.post('/api/index/tryBoxDetail',data);
const haveATry = (data)=> url.post('/api/index/haveATry',data);
const createOrder = (data)=> url.post('/api/index/createOrder',data);
const coinPay = (data)=> url.post('/api/index/coinPay',data);
const cmoneyPay = (data)=> url.post('/api/index/cmoneyPay',data);
const search = (data)=> url.post('/api/index/search',data);
const priceRange = (data)=> url.post('/api/index/priceRange',data);
// 个人中心

const sList = (data)=> url.post('/api/index/sList',data);



const openRecord = (data)=> url.post('/api/user/openRecord',data);
const myBox = (data)=> url.post('/api/user/myBox',data);
const myOrderList = (data)=> url.post('/api/user/myOrderList',data);
const userinfo = (data)=> url.post('/api/user/userinfo',data);
const myStar = (data)=> url.post('/api/user/myStar',data);
const cancelStar = (data)=> url.post('/api/user/cancelStar',data);
const myBalance = (data)=> url.post('/api/user/myBalance',data);
const myCoin = (data)=> url.post('/api/user/myCoin',data);
const myAddress = (data)=> url.post('/api/user/myAddress',data);
const addAddress = (data)=> url.post('/api/user/addAddress',data);
const editAddress = (data)=> url.post('/api/user/editAddress',data);
const deleteAddress = (data)=> url.post('/api/user/deleteAddress',data);

const exchange = (data)=> url.post('/api/user/exchange',data);
const checkDeliveryInfo = (data)=> url.post('/api/user/checkDeliveryInfo',data);
const applyDelivery = (data)=> url.post('/api/user/applyDelivery',data);
const searchHistory = (data)=> url.post('/api/user/searchHistory',data);
const getSettingInfo = (data)=> url.post('/api/user/getSettingInfo',data);
const changeInfo = (data)=> url.post('/api/user/changeInfo',data);
const deliveryOrderDetail = (data)=> url.post('/api/user/deliveryOrderDetail',data);
const confirmReceipt = (data)=> url.post('/api/user/confirmReceipt',data);
const moneyToCoin = (data)=> url.post('/api/user/moneyToCoin',data);
const getWithdrawalSetting = (data)=> url.post('/api/user/getWithdrawalSetting',data);
const withdrawal = (data)=> url.post('/api/user/withdrawal',data);
const bindWithdrawalAccount = (data)=> url.post('/api/user/bindWithdrawalAccount',data);
const bindMobile = (data)=> url.post('/api/user/bindMobile',data);

const getVgoods = (data)=> url.get('/api/index/getVirData',data);
//最新开盒轮播
const lunbobox = (data)=> url.get('/api/index/lunbobox',data);
// 分销
const getTotalCoin = () => url.get(`/api/retail/getTotalCoin`)
const getRetailList = ({page, limit}) => url.post(`/api/retail/getRetailList`, {page, limit})
const getTeamList = ({page, limit}) => url.post(`/api/retail/getTeamList`, {page, limit})
const getTixianList = ({page, limit}) => url.post(`/api/retail/getTixianList`, {page, limit})
//卡密
const carpassDeposit = (data)=> url.post('/api/carpass/deposit',data);
const carpassList = (data)=> url.get('/api/carpass/check',data);
//获取金币和盒子数量
const getUserCapital = (data)=> url.get('/api/user/UserCapital',data);
//转赠
const echargez = (data)=> url.post('/api/user/echargez',data);
//转赠列表
const echargezs = (data)=> url.get('/api/user/echargezs',data);
//获取跳转域名
const getServiceurl = (data)=> url.get('/api/index/getServiceurl', data);
//金币提现
const goldDeposit = (data)=> url.post('/api/user/withdrawals', data)
//用户注册
const register = (data) => url.post('/api/user/register', data)
//盒子飞出图片
const boximages = (data) => url.post('/api/index/boximages', data)

//提交晒图
const setShai = (data) => url.post('/api/index/setShai', data)
export default {
	sumuv, //统计uv
	getVgoods, //假数据
	lunbobox,//最新开盒轮播
	send,//发送短信验证码
	agreement,//协议规则
	mobilelogin,//手机号登录
	passwordLogin,//密码登录
	resetpwd,//重置密码
	getPayKey,//微信信息
	wechatLoginRedirect,//微信绑定
	baseInfo,//首页基本信息
	categoryList,//分类列表
	recommend,//推荐盲盒
	newestOpen,//最新开箱盲盒列表
	star,//	点赞/取消点赞
	boxListByCategory,//通过分类查询盲盒列表
	boxDetail,//盲盒详情
	hotBox,//热门盲盒
	cheapBox,//低价专区
	rechargeList,//充值金额列表
	openByOrderTrade,//通过支付订单号开箱
	createRechargeOrder,//创建充值订单
	getServiceInfo,//获取客服信息
	getWechatLoginUrl,//微信登录
	tryBoxDetail,//	试试手气盲盒详情
	haveATry,//试玩
	createOrder,//创建订单
	coinPay,//金币支付
	cmoneyPay,//余额支付
	search,//搜索
	priceRange,//价格区间
	// 个人中心
sList,
	openRecord,//开箱记录
	myBox,//我的盒柜
	myOrderList,//我的订单
	deliveryOrderDetail,//发货订单详情
	confirmReceipt,//确认订单
	userinfo,//用户信息
	myStar,//我的收藏
	cancelStar,//删除收藏
	myBalance,//我的余额
	myCoin,//我的金币
	myAddress,//我的收货地址
	addAddress,//添加收货地址
	editAddress,//编辑收货地址
	deleteAddress,//删除收货地址
	exchange,//一键回收
	checkDeliveryInfo,//回收信息
	applyDelivery,//申请发货
	searchHistory,//搜索历史
	getSettingInfo,//获取设置信息
	changeInfo,//修改个人信息
	moneyToCoin,//余额转出到钱包
	getWithdrawalSetting,//查询提现绑定信息
	withdrawal,//申请提现
	bindWithdrawalAccount,//绑定提现账号
	bindMobile,//绑定手机号
	carpassDeposit,//充值卡密
	carpassList,//卡密充值记录
	getUserCapital,
	echargez,//转赠
	echargezs,//转赠列表
	getServiceurl,//获取跳转域名
	goldDeposit,//金币提现
	register,//注册
	boximages,//盒子飞出图片
	upload_image: (params) => {
		return new Promise((resolve, reject) => {
			uni.showLoading({title:'文件上传中'})
			uni.uploadFile({
				url: url.config.baseURL + '/api/common/upload', //仅为示例，非真实的接口地址
				filePath: params.path,
				header:{
					'token':uni.getStorageSync('token')
				},
				name: 'file',
				success: (uploadFileRes) => {
					uni.hideLoading()
					if (JSON.parse(uploadFileRes.data).code === 1) {
						resolve(JSON.parse(uploadFileRes.data).data);
					} else {
						reject(JSON.parse(uploadFileRes.data))
					}
					
				}
			});
		});
	},
  
  getTotalCoin,
  getRetailList,
  getTeamList,
  getTixianList,
	setShai
}