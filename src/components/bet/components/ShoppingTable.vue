<template>
	<div class="shopping">
		<header class="shopping-navbar">
			<div class="back" @click="goBack"></div>
			<div>{{gameType.kindName}}</div>
		</header>
		<div class="time">
			<p style="display: flex;justify-content: center;align-items: center;"><p style="line-height: 0.3rem;font-size: 0.36rem;">第{{gameInfo.nextRound.awarPeriod}}期 截止倒数:</p>
			<CountDown v-if="time!=0" :time="time"  timetype="second" :callback="timeEnd" class="clock-count" />
			</p>
		</div>
		<div class="btn-wrap">
           <button class="clear-btn" @click="deleteAllBet">清空列表</button>
		</div>
		<ul class="shopping-list" :class="{'no-order':!totalTicketCount||!cost}">
			<div class="no-text" v-if="!totalTicketCount||!cost"><p>暂无注单 ~ ～</p> 
			<button type="button" @click="toPath" class="yd-btn yd-btn-hollow" style="width: auto;">查看下注详情 &gt;</button>
			</div>
			<li class="list-item" v-for="(item,index) in shoppingList[model]">
				<div class="left">
					<img @click="deleteBet(index)" src="../../../images/del.png">
				</div>
				<div class="center">
					<p style="color: rgb(217, 29, 54)">{{item.lotteryNum}}</p>
					<p><span>{{item.betName}}</span> <span>{{item.orderNum}}注</span></p>
					<p><span>{{item.ticketUnitCost}}倍</span> <span>{{item.totalAmount}}元</span></p>
				</div>
				<div class="right">
					<div class="row" v-if="gameType.classId!='1'&&gameType.classId!='2'&&model!='2'"><span>追</span><yd-spinner :max="1000" unit="1" width="1.4rem" height=".5rem" v-model="item.chasePeriods" :longpress="false"></yd-spinner><span>期</span></div>
					<div class="row"><span>投</span><yd-spinner :max="1000" unit="1" width="1.4rem" height=".5rem" @input="changeTotalAmount(index)" v-model="item.ticketUnitCost" :longpress="false"></yd-spinner><span>倍</span></div>
					<div class="row" v-if="gameType.classId!='1'&&gameType.classId!='2'&&model!='2'"><button class="chase-btn" @click="goChase(item,index)">追号</button></div>
                   
				</div>
			</li>
		</ul>
		<div class="order-box" v-if="totalTicketCount&&cost">
			<p>共
			<span style="color: rgb(217, 29, 54);">
		       {{totalTicketCount}}</span>
			   注，共<span style="color: rgb(217, 29, 54);">{{cost}}</span>元</p>
		</div>
		<div class="order-box" v-else>
			<p><span style="color: rgb(217, 29, 54);">您尚未选择投注</span></p>
		</div>
		<footer class="shopping_footer">
			<yd-button class="bet-btn btn" @click.native="confirmBet" :disabled="!totalTicketCount||!cost||!isOk">确认投注</yd-button>
		</footer>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import gameConfig from "../createconfig/gameConfig";
