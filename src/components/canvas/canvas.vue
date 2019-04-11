<template>
	<div style="overflow: hidden;width: 100%;height: 100%;" class="game">
		<img ref="code" src="./codeGroup.png" style="display: none;" />
		<Loading v-if="isLoad" v-stopSlide></Loading>
		<div ref="bdVaJa" class="sc-bdVaJa bdUauP" v-stopSlide>
			<div class="result-wrapper">
				<div class="top-bar">
					<div class="serial">
						<h3><span>第</span>{{currentPeriod.slice(4,12)}}<span>期</span></h3>
					</div>
					<transition-group name="list-complete" tag="p" class="num-group">
						<span :class="'num-item num-'+item*1" v-for="item in lotteryNumbers" v-bind:key="item*1" class="list-complete-item">
                                  {{ item*1 }}
                            </span>
					</transition-group>
				</div>
			</div>
		</div>
		<div ref="bwzfXH" :class="'sc-bwzfXH '+gameType" v-stopSlide>
			<div class="sc-EHOje erRpOn" :style="{transform:lotteryTrend?'translateX(0px)':'translateX(-100%)'}">
				<h1 class="panel-title">开奖走势</h1>
				<div class="panel-result">
					<div class="player-result">
						<div class="player-label">闲一</div>
						<div :class="['result-ball',item.x1.isWin?'win':'lose'] " v-for="(item,index) in lotteryTrendList"></div>
					</div>
					<div class="player-result">
						<div class="player-label">闲二</div>
						<div :class="['result-ball',item.x2.isWin?'win':'lose'] " v-for="(item,index) in lotteryTrendList"></div>
					</div>
					<div class="player-result">
						<div class="player-label">闲三</div>
						<div :class="['result-ball',item.x3.isWin?'win':'lose'] " v-for="(item,index) in lotteryTrendList"></div>
					</div>
					<div class="player-result">
						<div class="player-label">闲四</div>
						<div :class="['result-ball',item.x4.isWin?'win':'lose'] " v-for="(item,index) in lotteryTrendList"></div>
					</div>
					<div class="player-result">
						<div class="player-label">闲五</div>
						<div :class="['result-ball',item.x5.isWin?'win':'lose'] " v-for="(item,index) in lotteryTrendList"></div>
					</div>
					<div class="current-star"></div>
				</div>
				<div class="panel-switch"></div>
			</div>
			<div class="sc-ifAKCX gwhJYS">
				<div class="left-bar" @click="lotteryTrend=!lotteryTrend">
					<div class="tag">
						<div>一</div>
						<div>99</div>
					</div>
					<div class="tag">
						<div>二</div>
						<div>104</div>
					</div>
					<div class="tag">
						<div>三</div>
						<div>109</div>
					</div>
					<div class="tag">
						<div>四</div>
						<div>97</div>
					</div>
					<div class="tag">
						<div>五</div>
						<div>104</div>
					</div>
				</div>
			</div>
			<div class="right-bar"><button @click="toHistoryRecord" class="history-toggle-btn">历<br>史<br>记<br>录</button></div>
		
			<div class="top-bar">
				<div>庄家</div>
			</div>
			<div class="sc-htpNat hRKddM" :class="[gameResult.z.isWin&&active?'win':'','type'+gameResult.z.type]">
				<div class="sc-bxivhb card" v-for="item in lotteryGroup[0]" :style="{backgroundPositionX: 'calc('+((item.suitType-1)/3)*100+'%)',backgroundPositionY: 'calc('+((item.num-1)/12)*100+'%)'}" v-if="active" id="card_0" size="15"></div>
				<span class="game-info" v-if="active"></span>
			</div>
		</div>
		<div @touchstart ="createChip" ref="canbg" class="sc-gzVnrw chJYCc" v-stopSlide>
			<div class="canvas-bg"  ></div>
			<canvas ref="regionLine" :style="{width:stageWidth+'px',height:stageHeight+'px'}" :width="stageWidth*2" :height="stageHeight*2" style="touch-action: none; cursor: inherit;"></canvas>
			<canvas id="confirmedCoins" :style="{width:stageWidth+'px',height:stageHeight+'px'}" :width="stageWidth*2" :height="stageHeight*2"></canvas>
			<canvas ref="tempCanvas"  id="tempCanvas" :style="{width:stageWidth+'px',height:stageHeight+'px'}" :width="stageWidth*2" :height="stageHeight*2"></canvas>
			<canvas :width="stageWidth*2" :height="stageHeight*2" style="touch-action: none; cursor: inherit;"></canvas>
			<div class="sc-htoDjs eonsKP">
				<!--闲一区域-->
				<div class="sc-dnqmqq kQdINE" :style="{height:stageHeight*3/7+'px'}" :class="[gameResult.x1.isWin&&active?'win':'','type'+gameResult.x1.type]">
					<div class="sc-htpNat iotgEl">
						<div class="sc-bxivhb card" v-for="item in lotteryGroup[1]" :style="{backgroundPositionX: 'calc('+((item.suitType-1)/3)*100+'%)',backgroundPositionY: 'calc('+((item.num-1)/12)*100+'%)'}" v-if="active" id="card_0" size="12"></div>
						<span v-if="active" class="game-info"></span>
					</div>
					<span class="count" v-show="orderList['x1'].amount" :style="{left:stageWidth*1/4+'px',top:stageHeight*3/7+'px'}">{{orderList['x1'].amount}}</span>
 				</div>
				<!--闲二区域-->
				<div class="sc-dnqmqq kQdINE" :style="{height:stageHeight*3/7+'px'}" :class="[gameResult.x2.isWin&&active?'win':'','type'+gameResult.x2.type]">
					<div class="sc-htpNat iotgEl">
						<div class="sc-bxivhb card" v-for="item in lotteryGroup[2]" :style="{backgroundPositionX: 'calc('+((item.suitType-1)/3)*100+'%)',backgroundPositionY: 'calc('+((item.num-1)/12)*100+'%)'}" v-if="active" id="card_0" size="12"></div>
						<span v-if="active" class="game-info"></span>
					</div>
					<span class="count" v-show="orderList['x2'].amount" :style="{left:stageWidth*1/4+'px',top:stageHeight*3/7+'px'}">{{orderList['x2'].amount}}</span>
				</div>
				<!--闲三区域-->
				<div class="sc-dnqmqq ghLcAJ" :style="{height:stageHeight*4/7+'px'}" :class="[gameResult.x3.isWin&&active?'win':'','type'+gameResult.x3.type]">
					<div class="sc-htpNat iotgEl">
						<div class="sc-bxivhb card" v-for="item in lotteryGroup[3]" :style="{backgroundPositionX: 'calc('+((item.suitType-1)/3)*100+'%)',backgroundPositionY: 'calc('+((item.num-1)/12)*100+'%)'}" v-if="active" id="card_0" size="12"></div>
						<span v-if="active" class="game-info"></span>
					</div>
					<span class="count" v-show="orderList['x3'].amount" :style="{left:stageWidth*1/6+'px',top:stageHeight*4/7+'px'}">{{orderList['x3'].amount}}</span>
				</div>
				<!--闲四区域-->
				<div class="sc-dnqmqq ghLcAJ" :style="{height:stageHeight*4/7+'px'}" :class="[gameResult.x4.isWin&&active?'win':'','type'+gameResult.x4.type]">
					<div class="sc-htpNat iotgEl">
						<div class="sc-bxivhb card" v-for="item in lotteryGroup[4]" :style="{backgroundPositionX: 'calc('+((item.suitType-1)/3)*100+'%)',backgroundPositionY: 'calc('+((item.num-1)/12)*100+'%)'}" v-if="active" id="card_0" size="12"></div>
						<span v-if="active" class="game-info"></span>
					</div>
					<span class="count" v-show="orderList['x4'].amount" :style="{left:stageWidth*1/6+'px',top:stageHeight*4/7+'px'}">{{orderList['x4'].amount}}</span>
				</div>
				<!--闲五区域-->
				<div class="sc-dnqmqq ghLcAJ" :style="{height:stageHeight*4/7+'px'}" :class="[gameResult.x5.isWin&&active?'win':'','type'+gameResult.x5.type]">
					<div class="sc-htpNat iotgEl">
						<div class="sc-bxivhb card" v-for="item in lotteryGroup[5]" :style="{backgroundPositionX: 'calc('+((item.suitType-1)/3)*100+'%)',backgroundPositionY: 'calc('+((item.num-1)/12)*100+'%)'}" v-if="active" id="card_0" size="12"></div>
						<span v-if="active" class="game-info"></span>
					</div>
					<span class="count" v-show="orderList['x5'].amount" :style="{left:stageWidth*1/6+'px',top:stageHeight*4/7+'px'}">{{orderList['x5'].amount}}</span>
				</div>
			</div>
			<div class="sc-bZQynM bpwjfY">
				<img class="bg" src="./dh.png" />
				<div class="info-text" v-if="!isBet">
					<p >第{{ awarPeriod.slice(4,12) }}期</p>
					<p><span>距{{text}}时间</span>
				<!--<span>距{{awarPeriod.slice(4,12)+text}}时间</span>-->
					<Countdown :callback="timeEnd" :currentTime="currentTime" :nextTime="nextTime" v-if="nextTime&&currentTime" ></Countdown>
					</p>
				</div>
				<div class="info-text closed" v-else>
					<p>第{{ awarPeriod.slice(4,12) }}期</p>
					<p>开奖中</p>
				</div>
				<div class="button-wrapper button-wrapper-left">
					<div :class="['button','button-square','button-oddFbRate',gameType=='nnd'?'on':'']" @touchend="switchGameType"><span>{{gameType=='nnd'?'翻倍':'平倍'}}</span></div>
					<div class="button button-square button-oddFbRate" @touchend="showOdds"><span>赔率</span></div>
				</div>
				<div class="button-wrapper button-wrapper-right">
					<div class="button button-circle button-sound" :class="{on:sound}" @touchend="setSound">
						<div class="icon"></div>
					</div>
					<div class="button button-circle button-construction" @touchend="showHelp=true">
						<div class="icon"></div>
					</div>
				</div>
			</div>
			<div :class="['notice',showNotice]" style="z-index: 1000;color: #ffc003;font-size:8vw"><span>{{noticeTxt}}</span></div>
		</div>
		<Help v-if="showHelp" @closeHelp="showHelp=false"></Help>
			<historyRecord @cancle="recordShow=false"  v-if="recordShow"></historyRecord>
		<div ref="footer" v-stopSlide>
			<div class="sc-kpOJdX gUjAGe">
				<div class="tag"></div>
				<!--<div class="round">
					<div></div>
				</div>-->
				<div class="bg"><img src="./dh2.png" alt=""></div><span class="bet-amount total">{{userDetails.accountBalance}}</span><span class="bet-amount token">{{cost}}</span>
				<div class="button-wrapper"><button class="btn confirm" :class="[cost>0&&!isBet?'':'btn-disabled']" @click="getBetList">确定</button><button :class="[cost>0?'':'btn-disabled']" class="btn cancel" @click="cancel">取消</button></div>
			</div>
			<div class="sc-dxgOiQ fGVsvB">
				<button :class="['coin-sprite','coin-sprite-'+item,activeCode===item?'selected':'not-selected']" v-for="item in amounts" @click="selectActiveCode(item)"></button>
			</div>
		</div>
		<div class="sc-1x8gtp-2 bCYyPR" @click="$router.push({path:'/allKinds'})">返回 大厅
		</div>
		<transition name="fade">
			<div class="sc-ckVGcZ uazon successfully" style="z-index: 1000;" v-if="resModal">
				<div class="modal">
					<div class="panel">
						<p class="message">{{resMsg}}</p>
						<div class="button-wrapper"><button :class="['btn',isOk?'confirm':'cancel']" @click="resModal=false">确定</button></div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="sc-ckVGcZ uazon" v-if="showModal">
				<div class="modal">
					<div class="title"><span class="icon"></span><span>确认下注单</span></div>
					<div class="form">
						<table>
							<tbody>
								<tr>
									<th><span>操作</span></th>
									<th><span>玩法</span></th>
									<th><span>金额</span></th>
									<th><span>冻结</span></th>
								</tr>
								<tr v-for="(item,index) in betParams.orderList">
									<td><label class="checkbox"><input type="checkbox" @change="selectOrder" v-model="item.checked"><span class="checkmark"></span></label></td>
									<td style="color: rgb(4, 186, 238);">{{item.lotteryNum+'('+(item.orderNum==1?'平倍':'翻倍')+')'}}</td>
									<td><span class="bet-value ">{{item.totalAmount/item.orderNum}}</span></td>
									<td><span>{{item.orderNum==1?'0.0':(item.totalAmount/item.orderNum)*4}}</span></td>
								</tr>
								<tr>
									<td></td>
									<td style="color: white;">总金额:</td>
									<td><span class="bet-value">{{gameType=='nns'?betParams.cost:betParams.cost/5}}</span></td>
									<td><span>{{gameType=='nns'?'0.0':(betParams.cost*4)/5}}</span></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="panel">
						<div class="button-wrapper"><button class="btn confirm" :class="{'btn-disabled':disabled}"  @click="confirmBet">确定</button><button class="btn cancel " @click="showModal=false">取消</button></div>
					</div><button class="close-modal" @click="showModal=false"></button></div>
			</div>
		</transition>
		<transition name="fade">
			<Odds v-if="showOdd" @close="showOdd=false" :gameType="gameType" :kindId="kindId"></Odds>
		</transition>
		<audio ref="audioBgm" src="../../../static/audio/bgm.mp3" v-show="false" loop></audio>
		<audio ref="audioClick1" v-show="false" src="../../../static/audio/click3.mp3"></audio>
		<audio ref="audioClick2" v-show="false" src="../../../static/audio/click2.mp3"></audio>
		<audio ref="audioKsxz" v-show="false" src="../../../static/audio/ksxz.mp3"></audio>
		<audio ref="audioTzxz" v-show="false" src="../../../static/audio/tzxz.mp3"></audio>
	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import { ImgCreateChip, CreateRegionLine, config } from "./create.js"
	import Countdown from "./child/countdown.vue"
	import Help from "./child/help.vue"
	import Loading from "./child/loading.vue"
	import Odds from "./child/odd.vue"
	import historyRecord from './child/historyRecord.vue'
	export default {
		components: {
			Countdown,
			Help,
			Loading,
			Odds,
			historyRecord
		},
		data() {
			return {
				amounts: ['10', '50', '100', '500', '1000', '5000', '10000'],
				items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				nextNum: 10,
				activeCode: '',
				stageWidth: 7.5,
				stageHeight: 6.2,
				currentPeriod:'',
				chipTarget: null, //当前筹码对象
				chipRadius: 0,
				lotteryGroup: [],
				regionLine: null,
				lotteryNumbers: [],
				currentTime: 0,
				nextTime: 0,
				awarPeriod: '',
				clickId: '', //当前点击区域id
				gameType: "nns", //游戏玩法nns--平倍 nnd--翻倍
				text: '封盘',
				noticeTxt: '停止下注',
				showNotice: '',
				showOdd: false,
				orderList: {
					x1: {
						amount: 0
					},
					x2: {
						amount: 0
					},
					x3: {
						amount: 0
					},
					x4: {
						amount: 0
					},
					x5: {
						amount: 0
					}
				},
				gameResult: {
					z: {},
					x1: {},
					x2: {},
					x3: {},
					x4: {},
					x5: {}
				},
				names: {
					x1: "闲一",
					x2: "闲二",
					x3: "闲三",
					x4: "闲四",
					x5: "闲五"
				},
				active: false,
				timer: null,
				timeout1: null,
				timeout2: null,
				showModal: false,
				isBet: false, //是否已经封盘
				isFirst: true, //是否初次进入游戏
				isFirstClick: true,
				betList: [],
				kindId: 'klft',
				subGameId: '',
				betParams: {
					baseLotteryId: '',
					cost: 0,
					orderFrom: '3',
					orderType: '0',
					periodNo: '',
					orderList: []
				},
				resModal: false, //投注结果弹窗
				resMsg: '',
				isOk: false, //是否成功投注
				sound: true, //是否开启音乐
				showHelp: false, //游戏规则弹窗
				isLoad: true, //加载动画
				lotteryTrend: false,
				lotteryTrendList: [],
				disabled:false,//按钮禁止连续点击
				recordShow:false
			}

		},
		computed: {
			...mapState('login', [
				'userDetails'
			]),

			...mapState(["msg"]),
			//下注总金额
			cost() {
				return this.objReduce(this.orderList, 'amount')
			}
		},
		mounted() {
			//			this.getNumResult([4,1,2,3,6]);
			this.$nextTick(() => {
				let vw = document.body.clientWidth / 100;
				this.stageWidth = document.body.clientWidth;
				this.stageHeight = document.body.clientHeight - this.$refs.bdVaJa.offsetHeight - this.$refs.bwzfXH.offsetHeight - this.$refs.footer.offsetHeight - 5 * vw;
				setTimeout(() => {
					this.init();
				}, 200)

			})

		},
		methods: {
			...mapActions('canvas', [
				'getWinsDragon'
			]),
			...mapActions('login', [
				"getUserDetails"
			]),
			...mapActions('bet', [
				'quickBet',
				'getSubGames'
			]),
			init() {
				this.getLotteryDetails();
				this.chipRadius = this.rem2px(1);
				this.regionLine = new CreateRegionLine(this.$refs.regionLine, this.stageWidth, this.stageHeight, 1);
			},
			//获取开奖详情
			getLotteryDetails() {
				
				this.getWinsDragon(`/${this.kindId}`).then((res) => {
					if(res.data.winList[1].awardNum) {
						
						this.lotteryNumbers = res.data.winList[1].awardNum.split(",");
						this.lotteryGroup = this.createDyadicArray(this.lotteryNumbers);
						this.gameResult = this.getGameResult(this.lotteryNumbers);
						console.log(this.gameResult);
						this.currentTime = moment(res.data.currentTime).valueOf();
						this.nextTime = moment(res.data.nextTime).valueOf();
						if(!this.isFirst) {
							this.active = true;
							//清除随机变动号码位置定时器
							clearInterval(this.timer)
							setTimeout(() => {
								this.currentPeriod = res.data.winList[1].awarPeriod;
								this.awarPeriod = res.data.winList[0].awarPeriod;
								this.currentTime = this.currentTime + 8000;
								this.active = false;
								this.noticeTxt = "开始下注"
								this.showMsg()
								this.isBet = false;
								if(this.sound) {
									this.$refs.audioKsxz.currentTime = 0;
									this.$refs.audioKsxz.play();
								}
							}, 8000)
						} else {
							this.awarPeriod = res.data.winList[0].awarPeriod;
							this.currentPeriod = res.data.winList[1].awarPeriod;
						}

					} else {
						clearInterval(this.timer)
						this.isBet = true;
						this.awarPeriod = res.data.winList[1].awarPeriod;
						this.currentPeriod = res.data.winList[1].awarPeriod;
						this.lotteryNumbers = _.shuffle(this.items)
						this.timer = setInterval(() => {
							this.lotteryNumbers = _.shuffle(this.items)
						}, 3000)
						this.active = false;

					}
					this.isFirst = false;
					this.isLoad = false;
					this.getLotteryTrendList(res.data.winList)
				})
			},
			//设置声音
			setSound() {
				this.sound = !this.sound;

				if(this.sound) {
					this.$refs.audioBgm.play()
					this.$refs.audioTzxz.play();
					this.$refs.audioTzxz.pause();
					this.$refs.audioKsxz.play();
					this.$refs.audioKsxz.pause();
				} else {
					this.$refs.audioBgm.pause()
					this.$refs.audioTzxz.pause();
					this.$refs.audioKsxz.pause();
				}
			},
			//选择筹码大小
			selectActiveCode(item) {
				//首次点击开启声音源
				if(this.isFirstClick) {
					if(this.sound) {
						this.$refs.audioBgm.play()
						this.$refs.audioTzxz.play();
						this.$refs.audioTzxz.pause();
						this.$refs.audioKsxz.play();
						this.$refs.audioKsxz.pause();
					} else {
						this.$refs.audioBgm.pause()
						this.$refs.audioTzxz.pause();
						this.$refs.audioKsxz.pause();
					}
				}

				if(this.sound) {
					this.$refs.audioClick1.currentTime = 0;
					this.$refs.audioClick1.play();
				}
				this.isFirstClick = false;
				this.activeCode != item ? this.activeCode = item : this.activeCode = '';
			},
			//添加筹码
			createChip(e) {
				
				//没有选择筹码或已经封盘，阻止点击
				if(this.activeCode == "" || this.isBet) {
					if(this.activeCode == "") {
						return
					}
					
					//封盘弹出提示
					if(this.isBet) {
						clearInterval(this.timeout1)
				        clearInterval(this.timeout2)
						this.showMsg()
					}
					return
				}
				
				let event = typeof window.event != "undefined" ? window.event : typeof e != "undefined" ? e : event;
				
				//获取点击坐标
				let startDot = {
					x: event.changedTouches[0].clientX - this.$refs.canbg.offsetLeft,
					y: event.changedTouches[0].clientY - this.$refs.canbg.offsetTop,
				}
				startDot = this.testPosition(startDot.x*2, startDot.y*2);
				if(!startDot) {
					return
				}
				if(this.chipTarget) {
					this.chipTarget.endAnimation();
					this.chipTarget = null;
				}

				this.chipTarget = new ImgCreateChip(this.$refs.tempCanvas, this.$refs.code, this.activeCode, startDot.x, startDot.y, this.rem2px(1), this.rem2px(2));
				//添加筹码
				this.chipTarget.animateDraw();
				this.createdOrderList(this.clickId, this.activeCode);
				if(this.sound) {
					this.$refs.audioClick2.currentTime = 0;
					this.$refs.audioClick2.play();
				}
				

			},
			//显示提示弹窗
			showMsg() {
				this.showNotice = 'noticeIn';
				this.timeout1 = setTimeout(() => {
					this.showNotice = 'noticeOut';
					this.timeout2 = setTimeout(() => {
						this.showNotice = '';
					}, 760)
				}, 2000)
			},
			//检测点击区域，并对压线筹码坐标校正
			testPosition: function(x, y) {
 				if(y<0||y>this.stageHeight*2){
					return false
				}
				for(var key in config) {
					let buf = config[key];
					if(x >= buf.x && x <= buf.x + buf.width && y >= buf.y && y <= buf.y + buf.height) {
						if((x + this.chipRadius / 2) >= (buf.x + buf.width)) {
							return false
						}
						if((x - this.chipRadius / 2) <= buf.x) {
							return false
						}
						if((y + this.chipRadius / 2) >= (buf.y + buf.height)) {
							return false
						}
						if((y - this.chipRadius / 2) <= buf.y) {
							return false
						}
						this.clickId = key
					}
				}
				return {
					x: x,
					y: y
				}
			},
			//添加金额注单
			createdOrderList(clickId, activeCode) {
				this.orderList[clickId].amount += activeCode * 1;
			},
			//取消注单,清除画布，重新计算金额
			cancel() {
				this.chipTarget.clearContext();
				this.orderList = {
					x1: {
						amount: 0
					},
					x2: {
						amount: 0
					},
					x3: {
						amount: 0
					},
					x4: {
						amount: 0
					},
					x5: {
						amount: 0
					}
				};
				this.chipTarget = null;
			},
			//展示赔率
			showOdds() {
				this.showOdd = true;
			},
			//改变游戏模式，平倍或翻倍
			switchGameType() {
				if(this.gameType == 'nnd') {
					this.gameType = 'nns'
				} else {
					this.gameType = 'nnd'
				}
			},
			//倒计时为零的回调
			timeEnd() {
				this.currentPeriod = this.awarPeriod;
				this.isBet = true;
				this.lotteryNumbers = _.shuffle(this.items)
				this.timer = setInterval(() => {
					this.lotteryNumbers = _.shuffle(this.items)
				}, 3000)
				this.noticeTxt = "停止下注"
				this.showMsg()
				if(this.sound) {
					this.$refs.audioTzxz.currentTime = 0;
					this.$refs.audioTzxz.play();
				}
			},
			getCardType(num) {
				console.log(num)
				//判断牛几 -1代表无牛 10代表牛牛 其他数字代表牛几
				let cardsTotal = 0; //cow表示牛，cardsTotal表示数字总和
				let hasTen = false; //表示有没有 10
				let cow = -1; //默认没有牛
				num = num.sort(); //排序
				num = num.map((value) => {
					return parseInt(value);
				})
				let card = new Array(5);
				for(let i = 0; i < num.length; i++) {
					if(num[i] >= 10) {
						hasTen = true;
					}
					card[i] = num[4 - i]; //倒序
					cardsTotal += card[i]; //计算五个数字总和
				}
				//根据有没有 10 分情况讨论
				if(hasTen) {
					//有10的情况下 剩余四个数里有2个之和为10 或者 3个之和能被10整除
					for(let i = 1; i < 4; i++) {
						for(let j = i + 1; j < 5; j++) {
							if(card[i] + card[j] == 10 || (cardsTotal - 10 - card[i]) % 10 == 0 || (cardsTotal - 10 - card[j]) % 10 == 0) {
								cow = (cardsTotal - 10) % 10;
							}
						}
					}
				} else {
					//没有10的情况下 有三个数之和能被10整除
					for(let i = 0; i < 4; i++) {
						for(let j = i + 1; j < 5; j++) {
							if((cardsTotal - card[i] - card[j]) % 10 == 0) {
								cow = (card[i] + card[j]) % 10;
							}
						}
					}
				}
				//转换将牛牛变为10
				if(cow == 0) {
					cow = 10;
				}
				//转换将无牛变为0
				if(cow == -1) {
					cow = 0;
				}
				return cow;
			},
			//打开投注注单弹窗
			getBetList() {
				this.betParams.baseLotteryId = this.kindId;
				this.betParams.cost = 0;
				this.betParams.periodNo = this.awarPeriod;
				this.betParams.orderList = [];
				for(let key in this.orderList) {
					if(this.orderList[key].amount !== 0) {
						let obj = {};
						obj.checked = true;
						obj.lotteryNum = this.names[key];
						obj.orderNum = this.gameType == 'nns' ? 1 : 5;
						obj.periodNo = this.awarPeriod;
						obj.subGameId = this.gameType;
						obj.totalAmount = this.gameType == 'nns' ? this.orderList[key].amount : this.orderList[key].amount * 5;
						this.betParams.cost += obj.totalAmount;
						obj.unitPrice = this.orderList[key].amount;
						this.betParams.orderList.push(obj)
					}
				}
				this.showModal = true;
			},
			//提交注单投注
			confirmBet() {
				let orderList = [];
				let betParams = JSON.stringify(this.betParams);

				betParams = JSON.parse(betParams);

				for(let i = 0; i < betParams.orderList.length; i++) {
					let item = betParams.orderList[i]
					betParams.periodNo = this.awarPeriod;
					if(item.checked) {
						orderList.push(item)
					}
				}
				betParams.orderList = orderList;
				if(betParams.orderList.length === 0) {
					this.resMsg = '请至少选择一注'
					this.resModal = true;
					setTimeout(() => {
						this.resModal = false;
					}, 3000)
					return
				}
				this.disabled = true;
				this.quickBet(betParams).then((res) => {
					this.disabled = false;
					if(res.code == 0) {
						this.resMsg = '下注成功'
						this.showModal = false;
						this.resModal = true;
						this.isOk = true;
						this.initialization()
						this.getUserDetails();
						setTimeout(() => {
							this.resModal = false;
						}, 3000)
					} else {
						this.isOk = false;
						this.resModal = true;
						this.resMsg = res.msg;
						setTimeout(() => {
							this.resModal = false;
						}, 3000)
					}

				})
			},
			//初始化参数
			initialization() {
				this.betParams = {
					baseLotteryId: this.kindId,
					cost: 0,
					orderFrom: '3',
					orderType: '0',
					periodNo: '',
					orderList: []
				};
				this.betList = [];
				this.cancel();
				this.gameResult = {
					z: {},
					x1: {},
					x2: {},
					x3: {},
					x4: {},
					x5: {}
				};
			},
			selectOrder() {
				this.betParams.cost = 0
				for(let i = 0; i < this.betParams.orderList.length; i++) {
					let item = this.betParams.orderList[i]
					if(item.checked) {
						this.betParams.cost += item.totalAmount;
					}
				}
				//				this.$set(this.betParams,'cost',cost)
			},
			//获取开奖走势输赢
			getLotteryTrendList(winList) {
				this.lotteryTrendList = []
				for(let i = 0; i < winList.length; i++) {
					if(winList[i].awardNum) {
						this.lotteryTrendList.push(this.getGameResult(winList[i].awardNum.split(",")))
					}
				}
			},
			rem2px(rem) {
				let root_px = document.getElementsByTagName("html")[0].style.fontSize;
				root_px = root_px.slice(0, root_px.length - 2) * 1;
				return rem * root_px
			},
			//对象某个属性累加
			objReduce(obj, attr) {
				let cost = 0;
				for(var key in obj) {
					cost += obj[key][attr]
				}
				return cost
			},
			//根据开奖结果，判断牌型大小
			getGameResult(numbers) {
				let types = [];
				//获取庄家，闲家牌组
				let myarr = new Array(),
					start = 0,
					end = start + 5;
				for(let i = 0; i < numbers.length; i++) {
					if(end > numbers.length) {
						break
					}
					myarr.push(numbers.slice(start, end))
					start += 1;
					end += 1;
				}
				for(let i = 0; i < myarr.length; i++) {
					types.push(this.getCardType(myarr[i]))
				}
				let result = {
					z: {},
					x1: {},
					x2: {},
					x3: {},
					x4: {},
					x5: {}
				};
				let zType = types[0],
					zNum = myarr[0],
					x1Type = types[1],
					x1Num = myarr[1],
					x2Type = types[2],
					x2Num = myarr[2],
					x3Type = types[3],
					x3Num = myarr[3],
					x4Type = types[4],
					x4Num = myarr[4],
					x5Type = types[5],
					x5Num = myarr[5];
				result.z.type = zType;
				result.z.isWin = true; //默认庄家为赢
				//判断闲家输赢
				for(let key in result) {
					if(key !== 'z') {
						result[key].type = eval(key + 'Type');
						if(eval(key + 'Type') > zType) {
							result[key].isWin = true;
							//只要有一个闲家为赢则判庄家负
							result.z.isWin = false
						} else if(eval(key + 'Type') === zType) {
							result[key].isWin = eval(key + 'Num')[0] > zNum[0] ? true : false;
							result[key].isWin ? result.z.isWin = false : null;
						} else {
							result[key].isWin = false;
						}
					}
				}
				return result
			},
			//创建开奖的二维数组
			createDyadicArray(numbers) {
				let myarr = new Array(),
					start = 0,
					end = start + 5,
					arr = [],
					numAry = [];
				for(let i = 0; i < numbers.length; i++) {
					if(end > numbers.length) {
						return myarr
					}
					arr = [];
					numAry = numbers.slice(start, end);
					for(let j = 0; j < numAry.length; j++) {
						let obj = {};
						obj.num = numAry[j];
						//1234分别对应4种花色桃杏梅方
						obj.suitType = this.random([1, 2, 3, 4]);
						arr.push(obj)
					}
					start += 1;
					end += 1;
					myarr.push(arr)
				}
				return myarr
			},
			//从数组中随机取一个数
			random(arr) {
				return arr[Math.floor((Math.random() * arr.length))]
			},
			toHistoryRecord(){
				// this.$router.push('/historyRecord')
				this.recordShow=true
			}
		},
		watch: {
			msg(newMsg) {
				let awardNews = JSON.parse(newMsg.data)
				if(awardNews.messageType == "3") {
					if(awardNews.lotteryId == this.kindId) {
						//清除随机变动号码位置定时器
						clearInterval(this.timer)
						this.getLotteryDetails()
						this.getUserDetails();
					}

				}
			},
		}
	}
