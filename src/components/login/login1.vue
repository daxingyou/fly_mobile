<template>
	<div class="login">
		
		<div class="login_logo" >
			<!--<img src="" alt="">-->
		</div>
		
		<div class="login_nav">
			<div>
				<span>账号</span>
				<input v-model="username" type="text">
			</div>
			<div style="display: flex;position: relative;">
				<span>密码</span>
				<input v-model="password" :type="pwdType?'password':'text'">
				<i :class="pwdType?'hide':'show'" @click="setPwdType"></i>
			</div>
			<div>
				<span>验证码</span>
				<input type="number" v-model="validateCode">
				<img :src="validationCode_url" alt="" @click="validationCode">
			</div>
			<div>
				<span>记住密码</span><input type="checkbox" :checked="flag" v-model="checked" style="width:16px;height: 16px;margin-left: 0.1rem;" @click="remberPass" />
			</div>
		</div>
		<LineDetection></LineDetection>
		
		<div class="login_but">
			<div @click="login">登录</div>
			<div></div>
			<!-- <div @click="goGame">试玩</div> -->
			<div>
				<span class="Forget_password">忘记密码？</span>
				<!-- <span class="new_register">新用户注册</span> -->
				<router-link to="/register" tag="span" class="new_register">新用户注册</router-link>
			</div>
		</div>
		<!--<div class="login_boot">
			<p>--娱乐上线系统2.0 &copy;版权所有</p>
			<p>友情请示:理性购彩,热心公益,未满18周岁禁止购彩及兑奖</p>
		</div>-->
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
	export default {
		components:{
			LineDetection
		},
		data() {
			return {
				imgHtml: '',
				msg: '登录页',
				validateCode: '',
				validationCode_url: '',
				username: "",
				password: "",
				flag: false,
				checked: false,
				showModal: false,
				req: false,
				pwdType: true,
				showImg: false,
				time: '-',
				interval: null,
			}
		},
		created() {
			this.currentUrl = window.location.origin;
			this.validationCode();
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
					} else {
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
				let name = this.username;
				let pass = this.password;
				if (this.checked == true) {
					this.setCookie(name, pass, 30);
				} else if (this.checked == false) {
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
							this.setIsLogin(true);
							this.cacheGamePlay()
							this.$router.push({
								name: "allKinds"
							})
							// console.log(this.userDetails.account.toUpperCase(), '333')
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
			remberPass() {
				this.checked != this.checked;
				if (this.checked == true) {
					this.getCookie();
				}
			},
			validationCode() {
				let timestamp = Date.parse(new Date());
				this.validationCode_url = this.global.baseUrl + "/inter/user/validateCode?" + timestamp;
			}
		},
		mounted() {
			this.getCookie();
			if (this.password != "") {
				this.checked = true;
			}
		},
		watch: {}
		// watch:{
		// 	checked(){
		// 		if(this.checked  == true){
		// 			this.getCookie();
		// 		}else if(this.checked == false ){
		// 			this.clearCookie()
		// 		}
		// 	}
		// }
	}
</script>

<style>
	.login {
		height: 100%;
		min-height: 12.34rem;
		width: 100%;
		background: url("../../../static/img/login/login_bg@2x.png") no-repeat;
		background-size: cover;
		box-sizing: border-box;
		padding: 0.6875rem;
		color: #c5cad0;
		position: relative;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.login_logo {
		width: 2.6rem;
		height: 1.8rem;
		/* margin: 0 0 0.4rem 0; */
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
	.login_nav div {
		height: 1rem;
		width: 100%;
		border-bottom: 1px solid #c5cad0;
		box-sizing: border-box;
		padding: 0.25rem 0;
	}
	.login_nav div:nth-child(4) {
		border: 0;
		font-size: 0.28rem;
	}
	.login_nav div:nth-child(4) span {
		border: 0;
		line-height: 1;
	}
	.login_nav div span {
		float: left;
		width: 20%;
	}
	.login_nav div input {
		float: left;
		width: 50%;
		border: 0;
		color: #ffffff;
	}
	.login_nav div img {
		float: left;
		width: 25%;
		height: 0.5rem
	}
	.login_but {
		overflow: hidden;
		padding: 0.5rem 0;
		color: #feffff;
		font-size: 0.3125rem;
	}
	.login_but div {
		height: 0.85rem;
		width: 100%;
		text-align: center;
		line-height: 0.85rem;
	}
	.login_but div:nth-child(1) {
		background: #d91d36;
		font-size: 0.25rem;
	}
	.login_but div:nth-child(3) {
		font-size: 0.1285rem;
		font-size: 0.25rem;
	}
	.Forget_password {
		float: left;
		font-size: 0.3rem;
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
	.icon-ie {
		background: url("../../../static/img/ie_ico.png") no-repeat;
		background-size: 100% 100%;
		display: inline-block;
		margin-right: 0.1rem;
		width: 0.4rem;
		height: 0.4rem;
	}
</style>