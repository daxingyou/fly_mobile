<template>
 <div>
   <div v-if="$parent.isOpen" @click.stop="$parent.isOpen=false" style="position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; z-index: 999;"></div>
	<div class="menu">
		<div class="menu-tab" v-if="gameType.classId=='3'||gameType.classId=='6'">
			<div @click="changeModel('1')" :class="['tab-item',model=='1'?'tab-selected':'']" style="border-width: 1px;">
				<div flex="cross:center main:center">
					官方玩法
				</div>
			</div>
			<div  @click="changeModel('2')" :class="['tab-item',model=='2'?'tab-selected':'']" style="border-width: 1px;">
				<div flex="cross:center main:center">
					两面盘
				</div>
			</div>
		</div>
		<!--中间的大玩法-->
		<!--两面盘玩法列表-->
		<ul class="level_1" v-if="model=='2'">
			<li  v-for="(item,index) in menu_list[gameType.classId]" @click="changShowId(item.showId,item.title)" :class="showId==item.showId?'active':''">
				{{item.title}}
			</li>
		</ul>
        <!--官方玩法列表-->
		<ul class="level_1" v-if="model=='1'">
			<li v-if="item.gameId!='nn'" v-for="(item,index) in playList.standGameList" @click="changIvOne(index)" :class="playType.gameId==item.gameId?'active':''">
				{{item.gameName}}
			</li>
		</ul>
		
		<ul class="level_2" v-if="model=='1'">
			<li class="lv2_item" v-for="(item1,index1) in childs">
				<span class="left">{{item1.leftName}}</span>
				<ul class="right">
					<!--<li class="sub" v-if="!item1.list" @click="changIvTwo(item1)" :class="{active:betType.subGameId==item1.subGameId}">{{item1.rightName}}</li>-->

					<li class="sub" v-if="item1.list" @click="changIvTwo(item2)" v-for="(item2,index2) in item1.list" :class="{active:betType.subGameId==item2.subGameId}">{{item2.rightName}}</li>
				</ul>

			</li>
		</ul>
	</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { menu_list } from "../createconfig/lmp_menulist";
export default {
  computed: {
    ...mapState("bet", [
      "showId",
      "betType",
      "gameType",
      "playType",
      "childs",
      "model"
    ])
  },
  props: ["playList"],
  data() {
    return {
      menu_list: menu_list
    };
  },
  created() {
    this.SET_PLAYTYPE(this.playList.standGameList[0]);

    //默认选择第一个玩法
    if (this.gameType.classId == "3" || this.gameType.classId == "6") {
      this.SET_SHOWID(this.menu_list[this.gameType.classId][0].showId);
      this.SET_LMP_TITLE(this.menu_list[this.gameType.classId][0].title);
    }
  },
  methods: {
    ...mapActions("login", ["getUserDetails"]),
    ...mapActions("bet", ["getBetRates", "getGameInfo", "betTypeMap","updateGameType"]),
    ...mapMutations("bet", [
      "SET_LMP_TITLE",
      "SET_SHOWID",
      "SET_MODEL",
      "SET_CHILDS",
      "SET_PLAYTYPE",
      "SET_BETTYPEMAP",
      "SET_BET_TYPE",
      "SET_PLAY_TYPE",
      "SET_BETNUMBERS"
    ]),
    //切换两面盘玩法id
    changShowId(showId, title) {
      this.SET_SHOWID(showId);
      this.SET_LMP_TITLE(title);
      this.$emit("closeMenu");
    },
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

      this.$emit("closeMenu");
    },
    //切换彩种或大玩法时，重置导航选中项为第一个
    initActiveName() {},
    //改变游戏模式，官方或两面
    changeModel(value) {
      this.SET_MODEL(value);
      this.updateGameType(
					"/"+value
				).then((res) => {
					this.getUserDetails()
				})
    },
    //改变玩法
    changeGamePlay() {
      let playType = this.playType;
      let betType = {},
        betTypeMap = {};
      let gameSonsArray = [],
        leftName = "",
        gameSonsTemp = {
          leftName: "",
          list: []
        },
        subTypes = {},
        subTypesNumber = 0;
      if (playType && playType.gameId) {
        //gameSons子玩法id
        playType.gameSons.forEach(item => {
          if (!subTypes[item.leftName]) {
            subTypes[item.leftName] = true;
            subTypesNumber++;
          }
          if (leftName === item.leftName) {
            gameSonsTemp.list.push(item);
          } else {
            if (gameSonsTemp.leftName) {
              gameSonsArray.push({
                ...gameSonsTemp
              });
            }
            leftName = item.leftName;
            gameSonsTemp = {
              leftName,
              list: [item]
            };
          }
        });
      }
      gameSonsArray.push({
        ...gameSonsTemp
      });

      let childs = [];
      if (
        playType.gameId === "3014" ||
        playType.gameId === "4001" ||
        playType.gameId === "6005" ||
        playType.gameId === "4010" ||
        playType.gameId === "4010" ||
        playType.gameId === "4012" ||
        playType.gameId === "2003" ||
        playType.gameId === "2005" ||
        playType.gameId === "2006" ||
        playType.gameId === "2007" ||
        playType.gameId === "2008"
      ) {
        let list = [];
        gameSonsArray.forEach(game => {
          let keys = game.list.reduce(
            (prev, item) => [...prev, item.subGameId],
            []
          );
          list.push(
            //两面盘下面的子玩法
            {
              subGameId: keys.toString(),
              leftName: game.leftName,
              rightName: game.leftName
            }
          );
        });
        childs.push({
          leftName: playType.gameName,
          list: list
        });
      } else if (playType.gameSons.length > 6 || gameSonsArray.length === 1) {
        //子玩法大于6并且子玩法下的小玩法数量大于1 显示小玩法列表
        gameSonsArray.forEach(game => {
          childs.push({
            leftName: game.leftName,
            list: game.list
          });
        });
      } else {
        playType.gameSons.forEach(item => {
          childs.push({
            leftName: item.leftName,
            list: [
              {
                subGameId: item.subGameId,
                leftName: item.leftName,
                rightName: item.rightName
              }
            ]
          });
        });
      }
      betType = {
        leftName: childs[0].list[0].leftName,
        rightName: childs[0].list[0].rightName,
        subGameId: childs[0].list[0].subGameId
      };
      this.SET_CHILDS(childs);
      playType.gameSons.forEach(item => (betTypeMap[item.subGameId] = item));
      this.SET_BETTYPEMAP(betTypeMap);
      this.SET_BETNUMBERS(betType); //生成选号按钮
      this.SET_BET_TYPE(betType);
      this.getBetRates({
        gameIds: betType.subGameId.split(",")
      }); //获取赔率信息
    }
  },
  watch: {
    //监听切换彩类
    currentPlayList() {},
    //监听playType，改变导航玩法
    playType() {
      this.changeGamePlay();
    },
    gameType() {
      this.SET_PLAYTYPE(this.playList.standGameList[0]);

      //默认选择第一个玩法
      if (this.gameType.classId == "3" || this.gameType.classId == "6") {
        this.SET_SHOWID(this.menu_list[this.gameType.classId][0].showId);
        this.SET_LMP_TITLE(this.menu_list[this.gameType.classId][0].title);
      }
      this.$emit("closeMenu");
    }
  }
};
</script>

