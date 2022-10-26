<template>
  <view class="invite">
<!--    <view class="invite_head flex">-->
<!--      <image src="https://static.gute.fun/static/luckyOwn/pageA/fanhui@2x.png" mode="" @click="retutnTop"></image>-->
<!--      <text class="title">推广中心</text>-->
<!--      <text class="righticon"></text>-->
<!--    </view>-->

    <v-tabs v-model="current" :tabs="tabs" @change="changeTab"
            :fixed="false" :scroll="false" activeColor="#171A20" lineColor="#171A20" bgColor="transparent"
            fontSize="30rpx" lineHeight="6rpx" lineRadius="6rpx" :lineScale="0.15"></v-tabs>
    <swiper class="swiper" circular :current="current" @change="swiperChange">
      <swiper-item>
        <view class="coin-swiper">
          <view class="total-coin-view flex" style="justify-content: flex-start;align-items: flex-end;">
            <view class="">
              <text class="txt">总收益</text>
              <view class="coin-unit">
                <text class="coin">{{ totalIn || 0 }}</text>
                <text class="unit">&nbsp;元</text>
              </view>
            </view>
            <view class="">
              <text class="txt">佣金</text>
              <view class="coin-unit">
                <text class="coin">{{ info.settled_item || 0 }}</text>
                <text class="unit">&nbsp;元</text>
              </view>
            </view>
            <view class="">
              <text class="txt">已提现</text>
              <view class="coin-unit">
                <text class="coin">{{ withd || 0 }}</text>
                <text class="unit">&nbsp;元</text>
              </view>
            </view>

            <view class="tixian-btn" @click="toDeposit">提现</view>
          </view>
          <view class="nodata" v-if="retailList.length==0 && retailStatus=='noMore'">
            暂无数据
          </view>
          <scroll-view class="coin-list-view" scroll-y="true"
                       @scrolltolower="lower('retail')">
            <view class="coin-item flex" v-for="(item, index) in retailList" :key="index">
              <view class="left flex">
                <view class="avatar-view">
                  <image :src="item.avatar || 'https://static.gute.fun/static/luckyOwn/lucky/default.png'" mode="aspectFit"></image>
                </view>
                <view class="name-time">
                  <view class="username">
                    {{ item.nickname || '昵称' }}
                  </view>
                  <view class="time">
                    {{ item.create_time || '时间' }}
                  </view>
                </view>
              </view>
              <view class="right">
                <view class="in-coin">
                  +{{ item.coin || '佣金' }}元
                </view>
                <view class="level">
                  {{ item.level }}级
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="tixian-swiper">
          <view class="nodata" v-if="tixianList.length==0 && tixianStatus=='noMore'">
            暂无数据
          </view>
          <scroll-view class="tixian-list-view" scroll-y="true" @scrolltolower="lower('tixian')">
            <template v-for="(item, index) in tixianList">
              <view class="tixian-item" :key="index">
                <view class="tixian-title flex">
                  <view class="title-text">{{ item.create_time }}</view>
                  <view>
                    <uni-tag v-if="item.status == 'review'" text="审核中" type="primary"></uni-tag>
                    <uni-tag v-else-if="item.status == 'success'" text="已通过" type="success"></uni-tag>
                    <uni-tag v-else-if="item.status == 'reject'" text="已驳回" type="error"></uni-tag>
                  </view>
                </view>
                <view class="tixian-info">
                  <view>提现金额：￥{{ item.amount }}</view>
                  <view>提现类型：{{ item.type == 'alipay' ? '支付宝' : '微信' }}</view>
                  <view>账户名：{{ item.username }}</view>
                  <view>账户：{{ item.account }}</view>
                  <view v-if="item.status == 'reject'" class="reason">
                    驳回原因：{{ item.reason }}
                  </view>
                </view>
              </view>
            </template>
            <view class="lower-tip">
              <template v-if="tixianStatus == 'more'">下拉加载</template>
              <template v-else-if="tixianStatus == 'loading'">加载中...</template>
              <template v-if="tixianStatus == 'noMore'">无更多数据</template>
            </view>
          </scroll-view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="team-swiper">
          <view class="nodata" v-if="teamList.length==0 && teamStatus=='noMore'">
            暂无数据
          </view>
          <view class="team-wrapper">
            <view class="top-view flex" v-if="teamList.length > 0">
              <text>时间</text>
              <text>用户</text>
              <text>渠道</text>
            </view>
            <scroll-view class="team-list-view" scroll-y="true"
                         @scrolltolower="lower('team')">
              <view class="team-item flex" v-for="(item, index) in teamList" :key="index">
                <text class="time-view">{{ item.create_time || '时间' }}</text>
                <text class="name-view">{{ desensitization(item.username) || '昵称' }}</text>
                <text>{{ item.level || '渠道' }}</text>
              </view>
            </scroll-view>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="qrcode-swiper">
          <view class="qrcode-wrap">
            <!-- <view class="qrcode-view">
              <view class="qrcode-box">
                <view class="qrcode-img-box">
                  <image :src="info.qr_code" mode="aspectFill"></image>
                </view>
              </view>
            </view> -->
            <canvas class="qrcode-view" canvas-id="firstCanvas" id="firstCanvas" v-if="!canvasImage"></canvas>
            <view class="qrcode-view" v-if="canvasImage">
              <!-- <image :src="canvasImage" mode="aspectFit"></image> -->
              <img class="img1" :src="canvasImage"/>
            </view>
            <!-- #ifndef H5 -->
            <view class="btn-view"></view>
            <!-- #endif -->
            <!-- #ifdef H5 -->
            <view class="tip">
              长按图片保存
            </view>
            <!-- #endif -->
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      current: 0,
      tabs: ['佣金', '提现', '团队', '推广'],
      totalIn: 0,
      withd: 0, //已提现
      retailList: [],
      retailPage: 1,
      retailPageSize: 10,
      retailStatus: 'more',
      teamList: [],
      teamPage: 1,
      teamPageSize: 10,
      teamStatus: 'more',
      tixianList: [],
      tixianPage: 1,
      tixianPageSize: 10,
      tixianStatus: 'more',
      canvasImage: ''
    };
  },
  onLoad() {
    this.totalIn = null
    this.withd = 0
    // this.$api.getTotalCoin().then(data => {
    //   this.totalIn = data.data.total
    //   this.withd = data.data.dw
    // })
    this.loadRetailList()
    this.loadTeamList()
    this.loadTixianList()
    this.getInfo()
  },
  methods: {
    toDeposit() {
      uni.navigateTo({url: '/pages/me/deposit'})
    },
    changeTab(index) {
      console.log('当前选中的项：' + index)
    },
    swiperChange({detail}) {
      this.current = detail.current
    },
    //返回上一级
    retutnTop() {
      uni.navigateBack()
    },
    loadRetailList() {
      if (this.retailStatus == 'loading' || this.retailStatus == 'noMore') {
        return
      }
      this.retailStatus = 'loading'
      let query = {
        page: this.retailPage,
        limit: this.retailPageSize
      }
      this.retailList = []
      this.retailStatus = 'noMore'
      // this.$api.getRetailList(query).then(data => {
      //   const list = data.data
      //   this.retailList = [...this.retailList, ...list]
      //   if (list.length < this.retailPageSize) {
      //     this.retailStatus = 'noMore'
      //   } else {
      //     this.retailStatus = 'more'
      //   }
      // })
    },
    loadTeamList() {
      if (this.teamStatus == 'loading' || this.teamStatus == 'noMore') {
        return
      }
      this.teamStatus = 'loading'
      let query = {
        page: this.teamPage,
        limit: this.teamPageSize
      }
      this.teamList = []
      this.teamStatus = 'noMore'
      // this.$api.getTeamList(query).then(data => {
      //   const list = data.data
      //   this.teamList = [...this.teamList, ...list]
      //   if (list.length < this.teamPageSize) {
      //     this.teamStatus = 'noMore'
      //   } else {
      //     this.teamStatus = 'more'
      //   }
      // })
    },
    loadTixianList() {
      if (this.tixianStatus == 'loading' || this.tixianStatus == 'noMore') {
        return
      }
      this.tixianStatus = 'loading'
      let query = {
        page: this.tixianPage,
        limit: this.tixianPageSize
      }
      this.tixianList = []
      this.tixianStatus = 'noMore'
      // this.$api.getTixianList(query).then(data => {
      //   const list = data.data
      //   this.tixianList = [...this.tixianList, ...list]
      //   if (list.length < this.tixianPageSize) {
      //     this.tixianStatus = 'noMore'
      //   } else {
      //     this.tixianStatus = 'more'
      //   }
      // })
    },
    lower(type = 'team') {
      switch (type) {
        case 'team':
          if (this.teamStatus == 'more') {
            this.teamPage++
            this.loadTeamList()
          }
          break;
        case 'tixian':
          if (this.tixianStatus == 'more') {
            this.tixianPage++
            this.loadTixianList()
          }
          break;
        case 'retail':
          if (this.retailStatus == 'more') {
            this.retailPage++
            this.loadRetailList()
          }
          break;
      }
    },
    getInfo() {
      this.info = {
        "nickname": "Mk''",
        "mobile": "13023636000",
        "settled_item": "0.00",
        "avatar": "https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/oED7smylicNiclJlcdibIagx4ADvQial0LnygRZpYib2U3DC2r35Yun13ZzghHyDGwA778S2QfJQNT3AeugByyTTEDg\/132",
        "money": 0,
        "coin": 0,
        "sharecode": "Nhu2J0",
        "qr_code": "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAIAAABC8jL9AAAfR0lEQVR4nO2d63PbxtXGd3HhTXfJkhs7jiXZypvYcTqOO+O2M+2Ht\/O2\/Z87ky\/95pk2k3ZaJxNb8UW+SbIuoUhJJLD7flgSArEARRLAAod6fvZoSGBvAPFgz56DXXApJQMA0MQqugEAgMmBgAEgDAQMAGEgYAAIAwEDQBgIGADCQMAAEAYCBoAwEDAAhIGAASAMBAwAYSBgAAgDAQNAGAgYAMJAwAAQxhk3A+c8j3akZMRZzUmN17ObPMw8ak8zzTunYx\/9MFOekJQXQ4FM8KuhBwaAMBAwAISBgAEgDAQMAGEgYAAIAwEDQJixw0hTSbERhQJrL2EohaVuVWz2aV0+OTMBmzlBhV9wxgLOxYamYymhBsoWQh+drH5NmNAAEAYCBoAwEDAAhIGAASAMBAwAYXIMI1HxB14R8nBij+5CJ02Zr+SrFQeOPY\/FXoWj1zJW40kw+rGPfphTdu+4FJjQABAGAgaAMBAwAISBgAEgDAQMAGGm1gud3rc84qQWk+EZkyUYKPOKRKFyZWoFPDrUwzNmZuRAbOUEJjQAhIGAASAMBAwAYSBgAAgDAQNAmCvnhSbkXh6RYiNGeawgl7L2WKbVWz61AiYdHDLZ+ALX2SP9G5UEmNAAEAYCBoAwEDAAhIGAASAMBAwAYabWC52TM9PYjBxjFBuFmtbojjFyFHA5fxtjUZM8Dr+EL0wqFjMnpJxXsgImNACEgYABIAwEDABhIGAACAMBA0CYzLzQV9wdqlPsNJ08ILFQXnpK2KQhTG0c2CRlW1bu6qQEMKEBIAwEDABhIGAACAMBA0AYCBgAwsALXVKucsQoj5TTCi\/zTIs0kH6XT7HTnvI4dYXHlkj87hMAExoAwkDAABAGAgaAMBAwAISBgAEgTDZhJGP+QOoO0jx8oXm83yRlRXmUmTkpL9qShDmmNg48rWEDA1B\/ZdGV+ulhQgNAGAgYAMJAwAAQBgIGgDAQMACEGdsLbXKeStkCTuPWNWLKsnlN0\/\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\/PU3t8+\/u3q6qrqfnsWAR9oUk\/Dsc97gDzBGNggoduu6jallJLJ69evu67baDT29vaOj49Vp8cZt23bcRzf9wfKCO7fklXciroLSCk931O3gMWlRYtb+\/v7Pfu5j9KY7\/uc87m5ufX19Vqt9v3333u+t7W1xRh7+vTp2dkZZ1zpvNvt2rbted6jR492d3dfvXrl+\/5FJ8wHSlZNkkwyyTjjELAx0AMbpH9ZK9UxxrjFb392++HDhycnJ61Wi3NeqVRsy3ZshzFm2\/bc3JzrukEXp\/6q3ltKubi4WKvV1NjVddzVa6uNemOmMdNqt3zhB7pSWH2q1aqU8uTk5Pj4WAixvLQ8Nze3vb39S\/MXzrmqznVdx3Esy1pdXXVd98XLF+3TtmUrc4EHAwF1G1LGwsUBQr0GQQ9slv7FbVmWZLJWrf3+97\/\/29\/+1m63feEvLix+8803T58+XVhYEEIcHR\/96X\/\/9O23316\/fn1vb29+fv78\/Jwxxjl\/+fJlo9FYWlpaXl5ut9u7u7uLi4v37t07PDw8OTmp1+rrt9d\/\/vlnz\/MajcaNGzeq1eqbN2+uXbs2Ozt7enrKGFtbW\/vHP\/5h2\/b6+vqPP\/7YaDS2trba7Xaz2ex0Or\/+9a\/\/\/ve\/M8Y2NzefPn364KsHzWaz1WrNz893Op3t7W0pZafTcV23UqncvXv3P\/\/5jzLOlU8OGjYGBGyW\/hhYSuk4TrVabbfbv\/zyy9z83J3NOysrKwcHB3\/84x+FEG\/evFlcXNzb23v48GG3261Wq5988smHDx8ajcazZ88sy7p\/\/77qfv\/79L+dTmdjY+Pjx4+bm5tv377d2tr65z\/\/OTc3d3JycufOnfv37yuvcq1WUykPDg4ODg5OT0+vXbu2tLSken4p5ebm5uvXr7e2tp49e3Z6dvr51uetVuvBgwfv37+v1+s3btzwPG93d9e27evXr795+8Z13a2tLSmk53nKLuiNkIEpCpiNVMK6TLyuSQ6Y0JZleb53cnLy3XffNRoN13F\/+umn\/f399+\/fn56edjqdpaWlVqu1s7PTaDRmZmb29\/cPDg7Ozs4ajcbOzg7n\/OjoiDHWbrcPPh5IJj9+\/Mg5397eVtuFEJ7neZ53dHT05MmT2dnZZrOptPfixYtGoyGEEFJ0ve7z7ecWt\/b29iqVysePH1WZP\/zwA2Ps+PhYOaVfv37daDSeP3\/+2WefVSoVbvHd3d2lxaX5+fmP+x\/ff3jvOE6321UmuhAipRe6hEGp0ZtkOCbCx61vrJOrF25yAboRD83MvCXXrkcm66hwqxpDep5Xr9fPO+dSSDX0XVlZefbsGWM937VlWY7jzMzMtNttz\/OUTjzfq7gVIYXv+yospIK36p\/FLcu2fM9X3mYpe\/6lSqXi+Z7v+ZbdCyBLJl3XVc6wtdU1ZW8H8SQ11lWuaVWCbdvqKHzhq7pUzNm27a7XtS2bMdb1Tic7ycZ+99FJec2PXuYELYfBY4rB30uyngeIW1xI4bru2dkZk4xb3Bf+rVu3Dg4ObNt2K64UslKpcM5nZ2fPzs46nQ5jTEWJK27F930ppIr9Sim73a7v+Z7v2ZbNOe92uowxz\/eUG0z5xs4750q0UkjOuJCi4lZ8zxdCOLZTr9d33ux4ntftdpVd3Xv8Q0pVl9rV6XQ6nY7whXJKK5+cEEKpFxgDY2BTDM5PsJglfME4k0KqiGsvBsP55sbmzMzM0dGR6jPn5ua++uqrg4ODw8PD8855z0ZljDEWBIoG7tySWdxSwSfOuVKpevyit1Fy9ZCGYEKFlDjjnU7Htu3Z2dm9vT3f6wWuzs\/OmQoOMXZRWuDclky1UDWAM544rQrkBgRskITn\/oUUjLGeIV2tNxqNf\/\/738HDVce\/HH\/33XeBNasez4o+8BQ7pSHyAHM4AWOWZbmu6\/t+o964ffv28fHx4eFhq91qnbSUhSyFTMp78eR2ZDJjeAswAsbApsbATj20j0XGw6ocX\/i2ZbsV1\/f84DlHFXBijEkhVfcbfXSRJXd6+tyD0Fc1dpVSzs\/Pc86bzaayvYMOdkjega+R+4hkjLGujzHw2GVO0HL0wKbQr\/LBq19K6diOlFINYquV6vn5uYrNcItLISWTqq8eYLDv5bzXCUoWvU3odw2LW4wxIUS73VaTH2zL9n3\/4mHJhLzReiOJYUIbZJoFnHk0IlWBYblGrF\/Zn8YgBGPM8zzbsbte13EdKaSUkgkmhHAcRwghmbRt2\/M9pXblu7Isy3GdWq12fn6uJicov1e321VZ1EPOS4tLzWZTeaSVnay6dDUA7s2OsO1gEgW3uOd5FrdixNw\/EGUdcDUEVqZE0Q9ylDAKlR9jCzi2lzcZJUtp2aYpM212fXyoJvQwHuo\/Wb1eX1paqtfr1Wr17du3x8fHrutWq9W1tbXXO6+lkJ7vLS8tf\/nll4yxJ0+eSCarlervfve7er3+5MmT\/f199bzk+vr6u3fvDg4OuMWr1Wq1Uv3LX\/7y\/fffP\/3haa1aW11d3d3bdWzHtu1Op1OtVr\/44ovDw8OXL1+qZqysrKjHrVqtVuA2G3DFhcmuB055geVE5qZ+VnY+wkimCHe5ESuaDViknPOvv\/76+vXrf\/3rX+\/cueM4zvz8\/Pr6+tdff\/2bR79RfWa73b5586Z6btnzvF\/96lebm5v1en1mZsZxHSHE7Ozs1tbWxsaGEGJpcenP\/\/fn9fX127dv37p1q+JWHj169Pjx4y\/+54vHjx\/fvXuXMSal\/PLLL7\/55ptPPvnEsqyZmZk\/\/OEPn3322b1792q1mmRxVxs8VSUAAjZFaGbfxVc2qGfJ1Hx99ZTlv\/71r7m5OV\/4Dx48qNfrGxsbCwsLjUbDdd379++vra0tLi7atu067vLysm3bh4eHy8vL3U63Xq\/fvn3bcZyVlRXHcVqt1ocPH169evVh90Oj0bBtu33a3tzcVI4rx3Fu3rz58OFDz\/Pevn17cHDAGJNSNpvNGzduzMzMdDqdqLeZDVUvhG2QaR4Dl47Bce\/F5\/BGyZSQdnd319fXt7e3pZA7OztCiG+\/\/fbFixetVkstwfHkyRPf99X0hna7zRirVquVSsVxnbOzs+fPnwsh5ufnNzY2Xr58eXx8fHR0tP18u9Vq+b7\/+tXrH3\/8sXnSdB231Wq9efvm8PDw3r17a2trtm2fnp222+2jo6OTkxPP8zzfu2i83uzIocV+BbkxdhgpvpQc3oCaU3QnjzJHyT4QRoov5UIVKysrHw8+WtzyhW9xq16vK39Vt9v1fX9hYUHNB\/z0008PDw9brdba2prrukdHR7VardVqtdvt5eXl1dXVFy9eeJ7n+\/7y8vLJycnq6mqtVnv58qUQgnGmfM695QE4V89Ly9D6HsEzWDJYiEOLG104rvqPfKjsEz9KGQuhMXDZn4WOLwUCvgzX7gs4\/KBFL3\/C5\/7XcL0qzKO8StVqValaeY\/Vk9WqPWpeQW8xgH6Zwd5gVa2kGtN\/hYDNUAoB5xG7L1bAekrHrjEWE\/6NeXDqsjb0lr\/oz6cPZMn60mWMDUg01Mhw4ug6OIzFfI1sHHLrGdx7ZQWcJnthD3IYvuuMQgmbNECsjIdfEn0XF+svr3HxwHNIkL1lLoPeVa9ZX4Mu\/DX2s+42T8rL4ytNyei\/ZvpHvsp+5QwCL7RBZOjDKF1Z5EJS\/aWUrL9CnVJpb6pgv9flLNQnB67vQRO6N6yNNIBpIa7gv97apLz6g1kgT+CFNkjS6DfWOmXxfaNyOAUKDLoR3l80K9qx9B+9CG\/vddpJOpSDMo79OkTDwCDogU0R68UNduljY52+PMKOX\/VBPct1MaZljMl+giDaPGge9x54jNw7YvvYEe87l7Yf5AB6YLMEl\/4QhehdnBzMzjSdcM0s18fYSX2jfjdJk1ffCPIEPbApuPZV9\/fEGrHhxHwwu54x1ofEB6UVLlxqgtfbOVZemNBmyXdRu7I59IpsfMTs5Fp\/FdFnklM61ksUGTnrg9VwMr2LTjKSJ8sbcphdSpppMGP9mqMnzirAY4ZSmNClPTsRUrUzclXIwe1SE8+l6Zl2F+ChvJHuMVxy\/4OUMhyCUvRWt2LCsZzeqxj6sxEdu7cKn1oJQK2bd7FCSGnIY5GA0gIT2hTJkaFoZxtrBjMtDQ99CH\/V+9IEOzniuHZcx\/M99X4ztS6HWnpWvXvNtnovW1ErAdi2zTgTUli2dVGvTGg5yA0I2CD6xS0HhR0ZZ7IE2Ye3RzQjQ1pi2q0htEU93xx0v1JKz\/MqbkV5p5V6bdt2bMexHbWsj3qE03Ed9WqlayvXek9lRqyD2AaDfCiFCX0lGDJqjQggYiTreZnW3+rbw4XH6cqyLF\/4ruN6nre5uVmpVDzP+\/nnn1n\/YS+FWu35zp07+\/v7tm0vLi7u7+83Go1Xr155vmdxy7Is4Q9qGOo1CHpgU0R6y4jvSvdpJbmUI8QGYIO6+KB6Q19931f2cLVaVS9YWVlZqVQrFrcqbiUoybKtpaWl1dXVhYWFzz\/\/3Pf9mzdvdjqdbrd78cAmG6wIvmiDoAc2RazzKbJd90gNITYmrPeECd4s9Q4Hzvnq2mqlUmk2mxsbG47j\/PTTT81mc2FhodvtNhqNSqWiVs+amZmZm5trNpt379599+4d40ytpDUwI0K3pUHO5Ctg0t6\/7Bf60ge0epwmdhfTRrOxAVu9EKZFlfp51RCXMVar1d69e6es4p2dncPDQ\/XuBcbY6enpxsbG27dvG43G+w\/vGWO+77948UII0TOe1cyK8Kp3uf3gxV5LKWvPr\/GZrQtNxXdvZiHimOmEVq2\/T+Xpfx4SgNUVmxQcZlpK\/cPg12DdSfXO7nq9zhjrdDqnZ6cVt9KbF8G5ZVue56n2uBW32+kqj1cwKUqqdzJorfL8s8saylhxP0d+GJ72BBPaFElOrIiHKbw9yd5myTofUoUWslLzGWZmZur1uu\/76n3fFbei1ohWYV4VBFbzHjzPC+Ybq\/FzzKENbxLIGgjYILGu2ohikyJGkS16bxwZhUYyhndJ9UeqxzYsy2qftr2u1+12JZOccfWCMmUkq2iTelrDtmxmMbUSda8ktf4OwkjFARPalAlt19hwYmO2LG4Qm5T40r3h7jEp8KOfjInywoS+tHaY0KTQL\/rYAE9Ye5GUYQ0PcVbpeyPbY8NLeuL0eUH+IA5sikiklMWFhZN8yzJO83pIOcmCHRJtGqXZY+WF8WyWzHrgchrMOnm0c5IyY23R4e4oqd0C9M8RdPv20v42ZV5evIapXIqZkK8JbWY8YHLUNHFK16lH+8xLbVEZJ9Qkj3Q415AyY+32pK8T5O0fWuTwsw+qj\/m7m1lW0jwwoQ0S7j8HL\/d4F3REQjIklSQ\/djh9uIrYr5Ea5dDEI+blg80AOQMBmyLWixvskgm7wiRpQ2pyitwd2Aies0j5E+ct2n6+asALbRY52H\/GKmRI2CZJ53ywD9QzDukY9btJmrz6RpAn6IFNobuXdX9P2A8Ua2PrRjiLS6ZXHZZWuPDYKFGavLCfzQIBmyLipI0YpYE+dUcXC6UJlzZKDxkkjpQfHktHCoztkMfKCw0bpCyzkajMNZm8nbqrSdcw07xTepfItGTh7BE\/k25vR3TINIlybe9Yecfsh2mtIJct+rGbeDdSTl7+lJQtChWXKK6bjTVcw0KK+I3YYDIdPa\/urI4Uq2\/RPVKj500g9hSlPPN5lJkHubYTTixDdP3T2O05vbbPWNjzivSWpQVjYAAIAwEDQBgIGADCQMAAEGZKnFh5PCufsvbSPv4+Cpm\/Sagsk8Dyx3BgLEcBG\/NPUo9GpDlRo+dNH\/+jcksa8UhT\/u6FXzYKmNAAEAYCBoAwEDAAhIGAASAMBAwAYbLxQufkfMvD7WnMy595JCaPqseqqJw+Z53C198yyZTEgY1FOKZ1bbSJSXnvw1yIlMCEBoAwEDAAhIGAASAMBAwAYSBgAAgzJV7olL7cErqCjc3yKeGx6+TUSBLHPhxi70ZKPwUkcw2UZFZKtpg5S+nJI1puZj2wrE4ITGgACAMBA0AYCBgAwkDAABAGAgaAMGN7oU069Ek8+m+ySSU8\/BHJ6cUOeVw2xhb0y8QRPSVx4DI49LMlj5sXiRtiLIXH6kp76mBCA0AYCBgAwkDAABAGAgaAMBAwAITJ1wttbJJQse9GyoNinZwlcbEGlK09Q0hz0U5wcY4t4MJfsVM2h77JO4LhGGOGlK09UwNMaAAIAwEDQBgIGADCQMAAEAYCBoAwZZmNZKwBaV5ElNM7h0YnzbEb++HymHRhuAFmysyEUs9GmrKAEyEQ9RkFYy+gGwJMaAAIAwEDQBgIGADCQMAAEAYCBoAwpfZCpySPyUx51J4HxuaBlS1aZpI0IcmsyHE2Uh5lpp8LVUKKjZYZC7blEWzPvPZYynwtwYQGgDAQMACEgYABIAwEDABhIGAACENvNlIspB++NxbyKVv2ckbaaF1LUxsHNvk2nTRrzZUzYlTsRK5iA060gAkNAGEgYAAIAwEDQBgIGADCQMAAEGZqvdAmMTbtidDCdGnKLMMsnwzJ9VfLTMBmzm\/Kc2FyuUMqsaWU0F05kO4dIQxMaAAIAwEDQBgIGADCQMAAEAYCBoAwOYaRCn9Hjk7hLzeKhUpsqYS1jw7pCNwQEAceA5MznEZsAPU5cXSjUKwcs7tgQgNAGAgYAMJAwAAQBgIGgDAQMACEgRc6kRLOiSn2bU95QKWdsZTh54CAGUvn5U8v6ZRruOURosgjQJJ5DGysqF7mtRuraDgwoQEgDAQMAGEgYAAIAwEDQBgIGADCTK0XeixPbObrreVUuzGKXdRu9LyjO3JL+A4nvdgJ\/NJTK+D00J0ok1N8JY\/ai4XKnK0hwIQGgDAQMACEgYABIAwEDABhIGAACAMvdCLldJyOAvVl7gqc5WOy8ZmQo4AJ+eiNRYwInZOykfkbpNJThkAjTGgACAMBA0AYCBgAwkDAABAGAgaAMJl5oekGXUwyfWeJyhHlsURhGY59auPAKX+bPLIX+xYlQhTY+Jx+OLwbCQAQAwQMAGEgYAAIAwEDQBgIGADCcNLuSgCuOOiBASAMBAwAYSBgAAgDAQNAGAgYAMJAwAAQBgIGgDAQMACEgYABIAwEDABhIGAACAMBA0AYCBgAwkDAABAGAgaAMBAwAIT5f86gLwu\/FVjFAAAAAElFTkSuQmCC"
      }
      // this.$api.userinfo().then(res=>{
      //   if (res.code === 1) {
      //     this.info = res.data
      //     this.makeCanvas()
      //   }
      // })
    },
    //手机号脱敏
    desensitization(phone) {
      if (!phone) return ''
      return phone.substr(0, 3) + '****' + phone.substr(7)
    },
    makeCanvas() {
      var _this = this
      var ctx = uni.createCanvasContext('firstCanvas')
      const res = uni.getSystemInfoSync()
      var canvasW = 560 * res.screenWidth / 750,
        canvasH = 1000 * res.screenWidth / 750
      uni.getImageInfo({
        src: '../static/pageA/bj.jpg',
        success: function (bg) {
          ctx.drawImage(bg.path, 0, 0, canvasW, canvasH)
          uni.getImageInfo({
            src: '../static/pageA/bj.jpg',
            success: function (bg2) {
              let w = canvasW
              let h = bg2.height / bg2.width * w
              let x = 0
              let y = (canvasH - h) / 2
              ctx.drawImage(bg2.path, x, y, w, h)
              uni.getImageInfo({
                src: _this.info.qr_code,
                success: function (qrcode) {
                  let w = 200 * res.screenWidth / 750
                  let x = (canvasW - w) / 2
                  let y = 790 * res.screenWidth / 750
                  ctx.drawImage(qrcode.path, x, y, w, w)
                  ctx.draw(false, setTimeout(() => {
                    uni.canvasToTempFilePath({
                      x: 0,
                      y: 0,
                      width: canvasW,
                      height: canvasH,
                      canvasId: 'firstCanvas',
                      success: function (res) {
                        // 在H5平台下，tempFilePath 为 base64
                        // alert('成功')
                        _this.canvasImage = res.tempFilePath
                        // console.log(_this.canvasImage)
                      }
                    }, _this)
                  }, 1000))
                }
              });
            }
          });
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.lower-tip {
  text-align: center;
  color: #a3a3a3;
}

.tixian-list-view {
  max-height: calc(100vh - 70rpx - 44px - 24rpx);

  .tixian-item {
    display: flex;
    flex-direction: column;
    margin: 20rpx;
    padding: 0 20rpx;
    background-color: #fff;
    border-radius: 5px;

    .tixian-title {
      border-bottom: solid 1px #e3e3e3;
      padding: 20rpx 0;

      .title-text {
        font-size: 14px;
      }
    }

    .tixian-info {
      display: flex;
      flex-wrap: wrap;
      margin: 5rpx 0 20rpx 0px;

      view {
        width: 50%;
        margin-top: 10rpx;
      }

      .reason {
        width: 100%;
        color: #e43d33;
        font-weight: bold;
      }
    }
  }
}

page {
  background-color: #F5F6FA;
}

$swiperH: calc(100vh - 70rpx - 44px);
.invite {
  background-image: $topbg;
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100% calc(44px + 70rpx);

  .invite_head {
    width: 100%;
    height: 44px;
    padding: 0 20rpx;

    image {
      width: 44rpx;
      height: 44rpx;
    }

    .title {
      font-size: 34rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 36rpx;
    }

    .righticon {
      width: 44rpx;
      height: 44rpx;
    }
  }

  .swiper {
    height: $swiperH;
  }

  .coin-swiper {
    .total-coin-view {
      position: relative;
      width: 690rpx;
      height: 200rpx;
      background-image: $bg;
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
      margin: 24rpx auto 0;
      padding: 48rpx 40rpx;

      > view {
        flex: 1;
        text-align: center;
      }

      .txt {
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }

      .coin-unit {
        justify-content: flex-start;

        .coin {
          font-size: 40rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }

        .unit {
          font-size: 28rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
        }
      }

      .tixian-btn {
        position: absolute;
        top: 0;
        right: 0;
        border-bottom-left-radius: 20rpx;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        color: #FFFFFF;
        font-size: 30rpx;
        background: #ff4891;
        padding: 0 40rpx;
      }
    }

    .coin-list-view {
      max-height: calc(100vh - 70rpx - 44px - 24rpx - 200rpx);

      .coin-item {
        width: 690rpx;
        background-color: #FFF;
        margin: 20rpx auto;
        border-radius: 16rpx;
        padding: 30rpx;

        .left {
          .avatar-view {
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20rpx;
            border: 1px solid #eee;
          }

          .name-time {
            .username {
              font-size: 28rpx;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #333333;
              line-height: 40rpx;
            }

            .time {
              font-size: 24rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #7A808D;
              line-height: 34rpx;
            }
          }
        }

        .right {
          text-align: right;

          .in-coin {
            font-size: 32rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FA6400;
            line-height: 44rpx;
          }

          .level {
            font-size: 24rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 34rpx;
          }
        }
      }
    }
  }

  .team-swiper {
    .team-wrapper {
      overflow: hidden;

      .top-view {
        background: #FFF;
        border-radius: 24rpx 24rpx 0 0;
        width: 690rpx;
        margin: 24rpx auto 0;
        font-size: 28rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #2E333F;
        padding: 32rpx 30rpx 14rpx;
        height: 86rpx;
      }

      .team-list-view {
        max-height: calc(100vh - 70rpx - 44px - 24rpx - 86rpx);
        // padding-bottom: 24rpx;
        .team-item {
          width: 690rpx;
          margin: 0 auto;
          height: 88rpx;
          padding: 0 30rpx;
          background-color: #F9F5FF;
          font-size: 26rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #171A20;
          line-height: 36rpx;
          justify-content: flex-start;

          &:nth-child(2n-1) {
            background-color: #F6F8FF;
          }

          &:last-child {
            border-radius: 0 0 24rpx 24rpx;
            margin-bottom: 24rpx;
          }

          .time-view {
            width: 288rpx;
          }

          .name-view {
            width: 300rpx;
          }
        }
      }
    }
  }

  .qrcode-swiper {
    position: relative;

    &::before {
      // content: '';
      width: 54rpx;
      height: calc(1000rpx - 100rpx);
      background: #CDC7C7;
      border-radius: 0 24rpx 24rpx 0;
      position: absolute;
      left: 0;
      top: 50rpx;
    }

    &::after {
      // content: '';
      width: 54rpx;
      height: calc(1000rpx - 100rpx);
      background: #CDC7C7;
      border-radius: 24rpx 0 0 24rpx;
      position: absolute;
      right: 0;
      top: 50rpx;
    }

    .qrcode-wrap {
      overflow-y: auto;
      height: $swiperH;
    }

    .qrcode-view {
      .img1 {
        width: 100%;
        height: 100%;
      }

      width: 560rpx;
      height: 1000rpx;
      margin: 26rpx auto 0;
      background: #FF7674;
      border-radius: 24rpx;
      background-image: $bj;
      background-repeat: no-repeat;
      background-size: 100% auto;
      background-position: center;
      position: relative;
      display: flex;
      overflow: hidden;

      .qrcode-box {
        width: 100%;
        background-image: $renwu;
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center;
      }

      .qrcode-img-box {
        width: 200rpx;
        height: 200rpx;
        position: absolute;
        top: 370rpx;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .btn-view {
      width: 308rpx;
      height: 84rpx;
      background-image: $button;
      margin: 50rpx auto;
      background-size: 100%;
      background-position: center;
    }

    .tip {
      margin: 50rpx auto;
      text-align: center;
      font-size: 33rpx;
    }
  }

  .nodata {
    text-align: center;
    padding: 40% 0;
    font-size: 30rpx;
  }
}
</style>
