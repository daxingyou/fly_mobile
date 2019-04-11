<template>
    <div class="assistant">
		<div :class="assis_tant?'overlay show':'overlay hide'" @click.stop="closeAside"></div>
        <div class="popover-menu"  >
				<ul class="rightPopup" style="">
					<li class="first_li" @click="myBet('')"><img src="../../../../static/img/yonghu.png" class="icon" /><span>{{userDetails.type=='0'?userDetails.account:'游客'}}</span></li>
					<!--<li  @click="myBet('/redPacket')"><img src="../../../../static/img/img_dating.png" class="icon" />大厅</li>-->
					<li @click="myBet('/information')"><img src="../../../../static/img/img_pig.png" class="icon" /><span style="color: #d81d38;">{{userDetails.accountBalance}}</span></li>
					<li v-if="userDetails.type=='0'" @click="myBet('/recharge/1')"><img src="../../../../static/img/chongzhi.png" class="icon" />充值</li>
					<li v-if="userDetails.type=='0'" @click="withdraw"><img src="../../../../static/img/tixian.png" class="icon" />提现</li>
					<!--<li v-if="userDetails.type=='0'" @click="myBet('/loginLog')"><img src="../../../../static/img/img_loginLog.png" class="icon" />登入记录</li>-->
					<li  @click="myBet('/noterecord')"><img src="../../../../static/img/img_noterecord.png" class="icon" />投注记录</li>
					<!--<li  @click="myBet('/personalReport')"><img src="../../../../static/img/img_report.png" class="icon" />个人报表</li>-->
					<li  @click="myBet('/award')"><img src="../../../../static/img/img_award.png" class="icon" />开奖历史</li>
					<!--<li  v-if="userDetails.type=='0'" @click="myBet('/lotteryReport')"><img src="../../../../static/img/img_lotteryReport.png" class="icon" />代理表报</li>-->
                    <!--<li  v-if="userDetails.type=='0'" @click="myBet('/accountBill')"><img src="../../../../static/img/img_accountBill.png" class="icon" />存取记录</li>-->
                    <!--<li  v-if="userDetails.type=='0'" @click="myBet('/cashflow')"><img src="../../../../static/img/img_cashflow.png" class="icon" />账变记录</li>-->
                    <!--<li  v-if="userDetails.hierarchy!='0'" @click="myBet('/referralLink')"><img src="../../../../static/img/img_referralLink.png" class="icon" />推广链接</li>-->
                    <!--<li  v-if="userDetails.hierarchy!='0'" @click="myBet('/changeRebate')"><img src="../../../../static/img/img_changeRebate.png" class="icon" />赚水设置</li>-->
					<!--<li  v-if="userDetails.type=='0'" @click="myBet('/security?id=0')"><img src="../../../../static/img/img_security.png" class="icon" />安全中心</li>-->
					<li  @click="myBet('/help')"><img src="../../../../static/img/img_help.png" class="icon" />帮助中心</li>
				</ul>
			</div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    data(){
        return{
			types:'',  
        }
	},
	props:["assis_tant"],
	created(){
		// console.log(this.userDetails)
	},
    computed: {
			...mapState("bet", ["subGameId", "gameName", "rightName", "leftName", "gameId", "standGameLists", "selectModel"]),
			...mapState('home', [
				'kindList'
			]),
			...mapState('login', [
				'userDetails'
			]),
			...mapState(["isLogin"]),
		},
    methods:{
        myBet(names) {
			if(this.isLogin == false){
				this.$dialog.toast({
						mes: '未登录！',
						timeout: 1500
					})
			}else if(this.userDetails.hierarchy == '1' && (names == '/recharge/1'||names == '/recharge/2' )){
				this.$dialog.toast({
						mes: '顶级会员返回原网站充值提现操作！',
						timeout: 1500
					})
			}else if(names != ''){
				this.$router.push({
					path: names
				})
			}		
		},
		withdraw(){
				if (this.userDetails.hierarchy == '1') {
					this.$dialog.toast({
						mes: '请返回原网址进行额度转换！',
						timeout: 1500
					})
				}else if (this.userDetails.type == '1') {
					this.$dialog.toast({
						mes: '会员登录畅玩更多！',
						timeout: 1500
					})
				}else {
					this.$router.push({path:'/withdraw'})
				}
			},
		closeAside(){
			this.$emit("close")
		}
    }
}
</script>
<style lang="less">
    .assistant{
    	
        .popover-menu {
			position: absolute;
			z-index: 9998;
			background: #ffffff;
			top: 0;
			right: 0;
			width: 3rem;
			height: auto;
			box-shadow: 1px 1px 7px 2px #aaa;
			.first_li {
				font-size: 12px;
				padding: 0.2rem 0.2rem;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 1px solid #acacac;
				.icon {
					margin-right: 0.1rem;
				}
			}
			li {
				font-size: 12px;
				padding: 0.1rem;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #acacac;
				.icon {
					width: 0.5rem;
					margin-right: 0.1rem;
				}
			}
		}

		.overlay.hide {
			opacity: 0;
			visibility: hidden;
		}
		.overlay.show {
			visibility: visible;
		}
		.overlay.show {
			opacity: 1;
		}
		.overlay {
			position: fixed;
			background-color: rgba(55, 55, 55, .3);
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
			-webkit-transition: all .2s ease-in-out;
			-o-transition: all .2s ease-in-out;
			transition: all .2s ease-in-out;
			cursor: pointer;
		}
		.overlay {
			height: 100%;
			top: 0px;
			z-index: 10;
		}
    }
</style>


