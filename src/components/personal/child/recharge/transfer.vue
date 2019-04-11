<template>
  <div id="charge_bank">
    <yd-navbar :title="`选择${_type('text')}金额`">
      <span slot="left" @click="$router.go(-1)">
        <yd-navbar-back-icon style="color: #fff;"></yd-navbar-back-icon>
        {{_type('text')}}
      </span>
    </yd-navbar>
    <!--<com-header @back="$router.go(-1)">
      <div
        slot="header-title"
        class="per-title"
      >
        <span>选择{{_type}}金额</span>
      </div>
      <span slot="left">{{_type}}</span>
    </com-header>-->
    <!-- <section class="title">
      <p>支付渠道</p>
      <p>余额：{{userDetails.accountBalance.toFixed(2)}}</p>
    </section>
    <section class="_bank">
      <img
        :src="params[index].img"
        alt=""
      >
      <p>{{params[index].title}}</p>
    </section>
    <section class="_container">

      <p>{{index===8||index===9?'提现':'充值'}}金额（元）</p>
      <div>
        <input
          type="number"
          v-model="money"
        >
      </div>
      <span class="presentation">(服务费0.00)</span>
      <p>真实姓名</p>
      <div>
        <input
          type="text"
          v-model="realname"
        >
      </div>
      <p>账号</p>
      <div>
        <input
          type="text"
          v-model="paynum"
        >
      </div>
      <ul>
        <li
          v-for="(item,index) in moneyList"
          :key="index"
        >
          <label
            :class="{activeStyle:index==mark}"
            @click="changeBgc(index,item)"
            :for="index"
          >{{item.context}}</label><input
            :value="item.num"
            v-model="num"
            style="display:none"
            :id="index"
            type="radio"
          ></li>
      </ul>
      <button @click.capture="submit">
        <span>下一步</span>
      </button>
    </section>
    <div class="tip">
      <p>温馨提示</p>
      <ul>
        <li>1.点击确认充值按钮跳转至支付宝进行后续的充值操作。</li>
        <li>2.充值完成后，重新进入app查看余额。</li>
        <li>3.请在15分钟内完成充值。</li>
      </ul>
    </div>-->
    <article>
      <p class="tip">Tips：为了加快入款和出款速度，请务必于转账后再提交资料！</p>
      <div>
        <input
          type="number"
          @blur="restrict"
          v-model="money"
          :placeholder="`请填写${_type('text')}金额`"
        >
      </div>
      <p class="_tip">
        单笔下限
        <i>10</i>，单笔上线
        <i>5000</i>
      </p>
      <section>
        <div>
          <input :type="routerId==='bankTransfer'?'number':'text'" v-model="paynum" :placeholder="`请填写${rechargeType}账号`">
        </div>
        <div>
          <input type="text" v-model="realname" :placeholder="`请填写${rechargeType}实名认证姓名`">
        </div>
        <div>
          <!-- <input type="text" v-model="timeDate" readonly> -->
          <vue-ios-pickers date="datetime" :on-confirm="confirmHandler" v-model="datetimePicker"></vue-ios-pickers>
        </div>
      </section>

      <button @click.capture="submit">
        <span>下一步</span>
      </button>
    </article>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      //选择银行
      bankType: 0,
      //用户姓名
      realname: "",
      //充值金额数
      money: "",
      paynum: "",
      //选中金额数
      num: "",
      //标记（点击后判断是否变样式）
      mark: 0,
      //路由id
      routerId: "",
      routers: [
        "bank",
        "qqTransfer",
        "alipayTransfer",
        "wechatTransfer",
        "wechatScan",
        "qqScan",
        "alipayScan",
        "directPay",
        "alipayTransferWithdraw",
        "wechatTransferWithdraw"
      ],
      //路由对应的下标
      index: "",
      //说明
      remark: "",
      timeDate: "",
      datetimePicker: "2020-1-5 06:55"
    };
  },
  created() {
    //获取id
    this.routerId = this.$route.params.id;
    this.index = this.routers.indexOf(this.routerId);
    // this.money = this.moneyList[0].num;
    this.datetimePicker=this.timeFormate();
    console.log(this.datetimePicker)

  },
  methods: {
    ...mapActions("personal", ["touchsuper", "applyPoint"]),
    //点击改变样式
    changeBgc(index, item) {
      this.mark = index;
    },
    //返回
    routerReturn() {
      this.$router.push("/recharge");
    },
    submit() {
      // var reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
      if (this.money === "") {
        this.$dialog.toast({ mes: "请输入金额", timeout: 1500 });
      } else if (this.paynum === "") {
        this.$dialog.toast({ mes: "请输入账号", timeout: 1500 });
      } else if (!this.regexType.test(this.paynum)) {
        this.$dialog.toast({
          mes: `请填写正确格式的${this.rechargeType}账号`,
          timeout: 1500
        });
      } else {
        this.touchsuper().then(res => {
          let data;
          if (res.code === "0") {
            if (this.routerId === "alipayTransfer") {
              data = res.aliPay;
            } else if (this.routerId === "wechatTransfer") {
              data = res.WX;
            } else if (this.routerId === "bankTransfer") {
              data = {bankCode:res.bankCode,bankName:res.bankName,bankBranchName:res.bankBranchName}
            }
            this.$router.push({
              name: "payScan",
              query: {
                routerId: this.routerId,

                data: JSON.stringify({
                  amount: this.money,
                  timeDate: this.datetimePicker,
                  realname: this.realname,
                  paynum: this.paynum,
                  type: this._type("code"),
                  number: data
                })
              }
            });
          } else if (res.code != "0") {
            this.$dialog.toast({ mes: res.message, timeout: 1500 });
          }
        });
      }
    },
    restrict() {
      if (this.money < 10) {
        this.money = 10;
      } else if (this.money > 5000) {
        this.money = 5000;
      }
    },
    confirmHandler(result) {
      this.resultData = JSON.stringify(result, "", 2);
    },
    timeFormate() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    let hour =  new Date().getHours();
    let min=new Date().getMinutes();
     if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;

    return year + "-" + month + "-" + date+' '+hour+":"+min;
}
  },
  computed: {
    ...mapState("login", ["userDetails"]),
    _type(param) {
      return param => {
        if (param === "text") {
          return this.index === 8 || this.index === 9 ? "提现" : "充值";
        } else if (param === "code") {
          return this.index === 8 || this.index === 9 ? "1" : "0";
        }
      };
    },
    rechargeType() {
      switch (this.routerId) {
        case "wechatTransfer":
          return "微信";
        case "alipayTransfer":
          return "支付宝";
        case "bankTransfer":
          return "银行卡";
      }
    },
    regexType() {
      switch (this.routerId) {
        case "wechatTransfer":
          return /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
        case "alipayTransfer":
          return /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/;
        case "bankTransfer":
          return /^([1-9]{1})(\d{14}|\d{18})$/;
      }
    }
  },
  watch: {
    num(newValue) {
      this.money = newValue;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../../../../static/css/common.less");
@base_num: 0.64rem;
@gap_top: 0.2rem;
@padding: 0.25rem;
.display-mixin {
  display: flex;
  align-items: center;
  img {
    display: block;
    width: 1rem;
    height: 1rem;
    margin-left: 0.2rem;
  }
}

#charge_bank {
  // height: 100%;
  font-size: 12px;
  padding-top: 1rem;
  background: #fff;
  height: 100%;
  // overflow: auto;
  // -webkit-overflow-scrolling: touch;
  article {
    padding: 0.3rem;
    input {
      text-indent: 0.2rem;
      -webkit-appearance: none;
      color: #999;
    }
    p {
      margin-bottom: 0.2rem;
    }
    .tip {
      color: #666666;
    }
    ._tip {
      margin-top: 0.2rem;
      i {
        color: #e6442b;
      }
    }
    section {
      div {
        input {
          border-radius: 0;
          // -webkit-appearance:none;
        }
        &:nth-child(1) {
          input {
            border-radius: 4px 4px 0 0;
            border-bottom: 0;
          }
        }

        &:nth-child(3) {
          input {
            border-radius: 0 0 4px 4px;
            border-top: 0;
            color: #000;
          }
        }
        .picker-value {
          text-align: left!important;
          background-color: #f7f7f7;
          border-radius: 0 0 4px 4px;
          border: 1px solid #cccccc;
          border-top: 0;
          text-indent: 0.2rem;
          -webkit-appearance: none;
          color: #999;
          height: 0.78rem;
          display: flex;
          align-items: center;
        }
      }
    }
    button {
      .my-button(6.5rem, 0.8rem, #0a77a0);
      margin: auto;
      margin-top: 0.6rem;
      font-size: 14px;
    }
    input {
      width: 100%;
      height: 0.78rem;
      border: 1px solid #cccccc;
      border-radius: 4px;
      background-color: #f7f7f7;
    }
  }
}
</style>
