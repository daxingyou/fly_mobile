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
					<input v-model="username" type="text" placeholder="用户账号">
				</div>
				<div class="login_inp" style="display: flex;position: relative;">
					<i class="fa fa-unlock-alt fa-lg"></i>
					<input v-model="password" :type="pwdType?'password':'text'" placeholder="登录密码">
					<i :class="pwdType?'hide':'show'" @click="setPwdType"></i>
				</div>
				<div class="login_inp">
					<i class="fa fa-unlock-alt fa-lg"></i>
					<input type="number" v-model="validateCode" placeholder="验证码">
					<img :src="validationCode_url" alt="" @click="validationCode" >
				</div>
			</div>
			<div class="login_but">
			<div  @click="login" class="but">登录</div>
			<div >
				<p class="Terms_service" @click="termsService_b()">
					<i :class="service_b == true ? 'service_svite':''"></i>
					记住密码
				</p>
				<p class="Forget_password">
					<!-- <LineDetection></LineDetection> -->
				</p>
			</div>
		</div>
		<LineDetection></LineDetection>
		</div>
		<div class="login_footer">
			<p>
				还没有账号？
				<span @click="$router.push({path:'/register'})">免费注册</span>
			</p>
		</div>
		<div class="login_puzzle" v-if="loginpuzzleShow">
			<div class="login_puzzle_nav">
				<SlidePicture :show_Png="show_Png" :username="user_name" :password="pass_word" ></SlidePicture>
			</div>
			<div class="login_puzzle_div" @click="this.setLoginpuzzleShow(false)"></div>
		</div>
		
	</div>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex";
	// import baseUrl from '../../gobal.js'
	import LineDetection from './lineDetection.vue';
	import SlidePicture from './SlidePicture.vue';
	export default {
		components:{
			LineDetection,
			SlidePicture
		},
		data() {
			return {
				imgHtml: '',
				msg: '登录页',
				validateCode: '',
				validationCode_url: '',
				username: "",
				user_name:'',
				password: "",
				pass_word: "",
				flag: false,
				checked: false,
				showModal: false,
				req: false,
				pwdType: true,
				showImg: false,
				time: '-',
				interval: null,
				service_til:'',
				service_a:false,
				// loginpuzzleShow:false,
				show_Png:true,
			}
		},
		created() {
			console.log(this.loginpuzzleShow)
			this.currentUrl = window.location.origin;
			this.validationCode();
		},
		computed: {
			...mapState('login', [
				'userDetails','loginpuzzleShow'
			]),
			...mapState([
				'isLogin','service_b'
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
				"saveUserDetails",'setLoginpuzzleShow'
			]),
			...mapMutations(['setIsLogin','setService_b']),
				...mapActions("chart",["chartLogin"]),
			setPwdType() {
				this.pwdType = !this.pwdType
			},
			
			goGame() {
				this.touristLogin({
					loginFrom: "3",
				}).then((res) => {
					if (res.code === 0) {
						this.setIsLogin(true);
						this.$router.push({
							name: "allKinds"
						})
						this.cacheGamePlay()
						this.saveUserDetails(res.data);
					}else {
						this.$dialog.toast({
							mes: res.msg,
							timeout: 1000,
							// icon: 'success'
						});
						this.validationCode();
					}
				})
			},
			cacheGamePlay() {
				this.kind().then((res) => {
					res.data.forEach((item1) => {
						item1.kindList.forEach((item2) => {
							this.getGamePlayList(`/${item1.classId}/${item2.kindId}`).then((res2) => {
								sessionStorage.setItem(item2.kindId, JSON.stringify(res2.data.standGameList));
								//  						this.saveStandGameList({standGameList:res2.data.standGameList,kindId:item2.kindId})
							})
						})
					})
				})
			},
			login() {
				var name = this.username;
				var pass = this.password;
				if (this.service_b == true) {
					this.setCookie(name, pass, 30);
				} else if (this.service_b == false) {
					this.setCookie(name, "", 30);
				}
				if (this.username == '') {
					this.$dialog.toast({
						mes: '账号不能为空！',
						timeout: 1500
					});
				} else if (this.password == '') {
					this.$dialog.toast({
						mes: '请输入密码！',
						timeout: 1500
					});
				} else if (this.validateCode == '') {
					this.$dialog.toast({
						mes: '请填写验证码！',
						timeout: 1500
					});
				} else {
					this.memberLogin({
						validationCode: this.validateCode,
						username: this.username,
						password: hex_md5(this.password),
						loginFrom: "3"
					}).then((res) => {
						if (res.code == "0") {
							const params = {
								"type": res.data.type,
								"loginWay": 3
							}
							this.getIp(params)
							this.saveUserDetails(res.data)
							sessionStorage.setItem('password', hex_md5(this.password));
							sessionStorage.setItem('userName',this.username);
							this.setIsLogin(true);
							this.cacheGamePlay()
							this.$router.push({
								name: "allKinds"
							})
							// console.log(this.userDetails.account.toUpperCase(), '333')
						}else if (res.code === 306){
							this.user_name = this.username;
							this.pass_word = this.password;
							this.setLoginpuzzleShow(true) ;
							
						} else {
							this.validateCode = "";
							this.validationCode();
							this.$dialog.toast({
								mes: res.msg,
								timeout: 1500
							});
						}
					})
				}
			},
			//设置cookie
			setCookie(c_name, c_pwd, exdays) {
				var exdate = new Date(); //获取时间
				exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
				//字符串拼接cookie
				window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
				window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
			},
			//读取cookie
			getCookie: function() {
				console.log(1)
				if (document.cookie.length > 0) {
					var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
					for (var i = 0; i < arr.length; i++) {
						var arr2 = arr[i].split('='); //再次切割
						//判断查找相对应的值
						if (arr2[0] == 'userName') {
							this.username = arr2[1]; //保存到保存数据的地方
						} else if (arr2[0] == 'userPwd') {
							this.password = arr2[1];
						}
					}
				}
			},
			//清除cookie
			clearCookie: function() {
				this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
			},
			validationCode() {
				var timestamp = Date.parse(new Date());
				this.validationCode_url = this.global.baseUrl + "/inter/user/validateCode?" + timestamp;
			},
			termsService(){
				var that = this;
				if(that.service_a==true){
					that.service_a=false;
					that.service_til = '您还未接受服务条款'
				}else{
					that.service_a=true;
					that.service_til = ''
				}
			},
			termsService_b(){
				var that = this;
				if(that.service_b==true){
					that.getCookie()
					that.setService_b(false);
				}else{
					that.setService_b(true);
				}
			},
		},
		mounted() {
			this.getCookie();
			if (this.password != "") {
				that.setService_b(true);
			}
		},
		watch:{
			// checked(){
			// 	if(this.service_b  == true){
			// 		this.getCookie();
			// 	}else if(this.service_b == false ){
			// 		this.clearCookie()
			// 	}
			// }
		}
	}
