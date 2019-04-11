<template>
	<div class="lhcNumbers">
		<div style="width: 100%;height: 0.6rem;">
			<div style="width: 100%;height: 100%;"></div>
		</div>
		<div class="content">
			<ul class="aside">
				<scroller>
					<li class="nav" :class="{active:playType.gameId==item.gameId}" v-for="(item,index) in playList.standGameList">
						<a class="item col ng-binding" @click="changIvOne(index)">
							{{item.gameName}}
							<span class="smallround"></span>
						</a>
					</li>
				</scroller>
			</ul>
			<div class="body">
				<div class="top">
					<div class="row">
						<div class="nav" @click="changIvTwo(item2)" v-for="(item2,index2) in childs[0].list" :class="['sub',betType.subGameId==item2.subGameId?'active':'','col_'+childs[0].list.length]">{{item2.rightName}}</div>
					</div>
				</div>
				<div class="bet-view">
					<scroller>
						<!--特码-->
						<div class="tema" v-if="LHCBetNumbersConfig.tema[betNumbers.subGameId]">
							<div class="bet-content-item" v-for="(row,rowIndex) in betNumbers.numbers">
								<div class="btn-item" :class="{selected:col.selected}" v-for="(col,colIndex) in row.cols" @click="chooseBetNumber({rowIndex, colIndex})">
									<div :class="['btn',colorType[col.label]]">{{col.label}}</div>
									<div class="odd">{{betTypeMap[betNumbers.subGameId].odd}}</div>
								</div>
							</div>
						</div>
						<!--特两面类型-->
						<div class="teliangmian" v-if="LHCBetNumbersConfig.teliangmian[betNumbers.subGameId]">
							<div class="bet-content-item"  v-for="(row,rowIndex) in betNumbers.numbers">
								<div class="btn-item"  :class="{selected:col.selected}" v-for="(col,colIndex) in row.cols" @click="chooseBetNumber({rowIndex, colIndex})">
									<div :class="['btn',colorType[col.label]]">{{col.label}}</div>
									<div class="odd">{{betTypeMap[betNumbers.subGameId].odd}}</div>
								</div>
							</div>
						</div>
						<!--正码1-6-->
						<div class="zmlm" v-if="LHCBetNumbersConfig.zmlm[betNumbers.subGameId]">
							<div class="bet-content-item" :style="{width:rowIndex>0?'50%':'100%'}" v-for="(row,rowIndex) in betNumbers.numbers">
								<div class="btn-item" :style="{width:rowIndex>0?'86%':'43%'}" :class="{selected:col.selected}" v-for="(col,colIndex) in row.cols" @click="chooseBetNumber({rowIndex, colIndex})">
									<div :class="['btn',colorType[col.label]]">{{col.label}}</div>
									<div class="odd">{{col.odd}}</div>
								</div>
							</div>
						</div>
						<!--特肖类型-->
						<div class="texiao" v-if="LHCBetNumbersConfig.texiao[betNumbers.subGameId]">
							<div class="bet-content-item" v-for="(row,rowIndex) in betNumbers.numbers">
								<div class="btn-item" :class="{selected:col.selected}" v-for="(col,colIndex) in row.cols" @click="chooseBetNumber({rowIndex, colIndex})">
									<div class="rowName">{{row.rowName}}</div>
									<div class="odd" v-if="col.label.length==4">{{betTypeMap[betNumbers.subGameId].odd.split(',')[0]}}</div>
									<div class="odd" v-if="col.label.length==5">{{betTypeMap[betNumbers.subGameId].odd.split(',')[1]}}</div>
									<div class="btn-box">
										<div :class="['btn',colorType[item]]" v-for="(item,index) in col.label">{{item}}</div>
									</div>
								</div>
							</div>
						</div>
						<!--色波-->
						<div class="sebo" v-if="LHCBetNumbersConfig.sebo[betNumbers.subGameId]||LHCBetNumbersConfig.banbo[betNumbers.subGameId]">
							<div class="bet-content-item" v-for="(row,rowIndex) in betNumbers.numbers">
								<div class="btn-item" :class="{selected:col.selected}" v-for="(col,colIndex) in row.cols" @click="chooseBetNumber({rowIndex, colIndex})">
									<span class="rowName">{{row.rowName}}</span>
									<span class="odd">{{row.odd}}</span>
									<div class="btn-box">
										<div :class="['btn',colorType[item]]" v-for="(item,index) in col.label">{{item}}</div>
									</div>
								</div>
							</div>
						</div>
            <div style="height:0.8rem"></div>
					</scroller>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import LHCBetNumbersConfig from "../createconfig/lhc";
