<template>
	<div class="bet-content"  @touchmove="touchmove" @touchend="touchend">
		<scroller v-if="!LHCList[betNumbers.subGameId]">
			<div class="set">
				<ul class="set_model" v-if="gameType.classId=='3'||gameType.classId=='6'">
					<li :class="model=='1'?'active':''" @touchend="changeModel('1')">官</li>
					<li :class="model=='2'?'active':''" @touchend="changeModel('2')">传</li>
				</ul>
				<div v-else></div>
				<yd-radio-group v-model="hasSub" color="#000000" size="15" v-if="betNumbers.hasSub">
					<yd-radio val="hotCold">冷热</yd-radio>
					<yd-radio val="omit">遗漏</yd-radio>
				</yd-radio-group>
			</div>
			<!--快三特殊面板-->
			<div v-if="KSBetNumbersConfig.special[betNumbers.subGameId]||KSBetNumbersConfig.merge[betNumbers.subGameId]" class="ksSpecial">
				<div v-if="KSBetNumbersConfig.special[betNumbers.subGameId]">
					<div class="bet-content-item" v-for="(row,rowIndex) in betNumbers.numbers">
						<div class="top">
							<span class="badge">
					{{row.cols[0].gameName}}
					<span class="inner">
					</span>
							</span>
							<ul class="quick-group">
								<li v-for="item in betNumbers.quickBtnOption" @touchend="quickChooseNumber({rowIndex,quickType:item.value})">{{item.label}}</li>
							</ul>
						</div>
						<div class="btn-box">
							<!--把大小单双 大单 小单 大双 小双放前面-->
							<div :class="['btn-item',col.selected?'selected':'']" v-if="colIndex>=16" v-for="(col,colIndex) in row.cols">
								<div class="btn" @touchend="chooseBetNumber({rowIndex, colIndex})">{{col.label}}</div>
								<div class="text">{{col.odd}}</div>
							</div>
							<div :class="['btn-item',col.selected?'selected':'']" v-if="colIndex<16" v-for="(col,colIndex) in row.cols">
								<div class="btn" @touchend="chooseBetNumber({rowIndex, colIndex})">{{col.label}}</div>
								<div class="text">{{col.odd}}</div>
							</div>
						</div>
					</div>
					<p class="ksxh">快速选号</p>
					<ul class="quick-group">
						<li @touchend="quickChooseNumber({rowIndex:0,quickType:'big'})">小(3-10)</li>
						<li @touchend="quickChooseNumber({rowIndex:0,quickType:'odd'})">单(所有奇数)</li>
						<li @touchend="quickChooseNumber({rowIndex:0,quickType:'even'})">双(所有偶数)</li>
						<li @touchend="quickChooseNumber({rowIndex:0,quickType:'small'})">大(11-18)</li>
					</ul>
				</div>
				<!--快三必/不出和1-3球-->
				<div v-else class="ksSpecial merge">
					<div class="bet-content-item" v-for="(row,rowIndex) in betNumbers.numbers">
						<div class="top">
							<span class="badge">
					{{row.rowName}}
					<span class="inner">
					</span>
							</span>
						</div>
						<div class="btn-box">
							<div :class="['btn-item',col.selected?'selected':'']" v-for="(col,colIndex) in row.cols" @touchend="chooseBetNumber({rowIndex, colIndex})">
								<div class="btn" v-if="col.label.length==1">
									<div v-for="(item,index) in col.label.length" :class="'count1 num'+col.label[index]"></div>
								</div>
								<div class="btn" v-else-if="col.label.length==2">
									<div v-for="(item,index) in col.label.length" :class="'count2 num'+col.label[index]"></div>
								</div>
								<div class="btn" v-else="col.label.length==3">
									<div v-for="(item,index) in col.label.length" :class="'count3 num'+col.label[index]"></div>
								</div>
								<div class="text">{{col.odd}}</div>
							</div>
						</div>
					</div>

				</div>

			</div>
			<!--快三其它-->
			<div v-else-if="KSBetNumbersConfig.normal[betNumbers.subGameId]" class="ksNormal">
				<!--快三通选-->
				<div v-if="betNumbers.subGameId==='400501'||betNumbers.subGameId==='400201'">
					<div class="bet-content-item" v-for="(row,rowIndex) in betNumbers.numbers">
						<div class="top">
							<span class="badge">
					{{row.rowName}}
					<span class="inner">
					</span>
							</span>
						</div>
						<div class="btn-box">
							<div :class="['btn-item',col.selected?'selected':'']" v-for="(col,colIndex) in row.cols">
								<div class="btn" @touchend="chooseBetNumber({rowIndex, colIndex})">{{col.label}}</div>
							</div>
						</div>
					</div>
				</div>
				<!--快三不同号单选-->
				<div v-else>
					<div class="bet-content-item" v-for="(row,rowIndex) in betNumbers.numbers">
						<div class="top">
							<span class="badge">
					{{row.rowName}}
					<span class="inner">
					</span>
							</span>
						</div>
						<div class="btn-box">
							<div :class="['btn-item',col.selected?'selected':'']" v-for="(col,colIndex) in row.cols" @touchend="chooseBetNumber({rowIndex, colIndex})">
								<div class="btn" v-if="col.label.length==1">
									<div v-for="(item,index) in col.label.length" :class="'count1 num'+col.label[index]"></div>
								</div>
								<div class="btn" v-else-if="col.label.length==2">
									<div v-for="(item,index) in col.label.length" :class="'count2 num'+col.label[index]"></div>
								</div>
								<div class="btn" v-else="col.label.length==3">
									<div v-for="(item,index) in col.label.length" :class="'count3 num'+col.label[index]"></div>
								</div>
								<div class="text">{{betTypeMap[betNumbers.subGameId].odd}}</div>
							</div>
						</div>
					</div>

				</div>

			</div>
			<!--pk10特殊面板-->
			<div v-else-if="BJSCBetNumbersConfig.special[betNumbers.subGameId]" class="routine">
				<div class="bet-content-item" v-for="(row,rowIndex) in betNumbers.numbers">
					<div class="top">
						<span class="badge">
					{{row.cols[0].leftName}}
					<span class="inner">
					</span>
						</span>
						<ul class="quick-group">
							<li v-for="item in betNumbers.quickBtnOption" @touchend="quickChooseNumber({rowIndex,quickType:item.value})">{{item.label}}</li>
						</ul>
					</div>
					<div class="btn-box">
						<div class="btn-item" v-for="(col,colIndex) in row.cols">
							<div :class="['btn',col.selected?'selected':'']" @touchend="chooseBetNumber({rowIndex, colIndex})">{{col.label}}</div>
							<div class="text">{{col.odd}}</div>
						</div>
					</div>
				</div>
			</div>
			<!--单式面板-->
			<div v-else-if="betNumbers.numberType === 'input'">
				<NumbersBoardInput></NumbersBoardInput>
			</div>
			<!--常规面板-->
			<div v-else-if="betNumbers.numberType === 'button'" class="routine">
				<div class="bet-content-item" v-for="(row,rowIndex) in betNumbers.numbers">
					<div class="top">
						<span class="badge">
					{{row.rowName}}
					<span class="inner">
					</span>
						</span>
						<ul class="quick-group">
							<li v-for="item in betNumbers.quickBtnOption" @touchend="quickChooseNumber({rowIndex,quickType:item.value})">{{item.label}}</li>
						</ul>
					</div>
					<div class="btn-box">
						<div class="btn-item" v-for="(col,colIndex) in row.cols">
							<div :class="['btn',col.selected?'selected':'']" @touchend="chooseBetNumber({rowIndex, colIndex})">{{col.label}}</div>
							<div class="text" v-if="betNumbers.hasSub&&gameInfo[hasSub][rowIndex+1]">{{gameInfo[hasSub][rowIndex+1][gameType.classId=='5'||gameType.classId=='6'?colIndex+1:colIndex].count}}</div>
							<div class="text" v-else></div>
						</div>
					</div>
				</div>
			</div>
			<div style="height:0.8rem"></div>
		</scroller>
		<!--六合彩-->
		<LhcNumbersBoard v-else />
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import KSBetNumbersConfig from "../createconfig/ks";
import BJSCBetNumbersConfig from "../createconfig/bjsc";
import LHCList from "../gamelist/lhc";
import NumbersBoardInput from "./NumbersBoardInput";
import LhcNumbersBoard from "./LhcNumbersBoard";
import { isString } from 'util';
import { setTimeout } from 'timers';

