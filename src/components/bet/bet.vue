<template>
	<div  class="bet" id="bet" v-if="showBet" >
		<BetHeader v-show="!showLmpHelp" :gameType="gameType" :isOpen="isOpen" @openGameMenu="openGameMenu" @isOpen="openMenu" />
		<PlayListMenu @closeMenu="isOpen=false" :playList="playList" v-if="playList.standGameList.length!=0" v-show="isOpen" />
		<ClockView v-show="!showLmpHelp" @showLotteryDetails="showLotteryDetails" />
		<LotteryDetails ></LotteryDetails>
		<!-- 小助手 -->
        <div class="Assis_tant" v-show="assis_tant">
          <Assistant @gameHelp="showGameHelp" :assis_tant="assis_tant" @close="assis_tant=false"></Assistant>
        </div>
		<GameMenu />
		<GameHelp />
		<LmpHelp v-if="showLmpHelp"></LmpHelp>
		<NumbersBoard v-if="model == '1'"></NumbersBoard>
		<LmpNumbersBoard v-show="!showLmpHelp" v-if="model == '2'"></LmpNumbersBoard>
		<BetFooter v-show="!showLmpHelp"></BetFooter>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import BetHeader from "./components/BetHeader";
import BetFooter from "./components/BetFooter";
import PlayListMenu from "./components/PlayListMenu";
import ClockView from "./components/ClockView";
import LotteryDetails from "./components/LotteryDetails";
import NumbersBoard from "./components/NumbersBoard";
import LmpNumbersBoard from "./components/LmpNumbersBoard";
import GameMenu from "./components/GameMenu";
import GameHelp from "./components/GameHelp";
import LmpHelp from "./components/LmpHelp";
import Assistant from "@/components/home/dome/assistant.vue";
import mixin from "./utils/mixins";
export default {
  mixins: [mixin],
  data() {
    return {
      isOpen: false, //控制菜单的打开关闭
      isLottery: false,
      showBet: true,
      showGameMenu: false,
      assis_tant: false,
      showHelp: false,
      showLmpHelp: false
    };
  },
  components: {
    BetHeader,
    PlayListMenu,
    ClockView,
    LotteryDetails,
    NumbersBoard,
    LmpNumbersBoard,
    BetFooter,
    Assistant,
    GameMenu,
    GameHelp,
    LmpHelp
  },

  created() {
    
  },
  computed: {
    ...mapState("bet", ["gameType", "playList", "model", "gameInfo"]),
    ...mapState("login", ["userDetails"])
  },
  methods: {
    ...mapActions("login", ["getUserDetails"]),
    ...mapActions("bet", ["getGameInfo", "getPlayList"]),
    ...mapMutations("bet", ["SET_MODEL", "SET_GAMETYPE","DELETE_ALL_SHOPPINGLIST"]),
   
    openMenu(isOpen) {
      this.isOpen = isOpen;
    },
    showLotteryDetails() {
      this.isLottery = !this.isLottery;
    },
    openGameMenu() {
      this.showGameMenu = true;
    },
    showGameHelp() {
      if (this.model == "1") {
        this.showHelp = true;
      } else {
        this.showLmpHelp = true;
      }
    },
  },
  watch: {
    gameType() {
      if (this.gameType.classId !== "3" && this.gameType.classId !== "6") {
        this.SET_MODEL("1");
      }
      //切换彩种，删除购彩篮里所有注单
      this.DELETE_ALL_SHOPPINGLIST();
    },
  }
};
</script>

<style lang="less">
.bet {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .select {
    background: #ffffff;
    width: 1.2rem;
    height: 0.4rem;
    border-radius: 0 0 0.08rem 0.08rem;
    border: 1px solid #c5cad0;
    border-top: 1px solid #ffffff;
    margin: 0 auto;
    z-index: 1000;
  }
  .select > div {
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: url(../../images/bottom.png) no-repeat center;
    background-size: 0.4rem 0.4rem;
  }
  .select.open > div {
    z-index: 1000;
    transform: rotate(180deg);
    /*margin-top: -1px;*/
  }
  .Assis_tant {
    position: fixed;
    top: 1rem;
    left: 0;
    width: 100%;
    height: calc(100% - 1rem - 0px);
    z-index: 1001;
    /* background: #2dabf3; */
  }
}
</style>