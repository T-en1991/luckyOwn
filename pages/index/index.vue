<template>
  <view class="home">
    <view class="head">
      <!--      <view v-for="(item,index) in categoryList" :key="index" :class="['head_block',naved===index?'naved':'']"-->
      <!--            @click="chooseNav(index)">-->
      <!--        {{ item.categoryName }}-->
      <!--      </view>-->
      <view :class="['head_block']" @click="chooseNav(0)">
        <text :class="[isAnimate?'showAnimate':'fadeAnimate']">
          {{ categoryList[0].categoryName }}
        </text>
      </view>
      <view :class="['naved']" @click="chooseNav(1)">
        <text :class="[isAnimate?'showAnimate':'fadeAnimate']">
          {{ categoryList[1].categoryName }}
        </text>
      </view>
      <view :class="['head_block']" @click="chooseNav(2)">
        <text :class="[isAnimate?'showAnimate':'fadeAnimate']">
          {{ categoryList[2].categoryName }}
        </text>
      </view>

    </view>
    <view class="content">
      <view class="title">
        <view class="borderIcon"></view>
        <view class="titleTxt">{{ categoryList.length > 0 ? categoryList[1].desc : '欢乐抽赏' }}</view>
      </view>
      <view class="swiperContent" v-if="goodsList.length>0">
        <swiper circular :current="isActivedGroup" @change="changeCircle" @transition="transition">
          <template v-for="(item,idx) in goodsList[1].data">
            <swiper-item>
              <view class="circle" @click="toDetail(item)" :key="idx">
                <image class="qiu" v-for="(cur,index) in item.imgArr"
                       :class="[flag?'btn':'',qiu[index],huangdong&&!flag?hd[index]:'']" :key="index"
                       :src=cur></image>
              </view>
              <view class="draw" @click="btn">
                <view>
                  {{ item.price }}
                </view>
                <view class="shou">
                  <image src="../../static/image/lucky/shou.png"></image>
                  <view class="dianji">点击抽取</view>
                </view>
              </view>

            </swiper-item>
          </template>
        </swiper>
      </view>
    </view>
    <view class="footer" v-if="goodsList.length>0">
      <swiper circular previous-margin="200rpx" next-margin="200rpx" :current="isActivedGroup"
              @change="chooseGroup($event.detail.current)">
        <template v-for="(item,index) in goodsList[1].data">
          <swiper-item>
            <view :key="index" class="swiperBlock" @click="chooseGroup(index)">
              <image :class="isActivedGroup===index?'isActivedGroup':''" :src=item.img mode="scaleToFill"></image>
              <view class="txt">{{ item.desc }}</view>
            </view>
          </swiper-item>
        </template>
      </swiper>
    </view>


    <uni-popup ref="num-popup" type="bottom" :mask-click="false">
      <view class="num-popup">
        <view class="popup-close" @click="closeNumPopup">
          <image src="https://static.gute.fun/static/luckyOwn/home/guanbi@2x.png" mode=""></image>
        </view>
        <view class="num-button-group">
          <view class="num-button" @click="createOder(1)">
            <image src="https://static.gute.fun/static/luckyOwn/new_home/btn-1.png" mode="widthFix"></image>
            <text>一发入魂</text>
          </view>
        </view>
        <view class="num-button-group">
          <view class="num-button" @click="createOder(5)">
            <image src="https://static.gute.fun/static/luckyOwn/new_home/btn-3.png" mode="widthFix"></image>
            <text>五连绝世</text>
          </view>
          <view class="num-button" @click="createOder(9)">
            <image src="https://static.gute.fun/static/luckyOwn/new_home/btn-2.png" mode="widthFix"></image>
            <text>九连更稳</text>
          </view>
        </view>
        <view class="order-info">
          <view>
            开盒数量：{{ boxNum }}
          </view>
          <view class="total-price">
            订单金额：￥{{ totalPrice || 29 }}
          </view>
        </view>
        <view class="popup-btn">
          <!-- <button type="primary" @click="$refs['payment'].open(0, boxNum)">创建订单</button> -->
        </view>
      </view>
    </uni-popup>

    <uni-popup ref="order-popup" type="center" :mask-click="false" background-color="#fff">
      <view class="orderPopupView">
        <view class="title">
         购买大疆无人机合集
        </view>
        <view class="payType">
          <view>
            支付方式：
          </view>
          <view>
            <radio-group>
              <label class="radio"><radio value="r1" checked="true" />刀币</label>
              <label class="radio"><radio value="r2" />微信</label>
            </radio-group>
          </view>
        </view>
        <view class="payBtn">
          <button style="padding: 0 40rpx;" size="mini" type="default" plain="true" @click="cancel">取消</button>
          <button style="padding: 0 40rpx;" size="mini" type="primary" plain="true" @click="confirm">确定</button>
        </view>
      </view>
    </uni-popup>

    <uni-popup ref="get-popup" type="center" :mask-click="false" background-color="#fff">
      恭喜获得。。。
    </uni-popup>

