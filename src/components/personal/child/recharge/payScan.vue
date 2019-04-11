<template>
  <div id="payScan">
    <!-- <com-header @back="$router.go(-1)">
      <div
        slot="header-title"
        class="per-title"
      >
        <span>订单信息</span>
      </div>
      <span slot="left">选择{{type==='0'?'充值':'提现'}}金额</span>
    </com-header>-->
    <yd-navbar title="订单信息">
      <span slot="left" @click="$router.go(-1)">
        <yd-navbar-back-icon style="color: #fff;"></yd-navbar-back-icon>
        {{type==='0'?'充值':'提现'}}金额
      </span>
    </yd-navbar>
    <ul class="_infoTop">
      <li>转账信息</li>
      <li>{{type==='0'?'充值':'提现'}}金额：{{amount}}</li>
      <li>账户信息：{{userDetails.account}}</li>
      <li>{{type==='0'?'充值':'提现'}}时间：{{timeDate}}</li>
      <li>认证姓名：{{realname}}</li>
      <li>转账方式：{{rechargeType('text')}}转账</li>
      <!-- <li>内部聊天账号：{{dataList[index].chatAccount}}</li> -->
    </ul>
    <section class="payScan_container">
      <div >
        <span >上级{{rechargeType('text')}}账号：{{dealType==='2'?number.bankCode:number}}</span>
        <button
          v-clipboard:copy="dealType==='2'?number.bankCode:number"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >复制</button>

      </div>
      <div v-show="dealType==='2'">
        <span >上级{{rechargeType('text')}}名称：{{dealType==='2'?number.bankName:number}}</span>
        <button
          v-clipboard:copy="number.bankName"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >复制</button>
      </div>
       <div v-show="dealType==='2'">
        <span >上级{{rechargeType('text')}}支行名称：{{dealType==='2'?number.bankBranchName:number}}</span>
        <button
          v-clipboard:copy="number.bankBranchName"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >复制</button>
      </div>
      
      <!-- <div class="bankList" v-else>
        <p>上级{{rechargeType('text')}}</p>
        <ul>
          <li v-for="(item,index) of number" :key="index">{{item.bankName}}：{{item.bankAccount}} <button
          v-clipboard:copy="item.bankAccount"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >复制</button></li>
        </ul>
      </div> -->
    </section>
    <button class="btn" @click="submit()">提交申请</button>
    <div class="tip">温馨提示：请联系上级{{rechargeType('text')}}完成充值或提现。</div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      routerId: ["alipayTransfer", "wechatTransfer", "bankTransfer"],
      name: ["支付宝", "微信", "银行卡"],
      code: ["1", "0", "2"],
      datas: "",
      amount: "",
      realname: "",
      paynum: "",
      type: "",
      dealType: "",
      number: "",
      timeDate: ""
    };
  },
  created() {
    this.init();
    console.log(this.number)
  },
  mounted() {},
  methods: {
    ...mapActions("recharge", ["applyPoint"]),
    init() {
      this.datas = JSON.parse(this.$route.query.data);
      console.log(this.datas);

      this.amount = this.datas.amount;
      this.realname = this.datas.realname;
      this.type = this.datas.type;
      this.dealType = this.rechargeType("code");
      this.paynum = this.datas.paynum;
      this.number =this.datas.number;
      this.timeDate = this.datas.timeDate;
    },
    onCopy() {
      this.$dialog.toast({ mes: "复制成功！", timeout: 1000 });
    },
    onError() {
      this.$dialog.toast({
        mes: "复制失败",
        timeout: 1000,
        icon: "error"
      });
    },
    submit() {
      this.applyPoint({
        amount: this.amount,
        realname: this.realname,
        //充值为0   提现为1
        type: this.type,
        //微信为0，支付宝为1
        dealType: this.dealType,
        paynum: this.paynum
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
  },
  computed: {
    ...mapState("login", ["userDetails"]),
    rechargeType(param) {
      return param => {
        if (param === "text") {
          return this.name[this.routerId.indexOf(this.$route.query.routerId)];
        } else if (param === "code") {
          return this.code[this.routerId.indexOf(this.$route.query.routerId)];
        }
      };
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
@import url("../../../../../static/css/common.less");
#payScan {
  background: #f7f7f7;
  padding-top: 1rem;
  height: 100%;
  font-size: 13px;
  ._infoTop {
    li {
      height: 0.8rem;
      display: flex;
      align-items: center;
      padding-left: 0.3rem;
      border-bottom: 1px solid rgb(238, 238, 238);
      color: rgb(51, 51, 51);
    }
  }
  .payScan_container {
    // height: 1.1rem;
    background: #fff;
    // display: flex;
    // align-items: center;
    margin-top: 0.8rem;
    div {
      width: 100%;
      height: 1.1rem;
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        .my-button(1.2rem;.6rem;#0a77a0);
      }
    }
    .bankList{
      height: auto;
      display: block;
      p{
        margin-bottom: .3rem;
      }
      ul{
        li{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: .3rem;
        }
    
      }
    }
  }
  .btn {
    .my-button(6.35rem, 0.8rem, #0a77a0);
    margin: 0.4rem auto 0;
  }
  .tip {
    padding-left: 0.3rem;
    margin-top: 0.3rem;
    color: #666666;
  }
}
</style>


