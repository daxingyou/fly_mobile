<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive" class="_view"></router-view>

		<yd-popup v-model="show1" position="center" width="90%" class="app_model">
			<div style="background-color:#fff;">
				<h1 class="model_h">最新公告</h1>
				<p v-if="haveList == false" class="model_text">
					暂无公告信息！
				</p>
				<div style="color:#000;margin-top: 10px;" v-if="haveList == true" class="model_text ">
					<p class="model_text_list ">
						<p class="model_text_list_titel">{{MemberNoticeListA[0].title}}</p>
						<p class="model_text_list_time">{{MemberNoticeListA[0].lcd}}</p>
					</p>
					<p class="model_text_list model_text_content">{{MemberNoticeListA[0].content}}</p>
				</div>
				<p style="text-align: right;padding:0 0.6rem 0.2rem;">
					<yd-button @click.native="show1 = false">关闭</yd-button>
				</p>
				<div class="model_bot"></div>
			</div>
		</yd-popup>
		<!-- <div class="redEnvelopes" v-show="show2" >
					<div class="scroll-area">
						<div class="scroll">红包雨还有5秒到达战场</div>
            <div class="scroll_img" @click="show = false"></div>
					</div>
        <img src="../static/img/hongbaoyu1.gif" alt="" @click="toPush">
      </div> -->

	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";

	export default {
		name: "App",
		data() {
			return {
				transitionName: "_translate",
				// show:false,
				routerHistory: sessionStorage.getItem("routerHistory") ?
					sessionStorage.getItem("routerHistory").split(",") :
					[],
				timeoutObj: "",
				ws: "",
				imgUrl: "",
				show1: false,
				show2: false,
				MemberNoticeListA: [],
				haveList: false,
				// noList:false,
				// 外联登入参数
				Wurl: '',
				WuserName: "",
				Account: null,
				token: null,
				redEnvelopes: true,
			};
		},
		created() {
			//清除开奖数据缓存
			sessionStorage.setItem("gameInfo", null)
			// 判断开始地址
			const query = this.$route.query;
			console.log(query);
			if(query.length !== {}) {
				this.Account = query.account;
				this.token = query.username;
				this.setQueryAccout(query.account);
				// console.log( this.$route,this.Account,this.token,'6666')
				if(this.Account != undefined && this.token != undefined) {
					this._m52Login()
				}
			}
			// this._kindSum();
			this._getUserDetails();
			// console.log(this.chartsocket)
			// this.show = true;
			// this.queryMember();
			//userDetails为空重新请求
			// if (this.userDetails.length === 0) {
			//   this.getUserDetails();
			// }
			// this.imgUrl = Base64.encode('../../../static/img/home/home_content_Login_password_@2x.png');
			// console.log(this.imgUrl,'6666');
		},
		mounted() {
			//监听网页关闭  断开聊天websocket
			window.addEventListener("beforeunload", () => {
				//  sessionStorage.setItem("chartLogin",2);
				if(this.chartsocket !== "") {
					this.chartsocket.close();
				}
			});
			//浏览器标签页被隐藏或显示的时候会触发visibilitychange事件(针对手机息屏websocket断掉)
			document.addEventListener("visibilitychange", () => {
				this.chartsocket.close();
			});
		},
		computed: {
			...mapState("login", ["userDetails"]),
			...mapState(["isLogin",'queryAccout']),
			...mapState("chart", ["chartsocket"]),
			...mapState("bet", ["kindId", "lotteryList"])
		},
		methods: {
			// ...mapActions("bet", ["getGamePlayList"]),
			...mapActions("home", ["kind", 'queryMemberNoticeList', "kindSum"]),
			...mapMutations("bet", ["saveStandGameList", "setGamePlayList", "saveLotteryData","setModelType"]),
			...mapMutations(["sendMessage"]),
			...mapActions(["websocketLink"]),
			...mapActions("chart", [
				"callbackMessage",
				"readMessage",
				"queryMessage",
				"queryApplyRecord",
				"queryApplyRecordAll",
				"queryGroup"
			]),
			...mapMutations("chart", ["saveSocket", "throwMessage", 'setRedPacket']),
			...mapActions("login", ["getUserDetails", 'm52Login', 'getIp']),
			...mapMutations(["setIsLogin", "setWebsocketMsg",'setQueryAccout']),
			...mapMutations('login', [
				"saveUserDetails"
			]),

			_getUserDetails() {
				this.getUserDetails().then(res => {
					if(res.code == "666") {
						this.setIsLogin(false);
						// this.setIsLogin(true);
					} else {
						//        this.cacheGamePlay();
						this._kindSum();
						this.websoket_chat();
						this.setIsLogin(true);
						//						this.websoket()
						//						if(window.location.pathname == "/") {
						//							this.$router.push({
						//								path: "/home"
						//							})
						//						}
					}
					// this.show = true;
				});
			},
			// 外联登入
			_m52Login() {
				let that = this;
				// console.log(that.Wurl[1],that.Wurl[2])
				this.m52Login({
					"account": that.Account,
					"username": that.token,
				}).then(res => {
					// console.log(res,'666')
					if(res.code == 0) {
						const params = {
							"type": res.data.type,
							"loginWay": 3
						}
						sessionStorage.setItem('password',res.password)
						this.getIp(params);
						this.saveUserDetails(res.data);
						// sessionStorage.setItem('password', hex_md5(this.password));
						this.setIsLogin(true);
						//          this.cacheGamePlay();
						this._kindSum();
						// this.$router.push({
						// 	name: "allkinds"
						// })
						this.$router.push('/allkinds')
					} else if(res.code == 1) {
						this.$router.push('/singFail')
					}
				}).catch(err => {
					this.$router.push('/singFail')
				})
			},
			// 
			toPush() {
				this.$router.push('/redEnvelopedRain')
			},
			//    cacheGamePlay() {
			//				this.kind().then((res) => {
			//					res.data.forEach((item1) => {
			//						item1.kindList.forEach((item2) => {
			//							this.getGamePlayList(`/${item1.classId}/${item2.kindId}`).then((res2) => {
			//								if(item2.kindId==this.kindId){
			//									this.setGamePlayList([res2.data.standGameList[0]])
			//								}
			//								sessionStorage.setItem(item2.kindId, JSON.stringify(res2.data.standGameList));
			//								//  						this.saveStandGameList({standGameList:res2.data.standGameList,kindId:item2.kindId})
			//							})
			//						})
			//
			//					})
			//				})
			//    },
			_kindSum() {
				this.kindSum().then(res => {
					// console.log(res,'333')
					res.forEach((ret, index) => {
						// console.log(index,ret.name)
					})
					if(res.length == 0){
						this.kindSum()
					}
				})
			},
			websoket() {
				let URL_1;
				URL_1 = this.global.baseUrl;
				let accord = window.location.protocol;
				let str = "wss:";
				if(accord == "https:") {
					URL_1 = this.global.baseUrl.slice(6);
					str = "wss:";
				} else if(accord == "http:") {
					URL_1 = this.global.baseUrl.slice(5);
					str = "ws:";
				}
				var websocket = new ReconnectingWebSocket(
					encodeURI(str + URL_1 + "/notifys")
					//      encodeURI(str + URL_1 + "/notifys/" + this.userDetails.account)
				);
				// console.log(websocket,'77777')
				//				let websocket = new WebSocket(encodeURI(str + URL_1 + "/notify/" + this.userDetails.account));
				this.webSocket = websocket;
				websocket.onopen = function() {
					// console.log("连接成功");
				};
				websocket.onerror = function() {
					console.log("断开");
				};
				websocket.onclose = function() {
					console.log("退出成功");
				};

				websocket.onmessage = message => {
					// console.log(message,'00000000')
					this.sendMessage(message.data);
					let msg = JSON.parse(message.data);
					this.setWebsocketMsg(JSON.parse(message.data))
					if(msg.messageType === '2') {
						this.getUserDetails()
					} else if(msg.type === '4') {
						this.setWebsocketMsg(JSON.parse(message))
					} else if(msg.type === '5') {
						this.setWebsocketMsg(JSON.parse(message))
					}
					//  console.log(msg)
				};
			},
			//聊天室websocket连接
			websoket_chat() {
				this.websocketLink({
					url: this.global.chart_baseUrl,
					type: "/websocket/"
				}).then(socket => {
					//把socket存入全局变量
					this.saveSocket(socket);
					socket.onopen = () => {
						console.log("连接成功");
					};
					socket.onclose = () => {
						console.log("连接关闭");
						if(
							sessionStorage.getItem("chartLogin") === "1" &&
							this.chartsocket !== "" &&
							this.isLogin
						) {
							setTimeout(() => {
								this.websoket_chat();
							}, 2000);
						}
					};
					socket.onerror = e => {
						// this.$dialog.loading.open("正在连接网络...");
						// this.chartsocket.close();

					};
					socket.onmessage = message => {
						this.chat_onMessage(message);
					};
				});
			},

			//聊天消息监听
			chat_onMessage(message) {
				let messageData = JSON.parse(message.data);
				let messageType = JSON.parse(message.data).messageType;
				// console.log(messageData);
				if(messageType === "1" || messageType === "5" || messageType === '6') {
					this.callbackMessage(
						`/${messageData.id}/${messageData.singleOrGroup}`
					).then(res => {
						if(res.code === 0) {
							if(messageType === '6' && messageData.singleOrGroup === '1') {
								this.setRedPacket(messageData.content)
							}
							if(this.$route.name === "chartpage") {
								//判断若接收的信息来自正在聊天的对象，则标记已读同时展示
								if(
									this.$route.query.fromSource === messageData.fromSource &&
									this.$route.query.singleOrGroup === messageData.singleOrGroup
								) {
									this.readMessage(
										`/${messageData.fromSource}/${messageData.singleOrGroup}`
									).then(res => {
										if(res.code === 0) {
											this.throwMessage(messageData);
										}
									});
								}
							} else {
								this.queryMessage();
							}
						}
					});
				} else if(messageType === "2") {
					this.queryApplyRecord();
					this.queryApplyRecordAll();
				} else if(messageType === "3") {
					//加群成功
					this.queryGroup();
				}
			},
			//弹跳公告
			queryMember() {
				let that = this;
				// '?notice_type=2&type=1'
				this.queryMemberNoticeList('?notice_type=2&type=1').then(res => {
					// console.log('aaa')
					if(res.code == 0) {
						that.show1 = false;
						that.MemberNoticeListA = res.data;
						if(that.MemberNoticeListA.length == 0) {
							that.haveList = false;
						} else if(that.MemberNoticeListA.length != 0) {
							that.haveList = true;
						}
					}
				});
				// console.log(that.MemberNoticeListA,'aaa')
			},
		},

		watch: {
			isLogin() {
				if(this.isLogin) {
					this.websoket();
				} else {
					this.webSocket.close()
				}
			},
			//路由切换动画
			$route(to, from) {
				// console.log(this.$route.path)
				//记录当前路由路径
				this.routerHistory.push(from.path);
				sessionStorage.setItem("routerHistory", this.routerHistory);
				let routes = Array.of(
					"/home",
					"/homeRecharge",
					"/redPacket",
					"/personal",
					"/allKinds"
				);
				//禁止底部导航动画
				if(routes.includes(from.path) && routes.includes(to.path)) {
					this.transitionName = "";
				} else {
					if(this.routerHistory.includes(to.path)) {
						let index = this.routerHistory.findIndex((item, index) => {
							return Object.is(item, to.path);
						});
						//从数组中删除整个已经跳转的路径并执行反向动画
						this.routerHistory.splice(index);
						sessionStorage.setItem("routerHistory", this.routerHistory);
						this.transitionName = "_translate";
					} else {
						let _index = this.routerHistory.findIndex((item, index) => {
							return Object.is(item, "/accountBill");
						});
						if(
							from.path === "/recharge/companyIncome" &&
							to.path === "/homeRecharge"
						) {
							this.routerHistory.splice(_index);
							sessionStorage.setItem("routerHistory", this.routerHistory);
							this.transitionName = "_translate";
						} else {
							this.transitionName = "translate";
						}
					}
				}
				//进入聊天室连上websocket
				if(from.path === "/login" && to.path === "/allKinds") {

					if(this.isLogin) {
						this.websoket_chat();
						this.queryMember();
						this.show2 = true;
					}
				}
				if(from.matched[0].path === '/chartroom' && to.path === '/home') {
					clearInterval(this.global._timer);
					this.global._timer = undefined;
				}
				if(to.path == '/home' || to.path == '/homeRecharge' || to.path == '/redPacket' || to.path == '/allKinds') {
					this.show2 = true;
				} else {
					this.show2 = false;
				}
				if(this.isLogin == false && (this.$route.path == '/award'||this.$route.path == '/noterecord' || this.$route.path == '/home' )){
					this.$dialog.toast({
                    mes: '未登录！',
                    timeout: 1500
                });
				}
			},
			// 监听彩种变化清空购彩蓝
			kindId() {
				this.saveLotteryData([])
			},
			
			// redEnvelopes(){
			//   if(this.redEnvelopes == false){
			//     this.show2 = false;
			//   }else if(this.redEnvelopes == true){
			//     this.show2 = true;
			//   }
			// }
		}
	};
