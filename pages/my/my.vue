<template>
  <view class="me">
    <!-- S 头部 -->
    <view class="grxxtb">
    </view>
    <!-- E 头部-->
    <!-- 中间 -->
    <view class="me_main">
      <view class="me_main_head">
        <!-- 用户 -->
        <view class="me_head flexs" @click="goSet">
          <view class="txbj">
            <image :src="info.avatar" mode="aspectFill"></image>
          </view>
          <text>{{ info.nickname }}</text>
        </view>
        <view class="ts" @click="zxkf()">
          <image src="https://static.gute.fun/static/luckyOwn/tabbar/ts.png"></image>
        </view>
        <!-- <view class="me_main_head_nav flexs">
          <view class="me_main_head_nav_li center" v-for="(item,index) in topList" :key="index" @click="changeTop(index)">
            <image :src="item.image" mode=""></image>
            <text>{{ item.name }}</text>
          </view>
        </view> -->
        <view class="me_main_box">
          <view class="me_main_box_order flex">
            <view class="me_main_box_order_txt">我的订单</view>
            <view class="me_main_box_order_go flexs" @click="order(0)">
              <text>全部订单</text>
              <image src="https://static.gute.fun/static/luckyOwn/publice/jinruer@2x.png"></image>
            </view>
          </view>
          <view class="me_main_head_ul flex">
            <view class="me_main_head_li center" v-for="(item,index) in orderList" :key="index" @click="order(index)">
              <image :src="item.image"></image>
              <text>{{ item.name }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="me_main_con">
        <view class="me_main_con_head">钱包
          <view class="txmx" @click="txmx">提现明细>></view>
        </view>

        <view class="me_main_con_gold flex">
          <view class="me_main_con_gold_l flexs" @click="goWallet">
            <text>金币：</text>
            <text>{{ info.coin || 0 }}</text>
          </view>
          <view class="me_main_con_gold_l">
            <text>余额：</text>
            <text>{{ info.money || 0 }}</text>
          </view>
          <view class="me_main_con_gold_btn center" @click="recharge">充值</view>
        </view>
      </view>
      <view class="me_main_footer">
        <view class="me_main_footer_li center" v-for="(item,index) in footerList" :key="index"
              @click="changeFooter(item)">
          <view class="me_main_footer_img">
            <image :src="item.image" mode=""></image>
            <text>{{ item.name }}</text>
          </view>
          <!-- <view class="me_main_footer_li_go">
            <image src="/static/image/publice/jinruer@2x.png" mode=""></image>
          </view> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      topList: [
        {
          image: '/static/image/me/hegui@2x.png',
          name: '我的盒柜',
          url: ''
        },
        {
          image: '/static/image/me/jilu.png',
          name: '开箱记录',
          url: ''
        }
      ],
      orderList: [
        {
          image: 'https://static.gute.fun/static/luckyOwn/me/daifahuo@2x.png',
          name: '待发货'
        },
        {
          image: 'https://static.gute.fun/static/luckyOwn/me/yifahuo@2x.png',
          name: '已发货'
        },
        {
          image: 'https://static.gute.fun/static/luckyOwn/me/succed.png',
          name: '已完成'
        }
      ],
      footerList: [
        {
          image: 'https://static.gute.fun/static/luckyOwn/me/hegui@2x.png',
          name: '我的盒柜',
          url: '/subPages/myBox/myBox'
        },
        {
          image: 'https://static.gute.fun/static/luckyOwn/me/jilu.png',
          name: '开箱记录',
          url: '/subPages/unpackingRecords/unpackingRecords'
        },
        {
          image: 'https://static.gute.fun/static/luckyOwn/me/yue@2x.png',
          name: '我的余额',
          url: '/subPages/myBalance/myBalance'
        },
        // {
        // 	image:'/static/image/me/shoucang@2x.png',
        // 	name:'提现',
        // 	url:'/pages/me/deposit'
        // },
        {
          image: 'https://static.gute.fun/static/luckyOwn/me/shoucang@2x.png',
          name: '我的收藏',
          url: '/subPages/myCollection/myCollection'
        },
        {
          image: 'https://static.gute.fun/static/luckyOwn/me/fenxiang@2x.png',
          name: '分享赚钱',
          url: '/subPages/promotionCenter/promotionCenter'
        },
        {
          image: 'https://static.gute.fun/static/luckyOwn/me/dizhi@2x.png',
          name: '收货地址',
          url: '/subPages/myAddress/myAddress'
        },
        {
          image: 'https://static.gute.fun/static/luckyOwn/me/kf1.png',
          name: '联系客服',
          url: '/subPages/contactService/contactService'
        },
        {
          image: 'https://static.gute.fun/static/luckyOwn/me/shezhi@2x.png',
          name: '设置',
          url: '/subPages/setting/setting'
        },
      ],
      info: {},//个人信息
    };
  },
  methods: {
    goSet() {
      uni.navigateTo({url: '/subPages/setting/setting'})
    },
    //去我的钱包
    goWallet() {
      uni.navigateTo({url: '/subPages/myWallet/myWallet'})
    },
    //去提现明细
    txmx() {
      uni.navigateTo({url: '/subPages/promotionCenter/promotionCenter'})
    },
    //去充值
    recharge() {
      uni.navigateTo({url: '/subPages/rechargeCenter/rechargeCenter'})
    },
    //跳转客服
    zxkf: () => uni.navigateTo({url: '/subPages/contactService/contactService'}),
    //头部
    changeTop(index) {
      index == 0 ? uni.navigateTo({url: '/subPages/myBox/myBox'}) : uni.navigateTo({url: '/subPages/unpackingRecords/unpackingRecords'})
    },
    //去我的订单
    order(index) {
      uni.navigateTo({url: '/subPages/myOrders/myOrders?type=' + index})
    },
    changeFooter(item) {
      uni.navigateTo({url: item.url})
    },
    //获取个人信息
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
      //   }
      // }).catch(res=>{
      //   console.log(res);
      // })
    }
  },
  onShow() {
    this.getInfo()
  }
}
</script>

