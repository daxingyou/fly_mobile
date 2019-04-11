<template>
  <div id="receiptAccount">
    <div style="height: 1rem;">
      <yd-navbar title="收款账户">
        <span slot="left" @click="$router.go(-1)">
          <yd-navbar-back-icon style="color: #fff;"></yd-navbar-back-icon>
        </span>
        <span slot="right" @click="assisShow()">小助手</span>
      </yd-navbar>
    </div>
    <div class="content">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">微信：</span>
          <!-- <span slot="right">{{!user.vx?'未绑定微信':user.vx}}</span> -->
          <yd-input
            slot="right"
            ref="input"
            v-model="valueVX"
            regex="/^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/"
            :placeholder="!user.vx?'未绑定微信':'请输入微信'"
            :show-clear-icon="false"
          ></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">支付宝：</span>
          <yd-input
            slot="right"
 
            v-model="valueAliPay"
            regex="/^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/"
            :placeholder="!user.aliPay?'未绑定支付宝账号':'请输入支付宝账号'"
            :show-clear-icon="false"
          ></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">银行卡：</span>
          <yd-input
            slot="right"
            v-model="valueBank"
            regex="/^([1-9]{1})(\d{14}|\d{18})$/"
            placeholder="请输入银行卡"
            :show-clear-icon="false"
          ></yd-input>
        </yd-cell-item>

         <yd-cell-item>
          <span slot="left">银行名称：</span>
          <yd-input
            slot="right"
            v-model="bankName"
            placeholder="请输入银行名称"
            :show-clear-icon="false"
          ></yd-input>
        </yd-cell-item>
         <yd-cell-item>
          <span slot="left">支行名称：</span>
          <yd-input
            slot="right"
            v-model="branchName"
            placeholder="请输入支行名称"
            :show-clear-icon="false"
          ></yd-input>
        </yd-cell-item>
         <yd-cell-item>
          <span slot="left">资金密码：</span>
          <yd-input
            slot="right"
            v-model="assertPassword"
            placeholder="请输入资金密码"
            :show-clear-icon="false"
            type="password"
          ></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <!-- <div class="banks">
        <div class="list-item-tit" style="flex-basic:3rem">银行卡：</div>
        <div v-if="!noChange">
          <div class="value" v-if="bankCard.length !== 0">
            <ul>
              <li v-for="(item, index) in bankCard" :key="item[index]">
                <span>卡{{index+1}}</span>
                {{item.bankAccount}}
              </li>
            </ul>
          </div>
          <div class="value" v-else>未绑定
            <div class="bind-card" @click="$router.push('/firstBankCard')">去绑定</div>
          </div>
        </div>
        <yd-input></yd-input>
      </div>-->
      <div class="btn">
        <yd-button  @click.native="finish" size="large" type="primary">修改</yd-button>
        <!-- <yd-button v-else @click.native="cancel" size="large" type="primary">取消</yd-button>
        <yd-button v-show="display" @click.native="finish" size="large" type="danger">完成</yd-button> -->
      </div>
    </div>
    <div class="aAssis_tant" v-show="assis_tant">
      <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import Assistant from "../dome/assistant.vue";
export default {
  data() {
    return {
      user: {},
      valueVX: "",
      valueAliPay: "",
      valueBank:'',
      assis_tant: false,
      bankCard: [],
      noChange: true,
      text: "修改",
      display: false,
      show: true,
      bankName:'',
      branchName:"",
      assertPassword:''
    };
  },
  created() {
    this.init();
  },
  components: {
    Assistant
  },
  methods: {
    ...mapActions("personal", ["updateOwnInfo", "touchsuper"]),
    ...mapActions("login", ["getUserDetails"]),
    ...mapActions("home", ["memberIfBind"]),
    init() {
      this.show = true;
      this.display = false;
      this.noChange = true;
      this.getUserDetails().then(res => {
        console.log(res);
        this.user["vx"] = res.data.vx;
        this.user["aliPay"] = res.data.aliPay;
        this.user["qq"] = res.data.qq;
        this.user["phone"] = res.data.phone;
        this.valueVX = res.data.vx;
        this.valueAliPay = res.data.aliPay;
        this.valueBank=res.data.bankCode;
        this.bankName=res.data.bankName;
        this.bankBranchName=res.data.bankBranchName;
      });
    },
    // 小助手
    assisShow() {
      if (this.assis_tant == false) {
        this.assis_tant = true;
      } else {
        this.assis_tant = false;
      }
    },
    change() {
      this.noChange = false;
      this.display = true;
      this.show = false;
      this.$refs.input.setFocus();
    },
    cancel() {
      this.show = true;

      this.display = false;
      this.valueVX = this.user["vx"];
      this.valueAliPay = this.user["aliPay"];
      this.noChange = true;
    },
    finish() {
      if (this.valueVX == "" && this.valueAliPay == "") {
        this.$dialog.toast({
          mes: "您没有做任何修改",
          timeout: 1500,
          icon: "success"
        });
      } else {
        let data = {
          qq: this.user.qq,
          vx: this.valueVX == "" ? this.user.vx : this.valueVX,
          phone: this.user.phone,
          aliPay: this.valueAliPay == "" ? this.user.aliPay : this.valueAliPay,
          bankCode:this.valueBank,
          bankName:this.bankName,
          bankBranchName:this.branchName,
          tradePassword:hex_md5(this.assertPassword)  
        };
        this.updateOwnInfo(data).then(res => {
          console.log(res);
          if (res.code == 0) {
            this.$dialog.toast({
              mes: "保存成功",
              timeout: 1500,
              icon: "success",
              callback: () => {
                this.$router.go(-1)
              }
            });
            this.getUserDetails().then(data => {
              console.log(data);
            });
          } else {
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
              icon: "errror"
            });
          }
        });
      }
    }
  }
};
</script>

<style scoped lang='less'>
#receiptAccount {
  .aAssis_tant {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    height: calc(100% - 1rem - 0px);
    z-index: 1001;
    /* background: #2dabf3; */
  }
  .content {
    .banks {
      color: #555;
      display: flex;
      padding-left: 0.24rem;
      .list-item-tit {
        display: flex;
        align-items: center;
      }
      .value {
        width: 75%;
        position: relative;
        display: flex;
        align-items: center;
        ul {
          // border: 1px solid #ffffff;
          border-bottom: none;
          li {
            // padding: 5px;
            // border-bottom: 1px solid #ffffff;
            span {
              display: inline;
              color: #ef4f4f;
              margin-right: 0.2rem;
              //   line-height: 0.3rem;

              background: #fff;
              border-radius: 5px;
            }
          }
        }
        .bind-card {
          color: #fff;
          position: absolute;
          top: 0;
          right: 0;
          width: 30%;
          padding: 0.1rem;
          background-color: #ef4f4f;
          border-radius: 2px;
          text-align: center;
        }
      }
    }
    .btn {
      padding: 0 0.24rem;
    }
  }
}
</style>