import colorType from "../createconfig/colorType";
export default {
  data() {
    return {
      LHCBetNumbersConfig: LHCBetNumbersConfig,
      colorType: colorType,
      isTouch:true
    };
  },
  computed: {
    ...mapState("bet", [
      "childs",
      "betNumbers",
      "playType",
      "playList",
      "betType",
      "betTypeMap"
    ])
  },
  methods: {
    ...mapActions("bet", ["getBetRates"]),
    ...mapMutations("bet", [
      "SET_PLAYTYPE",
      "SET_BET_TYPE",
      "SET_BETNUMBERS",
      "CHOOSE_BETNUMBER"
    ]),
    //切换彩种大玩法
    changIvOne(index) {
      this.SET_PLAYTYPE(this.playList.standGameList[index]);
    },
    //切换彩种子玩法
    changIvTwo(betType) {
      this.SET_BET_TYPE({
        leftName: betType.leftName,
        rightName: betType.rightName,
        subGameId: betType.subGameId
      });
      this.SET_BETNUMBERS(betType); //生成选号按钮
      this.getBetRates({
        gameIds: betType.subGameId.split(",")
      }); //获取赔率信息
    },
    //一般选号
    chooseBetNumber({ rowIndex, colIndex }) {
      if(!this.isTouch) return
      this.CHOOSE_BETNUMBER({
        betNumbers: this.betNumbers,
        rowIndex: rowIndex,
        colIndex: colIndex
      });
    },
    touchmove(){
      this.isTouch = false;
    },
    touchend(){
        this.isTouch = true;
    }
  }
};
</script>

