<template>
  <div class="home" ref="home">
    <div class="top">
      <yd-navbar title>
        <span slot="left" class="fly_logo">
          <img src="../../../static/img/home/logo2.png" alt>
        </span>
        <div
          slot="right"
          v-if="userDetails.account"
          style="width:100%;height: 45px;padding-top: 6px;"
        >
          <button class="userList top_but to_out" @click="logout">退出</button>
          <p class="userList">
            <i class="fa fa-jpy" style="color: #FEA71B;"></i>
            {{userDetails.accountBalance.toFixed(3)}}
          </p>
          <p class="userList">
            <i class="fa fa-user" style="color: #02C50B;"></i>
            {{userDetails.type=='1'?"游客":userDetails.account}}
          </p>
        </div>
        <div slot="right" v-else style="width:100%;height: 45px;padding-top: 6px;">
          <button class="top_but to_demo" >app下载</button>
          <button class="top_but to_register" @click="$router.push({name:'register'})">注册</button>
          <!-- <button class="top_but to_demo" @click="goGame">试玩</button> -->
          <button class="top_but to_login" @click="$router.push({name:'login'})">登录</button>
          
        </div>
      </yd-navbar>
    </div>
    <div class="wrapper" ref="wrapper">
      <div class="banner">
        <yd-slider autoplay="3000">
          <yd-slider-item v-for="(item,index) in SlidesImg" :key="index">
            <img :src="item.imgUrl">
          </yd-slider-item>
          <!--<yd-slider-item>
            <img src="../../../static/img/home/banner2.jpg">
          </yd-slider-item>
          <yd-slider-item>
            <img src="../../../static/img/home/banner3.jpg">
          </yd-slider-item>-->
        </yd-slider>
      </div>
      <!-- <div class="list">
        <Nav @result="result" @enterChart="enterChart">
          <NavItem :name="index" :data="item" v-for="(item,index) in classMap" :key="index"></NavItem>
        </Nav>
      </div>-->
      <div class="tliet" @click="HorselightTips">
        <i class="fa fa-volume-down"></i>
        <div class="inner">
          <myMarquee :lists="lists"></myMarquee>
        </div>
      </div>
      <div style="padding-top:.8rem">
      <van-tabs v-model="tabId" animated background="#f1f2f4" @change="change" :swipe-threshold="6" title-active-color="#2e69a9" color="#2e69a9">
          <van-tab v-for="(item,index) of [...kindsObj]" :key="index" >
            <div slot="title" style="display: flex;justify-content: center;flex-direction:column;align-items: center;">
            	<img v-if="item[0]=='热门'" style="width: 0.4rem;" src="../../../static/img/icon/hot.png" />
            	<img v-else-if="item[0]=='棋牌'" style="width: 0.4rem;" src="../../../static/img/icon/qp.png" />
            	<img v-else-if="item[0]=='PK10'" style="width: 0.4rem;" src="../../../static/img/icon/pk10.png" />
            	<img v-else-if="item[0]=='时时彩'" style="width: 0.4rem;" src="../../../static/img/icon/ssc.png" />
            	<img v-else-if="item[0]=='六合彩'" style="width: 0.4rem;" src="../../../static/img/icon/lhc.png" />
            	<img v-else-if="item[0]=='11选5'" style="width: 0.4rem;" src="../../../static/img/icon/11x5.png" />
            	<img v-else-if="item[0]=='福体彩'" style="width: 0.4rem;" src="../../../static/img/icon/ftc.png" />
            	<img v-else-if="item[0]=='快三'" style="width: 0.4rem;" src="../../../static/img/icon/ks.png" />
              <span>{{item[0]=='PK10'?'赛车':item[0]}}</span> 
            </div>
            <div class="lotteryTypes">
              <ul @click="delegation">
                <li v-show="item[0]==='热门'||item[0]==='棋牌'" @click="clickQp">
                  <img src="../../../static/img/icon/jsnn.png" alt>
                  <section>
                    <p>极速牛牛</p>
                    
                    <p style="color: #666666;font-size: 0.23rem;">全天{{gameConfig['klft'].periodNoAll}}期</p>
                    <p style="color: #666666;font-size: 0.23rem;">07:00-06:00</p>
                  </section>
                </li>
                <li v-for="(item,index) of item[1]"  :key='index' @click="result(item)">
                  <img :src="'../../../static/img/icon/'+item.baseLotteryId+'.png'" alt="">
                  <section>
                    <p>{{item.name}}</p>
                    
                    <p style="color: #666666;font-size: 0.23rem;">全天{{gameConfig[item.baseLotteryId].periodNoAll}}期</p>
                    <p style="color: #666666;font-size: 0.23rem;">{{gameConfig[item.baseLotteryId].lotteryTime}}</p>
                  </section>
                </li>
                <!-- <li v-show="item[0]==='热门'"  @click="load_App()">
                  <img src="../../../static/img/icon/loadAPP.png" alt>
                  <section>
                    <p>全民代理</p>
                    <p>点击立即下载</p>
                  </section>
                </li> -->
              </ul>
            </div>
          </van-tab>
      </van-tabs>
      </div>


      <!-- <ul class="list">
        <li @click="$router.push({path:'/game'})">
          <img src="../../../static/img/icon/wrnn.png" alt>
          <p>极速牛牛</p>
        </li>
        <li v-for="(item,index) in lottery_List" @click="result(item)" :class="item.baseLotteryId">
          <img
            v-if="item.baseLotteryId!=='txffc'&&item.baseLotteryId!=='mlaft'"
            :src="'../../../static/img/icon/'+item.baseLotteryClassId+'.png'"
            alt
          >
          <img
            v-if="item.lotteryType =='热门'"
            class="hotGame"
            src="../../../static/img/kindList/Hot.png"
            alt
          >
          <img
            v-if="item.lotteryType =='新'"
            class="hotGame"
            src="../../../static/img/kindList/New.png"
            alt
          >
          <p>{{item.name}}</p>
        </li>
      </ul> -->
      <div class="lower">
        <p>
          <!-- <i class="fa fa-television" style="color: #888;" ></i>
          <span>电脑版</span>-->
        </p>
      </div>
    </div>
    <div class="aAssis_tant" v-show="assis_tant">
      <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant>
    </div>
    <!--<div class="loadApp" v-show="isApp">
      <img class="loadAppCha" src="../../../static/img/icon/cha.png" @click="load_App()" alt>
      <div class="imgLogo"></div>
      <div class="elplain">
        <h1>全民代理</h1>
        <p>下载手机APP,多重好礼等你拿！</p>
      </div>
      <div class="butLoda">
        <button>立即下载</button>
      </div>
    </div>-->
    <div class="bottom">
      <Footer></Footer>
    </div>
    <com-alert v-show="show1">
      <div class="content" slot="alert-content">
        <p>全民代理全面上线 试玩体验博彩刺激</p>
        <p>会员玩转畅玩赢世界 代理享受特权秀优越</p>
        <button @click="show1 = false">确定</button>
      </div>
    </com-alert>
    <com-alert v-show="isLogout">
      <div class="content logout" slot="alert-content">
        <p>是否退出登录？</p>
        <div class="logout-btn">
          <button class="cancle" @click="cancle">取消</button>
          <button class="confirm" @click="confirm_logout">确定</button>
        </div>
      </div>
    </com-alert>
    <flyGuild v-show="flyGuildNum == '1'">
      <div class="flyGuild_content" slot="flyGuild_content">
        <p>欢迎来到全民代理</p>
        <p>
          全民代理为您提供了丰富的博彩娱乐游戏，其中包括时时彩，赛车，六合彩等多种最前沿的彩类玩法。但与众不同的是，全民代理还有最受欢迎棋牌游戏牛牛。
        </p>
        
        <button class="flyGuild_content_but"  @click="setflyGuildNum('2')" >下一步</button>
      </div>
      <!-- <img class="indicator allkinds_indicator" slot="indicator_img" src="../../../static/img/icon/hot.png" alt=""> -->
    </flyGuild>
    <flyGuild v-show="flyGuildNum== '2'">
      <div class="flyGuild_content" slot="flyGuild_content">
        <p>左右滑动可以做快速选择你想要玩的游戏彩类</p>
        <p>然后选择彩种点击进入投注页面进入游戏操作</p>
        <button class="flyGuild_content_but toback" @click="setflyGuildNum('1')" >上一步</button>
        <button class="flyGuild_content_but" @click="setflyGuildNum('3')" >下一步</button>
      </div>
      <div class="indicator allkinds_indicator" slot="indicator_img" alt="">
          <img  src="../../../static/img/icon/jiantou1.png" alt="">
      </div>
    </flyGuild>
    <flyGuild v-show="flyGuildNum =='3'">
      <div class="flyGuild_content" slot="flyGuild_content">
        <!-- <h1>去个人中心</h1> -->
        <p>点击进入到个人中心，可以有更多操作</p>
        <button class="flyGuild_content_but toback" @click="setflyGuildNum('2')" >上一步</button>
        <button class="flyGuild_content_but" @click="toHome" >下一步</button>
      </div>
      <div class="indicator  tocenter" slot="indicator_img" alt="">
          <img  src="../../../static/img/icon/jiantou2.png" alt="">
      </div>
    </flyGuild>
  </div>
