<template>
  <div id="redPacketInformation">
    <yd-navbar ref="header">
      <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
      <div slot="center" class="title">
        红包详情
      </div>
    </yd-navbar>
    <div class="container">
      <div>
        <ul>
          <li>
            <div id="_img" :class="$route.params.singleOrGroup==='1'?'sprite-icon-'+datas.icon:'sprite-icon-'+userDetails.avatar"></div>
          </li>
          <li>{{$route.params.singleOrGroup==='1'?datas.nickName:userDetails.account}}</li>
        </ul>
      </div>
      <div class="info" v-if="$route.params.singleOrGroup==='1'">
        <p>红包金额
          <i>{{money}}元</i>
        </p>
        <!-- <span v-if="key==='2'">{{status}}</span> -->
        <span style="font-size:12px;">{{status}}</span>
      </div>
      <section v-else class="_info">
        <p v-if="!expire">红包金额
          <i>{{personalList?personalList['领取金额']:0}} 元</i>
        </p>
        <p v-else>
          <i>{{status}}</i>
        </p>
        <div class="friendList">
          <h6 class="_tips">已领取{{redPacketMessage.number-redPacketMessage.remainNumber}}/{{redPacketMessage.number}}个，共{{realCount}}/{{allCount}}元</h6>
          <MessageBox :readOnly="true" v-for="(item,index) in dataLists" :key="index" mode="2" :name="item['领取人账号']">
            <div id="_img" slot="img" :class="'sprite-icon-'+item.icon"></div>
            <span style="font-size:12px;margin-top:.1rem;" slot="tips">{{item['领取时间']}}</span>
            <span style="font-weight:900" slot="button">{{item['领取金额']}} 元</span>
          </MessageBox>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import MessageBox from "../../../common/messageBox.vue";
export default {
  data() {
    return {
      //群红包里领取记录
      dataLists: [],
      //点击红包时，传过来的数据
      datas: {},
      singleOrGroup: "",
      money: "",
      //是否领取的状态，如领取则显示领取时间
      status: "",
      //红包信息
      redPacketMessage: "",
      expire: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions("chart", ["redPacketInfo"]),
    init() {
      this.datas = JSON.parse(this.$route.query.datas);
      this.singleOrGroup = this.$route.params.singleOrGroup;
      this.redPacketInfo(`/${this.datas.content}/${this.singleOrGroup}`).then(
        res => {
          if (res.code === 0) {
            //红包未打开
            if (this.datas.openStatus === "2") {
              this.money = res["金额"];
              this.status = res["领取状态"];
              if (
                new Date().getTime() - this.datas.sendTime >
                24 * 3600 * 1000
              ) {
                if (this.singleOrGroup === "1") {
                  this.money = res["红包信息"].amount;
                  this.status = "红包已过期";
                } else {
                  this.expire = true;
                  this.dataLists = res["领取记录"];
                  this.redPacketMessage = res["红包信息"];
                  this.status = "红包已过期";
                }
              }
            } else {
              //已打开时，查看自己红包
              if (this.modeType(this.datas) === "right") {
                //单聊时
                if (this.singleOrGroup === "1") {
                  this.money = res["金额"];
                  if (res["领取时间"]) {
                    this.status = `领取时间：` + res["领取时间"];
                  } else {
                    this.status = res["领取状态"];
                  }
                } else {
                  //群聊时
                  this.$nextTick(() => {
                    this.dataLists = res["领取记录"];
                    this.redPacketMessage = res["红包信息"];
                  });
                }
              } else {
                if (this.singleOrGroup === "1") {
                  //已打开时，查看对方红包
                  if (res["领取记录"].length !== 0) {
                    this.money = res["领取记录"][0]["领取金额"];
                    this.status = `领取时间：` + res["领取记录"][0]["领取时间"];
                  } else {
                    this.money = res["红包信息"].amount;
                    this.status = `该红包无人领取`;
                  }
                } else {
                  //群聊时
                  this.$nextTick(() => {
                    this.dataLists = res["领取记录"];
                    this.redPacketMessage = res["红包信息"];
                  });
                }
              }
            }
          } else {
            this.$dialog.toast({ mes: res.msg });
          }
        }
      );
    },
    //判断消息在左还是在右
    modeType(item) {
      if (item.singleOrGroup === "1") {
        if (item.fromSource === this.userDetails.account) {
          return "right";
        } else {
          return "left";
        }
      } else if (item.singleOrGroup === "2") {
        if (item.fromAccount === this.userDetails.account) {
          return "right";
        } else {
          return "left";
        }
      }
    }
  },
  components: {
    MessageBox
  },
  computed: {
    ...mapState("login", ["userDetails"]),
    //本人的红包信息
    personalList() {
      for (let item of this.dataLists) {
        if (item["领取人账号"] === this.userDetails.account) {
          return item;
        }
      }
    },
    //领取金额
    realCount() {
      if (
        (this.redPacketMessage.amount && this.redPacketMessage.remainAmount) ||
        this.redPacketMessage.amount === 0 ||
        this.redPacketMessage.remainAmount === 0
      ) {
        return (
          this.redPacketMessage.amount - this.redPacketMessage.remainAmount
        ).toFixed(2);
      }
    },
    //总金额
    allCount() {
      if (this.redPacketMessage.amount) {
        return this.redPacketMessage.amount.toFixed(2);
      }
    }
  }
};
</script>

<style lang="less">
@import url("../../../../../static/css/common.less");
#redPacketInformation {
  .init;
  padding-bottom: 0;
  background-image: url(../../../../../static/img/chartroom/redPacket_info.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;

  .title {
    color: #fff;
    font-size: 16px;
  }
  .container {
    .my-container;

    height: 100%;

    ul {
      .personal_img;
      #_img {
        width: 1.5rem;
        height: 1.5rem;
        margin: auto;
        background-size: cover;
        background-image: url(../../../../../static/img/sprite.png);
      }
      li {
        text-align: center;
        // margin-bottom: 0.07rem;
      }
    }
    .info {
      text-align: center;
      margin-bottom: 0.2rem;

      span {
        color: #d91d36;
      }
      i {
        font-size: 20px;
        color: #d91d36;
      }
    }
    ._info {
      text-align: center;
      margin-bottom: 0.2rem;
      i {
        font-size: 20px;
        color: #d91d36;
      }
      .friendList {
        margin-top: 2.7rem;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        ._tips {
          text-align: left;
          padding-left: 0.2rem;
          font-weight: normal;
          font-size: 12px;
        }
        #_Box {
          background-color: #fffdee !important;
        }
      }
    }
  }
}
</style>
