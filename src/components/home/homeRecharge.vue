<template>
  <div class="homeRecharge">
    <yd-flexbox direction="vertical">
      <div class="homeRecharge_head" v-stopSlide>
        <Header v-if="this.isLogin == false"></Header>
        <HeaderII v-if="this.isLogin == true"></HeaderII>  
      </div>
      <yd-flexbox-item class="homeRecharge_nav">
        <div class="one">
          <Box @click.native="toPash('/recharge')" width="40%" height="100%" backgroundColor="#3b5999" colorEffect="#2b3f6b">
            <p class="homeRecharge_name">充值</p>
            <p> • 公司入款</p>
            <p> • 快捷支付</p>
            <img src="../../../static/img/home/home_icon_recharge@2x.png" alt="">
          </Box>
          <img class="one_img" src="../../../static/img/home/home_content_recharge@2x.png" alt="">
        </div>
        <div class="two">
          <img class="two_img" src="../../../static/img/home/home_content_Withdrawals@2x.png" alt="">
          <Box @click.native="toPash('/withdraw')" width="40%" height="100%" backgroundColor="#0cc7f0" colorEffect="#0c95b3">
            <p class="homeRecharge_name">提现</p>
            <p> • 快速到账</p>
            <p> • 资金安全</p>
            <img src="../../../static/img/home/home_icon_Withdrawals@2x.png" alt="">
          </Box>
        </div>
        <div class="three">
          <div class="three_left">
            <Box @click.native="toPash('/hotChange')" width="100%" height="100%" backgroundColor="#f48e20" colorEffect="#298964">
            <p class="homeRecharge_name">转换</p>
            <p> • 各大游戏</p>
            <p> • 资金转换</p>
            <img src="../../../static/img/home/edzh.png" alt="">
          </Box>
          </div>
          <div class="three_right">
           <Box @click.native="toPash('/turningPoint')" width="100%" height="100%" backgroundColor="#00ae8b" colorEffect="#298964">
            <p class="homeRecharge_name">转点</p>
            <p> • 各级账号</p>
            <p> • 相互转点</p>
            <img src="../../../static/img/home/sxzh.png" alt="">
          </Box>
          </div>
        </div>

      </yd-flexbox-item>
      <div class="homeRecharge_bottom" v-stopSlide>
        <Footer></Footer>
      </div>
    </yd-flexbox>
    <div v-show="show1" class="codes">
      <div class="backg"></div>
       <div class="centers">
         <div >
           请先绑定资料！
         </div>
         <img src="../../../static/img/home/gantan.png" alt="">
         <div class="centers_but">
            <yd-button type="primary" @click.native="handleClick('/firstBankCard')">去绑定</yd-button>
            <yd-button type="danger" @click.native="handleClick('/allKinds')">返  回</yd-button>
         </div>
        </div>
    </div>
  </div>
</template>

<script>
import Header from "../home/dome/home_head.vue";
import HeaderII from '../home/dome/home_headII.vue';
import Footer from "../home/dome/home_foot.vue";
import Box from "../common/box.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      bcg: false,
      msg: "",
      show1:false,
    };
  },
  created(){
      // console.log(this.isLogin)
      // this._memberIfBind();
    },
    computed:{
	  ...mapState([
		'isLogin'
      ]),
       ...mapState('login',[
        'userDetails'
      ]),
    },
  methods: {
    ...mapActions(["queryBank"]),
     ...mapActions('home',[
        'memberIfBind'
      ]),
     _memberIfBind(){
        let that = this;
        this.memberIfBind().then( res => {
          if(res.code == 0 && this.userDetails.type != 1){
            that.show1 = false;
          }else if(res.code == 1 &&this.userDetails.type != 1){
            that.show1 = true;
          }
        })
      },
      handleClick(name){
      this.$router.push({
          path: name
        });
    },
    toPash(name){
        if(this.isLogin == false){
         this.$dialog.toast({
						mes: '未登录',
						timeout: 1000,
						// icon: 'success'
                });
        }else if( (name == '/recharge' || name == '/withdraw' || name == '/hotChange'|| name == '/turningPoint') && this.userDetails.type == 1){
            this.$dialog.toast({
						mes: '会员登录查看更多',
						timeout: 1000,
						// icon: 'success'
                });
        }else{
            this.$router.push({
            path: name
          })
        }
    }  
  },
  components: {
    Header,
    HeaderII,
    Footer,
    Box
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/recharge/companyIncome") {
      this.queryBank({ pcOrPhone: "1", type: "0" }).then(res => {
        if (res.code === 1) {
          next({ path: "/payment" });
        } else {
          next();
        }
      });
    } else {
      next();
    }
  }
};
</script>

