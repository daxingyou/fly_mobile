<template>
	<div class="redEnvelopedRain">
		<yd-navbar title="红包雨" v-stopSlide>
			<router-link to="/allKinds" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
		</yd-navbar>
		<div ref="wrapper" class="list">
            <img src="../../../../static/img/redenevlope/red_1.gif" alt="" @click="_redPacket()" >
        </div>    
	</div>
	
</template>

<script>
  import { mapState, mapActions, mapMutations } from "vuex";
	export default {
		data(){
			return {
				
			}
        },
        created(){
        },
        computed:{
            ...mapState("login", ["userDetails"]),
            ...mapState(["isLogin","websocketMsg"]),
        },
        methods:{
            ...mapActions(['redPacket']),
            _redPacket(){
                this.redPacket().then( res => {
                    if(res.code == '0'){
                        this.$dialog.toast({
                            mes: res.data,
                            timeout: 1000,
                        });
                    }else if(res.code != '0'){
                        this.$dialog.toast({
                            mes: "本轮红包雨结束！",
                            timeout: 1000,
                            icon: 'success'
                        });
                        setTimeout( ()=>{
                            this.$router.push({
                                name: "allKinds"
                            })
                        },1000) 
                    }
                })
            },
        },
    }
</script>

<style lang="less">
	.redEnvelopedRain{
		height: 100%;
        font-size: 0.3rem;
        display: flex;
        flex-direction: column;
		.yd-navbar{
      background: #011935 !important;
			/*background: linear-gradient(0,#272a32,#4b4e58)!important;*/
			color: #FFFFFF;
			.yd-back-icon:before,.yd-navbar-center-title{
				color: #FFFFFF !important;
			}
        }
        .list{
            flex: 1;
            overflow: scroll;
            padding-top: 1rem;
            height: 100;
            position: relative;
            // background:url("../../../../static/img/hongbaoyu2.gif") 100%;
            // background-size: cover;
            img{
                height: 100%;
                width: 100%;
            }
            .content{
                // display: none;
                position: absolute;
                top: 3rem;
                left: 50%;
                margin-left: -1.5rem;
                width:3rem;
                height: 3rem;
                background: greenyellow;
                border-radius: 100%;
                box-sizing: border-box;
                padding: 0.9rem 0.2rem 0.2rem 0.2rem;
                z-index: 10;
                p{
                    text-align: center;
                }
                .credTime{
                    display: inline;
                    height: 3rem;
                    width: 3rem;
                    text-align: center;
                    line-height: 1.3rem;
                }
            }
            .nav_center{
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background: #011935;
                opacity: 0.3;
            }
        }
        .redEnveloped_alt{
            position: fixed;
            top: 1rem;
        }
        .redEnveloped_no{
            padding-top: 1rem;
            height: 100%;
            width: 100%;
            background: url(../../../../static/img/hongbao_1.png) coral 100% 100%;
            .redEnveloped_no_div{
                width: 3rem;
                height: 3rem;
                margin: auto;
               padding-top: 3.5rem;
               p{
                   text-align: center;
                   font-weight: 700;
               }
               .p_a{
                   color: #FFFFFF;
                   font-size: 0.4rem;
                   
               }
               .p_b{
                   height: 1.5rem;
                   font-size: 0.5rem;
                  color: #fff100;
               }
            }
            
        }
        .time_s{
            font-size: 0.5rem;
            font-weight: 700;
            color: #FFFFFF;
        }

	}
</style>
