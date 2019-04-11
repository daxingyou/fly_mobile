<template>
	<div class="info-left" @click="$emit('showLotteryDetails')">
		<span class="prev-issue">第{{gameInfo.nowRound.awarPeriod}}期</span>
		<!--六合彩-->
		<ul class="open-num" v-if="gameType.classId==='2'">
			<li class="code" v-for="item in lotteryNumbers">
				<div :class="'code-num num-'+colorType[item]" v-if="isLottery">{{item}}</div>
				<div v-else class="code-num num-grey">?</div>
			</li>
		</ul>
		<!--快三-->
		<ul class="open-num" style="padding: 0 0.3rem;" v-else-if="gameType.classId==='4'">
			<li class="dice" v-for="item in lotteryNumbers">
				<div class="dice-gif" v-if="!isLottery">
				</div>
				<div :class="'dice-num dice-'+item" v-else="isLottery">
				</div>
			</li>
		</ul>
		<!--pk10-->
		<ul class="open-num" v-else-if="gameType.classId==='6'">
			<li class="pk-num" v-for="item in lotteryNumbers">
				<div :class="'pk-'+item"></div>
			</li>
		</ul>
		<!--时时彩,福体彩,11选5-->
		<ul class="open-num" v-else>
			<li class="circle" v-for="item in lotteryNumbers">{{item}}</li>
		</ul>
		<p class="text"><span v-for="item in sumOfballs">{{item}}</span></p>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import gameConfig from "../createconfig/gameConfig";
import colorType from "../createconfig/colorType";
import { bus } from "../utils/bus";
export default {
  data() {
    return {
      timer: null,
      colorType: colorType,
      lotteryNumbers: [],
      isLottery: false,
      sumOfballs: []
    };
  },
  created() {
    this.getLotteryNumbers();
    //监听倒计时为零的事件
    bus.$on("timeEnd", () => {
      this.getLotteryNumbers();
    });
  },
  beforeDestroy() {
    bus.$off("timeEnd");
    clearInterval(this.timer);
  },
  computed: {
    ...mapState(["msg"]),
    ...mapState("bet", ["gameInfo", "gameType"])
  },
  methods: {
    ...mapActions("bet", ["getGameInfo"]),
    //获取开奖号码
    getLotteryNumbers() {
      console.log(this.gameInfo)
      //未开奖时，号码为null,令号码填充
      if (this.gameInfo.nowRound.awardNum) {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.lotteryNumbers = this.gameInfo.nowRound.awardNum.split(",");
        if (this.gameType.classId === "2") {
          //六合彩
          this.sumOfballs = this.getSumOfballsHk6();
        } else if (this.gameType.classId === "6") {
          //pk10
          this.sumOfballs = this.getSumOfballsPk10();
        } else {
          this.sumOfballs = this.getSumOfballs();
        }

        this.isLottery = true;
      } else {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.sumOfballs = Array(
          gameConfig[this.gameType.kindId].sumOfballsLg
        ).fill("-");
        //pk10  未开奖 随机变动号码位置
        if (this.gameType.classId === "6") {
          this.timer = setInterval(() => {
            this.shuffle();
          }, 80);
        } else {
          this.lotteryNumbers = Array(
            gameConfig[this.gameType.kindId].numbers
          ).fill("?");
          this.isLottery = false;
        }
      }
    },
    //随机变换开奖数组内索引
    shuffle() {
      this.lotteryNumbers = _.shuffle([
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10"
      ]);
    },
    getSumOfballs() {
      let resultArray = [],
        showNumbers = [],
        animationList = [],
        ballSum = "",
        ballSumText = "",
        ballTD = "",
        ballOE = "",
        ballBS = "",
        max = gameConfig[this.gameType.kindId].max,
        min = gameConfig[this.gameType.kindId].min,
        numbers = gameConfig[this.gameType.kindId].numbers;
      resultArray = this.lotteryNumbers;
      ballSum = resultArray.reduce((prev, item) => (prev += parseInt(item)), 0);
      ballSumText = ballSum + "";
      const firstNumber = parseInt(resultArray[0]);
      const lastNumber = parseInt(resultArray[resultArray.length - 1]);
      const sumMax = numbers * max,
        sumMin = numbers * min;
      const sumMiddle = Math.ceil((sumMax - sumMin) / 2 + sumMin);
      if (firstNumber > lastNumber) {
        ballTD = "龙";
      } else if (firstNumber < lastNumber) {
        ballTD = "虎";
      } else {
        ballTD = "和";
      }

      if (ballSum % 2 === 0) {
        ballOE = "双";
      } else {
        ballOE = "单";
      }

      if (ballSum >= sumMiddle) {
        ballBS = "大";
      } else {
        ballBS = "小";
      }
      return [ballSumText, ballBS, ballOE, ballTD];
    },
    getSumOfballsHk6() {
      let names = [
        "鼠",
        "牛",
        "虎",
        "兔",
        "龙",
        "蛇",
        "马",
        "羊",
        "猴",
        "鸡",
        "狗",
        "猪"
      ];
      let obj = {};
      let labels = Array(12);
      let year = new Date().getFullYear();
      let animal = year % 12 + 8;
      let number_arr = new Array(12);
      let arr = [];
      for (var i = 0; i < 12; i++) {
        if (i == animal) {
          let first_number = 1;
          let item = [
            String(first_number < 10 ? "0" + first_number : first_number),
            String(first_number + 12),
            String(first_number + 24),
            String(first_number + 36),
            String(first_number + 48)
          ];

          labels.fill(item, i, i + 1);
        } else {
          let first_number = i < animal ? animal - i + 1 : 13 - (i - animal);
          let item = [
            String(first_number < 10 ? "0" + first_number : first_number),
            String(first_number + 12),
            String(first_number + 24),
            String(first_number + 36)
          ];
          labels.fill(item, i, i + 1);
        }
      }
      labels.forEach((item1, index1) => {
        item1.forEach(item2 => {
          obj[item2] = names[index1];
        });
      });
      this.lotteryNumbers.forEach(item => {
        arr.push(obj[item]);
      });
      return arr;
    },
    getSumOfballsPk10() {
      let lhSum,
        arr = [];
      lhSum = Number(this.lotteryNumbers[0]) + Number(this.lotteryNumbers[1]);
      arr.push(lhSum);
      if (lhSum < 12) {
        arr.push("小");
      } else {
        arr.push("大");
      }
      if (lhSum % 2 == 0) {
        arr.push("双");
      } else {
        arr.push("单");
      }
      for (let i = 0, lg = 9; i <= 4 && lg >= 5; i++, lg--) {
        if (Number(this.lotteryNumbers[i]) > Number(this.lotteryNumbers[lg])) {
          arr.push("龙");
        } else {
          arr.push("虎");
        }
      }
      return arr;
    }
  },
  watch: {
    msg(newMsg) {
      let msg = JSON.parse(newMsg);
      if (msg.messageType == "3") {
        if (msg.lotteryId == this.gameType.kindId) {
          this.getGameInfo("/" + this.gameType.kindId).then(() => {
            this.getLotteryNumbers();
          });
        }
      }
    },
    gameType() {
      this.getLotteryNumbers();
    }
  }
};
</script>

