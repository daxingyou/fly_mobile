<template>
	<div class="login">
		
		<div class="login_logo" >
			<span @click="$router.push({path:'/allkinds'})">
				<i class="fa fa-chevron-left fa-lg"></i></span>
			登录
		</div>
		<div class="login_center">
			<div class="login_nav">
			<div class="login_inp">
				<i class="fa fa-user-circle fa-lg"></i>
				<input v-model="username" type="text" placeholder="全民代理账号">
			</div>
			<div class="login_inp" style="display: flex;position: relative;">
				<i class="fa fa-unlock-alt fa-lg"></i>
				<input v-model="password"  placeholder="登录密码">
				<i></i>
			</div>
			<div class="login_puzzle">
				<SlidePicture :message="show_png"></SlidePicture>
			</div>
			
			<p class="service_til">{{service_til}}</p>
		</div>
		
		<div class="login_but">
			<div>登录</div>
			<div >
				<span class="Terms_service" @click="termsService()"> 
					<i :class="service_a==true?'service_svite':''"></i>
					同意并遵守
					<span>《服务条款》</span>
				</span>
				<span class="Forget_password">忘记密码？</span>
			</div>
			<p>
				<span class="Terms_service" @click="termsService_b()">
					<i :class="service_b==true?'service_svite':''"></i>
					15天免费登录
				</span>
			</p>
		</div>
		</div>
		<div class="login_footer">
			<p>
				还没有账号？
				<span @click="$router.push({path:'/register'})">免费登录</span>
			</p>
		</div>
		
		
	</div>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex";
	import SlidePicture from './SlidePicture.vue';
	export default {
		components:{
			SlidePicture
		},
		data() {
			return {
				service_a:false,
				service_b:true,
				username:"",
				password:"",
				service_til:'您还未接受服务条款',
				show_png:false,
			}
		},
		created() {
			
		},
		computed: {
			...mapState('login', [
				'userDetails',
			]),
			...mapState([
				'isLogin'
			])
		},
		methods: {
			...mapActions("bet", ["getGamePlayList"]),
			...mapActions('home', [
				'kind'
			]),
			...mapActions('login', [
				"touristLogin",
				"memberLogin",
				"m52Login",
				"getIp"
			]),
			...mapMutations('login', [
				"saveUserDetails"
			]),
			...mapMutations(['setIsLogin']),
				...mapActions("chart",["chartLogin"]),
			termsService(){
				let that = this;
				if(that.service_a==true){
					that.service_a=false;
					that.service_til = '您还未接受服务条款'
				}else{
					that.service_a=true;
					that.service_til = ''
				}
			},
			termsService_b(){
				let that = this;
				if(that.service_b==true){
					that.service_b=false;
				}else{
					that.service_b=true;
				}
			}
			
		},
		mounted() {

		},
		watch: {

		}
		
	}
</script>