<!--    <show-result :key="resultKey" ref="result-popup" :num="boxNum" :type="type" @close="resultKey++"></show-result>-->

  </view>
</template>

<script>
// import showResult from '../../components/show-result'
export default {
  data() {
    return {
      goodsList: [],
      categoryList: [],//大类
      flag: false,//球是否应该运动
      huangdong: false,//球是否可以晃动
      qiu: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'],//球对应动态样式的名称
      hd: ['hd1', 'hd2', 'hd3', 'hd4', 'hd5', 'hd6', 'hd7', 'hd8', 'hd9', 'hd10', 'hd11', 'hd12'],//球对应动态样式的名称
      titleTxt: ['最新上架', '欢乐无限赏', '积分无限赏'],
      naved: 1,//三种方式
      isAnimate: true,//大类是否动画
      isActivedGroup: 0,//选中的组
      type: 0,
      list: [{
        "box_id": 42,
        "box_name": "电玩数码",
        "coin_price": 25,
        "box_banner_images": "http:\/\/bab668.oss-cn-shanghai.aliyuncs.com\/d50948ff96a0eddb5c8d22e9f82b6428.jpg,http:\/\/bab668.oss-cn-shanghai.aliyuncs.com\/ecd4f842e5b42025a64142423f63b7a8.jpg",
        "box_foot_images": "http:\/\/bab668.oss-cn-shanghai.aliyuncs.com\/63b52880b317b61c5bf8a717797d5c7e.jpg",
        "goods_num": 8,
        "price_min": 39,
        "price_max": 7499,
        "goods_images": ["http:\/\/bab668.oss-cn-shanghai.aliyuncs.com\/de7cbb4308fd4674ad331c0383f7c3d2.jpg", "http:\/\/bab668.oss-cn-shanghai.aliyuncs.com\/1f9046b2a9deb2af103d29c953a2922a.jpg", "http:\/\/bab668.oss-cn-shanghai.aliyuncs.com\/86782bdd45d38e22a51274a319910890.jpg", "http:\/\/bab668.oss-cn-shanghai.aliyuncs.com\/2ac38f5f38a71c64ef1a440416653c8f.jpg", "http:\/\/bab668.oss-cn-shanghai.aliyuncs.com\/e1959c9898c76fbb54fa1c5abd4d6ea8.jpg", "http:\/\/bab668.oss-cn-shanghai.aliyuncs.com\/c6ab5864570637a2772f421b1ce60c5f.jpg"]
      }],
      resultKey: 0,
      boxNum: 1,
    }
  },
  created() {
    this.getGoodsList()
    this.getCategoryList()
  },
  components: {
    // showResult
  },
  methods: {
    //创建订单
    createOder(num) {
      this.boxNum = num
      this.closeNumPopup()
      this.$refs['order-popup'].open('center')
    },
    //点击抽取
    btn() {
      // this.flag = true;
      this.type = 0
      this.boxNum = 1
      this.$refs['num-popup'].open()
      setTimeout(() => {
        // this.flag = false;
      }, 1500)
    },
    //确定购买
    confirm(){
      this.$refs['order-popup'].close()
      this.$refs['get-popup'].open()
      setTimeout(()=>{
        this.$refs['get-popup'].close()
      },500)
    },
    cancel(){
      this.$refs['order-popup'].close()
    },
    chooseGroup(index) {
      this.isActivedGroup = index;
    },
    changeCircle(e) {
      this.isActivedGroup = e.detail.current
    },
    //创建订单成功或者试玩返回结果
    closeNumPopup() {
      //关闭数量弹窗
      this.$refs['num-popup'].close()
    },
    //跳转盒柜
    toMyBox() {
      this.$refs['result-popup'].close()
      uni.navigateTo({url: '/pages/me/myBox'})
    },
    //回收
    recycle(prizedata) {
      this.$refs['result-popup'].close()
      this.$refs['recycle'].recycle(prizedata.prizeInfo)
    },
    chooseNav(index) {
      this.naved = this.categoryList[index].categoryId;
      if (index === 1) return
      this.isAnimate = false;
      setTimeout(() => {
        this.isAnimate = true;
        let m = this.categoryList[1];
        this.categoryList[1] = this.categoryList[index];
        this.categoryList[index] = m;

        let n = this.goodsList[1];
        this.goodsList[1] = this.goodsList[index];
        this.goodsList[index] = n;
      }, 1000)
      this.isActivedGroup = 0;
    },
    //前往详情页
    toDetail(item) {
      console.log(item)
      uni.navigateTo({
        url: `/subPages/goodsDetail/goodsDetail?id=${item.id}`
      })
    },

    //swiper变化时的回调
    transition(e) {
      if (this.huangdong) return
      this.huangdong = true
      setTimeout(() => {
        this.huangdong = false
      }, 1000)
    },
    //获取大类
    getCategoryList() {
      setTimeout(() => {
        this.categoryList = [
          {
            categoryId: 'xsj',
            categoryName: '新上架',
            desc: '最新上架'
          }, {
            categoryId: 'wxs',
            categoryName: '无限赏',
            desc: '欢乐无限赏'
          }, {
            categoryId: 'jfc',
            categoryName: '积分池',
            desc: '积分无限赏'
          }
        ]
      }, 100)
    },
    //获取商品列表
    getGoodsList() {
      setTimeout(() => {
          this.goodsList = [
            {
              categoryId: 'xsj',
              data: [
                {
                  id: 1,
                  name: '新上架1',
                  price: '￥29元/抽',
                  img: 'https://static.gute.fun/static/luckyOwn/lucky/dpld.png',
                  desc: '新上架结介绍1',
                  imgArr: [
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu1.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu2.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu3.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu4.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu5.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu6.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu7.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu8.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu9.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu10.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu11.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu12.png'
                  ]
                },
                {
                  id: 2,
                  name: '新上架2',
                  price: '￥59元/抽',
                  img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/1ae87107-2943-4ba6-be2b-390ca27c6260.png',
                  desc: '新上架介绍2',
                  imgArr: [
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu1.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu2.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu3.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu4.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu5.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu6.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu7.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu8.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu9.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu10.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu11.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu12.png'
                  ]
                },
                {
                  id: 3,
                  name: '新上架3',
                  price: '￥69元/抽',
                  img: 'https://www.baidu.com/img/pc_675fe66eab33abff35a2669768c43d95.png',
                  desc: '新上架介绍3',
                  imgArr: [
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu1.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu2.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu3.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu4.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu5.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu6.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu7.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu8.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu9.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu10.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu11.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu12.png'
                  ]
                }
              ]
            },
            {
              categoryId: 'wxs',
              data: [
                {
                  id: 1,
                  name: '无限池',
                  price: '￥29元/抽',
                  img: 'https://static.gute.fun/static/luckyOwn/lucky/dpld.png',
                  desc: '无限池介绍1',
                  imgArr: [
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu1.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu2.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu3.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu4.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu5.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu6.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu7.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu8.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu9.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu10.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu11.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu12.png'
                  ]
                },
                {
                  id: 2,
                  name: '无限池2',
                  price: '￥59元/抽',
                  img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/1ae87107-2943-4ba6-be2b-390ca27c6260.png',
                  desc: '无限池介绍2',
                  imgArr: [
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu1.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu2.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu3.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu4.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu5.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu6.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu7.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu8.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu9.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu10.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu11.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu12.png'
                  ]
                }
              ]
            },
            {
              categoryId: 'jfc',
              data: [
                {
                  id: 1,
                  name: '积分池',
                  price: '￥50积分/抽',
                  img: 'https://static.gute.fun/static/luckyOwn/lucky/dpld.png',
                  desc: '无限池介绍1',
                  imgArr: [
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu1.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu2.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu3.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu4.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu5.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu6.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu7.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu8.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu9.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu10.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu11.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu12.png'
                  ]
                },
                {
                  id: 2,
                  name: '积分池2',
                  price: '100积分/抽',
                  img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/1ae87107-2943-4ba6-be2b-390ca27c6260.png',
                  desc: '无限池介绍2',
                  imgArr: [
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu1.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu2.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu3.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu4.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu5.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu6.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu7.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu8.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu9.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu10.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu11.png',
                    'https://static.gute.fun/static/luckyOwn/lucky/qiu12.png'
                  ]
                }
              ]
            }
          ]
        }
        ,
        100
      )
    }
  }
}
</script>

