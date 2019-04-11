<template>
	<div class="chase" >
		<header class="chase-navbar">
			<div class="back" @click="goBack"></div>
			<ul class="chaseType">
				<li :class="confirmBetFields.confirmBetType=='2'?'active':''" @click="changeBetType('2')">平倍追号</li>
				<li :class="confirmBetFields.confirmBetType=='3'?'active':''" @click="changeBetType('3')">智能追号</li>
			</ul>
		</header>
		<div class="time">
			<p style="display: flex;justify-content: center;align-items: center;">
				<p style="line-height: 0.3rem;font-size: 0.36rem;">第{{gameInfo.nextRound.awarPeriod}}期 截止倒数:</p>
			    <CountDown v-if="time!=0" :time="time"  timetype="second" :callback="timeEnd" class="clock-count" />
			</p>
		</div>
		<!--常规追号-->
		<div v-if="confirmBetFields.confirmBetType=='2'" class="setting">
			<p><span>追号</span><yd-spinner  @input="generatorChaseList(true)" :max="gameConfig[gameType.kindId].periodNoAll" :unit="1" width="1.4rem" height=".5rem" v-model="confirmBetFields.chasePeriods" :longpress="false"></yd-spinner><span>期</span></p>
			<p><span>起始倍数</span><yd-spinner  @input="generatorChaseList(true)" :max="1000" :unit="1" width="1.4rem" height=".5rem" v-model="confirmBetFields.chaseTimes" :longpress="false"></yd-spinner></p>
		</div>
		<!--智能追号面板-->
		<div v-if="confirmBetFields.confirmBetType=='3'" class="setting">
			<p>
				<span>追号</span><yd-spinner @input="generatorChaseList(true)" :max="confirmBetFields.maxChase" :unit="1" width="1.4rem" height=".5rem" v-model="confirmBetFields.chasePeriods" :longpress="false"></yd-spinner><span>期</span><br />&nbsp;&nbsp;
				<span>全程最低盈利30%</span>
			</p>
			<p><a style="color: rgb(22, 164, 214);" @click="showSet=true">修改追号方案></a></p>
		</div>
		<div class="lotteryNum">
			<p><span>投注号码:</span><span style="color: rgb(224, 25, 54);" >{{chaseBetList[0]?chaseBetList[0].lotteryNum:''}}</span></p>
		</div>
		<div class="chase-table">
			<table  cellpadding="0" cellspacing="0">
			<thead>
				<tr>
					<th style="border-left: none; width:0.4rem;">&nbsp;&nbsp;</th>
					<th>期号</th>
					<th>累计投入</th>
					<th>中奖盈利</th>
					<th>盈利率</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in chaseList">
					<td>{{index+1}}</td>
					<td style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
						<span >{{item.periodNo}}</span>
						<div style="display: flex;justify-content: center;align-items: center;">投<yd-spinner @input="changeTimes(index)" v-model="item.times" class="currentPay"  :max="1000" unit="1" width="1.4rem" height=".5rem"  :longpress="false"></yd-spinner>倍</div>
					</td>
					<td>{{item.hasPay}}</td>
					<td>{{item.profit}}</td>
					<td>{{item.profitRate=='NaN%'?'0%':item.profitRate}}</td>
				</tr>
			</tbody>
		</table>
		</div>
		
		<div class="footer_box">
			<div class="set_checkbox">
				<span style="color:#e43a45">注：</span><span style="margin-right: 0.1rem;">中奖停追</span>
				<yd-radio-group v-model="confirmBetFields.orderType" size="14" color="#7d7d7d">
					<yd-radio val="2">是</yd-radio>
					<yd-radio val="1">否</yd-radio>
				</yd-radio-group>
			</div>
			<div class="footer">
				<span>共{{chaseList.length}}期</span>
				<span>总投注{{cost}}元</span>
				<yd-button @click.native="confirmBet" :disabled="!cost||!isOk">立即投注</yd-button>
			</div>
		</div>
		<!-- 高级设置弹窗 -->
		<yd-popup v-model="showSet" position="center" width="90%" :close-on-masker="false">
			<div class="set_chase">
				<div class="header">
					修改追号方案
				</div>
				<div class="conent">
					<div class="item1">
						<p>连续追号
							<yd-spinner :max="gameConfig[gameType.kindId].periodNoAll" unit="1" width="1.4rem" height=".5rem" v-model="confirmBetFields.chasePeriods" :longpress="false"></yd-spinner>期</p>
						<p>起始倍数
							<yd-spinner :max="10000" :unit="1" width="1.4rem" height=".5rem" v-model="confirmBetFields.chaseTimes" :longpress="false"></yd-spinner>倍</p>
					</div>
					<div style="background: #FFFFFF;line-height: .6rem;text-align: center;border-top:1px solid #7e7e7e;font-size: 0.32rem;">
						预期盈利
					</div>
					<yd-radio-group class="radio_sel" v-model="confirmBetFields.chaseWinType" color="#d91d36">
						<yd-radio val="1">全程最低盈利率
							<yd-spinner :max="10000" :unit="1" width="1.4rem" height=".5rem" v-model="confirmBetFields.chaseMinPercent" :longpress="false"></yd-spinner>%</yd-radio>
						<yd-radio val="3">全程最低盈利
							<yd-spinner :max="10000" :unit="1" width="1.4rem" height=".5rem" v-model="confirmBetFields.chaseMinNumber" :longpress="false"></yd-spinner>元</yd-radio>
						<yd-radio val="2">前
							<yd-spinner :max="10000" :unit="1" width="1.4rem" height=".5rem" v-model="confirmBetFields.chaseBeforePeriod" :longpress="false"></yd-spinner>期
							<yd-spinner :max="10000" :unit="1" width="1.4rem" height=".5rem" v-model="confirmBetFields.chaseBeforePercent" :longpress="false"></yd-spinner>% &nbsp;之后盈利率
							<yd-spinner :max="10000" :unit="1" width="1.4rem" height=".5rem" v-model="confirmBetFields.chaseAfterPercent" :longpress="false"></yd-spinner>
						</yd-radio>
					</yd-radio-group>

				</div>
				<div class="footer">
					<yd-button type="warning" style="width: 1rem;" @click.native="showSet=false">取消</yd-button>
					<yd-button style="background: #d91c32;width: 1rem;" @click.native="generatorChaseList(true);showSet=false">生成方案</yd-button>
				</div>
			</div>
		</yd-popup>
		

	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import createChaseList from "../utils/createChaseList.js";
