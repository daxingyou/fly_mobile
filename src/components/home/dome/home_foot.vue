<template>
  <div class="footer-warp" >
    <div @click="changeIndex(item.to)" class="tab-bar" v-for="(item, index) in tabBar" :key="index">
      <img :src="$route.name==item.name?item.sel_img:item.img">
      <span class="badge" v-show="item.name==='chartroom'&&(noticeNum+applyRecord.length)!==0">{{(noticeNum+applyRecord.length)>99?'99+':(noticeNum+applyRecord.length)}}</span>
      <p :class="{selTxt:$route.name==item.name}">{{item.txt}}</p>
    </div>
  </div>
</template>

<script>
import {
		mapState,
		mapActions,
    mapMutations,
    mapGetters
	} from "vuex";
export default {
  data () {
    return {
      tabBar: [
        {
          img: require('../../../../static/img/tag/Coloured_hall_Not_Selected.png'),
          sel_img: require('../../../../static/img/tag/Coloured_hall_Selected.png'),
          txt: '彩种大厅',
          to: '/allKinds',
          name:'allKinds',
        }, {
          img: require('../../../../static/img/tag/Award_opening_recordl_Not_Selected.png'),
          sel_img: require('../../../../static/img/tag/Award_opening_recordl_Selected.png'),
          txt: '开奖记录',
          to: '/award',
          name:'award',
        }, {
          img: require('../../../../static/img/tag/Betting_record_Not_Selected.png'),
          sel_img: require('../../../../static/img/tag/Betting_record_Selected.png'),
          txt: '投注记录',
          to: '/noterecord',
          name: 'noterecord'
        }, {
          img: require('../../../../static/img/tag/Persona_center_Not_Selected.png'),
          sel_img: require('../../../../static/img/tag/Persona_center_Selected.png'),
          txt: '个人中心',
          to: '/home',
          name:'home'
        },{
          img: require('../../../../static/img/tag/chat_room_2.png'),
          sel_img: require('../../../../static/img/tag/chat_room_3.png'),
          txt: '聊天室',
          to: '/chartroom',
          name:'chartroom'
        }
      ],
    }
  },
  created(){
    console.log(this.queryAccout);
    // console.log(sessionStorage.getItem("chartLogin"))
  },
  computed: {
			...mapState("login", ["userDetails"]),
      ...mapState(["isLogin",'queryAccout']),
          ...mapGetters("chart", ["noticeNum"]),
    ...mapState("chart", ["applyRecord"])
		},
  methods: {
    ...mapActions("chart",["chartLogin"]),
    ...mapActions("login", ["getUserDetails"]),
    changeIndex (to) {
      if(to == '/chartroom'){
        if(this.userDetails.type == 1){
           
          this.$dialog.toast({
							mes: "会员登录查看更多",
							timeout: 1000
						});
        }else  if(this.userDetails.type != 1){
           if(sessionStorage.getItem("chartLogin") != "1") {
							console.log(sessionStorage.getItem("password"))
							this.chartLogin({
								account: this.userDetails.account,
								password: sessionStorage.getItem("password"),
                loginFrom: "3",
                businessNo:this.queryAccout
							}).then(res => {
								// console.log(res)
								if(res.code === 0) {
									sessionStorage.setItem("chartLogin", "1");
									this.$router.push("/chartroom");
									// this.getUserDetails();
								} else if(res.code === 111) {
									this.chartLogin({
										account: this.userDetails.account,
										password: sessionStorage.getItem("password"),
                    loginFrom: "3",
                    businessNo:this.queryAccout
									}).then(tel => {
										// console.log(tel)
										if(tel.code === 0) {
											sessionStorage.setItem("chartLogin", "1");
											this.$router.push("/chartroom");
										} else if(tel.code === 111) {
											this.$dialog.toast({
												mes: "请重新登录!",
												timeout: 1000
											});
										}
									});
								}
              });
          }else{
            this.$router.push(to)
          }
        }
      }else{
         this.$router.push(to)
      }
     
    }
  },
}
</script>

<style lang="less" scoped>
  .footer-warp {
  	font-size: 12px;
    position: fixed;
    height: 1rem;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    // box-shadow: 0 -0.12rem 0.16rem 0 rgba(51, 51, 51, .1);
    border-top: 1px solid #d7d7d7;
    z-index: 998;
  }
  .tab-bar {
    width: 25%;
    text-align: center;
    color: #666666;
    padding-top: 4px;
    img {
      // margin-top: 0.1rem;
      height: 20px;
    }
    p {
      // margin-top: 0.08rem;
      margin-bottom: 0.1rem;
    }
    .selTxt {
      color: #0a77a0;
    }
    .badge {
      position: absolute;
      right: 0.2rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: #e6442b;
      color: #fff;
      text-align: center;
      line-height: 0.5rem;
    }
  }
</style>
