<template>
  <div class="register">
    <div class="register_logo">
      注册
    </div>
    <div class="register_center">
       <div class="register_nav">
        <div cl>
          <i class="fa fa-user-circle fa-lg"></i>
          <input type="text" v-model="userName"  id="user" placeholder="账号">
        </div>
        <div style="display: flex;position: relative;">
          <i class="fa fa-unlock-alt fa-lg"></i>
          <input :type="pwdType?'password':'text'" v-model="Password" id="passI" placeholder="密码">
          <i :class="pwdType?'hide':'show'" @click="setPwdType"></i>
        </div>
        <div style="display: flex;position: relative;">
          <i class="fa fa-lock fa-lg"></i>
          <input :type="pwdType2?'password':'text'" v-model="pass_word" id="passII" placeholder="确认密码">
          <i :class="pwdType2?'hide':'show'" @click="setPwdType2"></i>
        </div>
        <div>
          <i class="fa fa-unlock-alt fa-lg"></i>
          <input type="number" v-model="zc_code" placeholder="邀请码">
          <!-- <img src="" alt=""> -->
        </div> 
        <div>
          <i class="fa fa-lock fa-lg"></i>
          <input type="number" v-model="validateCode" placeholder="验证码">
          <img :src="validationCode_url" alt="" @click="validationCode" >
        </div>
      </div>
      <div class="register_but">
        <!-- <yd-button size="large" type="primary"   >注册</yd-button> -->
        <div  @click='_register' class="but">注册</div>
      </div>
    </div>
    <div class="register_footer">
      <p>
				已有账号!
				<span @click="$router.push({path:'/login'})">去登陆</span>
			</p>
    </div>
   
    <yd-popup v-model="show1" position="center" width="80%" border-radius="0.1rem" >
      <div style="background-color:#fff;padding: 0.5rem 0">
        <img src="../../../static/img/login/region_ok_03.png" alt="" style="width: 100%;margin: 0 auto">
        <div style="height: 0.8rem;line-height: 0.8rem;color: #d22340;font-size: 0.4rem">恭喜您，注册成功！</div>
        <div style="height: 0.8rem;line-height: 0.8rem;color: #313131;font-size: 0.3rem;margin-bottom: 0.5rem"><span style="color: #d22340;">{{countDown}}</span>秒后页面跳转</div>
        <p style="text-align: center; height: 0.8rem;">
          <router-link to="/allKinds">
            <yd-button style="width: 80%; height: 0.8rem;color: #ffffff;font-size: 0.3rem" type="danger" @click.native="show1 = false">登录</yd-button>
          </router-link>
        </p>
      </div>
    </yd-popup>


    <yd-popup v-model="show2" position="center" width="75%"  :close-on-masker=false>

            <yd-cell-group>
              <div class="modelII_header">请先填写真实姓名和手机号码</div>
                <yd-cell-item>
                    <span slot="left">真实姓名：</span>
                    <input slot="right" v-model="true_name" type="text"  placeholder="name">
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">手机号码：</span>
                     <input slot="right" v-model="register_phone" type="number" placeholder="phone">
                </yd-cell-item>
                <yd-button type="disabled"   @click.native="goLogin" >取消</yd-button>
                <yd-button @click.native="show2 = false">确定</yd-button>
            </yd-cell-group>
      </yd-popup>
              
            
           
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    data(){
      return{
        msg: '注册页',
        show1: false,
        show2: false,
        pwdType:true,
        pwdType2:true,
        countDown: 5,
        userName: '',
        className: '',
        Password: '',
        pass_word: '',
        true_name:'',
        register_phone:'',
        rescode:'',
        zc_code:'',
        validateCode:"",
        validationCode_url:"",
        urlId:"",
      }
    },
    created(){
      this.validationCode();
    },
    computed: {
			...mapState([
				'isLogin'
			])
		},
    methods:{
      ...mapActions('register',[
        'registerMember',
        'queryRegister'
      ]),
      ...mapActions('login', [
				"getUserDetails",
			]),
      ...mapMutations('register',[
        'registerMemberList'
      ]),
      ...mapMutations(['setIsLogin']),
      setPwdType(){
				this.pwdType = !this.pwdType
			},
			setPwdType2(){
				this.pwdType2 = !this.pwdType2;
			},
      _register(){
        let that = this;
        let data;
        // 会员账号正则
        let reg=/^[a-zA-Z][a-zA-Z0-9_]{5,8}$/;
        // 会员密码正则
        let pass=/(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
        // 姓名验证
        let regNmae = /^[\u4E00-\u9FA5A-Za-z]+$/;
        // 号码验证
        let regPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        let hrefID = window.location.href;
        // let urlId;
        let urlId = hrefID.substring(hrefID.indexOf("register")+9,hrefID.length);
        if(urlId == "" || urlId == null || urlId == undefined ){
          urlId="ff80808162232b920162327de2270133";
        }
        console.log(urlId)
        if(that.userName == ''){
          this.$dialog.alert({mes: "账号不能为空,且必须包括数字和字母，长度在6-9位之间！"});
          that.userName = '';
          document.getElementById('user').focus()
        }else if(!reg.test(that.userName)){
          this.$dialog.alert({mes: "您输入的格式不正确，账号必须包含数字和字母，长度在5-8位之间！"});
          that.userName = '';
          document.getElementById('user').focus()
        }else if(that.Password == ''){
          this.$dialog.alert({mes: "密码不能为空，且必须为6-20位，至少包含数字和字母！"});
          that.Password = '';
          document.getElementById('passI').focus()
        }else if(!pass.test(that.Password)){
          this.$dialog.alert({mes: "您输入的密码格式不正确，密码长度为6-20位，且必须包含数字和字母！"});
          that.Password = ''
          document.getElementById('passI').focus()
        }else if(that.pass_word != that.Password){
          this.$dialog.alert({mes: "您两次输入的密码不一致，请重新输入！"});
          that.Password = '';
          that.pass_word = '';
          document.getElementById('passI').focus()
        }else if(that.urlId == ''&& that.zc_code == ''){
          this.$dialog.alert({mes: "请输入邀请码！"});
        }else if(that.validateCode == ''){
          this.$dialog.alert({mes: "请输入验证码！"});
        }
        else{
          data= {
              memberAccount: that.userName, // 会员账号
              // memberName: that.className, // 昵称
              password: hex_md5(that.Password), // 密码
              promoteId: that.urlId ,// 链接id
              way:'3', //
              invitationCode:that.zc_code, // 注册码
              verificationCode:that.validateCode
            }
          this.registerMember(data).then( res => {
            if( res.code == 0){
              that.show1 = true;
              sessionStorage.setItem('password', hex_md5(that.Password));
              this.setIsLogin(true);
              this.getUserDetails();
              that.count_down()
            }else if(res.code != 0){
              this.$dialog.alert({mes: res.msg});
              that.validationCode();
            }
          })
        }

      },
      count_down(){
        let that = this;
        that.countDown = 5;
        setInterval(function () {
          that.countDown -= 1;
          if( that.countDown === 0){
            that.show1 = false;
            that.$router.push({name: 'allKinds'})
          }
        }, 1000);
      },
      goLogin(){
        let that = this;
        that.$router.push({
						path: '/login'
					})
      },
      // 验证码
      validationCode() {
				let timestamp = Date.parse(new Date());
				this.validationCode_url = this.global.baseUrl + "/inter/user/validateCode?" + timestamp;
			}
    },
    watch:{
      
    }
  }
