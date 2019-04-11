<template>
  <div id="chartpage">
    <yd-navbar ref="header">
      <yd-navbar-back-icon @click.native="$router.push('/chartroom/chartmessage')" slot="left"></yd-navbar-back-icon>
      <div slot="center" class="title">
        <h3>{{name}}</h3>
        <p v-show="singleOrGroup==='1'">{{$route.query.onlineStatus==='2'?'离线':'在线'}}</p>
      </div>
      <router-link
        :to="{path:'/groupData',query:{fromSource}}"
        v-show="singleOrGroup==='2'"
        slot="right"
      >
        <i class="fa fa-users" style="color:#fff"></i>
      </router-link>
    </yd-navbar>
    <div class="container" ref="pullrefreshDemo" @click="show=false">
      <yd-pullrefresh ref="refresh" :callback="loadList">
        <yd-list theme="4">
          <yd-list-item>
            <DialogBox
              :type="item.messageType==='6'?'tip':'normal'"
              slot="other"
              v-for="(item,index) in messagesRecord"
              :key="index"
              :mode="modeType(item)"
            >
              <span
                v-show="item.singleOrGroup==='2'&&item.messageType!=='6'"
                slot="nickname"
              >{{item.nickName}}</span>
              <p
                v-show="index===0||(index!==0&&period(messagesRecord[index-1]['sendTime'],item.sendTime))"
                slot="chart_time"
                style="text-align:center"
              >{{global._timeFormate(item.sendTime,'2')}}</p>
              <div
                v-if="!item.accountProperties||item.accountProperties==='1'"
                id="_img"
                v-show="item.messageType!=='6'"
                slot="img"
                :class="'sprite-icon-'+item.icon"
              ></div>
              <img
                slot="img"
                v-else
                src="../../../../../static/img/chartroom/customService.png"
                alt
              >
              <p
                v-show="item.messageType==='1'"
                style="display:flex;align-items:center;height:100%"
                v-html="resolveFace(item.content)"
              ></p>
              <RedPacket
                :type="redPacketOpenStatus(item)"
                @click.native="grapPacket(item)"
                v-show="item.messageType==='5'"
              ></RedPacket>
              <p v-show="item.messageType==='6'&&modeType(item)==='left'">
                <img src="../../../../../static/img/chartroom/smallRedPacket.png" alt>
                {{item.singleOrGroup==='1'?item.nickName:item.fromAccount}}已领取了
                <i style="color:red">红包</i>
              </p>
            </DialogBox>
          </yd-list-item>
        </yd-list>
      </yd-pullrefresh>
    </div>
    <div class="chartkey" ref="_key">
      <div class="main-top">
        <p>
          <input @focus="popKey" type="text" v-model="text">
        </p>
        <Box
          width="16%"
          height="100%"
          :style="buttonStyle"
          @click.native="send"
          :backgroundColor="text!==''?'#fff':'#d4d7d0'"
          :colorEffect="text!==''?'#e7e9e5':'#d4d7d0'"
        >发送</Box>
      </div>
      <div class="main-bottom">
        <i @click="show=true" class="fa fa-smile-o"></i>
        <i @click="toRedPacket" class="fa fa-rmb"></i>
        <i id="start" class="fa fa-video-camera"></i>
      </div>
    </div>
    <div :style="setHeight"></div>
    <transition name="bounce">
      <ul class="pop" v-show="show">
        <li @click="selectFace(item)" v-for="(item,index) of faces" :key="index" :title="item">
          <img :src="`../../../../../static/img/chartroom/face/${index}.gif`" alt>
        </li>
      </ul>
    </transition>
    <article v-show="showPacket" class="redPacket_main" @click="showPacket=false">
      <transition name="bounce">
        <div v-show="showPacket" class="redPacket_tip">
          <div id="_img" :class="'sprite-icon-'+RedPacketMessage.icon" alt></div>
          <p>{{RedPacketMessage.nickName}}</p>
          <span style="font-size:12px">{{RedPacketWarn}}</span>
        </div>
      </transition>
    </article>
    <!-- <transition name="bounce">
      <video-page class="video-page"></video-page>
    </transition>-->
  </div>
