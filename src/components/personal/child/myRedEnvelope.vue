<template>
  <div class="myRedEnvelope">
    <div class="header">
      <div @click="$router.push({name:'home'})">
        <img src="../../../../static/img/Navbar_return.png">
        <span class="header_left">{{envelope}}</span>
      </div>
      <div>我的红包</div>
      <div @click="show2 = true">
        <img class="dian" src="../../../../static/img/dian.png" alt>
      </div>
    </div>
    <div class="myRedEnvelope_center">
      <div class="center_top">
        <img class="avatar" src="../../../../static/img/avatar.jpg">
        <p>{{userDetails.account}}{{envelope}}</p>
        <div>
          <span class="moneyNum">{{sumAmount}}</span>
          <span>元</span>
        </div>
        <div class="years" @click="show1 = true">
          <p>{{years}}年</p>
          <img src="../../../../static/img/xia.png" alt>
        </div>
      </div>
      <ul class="center_list">
        <li v-for="item in envelopeList">
          <div>
            <span class="left">
              {{item.account}}
              <span style="color:#ff8200;">{{item.type}}</span>
            </span>
            <span class="right">{{item.amount}}元</span>
          </div>
          <p>{{item.time}}</p>
        </li>
      </ul>
    </div>
    <yd-popup v-model="show2" position="bottom" height="25%">
      <p class="bottom_P" @click="changeEnvelope('全部红包','',)">全部红包</p>
      <p class="bottom_P" @click="changeEnvelope('发出的红包',61)">发出的红包</p>
      <p class="bottom_P" @click="changeEnvelope('收到的红包',62)">收到的红包</p>
      <p class="bottom_P" @click="changeEnvelope('红包雨',46)">红包雨</p>
    </yd-popup>
    <yd-popup v-model="show1" position="center" width="50%">
      <div class="yearsList" style="background-color:#fff;height:3.5rem;padding:0.25rem">
        <h1>选择年份</h1>
        <yd-radio-group v-model="years">
          <yd-radio val="2019">2019年</yd-radio>
          <yd-radio val="2018">2018年</yd-radio>
          <yd-radio val="2017">2017年</yd-radio>
        </yd-radio-group>
      </div>
    </yd-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      envelope: "全部红包",
      show2: false,
      show1: false,
      envelopeList: [],
      years: "2019",
      type:"",
      sumAmount:"0.00"
    };
  },
  computed: {
    ...mapState("login", ["userDetails"])
  },
  created() {
    this._queryRedPacket('',this.years);
  },
  methods: {
    ...mapActions("personal", ["myCash", "queryRedPacket"]),
    changeEnvelope(name,type) {
      this.envelope = name;
      this.show2 = false;
      this._queryRedPacket(type,this.years)
    },
    _queryRedPacket(type,years) {
      this.type = type;
      // this.years = years;
      this.queryRedPacket({
        time: years,
        type:type,
      }).then(res => {
        console.log(res);
        this.envelopeList = res.data;
        this.sumAmount =(Math.abs(res.sumAmount)).toFixed(2) 
      });
    },
  },
  watch: {
    years(val,oldVal){
      console.log(val,oldVal)
      this._queryRedPacket(this.type,val);
      this.show1 = false;
    }
  }
};
</script>

<style lang="less" scoped>
.myRedEnvelope {
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .header {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 1rem;
    // background-color: #011935;
    background: linear-gradient(135deg,rgba(19,46,123,1) 0,rgba(0,201,202,1) 100%) !important;
    color: rgb(255, 255, 255);
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ffffff;
    div {
      float: left;
      width: 28%;
      overflow: hidden;
      text-align: center;
    }
    div:nth-child(2) {
      width: 46%;

      text-align: center;
    }
    div:nth-child(1) {
      // width: 24%;
      height: 100%;
      padding-left: 0.3rem;
      // text-align: left;
      img {
        float: left;
        margin-top: 18%;
      }
      span {
        float: left;
        font-size: 14px;
        padding-left: 0.1rem;
        height: 1rem;
        line-height: 1rem;
      }
    }
    div:nth-child(3) {
      text-align: right;
    }
    .dian {
      width: 30%;
      margin-top: 10%;
      margin-right: 10%;
    }
  }
  .myRedEnvelope_center {
    // position: relative;
    flex: 1;
    width: 100%;
    // min-height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    padding-top: 1rem;
    margin-bottom: 5px;
    .center_top {
      position: relative;
      text-align: center;
      overflow: hidden;
      padding-top: 1rem;
      .avatar {
        height: 1.8rem;
        width: 1.8rem;
        border-radius: 0.2rem;
      }
      p {
        height: 0.8rem;
        line-height: 0.8rem;
      }
      div {
        .moneyNum {
          font-size: 24px;
        }
      }
      .years {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        width: 1.5rem;
        color: #b29c75;
        p {
          height: 0.6rem;
          line-height: 0.6rem;
        }
        img {
          width: 0.5rem;
        }
      }
    }
  }
  .bottom_P {
    height: 0.8rem;
    line-height: 0.8rem;
    padding-left: 0.8rem;
  }
  .center_list {
    overflow: hidden;
    li {
      height: 1rem;
      width: 100%;
      padding: 0 0.5rem;
      background: #ffffff;

      div {
        height: 0.5rem;
        width: 100%;
        font-weight: 700;
        font-size: 16px;
        color: #000;
        .left {
          float: left;
          line-height: 0.5rem;
        }
        .right {
          float: right;
          line-height: 0.6rem;
        }
      }
      p {
        height: 0.5rem;
        color: #ccc;
        padding: 0.1rem;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .yearsList{
    h1{
       margin-bottom: 0.2rem !important;
    }
    .yd-radio{
      display: block !important;
      margin-bottom: 0.2rem !important;
    }
  }
}
</style>
