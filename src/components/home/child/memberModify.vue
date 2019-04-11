<template>
  <div class="memberModify">
    <div style="height: 1rem;">
      <yd-navbar title="详细信息">
        <span slot="left" @click="$router.go(-1)">
  					<yd-navbar-back-icon style="color: #fff;"></yd-navbar-back-icon>
  				</span>
        <span slot="right" @click="assisShow()">小助手</span>
      </yd-navbar>
    </div>
    <div class="list">
      <div class="content">
        <ul class="list-item">
          <li>
            <div class="list-item-tit">用户账号</div><div class="value">{{user.account}}</div>
            <div class="list-item-tit">账号余额：</div><div class="value">{{user.accountBalance}}</div>
          </li>
          <li>
            <div class="list-item-tit">账号等级</div><div class="value">{{hierarchy}}</div>
            <div class="list-item-tit">返点：</div><div class="value">{{user.rebatePoint}}</div>
          </li>
          <li v-show="user.code&&user.hierarchy!=='0'">
            <div class="list-item-tit">邀请码</div><div class="value">{{user.code}}</div>
          </li>
          <li>
            <div class="list-item-tit">QQ</div><div class="value">{{user.qq}}</div>
          </li>
          <li>
            <div class="list-item-tit">微信</div><div class="value">{{user.vx}}</div>
          </li>
          <li>
            <div class="list-item-tit">号码</div><div class="value">{{user.phone}}</div>
          </li>
          <li>
            <div class="list-item-tit">支付宝</div><div class="value">{{user.aliPay}}</div>
          </li>
          <li>
            <div class="list-item-tit">银行卡</div>
            <div class="value" v-if="bankCard.length !== 0">
              <ul>
                <li v-for="(item, index) in bankCard" :key="item[index]">
                  <span >卡{{index+1}}</span>
                  {{item.bankAccount}}
                </li>
              </ul>
              
            </div>
            <div class="value" v-else>
              未绑定
              <div  class="bind-card" @click="$router.push('/firstBankCard')">去绑定</div>
            </div>
          </li>
        </ul>
        <div></div>
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">QQ：</span>
            <yd-input slot="right" v-model="valueQQ" :debug="true" regex="^\d{5,12}$" :placeholder="user.qq=='QQ未绑定'?user.qq = '请输入QQ':user.qq = user.qq "></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">微信：</span>
            <yd-input slot="right" v-model="valueVX" regex="/^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/" :placeholder="user.vx== '微信未绑定'? user.vx = '请输入微信': user.vx = user.vx"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">手机号：</span>
            <yd-input slot="right" v-model="valuePhone" regex="mobile" :placeholder="user.phone == '号码未绑定' ? user.phone = '请输入号码': user.phone = user.phone"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">支付宝：</span>
            <yd-input slot="right" v-model="valueAliPay" regex="/^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/" :placeholder="user.aliPay == '支付宝未绑定' ? user.aliPay = '请输入支付宝账号': user.aliPay = user.aliPay"></yd-input>
          </yd-cell-item>
           <yd-cell-item>
            <span slot="left">资金密码：</span>
            <yd-input slot="right" type="password" v-model="valueMoneyPass" placeholder="请输入资金密码"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
        <button class="memberModify_but" @click="_updateOwnInfo">修改</button>
        <button class="memberModify_but ck" @click="show1 = true" v-if="this.userDetails.hierarchy !='1'">查看上级</button>
      </div>
    </div>
    <yd-popup v-model="show1" position="center" width="80%" >
      <div class="tentert" style="background-color:#fff;">
        <h1>上级资料</h1>
        <p>
          <span class="users">用户名：</span>
          <span id="superAccount" class="names">{{superAccount}}</span>
          <button class="btn" data-clipboard-target="#superAccount">复制</button>
        </p>
        <p style="margin-top: 10px;">
          <span class="users">电话：</span>
          <span id="phone" class="names">{{phone}}</span>
          <button class="btn" data-clipboard-target="#phone">复制</button>
        </p>
        <p style="margin-top: 10px;">
          <span class="users">QQ： </span>
          <span id="QQ" class="names">{{QQ}}</span>
          <button class="btn" data-clipboard-target="#QQ">复制</button>
        </p>
        <p style="margin-top: 10px;">
          <span class="users">微信：</span>
          <span id="wechat" class="names">{{wechat}}</span>
          <button class="btn" data-clipboard-target="#wechat">复制</button>
        </p>
        <p style="margin-top: 10px;">
          <span class="users">支付宝：</span>
          <span id="aliPay" class="names">{{aliPay}}</span>
          <button class="btn" data-clipboard-target="#aliPay">复制</button>
        </p>
        <div style="text-align: center;margin: 10px 0;">
          <button class="memberModify_but gb" @click="show1 = false">关闭</button>
        </div>
      </div>
    </yd-popup>
    <div class="aAssis_tant" v-show="assis_tant">
      <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant>
    </div>
  </div>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapMutations
  } from 'vuex'
  import Assistant from '../dome/assistant.vue';
  // 复制到剪切板插件
  import Clipboard from "clipboard/dist/clipboard.js";
  let clipboard = new Clipboard(".btn");
  export default {
    components: {
      Assistant,
    },
    data() {
      return {
        user: {},
        valueQQ: "",
        valueVX: "",
        valuePhone: "",
        valueAliPay: "",
        hierarchy: "",
        show1: false,
        wechat: "暂未绑定",
        QQ: "暂未绑定",
        phone: "暂未绑定",
        superAccount: "--",
        aliPay: "暂未绑定",
        assis_tant: false,
        bankCard: [],
        valueMoneyPass:"",

        
      }
    },
    computed: {
      ...mapState('login', ['userDetails'])
    },
    created() {
      this._touchsuper();
      this.getUserDetails().then(data => {
        this.user = this.userDetails;
        if (!this.userDetails.qq) {
          this.user.qq = "QQ未绑定";
        } else {
          this.user.qq = this.userDetails.qq;
        }
        if (this.userDetails.vx) {
          this.user.vx = this.userDetails.vx;
        } else {
          this.user.vx = "微信未绑定";
        }
        if (this.userDetails.phone) {
          this.user.phone = this.userDetails.phone;
        } else {
          this.user.phone = "号码未绑定";
        }
        if (this.userDetails.aliPay) {
          this.user.aliPay = this.userDetails.aliPay;
        } else {
          this.user.aliPay = "支付宝未绑定";
        }
        if (this.user.hierarchy == 0) {
          this.hierarchy = '会员'
        } else {
          this.hierarchy = this.user.hierarchy + '级代理'
        }
      });
      this.memberIfBind().then(res => {
        if (res.code == 0 && res.msg == '已绑定了数据') {
          this.bankCard = res.data.memberBankAccountList
        }
      })
    },
    mounted() {
      this.copy();
    },
    methods: {
      ...mapActions("personal", ["updateOwnInfo", "touchsuper"]),
      ...mapActions('login', ["getUserDetails"]),
      ...mapActions('home', ['memberIfBind']),
      _updateOwnInfo(account) {
        if (this.valueQQ == "" && this.valueVX == "" && this.valuePhone == "" && this.valueAliPay == "") {
          this.$dialog.toast({
            mes: "您没有做任何修改",
            timeout: 1500,
            icon: "success"
          });
        }else if(this.valueMoneyPass == ''){
          this.$dialog.toast({
            mes: "资金密码不能为空",
            timeout: 1500,
            icon: "success"
          });
        }else {
          let data = {
            qq: this.valueQQ == "" ?
              (this.valueQQ = this.user.qq) :
              (this.valueQQ = this.valueQQ),
            vx: this.valueVX == "" ?
              (this.valueVX = this.user.vx) :
              (this.valueVX = this.valueVX),
            phone: this.valuePhone == "" ?
              (this.valuePhone = this.user.phone) :
              (this.valuePhone = this.valuePhone),
            aliPay: this.valueAliPay == "" ?
              (this.valueAliPay = this.user.aliPay) :
              (this.valueAliPay = this.valueAliPay),
            tradePassword:hex_md5(this.valueMoneyPass)
          };
          this.updateOwnInfo(data).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.$dialog.toast({
                mes: "保存成功",
                timeout: 1500,
                icon: "success"
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
      },
      // 联系上级
      _touchsuper() {
        this.touchsuper().then(res => {
          if (res.code == 0) {
            if (res.WX != null) {
              this.wechat = res.WX;
            }
            if (res.QQ != null) {
              this.QQ = res.QQ;
            }
            if (res.superAccount != null) {
              this.superAccount = res.superAccount;
            }
            if (res.Phone != null) {
              this.phone = res.Phone;
            }
            if (res.aliPay != null) {
              this.aliPay = res.aliPay;
            }
          }
          // else{
          //   this.$dialog.toast({
          //       mes: res.msg,
          //       timeout: 1500,
          //       icon: "errror"
          //     });
          // }
        })
      },
      // 小助手
      assisShow() {
        if (this.assis_tant == false) {
          this.assis_tant = true;
        } else {
          this.assis_tant = false;
        }
      },
      copy() {
      clipboard.on("success", e => {
        if (!Clipboard.isSupported()) {
          this.$dialog.toast({ mes: "暂不支持复制", timeout: 1000 });
        }
        this.$dialog.toast({ mes: "复制成功！", timeout: 1000 });
      });
      clipboard.on("error", e => {
        this.$dialog.toast({
          mes: "复制失败",
          timeout: 1000,
          icon: "error"
        });
      });
    },
    },
    watch: {
      userDetails() {
        this.user = this.userDetails;
      }
    }
  }
</script>

<style lang="less" scoped>
  .memberModify {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .list {
      -webkit-overflow-scrolling: touch;
      flex: 1;
      width: 100%;
      /*position: absolute;*/
      /*top: 0rem;*/
      /*bottom: 1rem;*/
      overflow: scroll;
      padding: 0 0.2rem;
      color: #000;
      .list-item {
        width: 100%;
        margin: 0.3rem 0;
        padding: 0.3rem;
        border-radius: 2px;
        /*px*/
        color: #ffffff;
        font-size: 14px;
        position: relative;
        background-color: #17a8e1;
        
        li {
          width: 100%;
          display: flex;
          .list-item-tit {
            width: 25%;
            &:after {
              content: ':';
              display: inline-block;
              position: absolute;
              left: 22%;
            }
          }
          .value {
            color: #ffffff;
            width: 75%;
            position: relative;
            ul {
              // border: 1px solid #ffffff;
              border-bottom: none;
              li {
                padding: 5px;
                border-bottom: 1px solid #ffffff;
                span{
                  display: inline;
                  color: #ef4f4f;
                  margin-right: 0.2rem;
                  line-height: 0.3rem;
                  padding: 2px;
                  background: #fff;
                  border-radius: 5px;
                }
              }
            }
            .bind-card {
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
        li:nth-child(1){
          .value{
            width: 25%;
          }
        }
        li:nth-child(2){
          .value{
            width: 25%;
          }
        }
        .content_but {
          position: absolute;
          right: 0.2rem;
          top: 0.2rem;
          width: 1rem;
          height: 0.5rem;
        }
      }
    }
    .pagination {
      position: fixed;
      bottom: 0;
      right: 0.2rem;
    }
    .memberModify_but {
      display: block;
      height: 0.8rem;
      width: 100%;
      border: 0;
      background: #04be02;
      color: #ffffff;
      text-align: center;
      line-height: 0.8rem;
      font-size: 14px;
      border-radius: 5px;
    }
    .ck {
      margin-top: 0.25rem;
      background: #ef4f4f;
    }
    .yd-popup-center{
      border-radius: 5px !important;
    }
    .tentert {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 0.3rem;
      h1 {
        height: 0.6rem;
        background: #d91d36;
        color: #fff;
        font-size: 0.3rem;
        line-height: 0.6rem;
        margin-bottom: 0.2rem;
        text-align: center;
      }
      p {
        height: 0.6rem;
        width: 100%;
        border-bottom: 1px solid #ccc;
        span {
          float: left;
          font-size: 0.4rem; // font-weight: 800;
        }
        button{
          float: right;
          width: 15;
          border-radius: 4px;
          border: 0;
          background: #d91d36;
          width: 0.8rem;
          height: 0.5rem;
          color: #fff;
        }
        .users {
          width: 30%;
          text-align: right;
          font-size: 0.3rem;
          line-height: 0.6rem;
        }
        .names {
          width: 45%;
          text-align: left;
          font-size: 0.28rem;
          line-height: 0.6rem;
        }
      }
    }
    .yd-cell-item {
      span {
        font-size: 0.32rem !important;
      }
      .yd-input {
        font-size: 0.35rem !important;
        input {
          .yd-cell-right input {
            font-size: 0.35rem !important;
          }
        }
      }
    }
    .aAssis_tant {
      position: absolute;
      top: 45px;
      left: 0;
      width: 100%;
      height: calc(100% - 1rem - 0px);
      z-index: 1001;
      /* background: #2dabf3; */
    }
    
  }
</style>
