<template>
  <div class="information">
    <yd-popup v-model="showPhoto" position="center" masker-opacity="0" class="showPhoto">
      <div style="background-color:#fff;">
        <div class="title">点击更换头像</div>
        <div class="center" style="width: 7.04rem;display: flex;justify-content: space-around;flex-wrap: wrap;">
          <div class="" v-for="item in spriteIconList" :key="item" :class="'avatar-list '+'sprite-icon-'+item" @click="changeIconClass(item)"></div>
        </div>

      </div>
    </yd-popup>
    <yd-navbar title="账号详情" v-stopSlide>
      <!-- <router-link to="/home" slot="left"> -->
      <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
      <!-- </router-link> -->
      <div slot="right" @click="assisShow()">
        小助手
      </div>
    </yd-navbar>
    <div class="information_nav">
      <section>
        <div class="information_container">
          <div style="display:flex;align-items:center">
            <div :class="'avatar-list '+'sprite-icon-'+iconClass" @click="sel_photo"></div>
            <div style="display:flex;flex-direction:column;align-items:flex-start">
              <p>账号：{{userDetails.account}}</p>
              <p>余额：<i v-if="show">{{userDetails.accountBalance}}</i>
                <i v-else>****</i>
                <span @click="toMoneyShow">{{show?'隐藏':'显示'}}</span>
              </p>
            </div>
          </div>
          <div v-show="status==='1'" >
            <div v-if="userDetails.type=='0'">
              <button @click="sign"  v-if="!signStatus">签到</button><button class="no_sign" v-else>已签到</button>
            </div>
          </div>
        </div>

      </section>
      <!-- <yd-cell-group title="">
				<yd-cell-item >
					<div class="imgs" slot="left" style="background-color: #059eea">
						<img src="../../../static/img/information/information_touxiang.png" />
					</div>
					<span slot="left">头像</span>
					<div  slot="right">
						<div :class="'avatar '+'sprite-icon-'+iconClass" @click="sel_photo"></div>
					</div>
					
				</yd-cell-item>
				<yd-cell-item >
					<div class="imgs" slot="left" style="background-color: #059eea">昵</div>
					<span slot="left">昵称</span>
					<span slot="right">{{userDetails.nickName}}</span>
				</yd-cell-item>
				<yd-cell-item >
					<div class="imgs" slot="left" style="background-color: #00e27e">账</div>
					<span slot="left">账号</span>
					<span slot="right">{{userDetails.account}}</span>
				</yd-cell-item>
			</yd-cell-group> -->
      <yd-cell-group title="">
        <!-- <yd-cell-item >
					<div class="imgs" slot="left" style="background-color: #ff3f4a">
						<img src="../../../static/img/information/qianbao.png" />
					</div>
					<span slot="left">我的钱包</span>
					<span slot="right" style="color: #d62541">{{this.userDetails.accountBalance}}</span>
				</yd-cell-item> -->
        <yd-cell-item arrow  type="link"  href='myTasks'>
          <div class="imgs" slot="left" style="background-color: #fff">
            <img style="width:0.68rem;height:0.68rem;margin:0" src="../../../static/img/information/task.png" />
          </div>
            <span slot="left">我的任务</span>
            <yd-badge v-show="activeNum!==0" slot="right" type="danger">{{activeNum}}</yd-badge>
        </yd-cell-item>
        <!-- <yd-cell-item>
          <div class="imgs" slot="left" style="background-color: #ff3f4b">
            <img src="../../../static/img/information/xin.png" />
          </div>
          <span slot="left">我的收藏</span>
        </yd-cell-item>
        <yd-cell-item>
          <div class="imgs" slot="left" style="background-color: #fe9e14">
            <img src="../../../static/img/information/xiangce.png" />
          </div>
          <span slot="left">我的相册</span>
        </yd-cell-item> -->
      </yd-cell-group>
      <!-- <yd-button v-if="userDetails.hierarchy != '1' && userDetails.type =='0'" size="large" type="danger" @click.native="show1 = true">联系上级</yd-button> -->

    </div>
    <!-- 小助手 -->
    <div class="Assis_tant" v-show="assis_tant">
      <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant>
    </div>

     <yd-popup v-model="show1" position="center" width="80%" height="60%">
            <div class="tentert" style="background-color:#fff;">
              <h1>上级资料</h1>
                <p>
                   <span class="users">用户名：</span>
                   <span class="names">{{superAccount}}</span>
                </p>
                <p style="margin-top: 10px;">
                   <span class="users">电话：</span>
                   <span class="names">{{phone}}</span>
                </p>
                <p style="margin-top: 10px;">
                   <span class="users">QQ： </span>
                   <span class="names">{{QQ}}</span>
                </p>
                <p style="margin-top: 10px;">
                   <span class="users">微信：</span>
                   <span class="names">{{wechat}}</span>
                </p>
                <p style="margin-top: 10px;">
                   <span class="users">支付宝：</span>
                   <span class="names">{{aliPay}}</span>
                </p>
                <div style="text-align: center;margin: 10px 0;">
                    <yd-button @click.native="show1 = false">关闭</yd-button>
                </div>
            </div>
        </yd-popup>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Assistant from "../home/dome/assistant.vue";
