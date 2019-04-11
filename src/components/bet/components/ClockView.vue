<template>
	<div class="clock-view">
		<InfoLeft @showLotteryDetails="$emit('showLotteryDetails')" />
		<div class="info-right">
			<span class="next-issue">第{{gameInfo.nextRound.awarPeriod}}期</span>
			<span style="font-size:0.24rem">截止</span>
			<CountDown v-if="time!=0" :time="time"  timetype="second" :callback="timeEnd" class="clock-count" />
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import gameConfig from "../createconfig/gameConfig";
import { bus } from "../utils/bus";
import CountDown from "./CountDown";

import InfoLeft from "./InfoLeft";
import { setTimeout } from "timers";
export default {
  components: {
    InfoLeft,
    CountDown
  },
  computed: {
    ...mapState("bet", ["gameInfo", "gameType"])
  },
  data() {
    return {
      time: 0,
      isEnd: false
    };
  },
  created() {
    this.getTime();
  },
  methods: {
    ...mapActions("bet", ["getGameInfo"]),
    ...mapMutations("bet", ["UPDATE_GAMEINFO"]),
    //获取首次倒计时时间
    getTime() {
      // t为需要减去的时间，一般为接口请求所需时间
      let time =
        (moment(this.gameInfo.nextRound.awardTime).valueOf() -
          moment(this.currentTime).valueOf() 
          ) /
        1000;
      if (time <= 0) {
        this.time = gameConfig[this.gameType.kindId].midleTime;
      } else {
        let random = Math.random() * 0.00001;
        this.time = time + random;
      }
    },
    //倒计时结束回调
    timeEnd() {
      //重庆时时彩最后一期到第二天第一期时间间隔为40分钟
      if (this.gameType.kindId == "cqssc") {
        let awarPeriodNumbers = this.gameInfo.nextRound.awarPeriod.slice(8);
        if (
          Number(awarPeriodNumbers) ==
          gameConfig[this.gameType.kindId].periodNoAll
        ) {
          gameConfig["cqssc"].midleTime *= 2;
        }
      }
      //判定是否为最后一期，若为最后一期，从接口拿下一期时间
      if (this.getRestPeriod() == 563) {
        
        this.time = -1;
          this.getGameInfo("/" + this.gameType.kindId).then(res => {
            timeEnd = Date.now();
            this.getTime();
            bus.$emit("timeEnd");
          });
      } else {
        let time = gameConfig[this.gameType.kindId].midleTime - 1;
        this.time = time;
        this.$dialog.toast({
          mes: "第" + this.gameInfo.nextRound.awarPeriod + "期已停止销售",
          timeout: 1500
        });
        //倒计时为零后，当前期变成上一期，并生成下一期期号
        let prevAwarPeriod = this.gameInfo.nextRound.awarPeriod;
        let prevAwardTime = this.gameInfo.nextRound.awardTime;
        let nextAwarPeriod = this.createChasePeriod(
          prevAwarPeriod,
          1,
          gameConfig[this.gameType.kindId].periodNoAll,
          this.gameType.kindId
        );

        let gameInfo = this.gameInfo,
          addSeconds = gameConfig[this.gameType.kindId].midleTime;
        gameInfo.nowRound.awarPeriod = prevAwarPeriod;
        gameInfo.nowRound.awardNum = null;
        gameInfo.nowRound.awardTime = prevAwardTime;
        gameInfo.nextRound.awarPeriod = nextAwarPeriod;
        gameInfo.nextRound.awardNum = null;
        gameInfo.nextRound.awardTime = moment(prevAwardTime)
          .add(addSeconds, "seconds")
          .format("YYYY-MM-DD HH:mm:ss");
        this.UPDATE_GAMEINFO(gameInfo);
        bus.$emit("timeEnd");
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
    },
    //获取当前多少期，以及剩余多少期
    getRestPeriod() {
      const nowRound = this.gameInfo.nowRound;
      const nextRound = this.gameInfo.nextRound;
      let awarPeriod,
        awardNum,
        nowPeriod = 0;
      if (nowRound) {
        awarPeriod = nowRound.awarPeriod;
        awardNum = nowRound.awardNum;
      }
      if (awarPeriod) {
        // 北京赛车的期号是一直累加的
        if (this.gameType.kindId === "bjpk10") {
          const nextTime = moment(this.gameInfo.nextTime);
          nowPeriod =
            (nextTime.hour() * 60 + nextTime.minute() - 580 - 10) / 20;
        } else {
          if (
            this.gameType.kindId == "hk6" ||
            this.gameType.kindId == "pl3" ||
            this.gameType.kindId == "fc3d"
          ) {
            nowPeriod = 1;
          } else {
            nowPeriod = parseInt(awarPeriod.slice(8));
            nowPeriod = isNaN(nowPeriod) ? 0 : nowPeriod;
          }
        }
      }

      const restPeriod = this.gameType.periodNoAll - nowPeriod;
      console.log(restPeriod);
      return restPeriod;
    }
  },
  watch: {
    gameType() {
      this.getTime();
    }
  }
};
</script>

<style lang="less">
.clock-view {
  height: 1.8rem;
  background: linear-gradient(135deg, #132e7b 0, #00c9ca 100%);
  background-size: 100% 100%;
  display: flex;
  color: #f0f0f0;
  z-index: 1000;
  .info-right {
    border-left: 1px solid rgba(255, 255, 255, 0.6);
    flex: 3;
    padding-top: 0.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .next-issue {
      font-size: 0.24rem;
      padding-left: 0.4rem;
      background: url(../../../images/clock.png) no-repeat left;
      background-size: 0.3rem 0.3rem;
    }
    .clock-count {
      width: 100%;
      margin-bottom: 0.12rem;
      color: #ffffff;
      display: inline-block;
      white-space: nowrap;
      font-size: 0.52rem;
      line-height: 0.7rem;
      text-align: center;
      font-family: clock-number, "Helvetica Neue For Number", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica,
        Arial, sans-serif;
    }
  }
}
@font-face {
  font-family: clock-number;
  src: url(../../../../fonts/LED.eot?) format("eot");
  src: url(../../../../fonts/LED.woff) format("woff"),
    url(../../../../fonts/LED.ttf) format("truetype");
}
</style>