export default {
  components: {
    NumbersBoardInput,
    LhcNumbersBoard
  },
  computed: {
    ...mapState("bet", [
      "model",
      "betNumbers",
      "playType",
      "betTypeMap",
      "gameInfo",
      "gameType"
    ])
  },
  data() {
    return {
      hasSub: "hotCold",
      KSBetNumbersConfig: KSBetNumbersConfig,
      BJSCBetNumbersConfig: BJSCBetNumbersConfig,
      LHCList: LHCList,
      isTouch:true
    };
  },
  methods: {
    ...mapActions("login", ["getUserDetails"]),
    ...mapActions("bet", ["updateGameType"]),
    ...mapMutations("bet", [
      "SET_MODEL",
      "CHOOSE_BETNUMBER",
      "UPDATE_BETNUMBERS"
    ]),
    
    //一般选号
    chooseBetNumber({ rowIndex, colIndex }) {
      if(!this.isTouch) return
      this.CHOOSE_BETNUMBER({
        betNumbers: this.betNumbers,
        rowIndex: rowIndex,
        colIndex: colIndex
      });
    },
    //快捷选号
    quickChooseNumber({ rowIndex, quickType }) {
      if(!this.isTouch) return
      let newBetNumbers = {
        ...this.betNumbers
      };
      const middleNumber = this.betNumbers.max / 2;
      switch (quickType) {
        case "all":
          newBetNumbers.numbers[rowIndex].cols.forEach((col, colIndex) => {
            col.selected = true;
          });
          break;
        case "big":
          newBetNumbers.numbers[rowIndex].cols.forEach((col, colIndex) => {
            if (parseInt(col.label) > middleNumber) {
              col.selected = true;
            } else {
              col.selected = false;
            }
          });
          break;
        case "small":
          newBetNumbers.numbers[rowIndex].cols.forEach((col, colIndex) => {
            if (parseInt(col.label) <= middleNumber) {
              col.selected = true;
            } else {
              col.selected = false;
            }
          });
          break;
        case "odd":
          newBetNumbers.numbers[rowIndex].cols.forEach((col, colIndex) => {
            if (parseInt(col.label) % 2 === 1) {
              col.selected = true;
            } else {
              col.selected = false;
            }
          });
          break;
        case "even":
          newBetNumbers.numbers[rowIndex].cols.forEach((col, colIndex) => {
            if (parseInt(col.label) % 2 === 0) {
              col.selected = true;
            } else {
              col.selected = false;
            }
          });
          break;
        case "clear":
          newBetNumbers.numbers[rowIndex].cols.forEach((col, colIndex) => {
            col.selected = false;
          });
          break;
      }
      this.UPDATE_BETNUMBERS(newBetNumbers);
    },
    //改变游戏模式，官方或两面
    changeModel(value) {
      this.SET_MODEL(value);
      this.updateGameType(
					"/"+value
				).then((res) => {
					this.getUserDetails()
				})
    },
    touchmove(){
      this.isTouch = false;
    },
    touchend(){
        this.isTouch = true;
    }
  },
  watch:{
	  
  }
};
</script>