import gameConfig from "../createconfig/gameConfig";
import CountDown from "./CountDown";
import { fhRound } from "../utils/quickCalc";
import mixin from "../utils/mixins"
export default {
  mixins: [mixin],
  components: {
    CountDown
  },
  data() {
    return {
	  gameConfig:gameConfig,
      showSet: false,
      time: 0,
      isOk: true,
      confirmBetFields: {
        confirmBetType: "2",
        chasePeriods: 1,
        chaseTimes: 1,
        orderType: "2",
        chasePrePay: 0, //已投入
        chaseMinPercent: 30, //全程最低盈利率
        chaseBeforePeriod: 5, //前?期
        chaseBeforePercent: 50, //前?期盈利率
        chaseAfterPercent: 20, //之后盈利率
        chaseMinNumber: 30, //全程最低盈利
        chaseWinType: "1"
      },
      chaseList: []
    };
  },
  created() {
    if (this.chaseBetList.length) {
      this.confirmBetFields.chasePeriods = this.chaseBetList[0].chasePeriods;
    } else {
      this.$router.push("/shopping");
    }
    this.getTime();
    this.generatorChaseList(true);
  },
  computed: {
    ...mapState("bet", ["gameInfo", "gameType", "chaseBetList"]),
    cost() {
      let cost = 0;
      this.chaseList.forEach(item => {
        cost += item.currentPay;
      });
      return fhRound(cost);
    }
  },
  methods: {
    ...mapMutations("bet", [
      "SET_CHASE_BETLIST",
      "UPDATE_GAMEINFO",
	  "DELETE_SHOPPINGLIST",
	  "SET_GAMETYPE"
    ]),
    ...mapActions("bet", ["getPlayList","quickBet", "getGameInfo"]),
    //获取首次倒计时时间
    getTime() {
      this.getGameInfo("/" + this.gameType.kindId).then(() => {
        let time =
          (moment(this.gameInfo.nextRound.awardTime).valueOf() -
            moment(this.currentTime).valueOf()) /
          1000;
        let random = Math.random() * 0.00001;
        this.time = time + random;
      });
    },
    //倒计时为零回调
    timeEnd() {
      let time = gameConfig[this.gameType.kindId].midleTime - 1;
      this.time = time;
      //倒计时为零后，当前期变成上一期，并生成下一期期号
      let prevAwarPeriod = this.gameInfo.nextRound.awarPeriod;
      let prevAwardTime = this.gameInfo.nextRound.awardTime;
      let nextAwarPeriod = this.createChasePeriod(
        prevAwarPeriod,
        1,
        gameConfig[this.gameType.kindId].periodNoAll,
        this.gameType.kindId
      );
      let gameInfo = this.gameInfo;
      gameInfo.nowRound.awarPeriod = prevAwarPeriod;
      gameInfo.nowRound.awardNum = null;
      gameInfo.nowRound.awardTime = prevAwardTime;
      gameInfo.nextRound.awarPeriod = nextAwarPeriod;
      gameInfo.nextRound.awardNum = null;
      gameInfo.nextRound.awardTime = moment(prevAwardTime).add(gameConfig[this.gameType.kindId].midleTime, 'seconds').format('YYYY-MM-DD HH:mm:ss');
      this.UPDATE_GAMEINFO(gameInfo);
      this.generatorChaseList(false);
    },
    goBack() {
      this.$router.push("/shopping");
    },
    //改变追号单条倍数，重新生成追号
    changeTimes(index) {
     this.generatorChaseList(false)
    },
    //修改追号方式
    changeBetType(type) {
      this.confirmBetFields.confirmBetType = type;
	  this.generatorChaseList(true);
    },
    //生成追号方案
    generatorChaseList(isFirst) {
		
      this.chaseList = createChaseList({
        confirmBetFields: this.confirmBetFields,
        betList: this.chaseBetList,
        chaseList: this.chaseList,
        periodNo: this.gameInfo.nextRound.awarPeriod,
        gameType: this.gameType,
        isFirst: isFirst
      });
    },
    //确认投注
    confirmBet() {
      this.isOk = false;
      let chaseBetList = [],
        msg = "";
      this.chaseList.forEach(item => {
        //因为深拷贝特性作此处理
        let obj = JSON.parse(JSON.stringify(this.chaseBetList[0]));
        //验证金额
        if (item.times == 0) {
          msg = "第" + item.periodNo + "期未填写金额";
          return;
        }
        obj.unitPrice *= item.times;
        obj.totalAmount *= item.times;
        obj.periodNo = item.periodNo;
        chaseBetList.push(obj);
      });
      if (msg != "") {
        this.$dialog.toast({
          mes: msg,
          timeout: 1500,
          icon: "error"
        });
        this.isOk = true;
        //终止投注，弹出提示
        return;
      }

      //生成投注参数
      let confirmBetList = [],
        cost = 0; //总价

      chaseBetList.forEach(item => {
        const {
          lotteryNum,
          odds,
          orderNum,
          subGameId,
          totalAmount,
          unitPrice
        } = item;
        cost += item.totalAmount;
        confirmBetList.push({
          lotteryNum: lotteryNum.replace(/\?/g, ""),
          orderNum,
          periodNo: item.periodNo,
          subGameId,
          totalAmount,
          unitPrice
        });
	  });
	  cost = fhRound(cost)
      const params = {
        baseLotteryId: this.gameType.kindId,
        cost,
        orderList: confirmBetList,
        orderType: this.confirmBetFields.orderType,
        orderFrom: "1",
        periodNo: this.gameInfo.nextRound.awarPeriod
      };
      this.quickBet(params).then(res => {
        this.isOk = true;
        if (res.code === 0) {
          this.DELETE_SHOPPINGLIST(this.chaseBetList[0].id);
          this.SET_CHASE_BETLIST([]);
          //投注成功清空购彩篮
          this.$dialog.toast({
            mes: "投注成功",
            timeout: 1500,
            icon: "success"
          });
          setTimeout(() => {
            this.toPath();
          }, 1500);
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500,
            icon: "error"
          });
        }
      });
    },
    //本地生成下一期期号
    createChasePeriod(period, offset, periodNoAll, kindId) {
      let kindIdAry = ["bjpk10", "azssc", "xylhc", "speed", "azpk10", "klft"];
      if (kindIdAry.indexOf(this.kindId) != -1) {
        return parseInt(period) + offset + "";
      } else {
        if (kindId == "fc3d" || kindId == "pl3" || kindId == "hk6") {
          var digit = period.length - 4;
          // 当前期号的日期
          var periodTime = period.substr(0, 4);
          // 转化为moment型，方便后面计算
          var momentTime = moment(periodTime, "YYYY");
          var nowPeriodString = period.substr(4, digit);
          // 当前期号
          var nowPeriod = parseInt(period.substr(4, digit));
          // 目标期号
          var targetPeriod = nowPeriod + offset;
          var targetTime = void 0;
          if (targetPeriod > periodNoAll) {
            targetPeriod -= periodNoAll;
            targetTime = momentTime.add(1, "y").format("YYYY");
          } else {
            targetTime = periodTime;
          }
          var targetPeriodString = targetPeriod + "";
          return targetTime + targetPeriodString.padStart(digit, "0");
        } else {
          var digit = period.length - 8;
          // 当前期号的日期
          var periodTime = period.substr(0, 8);
          // 转化为moment型，方便后面计算
          var momentTime = moment(periodTime, "YYYYMMDD");
          var nowPeriodString = period.substr(8, digit);
          // 当前期号
          var nowPeriod = parseInt(period.substr(8, digit));
          // 目标期号
          var targetPeriod = nowPeriod + offset;
          var targetTime = void 0;
          if (targetPeriod > periodNoAll) {
            targetPeriod -= periodNoAll;
            targetTime = momentTime.add(1, "d").format("YYYYMMDD");
          } else {
            targetTime = periodTime;
          }
          var targetPeriodString = targetPeriod + "";
          return targetTime + targetPeriodString.padStart(digit, "0");
        }
      }
    },
    //前往投注详情
    toPath() {
      this.$router.push({
        path: "/noterecord?status=4"
      });
    }
  }
};
</script>

