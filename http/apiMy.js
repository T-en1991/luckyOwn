import url  from './index.js'

// test  get
const testGet = (data)=> url.get('/api/testGet',data);

const login=(data)=>url.post('/api/fbpay/getOpenid',data)


export default {
  testGet,
  login,
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
}