</script>

<style>
  .register{
    height: 100%;
    width: 100%;
    background-size: cover;
    box-sizing: border-box;
    position: fixed;
    top:0;
    left: 0;
    bottom:0;
    right: 0;
    text-align: center;
  }
  .register_logo{
    height: 7.5%;
    border-bottom: 1px solid #c5cad0;
    line-height: 1rem;
    font-size: 0.35rem;
  }
  .register_nav{
    color: #d9d9d9;
    font-size: 0.3rem;
    text-align: left;
  }
  .register_center{
    width: 100%;
		box-sizing: border-box;
		padding: 0.5rem 0.3rem;
		font-size: 0.28rem;
  }
  .register_nav div{
    height: 0.9rem;
    width: 100%;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    padding: 0.25rem 0;
    border-radius: 3px;
    margin-bottom: 0.25rem;
  }
  .register_nav div .fa{
    float: left;
		width: 12%;
		padding: 0 0.25rem;
		padding-top: 0.05rem;
  }
  .register_nav div input{
    float: left;
    width: 60%;
    border: 0;
    color: #333;
    padding-left: 0.2rem;
  }
  .register_nav div input::-webkit-input-placeholder{
		color: #c5cad0 !important;
	}
  .register_nav div img{
    float: left;
    width: 25%;
    height: 0.6rem;
    margin-top: -0.15rem;
  }
  .register_but{
    
    overflow: hidden;
    padding: 0.25rem 0;
    color: #000;
    font-size: 0.3125rem;
  }
  .register_but .but{
    color: #fff;
    background: #387ee8;
		font-size: 0.3rem;
    height: 1rem;
		text-align: center;
		line-height: 1rem;
    border-radius: 3px;
  }
  .register_but div:nth-child(1){
    background: #387ee8;
  }
  .register_but div:nth-child(3){
    font-size: 0.2rem;
  }
  .Forget_password{
    float: left;
    font-size: 0.3rem;
  }
  .new_register{
    float: right;
    font-size: 0.3rem;
  }
  .register_boot{
    width: 8rem;
    position: absolute;
    left: 50%;
    top:11.5rem;
    /* bottom:0.6875rem; */
    margin-left: -4rem;
    font-size: 0.24rem;
  }
  .register_boot p{
    text-align: center;
    width: 100%;
    margin: 0 auto;
  }
  .register .yd-popup-center.yd-popup-show * {
    border-radius: 0.08rem;
  }
  .register .yd-btn-block{
    height: 0.85rem;
  }
  .modelII_header{
    height: 0.7rem;
    font-size: 0.35rem;
    line-height: 0.7rem;
    color: #ffffff;
    background-color: #cccccc;
  }
  .register .hide{
		position: absolute;
		right: 0;
		width: 24px;
		height: 20px;
		background:url("../../../static/img/icon-eye.png") ;
		background-size:100% 100% ;
    margin-right: 0.2rem;
	}
	.register .show{
		position: absolute;
		right: 0;
		width: 24px;
		height: 20px;
		background:url("../../../static/img/icon-eyes.png") ;
		background-size:100% 100% ;
    margin-right: 0.2rem;
	}
  .register_footer{
		width: auto;
		height: 0.5rem;
		margin-top: 0.5rem;
		border-top: 1px solid #e6e6e6;
		text-align: center;
	}
  .register_footer p{
		position: relative;
		top: -0.2rem;
		display: inline-block;
		padding: 0 0.2rem;
		line-height: 0.4rem;
		background: #fff;
		font-size: 0.28rem;
	}
	.register_footer span{
		color: #387ee8;
	}
</style>