<style lang="less">
.chase {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .chase-navbar {
    position: relative;
    height: 1rem;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #011935;
    color: #ffffff;
    .back {
      position: absolute;
      left: 0.2rem;
      width: 0.54rem;
      height: 0.54rem;
      background-image: url(../../../images/back.png);
      background-size: 100% 100%;
    }
    .chaseType {
      width: 3.9rem;
      height: 0.6rem;
      border-radius: 0.08rem;
      li {
        box-sizing: border-box;
        width: 50%;
        line-height: 0.6rem;
        color: #a8a8b4;
        text-align: center;
        font-size: 0.32rem;
        font-weight: 600;
        float: left;
        border: 1px solid #fff;
      }
      li:nth-child(1) {
        border-radius: 0.08rem 0 0 0.08rem;
      }
      li:nth-child(2) {
        border-radius: 0 0.08rem 0.08rem 0;
      }
      .active {
        color: #d9213b !important;
        background: #fff;
      }
    }
  }
  .time {
    height: 1rem;
    font-size: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .clock-count {
      color: #ffffff;
      display: inline-block;
      white-space: nowrap;
      font-size: 0.4rem;
      text-align: center;
      font-family: clock-number, "Helvetica Neue For Number", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica,
        Arial, sans-serif;
      span {
        color: rgb(228, 58, 69);
      }
    }
  }
  .btn-wrap {
    background: #fff6e7;
    height: 1rem;
    z-index: 1000;
  }
  .setting {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #011935;
    border-top: 1px solid #011935;
    height: 1rem;
    p {
      display: flex;
      justify-content: center;
      align-items: center;
	  font-size: 0.32rem;
	  .yd-spinner {
              margin: 0.05rem;
              border-radius: 4px;
              width: 0.8rem !important;
              span {
                display: none;
              }
              a {
                display: none;
              }
              .yd-spinner-input {
				width: 100% !important;
				border: 1px solid #cccccc;
				border-radius: 0.08rem
              }
            }
            .yd-spinner-square:before,.yd-spinner-square:after {
              display: none
            }
    }
  }
  .lotteryNum {
    width: 100%;
    height: auto;
    font-size: 0.32rem;
    background: #fcf8ef;
    padding-left: 0 0.2rem;
    line-height: 0.6rem;
    border-bottom: 1px solid #011935;
    p {
      white-space: normal;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
  .chase-table {
    display: block;
    flex: 1;
    width: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    font-size: 0.32rem;
    table {
      width: 100%;
      thead {
        background: #fcf8ef;
        th {
          height: 0.6rem;
          border-left: 1px solid #7e7e7e;
          border-bottom: 1px solid #7e7e7e;
        }
      }
      tbody {
        tr {
          td {
            text-align: center;
          }
        }
        tr:nth-child(even) {
          height: 1rem;
          background: #f5f6fa;
        }
        .yd-spinner {
              margin: 0.05rem;
              border-radius: 4px;
              width: 0.8rem !important;
              span {
                display: none;
              }
              a {
                display: none;
              }
              .yd-spinner-input {
				width: 100% !important;
				border: 1px solid #cccccc;
				border-radius: 0.08rem
              }
            }
            .yd-spinner-square:before,.yd-spinner-square:after {
              display: none
            }
      }
    }
  }
  .footer_box {
    width: 100%;
    font-size: 0.32rem;
    .set_checkbox {
      padding-left: 0.2rem;
      display: flex;
      align-items: center;
      width: 100%;
      height: 0.7rem;
      background: #fcf8ef;
      border-top: 1px solid #7e7e7e;
    }
    .footer {
      color: #ffffff;
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      width: 100%;
      height: 1rem;
      background: #011935 !important;
      border-top: 1px solid #7e7e7e;
      justify-content: space-between;
      .yd-btn {
        background: #d91c32;
      }
    }
  }
  .yd-popup-center {
    width: 6rem !important;
    .set_chase {
      width: 6rem;
      margin: 0 auto;
      .header {
        color: #000000;
        width: 100%;
        height: 0.6rem;
        background: #fcf8ef;
        text-align: center;
        line-height: 0.6rem;
		border-radius: 4px 4px 0 0;
		font-size: 0.32rem;
      }
      .conent {
        width: 6rem;
        border-top: 1px solid #7e7e7e;
        .item1 {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 0.1rem 0.2rem;
          width: 100%;
          height: 1.4rem;
          background: #ffffff;
          p {
            display: flex;
            align-items: center;
          }
        }
      }
      .radio_sel {
        padding-left: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-top: 1px solid #7e7e7e;
        border-bottom: 1px solid #7e7e7e;
		height: 3rem;
        background: #ffffff;
        .yd-radio {
          .yd-radio-icon {
            margin-right: 0.1rem;
          }
          display: flex;
          align-items: center;
          .yd-radio-text {
            display: flex;
            align-items: center;
            .yd-spinner {
              margin: 0.05rem;
              border-radius: 4px;
              width: 0.8rem !important;
              span {
                display: none;
              }
              a {
                display: none;
              }
              .yd-spinner-input {
				width: 100% !important;
				border: 1px solid #cccccc;
				border-radius: 0.08rem
              }
            }
            .yd-spinner-square:before,.yd-spinner-square:after {
              display: none
            }
          }
        }
      }
      .footer {
        width: 100%;
        height: 1rem;
        background: #ffffff;
        border-radius: 0 0 4px 4px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
}
</style>