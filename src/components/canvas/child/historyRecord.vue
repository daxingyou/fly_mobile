<template>
  <div id="historyRecord">
    <yd-navbar title="历史记录" bgcolor="#000">
      <a @click="cancle" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </a>
    </yd-navbar>
    <article class="main">
      <div class="container_top">
        <p>
          <i class="fa fa-calendar" style="color:#fff;font-size:20px;"></i>
          <input class="date" type="date" v-model="time">
        </p>
        <ul class="table_head">
          <li class="td_one">期数</li>
          <li class="td_two">时间</li>
          <li class="td_three">结果</li>
        </ul>
      </div>
      <div class="container_middle">
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
          <yd-list theme="1" slot="list">
            <yd-list-item v-for="(item,index) in dataList" :key="index">
              <yd-list-other slot="other">
                <div v-if="item.awardNum" class="unit">
                  <ul class="td_main">
                    <li class="td_one">{{item.awarPeriod}}</li>
                    <li style="flex:30%">{{item.awardTime.slice(-8,-3)}}</li>
                    <li class="seat">
                      <span
                        :class="isWin(item.awardNum.split(','),index0+1)?'isWin':''"
                        v-for="(item0,index0) of nums"
                        :key="index0"
                      >{{item0}}</span>
                    </li>
                  </ul>
                  <div class="result">
                    <span class="td_one" style="color: rgb(158, 158, 158);">结果牌面</span>
                    <div>
                      <p>
                        <span
                          :class="[classes[Number(item2)-1]]"
                          v-for="(item2,index2) of item.awardNum.split(',')"
                          :key="index2"
                        >{{Number(item2)}}</span>
                      </p>
                      <ul class="players">
                        <li
                          v-for="(item3,index3) of createDyadicArray(item.awardNum.split(','))"
                          :key="index3"
                        >
                          <i>{{players[index3].name}}</i>
                          <div class="cards">
                            <div
                              v-for="(item4,index4) of item3"
                              :key="index4"
                              :style="{backgroundPositionX: 'calc('+((item4.suitType-1)/3)*100+'%)',backgroundPositionY: 'calc('+((item4.num-1)/12)*100+'%)'}"
                            ></div>
                          </div>
                          <span
                            :class="[isWin(item.awardNum.split(','),index3)?'win':'fail',`game-info_${getCardType(objToArr(item3))}`]"
                          ></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </yd-list-other>
            </yd-list-item>
          </yd-list>

          <!-- 数据全部加载完毕显示 -->
          <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

          <!-- 加载中提示，不指定，将显示默认加载中图标 -->
          <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg">
        </yd-infinitescroll>
      </div>
    </article>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      time: "2019-02-15",
      dataList: [],
      classes: [
        "globe_01",
        "globe_02",
        "globe_03",
        "globe_04",
        "globe_05",
        "globe_06",
        "globe_07",
        "globe_08",
        "globe_09",
        "globe_10"
      ],
      lotteryNumbers: [],
      nums: ["一", "二", "三", "四", "五"],
      players: [
        {
          name: "庄",
          type: "z"
        },
        {
          name: "闲一",
          type: "x1"
        },
        {
          name: "闲二",
          type: "x2"
        },
        {
          name: "闲三",
          type: "x3"
        },
        {
          name: "闲四",
          type: "x4"
        },
        {
          name: "闲五",
          type: "x5"
        }
      ],
      page: 1
    };
  },
  created() {
    this.time = this.global.timeFormate(new Date());
  },
  mounted() {
    this.init(this.page);
  },
  methods: {
    ...mapActions("home", ["openRecord"]),
    init(page) {
      return new Promise((reslove, reject) => {
        this.openRecord(`/klft/${this.time}/${page}`).then(res => {
          if (res.code == 0) {
            this.dataList = [...this.dataList, ...res.data.winList];
            reslove();
          } else if (res.code == 1) {
            this.$dialog.toast({ mes: res.msg });
          }
        });
      });
    },

    //从数组中随机取一个数
    random(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    //判断牛几
    getCardType(num) {
      //判断牛几 -1代表无牛 10代表牛牛 其他数字代表牛几
      let cardsTotal = 0; //cow表示牛，cardsTotal表示数字总和
      let hasTen = false; //表示有没有 10
      let cow = -1; //默认没有牛
      num = num.sort(); //排序
      num = num.map(value => {
        return parseInt(value);
      });
      let card = new Array(5);
      for (let i = 0; i < num.length; i++) {
        if (num[i] >= 10) {
          hasTen = true;
        }
        card[i] = num[4 - i]; //倒序
        cardsTotal += card[i]; //计算五个数字总和
      }
      //根据有没有 10 分情况讨论
      if (hasTen) {
        //有10的情况下 剩余四个数里有2个之和为10 或者 3个之和能被10整除
        for (let i = 1; i < 4; i++) {
          for (let j = i + 1; j < 5; j++) {
            if (
              card[i] + card[j] == 10 ||
              (cardsTotal - 10 - card[i]) % 10 == 0 ||
              (cardsTotal - 10 - card[j]) % 10 == 0
            ) {
              cow = (cardsTotal - 10) % 10;
            }
          }
        }
      } else {
        //没有10的情况下 有三个数之和能被10整除
        for (let i = 0; i < 4; i++) {
          for (let j = i + 1; j < 5; j++) {
            if ((cardsTotal - card[i] - card[j]) % 10 == 0) {
              cow = (card[i] + card[j]) % 10;
            }
          }
        }
      }
      //转换将牛牛变为10
      if (cow == 0) {
        cow = 10;
      }
      //转换将无牛变为0
      if (cow == -1) {
        cow = 0;
      }
      return cow;
    },
    //根据开奖结果，判断牌型大小
    getGameResult(numbers) {
      let types = [];
      //获取庄家，闲家牌组
      let myarr = new Array(),
        start = 0,
        end = start + 5;
      for (let i = 0; i < numbers.length; i++) {
        if (end > numbers.length) {
          break;
        }
        myarr.push(numbers.slice(start, end));
        start += 1;
        end += 1;
      }
      for (let i = 0; i < myarr.length; i++) {
        types.push(this.getCardType(myarr[i]));
      }
      let result = {
        z: {},
        x1: {},
        x2: {},
        x3: {},
        x4: {},
        x5: {}
      };
      let zType = types[0],
        zNum = myarr[0],
        x1Type = types[1],
        x1Num = myarr[1],
        x2Type = types[2],
        x2Num = myarr[2],
        x3Type = types[3],
        x3Num = myarr[3],
        x4Type = types[4],
        x4Num = myarr[4],
        x5Type = types[5],
        x5Num = myarr[5];
      result.z.type = zType;
      result.z.isWin = true; //默认庄家为赢
      //判断闲家输赢
      for (let key in result) {
        if (key !== "z") {
          result[key].type = eval(key + "Type");
          if (eval(key + "Type") > zType) {
            result[key].isWin = true;
            //只要有一个闲家为赢则判庄家负
            result.z.isWin = false;
          } else if (eval(key + "Type") === zType) {
            result[key].isWin = eval(key + "Num")[0] > zNum[0] ? true : false;
            result[key].isWin ? (result.z.isWin = false) : null;
          } else {
            result[key].isWin = false;
          }
        }
      }
      return result;
    },

    loadList() {
      this.init(++this.page).then(() => {
        this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
      });
    },
    cancle(){
      this.$emit('cancle',false)
    }
  },
  computed: {
    //创建开奖的二维数组
    createDyadicArray(numbers) {
      return function(numbers) {
        let myarr = new Array(),
          start = 0,
          end = start + 5,
          arr = [],
          numAry = [];
        for (let i = 0; i < numbers.length; i++) {
          if (end > numbers.length) {
            return myarr;
          }
          arr = [];
          numAry = numbers.slice(start, end);
          for (let j = 0; j < numAry.length; j++) {
            let obj = {};
            obj.num = numAry[j];
            //1234分别对应4种花色桃杏梅方
            obj.suitType = this.random([1, 2, 3, 4]);
            arr.push(obj);
          }
          start += 1;
          end += 1;
          myarr.push(arr);
        }
        return myarr;
      };
    },
    objToArr(arrs) {
      return function(arrs) {
        let arr = Array.of();
        for (let item of arrs) {
          arr.push(item.num);
        }
        return arr;
      };
    },
    isWin(arr, index) {
      return function(arr, index) {
        return this.getGameResult(arr)[this.players[index].type].isWin;
      };
    }
  },
  watch: {
    time(newValue) {
      this.page = 1;
      this.openRecord(`/klft/${newValue}/${this.page}`).then(res => {
        if (res.code == 0) {
          this.dataList = [...res.data.winList];
        } else if (res.code == 1) {
          this.$dialog.toast({ mes: res.msg });
        }
      });
    }
  }
};
</script>