import CountDown from "./CountDown";
import { fhRound } from "../utils/quickCalc";
import mixin from "../utils/mixins"
export default {
  mixins: [mixin],
  created() {
    if (!this.shoppingList[this.model].length) {
      // this.$router.push('/bet')
    }
    this.getTime();
  },
  data() {
    return {
      time: 0,
      isOk: true
    };
  },
  computed: {
    ...mapState("bet", ["gameInfo", "gameType", "shoppingList","model"]),
    totalTicketCount() {
      let totalTicketCount = 0;
      this.shoppingList[this.model].forEach(item => {
        totalTicketCount += item.orderNum;
      });
      return totalTicketCount;
    },
    cost() {
      let cost = 0;
      this.shoppingList[this.model].forEach(item => {
        cost += item.totalAmount;
      });
      return cost;
    }
  },
  components: {
    CountDown
  },
  methods: {
	...mapActions("bet", ["getPlayList","quickBet", "getGameInfo","lmpbet"]),
    ...mapMutations("bet", [
      "UPDATE_SHOPPINGLIST",
      "SET_CHASE_BETLIST",
      "DELETE_SHOPPINGLIST",
      "DELETE_ALL_SHOPPINGLIST",
	  "UPDATE_GAMEINFO",
	  "SET_GAMETYPE"
    ]),
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
    },
    goBack() {
      this.$router.push("/bet");
    },
    //改变单条注单倍数
    changeTotalAmount(index) {
      var shoppingList = this.shoppingList;
      shoppingList[this.model][index].unitPrice = fhRound(
        shoppingList[this.model][index].ticketUnitCost * shoppingList[this.model][index].ticketUnit
      );
      shoppingList[this.model][index].totalAmount = fhRound(
        shoppingList[this.model][index].ticketUnit *
          shoppingList[this.model][index].ticketUnitCost *
          shoppingList[this.model][index].orderNum
      );
      this.UPDATE_SHOPPINGLIST(shoppingList);
    },
    goChase(item, index) {
      item.id = index;
      //设置追号的注单
      this.SET_CHASE_BETLIST([item]);
      this.$router.push("/chase");
    },
    //前往投注详情
    toPath() {
      this.$router.push({
        path: "/noterecord?status=4"
      });
    },
    //删除一条注单
    deleteBet(index) {
      this.DELETE_SHOPPINGLIST(index);
    },
    //删除全部注单
    deleteAllBet() {
      this.DELETE_ALL_SHOPPINGLIST();
    },
    //确认投注
    confirmBet() {
       this.isOk = false;
      if(this.model=='1'){
    //生成投注参数
      let confirmBetList = [],
        cost = 0; //总价

      this.shoppingList[this.model].forEach(item => {
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
          periodNo: this.gameInfo.nextRound.awarPeriod,
          subGameId,
          totalAmount,
          unitPrice
        });
      });
      const params = {
        baseLotteryId: this.gameType.kindId,
        cost,
        orderList: confirmBetList,
        orderType: "3",
        orderFrom: "0",
        periodNo: this.gameInfo.nextRound.awarPeriod
      };
      this.quickBet(params).then(res => {
        this.isOk = true;
        if (res.code === 0) {
          //投注成功清空购彩篮
          this.deleteAllBet();
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
      }else{
        //两面盘玩法投注
        let params = {};
        params.lotteryId = this.gameType.kindId;
        params.orderFrom = "3";
        params.periodNo = this.gameInfo.nextRound.awarPeriod;
        params.bets = [];
        this.shoppingList[this.model].forEach(item => {
          let obj = {};
          obj.amount = item.totalAmount;
          obj.content = item.lotteryNum;
          obj.gameId = item.subGameId;
          params.bets.push(obj);
        });
       
        this.lmpbet(params).then(res => {
          this.isOk = true;
          if (res.code == 0) {
            //投注成功清空购彩篮
          this.deleteAllBet();
            this.$dialog.toast({
              mes: "下注成功",
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
      }
     
     
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
    }
  }
};
</script>

<style lang="less">
.shopping {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .shopping-navbar {
    position: relative;
    height: 1rem;
    z-index: 1000;
    display: flex;
    font-size: 0.36rem;
    align-items: center;
    justify-content: center;
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
    display: flex;
    align-items: center;
    z-index: 1000;
    .clear-btn {
      text-align: center;
      position: relative;
      border: none;
      pointer-events: auto;
      -webkit-user-select: none;
      -ms-user-select: none;
      -moz-user-select: none;
      user-select: none;
      height: 0.6rem;
      font-size: 0.24rem;
      display: inline-block;
      padding: 0 0.2rem;
      box-sizing: content-box;
      border-radius: 0.03125rem;
      white-space: nowrap;
      background-color: #d91d36;
      margin: 0 0.2rem;
      color: #fff;
    }
  }
  .shopping-list.no-order {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    background-position: center 1rem;
    background-repeat: no-repeat;
    background-image: url(../style/img/no_record_03.png);
    background-size: 4rem 4rem;
    .no-text {
      margin-top: 2.4rem;
      .yd-btn {
        width: auto;
        height: 0.6rem;
        color: #da1c36;
        font-size: 0.35rem;
      }
    }
    .no-text p:first-child {
      height: 0.6rem;
      font-size: 0.3rem;
      font-weight: 700;
      color: #303030;
    }
  }
  .shopping-list {
    flex: 1;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .list-item {
      font-size: 0.32rem;
      height: auto;
      min-height: 2.4rem;
      background: #ffffff;
      box-shadow: 0.07rem 0.01rem 0.07rem 0.02rem #aaa;
      border-bottom: 0.01rem dotted #e6e6e6;
      display: flex;
      align-items: center;
      padding: 0 0.1rem;
      justify-content: space-around;
      .left {
        flex: 1;
      }
      .center {
        flex: 4;
      }
      .right {
        flex: 2;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        .row {
          display: flex;
          justify-content: center;
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
              border-radius: 0.08rem;
            }
          }
          .yd-spinner-square:before,
          .yd-spinner-square:after {
            display: none;
          }
          .chase-btn {
            text-align: center;
            position: relative;
            border: none;
            pointer-events: auto;
            -webkit-user-select: none;
            -ms-user-select: none;
            -moz-user-select: none;
            user-select: none;
            height: 0.6rem;
            font-size: 0.24rem;
            display: inline-block;
            padding: 0 0.14rem;
            box-sizing: content-box;
            border-radius: 0.04125rem;
            white-space: nowrap;
            margin-top: 0.1rem;
            width: 0.8rem;
            height: 0.5rem;
            background: #d91d36;
            color: #fff;
          }
        }
      }
    }
  }
  .order-box {
    z-index: 10;
    width: 100%;
    display: -ms-flexbox;
    display: flex;
    font-size: 12px;
    overflow: hidden;
    background: #f7f3e7;
    height: 0.8rem;
    opacity: 0.8;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .shopping_footer {
    width: 100%;
    box-sizing: border-box;
    background: #011935;
    padding: 0 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1rem;
    .yd-btn-disabled {
      background-color: rgb(204, 204, 204) !important;
    }
    .bet-btn {
      text-align: center;
      position: relative;
      border: none;
      pointer-events: auto;
      -webkit-user-select: none;
      -ms-user-select: none;
      -moz-user-select: none;
      user-select: none;
      height: 0.6rem;
      font-size: 0.24rem;
      display: inline-block;
      padding: 0 0.2rem;
      box-sizing: content-box;
      border-radius: 0.03125rem;
      white-space: nowrap;
      width: 3rem;
      background: #d91d36;
      color: #fff;
    }
  }
}
</style>