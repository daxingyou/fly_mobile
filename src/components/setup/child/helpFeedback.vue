<template>
	<div class="helpFeedback">
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
        <div style="text-align: center;margin: 10px 0;overflow: hidden;">
          <button class="memberModify_but gb" @click="show1 = false">关闭</button>
        </div>
      </div>
    </yd-popup>
		<yd-navbar title="帮助与反馈">
			<!-- <router-link to="/setup" slot="left"> -->
			<yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
			<!-- <yd-navbar-back-icon></yd-navbar-back-icon> -->
			<!-- </router-link> -->
		</yd-navbar>
		<div class="helpFeedback_nav">
			<yd-cell-group title="">
				<yd-cell-item>
					<yd-textarea v-model="text" slot="right" placeholder="请输入您宝贵的意见" maxlength="1000"></yd-textarea>
				</yd-cell-item>
			</yd-cell-group>
			<yd-cell-item>
        <span slot="left">手机号码：</span>
        <yd-input slot="right" v-model="input4" regex="mobile" placeholder="请输入您的联系电话"></yd-input>
      </yd-cell-item>

      <yd-cell-item>
        <span slot="left">联系邮箱：</span>
        <yd-input slot="right" v-model="input3" :debug="true" regex="email" placeholder="请输入您的联系邮箱"></yd-input>
      </yd-cell-item>

			<yd-cell-item>
				<span slot="left">上传图片：</span>
				<input type="file" accept="image/*"  class="profileinfopanel-upload" slot="right" />
			</yd-cell-item>
			<yd-button size="large" type="danger" @click.native="_feedback">提交</yd-button>
			<yd-button size="large" type="danger" @click.native="_touchsuper">联系上级</yd-button>
			<!-- <div class="Customer">
				<div @click="Service()">
					<img src="../../../../static/img/kefu.png" alt="">
					<span> 24小时在线客服</span>
				</div>
				<a ref="helpService_fl" :href=url target="_blank" style="display: none"></a>
			</div> -->
			<!-- <input type="text" x-webkit-speech onwebkitspeechchange=""/>
      <input type="text" x-webkit-speech x-webkit-grammar="builtin:translate"> -->
		</div>

	</div>
