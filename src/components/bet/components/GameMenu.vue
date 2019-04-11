<template>
    <yd-popup  position="center"  class="gameMenu" v-model="$parent.showGameMenu">
        <div style="display: flex;background: #FFFFFF;border-radius:3px" v-if="kindList.length>0">
          <ul style="background: #f7f7f7;" class="left">
            <li @click="$router.push('/allKinds')">
              <img style="width: 0.5rem;" src="../style/img/Coloured_hall_Not_Selected.png">
              <span>游戏大厅</span>
              <img style="width: 0.3rem;">
            </li>
            <li
              v-for="(item,index) in kindList"
              @click="selClassId(item.classId)"
              :class="cache_classId==item.classId?'active':''"
              :key="index"
              v-if="item.kindList.length != 0"
            >
           
              <div :class="'game-ico game-ico-'+item.classId"></div>
              <span>{{item.className}}</span>
              <img style="width: 0.3rem;" >
            </li>
          </ul>
          <ul class="right" v-for="(item1,index1) in kindList" v-if="item1.classId==cache_classId">
            <li
              v-for="(item2,index2) in item1.kindList"
              :key="index2"
              @click="selKindId(item2.kindId,item2.kindName)"
              :class="cache_kindId==item2.kindId?'active':''"
            >{{item2.kindName}}</li>
          </ul>
        </div>
        
      </yd-popup>
	
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import gameConfig from "@/components/bet/createconfig/gameConfig.js";
export default {
  computed: {
    ...mapState("bet", ["gameType", "kindList"])
  },
  data() {
    return {
      cache_classId: "",
      cache_kindId: "",
      sel_kind_idx: 0
    };
  },
  created() {
    this.getKindList();
    this.cache_classId = this.gameType.classId;
    this.cache_kindId = this.gameType.kindId;
  },
  methods: {
    ...mapMutations("bet", ["SET_GAMETYPE"]),
    ...mapActions("bet", ["getKindList", "getGameInfo", "getPlayList"]),
    selClassId(classId) {
      this.cache_classId = classId;
    },
    selKindId(kindId, kindName) {
      console.log(kindName);
      this.cache_kindId = kindId;
      Promise.all([
        this.getGameInfo("/" + this.cache_kindId), //获取开奖历史
        this.getPlayList(`/${this.cache_classId}/${this.cache_kindId}`) //获取小彩类玩法
      ]).then(values => {
        if (values[0].code === 0) {
          //缓存开奖数据
          sessionStorage.setItem("gameInfo", JSON.stringify(values[0]));
        }
        if (values[1].code === 0) {
          //缓存玩法数据
          sessionStorage.setItem(
            this.cache_kindId,
            JSON.stringify(values[1].data.standGameList)
          );
        }
        this.SET_GAMETYPE({
          classId: this.cache_classId,
          kindId: this.cache_kindId,
          kindName: kindName,
          periodNoAll: gameConfig[this.cache_kindId].periodNoAll
        });
        sessionStorage.setItem(
          "gameType",
          JSON.stringify({
            classId: this.cache_classId,
            kindId: this.cache_kindId,
            kindName: kindName,
            periodNoAll: gameConfig[this.cache_kindId].periodNoAll
          })
        );
        this.$parent.showGameMenu = false;
      });
    }
  }
};
</script>

<style lang="less">
.gameMenu {
  z-index: 1502;

  .yd-popup-center {
    width: 6.2rem !important;
    height: 7rem !important;
    color: #5c5c5c;
    font-size: 14px;
    .yd-popup-content {
      height: 100%;
      .left {
        padding: 0.2rem;
        border-radius: 3px 0 0 3px;
        width: 50%;
        height: 6.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        li {
          padding: 0.1rem;
          flex: 1;
          display: flex;
          align-items: center;
          border-bottom: 1px dotted #c5cad0;
          justify-content: space-between;
          .game-ico {
            width: 0.5rem;
            height: 0.5rem;
            background-size: 100% 100%;
          }
          .game-ico-1 {
            background-image: url(../style/img/1.png);
          }
          .game-ico-2 {
            background-image: url(../style/img/2.png);
          }
          .game-ico-3 {
            background-image: url(../style/img/3.png);
          }
          .game-ico-4 {
            background-image: url(../style/img/4.png);
          }
          .game-ico-5 {
            background-image: url(../style/img/5.png);
          }
          .game-ico-6 {
            background-image: url(../style/img/6.png);
          }
        }

        .active {
          color: #ff5151;
        }
      }
      .right {
        padding: 0.2rem;
        border-radius: 0px 3px 3px 0px;
        width: 50%;
        height: 6.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        li {
          width: 2rem;
          height: 0.7rem;
          border-radius: 4px;
          border: 1px solid #e6e6e6;
          line-height: 0.7rem;
          text-align: center;
          margin: 0.1rem;
        }
        .active {
          color: #ff5151;
          border-color: rgba(255, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>