</template>

<script>
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { mapState, mapActions, mapMutations } from "vuex";
	import Footer from "../home/dome/home_foot.vue";
	import Nav from "./dome/nav.vue";
	import NavItem from "./dome/nav-item.vue";
	import Assistant from "../home/dome/assistant.vue";
	import { setTimeout } from 'timers';
	import myMarquee from '../home/dome/marquee.vue';
	// import routerID from '../bet/routerId.js';
	import gameConfig from '@/components/bet/createconfig/gameConfig.js'
  import comAlert from './dome/alert.vue';
  import flyGuild from './dome/flyGuild.vue';
	import CountDown from './CountDown'
	export default {
		components: {
			Assistant,
			Nav,
			NavItem,
			Footer,
			swiper,
			swiperSlide,
			myMarquee,
			CountDown,
      comAlert,
      flyGuild
		},
		data() {
			return {
				gameConfig:gameConfig,
				show1: false,
				assis_tant: false,
				classMap: [],
				pushKindList: [{
					type: "3",
					iconImg: "chat_room.png",
					titleName: "聊天室"
				}],
				lottery_List: [],
				lists: [
					'全民代理全面上线',
					'试玩体验博彩刺激',
					'会员玩转畅玩赢世界',
					'代理享受特权秀优越'
				],
				isLogout: false,
				userAccount:'',
        SlidesImg:[],//轮播图数据
        kindsObj:[],
        tabId:0,//tab当前选中索引
//      marginLefts:["hk6","fc3d","pl3","bjpk10"],
        
			};
		},
		created() {
     
			this.getNowAllKindMessage()
			if(sessionStorage.getItem("tabId")){
				this.tabId = sessionStorage.getItem("tabId")*1;
			}
			// console.log(this.userDetails,'0000');
			// var mySwiper = new Swiper('.swiper-container', {
			//   autoplay: true,//可选选项，自动滑动
      // })
			if(this.kindList.length != 0) {
				this.classMap = this.kindList;
				this.classMap = this.classMap.concat(this.pushKindList);
				this.classMap = this.split_array(this.classMap, 2);
			} else {
				this.kind().then(() => {
					this.classMap = this.kindList;
					this.classMap = this.classMap.concat(this.pushKindList);
					this.classMap = this.split_array(this.classMap, 2);
				});
			}
			if(this.lotteryList.length != 0) {
        this.lottery_List = this.lotteryList;
           this.kindsObj = [...this.kinds(this.lottery_List)];
			} else if(this.lotteryList.code == '666' || this.lotteryList.length == 0) {
				this.kindSum().then(res => {
          this.lottery_List = res;
             this.kindsObj = [...this.kinds(this.lottery_List)];
				})
      }
		},
		mounted(){
			this.querySlidesImg().then((res)=>{
				this.SlidesImg = res
			})
		},
		computed: {
			...mapState("home", ["times","kindList", "lotteryList", "lotteryName", "lotteryId",'kindIndex']),
			...mapState("login", ["userDetails"]),
			...mapState("chart", ["chartsocket"]),
			...mapState(["isApp"]),
      ...mapState(["isLogin",'queryAccout','flyGuildNum'])
		},
		methods: {
			...mapActions("login", ["getUserDetails", "touristLogin"]),  
			...mapActions("home", ["kind", "signOut", "kindSum"]),
			...mapMutations(["setIsLogin",'loadApp']),
			...mapActions("home", ["nowAllKindMessage","kind", "signOut", "kindSum","querySlidesImg"]),
      ...mapMutations(["setIsLogin",'setflyGuildNum']),
      ...mapMutations("bet", ["SET_GAMETYPE"]),
			...mapMutations("home", ["setTimes"]),
			...mapMutations("bet", ["setKindId"]),
			...mapActions("bet", ["getGameInfo","getPlayList"]),
			...mapActions("chart", ["chartLogin", 'chartLogout']),
			...mapMutations('login', [
				"saveUserDetails"
      ]),
      ...mapActions('personal',[
        'queryLoginInfo'
          ]),
      delegation() {
        if (!this.isLogin) {
          this.$dialog.toast({
            mes: '未登录！',
            timeout: 1000
          })
        }
      },
      toHome(){
        this.$router.push("/home");
        this.setflyGuildNum('4')
      },
      clickQp() {
        if (this.isLogin) {
          this.$router.push({path:'/game'})
        }
      },
      change(name){
      	sessionStorage.setItem("tabId",name)
      },
       _queryLoginInfo(page){
        this.queryLoginInfo({
          page: page
        }).then((res) => {
          if(res.data.countAll == '0'){
            this.setflyGuildNum('1')
          }
        })
			},
      getNowAllKindMessage(){
      	let times = {}
      	this.nowAllKindMessage().then((res)=>{
      		if(res.code === 0){
      			for(let classId in res.data){
      				if(classId!='currentTime'){
      					res.data[classId].forEach((item)=>{
      						times[item.kindId] = item
      				})
      				}
      			}
      			this.setTimes(times)
      		}
      	})
      },
      kinds(list) {
      if (list.length !== 0) {
        let set = new Set();
        let map = new Map();

        for (let item of list) {
          set.add(item.baseLotteryClassId);
        }
        for (let item of set) {
          let arr = Array.of();
          let arr2 = Array.of();
          for (let item2 of list) {
            if (item === item2.baseLotteryClassId) {
              arr.push(item2);
            }
            if (item2.lotteryType == "热门") {
              arr2.push(item2);
            }
          }
          map.set("热门", arr2);
          map.set("棋牌", []);
          map.set(this.kindIndex[Number(item)], arr);
        }
        return map;
      }
    },
			//将kindList数组分割为二维数组
			split_array(arr, len) {
				let arr_length = arr.length;
				let newArr = [];
				for(let i = 0; i < arr_length; i += len) {
					newArr.push(arr.slice(i, i + len));
				}
				return newArr;
			},
			result(obj) {
				Promise.all([
					this.getGameInfo("/" + obj.baseLotteryId), //获取开奖历史
					this.getPlayList(`/${obj.baseLotteryClassId}/${obj.baseLotteryId}`), //获取小彩类玩法
				]).then((values) => {
					if(values[0].code === 0){
						//缓存开奖数据
						sessionStorage.setItem("gameInfo", JSON.stringify(values[0]));
          }else if(values[0].code == '666'){
            this.$dialog.toast({
              mes: '登录超时，请重新登录',
              timeout: 1000
            })
            return
          }
					if(values[1].code === 0){
						//缓存玩法数据
						sessionStorage.setItem(obj.baseLotteryId, JSON.stringify(values[1].data.standGameList));
					}
					this.$router.push({path:"/bet"})
				})
				this.SET_GAMETYPE({
					classId:obj.baseLotteryClassId,
					kindId:obj.baseLotteryId,
					kindName:obj.name,
					periodNoAll:gameConfig[obj.baseLotteryId].periodNoAll
				})
        sessionStorage.setItem("gameType",JSON.stringify({
					classId:obj.baseLotteryClassId,
					kindId:obj.baseLotteryId,
					kindName:obj.name,
					periodNoAll:gameConfig[obj.baseLotteryId].periodNoAll
        }));
			},
			// result(obj) {
			//   this.setKindId(obj.classId);
			//   if (obj.classId == "2") {
			//     this.$router.push(`/hk6bet/${obj.classId}/${obj.kindId}`);
			//   } else {
			//     this.$router.push(`/bet/${obj.classId}/${obj.kindId}`);
			//   }
			// },
			//登录聊天室
			enterChart(items) {
				if(items.type == "3") {
					if(this.userDetails.type == 1) {
						this.$dialog.toast({
							mes: "会员登录查看更多",
							timeout: 1000
						});
					} else if(this.userDetails.type != 1) {
						if(sessionStorage.getItem("chartLogin") !== "1") {
							this.chartLogin({
								account: this.userDetails.account,
								password: sessionStorage.getItem("password"),
                loginFrom: "3", 
                businessNo:this.queryAccout
							}).then(res => {
								if(res.code === 0) {
									sessionStorage.setItem("chartLogin", "1");
									this.$router.push("/chartroom");
									this.getUserDetails();
								} else if(res.code === 111) {
									this.chartLogin({
										account: this.userDetails.account,
										password: sessionStorage.getItem("password"),
                    loginFrom: "3",
                    businessNo:this.queryAccout
									}).then(tel => {
										if(tel.code === 0) {
											sessionStorage.setItem("chartLogin", "1");
											this.$router.push("/chartroom");
										} else if(tel.code === 111) {
											this.$dialog.toast({
												mes: "请重新登录!",
												timeout: 1000
												// callback:()=>{
												//   this.$router.push("/login");
												// }
											});
										}
									});
								}
							});
						} else {
							this.$router.push("/chartroom");
						}
					}
				} else {
					return;
				}
			},
			cancle() {
				this.isLogout = false
			},
			confirm_logout() {
				this.signOut().then(res => {
					if(res.code == 0) {
						sessionStorage.setItem('chartLogin', '2');
						this.setIsLogin(false);
						this.$dialog.toast({
							mes: '退出成功！',
							timeout: 1500
						});
						this.getUserDetails();
//						this.chartLogout();
						this.isLogout = false;
          }else if(res.code == '666'){
            this.$dialog.toast({
							mes: res.msg,
							timeout: 1500
            })
            this.isLogout = false;
            this.getUserDetails();
            // this.$router.push("/login");
          }else {
						this.$dialog.toast({
							mes: res.msg,
							timeout: 1500
						})
					}
				})
			},
			logout() {
				this.isLogout = true;
			},
			goGame() {
				this.touristLogin({
					loginFrom: "3",
				}).then((res) => {
					if(res.code === 0) {
						this.setIsLogin(true);
						this.$router.push({
							name: "allKinds"
						})
//						this.cacheGamePlay()
						this.saveUserDetails(res.data);
					} else {
						this.$dialog.toast({
							mes: res.msg,
							timeout: 1000,
							// icon: 'success'
						});
						this.validationCode();
					}
				})
			},
//			cacheGamePlay() {
//				this.kind().then((res) => {
//					res.data.forEach((item1) => {
//						item1.kindList.forEach((item2) => {
//							this.getGamePlayList(`/${item1.classId}/${item2.kindId}`).then((res2) => {
//								sessionStorage.setItem(item2.kindId, JSON.stringify(res2.data.standGameList));
//								//  						this.saveStandGameList({standGameList:res2.data.standGameList,kindId:item2.kindId})
//							})
//						})
//					})
//				})
//			},
			// 小助手
			assisShow() {
				if(this.assis_tant == false) {
					this.assis_tant = true;
				} else {
					this.assis_tant = false;
				}
			},
			// 走马灯提示
			HorselightTips() {
				this.show1 = true;
			},
			load_App(){
				this.loadApp(false);
			}
    },
    watch:{
      $route(to, from) {
        if(from.name == 'login' && this.isLogin == true && this.userDetails.hierarchy != '0'){
          this._queryLoginInfo(1)
        }
      }
    }
	};