<style lang="less">
.bet-content {
  flex: 1;
  box-sizing: border-box;
  position: relative;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .set {
    width: 100%;
    height: 0.6rem;
    padding: 0 2.5vw;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .set_model {
      display: flex;
      font-size: 0.28rem;
      li {
        text-align: center;
        color: #000;
        border: 1px solid #ca0500;
        width: 0.7rem;
        height: 0.5rem;
        line-height: 0.5rem;
      }
      li:first-child {
        border-radius: 0.08rem 0 0 0.08rem;
      }
      li:last-child {
        border-radius: 0 0.08rem 0.08rem 0;
      }
      li.active {
        color: #fff;
        background: #ca0500;
        box-shadow: inset -0.02rem 0.06rem 0.14rem rgba(0, 0, 0, 0.34);
      }
    }
  }

  /*常规面板*/
  .routine {
    .bet-content-item {
      box-sizing: border-box;
      height: auto;
      .top {
        padding: 0 2.5vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.1rem;
        border-bottom: 1px solid #707070;
        .badge {
          background-color: rgb(202, 5, 0);
          color: rgb(255, 255, 255);
          transform: scale(1);
          padding: 0.16rem 0.28rem;
          border-radius: 0.1rem;
          font-size: 0.18rem;
          position: relative;
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          transform-origin: center center;
          .inner {
            display: block;
            width: 0.1rem;
            height: 0.1rem;
            background-color: #ca0500;
            position: absolute;
            left: 0.13rem;
            bottom: -0.05rem;
            transform: rotate(225deg);
          }
        }
        .quick-group {
          display: flex;
          li {
            padding: 0.1rem 0.28rem;
            border-bottom: 1px solid #cccccc;
            border-top: 1px solid #cccccc;
            border-right: 1px solid #cccccc;
          }
          li:first-child {
            border-left: 1px solid #cccccc;
            border-radius: 0.1rem 0 0 0.1rem;
          }
          li:last-child {
            border-radius: 0px 0.1rem 0.1rem 0;
          }
        }
      }
      .btn-box {
        padding: 0 2.5vw;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .btn-item:nth-child(7n) {
          margin-right: 0;
        }
        .btn-item {
          margin: 0.1rem 0.33rem 0 0;
          .btn {
            width: 0.73rem;
            height: 0.8rem;
            color: #ca0500;
            font-size: 0.32rem;
            text-align: center;
            line-height: 0.73rem;
            background: url(../../../images/ball.png);
            background-size: 100% 100%;
            position: relative;
          }
          .btn.selected {
            background: url(../../../images/ball_sel.png);
            color: #fff;
            background-size: 100% 100%;
          }
          .text {
            height: 0.24rem;
            text-align: center;
            font-size: 0.2rem;
          }
        }
      }
    }
  }
  /*快三特殊面板*/
  .ksSpecial {
    .bet-content-item {
      box-sizing: border-box;
      .top {
        padding: 0 2.5vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.1rem;
        border-bottom: 1px solid #707070;
        .badge {
          background-color: rgb(202, 5, 0);
          color: rgb(255, 255, 255);
          transform: scale(1);
          padding: 0.16rem 0.28rem;
          border-radius: 0.1rem;
          font-size: 0.18rem;
          position: relative;
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          transform-origin: center center;
          .inner {
            display: block;
            width: 0.1rem;
            height: 0.1rem;
            background-color: #ca0500;
            position: absolute;
            left: 0.13rem;
            bottom: -0.05rem;
            transform: rotate(225deg);
          }
        }
      }
      .btn-box {
        margin-top: 0.1rem;
        padding: 0 2.5vw;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .btn-item {
          width: 1.6rem;
          height: 0.8rem;
          margin: 0.1rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          border-radius: 0.08rem;
          border: 1px solid #c0bfbb;
          background: #fff -webkit-gradient(radial, 60 60, 60, 50 120, 0, from(ivory), to(hsla(0, 0%, 100%, 0.6)));
          .btn {
            font-size: 0.32rem;
          }
          .text {
            height: 0.24rem;
            color: #76736c;
            font-size: 0.24rem;
          }
        }
        .btn-item.selected {
          color: #fff;
          border: 1px solid #d91d36;
          background: #d91d36;
          .text {
            height: 0.24rem;
            color: #fff;
          }
        }
      }
    }
    .ksxh {
      font-size: 0.28rem;
      text-align: center;
      color: #313131;
    }
    .quick-group {
      padding: 0 2.5vw;
      display: flex;
      margin-top: 0.1rem;
      li {
        width: 1.78rem;
        height: 0.6rem;
        border: 1px solid #d7d7d9;
        line-height: 0.6rem;
        text-align: center;
        font-size: 0.24rem;
        color: #313131;
        border-left: none;
      }
      li:first-child {
        border-left: 1px solid #ccc;
        border-radius: 0.1rem 0 0 0.1rem;
      }
      li:last-child {
        border-radius: 0 0.1rem 0.1rem 0;
      }
    }
  }
  .ksSpecial.merge {
    .btn-box {
      margin-top: 0.1rem;
      padding: 0 2.5vw;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .btn-item {
        width: 2rem;
        height: 1.2rem;
        margin: 0.1rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 0.08rem;
        border: 1px solid #c0bfbb;
        background: #fff -webkit-gradient(radial, 60 60, 60, 50 120, 0, from(ivory), to(hsla(0, 0%, 100%, 0.6)));
        .btn {
          font-size: 0.32rem;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          .count3:nth-child(1) {
            margin: 0.025rem 0.8rem;
          }
          .count2,
          .count1 {
            border: 1px solid #ccc;
            border-radius: 0.05rem;
            width: 0.32rem;
            margin: 0.05rem;
            height: 0.32rem;
            background-size: 100% 100%;
          }
          .count3 {
            border: 1px solid #ccc;
            border-radius: 0.05rem;
            width: 0.32rem;
            height: 0.32rem;
            margin: 0.025rem 0.1rem;
            background-size: 100% 100%;
          }
          .num1 {
            background-image: url(../style/img/s_1.png);
          }
          .num2 {
            background-image: url(../style/img/s_2.png);
          }
          .num3 {
            background-image: url(../style/img/s_3.png);
          }
          .num4 {
            background-image: url(../style/img/s_4.png);
          }
          .num5 {
            background-image: url(../style/img/s_5.png);
          }
          .num6 {
            background-image: url(../style/img/s_6.png);
          }
        }
        .text {
          height: 0.24rem;
          color: #76736c;
          font-size: 0.24rem;
        }
      }
      .btn-item.selected {
        color: #fff;
        border: 1px solid #d91d36;
        background: #d91d36;
        .btn {
          .count3,
          .count2,
          .count1 {
            border: none;
          }
        }
        .text {
          height: 0.24rem;
          color: #fff;
        }
      }
    }
  }
  /*快三其它*/
  .ksNormal {
    .bet-content-item {
      box-sizing: border-box;
      .top {
        padding: 0 2.5vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.1rem;
        border-bottom: 1px solid #707070;
        .badge {
          background-color: rgb(202, 5, 0);
          color: rgb(255, 255, 255);
          transform: scale(1);
          padding: 0.16rem 0.28rem;
          border-radius: 0.1rem;
          font-size: 0.18rem;
          position: relative;
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          transform-origin: center center;
          .inner {
            display: block;
            width: 0.1rem;
            height: 0.1rem;
            background-color: #ca0500;
            position: absolute;
            left: 0.13rem;
            bottom: -0.05rem;
            transform: rotate(225deg);
          }
        }
      }
      .btn-box {
        margin-top: 0.1rem;
        padding: 0 2.5vw;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .btn-item {
          width: 2rem;
          height: 1.2rem;
          margin: 0.1rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          border-radius: 0.08rem;
          border: 1px solid #c0bfbb;
          background: #fff -webkit-gradient(radial, 60 60, 60, 50 120, 0, from(ivory), to(hsla(0, 0%, 100%, 0.6)));
          .btn {
            font-size: 0.32rem;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            .count3:nth-child(1) {
              margin: 0.025rem 0.8rem;
            }
            .count2,
            .count1 {
              border: 1px solid #ccc;
              border-radius: 0.05rem;
              width: 0.32rem;
              margin: 0.05rem;
              height: 0.32rem;
              background-size: 100% 100%;
            }
            .count3 {
              border: 1px solid #ccc;
              border-radius: 0.05rem;
              width: 0.32rem;
              height: 0.32rem;
              margin: 0.025rem 0.1rem;
              background-size: 100% 100%;
            }
            .num1 {
              background-image: url(../style/img/s_1.png);
            }
            .num2 {
              background-image: url(../style/img/s_2.png);
            }
            .num3 {
              background-image: url(../style/img/s_3.png);
            }
            .num4 {
              background-image: url(../style/img/s_4.png);
            }
            .num5 {
              background-image: url(../style/img/s_5.png);
            }
            .num6 {
              background-image: url(../style/img/s_6.png);
            }
          }
          .text {
            color: #76736c;
            font-size: 0.24rem;
          }
        }
        .btn-item.selected {
          color: #fff;
          border: 1px solid #d91d36;
          background: #d91d36;
          .btn {
            .count3,
            .count2,
            .count1 {
              border: none;
            }
          }
          .text {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>