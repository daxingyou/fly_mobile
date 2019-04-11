<template>
    <div id="packet">
        <section class="section_1" :style="{backgroundColor:bgc?'#f9b77c':'#ff8f2a'}">
            <div class="_Top">
                <img v-if="!open" src="../../../../../static/img/chartroom/redPacket_close.png" alt="">
                <img v-else src="../../../../../static/img/chartroom/redPacket_open.png" alt="">
                <div>
                    <p>恭喜发财，大吉大利</p>
                    <span>{{text}}</span>
                </div>
            </div>
        </section>
        <section class="section_2">
            <span>福彩红包</span>
        </section>
    </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    }
  },
  data() {
    return {
      open: false,
      //背景深浅
      bgc: false,
      text: "",
      packetStatus: ""
    };
  },
  created() {
    this.packetStatus = this.redPacketStatus();
    this.selectType();
  },
  methods: {
    //红包状态
    redPacketStatus() {
      let that = this;
      let _currentStatus = {};
      let status = {
        //红包开
        packetOpen: () => {
          this.open = true;
        },
        //红包未开
        packetClose: () => {
          this.open = false;
        },
        //红包背景深
        packetBcgDeep: () => {
          this.bgc = false;
        },
        //红包背景浅
        packetBcgShallow: () => {
          this.bgc = true;
        }
      };
      let actions = {
        changeStatus(...types) {
          _currentStatus = {};
          if (types.length !== 0) {
            for (let item of types) {
              _currentStatus[item] = true;
            }
          }
          return this;
        },
        goes(txt) {
          if (txt) {
            that.text = txt;
          }
          for (let [key, item] of Object.entries(_currentStatus)) {
            status[key] && status[key]();
          }
          return this;
        }
      };
      return {
        change: actions.changeStatus,
        goes: actions.goes
      };
    },
    //红包的几种类型
    selectType() {
      if (this.type === "1") {
        //红包打开，背景浅
        this.packetStatus
          .change("packetOpen", "packetBcgShallow")
          .goes("查看红包");
      } else if (this.type === "2") {
        //红包未开，背景深
        this.packetStatus
          .change("packetClose", "packetBcgDeep")
          .goes("领取红包");
      } else if (this.type === "3") {
        //红包未开，背景深（群红包）查看红包
        this.packetStatus
          .change("packetClose", "packetBcgDeep")
          .goes("查看红包");
      } else if (this.type === "4") {
        //红包打开，背景浅  已领取
        this.packetStatus
          .change("packetOpen", "packetBcgShallow")
          .goes("红包已领取");
      } else if (this.type === "5") {
        this.packetStatus
          .change("packetClose", "packetBcgShallow")
          .goes("红包已过期");
      }
    }
  },
  watch: {
    type() {
      this.selectType();
    }
  }
};
</script>

<style lang="less">
#packet {
  display: table-cell;
  font-size: 0.28rem;
  .section_1 {
    border-radius: 4px 4px 0 0;
    ._Top {
      display: flex;
      align-items: center;
      color: #fff;
      padding: 0.2rem 0.3rem;
      img {
        flex-shrink: 0;
        width: 34px;
        height: 34px;
        margin-right: 0.2rem;
      }
      span {
        font-size: 0.2rem;
      }
    }
  }
  .section_2 {
    border-radius: 0 0 4px 4px;
    background: #fff;
    span {
      font-size: 0.23rem;
      padding: 0.1rem 0.2rem;
      color: #000;
    }
  }
}
</style>