<style lang="less">
.lhcNumbers {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    display: flex;
    flex: 1;
    border-top: 1px solid #ccc;
    .aside {
      position: relative;
      width: 24vw;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0, 99, 184, 1) 1%,
        rgba(0, 173, 189, 1) 72%
      );
      .nav .item {
        box-shadow: inset 0 0.02rem 0 rgba(255, 255, 255, 0.2),
          0 -0.02rem 0 rgba(0, 0, 0, 0.23);
        padding: 0.16rem 0.1rem;
        background: rgba(250, 250, 250, 0.11);
        text-align: center;
        position: relative;
        border: 0;
        display: block;
        font-size: 0.32rem;
        color: #fff;
        .smallround {
          width: 0.14rem;
          height: 0.14rem;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.3);
          position: absolute;
          left: 0.1rem;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
      .nav.active .item {
        color: #fff;
        box-shadow: inset -0.02rem 0.06rem 0.14rem rgba(0, 0, 0, 0.34);
        background-color: rgba(0, 0, 0, 0.23);
        border: 0;
        .smallround {
          background-color: #eee;
        }
      }
    }
    .body {
      width: 76vw;
      display: flex;
      flex-direction: column;
      .top {
        width: 100%;
        position: relative;
        height: 0.56rem;
        .row {
          width: 100%;
          border-bottom: 1px solid #ccc;
          overflow-x: scroll;
          display: flex;
          .nav {
            flex: 0 0 31%;
            width: 2rem;
            max-width: 31%;
            height: 0.56rem;
            text-align: center;
            line-height: 0.56rem;
            display: inline-block;
            font-size: 0.32rem;
            color: #666;
            padding: 0 0.1rem;
          }
          .active.nav {
            color: #000000;
            font-weight: 600;
            background: rgba(200, 200, 200, 0.25);
          }
        }
      }
      .bet-view {
        position: relative;
        flex: 1;
        .tema {
          .bet-content-item {
            padding-top: 0.2rem;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            .btn-item {
              position: relative;
              width: 28%;
              display: -ms-flexbox;
              display: flex;
              border: 1px solid #ccc;
              -ms-flex-direction: column;
              flex-direction: column;
              -ms-flex-pack: center;
              justify-content: center;
              -ms-flex-align: center;
              align-items: center;
              border-radius: 5px;
              margin-bottom: 0.2rem;
              height: 1.4rem;
              .btn {
                width: 0.8rem;
                height: 0.8rem;
                line-height: 0.8rem;
                font-size: 0.3rem;
                font-weight: 600;
                color: rgb(102, 102, 102);
                text-align: center;
              }
              .btn.red {
                background: url(../style/img/bo_red_bg.png);
                background-size: 100% 100%;
              }
              .btn.blue {
                background: url(../style/img/bo_blue_bg.png);
                background-size: 100% 100%;
              }
              .btn.green {
                background: url(../style/img/bo_green_bg.png);
                background-size: 100% 100%;
              }
              .odd {
                font-size: 0.28rem;
                color: rgb(255, 77, 77);
              }
            }
            .btn-item.selected {
              background: rgba(244, 234, 42, 0.5);
              text-shadow: rgba(255, 255, 255, 0.23) 0px 0px 0px;
              box-shadow: rgba(0, 0, 0, 0.3) 0px 0.02rem 0.1rem inset;
            }
          }
        }
        .teliangmian {
          .bet-content-item {
            padding-top: 0.2rem;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            .btn-item {
              position: relative;
              width: 43%;
              display: -ms-flexbox;
              display: flex;
              border: 1px solid #ccc;
              -ms-flex-direction: column;
              flex-direction: column;
              -ms-flex-pack: center;
              justify-content: center;
              -ms-flex-align: center;
              align-items: center;
              border-radius: 5px;
              margin-bottom: 0.2rem;
              height: 1.4rem;
              .btn {
                min-width: 0.8rem;
                height: 0.8rem;
                line-height: 0.8rem;
                font-size: 0.32rem;
                font-weight: 600;
                color: rgb(102, 102, 102);
                text-align: center;
              }
              .btn.red {
                background: url(../style/img/bo_red_bg.png);
                background-size: 100% 100%;
              }
              .btn.blue {
                background: url(../style/img/bo_blue_bg.png);
                background-size: 100% 100%;
              }
              .btn.green {
                background: url(../style/img/bo_green_bg.png);
                background-size: 100% 100%;
              }
              .odd {
                font-size: 0.28rem;
                color: rgb(255, 77, 77);
              }
            }
            .btn-item.selected {
              background: rgba(244, 234, 42, 0.5);
              text-shadow: rgba(255, 255, 255, 0.23) 0px 0px 0px;
              box-shadow: rgba(0, 0, 0, 0.3) 0px 0.02rem 0.1rem inset;
            }
          }
        }
        .zmlm {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          .bet-content-item {
            width: 100%;
            padding-top: 0.2rem;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            .btn-item {
              position: relative;
              width: 43%;
              display: -ms-flexbox;
              display: flex;
              border: 1px solid #ccc;
              -ms-flex-direction: column;
              flex-direction: column;
              -ms-flex-pack: center;
              justify-content: center;
              -ms-flex-align: center;
              align-items: center;
              border-radius: 5px;
              margin-bottom: 0.2rem;
              height: 1.4rem;
              .btn {
                min-width: 0.8rem;
                height: 0.8rem;
                line-height: 0.8rem;
                font-size: 0.32rem;
                font-weight: 600;
                color: rgb(102, 102, 102);
                text-align: center;
              }
              .btn.red {
                background: url(../style/img/bo_red_bg.png);
                background-size: 100% 100%;
              }
              .btn.blue {
                background: url(../style/img/bo_blue_bg.png);
                background-size: 100% 100%;
              }
              .btn.green {
                background: url(../style/img/bo_green_bg.png);
                background-size: 100% 100%;
              }
              .odd {
                font-size: 0.28rem;
                color: rgb(255, 77, 77);
              }
            }
            .btn-item.selected {
              background: rgba(244, 234, 42, 0.5);
              text-shadow: rgba(255, 255, 255, 0.23) 0px 0px 0px;
              box-shadow: rgba(0, 0, 0, 0.3) 0px 0.02rem 0.1rem inset;
            }
          }
        }
        .texiao {
          .bet-content-item {
            padding-top: 0.2rem;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            .btn-item {
              position: relative;
              width: 90%;
              height: 0.8rem;
              display: flex;
              border: 1px solid #ccc;
              border-radius: 0.1rem;
              margin-bottom: 0.1rem;
              .rowName {
                width: 0.8rem;
                height: 0.8rem;
                line-height: 0.8rem;
                font-size: 0.32rem;
                font-weight: 600;
                color: rgb(102, 102, 102);
                text-align: center;
              }
              .btn-box {
                display: flex;
                width: 4rem;
                .btn {
                  width: 0.7rem;
                  height: 0.7rem;
                  line-height: 0.7rem;
                  font-size: 0.3rem;
                  font-weight: 600;
                  color: rgb(102, 102, 102);
                  text-align: center;
                }
                .btn.red {
                  background: url(../style/img/bo_red_bg.png);
                  background-size: 100% 100%;
                }
                .btn.blue {
                  background: url(../style/img/bo_blue_bg.png);
                  background-size: 100% 100%;
                }
                .btn.green {
                  background: url(../style/img/bo_green_bg.png);
                  background-size: 100% 100%;
                }
              }

              .odd {
                width: 1rem;
                line-height: 0.8rem;
                font-size: 0.28rem;
                color: rgb(255, 77, 77);
              }
            }
            .btn-item.selected {
              background: rgba(244, 234, 42, 0.5);
              text-shadow: rgba(255, 255, 255, 0.23) 0px 0px 0px;
              box-shadow: rgba(0, 0, 0, 0.3) 0px 0.02rem 0.1rem inset;
            }
          }
        }
        .sebo {
          .bet-content-item {
            padding-top: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-wrap: wrap;
            .btn-item {
              position: relative;
              width: 92%;
              display: flex;
              align-items: center;
              border: 1px solid #ccc;
              border-radius: 0.1rem;
              margin-bottom: 0.1rem;
              .rowName {
                width: 0.8rem;
                font-size: 0.32rem;
                font-weight: 600;
                color: rgb(102, 102, 102);
                text-align: center;
              }
              .btn-box {
                display: flex;
                flex-wrap: wrap;
                width: 4.2rem;
                .btn {
                  width: 0.6rem;
                  height: 0.6rem;
                  line-height: 0.6rem;
                  font-size: 0.28rem;
                  font-weight: 600;
                  color: rgb(102, 102, 102);
                  text-align: center;
                }
                .btn.red {
                  background: url(../style/img/bo_red_bg.png);
                  background-size: 100% 100%;
                }
                .btn.blue {
                  background: url(../style/img/bo_blue_bg.png);
                  background-size: 100% 100%;
                }
                .btn.green {
                  background: url(../style/img/bo_green_bg.png);
                  background-size: 100% 100%;
                }
              }

              .odd {
                width: 1rem;
                line-height: 0.8rem;
                font-size: 0.28rem;
                color: rgb(255, 77, 77);
              }
            }
            .btn-item.selected {
              background: rgba(244, 234, 42, 0.5);
              text-shadow: rgba(255, 255, 255, 0.23) 0px 0px 0px;
              box-shadow: rgba(0, 0, 0, 0.3) 0px 0.02rem 0.1rem inset;
            }
          }
        }
      }
    }
  }
}
</style>