</script>

<style>
	._view {
		width: 100%;
		position: absolute;
	}
	/* 从右往左动画   前进 */
	
	.translate-enter {
		transform: translate3d(100%, 0, 0);
	}
	
	.translate-enter-to,
	.translate-leave {
		transform: translate3d(0, 0, 0);
	}
	
	.translate-leave-to {
		transform: translate3d(-100%, 0, 0);
	}
	
	.translate-enter-active,
	.translate-leave-active {
		transition: transform 0.4s;
	}
	/* 从左往右动画   后退 */
	
	._translate-enter {
		transform: translate3d(-100%, 0, 0);
	}
	
	._translate-enter-to,
	._translate-leave {
		transform: translate3d(0, 0, 0);
	}
	
	._translate-leave-to {
		transform: translate3d(100%, 0, 0);
	}
	
	._translate-enter-active,
	._translate-leave-active {
		transition: transform 0.4s;
	}
	
	.model_h {
		height: 0.6rem;
		line-height: 0.6rem;
		width: 100%;
		color: black;
		text-align: center;
		border-bottom: 1px solid #c1c1c1;
	}
	
	.model_bot {
		/* width: 100%; */
		/* margin-top: 0.2rem; */
		height: 0.3rem;
		border-top: 1px solid #c1c1c1;
	}
	
	.model_text {
		width: 100%;
		box-sizing: border-box;
		min-height: 1rem;
		padding: 0.2rem 0.5rem;
	}
	
	.app_model>.yd-popup-center {
		border-radius: 0.1rem;
	}
	
	.model_text_list {
		height: auto;
		line-height: 0.5rem;
	}
	
	.model_text_list_time {
		/*float: right;*/
	}
	
	.model_text_list_titel {
		/*float: left;*/
	}
	
	.model_text_content {
		min-height: 1.5rem;
		overflow: auto;
		width: 100%;
		box-sizing: border-box;
		border: 1px solid #c1c1c1;
		padding: .1rem;
	}
	
	.app_model.yd-popup-center {
		border-radius: 3px;
	}
	
	.redEnvelopes {
		position: fixed;
		top: 3rem;
		left: 50%;
		width: 5rem;
		margin-left: -2.5rem;
	}
	
	.redEnvelopes img {
		width: 5rem;
	}
	
	.redEnvelopes .scroll-area {
		height: 0.6rem;
		width: 100%;
		color: #fff;
		text-align: center;
		position: relative;
	}
	
	.redEnvelopes .scroll {
		line-height: 0.6rem;
		width: 100%;
		white-space: nowrap;
		text-align: center;
	}
	
	.redEnvelopes .scroll_img {
		position: absolute;
		top: 0;
		right: 0;
		height: 0.6rem;
		width: 0.6rem;
		background: url('../static/img/home/cha.png');
		background-size: contain;
	}
	
	.yd-navbar {
		background: linear-gradient(135deg, rgba(19, 46, 123, 1) 0, rgba(0, 201, 202, 1) 100%) !important;
	}
</style>