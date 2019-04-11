<template>
  <div class="turningPoint">
    <yd-navbar title="转点">
      <router-link to="/homeRecharge" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div ref="wrapper" class="list">
      <yd-tab>
        <yd-tab-panel label="转点下级">
          <div class="content" v-if="userDetails.hierarchy != '0'">
            <div class="content_tel">
              <h1>温馨提示：</h1>
              <p>此转点功能可以给指定的下级转点！</p>
            </div>
            <yd-cell-group>
              <yd-cell-item>
                <span slot="left">支付方式：</span>
                <yd-radio-group v-model="radio2" slot="left">
                  <yd-radio val="0">微信</yd-radio>
                  <yd-radio val="1">支付宝</yd-radio>
                </yd-radio-group>
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">转点金额：</span>
                <input slot="right" type="number" placeholder="请输入转点金额" v-model="moneyNum">
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">下级账号：</span>
                <input slot="right" type="text" placeholder="请输入下级账号" v-model="account">
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">资金密码：</span>
                <input slot="right" type="password" placeholder="请输入资金密码" v-model="moneyPass">
              </yd-cell-item>
            </yd-cell-group>
            <yd-button size="large" type="primary" @click.native="_turnPoint">确认</yd-button>
          </div>
          <div class="content" v-if="userDetails.hierarchy == '0'">
            <div class="content_tel content_tel_no">
              <h1>温馨提示：</h1>
              <p class="content_tel_p">当前账号没有下级！</p>
            </div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="转点上级">
          <div class="content" v-if="userDetails.hierarchy != '1'">
            <div class="content_tel">
              <h1>温馨提示：</h1>
              <p>此转点功能当前账号需要向上级申请！</p>
            </div>
            <yd-cell-group>
              <yd-cell-item>
                <span slot="left">支付方式：</span>
                <yd-radio-group v-model="radio1" slot="left">
                  <yd-radio val="0">微信</yd-radio>
                  <yd-radio val="1">支付宝</yd-radio>
                </yd-radio-group>
              </yd-cell-item>

              <yd-cell-item>
                <span slot="left">申请金额：</span>
                <input slot="right" type="number" placeholder="请输入申请金额" v-model="amount">
              </yd-cell-item>
              <!-- <yd-cell-item>
                <span slot="left">资金密码：</span>
                <input slot="right" type="password" placeholder="请输入资金密码" v-model="tradePassword">
              </yd-cell-item> -->
              <yd-cell-item>
                <span slot="left">真实姓名：</span>
                <input slot="right" type="text" placeholder="请输入真实姓名" v-model="realname">
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">转账账号：</span>
                <input slot="right" type="text" placeholder="请输入转账账号" v-model="paynum">
              </yd-cell-item>
            </yd-cell-group>
            <yd-button size="large" type="primary" @click.native="_applyPoint(0)">充值</yd-button>
            <yd-button size="large" type="danger" @click.native="_applyPoint(1)">提现</yd-button>
          </div>
          <div class="content" v-if="userDetails.hierarchy == '1'">
            <div class="content_tel content_tel_no">
              <h1>温馨提示：</h1>
              <p class="content_tel_p">当前账号没有上级！</p>
            </div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="转点审核">
          <div class="content" v-show="query_ApplyPoint">
            <div class="content_tel">
              <h1>温馨提示：</h1>
              <p>审核下级向上级的转点申请！</p>
            </div>
            <div class="content_list">
              <div class="lists" v-for="(item, index) in query_ApplyPoint_list">
                <p>
                  <span>下级账号：</span>
                  <span>{{item.account}}</span>
                </p>
                 <p>
                  <span>真实姓名：</span>
                  <span>{{item.realname}}</span>
                </p>
                 <p>
                  <span>转账账号：</span>
                  <span>{{item.paynum}}</span>
                </p>
                <p>
                  <span>转点金额：</span>
                  <span>{{item.amount}}元</span>
                </p>
                 <p>
                  <span>转点方式：</span>
                  <span>{{item.types}}</span>
                </p>
                 <p>
                  <span>支付方式：</span>
                  <span>{{item.deal_Type}}</span>
                </p>
                <p v-if="item.dealType == '1'">
                  <span>支付宝账号：</span>
                  <span>{{item.ali_Pay}}</span>
                </p>
                <p v-else>
                  <span>微信账号：</span>
                  <span>{{item.WeChat}}</span>
                </p>
                <p>
                  <span>申请时间：</span>
                  <span>{{item.apply_time}}</span>
                </p>
                <div class="but">
                  <yd-button
                    :type="types"
                    @click.native="_showPopup(item.id,item.account)"
                  >{{popupName}}</yd-button>
                </div>
              </div>
            </div>
          </div>
          <div class="content" v-show="!query_ApplyPoint">
            <div class="content_tel content_tel_no">
              <h1>温馨提示：</h1>
              <p class="content_tel_p" v-if="userDetails.hierarchy != '0'">当前暂无转点审核任务！</p>
              <p class="content_tel_p" v-if="userDetails.hierarchy == '0'">当前账号暂无转点审核任务！</p>
            </div>
          </div>
        </yd-tab-panel>
      </yd-tab>
    </div>
    <yd-popup v-model="show1" position="center" width="90%">
      <div style="background-color:#fff;padding: 0.2rem;">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">下级账号：</span>
            <input slot="right" type="text" placeholder="请输入下级账号" :value="accountII">
          </yd-cell-item>
          <!-- <yd-cell-item>
            <span slot="left">资金密码：</span>
            <input slot="right" type="password" placeholder="请输入资金密码" v-model="moneyPassII">
          </yd-cell-item> -->
        </yd-cell-group>
        <p style="text-align: center;">
          <yd-button type="disabled" @click.native="_disposeApplyPoint(2)">不通过</yd-button>
          <yd-button @click.native="_disposeApplyPoint(0)">通过</yd-button>
        </p>
      </div>
    </yd-popup>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      account: "",
      moneyNum: "",
      moneyPass: "",
      amount: "",
      tradePassword: "",
      query_ApplyPoint: null,
      query_ApplyPoint_list: [],
      types: "primary",
      show1: false,
      PointId: "",
      accountII: "",
      moneyPassII: "",
      popupName: "审核",
      radio1:"0",
      radio2:"0",
      realname:"",
      paynum:"",
    };
  },
  created() {
    this._queryApplyPoint();
    // console.log(this.userDetails)
  },
  mounted() {},
  components: {},
  computed: {
    ...mapState("login", ["userDetails"])
  },
  methods: {
    ...mapActions([
      "superToSub",
      "applyPoint",
      "queryApplyPoint",
      "disposeApplyPoint"
    ]),
    // 转点下级
    _turnPoint() {
      if (this.moneyNum == "") {
        this.$dialog.toast({
          mes: "请输入转点金额",
          timeout: 1000
        });
      } else if (this.account == "") {
        this.$dialog.toast({
          mes: "请输入下级账号",
          timeout: 1000
        });
      } else if (this.moneyPass == "") {
        this.$dialog.toast({
          mes: "请输入资金密码",
          timeout: 1000
        });
      } else {
        this.superToSub({
          amount: this.moneyNum, //金额,
          tradePassword: hex_md5(this.moneyPass), //   交易密码,
          subname: this.account, //转入账户
          dealType: this.radio2,
        }).then(res => {
          if (res.code == "0") {
            this.$dialog.toast({
              mes: res.data,
              timeout: 1500,
              icon: "success"
            });
            this.moneyNum = "";
            this.moneyPass = "";
            this.account = "";
          } else {
            this.$dialog.toast({
              mes: res.data,
              timeout: 1500,
              icon: "error"
            });
          }
        });
      }
    },
    // 转点上级
    _applyPoint(typeNum) {
      if (this.amount == "") {
        this.$dialog.toast({
          mes: "请输入转点金额",
          timeout: 1000
        });
      } else if (this.realname == "") {
        this.$dialog.toast({
          mes: "请输入真实姓名",
          timeout: 1000
        });
      } else if (this.paynum == "") {
        this.$dialog.toast({
          mes: "请输入转账账号",
          timeout: 1000
        });
      }else {
        this.applyPoint({
          amount: this.amount, //金额,
          // tradePassword: hex_md5(this.tradePassword), //交易密码,
          paynum:this.paynum,
          realname:this.realname,
          dealType: this.radio1,
          type: typeNum
        }).then(res => {
          console.log(res);
          if (res.code == "0") {
            this.$dialog.toast({
              mes: res.data,
              timeout: 1500,
              icon: "success"
            });
            this.amount = "";
            this.tradePassword = "";
          } else {
            this.$dialog.toast({
              mes: res.data,
              timeout: 1500,
              icon: "error"
            });
          }
        });
      }
    },
    // 接收转点消息
    _queryApplyPoint() {
      this.queryApplyPoint().then(res => {
        // console.log(res);
        if (res.length == 0) {
          this.query_ApplyPoint = false;
        } else if (res.length != 0) {
          this.query_ApplyPoint = true;
          this.query_ApplyPoint_list = res;
          this.query_ApplyPoint_list.forEach( item => {
            if(item.dealType == '0'){
              item.deal_Type = '微信'
            }else if(item.dealType == '1'){
              item.deal_Type = '支付宝'
            }
            if(item.type == '0'){
              item.types = '充值'
            }else if(item.type == '1'){
              item.types = '提现'
            }
            if(item.aliPay == null){
              item.ali_Pay = "暂未绑定"
            }else{
              item.ali_Pay = item.aliPay;
            }
            if(item.vx == null){
              item.WeChat = "暂未绑定"
            }else{
              item.WeChat = item.vx;
            }
            item.apply_time = item.applytime.slice(0, 19); 
          })
        }
      });
    },
    //审核转点消息
    _disposeApplyPoint(status) {
      // if (this.moneyPassII == "") {
      //   this.$dialog.toast({
      //     mes: "请输入资金密码",
      //     timeout: 1000
      //   });
      // } else {
        this.disposeApplyPoint({
          subname: this.accountII,
          // tradePassword: hex_md5(this.moneyPassII),
          id: this.PointId,
          status: status
        }).then(res => {
          if (res.code == 0) {
            this.$dialog.toast({
              mes: res.data,
              timeout: 1500,
              icon: "success"
            });
            this.moneyPassII = "";
            this.show1 = false;
            this._queryApplyPoint();
            // this.popupName = '已审核';
            // this.types = 'disabled';
          } else if (res.code == 1) {
            this.$dialog.toast({
              mes: res.data,
              timeout: 1500,
              icon: "error"
            });
            this.moneyPassII = "";
          }
        });
      // }
    },
    _showPopup(id, account) {
      this.PointId = id;
      this.accountII = account;
      this.show1 = true;
    }
  }
};
</script>

