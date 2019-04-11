<template>
	<div class="memberNew">
		<yd-navbar title="新增会员">
			<router-link to="/members" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
		</yd-navbar>
		<div ref="wrapper" class="list">
		<div class="content" >
            
        <yd-cell-group>
            <yd-radio-group v-model="radio1" style="padding:0.15rem 0.3rem;">
                <!-- <yd-radio val="0">会员</yd-radio> -->
                <yd-radio val="1">代理</yd-radio>
            </yd-radio-group>
        <yd-cell-item>
            <span slot="left">账号：</span>
            <yd-input slot="right" v-model="username" :debug="true" regex="/^[a-zA-Z][a-zA-Z0-9_]{5,8}$/" placeholder='请输入账号'></yd-input>
        </yd-cell-item>

        <yd-cell-item>
            <span slot="left">昵称：</span>
            <yd-input slot="right" v-model="classaName"  placeholder='请输入昵称'></yd-input>
        </yd-cell-item>

        <yd-cell-item>
            <span slot="left">密码确认：</span>
            <yd-input slot="right" v-model="pass" regex="/(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/" placeholder='请输入密码'></yd-input>
        </yd-cell-item>
    </yd-cell-group>
     <yd-button size="large" type="primary"  @click.native="_agentRegisterMember">新增</yd-button>
                
			</div>
		</div>
    <flyGuild v-if="flyGuildNum =='7'">
      <div class="flyGuild_content" slot="flyGuild_content">
        <p>在这里您可以新增代理会员，新增会员为当前代理会员下级</p>
        <button class="flyGuild_content_but toback" @click="backmember" >上一步</button>
        <button class="flyGuild_content_but"  @click="toAllkinds"  >完成</button>
      </div>
      <div class="indicator tocenter" slot="indicator_img" alt="">
          <!-- <img  src="../../../../static/img/icon/jiantou1.png" alt=""> -->
      </div>
    </flyGuild>
	</div>
</template>

<script>
import Bscroll from "better-scroll";
import { mapState, mapActions, mapMutations } from "vuex";
import Pagination from "../../common/pagination";
import flyGuild from '../dome/flyGuild.vue';
export default {
  data() {
    return {
        radio1: '1',
      user: {},
      username: "",
      classaName: "",
      pass: "",
    };
  },
  components:{
    flyGuild
  },
  computed:{
    ...mapState(['flyGuildNum'])
  },
  created() {
    // this.getUserDetails().then(data => {});
  },
  methods: {
    ...mapActions("personal",["agentRegisterMember"]),
    ...mapMutations("personal",["queryLoginInfoList"]),
    ...mapMutations(['setflyGuildNum']),
    _agentRegisterMember() {
      console.log(333)
        let md5_pwd = hex_md5(this.pass);
        let data = {
            memberType: this.radio1,
            password: md5_pwd,
            addMemberAccount: this.username,
            name: this.classaName,
            way: "3"
        }
        this.agentRegisterMember(data).then(res => {
          // console.log(res);
          if (res.code == 0) {
            this.$dialog.toast({
              mes: "保存成功",
              timeout: 1500,
              icon: "success"
            });
            this.$router.push('/memberNew')
          } else {
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
              icon: "errror"
            });
          }
        });
      },
       backmember(){
          // console.log(333)
          this.setflyGuildNum('6')
          this.$router.push({ path: "/members" });
        },
        toAllkinds(){
          this.setflyGuildNum('0')
          // this.$router.push({ path: "/allkinds" });
        }
    },
   
};
</script>

<style lang="less">
.memberNew {
  height: 100%;
  font-size: 0.3rem;
  .yd-navbar {
    background: #011935 !important;
    /*background: linear-gradient(0,#272a32,#4b4e58)!important;*/
    color: #ffffff;
    .yd-back-icon:before,
    .yd-navbar-center-title {
      color: #ffffff !important;
    }
  }

  .list {
    -webkit-overflow-scrolling: touch;
    width: 100%;
    position: absolute;
    top: 1rem;
    // bottom: 1rem;
    overflow: auto;
    padding: 0 0.2rem;
    color: #000;
    .list-item {
      width: 100%;
      margin: 0.3rem 0;
      padding: 0.3rem;
      border-radius: 2px; /*px*/
      color: #ffffff;
      position: relative;
      background-color: #17a8e1;
      p {
        text-align: left;
        span {
          // color: #ffffff !important;
          color: #ffffff;
        }
      }
      .content_but {
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
        width: 1rem;
        height: 0.5rem;
      }
    }
  }
  .pagination {
    position: fixed;
    bottom: 0;
    right: 0.2rem;
  }
}
.memberNew .tocenter{
    right: 1.5rem !important;
    top: 0.6rem !important;
  }
  .memberNew .flyGuild_content_but{
    margin: .2rem auto;
    padding: .1rem .5rem;
    border: none;
    background-color: #1c86ff;
    color: #fff;
    border-radius: 3px;
  }
  .memberNew .toback{
    background: #d72032
  }
  .memberNew .flyGuild_content h1{
    font-size: 0.35rem;
  }
  .memberNew .flyGuild_content p{
    text-align: left;
    text-indent:0.4rem;
  }
// .memberNew .list .content div:nth-child(5n + 1) {
//   background: #17a8e1;
// }
</style>