<style lang="scss">
.ts {
  width: 30px;
  height: 44px;
  position: fixed;
  top: 42px;
  right: 28px;
}

.grxxtb {
  height: 140rpx;
  background: url(https://static.gute.fun/static/luckyOwn/tabbar/xxbj.jpg);
  background-size: 100%;
}

.me_main .me_head {
  image {
    width: 100rpx;
    height: 100rpx;
    margin-right: 26rpx;
    border-radius: 50%;
    position: relative;
    left: 40rpx;
    top: 40rpx;
  }

  text {
    color: #000000;
    font-size: 36rpx;
    margin-left: 26rpx;
  }
}

.me_head .txbj {
  width: 180rpx;
  height: 180rpx;
}

.me_main {
  padding: 0 30rpx;
  margin-top: -74rpx;
  padding-bottom: 48rpx;

  .me_main_head {
    padding: 0 24rpx;
    margin-bottom: 20rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(51, 51, 51, 0.1);
    border-radius: 20rpx;

    .me_main_head_nav {
      border-bottom: 2rpx solid #F7F7F7;

      .me_main_head_nav_li {
        width: 50%;
        height: 86rpx;

        image {
          width: 44rpx;
          height: 44rpx;
          margin-right: 10rpx;
        }

        text {
          color: #000000;
          font-size: 28rpx;
          font-weight: bold;
        }
      }
    }

    .me_main_box {
      padding: 0 14rpx 30rpx 14rpx;

      .me_main_box_order {
        padding: 30rpx 0 35rpx 0;
      }

      .me_main_box_order_txt {
        color: #010101;
        font-size: 28rpx;
        font-weight: bold;
      }

      .me_main_box_order_go {
        image {
          width: 22rpx;
          height: 22rpx;
          margin-left: 10rpx;
        }

        text {
          color: #999999;
          font-size: 22rpx;
        }
      }

      .me_main_head_ul {
        .me_main_head_li {
          flex-direction: column;

          image {
            width: 44rpx;
            height: 44rpx;
            margin-bottom: 10rpx;
          }

          text {
            color: #000000;
            font-size: 22rpx;
          }
        }
      }
    }
  }

  .me_main_con {
    background: #FFFFFF;
    padding: 0 30rpx;
    margin-bottom: 2rpx;
    box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(51, 51, 51, 0.1);
    border-radius: 20rpx;

    .me_main_con_head {
      padding: 30rpx 0;
      color: #010101;
      font-size: 28rpx;
      font-weight: bold;
    }

    .me_main_con_gold {
      padding: 22rpx 0 26rpx 0;
      border-top: 2rpx solid #F7F7F7;

      .me_main_con_gold_l {
        text {
          color: #010101;
          font-size: 28rpx;

          &:last-child {
            font-weight: bold;
          }
        }
      }

      .me_main_con_gold_btn {
        width: 100rpx;
        height: 44rpx;
        color: #FFFFFF;
        background: -webkit-linear-gradient(0deg, #89f7fe 0%, #66a6ff 100%);
        border-radius: 22rpx;
      }
    }
  }

  .me_main_footer {
    margin-top: 20rpx;
  }

  .me_main_footer_li {
    width: calc(100% / 4);
    float: left;
    text-align: center;
    padding: 30rpx;
    margin-bottom: 2rpx;
    background: #FFFFFF;
    border-radius: 20rpx;

    .me_main_footer_img {
      image {
        width: 84rpx;
        height: 84rpx;
        display: block;
        margin: 0 auto;
      }

      text {
        color: #000000;
        font-size: 28rpx;
        margin-top: 20rpx;
        display: block;
      }
    }

    .me_main_footer_li_go {
      width: 22rpx;
      height: 22rpx;
    }
  }
}

.txmx {
  float: right;
  font-weight: 400;
}
</style>


