<template>
  <div id="withdraw">
    <yd-navbar v-stopSlide title="提现">
      <!-- <router-link slot="left" to="/homeRecharge"> -->
      <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
      <!-- </router-link> -->
      <span slot="right" @click="assisShow()">小助手</span>
    </yd-navbar>
    <div class="container">
      <img src="../../../../../static/img/personal/withdraw/withdraw.png" alt>
      <p class="accountBalance">{{accountBalance}}</p>
      <span class="text">(我的现金账户)</span>
      <yd-cell-group>
        <yd-cell-item>
          <yd-icon color="#fff" slot="icon" name="star" size=".15rem"></yd-icon>

          <span slot="left">消费比例：</span>
          <span slot="right">
            提现需达投注量
            <i>{{drawCondition.memberConsumeNeed}}</i> 已达投注量
            <i>{{drawCondition.memberConsume}}</i>
          </span>
        </yd-cell-item>
        <yd-cell-item>
          <yd-icon color="#d7000b" slot="icon" name="star" size=".15rem"></yd-icon>
          <span slot="left">提现账号：</span>
          <select slot="right" v-model="bankType">
            <option value disabled>请选择银行</option>
            <option v-for="(item,index) of bankList" :value="index" :key="index">{{item.name}}</option>
          </select>
        </yd-cell-item>
        <yd-cell-item>
          <yd-icon color="#d7000b" slot="icon" name="star" size=".15rem"></yd-icon>
          <span slot="left">提现金额：</span>
          <input
            @blur="restrictions"
            v-model="money"
            type="number"
            slot="right"
            :placeholder="'您本次最高提现'+drawCondition.drawDegreeTimes+'元,最低提现'+drawCondition.drawFloorTimes+'元'"
          >
        </yd-cell-item>
        <!-- <yd-cell-item>
                 <yd-icon color="#fff" slot="icon" name="star" size=".15rem"></yd-icon>
                     
                     <span slot="left">免收手续费次数：</span>
                     <span slot="right">{{drawCondition.newNoCharges}}</span>
                     
                 </yd-cell-item>
                 <yd-cell-item>
                 <yd-icon color="#fff" slot="icon" name="star" size=".15rem"></yd-icon>
                     
                     <span slot="left">扣手续费：</span>
                     <span slot="right">{{drawCondition.chargesPoint===0?'免收':drawCondition.chargesPoint}}</span>
        </yd-cell-item>-->
        <yd-cell-item>
          <yd-icon color="#d7000b" slot="icon" name="star" size=".15rem"></yd-icon>
          <span slot="left">认证姓名：</span>
          <yd-input
            v-model="real_name"
            :show-success-icon="false"
            type="text"
            slot="right"
            required
            max="20"
            placeholder="请输入相关账号绑定的姓名"
          ></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <yd-icon color="#d7000b" slot="icon" name="star" size=".15rem"></yd-icon>
          <span slot="left">资金密码：</span>
          <yd-input
            v-model="tradePassword"
            :show-success-icon="false"
            type="password"
            slot="right"
            required
            max="20"
            placeholder="请输入资金密码"
          ></yd-input>
        </yd-cell-item>
        <button @click="submit">提交</button>
      </yd-cell-group>
      <!-- <div class="_tip" v-html="drawCondition.tip"></div> -->
    </div>

    <!-- 充值弹框 -->
    <yd-popup :close-on-masker="false" v-model="show" position="center" width="85%">
      <div class="pop_main">
        <h3>系统讯息</h3>
        <p>
          <span>订单已提交！</span>等待客服审核，审核完将会自动到账！
        </p>
        <yd-button bgcolor="#d91d36" color="#fff" size="large" @click.native="confirm">确定</yd-button>
      </div>
    </yd-popup>
    <!-- 小助手 -->
    <div class="Assis_tant" v-show="assis_tant">
      <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Assistant from "../../../home/dome/assistant.vue";
