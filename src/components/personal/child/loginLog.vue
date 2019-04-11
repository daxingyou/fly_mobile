<template>
	<div class="loginLog">
		<yd-navbar title="登入记录" v-stopSlide>
			<router-link to="/home" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
			<div slot="right" @click="assisShow()" >
				小助手
			</div>
		</yd-navbar>
		<div ref="wrapper" class="list">
			<div class="content" >
				<div v-for="(item,index) in list" class="list-item" :key="index">
				    <p><span>IP地址 &nbsp;&nbsp;</span>:<span > {{item.ip}}</span></p>
						<p><span>登陆时间</span>:<span> {{item.loginTime}}</span></p>
						<p><span>登陆地区</span>:<span > {{item.address=="nullnullnullnull"?"内网ip":item.address}}</span></p>
				</div>
			</div>
		</div>
		<!-- 小助手 -->
    <div class="Assis_tant" v-show="assis_tant" >
     <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant> 
    </div>
		<!-- <Pagination v-stopSlide class="pagination" align="right" :allCounts="countAll" @change="_queryLoginInfo" @enter="_queryLoginInfo"></Pagination> -->
	</div>
	
</template>

<script>
//	import Bscroll from 'better-scroll';
  import { mapState, mapActions, mapMutations } from "vuex";
  import Pagination from '../../common/pagination';
	import Assistant from '../../home/dome/assistant.vue';
	export default {
		data(){
			return {
				list:[],
				countAll:0,
				assis_tant:false,
			}
		},
    created(){
      this._queryLoginInfo(1)
		},
		 mounted() {
//			this.$nextTick(() => {
//				let scroll = new Bscroll(this.$refs.wrapper, {
//					scrollbars: true,
//					listenX: true,
//					click: true,
//				})
//				scroll.on('scrollEnd', this.scrollEnd);
//				scroll.on('scrollStart', this.scrollStart);
//			})
		},
    components:{
			Pagination,
			Assistant
    },
    methods:{
      ...mapActions([
        'queryLoginInfo'
          ]),
      ...mapMutations([
        'queryLoginInfoList'
      ]),
      _queryLoginInfo(page){
        let that = this;
        this.queryLoginInfo({
          page: page
        }).then((res) => {
          // console.log(res);
          that.list = res.data.memberLoginInfoList;
          that.countAll = res.data.countAll;
          // console.log(that.countAll)
        })
			},
			 // 小助手
      assisShow(){
        if(this.assis_tant == false){
          this.assis_tant = true;
        }else{
          this.assis_tant = false;
        }
        
        // console.log(this.assis_tant)
      }
    }
	}
</script>

<style lang="less">
	.loginLog{
		height: 100%;
		font-size: 0.3rem;
		.yd-navbar{
      background: #011935 !important;
			/*background: linear-gradient(0,#272a32,#4b4e58)!important;*/
			color: #FFFFFF;
			.yd-back-icon:before,.yd-navbar-center-title{
				color: #FFFFFF !important;
			}
		}

		.list{
		    -webkit-overflow-scrolling: touch;
			width: 100%;
			position: absolute;
			top: 1.2rem;
			bottom: 0rem;
			overflow: scroll;
			padding: 0 0.2rem;
      color: #ffffff;
			.list-item{
				width: 100%;
				margin: 0.3rem 0;
				padding: 0.3rem;
				border-radius: 2px;/*px*/
        color: #ffffff;
				p{
					text-align: left;
          span{
            color: #ffffff !important;
          }
				}
			}
		}
		.pagination{
			position: fixed;
			bottom: 0;
			right: 0.2rem;
		}
		.Assis_tant{
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    height: calc(100% - 1rem - 0px);
    /* background: #2dabf3; */

  }
	}
  .loginLog .list .content div:nth-child(5n+1){
    background: #17a8e1;;
  }
 .loginLog .list .content div:nth-child(5n+2){
    background: #04b0c4;;
  }
  .loginLog .list .content div:nth-child(5n+3){
    background: #5f65c3;;
  }
  .loginLog .list .content div:nth-child(5n+4){
    background: #4ba708;;
  }
  .loginLog .list .content div:nth-child(5n+5){
    background: #e6a316;;
  }
</style>