<style lang="less">
#historyRecord {
  background: #000;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 0.25rem;
  position: fixed;
  width: 100%;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 100;
  .yd-navbar {
    background: #000 !important;
  }
  .main {
    flex: 1;
    padding-top: 1rem;
    color: #fff;
    display: flex;
    flex-direction: column;
    .td_one {
      flex-basis: 30%;
    }
    .td_two {
      flex-basis: 60%;
    }
    .td_three {
      flex: 1;
      text-align: right;
    }
    .container_top {
      padding: 0.3rem;
      p {
        display: flex;
        align-items: center;
        padding-bottom: 0.2rem;
        .date {
          border: none;
          border-bottom: 1px solid #fff;
          text-align: center;
          margin-left: 0.2rem;
        }
      }
      .table_head {
        border-bottom: 1px solid rgb(158, 158, 158);
        display: flex;
        color: rgb(158, 158, 158);
        li {
          line-height: 0.5rem;
        }
      }
    }
    .container_middle {
      flex: 1;
      overflow: scroll;

      -webkit-overflow-scrolling: touch;
      .yd-list {
        padding: 0 0.3rem;
        .yd-list-item {
          width: 100%;
          padding: 0;
          .yd-list-img {
            width: 0;
            height: 0;
            padding: 0;
            margin: 0;
          }
          .yd-list-mes {
            background: transparent;
            padding: 0;
            .yd-list-title {
              width: 0;
              height: 0;
            }
            .unit {
              width: 100%;
              color: #fff;
              border-bottom: 1px solid rgb(112, 112, 112);
              .td_main {
                display: flex;
                align-items: center;
                .seat {
                  display: flex;
                  span {
                    width: 0.4rem;
                    height: 0.4rem;
                    border: 1px solid #fff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                  }
                  .isWin {
                    background-color: rgb(4, 186, 238);
                  }
                }
              }
              .result {
                display: flex;
                // align-items: center;
                margin-top: 0.2rem;
                p {
                  display: flex;
                  span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 0.38rem;
                    height: 0.38rem;
                    border-radius: 50%;
                    font-weight: bold;
                    margin-right: 0.1rem;
                  }
                }
                .players {
                  margin-top: 0.2rem;
                  li {
                    display: flex;
                    margin-bottom: 0.2rem;
                    align-items: center;
                    &:nth-child(1) {
                      i {
                        color: rgb(255, 64, 71);
                      }
                    }
                    .cards {
                      display: flex;
                      div {
                        height: 5vw;
                        width: 3.75vw;
                        background-image: url(../cardGroup.png);
                        background-size: 400% 1300%;
                        margin-left: -0.8vw;
                        border-radius: 0.6vw;
                      }
                    }
                    i {
                      display: block;
                      width: 1rem;
                      color: rgb(4, 186, 238);
                      font-weight: bold;
                    }
                    .win {
                      height: 5vw;
                      width: 10vw;
                      background-image: url(../cow.png);
                      background-size: 100% 1100%;
                    }
                    .fail {
                      height: 5vw;
                      width: 10vw;
                      background-image: url(../cow1.png);
                      background-size: 100% 1100%;
                    }
                    .game-info_0 {
                      background-position-x: 0px;
                      background-position-y: calc(0%);
                    }

                    .game-info_1 {
                      background-position-x: 0px;
                      background-position-y: calc(10%);
                    }

                    .game-info_2 {
                      background-position-x: 0px;
                      background-position-y: calc(20%);
                    }

                    .game-info_3 {
                      background-position-x: 0px;
                      background-position-y: calc(30%);
                    }

                    .game-info_4 {
                      background-position-x: 0px;
                      background-position-y: calc(40%);
                    }

                    .game-info_5 {
                      background-position-x: 0px;
                      background-position-y: calc(50%);
                    }

                    .game-info_6 {
                      background-position-x: 0px;
                      background-position-y: calc(60%);
                    }

                    .game-info_7 {
                      background-position-x: 0px;
                      background-position-y: calc(70%);
                    }

                    .game-info_8 {
                      background-position-x: 0px;
                      background-position-y: calc(80%);
                    }

                    .game-info_9 {
                      background-position-x: 0px;
                      background-position-y: calc(90%);
                    }

                    .game-info_10 {
                      background-position-x: 0px;
                      background-position-y: calc(100%);
                    }
                  }
                }
              }
              .globe_01 {
                background-color: rgb(245, 216, 66);
              }
              .globe_02 {
                background-color: rgb(11, 92, 153);
              }
              .globe_03 {
                background-color: rgb(74, 74, 74);
              }
              .globe_04 {
                background-color: rgb(242, 134, 47);
              }
              .globe_05 {
                background-color: rgb(31, 183, 245);
              }
              .globe_06 {
                background-color: rgb(131, 40, 128);
              }
              .globe_07 {
                background-color: rgb(155, 155, 155);
              }
              .globe_08 {
                background-color: rgb(230, 30, 43);
              }
              .globe_09 {
                background-color: rgb(144, 18, 29);
              }
              .globe_10 {
                background-color: rgb(56, 169, 71);
              }
            }
          }
        }
      }
    }
  }
}
</style>