</template>
<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	// 复制到剪切板插件
  import Clipboard from "clipboard/dist/clipboard.js";
  let clipboard = new Clipboard(".btn");
	export default {
		data() {
			return {
				msg: '帮助与反馈',
				input4: "",
				input3: "",
				text: "",
				url: '',
				imgSrc: '',
				show1:false,
				wechat:'',
				QQ:'',
				superAccount:'',
				phone:'',
//				aliPay:'',
			}
		},
		created() {
			this._helpService()
		},
		methods: {
			...mapActions("personal", ["touchsuper"]),
			...mapActions('home', ['feedback', 'helpService']),
			 // 联系上级
      _touchsuper() {
        this.touchsuper().then(res => {
          if (res.code == 0) {
          	this.show1 = true;
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
			_feedback() {
				let that = this;
				if(this.text == '') {
					that.$dialog.toast({
						mes: '您没有填写反馈内容！',
						timeout: 1500,
						icon: 'error'
					});
				}
				//      else if(this.input4 == ''){
				//        that.$dialog.toast({
				//						mes:'请填写您的电话号码！',
				//						timeout: 1500,
				//						icon: 'error'
				//              });
				//      }else if(this.input3 == ''){
				//        that.$dialog.toast({
				//						mes:'请填写您的电子邮箱！',
				//						timeout: 1500,
				//						icon: 'error'
				//              });
				//      }
				else {
//					var instance = this.$http.create({
//						baseURL: this.global.baseUrl,
//					});
        let input = document.querySelector('.profileinfopanel-upload')
				let data = new FormData();
				data.append('file', input.files[0]);
				data.append('content', this.text);
				data.append('mobile', this.input4);
				data.append('email', this.input3);
				this.imgSrc = data
					this.$http.defaults.headers.post['Content-Type'] = 'multipart/form-data';
//					instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
					this.$http({
						method: 'post',
						url: this.global.baseUrl+"/inter/user/feedback",
						data:this.imgSrc,
					}).then((res)=>{
						if(res.data.code==0){
							that.text = "";
							input.value = "";
							that.$dialog.toast({
													mes: res.data.msg,
													timeout: 1500,
													icon: 'success'
												});
						}else{
							that.$dialog.toast({
													mes: res.data.msg,
													timeout: 1500,
													icon: 'error'
												});
						}
					});
					//					this.$http.post(
					//						,
					//						this.imgSrc,
					//						{
					//							headers: {
					//									'Content-Type': 'multipart/form-data'
					//								}
					//							}
					//					).then(res => {
					//							console.log(res)
					//					}).catch(error => {});

					//					this.feedback({
					//						'content': this.text,
					//						"MultipartFile": this.imgSrc,
					//						//          'mobile':this.input4,
					//						//          'email':this.input3,
					//					}).then(res => {
					//						if(res.code == 0) {
					//							that.$dialog.toast({
					//								mes: res.msg,
					//								timeout: 1500,
					//								icon: 'success'
					//							});
					//						}
					//					})
				}

			},
			_helpService() {
				let that = this;
				this.helpService().then(res => {
					if(res.code == 0) {
						that.url = res.data;
						// console.log(res.data)
						// window.open(that.url)
					} else {
						that.$dialog.toast({
							mes: res.msg,
							timeout: 1000,
							// icon: 'success'
						});
					}
				})
			},
			Service() {
				// console.log(this.url,)
				this.$refs.helpService_fl.click();
			},
		}
	}
</script>
<style >
	.helpFeedback {
		height: 100%;
		background-color: #f1f1f1;
	}
	
	.helpFeedback_nav {
		overflow: scroll; 
        -webkit-overflow-scrolling: touch;
		/*padding-top: 1rem;*/
		background: #f7f3f4;
		height: 100%;
		box-sizing: border-box;
		padding: 1.25rem 0.25rem 0.25rem 0.25rem;
		position: relative;
	}
	
	.helpFeedback .yd-navbar {
		z-index: 1000;
		/* background: #011935 !important; */
	}
	
	.helpFeedback .yd-navbar .yd-navbar-item i {
		color: #ffffff !important;
	}
	
	.helpFeedback .yd-navbar span {
		color: #ffffff !important;
	}
	
	.helpFeedback .yd-cell-box {
		border-radius: 0.1rem;
		margin-bottom: 0.25rem;
	}
	
	.helpFeedback .yd-cell {
		border-radius: 0.1rem;
	}
	
	.helpFeedback .yd-textarea>textarea {
		height: 4rem;
	}
	
	.helpFeedback .yd-cell-item {
		background-color: #ffffff;
		border: 1px solid #d9d9d9;
		border-radius: 0.1rem;
		margin-bottom: 0.25rem;
	}
	
	.helpFeedback .yd-cell-item:not(:last-child):after {
		display: none;
	}
	
	.helpFeedback .yd-cell:after {
		display: none;
	}
	
	.helpFeedback .yd-btn-danger {
		margin-top: 0.25rem;
		background-color: #d62541;
	}
	
	.Customer {
		/* position: absolute; */
		/* bottom: 0; */
		/* left: 0; */
		margin-top: 0.25rem;
		height: 1.5rem;
		/* padding: 0.25rem; */
		width: 100%;
		box-sizing: border-box;
	}
	
	.Customer div {
		height: 1rem;
		background-color: #d62541;
		font-size: 0.35rem;
		border-radius: 0.07rem;
		margin: auto;
		padding: 0.15rem;
		text-align: center;
	}
	
	.Customer img {
		display: inline-block;
		height: 0.7rem;
		vertical-align: middle;
	}
	
	.Customer span {
		display: inline-block;
		color: #ffffff;
		/*line-height: 0.7rem;*/
		vertical-align: middle;
		margin: 0;
	}
	.tentert {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 0.2rem 0.3rem;
      font-size: 0.3rem;
    }
    .tentert p {
        height: 0.6rem;
        width: 100%;
        border-bottom: 1px solid #ccc;
      }
     .tentert p span {
          float: left;
          width: 50%;
          font-size: 0.3rem; 
        }
			.tentert p button{
          float: right;
          width: 15%;
          border-radius: 4px;
          border: 0;
          background: #d91d36;
          width: 0.8rem;
          height: 0.5rem;
          color: #fff;
        }
      .tentert p .users {
          width: 30%;
          text-align: right;
        }
       .tentert p .names {
          width: 35%;
          text-align: left;
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
    .tentert h1 {
        height: 0.7rem;
        background: #d91d36;
        color: #fff;
        font-size: 0.35rem;
        line-height: 0.7rem;
        margin-bottom: 0.2rem;
        text-align: center;
				border-radius: 3px;
      }
</style>