<style>
	.login {
		height: 100%;
		width: 100%;
		background-size: cover;
		box-sizing: border-box;
		position: relative;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.login_logo {
		width: 100%;
		height: 7.5%;
		text-align: center;
		border-bottom: 1px solid #ccc;
		line-height: 1rem;
		font-size: 0.35rem;
		color: #000;
		position: relative;
	}
	.login_logo span{
		display: inline-block;
		position: absolute;
		left: 0.2rem;
		top: 0;
		height: 100%;
		line-height: 1rem;
		font-size: 0.3rem;
	}
	.login_center{
		width: 100%;
		/* height: 60%; */
		box-sizing: border-box;
		padding: 0.5rem;
		font-size: 0.3rem;
	}
	.login .hide {
		position: absolute;
		right: 0;
		width: 24px;
		height: 20px;
		background: url("../../../static/img/icon-eye.png");
		background-size: 100% 100%;
	}
	.login .show {
		position: absolute;
		right: 0;
		width: 24px;
		height: 20px;
		background: url("../../../static/img/icon-eyes.png");
		background-size: 100% 100%;
		margin-right: 0.2rem;
	}
	.login .speed {
		width: 2rem;
	}
	.login_logo img {
		float: left;
		width: 2.6rem;
		height: 0.8rem;
		/*height: 1.5rem;*/
		/*margin-left: -0.2rem;*/
	}
	.login .modal {
		width: 7rem;
		height: auto;
		margin: auto;
		max-width: 600px;
		display: inline-block;
		text-align: left;
		vertical-align: middle;
		background: #fff;
		padding: 8px;
		border-radius: 5px;
	}
	.login .modal .url_item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		line-height: 30px;
		margin-top: 8px;
		font-size: 14px;
		border: 1px solid #d7d7d7;
		border-radius: 3px;
		padding: 0 8px;
	}
	.login .modal .modal_footer {
		font-size: 14px;
		display: flex;
		padding-top: 0.2rem;
		justify-content: space-between;
	}
	.login .modal .modal_footer .restart {
		display: block;
		padding: 0.1rem 0.2rem;
		color: #2061b3;
		border-radius: 3px;
		border: 1px solid #2061b3;
	}
	.login .modal .modal_footer .confirm {
		display: block;
		padding: 0.1rem 0.2rem;
		background: #2061b3;
		color: #fff;
		border: 1px solid #2061b3;
		border-radius: 3px;
		text-decoration: none;
	}
	.login .modal .modal_main {}
	
	.login_nav {
		color: #c5cad0;
		font-size: 0.35rem;
		text-align: left;
	}
	.login_nav .login_inp {
		height: 1rem;
		width: 100%;
		border: 1px solid #c5cad0;
		box-sizing: border-box;
		padding: 0.25rem 0;
		margin-bottom: 0.6rem;
		border-radius: 2px;
	}
	.login_puzzle{
		height: 0.8rem !important;
		text-align: center;
		line-height: 0.8rem !important;
		color: #000;
		padding: 0 !important;
		font-size: 0.28rem;
	}
	.login_nav div:nth-child(4) {
		border: 0;
		font-size: 0.28rem;
	}
	.login_nav div:nth-child(4) span {
		border: 0;
		line-height: 1;
	}
	.login_nav div .fa {
		float: left;
		width: 12%;
		padding: 0 0.25rem;
		padding-top: 0.05rem;
	}
	.login_nav div input {
		float: left;
		width: 50%;
		border: 0;
		color: #000;
		padding-left: 0.2rem;
	}
	.login_nav div img {
		float: left;
		width: 25%;
		height: 0.5rem
	}
	.login_but {
		overflow: hidden;
		font-size: 0.3125rem;
	}
	.login_but div {
		height: 0.85rem;
		width: 100%;
		text-align: center;
		line-height: 0.85rem;
	}
	.login_but div:nth-child(1) {
		color: #fff;
    	background: #387ee8;
		font-size: 0.25rem;
	}
	.login_but div:nth-child(3) {
		font-size: 0.1285rem;
		font-size: 0.25rem;
	}
	.Forget_password {
		float: right;
		font-size: 0.3rem;
		color: #387ee8;
	}
	.Terms_service{
		float: left;
		font-size: 0.3rem;
	}
	.service_svite{
		border: 0 !important;
		background: url("../../../static/img/login_gou.png") no-repeat;
		background-size: 100% 100%;
	}
	.service_til{
		font-size: 0.25rem;
		color: #ff5c57;
		height: 0.4rem;
		margin: 0.4rem 0;
	}
	.Terms_service span{
		color: #387ee8;
	}
	.Terms_service i{
		display: inline-block;
		width: 0.25rem;
		height: 0.25rem;
		border: 1px solid #000;
		border-radius: 2px;
		font-size: 0.25rem !important;
		color: #fff !important;
	}
	.new_register {
		float: right;
		font-size: 0.3rem;
	}
	.login_boot {
		width: 8rem;
		position: fixed;
		left: 50%;
		top: 11.5rem;
		/* bottom: 0.2rem; */
		margin-left: -4rem;
		font-size: 0.15rem;
		font-size: 0.24rem;
	}
	.login_boot p {
		text-align: center;
		width: 100%;
		margin: 0 auto;
	}
	.login_footer{
		width: auto;
		height: 0.5rem;
		margin-top: 0.8rem;
		border-top: 1px solid #e6e6e6;
		text-align: center;
	}
	.login_footer p{
		position: relative;
		top: -0.2rem;
		display: inline-block;
		padding: 0 0.2rem;
		line-height: 0.4rem;
		background: #fff;
		font-size: 0.3rem;
	}
	.login_footer span{
		color: #387ee8;
	}
</style>