<style lang="less">
.turningPoint {
  height: 100%;
  font-size: 0.3rem;
  .yd-navbar {
    // background: #011935 !important;
    /*background: linear-gradient(0,#272a32,#4b4e58)!important;*/
    color: #ffffff;
    .yd-back-icon:before,
    .yd-navbar-center-title {
      color: #ffffff !important;
    }
  }

  .list {
    -webkit-overflow-scrolling: touch;
    // height: 100%;
    width: 100%;
    position: absolute;
    top: 1.2rem;
    left: 0;
    overflow: hidden;
    padding: 0 0.2rem;
    color: #ffffff;
    p {
      margin-bottom: 0.2rem;
    }
    .repbatePoint {
      width: 2rem;
      border: 1px solid #fff !important;
      border-radius: 4px;
      padding: 0.1rem;
      color: #fff;
    }
    .list-item {
      width: 100%;
      margin: 0.3rem 0;
      padding: 0.3rem;
      border-radius: 2px; /*px*/
      color: #ffffff;
      position: relative;
      p {
        text-align: left;

        span {
          color: #ffffff !important;
        }
      }
      .content_but {
        position: absolute;
        right: 0.2rem;
        bottom: 0.4rem;
        width: 1rem;
        height: 0.5rem;
      }
    }
    .yd-cell-item {
      background: #f1f1f1;
    }
    .content_tel {
      height: 1.5rem;
      color: #000;
      h1 {
        height: 0.6rem;
        color: red;
      }
      p {
        margin-left: 1rem;
        padding-left: 0.2rem;
      }
      .content_tel_p {
        background: #f1f1f1;
        height: 2.8rem;
        line-height: 0.8rem;
      }
    }
    .content_tel_no {
      margin-top: 0.2rem;
      height: 4rem;
      border: 3px solid goldenrod;
      box-sizing: border-box;
      padding: 0.2rem;
      border-radius: 5px;
    }
    .content_list {
      color: #000;
      .lists {
        position: relative;
        background: #f1f1f1;
        padding: 0.2rem;
        margin-bottom: 0.2rem;
        p{

        }
        .but {
          position: absolute;
          right: 0.2rem;
          bottom: 0.2rem;
          width: 1rem;
          height: 0.6rem;
          
        }
      }
    }
  }
  .pagination {
    position: fixed;
    bottom: 0;
    right: 0.2rem;
  }
  ._select {
    display: flex;
    align-items: center;
    .yd-radio-text {
      color: #fff;
    }
  }
}
</style>