</script>

<style lang="less">
	.bdUauP {
		.result-wrapper {
			padding: 3px 0px;
		}
		.top-bar {
			display: flex;
			background: white;
			padding: 2px 0px;
		}
		.serial {
			position: relative;
			width: 27%;
			margin-left: 3%;
			display: flex;
			h3 {
				width: 100%;
				font-size: 3.3vw;
				font-weight: bold;
				letter-spacing: 0.1em;
				line-height: 7vw;
				color: rgb(46, 105, 169);
				white-space: nowrap;
				display: inline-block;
				position: relative;
				margin: 0px;
				span {
					color: rgb(95, 95, 95);
				}
			}
		}
		.num-group {
			width: 73%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding: 0 0.1rem;
			.num-item {
				height: 0.42rem;
				width: 0.42rem;
				display: inline-block;
				line-height: 0.42rem;
				color: rgb(255, 255, 255);
				text-align: center;
				text-indent: 0px;
				font-size: 14px;
				font-weight: bold;
				text-shadow: rgb(0, 0, 0) 0px 0px 2px;
				margin-right: 1px;
				border-radius: 50%;
			}
		}
	}
	
	.nnd,
	.nns {
		position: relative;
		width: 100vw;
		min-height: 53vw;
		color: white;
		background-color: black;
		margin-bottom: 5vw;
		z-index: 0;
		overflow: hidden;
	}
	
	.nnd::before,
	.nns::before {
		content: "";
		position: absolute;
		top: 0px;
		left: 0px;
		display: block;
		width: 100%;
		height: 100%;
		background-image: url(bg.png);
		background-size: cover;
		opacity: 0.7;
		background-position: center center;
	}
	
	.right-bar button.history-toggle-btn::before {
		content: "";
		width: 4vw;
		height: 4vw;
		position: absolute;
		top: 3vw;
		left: 0px;
		right: 0px;
		background: url(nz.png) center center / contain no-repeat;
		margin: auto;
	}
	
	.nnd::after {
		content: "";
		position: absolute;
		top: 0px;
		left: 0px;
		display: block;
		width: 100%;
		height: 100%;
		background-image: url(fanbei.png);
		background-size: cover;
		opacity: 0.7;
		animation: fade 0.8s ease 0s 1 normal both running;
		background-position: center center;
	}
	
	.nns::after {
		content: "";
		position: absolute;
		top: 0px;
		left: 0px;
		display: block;
		width: 100%;
		height: 100%;
		background-image: url(pingbei.png);
		background-size: cover;
		opacity: 0.3;
		animation: fade2 0.8s ease 0s 1 normal both running;
		background-position: center center;
	}
	
	.gwhJYS .left-bar {
		position: absolute;
		height: 85%;
		top: 5%;
		width: 6.5vw;
		z-index: 2;
	}
	
	.nnd .right-bar,
	.nns .right-bar {
		position: absolute;
		top: 11vw;
		color: white;
		right: 0px;
		z-index: 1;
	}
	
	.nnd .top-bar,
	.nns .top-bar {
		position: absolute;
		top: 0px;
		left: 50%;
		font-size: 4vw;
		text-align: center;
		transform: translateX(-50%);
		background-image: url(top.png);
		background-size: cover;
		width: 25vw;
		height: 6.5vw;
		line-height: 6.5vw;
		background-position: center top;
		background-repeat: no-repeat;
	}
	
	.nnd .right-bar button.history-toggle-btn,
	.nns .right-bar button.history-toggle-btn {
		color: rgb(255, 255, 255);
		position: absolute;
		right: 0px;
		width: 7vw;
		height: 31vw;
		text-shadow: rgb(4, 186, 238) 0px 0px 10px, rgb(4, 186, 238) 0px 0px 10px;
		font-size: 3.5vw;
		line-height: 4.5vw;
		box-sizing: border-box;
		border-width: 1px 0px 1px 1px;
		border-style: solid solid solid;
		border-color: rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.5);
		border-image: initial;
		border-right: 0px;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 4vw 0px 0px 4vw;
		padding: 2vw 0px 0px;
	}
	
	.gwhJYS .left-bar .tag div {
		display: block;
		vertical-align: middle;
		height: 40%;
	}
	
	.gwhJYS .left-bar .tag {
		background-color: rgba(27, 82, 149, 0.44);
		height: 20%;
		line-height: 4vw;
		font-size: 2.5vw;
		text-align: center;
		box-sizing: border-box;
		border-width: 1px;
		border-style: solid;
		border-color: rgba(242, 238, 252, 0.44);
		border-image: initial;
		padding: 12% 0px;
	}
	
	.gwhJYS .left-bar .tag:first-child {
		border-top-right-radius: 3.5vw;
		border-top: 1px solid rgba(242, 238, 252, 0.44);
	}
	
	.gwhJYS .left-bar .tag div:first-child {
		color: rgb(53, 168, 224);
		font-size: 3vw;
	}
	
	.bCYyPR {
		position: absolute;
		top: 43px;
		height: 32px;
		width: 36px;
		right: 0px;
		background-color: rgba(219, 0, 1, 0.6);
		color: rgb(255, 255, 255);
		font-size: 11px;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		text-align: center;
		font-weight: bold;
		box-sizing: border-box;
		padding-left: 6px;
		border-radius: 32px 0px 0px 32px;
	}
	
	.chJYCc {
		position: relative;
		display: block;
		/*font-size: 0px;*/
	}
	
	.chJYCc .canvas-bg {
		position: absolute;
		left: 0px;
		top: 0px;
		bottom: 0px;
		right: 0px;
		transform: translateZ(0px);
		-webkit-tap-highlight-color: transparent;
		z-index: 0;
		background: radial-gradient(rgb(26, 74, 148), rgb(26, 74, 148), rgb(16, 47, 94));
	}
	
	.chJYCc canvas {
		position: relative;
		width: 100vw;
		z-index: 5;
		pointer-events: none;
		margin-bottom: -1px;
	}
	
	.chJYCc canvas#tempCanvas,
	.chJYCc canvas#confirmedCoins {
		position: absolute;
		left: 0px;
		z-index: 2;
	}
	
	.chJYCc canvas:first-of-type {
		position: absolute;
		left: 0px;
		top: 0px;
		transform: translateZ(0px);
		z-index: 0;
	}
	
	.bpwjfY {
		display: block;
		position: absolute;
		color: white;
		top: -9vw;
		width: 100%;
		height: 10vw;
		z-index: 5;
	}
	
	.bpwjfY .bg {
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: auto;
		pointer-events: none;
	}
	
	.bpwjfY .info-text {
		display: block;
		position: absolute;
		text-align: center;
		vertical-align: middle;
		left: 0px;
		top: 1.5vw;
		width: 100%;
		font-size: 3.5vw;
		line-height: 4vw;
		color: rgb(255, 192, 3);
	}
	
	.bpwjfY .button-oddFbRate {
		text-align: center;
		margin-right: -7%;
	}
	.bpwjfY .info-text p:nth-child(1){
		font-size: 14px;
		font-weight: 600;
		color: red;
		width: 2rem;
		position: absolute;
		top: -0.4rem;
		left: 50%;
		margin-left:-1rem ;
	}
	.bpwjfY .info-text span {
		font-weight: 300;
		vertical-align: middle;
	}
	
	.bpwjfY .button:active>* {
		transform: translateY(6%);
	}
	
	.bpwjfY .info-text span:last-child {
		font-size: 4vw;
	}
	
	.bpwjfY .button {
		display: block;
		position: relative;
		background-size: 100%;
		width: 12vw;
		height: 10vw;
		z-index: 10;
		background-position: center center;
		background-repeat: no-repeat;
		transition: background 0.2s ease 0s;
	}
	
	.bpwjfY .button-wrapper {
		position: absolute;
		display: flex;
		padding: 0px 3vw;
	}
	
	.bpwjfY .button-wrapper-left {
		left: 0px;
	}
	
	.bpwjfY .button-wrapper-right {
		right: 0px;
	}
	
	.bpwjfY .button-square {
		width: 15vw;
		height: 9.4vw;
		background-size: 100%;
		background-image: url(btn1_bg.png);
	}
	
	.bpwjfY .button-circle {
		background-image: url(circle.png);
	}
	
	.bpwjfY .button-sound .icon {
		background-image: url(sound.png);
	}
	
	.bpwjfY .button-sound.on .icon {
		background-image: url(sound_on.png);
	}
	
	.bpwjfY .button:active>* {
		transform: translateY(6%);
	}
	
	.bpwjfY .button .icon {
		width: 8vw;
		height: 6vw;
		background-size: cover;
		pointer-events: none;
		margin: 9% auto auto;
		background-position: center center;
		transition: background 0.2s ease 0s;
	}
	
	.bpwjfY .button-construction .icon {
		background-image: url(wen.png);
	}
	
	.bpwjfY .button-oddFbRate span {
		display: block;
		padding-right: 7%;
		font-size: 3.5vw;
		font-weight: 300;
		line-height: 7vw;
		text-shadow: rgb(4, 186, 238) 0px 0px 10px, rgb(4, 186, 238) 0px 0px 10px;
		color: white;
		margin: auto;
	}
	
	.bpwjfY .button-square:active {
		background-image: url(active.png);
	}
	
	.bpwjfY .button-square.on {
		background-image: url(activeOn.png);
	}
	
	.bpwjfY .info-text.closed {
		font-size: 4vw;
		font-weight: 700;
	}
	
	.eonsKP {
		pointer-events: none;
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		display: flex;
		width: 100%;
		/*opacity: 0;*/
		/*visibility: hidden;*/
		z-index: 6;
		flex-flow: row wrap;
		transition: all 300ms ease-in-out 0s;
	}
	
	.eonsKP .count {
		position: absolute;
		left: 281.25px;
		top: 139.838px;
		font-size: 3vw;
		line-height: 3.5vw;
		transform: translate(-50%, -110%);
		color: rgb(255, 255, 255);
		border-radius: 3vw;
		background: rgba(0, 0, 0, 0.5);
		padding: 1vw 2vw;
		z-index: 10;
		pointer-events: none;
		text-align: center;
		vertical-align: middle;
	}
	
	.kQdINE {
		width: 50%;
		height: 2.8rem;
		box-sizing: border-box;
		position: relative;
		/*border-bottom: 1px solid rgba(204, 204, 204, .3);*/
	}
	
	.kQdINE:nth-child(1) {
		/*border-right: 1px solid rgba(204, 204, 204, .3);*/
	}
	
	.kQdINE:nth-child(1)::before {
		border-right: 1px solid rgba(204, 204, 204, .3);
		border-top-left-radius: 20vw 3vw;
	}
	
	.kQdINE:nth-child(2)::before {
		border-top-right-radius: 20vw 3vw;
	}
	
	.ghLcAJ:nth-child(3),
	.ghLcAJ:nth-child(4) {
		/*border-right: 1px solid rgba(204, 204, 204, .3);*/
	}
	
	.kQdINE.win::before {
		opacity: 1;
		transition-delay: 2400ms;
	}
	
	.kQdINE::before {
		content: "";
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		box-shadow: rgb(4, 186, 238) 0px 0px 0px 1.5px inset, rgb(4, 186, 238) 0px 0px 0px 1.5px;
		opacity: 0;
		transition: all 200ms ease-in-out 0ms;
		transition-delay: 0ms;
	}
	
	.erRpOn {
		background-color: rgb(0, 0, 0);
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: 2;
		transform: translateX(0px);
		opacity: 1;
		will-change: transform;
		box-sizing: border-box;
		transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
		padding: 10px 10% 10%;
	}
	
	.erRpOn .panel-title {
		color: rgb(255, 255, 255);
		text-align: center;
		font-size: 3.8vw;
		line-height: 9vw;
		margin: 0px;
	}
	
	.erRpOn .panel-result {
		position: relative;
		height: 80%;
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
		flex-flow: column;
	}
	
	.erRpOn .panel-result .player-result {
		display: flex;
		height: 5vw;
		-webkit-box-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		align-items: center;
	}
	
	.erRpOn .panel-result .player-label {
		color: rgb(53, 168, 224);
		font-size: 3.5vw;
		height: 3vw;
		line-height: 3vw;
		padding-right: 1.5vw;
		margin-right: 1.5vw;
		border-right: 1px solid rgb(153, 153, 153);
	}
	
	.erRpOn .panel-result .result-ball {
		display: flex;
		width: 4.7vw;
		height: 4.7vw;
		color: rgb(255, 255, 255);
		background-color: transparent;
		box-sizing: border-box;
		position: relative;
		font-size: 2.8vw;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		border-radius: 50%;
		border-width: 1px;
		border-style: solid;
		border-color: rgb(153, 153, 153);
		border-image: initial;
	}
	
	.erRpOn .panel-result .result-ball.win {
		background-color: rgb(241, 102, 53);
		border-color: transparent;
	}
	
	.erRpOn .panel-result .result-ball.lose::after {
		content: "负";
	}
	
	.erRpOn .panel-result .result-ball.win::after {
		content: "胜";
	}
	
	.iotgEl,
	.iauchI {
		display: flex;
		width: 30vw;
		height: 16vw;
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		cursor: pointer;
		margin: auto;
	}
	
	.win .iotgEl::before {
		content: "";
		height: 18vw;
		width: 18vw;
		animation-duration: 0.75s;
		animation-name: bounceOut;
		animation-fill-mode: forwards;
		animation-delay: 3.5s;
		opacity: 0;
		position: absolute;
		top: -10vw;
		left: 0px;
		right: 0px;
		z-index: 1;
		background: url(ying.png) center center / contain no-repeat;
		margin: auto;
	}
	
	.ghLcAJ {
		width: 33.3333%;
		height: 3.4rem;
		box-sizing: border-box;
		position: relative;
	}
	
	.ghLcAJ.win::before {
		transition-delay: 2400ms;
		opacity: 1;
	}
	
	.ghLcAJ::before {
		content: "";
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		box-shadow: rgb(4, 186, 238) 0px 0px 0px 1.5px inset, rgb(4, 186, 238) 0px 0px 0px 1.5px;
		opacity: 0;
		transition: all 200ms ease-in-out 0ms;
		transition-delay: 0ms;
	}
	
	.gUjAGe {
		position: relative;
		display: flex;
		width: 100%;
		min-height: 12vw;
		-webkit-box-align: center;
		align-items: center;
		box-sizing: border-box;
		font-size: 3.5vw;
		line-height: 3.8vw;
		z-index: 10;
		background: rgb(12, 35, 68);
		padding: 0px 3vw;
	}
	
	.gUjAGe .tag {
		position: absolute;
		right: 0px;
		top: 0px;
		bottom: 0px;
		width: 40vw;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 0;
		border-radius: 5vw 0px 0px;
	}
	
	.gUjAGe .round {
		position: absolute;
		bottom: 2vw;
		right: 40vw;
		width: 5vw;
		height: 5vw;
		overflow: hidden;
	}
	
	.gUjAGe .round>div {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		border-bottom-right-radius: 100%;
		border-bottom: 5vw solid rgba(0, 0, 0, 0.5);
		border-right: 5vw solid rgba(0, 0, 0, 0.5);
	}
	
	.gUjAGe .bg {
		position: absolute;
		left: 0px;
		bottom: -21.5vw;
		width: 100%;
	}
	
	.gUjAGe .bg img {
		width: 100%;
		height: auto;
	}
	
	.gUjAGe .bet-amount {
		white-space: nowrap;
		color: rgb(255, 255, 255);
		position: relative;
		border-radius: 4vw;
		padding: 1.3vw 2vw 1.3vw 6vw;
		border-width: 1px;
		border-style: solid;
		border-color: rgba(255, 255, 255, 0.75);
		border-image: initial;
	}
	
	.gUjAGe .bet-amount:not(:last-child) {
		margin-right: 2vw;
	}
	
	.gUjAGe .bet-amount.total {
		padding-right: 5vw;
	}
	
	.gUjAGe .bet-amount::before,
	.gUjAGe .bet-amount::after {
		content: "";
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0.7vw;
		width: 5vw;
		height: 5vw;
	}
	
	.gUjAGe .bet-amount.total::before {
		background: url(amount.png) center center / contain no-repeat;
	}
	
	.gUjAGe .bet-amount.token::before {
		background: url(amount2.png) center center / contain no-repeat;
	}
	
	.gUjAGe .button-wrapper .btn.confirm {
		border-width: 1px;
		border-style: solid;
		border-color: rgb(39, 201, 137);
		border-image: initial;
		background: rgba(39, 201, 137, 0.5);
	}
	
	.gUjAGe .button-wrapper .btn.cancel {
		border-width: 1px;
		border-style: solid;
		border-color: #ff4047;
		-o-border-image: initial;
		border-image: initial;
		background: rgba(255, 64, 71, 0.5);
	}
	
	.gUjAGe .button-wrapper {
		margin-left: auto;
	}
	
	.gUjAGe .button-wrapper .btn {
		background-color: transparent;
		color: rgb(255, 255, 255);
		-webkit-appearance: none;
		font-weight: bold;
		position: relative;
		outline: none;
		border-radius: 7vw;
		padding: 2vw 2vw 2vw 7vw;
		transition: background 0.2s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
	}
	
	.gUjAGe .button-wrapper .btn.confirm {
		border-width: 1px;
		border-style: solid;
		border-color: rgb(39, 201, 137);
		border-image: initial;
		background: rgba(39, 201, 137, 0.5);
	}
	
	.gUjAGe .button-wrapper .btn.btn-disabled {
		pointer-events: none;
		opacity: 0.5;
		background: transparent;
	}
	
	.gUjAGe .button-wrapper .btn::before {
		content: "";
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 1vw;
		width: 5vw;
		height: 5vw;
	}
	
	.gUjAGe .button-wrapper .btn.confirm::before {
		background: url(dui.png) center center / contain no-repeat;
	}
	
	.gUjAGe .button-wrapper .btn.cancel {
		border-width: 1px;
		border-style: solid;
		border-color: rgb(255, 64, 71);
		border-image: initial;
		background: rgba(255, 64, 71, 0.5);
	}
	
	.gUjAGe .button-wrapper .btn.cancel::before {
		background: url(cuo.png) center center / contain no-repeat;
	}
	
	.gUjAGe .round>div {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		border-bottom-right-radius: 100%;
		border-bottom: 5vw solid rgba(0, 0, 0, 0.5);
		border-right: 5vw solid rgba(0, 0, 0, 0.5);
	}
	
	.fGVsvB {
		position: relative;
		z-index: 10;
		width: 100%;
		height: calc(16vw);
		min-height: calc(16vw);
		display: flex;
		box-sizing: border-box;
		padding: 0px 2vw;
	}
	
	.hRKddM {
		display: flex;
		width: 80vw;
		height: 20vw;
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		cursor: pointer;
		margin: auto;
	}
	
	.hRKddM>div {
		width: 15vw;
		height: 20vw;
		animation-name: slideIn;
		animation-duration: 300ms;
		animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		animation-fill-mode: forwards;
		opacity: 0;
	}
	
	.hRKddM>div:nth-child(1) {
		animation-delay: 0ms;
	}
	
	.hRKddM>div:nth-child(2) {
		animation-delay: 100ms;
	}
	
	.hRKddM>div:nth-child(3) {
		animation-delay: 200ms;
	}
	
	.hRKddM>div:nth-child(4) {
		animation-delay: 300ms;
	}
	
	.hRKddM>div:nth-child(5) {
		animation-delay: 400ms;
	}
	
	.fGVsvB .coin-sprite {
		font-size: 0px;
		background-color: transparent;
		background-size: calc(14vw);
		display: block;
		width: calc(14vw);
		height: calc(14vw);
		transform: scale(0.9);
		transform-origin: 50% 100% 0px;
		will-change: transform;
		border-width: initial;
		border-style: none;
		border-color: initial;
		border-image: initial;
		background-repeat: no-repeat;
		background-position: center center;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s, margin 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s;
	}
	
	.kQdINE:nth-child(1)>div>div:nth-child(1) {
		animation-delay: 0ms;
	}
	
	.kQdINE:nth-child(1)>div>div:nth-child(2) {
		animation-delay: 100ms;
	}
	
	.kQdINE:nth-child(1)>div>div:nth-child(3) {
		animation-delay: 200ms;
	}
	
	.kQdINE:nth-child(1)>div>div:nth-child(4) {
		animation-delay: 300ms;
	}
	
	.kQdINE:nth-child(1)>div>div:nth-child(5) {
		animation-delay: 400ms;
	}
	
	.kQdINE:nth-child(2)>div>div:nth-child(1) {
		animation-delay: 500ms;
	}
	
	.kQdINE:nth-child(2)>div>div:nth-child(2) {
		animation-delay: 600ms;
	}
	
	.kQdINE:nth-child(2)>div>div:nth-child(3) {
		animation-delay: 700ms;
	}
	
	.kQdINE:nth-child(2)>div>div:nth-child(4) {
		animation-delay: 800ms;
	}
	
	.kQdINE:nth-child(2)>div>div:nth-child(5) {
		animation-delay: 900ms;
	}
	
	.ghLcAJ:nth-child(3)>div>div:nth-child(1) {
		animation-delay: 1000ms;
	}
	
	.ghLcAJ:nth-child(3)>div>div:nth-child(2) {
		animation-delay: 1100ms;
	}
	
	.ghLcAJ:nth-child(3)>div>div:nth-child(3) {
		animation-delay: 1200ms;
	}
	
	.ghLcAJ:nth-child(3)>div>div:nth-child(4) {
		animation-delay: 1300ms;
	}
	
	.ghLcAJ:nth-child(3)>div>div:nth-child(5) {
		animation-delay: 1400ms;
	}
	
	.ghLcAJ:nth-child(4)>div>div:nth-child(1) {
		animation-delay: 1500ms;
	}
	
	.ghLcAJ:nth-child(4)>div>div:nth-child(2) {
		animation-delay: 1600ms;
	}
	
	.ghLcAJ:nth-child(4)>div>div:nth-child(3) {
		animation-delay: 1700ms;
	}
	
	.ghLcAJ:nth-child(4)>div>div:nth-child(4) {
		animation-delay: 1800ms;
	}
	
	.ghLcAJ:nth-child(4)>div>div:nth-child(5) {
		animation-delay: 1900ms;
	}
	
	.ghLcAJ:nth-child(5)>div>div:nth-child(1) {
		animation-delay: 2000ms;
	}
	
	.ghLcAJ:nth-child(5)>div>div:nth-child(2) {
		animation-delay: 2100ms;
	}
	
	.ghLcAJ:nth-child(5)>div>div:nth-child(3) {
		animation-delay: 2200ms;
	}
	
	.ghLcAJ:nth-child(5)>div>div:nth-child(4) {
		animation-delay: 2300ms;
	}
	
	.ghLcAJ:nth-child(5)>div>div:nth-child(5) {
		animation-delay: 2400ms;
	}
	
	.iotgEl>div {
		width: 9vw;
		height: 12vw;
		animation-name: slideIn;
		animation-duration: 300ms;
		animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		animation-fill-mode: forwards;
		opacity: 0;
	}
	
	.game .card {
		will-change: width, height;
		position: relative;
		box-shadow: rgba(55, 55, 55, 0.7) 0px 4px 10px;
		background-image: url(cardGroup.png);
		background-size: 400% 1300%;
		margin-left: -4vw;
		background-position-x: calc(0%);
		background-position-y: calc(0%);
		border-radius: 2vw;
	}
	
	.game .card:nth-child(1) {
		will-change: width, height;
		position: relative;
		box-shadow: rgba(55, 55, 55, 0.7) 0px 4px 10px;
		background-image: url(cardGroup.png);
		background-size: 400% 1300%;
		margin-left: 0;
		background-position-x: calc(0%);
		background-position-y: calc(0%);
		border-radius: 2vw;
	}
	
	.notice {
		width: 40vw;
		height: 16vw;
		position: absolute;
		background: none;
		left: 0px;
		right: 0px;
		text-align: center;
		font-weight: bold;
		line-height: 16vw;
		top: 16vw;
		opacity: 0;
		display: none;
		margin: auto;
	}
	
	.noticeIn {
		display: block;
		animation-duration: 0.75s;
		animation-name: fadeIn;
		animation-fill-mode: forwards;
	}
	
	.noticeOut {
		display: block;
		animation-duration: 0.75s;
		animation-name: fadeOut;
		animation-fill-mode: forwards;
	}
	
	.notice::after {
		content: "";
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		z-index: -1;
		left: -50%;
		width: 200%;
		height: 100%;
		background: linear-gradient(to right, rgba(0, 0, 0, 0.01) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0.01) 100%);
	}
	
	.game-info {
		width: 20vw;
		height: 10vw;
		position: absolute;
		left: 0px;
		right: 0px;
		top: 10vw;
		animation-duration: 0.75s;
		animation-name: bounceIn;
		animation-fill-mode: forwards;
		animation-delay: 3s;
		opacity: 0;
		margin: auto;
	}
	
	.game-info span {
		z-index: 12;
	}
	
	.game-info::before {
		content: "";
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background-image: url(cow1.png);
		background-size: 100% 1100%;
		z-index: 1;
	}
	
	.type0 .game-info::before {
		background-position-x: 0px;
		background-position-y: calc(0%);
	}
	
	.type1 .game-info::before {
		background-position-x: 0px;
		background-position-y: calc(10%);
	}
	
	.type2 .game-info::before {
		background-position-x: 0px;
		background-position-y: calc(20%);
	}
	
	.type3 .game-info::before {
		background-position-x: 0px;
		background-position-y: calc(30%);
	}
	
	.type4 .game-info::before {
		background-position-x: 0px;
		background-position-y: calc(40%);
	}
	
	.type5 .game-info::before {
		background-position-x: 0px;
		background-position-y: calc(50%);
	}
	
	.type6 .game-info::before {
		background-position-x: 0px;
		background-position-y: calc(60%);
	}
	
	.type7 .game-info::before {
		background-position-x: 0px;
		background-position-y: calc(70%);
	}
	
	.type8 .game-info::before {
		background-position-x: 0px;
		background-position-y: calc(80%);
	}
	
	.type9 .game-info::before {
		background-position-x: 0px;
		background-position-y: calc(90%);
	}
	
	.type10 .game-info::before {
		background-position-x: 0px;
		background-position-y: calc(100%);
	}
	
	.win .game-info::before {
		content: "";
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background-image: url(cow.png);
		background-size: 100% 1100%;
		z-index: 1;
	}
	
	.uazon {
		position: absolute;
		width: 100vw;
		height: 100%;
		top: 0px;
		left: 0px;
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		font-family: Arial;
		font-size: 14px;
		font-weight: 900;
		text-align: center;
		/*transition: all .3s;*/
		color: white;
		z-index: 20;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.uazon .modal {
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: black;
		width: 80vw;
		min-width: 250px;
		max-width: 100vw;
		max-height: calc(100vh - 90px);
		border-radius: 2vw;
		overflow: hidden;
	}
	
	.uazon .title {
		padding-top: 5px;
		line-height: 45px;
	}
	
	.uazon .title .icon {
		vertical-align: middle;
		display: inline-block;
		width: 20px;
		height: 20px;
		margin: 0px 5px 5px;
		background: url(amount2.png) center center / auto 100% no-repeat;
	}
	
	.uazon .form {
		padding: 0px 15px 5px;
		overflow: scroll;
	}
	
	.uazon table {
		display: table;
		border-collapse: separate;
		border-spacing: 2px;
		border-color: grey;
	}
	
	.uazon .form table {
		width: 100%;
		border-collapse: collapse;
	}
	
	.uazon .form table th {
		color: rgb(187, 187, 187);
		font-size: 16px;
		line-height: 28px;
		white-space: nowrap;
		position: sticky;
		top: 0px;
		z-index: 3;
		padding: 0px;
		background: black;
	}
	
	.uazon .form table th span {
		display: block;
		border-top: 1px solid rgb(102, 102, 102);
		border-bottom: 1px solid rgb(102, 102, 102);
	}
	
	.uazon .form table label.checkbox input[type="checkbox"] {
		position: absolute;
		width: 0px;
		height: 0px;
		opacity: 0;
		-webkit-appearance: none;
	}
	
	.uazon .form table label.checkbox input[type="checkbox"]:checked+span {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		z-index: 1;
		margin: auto;
		background: url(dui2.png) center center / auto 100% no-repeat rgb(0, 221, 51);
	}
	
	.uazon .form table td:first-child {
		width: 28px;
	}
	
	.uazon .form table th:nth-child(3) {
		text-align: right;
	}
	
	.uazon .form table td {
		color: rgb(255, 255, 255);
		line-height: 25px;
	}
	
	.uazon .form table th:last-child {
		text-align: right;
	}
	
	.uazon .form table td span.bet-value {
		display: block;
		line-height: 18px;
		background: rgba(118, 224, 255, 0.5);
		border-radius: 100px;
		margin: 5px;
	}
	
	.uazon .form table td:last-child {
		font-weight: 300;
		text-align: right;
		color: rgb(187, 187, 187);
	}
	
	.uazon .form table label.checkbox {
		position: relative;
		display: block;
		width: 18px;
		height: 18px;
		font-size: 0px;
		box-sizing: border-box;
		margin: auto;
		border-radius: 50%;
		border-width: 2px;
		border-style: solid;
		border-color: rgb(0, 221, 51);
		border-image: initial;
		overflow: hidden;
	}
	
	.uazon .form table td:nth-child(3) span {
		padding-right: 5px;
	}
	
	.uazon .form table td:nth-child(3) {
		text-align: right;
	}
	
	.uazon .panel {
		background-color: white;
		color: black;
		padding: 16px 0px;
	}
	
	.uazon .panel p {
		height: 32px;
		line-height: 30px;
		margin: 15px 0px;
	}
	
	.uazon .button-wrapper {
		margin-left: auto;
		display: block;
	}
	
	.uazon .button-wrapper .btn {
		background-color: transparent;
		font-size: 13px;
		color: black;
		-webkit-appearance: none;
		font-weight: bold;
		position: relative;
		outline: none;
		border-radius: 20px;
		padding: 6px 12px 6px 26px;
		transition: background 0.2s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
	}
	
	.uazon .button-wrapper .btn.confirm {
		background-color: rgba(39, 201, 137, 0.5);
		border-width: 1px;
		border-style: solid;
		border-color: rgb(39, 201, 137);
		border-image: initial;
	}
	.uazon .button-wrapper .btn.confirm.btn-disabled{
		pointer-events: none;
		opacity: 0.5;
		background: transparent;
	}
	
	.uazon .button-wrapper .btn.confirm::before {
		background: url(dui2.png) center center / contain no-repeat;
	}
	
	.uazon .button-wrapper .btn:not(:first-child) {
		margin-left: 10px;
	}
	
	.uazon .button-wrapper .btn.cancel {
		background-color: rgba(255, 64, 71, 0.5);
		border-width: 1px;
		border-style: solid;
		border-color: rgb(255, 64, 71);
		border-image: initial;
	}
	
	.uazon .button-wrapper .btn::before {
		content: "";
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 6px;
		width: 18px;
		height: 18px;
	}
	
	.uazon .button-wrapper .btn.cancel::before {
		background: url(cuo2.png) center center / contain no-repeat;
	}
	
	.uazon .modal button.close-modal {
		position: absolute;
		right: 0px;
		top: 0px;
		height: 30px;
		width: 30px;
		border-width: initial;
		border-style: none;
		border-color: initial;
		border-image: initial;
		padding: 25px;
		background: url(cuo.png) center center / 60% no-repeat;
	}
	
	.game-info::after {
		content: "";
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background: linear-gradient(to right, rgba(0, 0, 0, 0.01) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.01) 100%);
	}
	
	.fGVsvB .coin-sprite.not-selected {
		transform: scale(0.9);
	}
	
	.fGVsvB .coin-sprite.selected {
		transform: scale(1.1);
	}
	
	.fGVsvB .coin-sprite.selected:nth-child(1) {
		transform: scale(1.1) translateX(9%);
	}
	
	.fGVsvB .coin-sprite.selected:nth-child(2) {
		transform: scale(1.1) translateX(6%);
	}
	
	.fGVsvB .coin-sprite.selected:nth-child(3) {
		transform: scale(1.1) translateX(3%);
	}
	
	.fGVsvB .coin-sprite.selected:nth-child(4) {
		transform: scale(1.1) translateX(0%);
	}
	
	.fGVsvB .coin-sprite.selected:nth-child(5) {
		transform: scale(1.1) translateX(-3%);
	}
	
	.fGVsvB .coin-sprite.selected:nth-child(6) {
		transform: scale(1.1) translateX(-6%);
	}
	
	.fGVsvB .coin-sprite.selected:nth-child(7) {
		transform: scale(1.1) translateX(-9%);
	}
	
	.fGVsvB .coin-sprite.not-selected:nth-child(1) {
		transform: scale(0.85) translateX(-3%);
	}
	
	.fGVsvB .coin-sprite.selected~.not-selected:nth-child(2) {
		transform: scale(0.85) translateX(18%);
	}
	
	.fGVsvB .coin-sprite.selected~.not-selected:nth-child(3) {
		transform: scale(0.85) translateX(15%);
	}
	
	.fGVsvB .coin-sprite.selected~.not-selected:nth-child(4) {
		transform: scale(0.85) translateX(12%);
	}
	
	.fGVsvB .coin-sprite.selected~.not-selected:nth-child(5) {
		transform: scale(0.85) translateX(9%);
	}
	
	.fGVsvB .coin-sprite.selected~.not-selected:nth-child(6) {
		transform: scale(0.85) translateX(6%);
	}
	
	.fGVsvB .coin-sprite.selected~.not-selected:nth-child(7) {
		transform: scale(0.85) translateX(3%);
	}
	
	.fGVsvB .coin-sprite-10 {
		background-image: url(code10.png);
	}
	
	.fGVsvB .coin-sprite-50 {
		background-image: url(code50.png);
	}
	
	.fGVsvB .coin-sprite-100 {
		background-image: url(code100.png);
	}
	
	.fGVsvB .coin-sprite-500 {
		background-image: url(code500.png);
	}
	
	.fGVsvB .coin-sprite-1000 {
		background-image: url(code1000.png);
	}
	
	.fGVsvB .coin-sprite-5000 {
		background-image: url(code5000.png);
	}
	
	.fGVsvB .coin-sprite-10000 {
		background-image: url(code10000.png);
	}
	
	.num-1 {
		background-color: rgb(255, 253, 60);
	}
	
	.num-2 {
		background-color: rgb(0, 140, 250);
	}
	
	.num-3 {
		background-color: rgb(77, 77, 77);
	}
	
	.num-4 {
		background-color: rgb(255, 112, 34);
	}
	
	.num-5 {
		background-color: rgb(119, 255, 253);
	}
	
	.num-6 {
		background-color: rgb(66, 36, 248);
	}
	
	.num-7 {
		background-color: rgb(227, 227, 227);
	}
	
	.num-8 {
		background-color: rgb(255, 0, 26);
	}
	
	.num-9 {
		background-color: rgb(121, 0, 7);
	}
	
	.num-10 {
		background-color: rgb(50, 197, 51);
	}
	
	.list-complete-item {
		transition: all .6s;
		display: inline-block;
	}
	
	.list-complete-enter,
	.list-complete-leave-to {
		opacity: 0;
		transform: translateY(30px);
	}
	
	.list-complete-leave-active {
		position: absolute;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s;
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	
	@keyframes slideIn {
		0% {
			opacity: 0;
			transform: translateX(-100%);
		}
		100% {
			opacity: 1;
			transform: translateX(0px);
		}
	}
	
	@keyframes fade2 {
		0% {
			opacity: 0.3;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.3;
		}
	}
	
	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	
	@keyframes fade {
		0% {
			opacity: 0.3;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.3;
		}
	}
	
	@keyframes bounceIn {
		0% {
			opacity: 0;
			transform: scale(.3);
		}
		50% {
			opacity: 1;
			transform: scale(1.05);
		}
		70% {
			opacity: 1;
			transform: scale(.9);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
	
	@keyframes bounceOut {
		0% {
			-webkit-transform: scale3d(.9, .9, .9);
			transform: scale3d(.9, .9, .9)
		}
		20% {
			opacity: 1;
			-webkit-transform: scale3d(1, 1, 1);
			transform: scale3d(1, 1, 1)
		}
		40% {
			opacity: 1;
			-webkit-transform: scale3d(.9, .9, .9);
			transform: scale3d(.9, .9, .9)
		}
		60% {
			opacity: 1;
			-webkit-transform: scale3d(1, 1, 1);
			transform: scale3d(1, 1, 1)
		}
		80% {
			opacity: 1;
			-webkit-transform: scale3d(.9, .9, .9);
			transform: scale3d(.9, .9, .9)
		}
		100% {
			opacity: 1;
			-webkit-transform: scale3d(1, 1, 1);
			transform: scale3d(1, 1, 1)
		}
	}
</style>