export default {
  data() {
    return {
      msg: "设置",
      showPhoto: false,
      spriteIconList: [
        "1",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "17",
        "18",
        "19",
        "2",
        "20",
        "3",
        "4",
        "6",
        "9"
      ],
      iconClass: "1",
      show: true,
      signStatus: false,
      assis_tant: false,
      status: "0",
      gomyTasks: '/information',
      show1:false,
      wechat:"暂未绑定",
      QQ:"暂未绑定",
      phone:"暂未绑定",
      superAccount:"--",
      aliPay:"暂未绑定"
    };
  },
  computed: {
    ...mapState("login", ["userDetails"]),
    ...mapGetters(["activeNum"])
  },
  components: {
    Assistant
  },
  created() {
    this.init();
    if(this.userDetails.type === '0'){
     
      this.gomyTasks = '/myTasks'
    }else{
      this.gomyTasks = '/information'
    }
    // if(this.userDetails.hierarchy != '1' && this.userDetails.type =='0'){
    //    this._touchsuper();
    // }
    
  },
  mounted() {
    if (this.userDetails.avatar) {
      this.iconClass = this.userDetails.avatar;
    }
  },
  destroyed() {
    this.getUserDetails();
  },
  methods: {
    ...mapActions(["saveDiy", "signTime", "signRecord", "queryActivity","touchsuper"]),
    ...mapActions("login", ["getUserDetails"]),
    init() {
      if (!localStorage.getItem("moneyShow")) {
        localStorage.setItem("moneyShow", "1");
      }
      this.show = localStorage.getItem("moneyShow") === "1" ? true : false;
      this.queryActivity().then(res => {
        for (let item of res) {
          if (item.id === "sign") {
            this.signStatus = item.nowStatus;
            this.status = item.status;
          }
        }
      });
    },
    //余额显示隐藏
    toMoneyShow() {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    sel_photo() {
      this.showPhoto = true;
    },
    changeIconClass(item) {
      this.saveDiy({ avatar: item });
      this.iconClass = item;
    },

    sign() {
      this.signTime().then(res => {
        if (res.code == 0) {
          this.$dialog.toast({
            mes: `签到成功，+${res.data}积分`,
            timeout: 1500,
            callback: () => {
              this.init()
            }
          });
        }else if(res.code != 0 ){
          this.$dialog.toast({
              mes: res.msg,
              timeout: 1000,
              icon: 'error'
            });
        }
      });
    },
    // 联系上级
     _touchsuper(){
      this.touchsuper().then( res => {
        if(res.code == 0){
          if( res.WX != null){
            this.wechat = res.WX;
          }
          if(res.QQ != null){
            this.QQ = res.QQ;
          }
           if(res.superAccount != null){
             this.superAccount = res.superAccount;
          }
           if(res.Phone != null){
           this.phone = res.Phone;
          }
          if(res.aliPay != null){
           this.aliPay = res.aliPay;
          }
        }else if(res.code == 1){
          this.$dialog.toast({
              mes: res.message,
              timeout: 1500,
              icon: "errror"
            });
        }
        else{
          this.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
              icon: "errror"
            });
        }
      })
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
  watch: {
    userDetails() {
      if (this.userDetails.avatar) {
        this.iconClass = this.userDetails.avatar;
      }
    },
    show(newValue) {
      if (newValue) {
        localStorage.setItem("moneyShow", "1");
      } else {
        localStorage.setItem("moneyShow", "2");
      }
    }
  }
};
</script>
<style lang="less">
.information {
  height: 100%;
  background-color: #f1f1f1;
  text-align: center;
  .yd-popup-center{
    // height: 4rem !important;
    // border: 1px solid #cccccc;
    
    .tentert{
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 0.3rem;
      h1{
        height: 0.6rem;
        background: #d91d36;
        color: #fff;
        font-size: 0.35rem;
        line-height: 0.6rem;
        margin-bottom: 0.2rem;
      }
      p{
        height: 0.6rem;
        width: 100%;
        border-bottom: 1px solid #ccc;
        span{
          float: left;
          width: 50%;
          font-size: 0.4rem;
          // font-weight: 800;
        }
        .users{
          width: 40%;
          text-align: right;
        }
        .names{
          width: 60%;
          text-align: left;
        }
      }
    }
  }
}
.information .Assis_tant {
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  height: calc(100% - 1rem - 0px);
  /* background: #2dabf3; */
}

.information_nav {
  overflow: hidden;
  padding-top: 1rem;
  background: #f1f1f1;
  /*height: 100%;*/
  box-sizing: border-box;
  section {
    width: 100%;
    margin-bottom: 0.2rem;
    background: #fff;
    .information_container {
      font-size: 0.28rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.2rem;
      .avatar-list {
        width: 1.28rem;
        height: 1.28rem;
        margin: 0.16rem;
        border-radius: 50%;
        background-image: url(../../../static/img/sprite.png);
        background-size: 1.28rem 22rem;
      }
      p {
        margin: 0.1rem;
        span {
          // margin-left: 0.1rem;
          color: #d91d36;
        }
      }
      button {
        padding: 0.2rem 0.3rem;
        outline: none;
        border-radius: 10%;
        color: #fff;
        background: #d91d36;
        border: 0;
        font-weight: 900;
        &:active {
          background: #e36172;
        }
      }
      .no_sign {
        background: #c4c4c4;
        color: #fff;
        &:active {
          background: #c4c4c4;
        }
      }
    }
  }
}

.information .yd-navbar {
  background: #011935 !important;
}

.information .yd-navbar .yd-navbar-item i {
  color: #ffffff !important;
}

.information .yd-navbar span {
  color: #ffffff !important;
}

.information .yd-cell-box {
  margin-bottom: 0;
  // border-bottom: 0.8rem solid #f1f1f1;
}

.information_nav .imgs {
  border-radius: 0.1rem;
  margin-right: 0.35rem;
  width: 0.68rem;
  color: #ffffff;
  height: 0.65rem;
  line-height: 0.65rem;
}

.information .imgs img {
  height: 0.4rem;
  margin: 0.1rem;
}

.information .imgs .photo {
  height: 0.4rem;
  margin: 0.14rem;
}

.information .yd-cell-item {
  height: 0.95rem;
}

.information .showPhoto {
  .yd-popup-center {
    border-radius: 4px;
    box-shadow: 1px 1px 7px 2px #aaa;
  }
  .yd-popup-content {
    border-radius: 4px;
  }
  .title {
    line-height: 0.5rem;
    height: 0.5rem;
    font-size: 12px;
    opacity: 0.8;
  }
  .center {
    height: auto;
    .avatar-list {
      width: 1.28rem;
      height: 1.28rem;
      margin: 0.16rem;
      border-radius: 50%;
      background-image: url(../../../static/img/sprite.png);
      background-size: 1.28rem 22rem;
    }
  }
}
.avatar {
  width: 0.7168rem;
  height: 0.7168rem;
  border-radius: 50%;
  background-image: url(../../../static/img/sprite.png);
  background-size: 0.7168rem 15.4rem;
}
.sprite-icon-1.avatar {
  background-position: 0 -0.96rem;
}

.sprite-icon-1 {
  background-position: 0 -1.38rem;
}
.sprite-icon-10 {
  background-position: 0 -11.04rem;
}
.sprite-icon-11 {
  background-position: 0 -2.76rem;
}
.sprite-icon-12 {
  background-position: 0 -4.14rem;
}
.sprite-icon-13 {
  background-position: 0 -5.52rem;
}
.sprite-icon-14 {
  background-position: 0 -6.9rem;
}
.sprite-icon-15 {
  background-position: 0 -8.28rem;
}
.sprite-icon-17 {
  background-position: 0 -9.66rem;
}
.sprite-icon-18 {
  background-position: 0 0;
}
.sprite-icon-19 {
  background-position: 0 -12.432rem;
}
.sprite-icon-2 {
  background-position: 0 -13.8rem;
}
.sprite-icon-20 {
  background-position: 0 -15.18rem;
}
.sprite-icon-3 {
  background-position: 0 -16.568rem;
}
.sprite-icon-4 {
  background-position: 0 -17.948rem;
}
.sprite-icon-6 {
  background-position: 0 -19.332rem;
}
.sprite-icon-9 {
  background-position: 0 -20.712rem;
}
.sprite-icon-10.avatar {
  background-position: 0 -7.74rem;
}
.sprite-icon-11.avatar {
  background-position: 0 -1.94rem;
}
.sprite-icon-12.avatar {
  background-position: 0 -2.9rem;
}
.sprite-icon-13.avatar {
  background-position: 0 -3.86rem;
}
.sprite-icon-14.avatar {
  background-position: 0 -4.84rem;
}
.sprite-icon-15.avatar {
  background-position: 0 -5.8rem;
}
.sprite-icon-17.avatar {
  background-position: 0 -6.78rem;
}
.sprite-icon-18.avatar {
  background-position: 0 0;
}
.sprite-icon-19.avatar {
  background-position: 0 -8.72rem;
}
.sprite-icon-2.avatar {
  background-position: 0 -9.668rem;
}
.sprite-icon-20.avatar {
  background-position: 0 -10.628rem;
}
.sprite-icon-3.avatar {
  background-position: 0 -11.6rem;
}
.sprite-icon-4.avatar {
  background-position: 0 -12.56rem;
}
.sprite-icon-6.avatar {
  background-position: 0 -13.54rem;
}
.sprite-icon-9.avatar {
  background-position: 0 -14.5rem;
}
</style>