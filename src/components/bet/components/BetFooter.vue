<template>
	<div class="bet-footer" ref="betFooter">
		<OrderView :option="{ticketCost,ticketCount}" :newNumbers="newNumbers" :inputValue="ticketUnitCost" :unitPrice="unitPrice"></OrderView>
		<SetUp />
		<OrderTips />
		<div class="btn-group">
			<button class="clear btn" @click="calcBetNumber">清空</button>
			<div style="display: flex;">
				<KeyboardInput :isCursor="isCursor" @showKeyboard="showKeyboard('ticketUnitCost')" placeholder="请输入金额" v-model="ticketUnitCost" />
				<div class="company" @click="setUp">{{unitTxt}}</div>
			</div>
			<button @click="quickConfirmBet" :class="['quick-btn','btn',disabled?'disabled':'']">快捷投注</button>
			<button :class="['shop-btn','btn',shopDisabled?'disabled':'']" @click="goShopping">
				<span v-if="shoppingList[model].length>0" class="yd-badge" style="color: rgb(0, 0, 0); transform: scale(1); position: absolute; top: -0.1rem; right: -0.1rem;">{{shoppingList[model].length}}</span>
				购彩篮
			</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { fhRound } from "../utils/quickCalc";
import { createNmubers_lmp } from "../utils/createNmubers_lmp";
import KeyboardInput from "@/customComponents/keyboard/KeyboardInput";
import SetUp from "./SetUp";
import OrderTips from "./OrderTips";
import OrderView from "./OrderView";
import { bus } from "../utils/bus";
const unitTxts = {'1':'元','0.1':'角','0.01':'分','0.001':'厘'}
export default {
  data() {
    return {
      isCursor: false,
      showSet: false,
      showOrderTips: false,
      ticketUnit: 1, //单位(元角分)
      ticketUnitCost: "" //输入金额
    };
  },
  components: {
    KeyboardInput,
    SetUp,
    OrderTips,
    OrderView
  },
  computed: {
    ...mapState("login", ["userDetails"]),
    ...mapState("bet", [
      "showId",
      "lmpSelectNumbers",
      "model",
      "defaultAmount",
      "orderTips",
      "shoppingList",
      "gameType",
      "gameInfo",
      "betList",
      "betNumbers",
      "ticketCount",
      "betType",
      "betRates",
      "newNumbers"
    ]),
    //单条注单总价
    ticketCost() {
      return fhRound(this.unitPrice * this.ticketCount);
    },
    //单条注单倍数
    unitPrice() {
      return fhRound(this.ticketUnitCost * this.ticketUnit);
    },
    //禁用快捷投注按钮
    disabled() {
      return this.ticketCount < 1;
    },
    //禁止跳转购彩篮(当前注数为零且购彩列表为空)
    shopDisabled() {
      return this.ticketCount < 1 && this.shoppingList[this.model].length < 1;
    },
    unitTxt(){
      return unitTxts[this.ticketUnit]
    }
  },
  created() {
    this.ticketUnitCost = this.defaultAmount;
  },
  methods: {
    ...mapActions("bet", ["quickBet", "lmpbet"]),
    ...mapMutations("bet", [
      "SET_BETLIST",
      "SET_BETNUMBERS",
      "SET_SHOPPINGLIST",
      "SET_LMP_BETNUMBERS",
      "SET_LMP_BETLIST"
    ]),
    quickConfirmBet() {
      //官方玩法投注
      if (this.model == "1") {
        //根据选号生成注单信息
        this.SET_BETLIST({
          betNumbers: this.betNumbers,
          betRate: this.betRates[0],
          betRates: this.betRates,
          betType: this.betType,
          ticketCost: this.ticketCost,
          optionalFields: [],
          ticketUnit: this.ticketUnit,
          ticketUnitCost: this.ticketUnitCost,
          ticketCount: this.ticketCount,
          unitPrice: this.unitPrice
        });
        //生成投注参数
        let confirmBetList = [],
          cost = 0; //总价

        this.betList.forEach(item => {
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
        //金额验证
        let msg = this.checkBet();
        if (msg !== "") {
          this.$dialog.toast({
            mes: msg,
            timeout: 1500
          });
          return;
        }
        this.quickBet(params).then(res => {
          if (res.code === 0) {
            this.$dialog.toast({
              mes: "投注成功",
              timeout: 1500,
              icon: "success"
            });
            this.calcBetNumber();
          } else {
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
              icon: "error"
            });
          }
        });
      } else {
        //两面盘玩法投注
        let ticketTotalCost = 0;
        let params = {};
        params.lotteryId = this.gameType.kindId;
        params.orderFrom = "3";
        params.periodNo = this.gameInfo.nextRound.awarPeriod;
        params.bets = [];
        this.lmpSelectNumbers.forEach(item => {
          let obj = {};
          obj.amount = this.ticketCost;
          ticketTotalCost += this.ticketCost;
          obj.content = item.key.split("_")[1];
          obj.gameId = item.key.split("_")[0];
          params.bets.push(obj);
        });
        let msg = this.checkLmpBet();
        if (msg !== "") {
          this.$dialog.toast({
            mes: msg,
            timeout: 1500
          });
          return;
        }
        this.lmpbet(params).then(res => {
          if (res.code == 0) {
            this.$dialog.toast({
              mes: "下注成功",
              timeout: 1500,
              icon: "success"
            });
            this.calcBetNumber();
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

    //去购彩篮
    goShopping() {
      //没有选中号码，但购彩篮有注单，直接跳过金额验证
      if (this.ticketCount < 1 && this.shoppingList[this.model].length > 0) {
        this.$router.push("/shopping");
        return;
      }
      //选中一注以上且注单提示未关闭，打开注单提示弹窗
      if (this.ticketCount > 0 && this.orderTips == 1) {
        this.showOrderTips = true;
        return;
      }
      //选择一注以上但注单提示关闭
      this.addShopping();
    },
    //金额验证通过添加购彩列表
    addShopping() {
      if (this.model == "1") {
        //根据选号生成注单信息
        this.SET_BETLIST({
          betNumbers: this.betNumbers,
          betRate: this.betRates[0],
          betRates: this.betRates,
          betType: this.betType,
          ticketCost: this.ticketCost,
          optionalFields: [],
          ticketUnit: this.ticketUnit,
          ticketUnitCost: this.ticketUnitCost,
          ticketCost: this.ticketCount * this.unitPrice,
          ticketCount: this.ticketCount,
          unitPrice: this.unitPrice
        });
        //金额验证
        let msg = this.checkBet();
        if (msg !== "") {
          this.$dialog.toast({
            mes: msg,
            timeout: 1500
          });
          return;
        }
      }else{
        var betList = []
        this.lmpSelectNumbers.forEach(item => {
          let obj = {};
          obj.betName = item.title;
          obj.lotteryNum = item.key.split("_")[1];
          obj.subGameId = item.key.split("_")[0];
          obj.totalAmount = this.ticketCost;
          obj.ticketUnit = this.ticketUnit;
          obj.ticketUnitCost = this.ticketUnitCost;
          obj.ticketCost = this.ticketCount * this.unitPrice;
          obj.orderNum = this.ticketCount;
          obj.unitPrice = this.unitPrice;
          betList.push(obj);
        });
        this.SET_LMP_BETLIST(betList)
      }

      //验证通过添加到购彩列表
      this.SET_SHOPPINGLIST(this.betList);
      this.calcBetNumber();
      this.$router.push("/shopping");
    },
    //弹出自制键盘组件
    showKeyboard(value) {
      this.isCursor = true;
      this.$showKeyboard({
        show: true,
        val: this[value],
        callback: val => {
          this[value] = val;
        },
        closeCallback: () => {
          this.isCursor = false;
        }
      });
    },
    //两面盘金额验证
    checkLmpBet() {
      let msg = "";
      const ticketTotalCost = this.lmpSelectNumbers.reduce(
        (prev, item) => prev + item.amount,
        0
      );
      if (this.ticketUnitCost == "" || this.ticketUnitCost < 0) {
        msg = "请输入正确的金额";
        return msg;
      }
      if (this.ticketCount <= 0) {
        msg = "当前注数为 0 ";
        return msg;
      }
      if (this.userDetails.accountBalance < ticketTotalCost) {
        msg = "您的余额不足";
        return msg;
      }
      return msg;
    },
    //官方玩法金额验证
    checkBet() {
      const {
        oneNoteLimit,
        singleLimit,
        wagerMin,
        actualLimit
      } = this.betRates[0];
      const ticketTotalCost = this.betList.reduce(
        (prev, item) => prev + item.totalAmount,
        0
      );
      let msg = "";
      if (this.ticketUnitCost == "" || this.ticketUnitCost < 0) {
        msg = "请输入正确的金额";
        return msg;
      }
      if (this.ticketCount <= 0) {
        msg = "当前注数为 0 ";
        return msg;
      }
      console.log(this.userDetails.accountBalance,ticketTotalCost)
      if (this.userDetails.accountBalance < ticketTotalCost) {
        msg = "您的余额不足";
        return msg;
      }
      if (this.ticketCost > oneNoteLimit) {
        msg = `单注金额上限是 ${oneNoteLimit} 元`;
        return msg;
      }
      if (this.ticketCost + ticketTotalCost > singleLimit) {
        msg = `每次投注金额上限是 ${singleLimit} 元`;
        return msg;
      }
      if (this.ticketCost < wagerMin) {
        msg = `单注最小金额是 ${wagerMin} 元`;
        return msg;
      }
      return msg;
    },
    //清空所有参数
    calcBetNumber() {
      this.ticketUnitCost = this.defaultAmount;
      if (this.model == "1") {
        if (this.betNumbers.numberType == "input") {
          bus.$emit("calcInputText");
        }
        this.SET_BETNUMBERS(this.betType);
      } else {
        this.SET_LMP_BETNUMBERS(
          createNmubers_lmp(this.gameType.classId, this.showId)
        );
      }
      this.SET_BETLIST(null);
    },
    //设置金额倍数等参数
    setUp() {
      this.showSet = true;
    }
  },
  watch: {
    gameType() {
      this.calcBetNumber();
    },
    betType() {
      this.calcBetNumber();
    },
    model() {
      this.calcBetNumber();
    }
  }
};
</script>

<style lang="less">
.bet-footer {
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
  .btn-group {
    background: #011935;
    padding: 0 2.5vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.8rem;
    .input {
      width: 1.5rem;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.14rem;
      background: #f0f0f0;
      border: 1px solid #ddd;
      margin: 0 0.1rem;
      position: relative;
      margin: 0;
      box-sizing: border-box;
      padding-left: 0.03rem;
    }
    .company {
      width: 0.6rem;
      height: 0.6rem;
      text-align: center;
      line-height: 0.6rem;
      color: #fff;
      background: url(../../../images/company.png);
      background-size: 100% 100%;
      margin-left: 0.04rem;
    }
  }
  .btn {
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
    padding: 0 0.3rem;
    box-sizing: content-box;
    border-radius: 0.03rem;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    vertical-align: baseline;
    color: rgb(255, 255, 255);
  }
  .clear.btn {
    background-color: rgb(133, 133, 133);
  }
  .quick-btn.btn {
    background-color: rgb(4, 190, 2);
  }
  .shop-btn.btn {
    background-color: rgb(217, 29, 54);
  }
  .btn.disabled {
    pointer-events: none !important;
    background: rgb(204, 204, 204) !important;
  }
}
</style>