export default {
  data() {
    return {
      show: false,
      bankType: 0,
      money: "",
      real_name: "",
      assis_tant: false,
      tradePassword: ""
    };
  },
  created() {
    this.getUserDetails();
    this.condition();

    console.log(this.bankList, this.drawCondition);
  },

  components: {
    Assistant
  },
  methods: {
    ...mapActions("recharge", ["applyPoint"]),
    ...mapActions("login", ["getUserDetails"]),
    ...mapActions(["queryDrawCondition", "saveDrawMoneyInfo"]),
    condition() {
      this.queryDrawCondition().then(res => {
        if (res.code === 0) {
          if (res.data.isDeposit==='0') {
            this.$dialog.toast({
              mes:'返回原网址转点',
              timeout: 1000,
              callback:()=>{
                 this.$router.push('/home');
              }
            });
          } else if (res.data.memberConsume < res.data.memberConsumeNeed) {
            this.$dialog.alert({
              mes: "打码量不足，暂时无法提现",
              callback: () => {
                this.$router.go(-1);
              }
            });
          } else {
            if (res.data.bankList.length === 0) {
              this.$router.replace("/bankCard");
            }
          }
        } else if (res.code === 1) {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1000
          });
        }
      });
    },
    submit: _.debounce(function() {
      if (this.money === "") {
        this.$dialog.toast({
          mes: "请输入提现金额",
          timeout: 1000
        });
      } else if (this.real_name === "") {
        this.$dialog.toast({
          mes: "请输入真实姓名",
          timeout: 1000
        });
      } else if (this.tradePassword === "") {
        this.$dialog.toast({
          mes: "请输入资金密码",
          timeout: 1000
        });
      } else {
        this.applyPoint({
          amount: this.money,
          realname: this.real_name,
          //充值为0   提现为1
          type: "1",
          //微信为0，支付宝为1
          dealType: this.bankList[this.bankType].dealType,
          paynum: this.bankList[this.bankType].account,
          tradePassword: hex_md5(this.tradePassword)
        }).then(res => {
          if (res.code === 1) {
            this.$dialog.toast({ mes: res.data, timeout: 1500 });
          } else if (res.code === 0) {
            this.$dialog.toast({
              mes: res.data,
              timeout: 1500,
              callback: () => {
                this.$router.push("/cashflow");
              }
            });
          }
        });
      }
    }, 300),
    //确定
    confirm() {
      this.show = false;
      this.$router.go(-1);
    },
    //金额限制
    restrictions() {
      if (this.money > this.drawCondition.drawDegreeTimes) {
        this.money = this.drawCondition.drawDegreeTimes;
      } else if (this.money < this.drawCondition.drawFloorTimes) {
        this.money = this.drawCondition.drawFloorTimes;
      }
    },
    // 小助手
    assisShow() {
      if (this.assis_tant == false) {
        this.assis_tant = true;
      } else if (this.assis_tant == true) {
        this.assis_tant = false;
      }
    }
  },
  computed: {
    ...mapState(["drawCondition"]),
    ...mapState("login", ["userDetails"]),
    accountBalance() {
      return Number(this.drawCondition.accountBalance).toFixed(2);
    },
    bankList() {
      let arr = Array.of();
      // console.log(typeof this.DrawCondition.bankList,this.userDetail)
      if (typeof this.drawCondition.bankList === "object") {
        for (let item of this.drawCondition.bankList) {
          arr.push({
            name: `${item.bankname}（${item.bankaccount.slice(-4)}）`,
            account: item.bankaccount,
            dealType: "2"
          });
        }
      }
      this.userDetails.aliPay &&
        arr.push({
          name: "支付宝",
          account: this.userDetails.aliPay,
          dealType: "1"
        });
      this.userDetails.vx &&
        arr.push({ name: "微信", account: this.userDetails.vx, dealType: "0" });
      return arr;
    }
  }
};
</script>

<style lang="less">
@import url("../../../../../static/css/common.less");
@font: 16px;
#withdraw {
  .init;
  display: flex;
  flex-direction: column;
  font-size: @font;
  padding-bottom: 0;
  .container {
    padding: 0.3rem 0.15rem 0.5rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    flex: 1;
    img {
      width: 2rem;
      display: block;
      margin: auto;
    }
    .accountBalance {
      color: #d70100;
      text-align: center;
      font-size: 30px; /*px*/
      margin-top: 0.1rem;
    }
    .text {
      display: block;
      color: #777777;
      text-align: center;
    }
    .yd-cell-box {
      margin-top: 0.2rem;
      margin-bottom: 0;
      .yd-cell-left {
        span {
          display: block;
        }
        .yd-cell-icon {
          .my-display(inherit;center);
          i {
            display: block;
          }
        }
      }
      .yd-cell-right {
        justify-content: flex-start;
        span {
          overflow-x: auto;
          white-space: nowrap;
        }
        i {
          color: #d70100;
        }
        input {
          font-size: 12px; /*px*/
        }
      }
      button {
        .my-button(100%;1rem;rgb(217, 29, 54));
        margin-top: 0.4rem;
      }
    }
    ._tip {
      margin-top: 0.3rem;
      font-size: 0.28rem;
    }
  }

  //模态框
  .pop_main {
    background-color: #fff;
    border-radius: 4px;
    h3 {
      color: #d61937;
      padding: 0.4rem 0.3rem 0.4rem;
      text-align: center;
    }
    p {
      padding: 0 0.5rem 0;
      span {
        color: #e74e00;
      }
    }
  }
  .Assis_tant {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    height: calc(100% - 1rem - 0px);
    /* background: #2dabf3; */
  }
}
</style>