</script>

<style>
	.login {
		height: 100%;
		width: 100%;
		/* background: url("../../../static/img/login/login_bg@2x.png") no-repeat; */
		background-size: cover;
		box-sizing: border-box;
		/* color: #c5cad0; */
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
		box-sizing: border-box;
		padding: 0.5rem 0.23rem;
		font-size: 0.3rem;
	}
	.login_nav .login_inp {
		height: 0.9rem;
		width: 100%;
		border: 1px solid #d9d9d9;
		box-sizing: border-box;
		padding: 0.25rem 0;
		margin-bottom: 0.5rem;
		border-radius: 2px;
	}
	.login .hide {
		position: absolute;
		right: 0;
		width: 24px;
		height: 20px;
		background: url("../../../static/img/icon-eye.png");
		background-size: 100% 100%;
		margin-right: 0.2rem;
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
		font-size: 0.3rem;
		text-align: left;
	}
	.login_nav div {
		height: 0.8rem;
		width: 100%;
		border-bottom: 1px solid #c5cad0;
		box-sizing: border-box;
		/* padding: 0.175rem 0; */
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
		width: 60%;
		border: 0;
		color: #333;
		padding-left: 0.2rem;
	}
	.login_nav div input::-webkit-input-placeholder{
		color: #c5cad0 !important;
	}
	.login_nav div img {
		float: left;
		width: 25%;
		height: 0.6rem;
    	margin-top: -0.15rem;
	}
	.login_but {
		overflow: hidden;
		font-size: 0.3125rem;
	}
	.login_but div {
		height: 0.85rem;
		/* width: 100%; */
		text-align: center;
		line-height: 0.85rem;
	}
	.login_but .but{
		height: 1rem;
		line-height: 1rem;
		color: #fff;
    	background: #387ee8;
		font-size: 0.3rem;
		margin-bottom: 0.5rem;
		border-radius: 3px;
		
	}
	.login_but div:nth-child(3) {
		font-size: 0.1285rem;
		font-size: 0.25rem;
	}
	.Forget_password {
		float: right !important;
		font-size: 0.28rem;
		/* color: #387ee8; */
		width: 75%;
		position: relative;
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
	.icon-ie {
		background: url("../../../static/img/ie_ico.png") no-repeat;
		background-size: 100% 100%;
		display: inline-block;
		margin-right: 0.1rem;
		width: 0.4rem;
		height: 0.4rem;
	}
	.service_til{
		font-size: 0.25rem;
		color: #ff5c57;
		height: 0.4rem;
		margin: 0.2rem 0;
	}
	.Terms_service{
		float: left;
		font-size: 0.28rem;
		width: 25%;
	}
	.service_svite{
		border: 0 !important;
		background: url("../../../static/img/login_gou.png") no-repeat;
		background-size: 100% 100%;
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
		font-size: 0.28rem;
	}
	.login_footer span{
		color: #387ee8;
	}
	.login_puzzle{
		position: absolute;
		left: 0;
		top: 7.5%;
		z-index: 1;
		width: 100%;
		height: 92.5%;
		background-color: rgba(255,255,255,0.8);
	}
	.login_puzzle_nav{
		width: 260px;
		box-sizing: border-box;
		margin: 0 auto;
		height: 50px;
		margin: 4.7rem auto 0;
		z-index: 3;
	}
	.login_puzzle_div{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		/* background-color: #ff5c57; */
		z-index: 2;
	}

</style>