<style lang="less">
.homeRecharge {
  height: 100%;
  width: 100%;
  background: url("../../../static/img/home/home_bg@2x.png") no-repeat;
  background-size: cover;
  box-sizing: border-box;
  color: #c5cad0;
  font-size: 0.28rem;
  position: fixed;
  top:0;
  left: 0;
  bottom:0;
  right: 0;
  .homeRecharge_head {
    height: 1rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.15rem;
    margin-bottom: 0.07rem;
  }
  .homeRecharge_bottom {
    height: 1.2rem;
    width: 100%;
    box-sizing: border-box;
    opacity: 1;
    .homeRecharge_bottom_item {
      height: 1.2rem;
      box-sizing: border-box;
      padding: 0.08rem 0.1rem;
      color: #ffffff;
      opacity: 0.7;
      img {
        width: 0.8rem;
        margin-left: 55%;
      }
      div {
        text-align: left;
      }
    }
  }
}
.active {
  opacity: 1 !important;
}
.homeRecharge_nav {
  height: 100%;
  text-align: center;
  color: #ffffff;
  overflow: auto;
  div {
    margin-bottom: 3%;
  }
  .one {
    height: 40%;
    #_Box {
      float: left;
      position: relative;
      img {
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;
        width: 20%;
      }
      p {
        font-size: 0.32rem;
        height: 12%;
      }
      .homeRecharge_name {
        margin: 30% 0 10% 0;
        font-size: 0.4rem;
      }
    }
    .one_img {
      float: left;
      width: 60%;
      height: 100%;
    }
  }
  .two {
    height: 29%;
    .two_img {
      float: left;
      width: 60%;
      height: 100%;
    }
    #_Box {
      float: left;
      position: relative;
      img {
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;
        width: 18%;
      }
      p {
        font-size: 0.32rem;
        height: 15%;
      }
      .homeRecharge_name {
        margin: 20% 0 7% 0;
        font-size: 0.4rem;
      }
    }
  }
  .three {
    height: 24%;
    width: 100%;
    .three_left{
      width: 40%;
      height: 100%;
      float: left;
    }
     .three_right{
       float: left;
      width: 40%;
      height: 100%;
      margin-left: 3%;
    }
    #_Box {
      height: 100%;
      position: relative;
      img {
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;
        width: 18%;
      }
      p {
        font-size: 0.32rem;
        height: 15%;
      }
      .homeRecharge_name {
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.35rem;
      }
    }
  }
}
.homeRecharge .codes{
  position: absolute;
    top: 1rem;
    left: 0;
    width: 100%;
    height: calc(100% - 1rem - 1.2rem);
    z-index: 9999;
    .centers{
      position: absolute;
      left: 50%;
      top:25%;
      height: 30%;
      width: 60%;
      background: #ffffff;
      border: 1px solid #c1c1c1;
      margin: auto;
      margin-left: -30%;
      padding-top: 2%;
      text-align: center;
      div{
        height: 25%;
        color: #2c2c2c;
        line-height: 100%;
        font-size: 0.4rem;
      }
      img{
        // height: 50%;
      }
      .centers_but{
        margin-top: 2%;
      }
    }
    .backg{
      height: 100%;
      width: 100;
      background:#000;
      opacity: 0.5; 
      padding-top: 40%;
      box-sizing: border-box;
    }
}
</style>
