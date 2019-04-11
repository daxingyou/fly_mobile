<template>
	<div>
		<div v-if="$parent.isLottery" @click.stop="$parent.isLottery=false" style="position: absolute;top: 0;bottom: 0;left: 0;right:0;z-index: 999;"></div>
		<transition name="fade">
			<div class="lottery-details" :style="{height:$parent.isLottery?'6rem':'0rem'}">
				<div class="listInfo">
					<div class="tab-title">
						<div class="left">
							<a>期数</a>
						</div>
						<div class="right">
							<a v-for="(item,index) in filterTitles" @click="changeActiveIndex(index)" :class="{active:index===activeIndex}">{{item}}</a>
						</div>
					</div>
					<div class="tab-content">
						<div v-if="gameType.classId==1" class="ftc">
							<div class="tab-item" v-for="(item1,index1) in showList.lg">
								<div class="left">{{showList.awardPeriod[index1]}}</div>
								<div class="right">
									<div class="nums-wrap" v-if="activeIndex==0">
										<span class="round" v-for="(item2,index2) in showList.numbers[index1]">{{item2}}</span>
										<span style="width: 0.4rem;display: inline-block;font-size: 0.32rem;color: red;margin: 0 0.1rem;">{{showList.numbers[index1].reduce((prev, item) => Number(prev) + Number(item), 0)}}</span>
										<span style="width: 0.8rem;display: inline-block;font-size: 0.32rem;margin: 0 0.1rem;">跨度:</span>
										<span style="width: 0.1rem;display: inline-block;font-size: 0.32rem;margin: 0 0.1rem;">{{sort(showList.numbers[index1])[2]-sort(showList.numbers[index1])[0]}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==1">
										<span :class="'num-round '+item2.className" v-for="(item2,index2) in showList.ballBS[index1]">{{item2.value}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==2">
										<span :class="'num-round '+item2.className" v-for="(item2,index2) in showList.ballOE[index1]">{{item2.value}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==3">
										<span :class="'num-round '+item2.className" v-for="(item2,index2) in showList.ballSum[index1]">{{item2.value}}</span>
									</div>
								</div>
							</div>
						</div>

						<div v-if="gameType.classId==2" class="lhc">
							<div class="tab-item" v-for="(item1,index1) in lhcList.lg">
								<div class="left">{{lhcList.awardPeriod[index1]}}</div>
								<div class="right">
									<div  class="nums-wrap" v-if="activeIndex==0">
										<div v-if="index2<=5" v-for="(item2,index2) in lhcList.numbers[index1]">
                      <span :class="'round '+colorType[item2]">{{item2}}</span>
                      <p class="name">{{lhcList.tczName[index1][index2]}}</p>
                    </div>
                    <div style="font-size:0.28rem;font-weight: 600;">
                      +
                    </div>
                    <div v-if="index2>5" v-for="(item2,index2) in lhcList.numbers[index1]">
                      <span :class="'round '+colorType[item2]">{{item2}}</span>
                      <p class="name">{{lhcList.tczName[index1][index2]}}</p>
                    </div>
									</div>
									<div class="nums-wrap" v-if="activeIndex==1">
                    <span class="num-round sum" v-if="index2==0" v-for="(item2,index2) in lhcList.sum[index1]">{{item2.value}}</span>
										<span :class="'num-round '+item2.className" v-if="index2!=0" v-for="(item2,index2) in lhcList.sum[index1]">{{item2.value}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==2">
                    <span v-if="index2==0" :class="'round '+colorType[item2]" v-for="(item2,index2) in lhcList.teCode[index1]">{{item2}}</span>
                    <span v-if="index2==1" class="num-round sum" v-for="(item2,index2) in lhcList.teCode[index1]">{{item2}}</span>
										<span v-if="index2!=0&&index2!=1" :class="'num-round '+item2.className" v-for="(item2,index2) in lhcList.teCode[index1]">{{item2.value}}</span>
									</div>
								</div>
							</div>
						</div>

						<div v-if="gameType.classId==3" class="ssc">
							<div class="tab-item" v-for="(item1,index1) in showList.lg">
								<div class="left">{{showList.awardPeriod[index1]}}</div>
								<div class="right">
									<div class="nums-wrap" v-if="activeIndex==0">
										<span class="round" v-for="(item2,index2) in showList.numbers[index1]">{{item2}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==1">
										<span :class="'num-round '+item2.className" v-for="(item2,index2) in showList.ballBS[index1]">{{item2.value}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==2">
										<span :class="'num-round '+item2.className" v-for="(item2,index2) in showList.ballOE[index1]">{{item2.value}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==3">
										<span :class="index2==0?'num-round sum ':'num-round '+item2.className" v-for="(item2,index2) in showList.ballSum[index1]">{{item2.value}}</span>
									</div>
								</div>
							</div>
						</div>

						<div v-if="gameType.classId==4" class="ks">
							<div class="tab-item" v-for="(item1,index1) in showList.lg">
								<div class="left">{{showList.awardPeriod[index1]}}</div>
								<div class="right">
									<div class="nums-wrap" v-if="activeIndex==0">
										<span :class="'round sz'+item2" v-for="(item2,index2) in showList.numbers[index1]"></span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==1">
										<span :class="'num-round '+item2.className" v-for="(item2,index2) in showList.ballBS[index1]">{{item2.value}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==2">
										<span :class="'num-round '+item2.className" v-for="(item2,index2) in showList.ballOE[index1]">{{item2.value}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==3">
										<span :class="index2==0?'num-round sum ':'num-round '+item2.className" v-for="(item2,index2) in showList.ballSum[index1]">{{item2.value}}</span>
									</div>
								</div>
							</div>
						</div>

						<div v-if="gameType.classId==5" class="llx5">
							<div class="tab-item" v-for="(item1,index1) in showList.lg">
								<div class="left">{{showList.awardPeriod[index1]}}</div>
								<div class="right">
									<div class="nums-wrap" v-if="activeIndex==0">
										<span class="round" v-for="(item2,index2) in showList.numbers[index1]">{{item2}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==1">
										<span :class="'num-round '+item2.className" v-for="(item2,index2) in showList.ballBS[index1]">{{item2.value}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==2">
										<span :class="'num-round '+item2.className" v-for="(item2,index2) in showList.ballOE[index1]">{{item2.value}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==3">
										<span :class="index2==0?'num-round sum ':'num-round '+item2.className" v-for="(item2,index2) in showList.ballSum[index1]">{{item2.value}}</span>
									</div>
								</div>
							</div>
						</div>

						<div v-if="gameType.classId==6" class="pk10">
							<div class="tab-item" v-for="(item1,index1) in showList.lg">
								<div class="left">{{showList.awardPeriod[index1]}}</div>
								<div class="right">
									<div class="nums-wrap" v-if="activeIndex==0">
										<span :class="'round round-'+item2" v-for="(item2,index2) in showList.numbers[index1]"></span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==1">
										<span :class="'num-round '+item2.className" v-for="(item2,index2) in showList.ballBS[index1]">{{item2.value}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==2">
										<span :class="'num-round '+item2.className" v-for="(item2,index2) in showList.ballOE[index1]">{{item2.value}}</span>
									</div>
									<div class="nums-wrap" v-if="activeIndex==3">
										<span :class="index2==0?'num-round sum ':'num-round '+item2.className" v-for="(item2,index2) in showList.ballSum[index1]">{{item2.value}}</span>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
				<div class="lott-icon" @click="$parent.isLottery=!$parent.isLottery">
					<img :class="$parent.isLottery?'rotate':''" src="../style/img/lott-icon.png" />
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import gameConfig from "../createconfig/gameConfig";
import colorType from "../createconfig/colorType";
export default {
  data() {
    return {
      colorType:colorType,
      filterTitles: [],
      activeIndex: 0,
      gameInfo: [],
      showList: {
        numbers: [],
        ballBS: [],
        ballOE: [],
        ballSum: [],
        awardPeriod: [],
        lg: 0
      },
      lhcList: {
        numbers: [],
        tczName:[],
        sum: [],
        teCode: [],
        awardPeriod: [],
        lg: 0
      }
    };
  },
  created() {
    this.getGameInfoOrShowList();
  },
  computed: {
    ...mapState(["msg"]),
    ...mapState("bet", ["gameType"])
  },
  methods: {
    ...mapActions("bet", ["recentOpenCode"]),
    getGameInfoOrShowList() {
      //获取30期开奖历史数据
      this.recentOpenCode("/" + this.gameType.kindId).then(res => {
        if (res.code == 0) {
          this.gameInfo = res.data;
          this.getShowList();
        }
      });
    },
    //获取展示列表数据及获取分类名称集合
    getShowList() {
      switch (this.gameType.classId) {
        case "1":
          this.filterTitles = ["号码", "大小", "单双", "质合"];
          this.showList = this.getFtcList();
          break;
        case "2":
          this.filterTitles = ["号码", "总和", "特码"];
          this.lhcList = this.getLhcList();
          break;
        case "3":
        case "4":
        case "5":
          this.filterTitles = ["号码", "大小", "单双", "总和"];
          this.showList = this.getRoutineList();
          console.log(this.showList);
          break;
        case "6":
          this.filterTitles = ["号码", "大小", "单双", "冠亚龙虎"];
          this.showList = this.getPkTenList();
          break;
        default:
          break;
      }
    },
    //福体彩
    getFtcList() {
      let arr = {
        numbers: [],
        ballBS: [],
        ballOE: [],
        ballSum: [],
        awardPeriod: [],
        lg: 0
      };
      this.gameInfo.forEach(item => {
        let numbers = [],
          ballBS = [],
          ballOE = [],
          ballSum = [];
        if (item.awardNum) {
          numbers = item.awardNum.split(",");
          arr.numbers.push(numbers);
          numbers.forEach(label => {
            let bs = {},
              oe = {},
              pc = {};
            if (Number(label) >= 5) {
              bs.value = "大";
              bs.className = "orange";
            } else {
              bs.value = "小";
              bs.className = "blue";
            }
            if (Number(label) % 2 == 0) {
              oe.value = "双";
              oe.className = "orange";
            } else {
              oe.value = "单";
              oe.className = "blue";
            }
            if (["1", "2", "3", "5", "7"].indexOf(label) == -1) {
              pc.value = "合";
              pc.className = "orange";
            } else {
              pc.value = "质";
              pc.className = "blue";
            }
            ballBS.push(bs);
            ballOE.push(oe);
            ballSum.push(pc);
          });
          arr.awardPeriod.push(item.awardPeriod);
          arr.ballBS.push(ballBS);
          arr.ballOE.push(ballOE);
          arr.ballSum.push(ballSum);
          arr.lg++;
        }
      });
      return arr;
    },
    //六合彩
    getLhcList() {
      let arr = {
        numbers: [],
        sum: [],
        teCode: [],
        awardPeriod: [],
        tczName:[],
        lg: 0
      };
      this.gameInfo.forEach(item => {
        let numbers = [],
          sum = [],
          tczName = [],
          teCode = [];
        if (item.awardNum) {
          let sm = {},
              oe = {},
              bs = {},
              toe = {},
              tbs = {},
              hoe = {},
              hbs = {},
              wbs = {},
              tmNum,
              tmName;
          numbers = item.awardNum.split(",");
          tczName = this.getSumOfballsHk6(numbers);
          tmNum = Number(numbers[6]);
          tmName = tczName[6];
          arr.numbers.push(numbers);
          arr.tczName.push(tczName)
          sm.value = numbers.reduce(function(prev, curr, idx, arr) {
							return prev * 1 + curr * 1;
						});
						if(sm.value % 2 == 0) {
              oe.value = "总和双"
              oe.className = "orange";
						} else {
              oe.value = "总和单"
              oe.className = "blue";
						}
						if(sm.value >= 175) {
              bs.value = "总和大"
              bs.className = "orange";
						} else {
              bs.value = "总和小"
              bs.className = "blue";
            }
            if(tmNum % 2 == 0) {
              toe.value = "双"
              toe.className = "orange";
						} else {
              toe.value = "单"
              toe.className = "blue";
						}
						if(tmNum >= 25) {
              tbs.value = "大"
              tbs.className = "orange";
						} else if(tmNum <= 24) {
							tbs.value = "小"
              tbs.className = "blue";
						} else if(tmNum == 49) {
							tbs.value = "和"
              tbs.className = "green";
            }
            //特码第一位+第二位的和判断单双
						if((Number(numbers[6][0]) + Number(numbers[6][1])) % 2 == 0) {
              hoe.value = "合双"
              hoe.className = "orange";
						} else {
              hoe.value = "合单"
              hoe.className = "blue";
            }
            //特码第一位+第二位的和 ,大于等于7为大，小于等于6为小,特码号码为49则为和局
						if((Number(numbers[6][0]) + Number(numbers[6][1])) >= 7) {
              hbs.value = "合大"
              hbs.className = "orange";
						} else if((Number(numbers[6][0]) + Number(numbers[6][1])) <= 6) {
							hbs.value = "合小"
              hbs.className = "blue";
						} else if(tmNum == 49) {
              hbs.value = "和局"
              hbs.className = "green";
            }
            //特码第二位的和 ,大于等于5为大，小于等于4为小,特码号码为49则为和局
						if(Number(numbers[6][1]) >= 5) {
						  wbs.value = "尾大"
              wbs.className = "orange";
						} else if(numbers[6][1] * 1 <= 4) {
              wbs.value = "尾小"
              wbs.className = "blue";
						} else if(tmNum == 49) {
							wbs.value = "和局"
              wbs.className = "green";
						}
          sum.push(sm)
          sum.push(oe)
          sum.push(bs)
          teCode.push(tmNum);
          teCode.push(tmName);
          teCode.push(toe);
          teCode.push(tbs)
          teCode.push(hoe)
          teCode.push(hbs)
          teCode.push(wbs)
          arr.awardPeriod.push(item.awardPeriod);
          arr.sum.push(sum);
          arr.teCode.push(teCode);
          arr.lg++;
        }
      });
      console.log(arr)
      return arr;
    },
    //pk10
    getPkTenList() {
      let arr = {
        numbers: [],
        ballBS: [],
        ballOE: [],
        ballSum: [],
        awardPeriod: [],
        lg: 0
      };
      this.gameInfo.forEach(item => {
        let numbers = [],
          ballBS = [],
          ballOE = [];
        if (item.awardNum) {
          numbers = item.awardNum.split(",");
          arr.numbers.push(numbers);
          numbers.forEach(label => {
            let bs = {},
              oe = {};
            if (Number(label) >= 5) {
              bs.value = "大";
              bs.className = "orange";
            } else {
              bs.value = "小";
              bs.className = "blue";
            }
            if (Number(label) % 2 == 0) {
              oe.value = "双";
              oe.className = "orange";
            } else {
              oe.value = "单";
              oe.className = "blue";
            }
            ballBS.push(bs);
            ballOE.push(oe);
          });
          arr.awardPeriod.push(item.awardPeriod);
          arr.ballBS.push(ballBS);
          arr.ballOE.push(ballOE);
          arr.ballSum.push(this.getSumOfballs_pk10(numbers));
          arr.lg++;
        }
      });

      return arr;
    },
    //时时彩,快三,11选5
    getRoutineList() {
      let arr = {
        numbers: [],
        ballBS: [],
        ballOE: [],
        ballSum: [],
        awardPeriod: [],
        lg: 0
      };
      this.gameInfo.forEach(item => {
        let numbers = [],
          ballBS = [],
          ballOE = [];
        if (item.awardNum) {
          numbers = item.awardNum.split(",");
          arr.numbers.push(numbers);
          numbers.forEach(label => {
            let bs = {},
              oe = {};
            if (Number(label) >= 5) {
              bs.value = "大";
              bs.className = "orange";
            } else {
              bs.value = "小";
              bs.className = "blue";
            }
            if (Number(label) % 2 == 0) {
              oe.value = "双";
              oe.className = "orange";
            } else {
              oe.value = "单";
              oe.className = "blue";
            }
            ballBS.push(bs);
            ballOE.push(oe);
          });
          arr.awardPeriod.push(item.awardPeriod);
          arr.ballBS.push(ballBS);
          arr.ballOE.push(ballOE);
          arr.ballSum.push(this.getSumOfballs(numbers));
          arr.lg++;
        }
      });
      return arr;
    },
    getSumOfballs(resultArray) {
      let showNumbers = [],
        animationList = [],
        ballSum = "",
        ballSumText = "",
        ballTD = {},
        ballOE = {},
        ballBS = {},
        max = gameConfig[this.gameType.kindId].max,
        min = gameConfig[this.gameType.kindId].min,
        numbers = gameConfig[this.gameType.kindId].numbers;
      ballSum = resultArray.reduce((prev, item) => (prev += parseInt(item)), 0);
      ballSumText = ballSum + "";
      const firstNumber = parseInt(resultArray[0]);
      const lastNumber = parseInt(resultArray[resultArray.length - 1]);
      const sumMax = numbers * max,
        sumMin = numbers * min;
      const sumMiddle = Math.ceil((sumMax - sumMin) / 2 + sumMin);
      if (firstNumber > lastNumber) {
        ballTD.value = "龙";
        ballTD.className = "blue";
      } else if (firstNumber < lastNumber) {
        ballTD.value = "虎";
        ballTD.className = "orange";
      } else {
        ballTD.value = "和";
        ballTD.className = "green";
      }

      if (ballSum % 2 === 0) {
        ballOE.value = "双";
        ballOE.className = "orange";
      } else {
        ballOE.value = "单";
        ballOE.className = "blue";
      }

      if (ballSum >= sumMiddle) {
        ballBS.value = "大";
        ballBS.className = "orange";
      } else {
        ballBS.value = "小";
        ballBS.className = "blue";
      }
      return [
        {
          value: ballSumText
        },
        ballBS,
        ballOE,
        ballTD
      ];
    },
    getSumOfballs_pk10(resultArray) {
      let ary = [];
      let item1 = {},
        item2 = {},
        item3 = {},
        item4 = {},
        item5 = {},
        item6 = {},
        item7 = {},
        item8 = {};
      if (resultArray) {
        item1.value = resultArray[0] * 1 + resultArray[1] * 1;
        item1.className = "num-round wauto";
        if (item1.value < 12) {
          item2.value = "小";
          item2.className = "num-round blue";
        } else {
          item2.value = "大";
          item2.className = "num-round orange";
        }
        if (item1.value % 2 == 0) {
          item3.value = "双";
          item3.className = "num-round orange";
        } else {
          item3.value = "单";
          item3.className = "num-round blue";
        }
        if (resultArray[0] * 1 > resultArray[9] * 1) {
          item4.value = "龙";
          item4.className = "num-round blue";
        } else {
          item4.value = "虎";
          item4.className = "num-round orange";
        }
        if (resultArray[1] * 1 > resultArray[8] * 1) {
          item5.value = "龙";
          item5.className = "num-round blue";
        } else {
          item5.value = "虎";
          item5.className = "num-round orange";
        }
        if (resultArray[2] * 1 > resultArray[7] * 1) {
          item6.value = "龙";
          item6.className = "num-round blue";
        } else {
          item6.value = "虎";
          item6.className = "num-round orange";
        }
        if (resultArray[3] * 1 > resultArray[6] * 1) {
          item7.value = "龙";
          item7.className = "num-round blue";
        } else {
          item7.value = "虎";
          item7.className = "num-round orange";
        }
        if (resultArray[4] * 1 > resultArray[5] * 1) {
          item8.value = "龙";
          item8.className = "num-round blue";
        } else {
          item8.value = "虎";
          item8.className = "num-round orange";
        }
        ary.push(item1);
        ary.push(item2);
        ary.push(item3);
        ary.push(item4);
        ary.push(item5);
        ary.push(item6);
        ary.push(item7);
        ary.push(item8);
        return ary
      }

    },
    sort(arr) {
      for (var j = 0; j < arr.length - 1; j++) {
        for (var i = 0; i < arr.length - 1 - j; i++) {
          if (arr[i] > arr[i + 1]) {
            var temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
          }
        }
      }
      return arr;
    },
    getSumOfballsHk6(lotteryNumbers) {
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
      lotteryNumbers.forEach(item => {
        arr.push(obj[item]);
      });
      return arr;
    },

    showLotteryDetails() {
      this.$parent.isLottery = !this.$parent.isLottery;
    },
    changeActiveIndex(index) {
      this.activeIndex = index;
    }
  },
  watch: {
    gameType() {
      this.getGameInfoOrShowList();
      this.activeIndex = 0;
    },
    msg(newMsg) {
      let msg = JSON.parse(newMsg);
      if (msg.messageType == "3") {
        if (msg.lotteryId == this.gameType.kindId) {
          this.getGameInfoOrShowList();
        }
      }
    }
  }
};
</script>

<style lang="less">
.lottery-details {
  position: absolute;
  top: 2.8rem;
  width: 100%;
  height: 0rem;
  z-index: 1000;
  transition: all 0.3s;
  border-bottom: 1px solid #cccccc;
  .lott-icon {
    background: #fff;
    width: 1.2rem;
    height: 0.4rem;
    z-index: 1;
    border: 1px solid #c5cad0;
    border-top: none;
    border-radius: 0 0 0.08rem 0.08rem;
    position: absolute;
    left: 50%;
    margin-left: -0.6rem;
    bottom: -0.4rem;
    transition: all 0.3s;
    img {
      margin-left: 0.4rem;
      width: 0.4rem;
      height: 0.4rem;
      transition: all 0.3s;
    }
    img.rotate {
      transform: rotate(180deg);
    }
  }
  .listInfo {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .tab-title {
      background: #ededed;
      padding: 0;
      height: 0.6rem;
      display: -ms-flexbox;
      display: flex;
      font-size: 14px;
      border-right: 1px solid rgb(215, 215, 215);
      .left {
        -ms-flex: 2;
        flex: 2;
        line-height: 0.6rem;
        text-align: center;
        overflow: hidden;
      }
      .right {
        -ms-flex: 5;
        flex: 5;
        line-height: 0.6rem;
        text-align: center;
        overflow: hidden;
        a {
          padding: 0.05rem 0.18rem;
          margin: 0 0.05rem;
          background: #2061b3;
          color: #fff;
          text-decoration: none;
          border-radius: 2px;
        }
        a.active {
          background: #fff;
          color: #111;
        }
      }
    }
    .tab-content {
      position: relative;
      -ms-flex: 1;
      flex: 1;
      background: #fff;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      .pk10 {
        .tab-item {
          display: -ms-flexbox;
          display: flex;
          height: 0.6rem;
          border-bottom: 1px solid #d7d7d7;
          .left {
            -ms-flex: 2;
            flex: 2;
            font-size: 14px;
            line-height: 0.6rem;
            color: #1378bd;
            text-align: center;
          }
          .right {
            -ms-flex: 5;
            flex: 5;
            .nums-wrap {
              height: 100%;
              display: -ms-flexbox;
              display: flex;
              -ms-flex-align: center;
              align-items: center;
              -ms-flex-pack: center;
              justify-content: center;
              .round {
                display: inline-block;
                width: 0.4rem;
                height: 0.4rem;
                font-size: 14px;
                text-align: center;
                margin: 0 0.05rem;
              }
              .round-01 {
                background: url(../style/img/01.png);
                background-size: 100% 100%;
              }
              .round-02 {
                background: url(../style/img/02.png);
                background-size: 100% 100%;
              }
              .round-03 {
                background: url(../style/img/03.png);
                background-size: 100% 100%;
              }
              .round-04 {
                background: url(../style/img/04.png);
                background-size: 100% 100%;
              }
              .round-05 {
                background: url(../style/img/05.png);
                background-size: 100% 100%;
              }
              .round-06 {
                background: url(../style/img/06.png);
                background-size: 100% 100%;
              }
              .round-07 {
                background: url(../style/img/07.png);
                background-size: 100% 100%;
              }
              .round-08 {
                background: url(../style/img/08.png);
                background-size: 100% 100%;
              }
              .round-09 {
                background: url(../style/img/09.png);
                background-size: 100% 100%;
              }
              .round-10 {
                background: url(../style/img/10.png);
                background-size: 100% 100%;
              }
              .num-round {
                display: inline-block;
                width: 0.4rem;
                height: 0.4rem;
                border-radius: 0.08rem;
                line-height: 0.4rem;
                text-align: center;
                font-size: 14px;
                border: 1px solid #d7d7d7;
                margin: 0 0.05rem;
                color: #fff;
              }
              .num-round.orange {
                background-color: orange;
              }
              .num-round.blue {
                background-color: blue;
              }
              .num-round.green {
                background-color: green;
              }
              .num-round.sum {
                font-size: 0.32rem;
                border: none;
                color: red;
              }
            }
          }
        }
      }
      .lhc {
        .tab-item {
          display: -ms-flexbox;
          display: flex;
          height: auto;
          min-height: 0.6rem;
          border-bottom: 1px solid #d7d7d7;
          .left {
            -ms-flex: 2;
            flex: 2;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1378bd;
            text-align: center;
          }
          .right {
            -ms-flex: 5;
            flex: 5;
            .nums-wrap {
              height: 100%;
              display: -ms-flexbox;
              display: flex;
              -ms-flex-align: center;
              align-items: center;
              -ms-flex-pack: center;
              justify-content: center;
              .round {
                display: inline-block;
                width: 0.66rem;
                height: 0.66rem;
                text-align: center;
                line-height: 0.7rem;
                margin: 0 0.05rem;
                font-weight: 600;
                font-size: 14px;
                color: #333333;
              }
              .round.red  {
                background: url(../style/img/bo_red_bg.png);
                background-size: 100% 100%;
              }
              .round.blue  {
                background: url(../style/img/bo_blue_bg.png);
                background-size: 100% 100%;
              }
              .round.green  {
                background: url(../style/img/bo_green_bg.png);
                background-size: 100% 100%;
              }
              .name{
                font-size: 0.28rem;
                text-align: center
              }
              .num-round {
                display: inline-block;
                width: auto;
                padding: 0 0.1rem;
                height: 0.54rem;
                border-radius: 0.08rem;
                line-height: 0.54rem;
                text-align: center;
                font-size: 14px;
                border: 1px solid #d7d7d7;
                margin: 0 0.05rem;
                color: #fff;
              }
              .num-round.orange {
                background-color: orange;
              }
              .num-round.blue {
                background-color: blue;
              }
              .num-round.green {
                background-color: green;
              }
              .num-round.sum {
                font-size: 0.32rem;
                border: none;
                color: red;
              }
            }
          }
        }
      }
      .ks {
        .tab-item {
          display: -ms-flexbox;
          display: flex;
          height: 0.6rem;
          border-bottom: 1px solid #d7d7d7;
          .left {
            -ms-flex: 2;
            flex: 2;
            font-size: 14px;
            line-height: 0.6rem;
            color: #1378bd;
            text-align: center;
          }
          .right {
            -ms-flex: 5;
            flex: 5;
            .nums-wrap {
              height: 100%;
              display: -ms-flexbox;
              display: flex;
              -ms-flex-align: center;
              align-items: center;
              -ms-flex-pack: center;
              justify-content: center;
              .round {
                display: inline-block;
                width: 0.5rem;
                height: 0.5rem;
                text-align: center;
                margin: 0 0.1rem;
              }
              .round.sz1 {
                background: url(../style/img/sz1.png);
                background-size: 100% 100%;
              }
              .round.sz2 {
                background: url(../style/img/sz2.png);
                background-size: 100% 100%;
              }
              .round.sz3 {
                background: url(../style/img/sz3.png);
                background-size: 100% 100%;
              }
              .round.sz4 {
                background: url(../style/img/sz4.png);
                background-size: 100% 100%;
              }
              .round.sz5 {
                background: url(../style/img/sz5.png);
                background-size: 100% 100%;
              }
              .round.sz6 {
                background: url(../style/img/sz6.png);
                background-size: 100% 100%;
              }
              .num-round {
                display: inline-block;
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
                line-height: 0.5rem;
                text-align: center;
                font-size: 14px;
                border: 1px solid #d7d7d7;
                margin: 0 0.1rem;
                color: #fff;
              }
              .num-round.orange {
                background-color: orange;
              }
              .num-round.blue {
                background-color: blue;
              }
              .num-round.green {
                background-color: green;
              }
              .num-round.sum {
                font-size: 0.32rem;
                border: none;
                color: red;
              }
            }
          }
        }
      }
      .ssc,
      .llx5,
      .ftc {
        .tab-item {
          display: -ms-flexbox;
          display: flex;
          height: 0.6rem;
          border-bottom: 1px solid #d7d7d7;
          .left {
            -ms-flex: 2;
            flex: 2;
            font-size: 14px;
            line-height: 0.6rem;
            color: #1378bd;
            text-align: center;
          }
          .right {
            -ms-flex: 5;
            flex: 5;
            .nums-wrap {
              height: 100%;
              display: -ms-flexbox;
              display: flex;
              -ms-flex-align: center;
              align-items: center;
              -ms-flex-pack: center;
              justify-content: center;
              .round {
                display: inline-block;
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
                line-height: 0.5rem;
                text-align: center;
                font-size: 14px;
                border: 1px solid #d7d7d7;
                margin: 0 0.1rem;
                box-shadow: inset 1px -6px 10px #fff;
                background: #ededed;
                color: #000;
              }
              .num-round {
                display: inline-block;
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
                line-height: 0.5rem;
                text-align: center;
                font-size: 14px;
                border: 1px solid #d7d7d7;
                margin: 0 0.1rem;
                color: #fff;
              }
              .num-round.orange {
                background-color: orange;
              }
              .num-round.blue {
                background-color: blue;
              }
              .num-round.green {
                background-color: green;
              }
              .num-round.sum {
                font-size: 0.32rem;
                border: none;
                color: red;
              }
            }
          }
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter,
.fade-leave-to {
  height: 0;
}
</style>