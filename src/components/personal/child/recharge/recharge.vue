<template>
  <div id="recharge">
  	<div style="height: 1rem;width: 100%;">
			<yd-navbar :title="$route.params.id==='1'?'选择充值方式':'选择提现方式'">
				<span slot="left" @click="$router.go(-1)">
					<yd-navbar-back-icon style="color: #fff;"></yd-navbar-back-icon>个人中心
				</span>
			</yd-navbar>
		</div>
    <div class="container">
      <ul v-if="showRechargeType">
        <li
          v-for="(item,index) in [...refreshIncomeDatas]"
          v-show="item.show"
          :key="index"
          @click="routerPush($route.params.id==='1'?item.path1:item.path2)"
          @touchstart="color(index,true)"
          @touchend="color(index,false)"
          :class="{'bgcolor':mark===index}"
        >
          <img
            :src="item.img"
            :alt="item.name"
          >
          <div>
            <h3>{{item.name}}</h3>
            <p>{{item.context}}</p>
          </div>
        </li>
      </ul>
      <div v-else>
     <p style="color:#666;text-align:center;font-size: 14px;">--上级暂无转账方式，请联系您的上级--</p>
    </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      incomeDatas: [
        {
          name: "支付宝转账",
          context: "使用支付宝转账",
          img: "../../../../../static/img/recharge/ailpay.png",
          path1: "/transfer/alipayTransfer",
          path2: "/transfer/alipayTransferWithdraw",
          type: "alipayTransfer",
          show:false
        },
        {
          name: "微信加好友转账",
          context: "使用微信转账",
          img: "../../../../../static/img/recharge/wechat.png",
          path1: "/transfer/wechatTransfer",
          path2: "/transfer/wechatTransferWithdraw",
          type: "wechatTransfer",
          show:false
        },
        {
          name: "银行卡转账",
          context: "使用银行卡转账",
          img: "../../../../../static/img/recharge/banks.png",
          path1: "/transfer/bankTransfer",
          path2: "/transfer/bankTransferWithdraw",
          type: "bankTransfer",
          show:false
        }
      ],
      mark: "",
      superInformation:null
    };
  },
  created() {
    this.touchsuper().then((res)=>{
      if(res.code=='0'){
        this.superInformation=res;
      }else if(res.code=='1'){
        this.$dialog.toast({ mes: res.message,callback:()=>{
          this.$router.push('/home')
        } });
      }
    })
  },
  methods: {
    ...mapActions('recharge',['touchsuper']),
    routerPush(path) {
      this.$router.push(path);
    },
    //点击时改变颜色，增加用户体验
    color(index, start) {
      if (start) {
        this.mark = index;
      } else {
        this.mark = undefined;
      }
    }
  },
  computed: {
    refreshIncomeDatas(){
      if(this.superInformation){
              for(let [type,value] of Object.entries(this.superInformation)){
        console.log(type)
        if(type==='aliPay'&&value){
          this.incomeDatas[0].show=true
        }
        if(type==='WX'&&value){
         this.incomeDatas[1].show=true
        }
        if(type==='bank'&&value){
         this.incomeDatas[2].show=true
        }
   
      }
      return this.incomeDatas

      }else{
        return []
      }

    },
    showRechargeType(){
      if(this.refreshIncomeDatas.length!==0){
         let n=0;
      for(let item of this.refreshIncomeDatas){
        if(item.show){
          ++n
        }
      }
      return n==0?false:true
      }else{
        return true
      }
     
    }
  }
};
</script>

<style lang="less" scoped>
#recharge {
  .bgcolor {
    background-color: rgb(223, 222, 222);
  }
  overflow: hidden;
  .container {
    -webkit-overflow-scrolling: touch;
    ul {
      li {
        height: 1.4rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #bfbfbf;
        img {
          width: 1rem;
          height: 1rem;
          display: block;
          margin-left: 0.3rem;
          margin-right: 0.2rem;
        }
        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          h3 {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 0.05rem;
          }
          p {
            font-size: 12px;
            color: #858585;
          }
        }
      }
      li:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
