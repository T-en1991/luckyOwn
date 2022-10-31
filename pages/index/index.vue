<template>
  <view class="home">
    <view class="head">
      <view v-for="(item,index) in categoryList" :key="index" :class="['head_block',naved===index?'naved':'']"
            @click="chooseNav(index)">
        {{ item.categoryName }}
      </view>
    </view>
    <view class="content">
      <view class="title">
        <view class="borderIcon"></view>
        <view class="titleTxt">{{ categoryList.length > 0? categoryList[naved].desc : '欢乐抽赏'}}</view>
      </view>
      <view class="swiperContent" v-if="goodsList.length>0">
        <swiper circular :current="isActivedGroup" @change="changeCircle">
          <template v-for="item in goodsList[naved].data">
            <swiper-item>
              <view class="circle">
                <image class="qiu" v-for="(cur,index) in item.imgArr" :class="[flag?'btn':'',qiu[index]]" :key="index"
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
        <template v-for="(item,index) in goodsList[naved].data">
          <swiper-item>
            <view :key="index" class="swiperBlock" @click="chooseGroup(index)">
              <image :class="isActivedGroup===index?'isActivedGroup':''" :src=item.img mode="scaleToFill"></image>
              <view class="txt">{{ item.desc }}</view>
            </view>
          </swiper-item>
        </template>
      </swiper>
    </view>

    <payment ref="payment" :box-id="currBox && currBox.box_id" :box-num="boxNum" :type="type" pay-page="index"
             @create-success="closeNumPopup" @show-result="showResult"></payment>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      categoryList: [],//大类
      flag: false,//球是否应该运动
      qiu: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'],//球对应动态样式的名称
      titleTxt: ['最新上架', '欢乐无限赏', '积分无限赏'],
      naved: 1,//三种方式
      isActivedGroup: 0,//选中的组
    }
  },
  onLoad() {

  },
  created() {
    this.getGoodsList()
    this.getCategoryList()
  },
  methods: {
    btn() {
      this.flag = true;
      setTimeout(() => {
        this.flag = false;
      }, 1500)
    },
    chooseGroup(index) {
      this.isActivedGroup = index;
    },
    changeCircle(e) {
      this.isActivedGroup = e.detail.current
    },
    chooseNav(index) {
      this.naved = index;
      this.isActivedGroup = 0;
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
      color: brown;
      font-size: 28rpx;
      background: url("https://static.gute.fun/static/luckyOwn/lucky/nav.png") no-repeat center/cover;
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
      font-size: 36rpx;
      color: #fff;
      background: url("https://static.gute.fun/static/luckyOwn/lucky/naved.png") no-repeat center/cover;
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
      swiper{
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
            top: 310rpx;
            left: 160rpx;
          }

          &.two {
            top: 260rpx;
            left: 220rpx;
          }

          &.three {
            top: 280rpx;
            left: 280rpx;
          }

          &.four {
            top: 300rpx;
            left: 340rpx;
          }

          &.five {
            top: 320rpx;
            left: 260rpx;
          }

          &.six {
            top: 200rpx;
            left: 400rpx;
          }

          &.seven {
            top: 180rpx;
            left: 200rpx;
          }

          &.eight {
            top: 200rpx;
            left: 300rpx;
          }

          &.nine {
            top: 220rpx;
            left: 160rpx;
          }

          &.ten {
            top: 230rpx;
            left: 230rpx;
          }

          &.eleven {
            top: 270rpx;
            left: 400rpx;
          }

          &.twelve {
            top: 360rpx;
            left: 340rpx;
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
        top: -20rpx;
        right: -180rpx;
        display: flex;
        align-items: center;
        animation: shouAnimation 2000ms linear forwards infinite;

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
    margin-bottom: 100rpx;

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
}

@keyframes around1 {
  10% {
    top: 310rpx;
    left: 120rpx;
    transform: rotate(-40deg);
  }
  20% {
    top: 110rpx;
    left: 160rpx;
    transform: rotate(-30deg);
  }
  30% {
    top: 222rpx;
    left: 260rpx;
    transform: rotate(-30deg);
  }
  40% {
    top: 210rpx;
    left: 260rpx;
    transform: rotate(60deg);
  }
  50% {
    top: 320rpx;
    left: 270rpx;
    transform: rotate(80deg);
  }
  60% {
    top: 310rpx;
    left: 360rpx;
    transform: rotate(90deg);
  }
  70% {
    top: 340rpx;
    left: 340rpx;
    transform: rotate(290deg);
  }
  80% {
    top: 120rpx;
    left: 260rpx;
    transform: rotate(-60deg);
  }
  80% {
    top: 192rpx;
    left: 272rpx;
    transform: rotate(-50deg);
  }
  100% {
    top: 310rpx;
    left: 160rpx;
    transform: rotate(0deg);
  }
}

@keyframes around2 {
  10% {
    top: 323rpx;
    left: 332rpx;
    transform: rotate(10deg);
  }
  20% {
    top: 342rpx;
    left: 123rpx;
    transform: rotate(-20deg);
  }
  30% {
    top: 323rpx;
    left: 211rpx;
    transform: rotate(-80deg);
  }
  40% {
    top: 239rpx;
    left: 203rpx;
    transform: rotate(20deg);
  }
  50% {
    top: 323rpx;
    left: 332rpx;
    transform: rotate(10deg);
  }
  60% {
    top: 342rpx;
    left: 123rpx;
    transform: rotate(-20deg);
  }
  70% {
    top: 323rpx;
    left: 211rpx;
    transform: rotate(-80deg);
  }
  80% {
    top: 239rpx;
    left: 203rpx;
    transform: rotate(20deg);
  }
  90% {
    top: 342rpx;
    left: 123rpx;
    transform: rotate(-20deg);
  }
  100% {
    top: 260rpx;
    left: 220rpx;
    transform: rotate(0deg);
  }
}

@keyframes around3 {
  10% {
    top: 342rpx;
    left: 123rpx;
    transform: rotate(-20deg);
  }
  20% {
    top: 323rpx;
    left: 211rpx;
    transform: rotate(-80deg);
  }
  30% {
    top: 239rpx;
    left: 203rpx;
    transform: rotate(20deg);
  }
  40% {
    top: 300rpx;
    left: 200rpx;
    transform: rotate(30deg);
  }
  50% {
    top: 337rpx;
    left: 210rpx;
    transform: rotate(-60deg);
  }
  60% {
    top: 298rpx;
    left: 203rpx;
    transform: rotate(20deg);
  }
  70% {
    top: 323rpx;
    left: 332rpx;
    transform: rotate(10deg);
  }
  80% {
    top: 342rpx;
    left: 123rpx;
    transform: rotate(-20deg);
  }
  90% {
    top: 230rpx;
    left: 365rpx;
    transform: rotate(40deg);
  }
  100% {
    top: 280rpx;
    left: 280rpx;
    transform: rotate(0deg);
  }
}

@keyframes around4 {
  10% {
    top: 342rpx;
    left: 123rpx;
    transform: rotate(-20deg);
  }
  20% {
    top: 230rpx;
    left: 365rpx;
    transform: rotate(40deg);
  }
  30% {
    top: 280rpx;
    left: 280rpx;
    transform: rotate(0deg);
  }
  40% {
    top: 320rpx;
    left: 190rpx;
    transform: rotate(-10deg);
  }
  50% {
    top: 190rpx;
    left: 230rpx;
    transform: rotate(10deg);
  }
  60% {
    top: 230rpx;
    left: 178rpx;
    transform: rotate(30deg);
  }
  70% {
    top: 320rpx;
    left: 190rpx;
    transform: rotate(-10deg);
  }
  80% {
    top: 190rpx;
    left: 230rpx;
    transform: rotate(10deg);
  }
  90% {
    top: 287rpx;
    left: 376rpx;
    transform: rotate(90deg);
  }
  100% {
    top: 300rpx;
    left: 340rpx;
    transform: rotate(0deg);
  }
}

@keyframes around5 {
  10% {
    top: 110rpx;
    left: 160rpx;
    transform: rotate(-10deg);
  }
  20% {
    top: 239rpx;
    left: 203rpx;
    transform: rotate(20deg);
  }
  30% {
    top: 300rpx;
    left: 200rpx;
    transform: rotate(30deg);
  }
  40% {
    top: 337rpx;
    left: 210rpx;
    transform: rotate(-60deg);
  }
  50% {
    top: 298rpx;
    left: 203rpx;
    transform: rotate(20deg);
  }
  60% {
    top: 210rpx;
    left: 260rpx;
    transform: rotate(-30deg);
  }
  70% {
    top: 342rpx;
    left: 302rpx;
    transform: rotate(-110deg);
  }
  80% {
    top: 335rpx;
    left: 367rpx;
    transform: rotate(30deg);
  }
  90% {
    top: 337rpx;
    left: 210rpx;
    transform: rotate(-60deg);
  }
  100% {
    top: 320rpx;
    left: 260rpx;
    transform: rotate(0deg);
  }
}

@keyframes around6 {
  10% {
    top: 342rpx;
    left: 302rpx;
    transform: rotate(-110deg);
  }
  20% {
    top: 335rpx;
    left: 367rpx;
    transform: rotate(30deg);
  }
  30% {
    top: 337rpx;
    left: 210rpx;
    transform: rotate(-60deg);
  }
  40% {
    top: 320rpx;
    left: 260rpx;
    transform: rotate(0deg);
  }
  50% {
    top: 128rpx;
    left: 354rpx;
    transform: rotate(-20deg);
  }

  60% {
    top: 236rpx;
    left: 222rpx;
    transform: rotate(30deg);
  }

  70% {
    top: 333rpx;
    left: 323rpx;
    transform: rotate(50deg);
  }

  80% {
    top: 233rpx;
    left: 233rpx;
    transform: rotate(10deg);
  }

  90% {
    top: 333rpx;
    left: 323rpx;
    transform: rotate(50deg);
  }

  100% {
    top: 200rpx;
    left: 400rpx;
    transform: rotate(0deg);
  }
}

@keyframes around7 {
  10% {
    top: 300rpx;
    left: 200rpx;
    transform: rotate(30deg);
  }
  20% {
    top: 300rpx;
    left: 200rpx;
    transform: rotate(30deg);
  }
  30% {
    top: 210rpx;
    left: 222rpx;
    transform: rotate(-30deg);
  }
  40% {
    top: 310rpx;
    left: 232rpx;
    transform: rotate(60deg);
  }
  50% {
    top: 321rpx;
    left: 260rpx;
    transform: rotate(90deg);
  }
  60% {
    top: 110rpx;
    left: 160rpx;
    transform: rotate(-10deg);
  }
  70% {
    top: 239rpx;
    left: 203rpx;
    transform: rotate(20deg);
  }
  80% {
    top: 220rpx;
    left: 160rpx;
    transform: rotate(-60deg);
  }
  90% {
    top: 298rpx;
    left: 203rpx;
    transform: rotate(20deg);
  }
  100% {
    top: 180rpx;
    left: 200rpx;
    transform: rotate(0deg);
  }
}

@keyframes around8 {
  10% {
    top: 351rpx;
    left: 270rpx;
    transform: rotate(90deg);
  }
  20% {
    top: 312rpx;
    left: 350rpx;
    transform: rotate(-60deg);
  }
  30% {
    top: 200rpx;
    left: 300rpx;
    transform: rotate(0deg);
  }
  40% {
    top: 190rpx;
    left: 322rpx;
    transform: rotate(-30deg);
  }
  50% {
    top: 330rpx;
    left: 232rpx;
    transform: rotate(60deg);
  }
  60% {
    top: 351rpx;
    left: 270rpx;
    transform: rotate(90deg);
  }
  70% {
    top: 312rpx;
    left: 350rpx;
    transform: rotate(-60deg);
  }
  80% {
    top: 200rpx;
    left: 300rpx;
    transform: rotate(0deg);
  }
  90% {
    top: 190rpx;
    left: 322rpx;
    transform: rotate(-30deg);
  }
  100% {
    top: 200rpx;
    left: 300rpx;
    transform: rotate(0deg);
  }
}

@keyframes around9 {
  10% {
    top: 290rpx;
    left: 342rpx;
    transform: rotate(-30deg);
  }
  20% {
    top: 351rpx;
    left: 239rpx;
    transform: rotate(90deg);
  }
  30% {
    top: 292rpx;
    left: 190rpx;
    transform: rotate(-60deg);
  }
  40% {
    top: 220rpx;
    left: 160rpx;
    transform: rotate(0deg);
  }
  50% {
    top: 357rpx;
    left: 203rpx;
    transform: rotate(60deg);
  }
  60% {
    top: 351rpx;
    left: 239rpx;
    transform: rotate(90deg);
  }
  70% {
    top: 292rpx;
    left: 190rpx;
    transform: rotate(-60deg);
  }
  80% {
    top: 351rpx;
    left: 270rpx;
    transform: rotate(90deg);
  }
  90% {
    top: 312rpx;
    left: 350rpx;
    transform: rotate(-60deg);
  }
  100% {
    top: 220rpx;
    left: 160rpx;
    transform: rotate(0deg);
  }
}

@keyframes around10 {
  10% {
    top: 326rpx;
    left: 332rpx;
    transform: rotate(-30deg);
  }
  20% {
    top: 200rpx;
    left: 300rpx;
    transform: rotate(0deg);
  }
  30% {
    top: 291rpx;
    left: 339rpx;
    transform: rotate(90deg);
  }
  40% {
    top: 353rpx;
    left: 231rpx;
    transform: rotate(60deg);
  }
  50% {
    top: 291rpx;
    left: 339rpx;
    transform: rotate(90deg);
  }
  60% {
    top: 342rpx;
    left: 168rpx;
    transform: rotate(-60deg);
  }
  70% {
    top: 200rpx;
    left: 300rpx;
    transform: rotate(0deg);
  }
  80% {
    top: 190rpx;
    left: 322rpx;
    transform: rotate(-30deg);
  }
  90% {
    top: 200rpx;
    left: 300rpx;
    transform: rotate(0deg);
  }
  100% {
    top: 230rpx;
    left: 230rpx;
    transform: rotate(0deg);
  }
}

@keyframes around11 {
  10% {
    top: 362rpx;
    left: 323rpx;
    transform: rotate(-30deg);
  }
  20% {
    top: 326rpx;
    left: 332rpx;
    transform: rotate(-30deg);
  }
  30% {
    top: 200rpx;
    left: 300rpx;
    transform: rotate(0deg);
  }
  40% {
    top: 291rpx;
    left: 339rpx;
    transform: rotate(90deg);
  }
  50% {
    top: 353rpx;
    left: 231rpx;
    transform: rotate(60deg);
  }
  60% {
    top: 291rpx;
    left: 339rpx;
    transform: rotate(90deg);
  }
  70% {
    top: 336rpx;
    left: 321rpx;
    transform: rotate(60deg);
  }
  80% {
    top: 351rpx;
    left: 393rpx;
    transform: rotate(90deg);
  }
  90% {
    top: 327rpx;
    left: 268rpx;
    transform: rotate(-60deg);
  }
  100% {
    top: 270rpx;
    left: 400rpx;
    transform: rotate(0deg);
  }
}

@keyframes around12 {
  10% {
    top: 265rpx;
    left: 325rpx;
    transform: rotate(-30deg);
  }
  20% {
    top: 291rpx;
    left: 339rpx;
    transform: rotate(90deg);
  }
  30% {
    top: 353rpx;
    left: 231rpx;
    transform: rotate(60deg);
  }
  40% {
    top: 291rpx;
    left: 339rpx;
    transform: rotate(90deg);
  }
  50% {
    top: 365rpx;
    left: 325rpx;
    transform: rotate(60deg);
  }
  60% {
    top: 350rpx;
    left: 334rpx;
    transform: rotate(90deg);
  }
  70% {
    top: 372rpx;
    left: 286rpx;
    transform: rotate(-60deg);
  }
  80% {
    top: 291rpx;
    left: 339rpx;
    transform: rotate(90deg);
  }
  90% {
    top: 353rpx;
    left: 231rpx;
    transform: rotate(60deg);
  }
  100% {
    top: 360rpx;
    left: 340rpx;
    transform: rotate(0deg);
  }
}
</style>
