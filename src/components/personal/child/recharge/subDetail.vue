<template>
  <div id="orderDetail">
    <!-- <com-header @back="$router.go(-1)">
      <div
        slot="header-title"
        class="per-title"
      >
        <span>{{_type}}订单</span>
      </div>
      <span slot="left">下级充提</span>
    </com-header> -->
    <yd-navbar :title="`${_type}订单`">
				<span slot="left" @click="$router.go(-1)">
					<yd-navbar-back-icon style="color: #fff;"></yd-navbar-back-icon>下级充提
				</span>
			</yd-navbar>
    <div class="container">
      <ul class="_infoTop">
        <li>{{_type}}信息</li>
        <li>{{_type}}金额：{{Number(dataList[index].amount).toFixed(2)}}</li>
        <li>账户信息：{{dataList[index].account}}</li>
        <li>{{_type}}时间：{{dataList[index].applytime.slice(0,-2)}}</li>
        <!-- <li>认证姓名：</li> -->
        <!-- <li v-if="dataList[index].dealType==='0'">微信：{{dataList[index].vx}}</li>
        <li v-else>支付宝：{{dataList[index].aliPay}}</li> -->
        <li>{{_type}}方式：{{trade_type(dataList[index].dealType)}}转账</li>
        <!-- <li>内部聊天账号：{{dataList[index].chatAccount}}</li> -->
      </ul>
      <ul>
        <li>{{trade_type(dataList[index].dealType)}}账户信息</li>
        <li>姓名：{{dataList[index].realname}}</li>
        <li>账号：{{dataList[index].paynum}}</li>
      </ul>
      <div class="tip">
        Tips：为了加快入款和出款速度，请务必于转账后再提交资料！
      </div>
    </div>
    <footer>
      <button @click="cancel">取消</button>
      <button @click="confirm('0')">确认</button>
    </footer>
    <yd-popup
      v-model="show"
      position="center"
      width="80%"
    >
      <div class="main">
        <p class="setRemark">资金密码</p>
        <yd-input
          type='password'
          required
          v-model="tradePassword"
          max="20"
          placeholder="请输入资金密码"
        ></yd-input>
        <button @click="submit('2')">提交</button>
      </div>
    </yd-popup>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      dataList: [],
      index: "",
      show: false,
      tradePassword: "",
      type: ""
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters("recharge", ["rechargeList", "withdrawList"]),
    _type() {
      return this.$route.query.type === "recharge" ? "存款" : "提现";
    },
     trade_type(index) {
      return index => {
        switch (index) {
          case "0":
            return "微信";
          case "1":
            return "支付宝";
          case "2":
            return "银行卡";
        }
      };
    },
    type_account(index) {
      return index => {
        switch (index) {
          case "0":
            return "WX";
          case "1":
            return "aliPay";
          case "2":
            return "bank";
        }
      };
    },
  },
  methods: {
    ...mapActions("recharge", ["disposeApplyPoint", "superToSub"]),
    init() {
      this.index = this.$route.query.index;
      if (this.$route.query.type === "recharge") {
        this.dataList = this.rechargeList;
      } else {
        this.dataList = this.withdrawList;
      }
    },
    cancel() {
      this.$actionSheet.show({
        theme: "",
        title: "是否要取消订单？",
        buttons: {
          确定: () => {
            // this.show = true;
            this.type = "2";
            this.submit();
          }
        },
        cancelText: "取消"
      });
    },
    submit() {
      this.disposeApplyPoint({
        subname: this.dataList[this.index].account,
        // tradePassword: hex_md5(this.tradePassword),
        id: this.dataList[this.index].id,
        status: this.type
      }).then(res => {
        if (res.code === 0) {
          this.tradePassword = "";
          this.$dialog.toast({
            mes: res.data,
            timeout: 1500,
            callback: () => {
              this.$router.go(-1);
            }
          });
        } else if (res.code === 1) {
          this.$dialog.toast({ mes: res.data, timeout: 1500 });
        }
      });
    },
    confirm(type) {
      // this.show = true;
      this.type = type;
      this.submit();
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../../../../static/css/common.less");
#orderDetail {
  // height: 100%;
  display: flex;
  flex-direction: column;
  .container {
    flex: 1;
    margin-top: 0;
    padding-top: 1rem;
    font-size: 13px;
    ul {
      li {
        height: .8rem;
        display: flex;
        align-items: center;
        padding-left: .3rem;
        border-bottom: 1px solid rgb(238, 238, 238);
        color: rgb(51, 51, 51);
      }
    }
    ._infoTop{
      margin-bottom: .8rem;
    }
    .tip {
      padding: .3rem;
      color: rgb(102, 102, 102);
      dt {
        margin-bottom:.2rem;
      }
      dd {
        font-size: 12px;

        line-height: .36rem;
      }
    }
  }
  footer {
    display: flex;
    justify-content: space-between;
    padding: .6rem .6rem .3rem;
    // position: absolute;
    // bottom: 30px;
    // left: 60px;
    // right: 60px;
    button {
      border-radius: 4px !important;
      font-size: 18px;
      &:nth-child(1) {
        .my-button(3rem,.8rem, #aaaaaa);
      }
      &:nth-child(2) {
        .my-button(3rem,.8rem, #0a77a0);
      }
    }
  }
  .main {
    background-color: #fff;
    padding: 0.2rem 0.3rem;
    .yd-input {
      height: .8rem;
    }
    .setRemark {
      font-size: 13px;
      margin-bottom: 0.3rem;
    }
    button {
      .my-button(100%, .8rem, #0a77a0);
      font-size: 18px;
    }
  }
}
</style>
