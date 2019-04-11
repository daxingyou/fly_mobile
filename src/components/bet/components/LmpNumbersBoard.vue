<template>
<div class="lmp">
    <div class="set">
			<ul class="set_model" v-if="gameType.classId=='3'||gameType.classId=='6'">
				<li :class="model=='1'?'active':''" @click="changeModel('1')">官</li>
				<li :class="model=='2'?'active':''" @click="changeModel('2')">传</li>
			</ul>	
	</div>
	<div class="content" >
	<ul class="left">
		<scroller>
			<li class="nav" :class="{active:showId==item.showId}" v-for="(item,index) in menu_list[gameType.classId]">
				<a class="item col ng-binding" @click="changShowId(item.showId,item.title)">
					{{item.title}}
					<span class="smallround"></span>
				</a>
			</li>
		</scroller>
	</ul>
				
	<div class="right" >
		<div class="bet-content" @touchmove="touchmove" @touchend="touchend">
		<scroller >
			<div class="lm-selector" v-for="(item1,index1) in lmpBetNumbers">
				<div class="title">{{item1.title}}</div>
					<div class="credit-wrap">
						<ul class="credit-con">
							<li :class="[item2.selected?'selected '+item2.className:item2.className,lmpOdds[item2.key]?'':'disabled']" v-for="(item2,index2) in item1.groups" @click="selectBtn(index1,index2,item2.key,item1.title,lmpOdds[item2.key])" ><span class="play-name">{{item2.name}}</span> <span class="prize">{{lmpOdds[item2.key]}}</span></li>
						</ul>
					</div>
							<!--<div class="rough_lines"></div>-->
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
import { menu_list } from "../createconfig/lmp_menulist";
import { createNmubers_lmp } from "../utils/createNmubers_lmp";
export default {
  data() {
    return {
      menu_list: menu_list,
      isTouch:true
    };
  },
  created() {
    //获取两面盘赔率
    this.getTwoGameOdd("/" + this.gameType.kindId);
    //生成两面盘面板数据
    this.SET_LMP_BETNUMBERS(
      createNmubers_lmp(this.gameType.classId, this.showId)
    );
  },
  computed: {
    ...mapState("bet", [
      "lmpOdds",
      "model",
      "showId",
      "playType",
      "betTypeMap",
      "gameInfo",
      "gameType",
      "lmpBetNumbers"
    ])
  },
  methods: {
    ...mapActions("login", ["getUserDetails"]),
    ...mapActions("bet", ["recentOpenCode", "getTwoGameOdd","updateGameType"]),
    ...mapMutations("bet", [
      "SET_LMP_TITLE",
      "SET_BET_TYPE",
      "SET_MODEL",
      "SET_LMP_BETNUMBERS",
      "SET_SHOWID",
      "UPDATE_LMP_BETNUMBERS"
    ]),
    //切换两面盘玩法id
    changShowId(showId, title) {
      this.SET_SHOWID(showId);
      this.SET_LMP_TITLE(title);
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
    //两面盘选号
    selectBtn(index1, index2, key, title, Boolean) {
      if(!this.isTouch) return 
      if (!Boolean) {
        return false;
      }
      var lmpBetNumbers = this.lmpBetNumbers;
      var selected = lmpBetNumbers[index1].groups[index2].selected;
      lmpBetNumbers[index1].groups[index2].selected = !selected;
      this.UPDATE_LMP_BETNUMBERS(lmpBetNumbers);
    },
    touchmove(){
      this.isTouch = false;
    },
    touchend(){
        this.isTouch = true;
    }
  },
  watch: {
    showId() {
      //切换玩法
      this.SET_LMP_BETNUMBERS(
        createNmubers_lmp(this.gameType.classId, this.showId)
      );
    },
    gameType() {
      //获取两面盘赔率
      this.getTwoGameOdd("/" + this.gameType.kindId);
    }
  }
};
</script>
<style lang="less">
.lmp {
  flex: 1;
  display: flex;
  flex-direction: column;
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
  .content {
    display: flex;
    flex: 1;
    .left {
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
    .right {
      width: 76vw;
      height: 100%;
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      .bet-content {
         width: 76vw;
      height: 100%;
       position: relative;
      
      }
      .title {
        text-align: center;
        padding: 0.1rem 0;
        font-size: 14px;
        color: #666;
        background: #f8f8f8;
        border-bottom: 1px solid #d8d8d8;
      }
    }
    .lm-selector {
      padding-top: 0;
      box-sizing: border-box;
      .credit-wrap {
        /*padding-bottom: 0.2rem;*/
        border-radius: 0 5px;
        .credit-con {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          li {
            /*margin: 0.1rem 0.05rem;*/
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            touch-action: manipulation;
            user-select: none;
            -webkit-user-drag: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }
          li:after {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            width: 200%;
            height: 200%;
            border-right: 2px solid #d8d8d8;
            border-bottom: 2px solid #d8d8d8;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scale(0.5, 0.5);
            transform: scale(0.5, 0.5);
          }
          .play-name {
            color: #666;
            font-size: 18px;
            font-weight: 900;
            margin-right: 0.1rem;
          }
          .prize {
            color: #ff4d4d;
            font-size: 14px;
            font-weight: 600;
          }
          .ssc_num .play-name,
          .pk10_sum_num .play-name {
            width: 0.66rem;
            height: 0.66rem;
            border-radius: 50%;
            font-size: 18px;
            line-height: 0.66rem;
            text-align: center;
            box-shadow: inset 1px -6px 10px #fff;
            background: #ededed;
            border: 1px solid #d7d7d7;
            color: #000 !important;
          }
          .pk10_num .play-name {
            width: 0.6rem;
            height: 0.6rem;
            font-size: 18px;
            text-shadow: none;
            color: transparent !important;
            line-height: 0.6rem;
            text-align: center;
            background-size: 100% 100%;
          }
          .pk10_num.num1 .play-name {
            background-image: url(../../../../static/img/1.png);
          }
          .pk10_num.num2 .play-name {
            background-image: url(../../../../static/img/2.png);
          }
          .pk10_num.num3 .play-name {
            background-image: url(../../../../static/img/3.png);
          }
          .pk10_num.num4 .play-name {
            background-image: url(../../../../static/img/4.png);
          }
          .pk10_num.num5 .play-name {
            background-image: url(../../../../static/img/5.png);
          }
          .pk10_num.num6 .play-name {
            background-image: url(../../../../static/img/6.png);
          }
          .pk10_num.num7 .play-name {
            background-image: url(../../../../static/img/7.png);
          }
          .pk10_num.num8 .play-name {
            background-image: url(../../../../static/img/8.png);
          }
          .pk10_num.num9 .play-name {
            background-image: url(../../../../static/img/9.png);
          }
          .pk10_num.num10 .play-name {
            background-image: url(../../../../static/img/10.png);
          }
          li.selected {
            .play-name {
              color: #fff;
            }
            .prize {
              color: #b0d2f0 !important;
            }
            background: #4695e6;
            background: linear-gradient(
              to bottom,
              rgba(30, 130, 200, 0.7) 0,
              rgba(0, 130, 200, 0.7) 100%
            );
          }
          li.disabled {
            opacity: 0.3;
          }
          li.col-num {
            position: relative;
            width: 28%;
            height: 1.2rem;
            margin: 0.1rem 0.1rem;
            background: #f7f7f7;
            border-radius: 5px;
            border: 1px solid #e6e6e6;
            box-sizing: border-box;
          }
          li.col-6 {
            position: relative;
            width: 15%;
            height: 1rem;
            background: #f7f7f7;
            border-radius: 5px;
            border: 1px solid #e6e6e6;
            box-sizing: border-box;
          }
          li.col-3 {
            position: relative;
            width: 33.33%;
            height: 1rem;
            /*background: #f7f7f7;*/
            /*border-radius: 5px;*/
            /*border: 1px solid #e6e6e6;*/
            box-sizing: border-box;
          }
          li.col-4 {
            position: relative;
            width: 23%;
            height: 1rem;
            background: #f7f7f7;
            border-radius: 5px;
            border: 1px solid #e6e6e6;
            box-sizing: border-box;
          }
          li.col-2 {
            position: relative;
            width: 50%;
            height: 1rem;
            /*background: #f7f7f7;*/
            /*border-radius: 5px;*/
            /*box-sizing: border-box;*/
          }
          li.col-1 {
            position: relative;
            width: 100%;
            height: 1rem;
            /*background: #f7f7f7;*/
            /*border-radius: 5px;*/
            /*box-sizing: border-box;*/
          }
        }
      }
    }
  }
}
</style>