<style lang="less">
.menu {
  width: 100%;
  position: fixed;
  left: 0;
  top: 1rem;
  font-size: 0.24rem;
  background: #ffffff;
  z-index: 1001;
  border-bottom: 1px solid #ff5151;
  .menu-tab {
    display: flex;
    background-color: #fff;
    height: 0.8rem;
    padding-top: 0.1rem;
    line-height: 0.7rem;
    font-size: 0.28rem;
    color: #5c5c5c;
    border-bottom: 1px solid #ff5151;
    .tab-item.tab-selected {
      height: 0.7rem;
      margin-left: 0.1rem;
      margin-right: 0.1rem;
      color: #ff5151;
      background: #f7f7f7;
      border: 1px solid #ff5151;
      border-bottom: none;
      box-sizing: border-box;
    }
    .tab-item {
      display: block;
      -ms-flex: 1;
      flex: 1;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background: linear-gradient(180deg, #e5e5e5, #e5e5e5, hsla(0, 0%, 90%, 0))
        0 100% no-repeat;
      background-size: 100% 1px;
      font-size: 0.28rem;
      text-align: center;
      color: #666;
      position: relative;
      background: none;
      height: 0.71rem;
      line-height: 0.7rem;
      border-top-left-radius: 0.14rem;
      border-top-right-radius: 0.14rem;
    }
  }
  .select {
    display: flex;
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.32rem;
    .selected {
      background: #f7f7f7;
      color: #0a77a0;
    }
    div {
      flex: 1;
      text-align: center;
    }
  }
  .level_1 {
    display: flex;
    justify-content: flex-start;
    background: #f7f7f7;
    /*box-shadow: 0 2px 10px rgba(41, 41, 41, .08);*/
    flex-wrap: wrap;
    min-height: 3rem;
    padding-top: 0.2rem;
  }
  .level_1 li {
    width: 1.59rem;
    height: 0.7rem;
    display: inline-block;
    margin: 0.1rem 0.14rem;
    line-height: 0.7rem;
    font-size: 14px;
    color: #5c5c5c;
    text-align: center;
    border-radius: 2px;
    background: #fff;
  }
  .lv2_item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /*border-top: 1px dotted #ddd;*/
  }
  .lv2_item .right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    flex: 1;
  }
  .lv2_item .left {
    height: 0.6rem;
    padding: 0 0.1rem;
    font-size: 0.28rem;
    line-height: 0.6rem;
    border: 1px solid #fff;
    color: #5c5c5c;
  }
  .level_2 {
    padding: 0.1rem;
    max-height:5rem;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .right .sub {
    font-size: 0.28rem;
    height: 0.6rem;
    width: 1.8rem;
    text-align: center;
    line-height: 0.6rem;
    color: #9b9b9b;
    border-radius: 0.04rem;
    margin: 0.1rem 0.06rem;
    border: 1px solid #e6e6e6;
  }
  .level_1 li.active {
    background: #ff5151;
    color: #fff;
  }
  .level_2 .sub.active {
    border: 1px solid #ff5151;
    color: #ff5151;
  }
}
</style>