<style lang="less">
.info-left {
  padding-top: 0.1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 5;
  .prev-issue {
    font-size: 0.24rem;
    padding-left: 0.4rem;
    background: url(../../../images/bell.png) no-repeat left;
    background-size: 0.3rem 0.3rem;
  }
  .open-num {
    display: flex;
    width: 100%;
    justify-content: space-around;
    .circle {
      width: 0.8rem;
      height: 0.8rem;
      background: #000;
      color: #ffffff;
      border-radius: 50%;
      font-size: 0.48rem;
      font-weight: 900;
      line-height: 0.8rem;
      text-align: center;
    }
    .dice {
      margin-bottom: -0.1rem;
      .dice-gif {
        width: 0.9rem;
        height: 0.9rem;
        background-image: url(../style/img/dice_gif_01.gif);
        background-size: 100% 100%;
      }
      .dice-num {
        width: 0.9rem;
        height: 0.9rem;
      }
      .dice-1 {
        background-image: url(../style/img/fast1.png);
        background-size: 100% 100%;
      }
      .dice-2 {
        background-image: url(../style/img/fast2.png);
        background-size: 100% 100%;
      }
      .dice-3 {
        background-image: url(../style/img/fast3.png);
        background-size: 100% 100%;
      }
      .dice-4 {
        background-image: url(../style/img/fast4.png);
        background-size: 100% 100%;
      }
      .dice-5 {
        background-image: url(../style/img/fast5.png);
        background-size: 100% 100%;
      }
      .dice-6 {
        background-image: url(../style/img/fast6.png);
        background-size: 100% 100%;
      }
    }
    .code {
      .code-num {
        width: 0.7rem;
        height: 0.7rem;
        text-align: center;
        line-height: 0.74rem;
        font-size: 0.32rem;
        font-weight: 600;
        color: #333333;
      }
      .num-red {
        background: url(../style/img/bo_red_bg.png);
        background-size: 100% 100%;
      }
      .num-blue {
        background: url(../style/img/bo_blue_bg.png);
        background-size: 100% 100%;
      }
      .num-green {
        background: url(../style/img/bo_green_bg.png);
        background-size: 100% 100%;
      }
      .num-grey {
        background: url(../style/img/bo_grey_bg.png);
        background-size: 100% 100%;
      }
    }
    .pk-num {
      div {
        width: 0.4rem;
        height: 0.4rem;
      }
      .pk-01 {
        background: url(../style/img/01.png);
        background-size: 100% 100%;
      }
      .pk-02 {
        background: url(../style/img/02.png);
        background-size: 100% 100%;
      }
      .pk-03 {
        background: url(../style/img/03.png);
        background-size: 100% 100%;
      }
      .pk-04 {
        background: url(../style/img/04.png);
        background-size: 100% 100%;
      }
      .pk-05 {
        background: url(../style/img/05.png);
        background-size: 100% 100%;
      }
      .pk-06 {
        background: url(../style/img/06.png);
        background-size: 100% 100%;
      }
      .pk-07 {
        background: url(../style/img/07.png);
        background-size: 100% 100%;
      }
      .pk-08 {
        background: url(../style/img/08.png);
        background-size: 100% 100%;
      }
      .pk-09 {
        background: url(../style/img/09.png);
        background-size: 100% 100%;
      }
      .pk-10 {
        background: url(../style/img/10.png);
        background-size: 100% 100%;
      }
    }
  }
  .text {
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    margin-bottom: 0.12rem;
    font-size: 0.28rem;
    display: flex;
    justify-content: space-around;
    span {
      display: inline-block;
      /*width: 0.2rem;*/
    }
  }
}
</style>