</template>
<script>
import Box from "../../../common/box.vue";
import DialogBox from "../../../common/dialogBox.vue";
import RedPacket from "./packets.vue";
// import videoPage from './video.vue'
// import videoCall from '../../../../../utils/videocall';
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      //昵称
      name: this.$route.query.nickName,
      //消息
      text: "",
      //账号id/群id
      fromSource: this.$route.query.fromSource,
      readStatus: this.$route.query.readStatus,
      //群‘2’  个人‘1’
      singleOrGroup: this.$route.query.singleOrGroup,
      page: 2,
      interval: "",
      //表情包弹框
      show: false,
      fileBase: "",
      src: "",
      showPacket: false,
      //红包信息
      RedPacketMessage: {},
      RedPacketWarn: "",
      height1: 0,
      height1: 2,
      setHeight: {
        width: "100%",
        height: "0px"
      },
      timerId:null
    };
  },
  created() {
    this.height1 = window.innerHeight;
    this.saveUsername({ chatUsername: this.fromSource });
  },
  // mounted() {
  //   // 视频通话
  //   videoCall()
  // },
  methods: {
    ...mapActions("chart", [
      "sendMessage",
      "queryMessageRead",
      "readMessage",
      "sendMessageGroup",
      "grabRedPacket",
      "redPacketInfo"
    ]),
    ...mapMutations("chart", [
      "throwMessage",
      "toBackThrowMessage",
      "setHistoryMessage",
      "setScrollHeight",
      "setHistoryPage",
      "setHistoryMessage",
      "saveUsername"
    ]),
    //读取历史消息
    query(page) {
      this.queryMessageRead({
        fromSource: this.fromSource,
        readStatus: this.readStatus,
        singleOrGroup: this.singleOrGroup,
        page: page
      }).then(res => {
        this.readMessage(`/${this.fromSource}/${this.singleOrGroup}`).then(
          res => {
            if (res.code === 0) {
            }
          }
        );
      });
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
    },
    //input聚焦
    focus(e) {},
    //  //input失焦
    blur() {},
    //  scrollToEnd() {
    //    document.body.scrollTop = document.body.scrollHeight;
    //  },
    //发送消息
    send() {
      if (this.text !== "") {
        if (this.singleOrGroup === "1") {
          this.sendMessage({
            account: this.fromSource,
            content: this.text
          }).then(res => {
            if (res.code === 0) {
              this.throwMessage({
                fromSource: this.userDetails.account,
                content: this.text,
                singleOrGroup: "1",
                sendTime: new Date().getTime(),
                messageType: "1",
                icon: this.userDetails.avatar,
                accountProperties:
                  this.userDetails.account === "m5chat" ? "2" : "1"
              });
              this.text = "";
            } else if (res.code === 111) {
              this.$dialog.toast({ mes: res.msg });
            }
          });
        } else if (this.singleOrGroup === "2") {
          this.sendMessageGroup({
            groupId: this.fromSource,
            content: this.text
          }).then(res => {
            if (res.code === 0) {
              this.text = "";
            } else if (res.code === 111) {
              this.$dialog.toast({ mes: res.msg });
            }
          });
        }
      } else {
        return;
      }
    },
    //消息时间处理  隔十分钟展示时间
    period(t1, t2) {
      if (t2 - t1 > 10 * 60 * 1000) {
        return true;
      } else {
        return false;
      }
    },
    //加载消息列表
    loadList() {
      if (this.page <= Math.ceil(this.countAll / 10)) {
        this.queryMessageRead({
          fromSource: this.fromSource,
          readStatus: this.readStatus,
          singleOrGroup: this.singleOrGroup,
          page: this.page
        }).then(res => {
          for (let item of res.messageList) {
            this.toBackThrowMessage(item);
          }
        });
        this.$refs.refresh.$emit("ydui.pullrefresh.finishLoad");
        ++this.page;
      } else {
        this.$dialog.toast({ mes: "内容已加载完毕" });
        this.$refs.refresh.$emit("ydui.pullrefresh.finishLoad");
      }
    },
    //聊天窗口滑到最下面
    scrollBottom() {
      this.$nextTick(function() {
        this.$refs.pullrefreshDemo.scrollTop = this.$refs.pullrefreshDemo.scrollHeight;
      });
    },
    //选择表情包
    selectFace(item) {
      this.text += item;
      this.show = false;
    },
    //解析表情包
    resolveFace(content) {
      if (/\[[\u4e00-\u9fa5a-zA-Z]+\]/g.test(content)) {
        return `${content.replace(/\[[\u4e00-\u9fa5a-zA-Z]+\]/g, item => {
          if (this.faces.includes(item)) {
            let index = this.faces.indexOf(item);
            return `<img src="../../../../../static/img/chartroom/face/${index}.gif">`;
          } else {
            return item;
          }
        })}`;
      } else {
        return content;
      }
    },
    //发红包
    toRedPacket() {
      this.$router.push({
        path: "/redPackets",
        query: { id: this.fromSource, singleOrGroup: this.singleOrGroup }
      });
    },
    //抢红包
    grapPacket(obj) {
      //如果红包已打开或者单聊时是自己发的红包
      if (
        obj.openStatus === "1" ||
        (this.modeType(obj) === "right" && this.singleOrGroup === "1") ||
        (this.singleOrGroup === "2" && obj.openStatus === "1") ||
        this.redPacketOpenStatus(obj) === "5"
      ) {
        //跳的红包查看界面
        this.$router.push({
          path: `/redPacketInformation/${this.singleOrGroup}`,
          query: { datas: JSON.stringify(obj) }
        });
      } else {
        this.grabRedPacket(`/${obj.content}/${this.singleOrGroup}`).then(
          res => {
            if (res.code === 111) {
              this.showPacket = true;
              this.RedPacketMessage = obj;
              this.RedPacketWarn = res.msg;
              obj.openStatus = "1";
            } else {
              this.$dialog.toast({ mes: res.msg });
            }
          }
        );
      }
    },
    //红包状态
    redPacketOpenStatus(obj) {
      //红包打开
      if (obj.openStatus === "1") {
        return "4";
      } else if (obj.openStatus === "2") {
        //红包未打开
        if (new Date().getTime() - obj.sendTime > 24 * 3600 * 1000) {
          return "5";
        } else {
          if (this.modeType(obj) === "right" && obj.singleOrGroup === "1") {
            return "3";
          } else {
            return "2";
          }
        }
      }
    },
    popKey() {
      // setTimeout(function(){
      //     document.body.scrollTop = document.body.scrollHeight;
      // },300);
    //   let cnt = 0;
    //   this.timerId=setInterval(() => {
    //     if (cnt < 3) {
    //       cnt++;
    //     } else {
    //       clearInterval(this.timerId);
    //       this.timerId = null;
    //       return;
    //     }
    //     document.body.scrollTop = document.body.scrollHeight;
    //   }, 300);
    }
  },
  components: {
    DialogBox,
    Box,
    RedPacket
  },
  computed: {
    ...mapState("login", ["userDetails"]),
    ...mapState("chart", [
      "historyMessage",
      "countAll",
      "sendStatus",
      "faces",
      "scrollHeight",
      "historyPage"
    ]),
    //消息记录
    ...mapGetters("chart", ["messagesRecord"]),
    buttonStyle() {
      if (this.text === "") {
        return {
          color: "#fff"
        };
      } else {
        return {
          color: "#000"
        };
      }
    }
  },
  watch: {
    //发送消息滑到最底部
    historyMessage() {
      //滚动前高度
      let beforeScorllHeight = this.$refs.pullrefreshDemo.scrollHeight;
      if (this.sendStatus === "1") {
        this.scrollBottom();
      } else if (this.sendStatus === "2") {
        this.$nextTick(function() {
          this.$refs.pullrefreshDemo.scrollTop =
            this.$refs.pullrefreshDemo.scrollHeight - beforeScorllHeight;
        });
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "redPacketInformation") {
      this.setScrollHeight(this.$refs.pullrefreshDemo.scrollTop);
      this.setHistoryPage(this.page);
    }
    next();
  },
  beforeRouteEnter(to, from, next) {
    if (from.name !== "redPacketInformation") {
      next(vm => {
        vm.query(1);
      });
    } else {
      next(vm => {
        vm.page = vm.historyPage;
        vm.$refs.pullrefreshDemo.scrollTop = vm.scrollHeight;
      });
    }
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
//表情包弹框动画
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
#chartpage {
  .init;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  .title {
    h3 {
      color: #fff;
      text-align: center;
      font-size: 0.3rem;
    }
    p {
      color: #d4d7d0;
      font-size: 0.25rem;
      text-align: center;
    }
  }
  .container {
    flex: 1;
    background: #f1f1f1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .my-container;
    article {
      background: transparent;
      padding: 0;
      .yd-list-img {
        width: 0;
        height: 0;
      }
      .yd-list-mes {
        background: transparent;
        padding: 0;
      }
    }
    .yd-pullrefresh-dragtip {
      top: 0.3rem;
      z-index: 2;
    }
  }
  .chartkey {
    height: 1.6rem;
    width: 100%;
    background: #d91d36;
    padding: 0.15rem 0.3rem;
    .my-display(space-between, center);
    flex-direction: column;
    .main-top {
      width: 100%;
      height: 50%;
      .my-display(space-between, none);
      p {
        width: 82%;
        height: 100%;
        input {
          height: 100%;
          width: 100%;
          background: #fff;
          border: 0;
          border-radius: 4px;
          text-indent: 7px;
        }
      }
      #_Box {
        .my-display(center, center);
        border-radius: 5px;
      }
    }
    .main-bottom {
      width: 100%;
      height: 50%;
      .my-display(none, flex-end);
      i {
        color: #fff;
        font-size: 25px;
        margin-right: 0.4rem;
      }
    }
  }
  .pop {
    background: #fff;
    padding: 0.2rem;
    position: absolute;
    z-index: 200;
    bottom: 1.7rem;
    left: 0.3rem;
    right: 0.3rem;
    max-height: 180px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    li {
      display: inline-block;
      width: 10%;
      text-align: center;
      img {
        width: 22px;
        height: 22px;
        margin: 0.1rem 0;
      }
    }
  }
  .redPacket_main {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.2);
    .redPacket_tip {
      width: 70%;
      max-height: 5.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      z-index: 200;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      margin: auto;
      justify-content: flex-start;
      border-radius: 5px;
      background-image: url(../../../../../static/img/chartroom/redPacket_bcg.png);
      background-size: cover;
      background-position: 0.1rem;
      background-repeat: no-repeat;
      .personal_img;
      #_img {
        margin-top: 0.3rem;
        margin-bottom: 0.1rem;
        width: 1.5rem;
        height: 1.5rem;
        background-image: url(../../../../../static/img/sprite.png);
        background-size: cover;
      }
      p {
        margin-bottom: 0.1rem;
      }
      span {
        color: #d91d36;
      }
    }
  }
}
.video-page {
  display: none;
}
</style>


