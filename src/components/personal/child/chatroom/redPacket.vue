<template>
  <div id="redPacket">
    <yd-navbar ref="header">
      <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
      <div slot="center" class="title">
        发红包
      </div>
    </yd-navbar>
    <div class="container">
      <yd-cell-group v-if="$route.query.singleOrGroup ==='1' ">
        <yd-cell-item>
          <span slot="left">单个金额：</span>
          <yd-input slot="right" v-model="money" type="number" required :max="5" ref="inputsingel"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group v-else>
        <yd-cell-item>
          <span slot="left">总金额：</span>
          <yd-input slot="right" v-model="money" type="number" required max="5" ref="inputsingel"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">红包个数：</span>
          <yd-input slot="right" v-model="num" type="number" required max="20" regex="/^[1-9]\d*$/"></yd-input>
        </yd-cell-item>
        <i style="padding-left:.34rem;font-size:12px">本群共{{groupInfo.peopelCnt}}人</i>
      </yd-cell-group>
      <p>¥ {{Number(money)}}</p>
      <Box v-if="show" @click.native="send" backgroundColor="#d91d36" colorEffect="#a52c3c">
        <span>塞钱进红包</span>
      </Box>
      <Box v-else backgroundColor="#adadad" colorEffect="#adadad">
        <span>塞钱进红包</span>
      </Box>
    </div>
  </div>
</template>
<script>
import Box from "../../../common/box.vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      money: 0.0,
      num: 0,
      show: false
    };
  },
  created(){
    this.init()

  },
  components: {
    Box
  },
  methods: {
    ...mapActions("chart", ["sendRedPacket", "sendGroupPacket",'queryGroupInfo']),
    init(){
      if(this.$route.query.singleOrGroup==='2'){
        this.queryGroupInfo(`/${this.$route.query.id}`)
      }  
    },
    send() {
      if (this.$route.query.singleOrGroup === "1") {
        this.sendRedPacket({
          amount: Number(this.money),
          account: this.$route.query.id
        }).then(res => {
          if (res.code === 0) {
            this.$dialog.toast({
              mes: "发送成功",
              timeout: 1200,
              callback: () => {
                this.$router.go(-1);
              }
            });
          } else if (res.code === 111) {
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1200
            });
          } else if (res.code === 500) {
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1200
            });
          }
        });
      } else if (this.$route.query.singleOrGroup === "2") {
        this.sendGroupPacket({
          amount: Number(this.money),
          number: Number(this.num),
          groupId: this.$route.query.id
        }).then(res => {       
            if (res.code === 0) {
              this.$dialog.toast({
                mes: "发送成功",
                timeout: 1200,
                callback: () => {
                  this.$router.go(-1);
                }
              });
            } else if (res.code === 111) {
              this.$dialog.toast({
                mes: res.msg,
                timeout: 1200
              });
            } else if (res.code === 500) {
              this.$dialog.toast({
                mes:res.msg,
                timeout: 1200
              });
            }
        });
      }
    }
  },
  computed: {
    ...mapState("chart", ["groupInfo"])
  },
  watch: {
    money(n) {
      if (!n) {
        this.money = 0;
      }else{
        Number(n)
      }
      if (Number(this.money) === 0) {
        this.show = false;
      } else {
        this.show = true;
        if(n>1000000){
          console.log(this.$refs.inputsingel);
          this.$refs.inputsingel.currentValue='1000000';
          this.money=1000000
        }
      }
    },
    num(newValue) {
      this.num = Math.round(newValue);
      if (Number(newValue) > 100) {
        this.$dialog.notify({
          mes: "一次最多可发100个红包",
          timeout: 1000,
          callback: () => {
            this.num = 100;
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
@import url("../../../../../static/css/common.less");
#redPacket {
  .init;
  .title {
    color: #fff;
  }
  .container {
    .my-container;
    height: 100%;
    p {
      font-size: 24px;
      font-weight: 900;
      text-align: center;
      margin-bottom: 20px;
    }
    #_Box {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      border-radius: 4px;
    }
  }
  .yd-cell:after {
    border: 0;
  }
}
</style>