</script>

<style lang="less">
@font-face {
  font-family: iconfont;
  src: url(../../../static/font/fonts/font_p8f3pggq80aa714i.eot);
  src: url(../../../static/font/fonts/font_p8f3pggq80aa714i.eot)
      format("embedded-opentype"),
    url(../../../static/font/fonts/font_p8f3pggq80aa714i.woff) format("woff"),
    url(../../../static/font/fonts/font_p8f3pggq80aa714i.ttf) format("truetype"),
    url(../../../static/font/fonts/font_p8f3pggq80aa714i.svg) format("svg");
}

.home .content {
  text-align: left;
  padding: 0.2rem 0.3rem;
  font-size: 0.25rem;
  button {
    display: block;
    margin: 0.2rem auto;
    padding: 0.1rem 0.5rem;
    border: none;
    background-color: #1c86ff;
    color: #fff;
    border-radius: 3px;
  }
  .logout-btn {
    display: flex;
    button {
      width: 45%;
    }
    .cancle {
      background-color: #f8f8f8;
      border: 1px solid #cccccc;
      color: #606060;
    }
  }
}

.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  .top {
    height: 45px;
    .yd-navbar-center-box {
      width: 0 !important;
      margin-left: -15% !important;
    }
    .yd-navbar-item {
      flex: 0 0 70% !important;
    }
    .userList {
      float: right;
      height: 35px;
      max-width: 35%;
      font-size: 0.27rem;
      line-height: 35px;
      margin-left: 3px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      i {
        margin: 0 3px;
        font-size: 20px;
      }
      span{
        font-size: 0.27rem;
      }
    }
    .top_but {
      display: inline-block;
      padding: 0.05rem 0.075rem;
      border: 0;
      min-width: 45px;
      height: 32px;
      color: #fff;
      border-radius: 3px;
      font-size: 16px;
      margin-left: 5px;
    }
    .to_login {
      float: right;
      background: #03c50c;
    }
    .to_demo {
      float: right;
       background: #be3723;
    }
    .to_register {
      float: right;
     
      background: #fda81a;
    }
    .to_out {
      border: 1px solid #fff;
      line-height: 20px;
      // padding: 0.05rem;
      width: 50px;
      height: 28px;
      margin-top: 3px;
    }
    .fly_logo {
      padding-top: 5px;
      img {
        width: 100px;
        height: 30px;
      }
    }
  }
  .wrapper {
    position: relative;
    flex: 1;
    width: 100%;
    height: calc(100% - 2.2rem);
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .banner {
      height: 3rem;
      width: 100%;
      // background: url(../../../static/img/home/banner1.png);
      //   background-size: 100% 100%;
      .yd-slider {
        width: 100% !important;
        height: 100% !important;
        img {
          height: 100% !important;
        }
      }
    }
  }
  .bottom {
    height: 1.1rem;
  }
  .aAssis_tant {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    height: calc(100% - 1rem - 0px);
    z-index: 1001;
    /* background: #2dabf3; */
  }
  .list {
    border-top: 1px solid #d9dcdf;
    margin-top: 0.75rem;
    overflow: hidden;
    .txffc:before {
      font-family: iconfont;
      font-size: 0.9rem;
      vertical-align: bottom;
      text-align: center;
      display: block;
      line-height: 0.9rem;
      margin: 0 auto;
      width: 100%;
      content: "\E673";
      color: #0999ff;
    }
    .mlaft:before {
      font-family: iconfont;
      font-size: 0.9rem;
      vertical-align: bottom;
      text-align: center;
      display: block;
      line-height: 0.9rem;
      margin: 0 auto;
      width: 100%;
      content: "\E672";
      color: #0999ff;
    }
    li {
      float: left;
      width: 25%;
      height: 1.8rem;
      box-sizing: border-box;
      border-bottom: 1px solid #d9dcdf;
      border-right: 0.0625em solid #d9dcdf;
      padding: 0.1rem;
      padding-top: 0.25rem;
      position: relative;
      img {
        display: block;
        width: 0.9rem;
        height: 0.9rem;
        margin: 0 auto;
      }
      .hotGame {
        position: absolute;
        top: -0.05rem;
        right: 0rem;
        display: block;
        width: 0.7rem !important;
        height: 0.7rem !important;
        margin: 0 auto;
        z-index: 1;
      }
      p {
        width: 100%;
        text-align: center;
        padding-top: 0.1rem;
        font-size: 0.25rem;
      }
    }
    li:nth-child(4n) {
      border-right: 0;
    }
  }
  .tliet {
    position: absolute;
    top: 2.9rem;
    left: 2%;
    background-color: #fff;
    z-index: 100;
    height: 0.8rem;
    width: 95.5%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0.1rem 0.2rem;
    border: 1px solid #d9dcdf;
    border-radius: 0.2rem;
    box-shadow: 1px 1px 8px rgb(102, 102, 102);
    i {
      float: left;
      width: 8%;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.5rem;
    }
    .inner {
      width: 92% !important;
    }
    div {
      float: left;
      // width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      overflow: hidden;
      font-size: 0.28rem;
      p {
        width: 95%;
        height: 0.6rem;
        padding: 0;
        font-size: 0.28rem;
      }
    }
  }
  .lotteryTypes{
    padding: .2rem;
    ul{
      display:flex;
      justify-content:space-between;
      flex-wrap: wrap;
      li{
        width:49%;
        height:1.5rem;
        display: flex;
        align-items: center;
        background:#f1f2f4;
        border:1px solid #dddee0;
        box-shadow: 1px 1px #eee;
        padding: .1rem .1rem;
        margin-bottom: .2rem;
        border-radius: 5px;
        img{
          width: 1rem;
          height: 1rem;
        }
        section{
          display: flex;
          flex: 1;
          height: 1.1rem;
          flex-direction: column;
          justify-content: space-between;
          padding-left: .2rem;
          color: #323233;
          p{
          	text-align: center;
          	font-size: 0.3rem;
            // margin-bottom: .2rem
          }
          div{
          	text-align: center;
          	color: #2e69a9;
          	font-size: 0.24rem;
          }
        }
      }

    }
  }
  .lower {
    height: 1rem;
    width: 1.5rem;
    margin: 0 auto;
    line-height: 1rem;
    color: #888;
    font-size: 0.3rem;
  }
  .tips {
    height: 0.8rem;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #ccc;
    background: #f8f8f8;
    margin-bottom: 0.1rem;
  }
  .tips_text {
    text-align: center;
    height: 0.4rem;
  }
  .yd-popup-content {
    border-radius: 0.1rem !important;
    // padding: 0.1rem !important;
  }
  .loadApp {
    position: absolute;
    left: 0;
    bottom: 1rem;
    height: 50px;
    width: 100%;
    // background-color: #000;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    box-sizing: border-box;
    padding: 5px 0.2rem 5px 0.7rem;
    font-size: 0.25rem;
    div {
      float: left;
      color: #fff;
    }
    .imgLogo {
      width: 40px;
      height: 40px;
      background: url(../../../static/img/icon/loadAPP.png);
      background-size: contain;
      opacity: 1 !important;
    }
    .elplain {
      width: 62%;
      margin-left: 0.1rem;
      h1 {
        line-height: 20px;
      }
    }
    .butLoda {
      width: 20%;
      padding-top: 8px;
      button {
        color: #fff;
        background-color: #d72032;
        height: 24px;
        width: 100%;
        border: 0;
        line-height: 24px;
        border-radius: 3px;
      }
    }
    .loadAppCha {
      position: absolute;
      top: -15px;
      left: 5px;
      height: 27px;
      width: 25px;
      z-index: 2;
    }
  }
  .van-tabs__wrap{
  	height: 0.8rem !important;
  	
  	line-height:normal;
  	.van-tab{
  		padding-top: 0.05rem;
  		line-height: inherit;
  	}
  }
  .van-tab img{
  	opacity: 0.6;
  }
  .van-tab.van-tab--active img{
  	opacity: 1;
  }
  .van-tab .van-ellipsis{
  	font-size: 0.3rem;
  }
  .allkinds_indicator{
    left: 0;
    top: 5.3rem;
  }
  .tocenter{
    right: 1rem !important;
    bottom: 0.6rem !important;
  }
  .flyGuild_content_but{
        // display: block;
    margin: .2rem auto;
    padding: .1rem .5rem;
    border: none;
    background-color: #1c86ff;
    color: #fff;
    border-radius: 3px;
  }
  .toback{
    background: #d72032
  }
  .flyGuild_content h1{
    font-size: 0.35rem;
  }
  .flyGuild_content p{
    text-align: left;
    text-indent:0.4rem;
  }
}
</style>