<template>
	<div class="members">
		<yd-navbar title="代理会员">
      <!-- <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left" style="color: #FFFFFF;"></yd-navbar-back-icon> -->
			<router-link to="/agent" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
      <yd-button v-if="show"  slot="right" type="danger" @click.native="toNewMember('/memberNew','')" >新增</yd-button>
		</yd-navbar>
		<div class="members_tel">
				<yd-cell-group>
					<yd-cell-item>
								<span slot="left">下级账号：</span>
								<input slot="right" type="text"  v-model="childAcconnt" placeholder="不指定时请留空！">
								<yd-button slot="right" type="primary"  @click.native="_queryAgentMemberInfo(childAcconnt)">查询</yd-button>
						</yd-cell-item>
				</yd-cell-group>
		</div>
		<div ref="wrapper" class="list">
			<div class="content" >
				<div v-for="(item,index) in list" class="list-item" :key="index">
				    <p><span>会员账号 </span>:<span > {{item.account}}</span></p>
						<!-- <p><span>账号名称 </span>:<span> {{item.name}}</span></p> -->
						<p><span>钱包余额 </span>:<span > {{item.accountBalance}}</span></p>
						<p><span>团队人数 </span>:<span> {{item.childCount}}</span></p>
						<p><span>下级总额 </span>:<span > {{item.childAmount}}</span></p>
						<p><span>注册时间 </span>:<span> {{item.create_time}}</span></p>
						<p><span>最后登录时间</span>:<span > {{item.last_loginTime}}</span></p>
						<p class="content_but" >
							<yd-button  type="hollow" @click.native="tomemberDetail(item.account)" >详情</yd-button>
              <!-- <yd-button v-if="item.account != userDetails.account"  type="danger" @click.native="toNewMember('/turningPoint',item.account)" >转点</yd-button> -->
						</p>
				</div>
			</div>
		</div>
    <flyGuild v-if="flyGuildNum =='6'">
      <div class="flyGuild_content" slot="flyGuild_content">
        <p>代理中心可以进入到代理，查询下级代理和新增下级代理</p>
        <button class="flyGuild_content_but toback" @click="toAgent()" >上一步</button>
        <button class="flyGuild_content_but" @click="toNewmember()"   >下一步</button>
      </div>
      <div class="indicator tocenter" slot="indicator_img" alt="">
          <img  src="../../../../static/img/icon/jiantou1.png" alt="">
      </div>
    </flyGuild>
	</div>
</template>

<script>
import Bscroll from "better-scroll";
import { mapState, mapActions, mapMutations } from "vuex";
import flyGuild from '../dome/flyGuild.vue';
export default {
  data() {
    return {
      list: [],
			countAll: 0,
      childAcconnt:'',
      account:'',
      show:false
    };
  },
  components:{
    flyGuild
  },
  created() {
      this.account = this.userDetails.account;
      // console.log(this.userDetails)
      this._queryAgentMemberInfo(this.account)
  },
  mounted() {
    // this.$nextTick(() => {
    //   let scroll = new Bscroll(this.$refs.wrapper, {
    //     scrollbars: true,
    //     listenX: true,
    //     click: true
    //   });
    //   scroll.on("scrollEnd", this.scrollEnd);
    //   scroll.on("scrollStart", this.scrollStart);
    // });
  },
	 computed: {
            ...mapState('login', [
                'userDetails'
            ]),
            ...mapState(['flyGuildNum'])
        },
  methods: {
    ...mapActions('personal',["queryAgentMemberInfo"]),
//  ...mapMutations(["queryLoginInfoList"]),
    ...mapActions('login', [
				"getUserDetails",
      ]),
    ...mapMutations(['setflyGuildNum']),
		_queryAgentMemberInfo(childAcconnt){
			let acc
			if(childAcconnt){
				acc = childAcconnt;
			}else{
				acc = this.account;
			}
			let data = {
				'memberAccount':acc,
				'strt':'1',
				'type':'2',
			};
			this.queryAgentMemberInfo(data).then( res => {
          if( res.code == 0){
             this.list = res.data;
            this.show=res.data[0].hierarchy==='0'?false:true
            this.list.forEach( item => {
              if(item.childCount == null || item.childCount == '' || item.childCount == undefined){
                item.childCount = '0'
              }
              if(item.childAmount == null || item.childAmount == '' || item.childAmount == undefined){
                item.childAmount = '0'
              }
              if(item.lastLoginTime == null){
                item.lastLoginTime = item.createTime;
              }
              item.create_time = item.createTime.slice(0, 19);
              item.last_loginTime = item.lastLoginTime.slice(0, 19);
            });
          }else if(res.code != 0){
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1000,
              icon: 'error'
            });
          }
         
			})
    },
    tomemberDetail(account){
      // console.log(account);
      if(account == this.userDetails.account){
         this.$router.push({
          path: '/memberModify',
          query: {
            id: account
          }
        })
      }else if(account != this.userDetails.account){
        this.$router.push({
          path: '/memberDetail',
          query: {
            id: account
          }
        })
      }
    },
    toNewMember(path,account){
      if(account == ''){
        this.$router.push({
          path:path
        })
      }else if(account != ''){
        this.$router.push({
          path: path,
          query: {
            id: account
          }
        })
      }
      
    },
    toAgent(){
      this.setflyGuildNum('5');
      this.$router.push('/agent')
    },
    toNewmember(){
      this.setflyGuildNum('7');
      this.$router.push('/memberNew')
    }
  },
  watch:{
    userDetails(){
       this.account = this.userDetails.account;
        this._queryAgentMemberInfo(this.account)
    }
  }
};
</script>

<style lang="less">
.members {
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
    // height: 100%;
    width: 100%;
    position: absolute;
    top: 2rem;
    left: 0;
    overflow: auto;
    padding: 0 0.2rem;
    color: #ffffff;
    .list-item {
      width: 100%;
      margin: 0.3rem 0;
      padding: 0.3rem;
      border-radius: 2px; /*px*/
			color: #ffffff;
			position: relative;
      p {
        text-align: left;
        span {
          // color: #ffffff !important;
        }
			}
			.content_but{
				position: absolute;
				right: 0.2rem;
				top: 0.2rem;
				width: 1rem;
        height: 1.5rem;
        .yd-btn-hollow {
          margin-bottom: 0.1rem !important;
        }
			}
    }
  }
  .pagination {
    position: fixed;
    bottom: 0;
    right: 0.2rem;
  }
}
.members .list .content div:nth-child(5n + 1) {
  background: #17a8e1;
}
.members .list .content div:nth-child(5n + 2) {
  background: #04b0c4;
}
.members .list .content div:nth-child(5n + 3) {
  background: #5f65c3;
}
.members .list .content div:nth-child(5n + 4) {
  background: #4ba708;
}
.members .list .content div:nth-child(5n + 5) {
  background: #e6a316;
}
.members_tel {
  display: inline;
  position: fixed;
  top: 1rem;
  left: 0;
  height: 1rem;
  width: 100%;
  background-color: #cccccc;
  z-index: 10;
}
.members .tocenter{
    right: 1.5rem !important;
    top: 0.6rem !important;
  }
  .members .flyGuild_content_but{
    margin: .2rem auto;
    padding: .1rem .5rem;
    border: none;
    background-color: #1c86ff;
    color: #fff;
    border-radius: 3px;
  }
  .members .toback{
    background: #d72032
  }
  .members .flyGuild_content h1{
    font-size: 0.35rem;
  }
  .members .flyGuild_content p{
    text-align: left;
    text-indent:0.4rem;
  }
</style>