<style scoped lang="scss">
@import "keyframe.scss";

.home {
  overflow: hidden;
  width: 100vw;
  min-height: 100%;

  .head {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 200rpx;
    text-align: center;
    background: url("https://static.gute.fun/static/luckyOwn/lucky/home_bg_head.jpg") no-repeat center/cover;

    .head_block {
      width: 20%;
      height: 80rpx;
      line-height: 80rpx;
      background: url("https://static.gute.fun/static/luckyOwn/lucky/nav.png") no-repeat center/cover;

      text {
        color: brown;
        font-size: 28rpx;
      }
    }

    .head_mid {
      width: 20%;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 28rpx;
      color: brown;
      background: url("https://static.gute.fun/static/luckyOwn/lucky/nav.png") no-repeat center/cover;
    }

    .head_rig {
      width: 20%;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 28rpx;
      color: brown;
      background: url("https://static.gute.fun/static/luckyOwn/lucky/nav.png") no-repeat center/cover;
    }

    .naved {
      width: 30%;
      height: 200rpx;
      line-height: 280rpx;
      background: url("https://static.gute.fun/static/luckyOwn/lucky/naved.png") no-repeat center/cover;

      text {
        color: #fff;
        font-size: 36rpx;
      }
    }

    .fadeAnimate {
      animation: fade 1s 1;
    }

    .showAnimate {
      animation: show 1s 1;
    }
  }

  .content {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 900rpx;
    background: url("https://static.gute.fun/static/luckyOwn/lucky/home_bg_content.jpg") no-repeat center/cover;

    .title {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42rpx;
      line-height: 42rpx;

      view {
        &.borderIcon {
          margin-left: 40rpx;
          margin-right: 16rpx;
          width: 6px;
          height: 100%;
          background-color: blue;
          border-radius: 10px;
        }

        &.titleTxt {
          font-size: 30rpx;
        }
      }
    }

    .swiperContent {
      height: 100%;

      uni-swiper {
        height: 800rpx;
      }

      swiper {
        height: 800rpx;
      }

      .circle {
        position: relative;
        top: 100rpx;
        left: 0;
        margin: 0 auto;
        width: 600rpx;
        height: 600rpx;
        background: url("https://static.gute.fun/static/luckyOwn/lucky/sjq_blue.png") no-repeat center/cover;

        .qiu {
          position: absolute;
          width: 70rpx;
          height: 70rpx;
          animation-duration: 1200ms;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          transform: rotate(0deg);

          &.one {
            top: 340rpx;
            left: 264rpx;
          }

          &.two {
            top: 370rpx;
            left: 200rpx;
          }

          &.three {
            top: 370rpx;
            left: 200rpx;
          }

          &.four {
            top: 370rpx;
            left: 200rpx;
          }

          &.five {
            top: 370rpx;
            left: 200rpx;
          }

          &.six {
            top: 370rpx;
            left: 200rpx;
          }

          &.seven {
            top: 372rpx;
            left: 338rpx;
          }

          &.eight {
            top: 372rpx;
            left: 338rpx;
          }

          &.nine {
            top: 372rpx;
            left: 338rpx;
          }

          &.ten {
            top: 372rpx;
            left: 338rpx;
          }

          &.eleven {
            top: 372rpx;
            left: 338rpx;
          }

          &.twelve {
            top: 372rpx;
            left: 338rpx;
          }

          &.hd1 {
            animation-duration: 1s;
            animation-name: hd1;
            animation-timing-function: ease-out;
          }

          &.hd2 {
            animation-duration: 1s;
            animation-name: hd2;
            animation-timing-function: ease-out;
          }

          &.hd3 {
            animation-duration: 1s;
            animation-name: hd3;
            animation-timing-function: ease-out;
          }

          &.hd4 {
            animation-duration: 1s;
            animation-name: hd4;
            animation-timing-function: ease-out;
          }

          &.hd5 {
            animation-duration: 1s;
            animation-name: hd5;
            animation-timing-function: ease-out;
          }

          &.hd6 {
            animation-duration: 1s;
            animation-name: hd6;
            animation-timing-function: ease-out;
          }

          &.hd7 {
            animation-duration: 1s;
            animation-name: hd7;
            animation-timing-function: ease-out;
          }

          &.hd8 {
            animation-duration: 1s;
            animation-name: hd8;
            animation-timing-function: ease-out;
          }

          &.hd9 {
            animation-duration: 1s;
            animation-name: hd9;
            animation-timing-function: ease-out;
          }

          &.hd10 {
            animation-duration: 1s;
            animation-name: hd10;
            animation-timing-function: ease-out;
          }

          &.hd11 {
            animation-duration: 1s;
            animation-name: hd11;
            animation-timing-function: ease-out;
          }

          &.hd12 {
            animation-duration: 1s;
            animation-name: hd12;
            animation-timing-function: ease-out;
          }

          &.btn.one {
            animation-name: around1;
          }

          &.btn.two {
            animation-name: around2;
          }

          &.btn.three {
            animation-name: around3;
          }

          &.btn.four {
            animation-name: around4;
          }

          &.btn.five {
            animation-name: around5;
          }

          &.btn.six {
            animation-name: around6;
          }

          &.btn.seven {
            animation-name: around7;
          }

          &.btn.eight {
            animation-name: around8;
          }

          &.btn.nine {
            animation-name: around9;
          }

          &.btn.ten {
            animation-name: around10;
          }

          &.btn.eleven {
            animation-name: around11;
          }

          &.btn.twelve {
            animation-name: around12;
          }
        }
      }
    }

    .draw {
      position: relative;
      top: 60rpx;
      margin: 0 auto;
      width: 240rpx;
      height: 76rpx;
      line-height: 56rpx;
      font-size: 28rpx;
      color: #fff;
      text-align: center;
      background: url("https://static.gute.fun/static/luckyOwn/lucky/kaixianganniu_blue.png") no-repeat center/cover;

      .shou {
        position: absolute;
        top: 10rpx;
        right: -140rpx;
        display: flex;
        align-items: center;
        animation: shouAnimation 1000ms linear forwards infinite;

        image {
          width: 100rpx;
          height: 100rpx;
        }

        .dianji {
          font-size: 24rpx;
          background-image: -webkit-linear-gradient(90deg, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      @keyframes shouAnimation {
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1.0);
        }
      }
    }
  }

  .footer {

    .swiperBlock {
      position: relative;
      top: 0;
      left: 0;
      margin: 0 20rpx;
      width: 300rpx;
      height: 240rpx;

      image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 32rpx;

        &.isActivedGroup {
          border: 2px solid blue;
        }
      }

      .txt {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        padding: 10rpx;
        background-color: rgba(0, 0, 0, .5);
        text-align: center;
        color: #fff;
        font-size: 28rpx;
      }
    }
  }
  //选择数量弹窗
  .num-popup {
    background: #FFFFFF;
    border-radius: 10px 10px 0px 0px;
    padding: 50px 25px 90px 25px;

    .popup-close {
      top: 30rpx;
      right: 30rpx;
      width: 44rpx;
      height: 44rpx;
      position: absolute;
    }

    .num-button-group {
      display: flex;
      justify-content: center;
      gap: 50rpx;
    }

    .num-button {
      position: relative;
      width: 300rpx;

      text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 36rpx;
        font-weight: bold;
        color: #fff;
        text-shadow: 1px 1px 1px black;
      }
    }

    .order-info {
      display: flex;

      > view {
        flex: 1;
        display: flex;
        align-items: center;
      }

      > view {
        font-size: 28rpx;
        font-weight: bold;
      }

      .total-price {
        color: red;
      }
    }

    > view {
      margin-bottom: 30rpx;
    }
  }

  .orderPopupView {
    padding: 20rpx;
    width: 80vw;
    text-align: center;
    .payType{
      display: flex;
      margin: 60rpx 0;
    }
    .payBtn{
      display: flex;
      margin: 20rpx 0;
      justify-content: space-evenly;
      align-items: center;
    }
  }
}


</style>
