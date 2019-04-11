<template>
  <div class="hot" >
    <yd-navbar title="热门游戏">
        <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
        <div slot="right" @click="toPath('/hotChange')" >
				额度转换
			</div>
    </yd-navbar>
    <div class="hot_nav" >
      <div class="nav_list" v-for="item in hotGmaes">
          <p class="list_a">
              <img :src="'../../static/img/'+item.img+'.png'" alt="">
          </p>
          <p class="list_b">
              {{item.name}}
          </p>
          <p class="list_c">
              <yd-button type="danger" @click.native="_balance(item.names,item.id,item.names)">进入游戏</yd-button>
          </p>
      </div>
    </div>
    <!-- 小助手 -->
    <!-- <div class="aAssis_tant" v-show="assis_tant" >
      <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant> 
    </div> -->
    <!-- 转账弹框 -->
    <yd-popup v-model="show1" position="center" width="90%" class="models" >
            <div style="background-color:#fff;border-radius: 4px;">
                <p class="model_hrad">
                    额度转换
                </p>
                <div class="model_center" style="color:#F00;margin-top: 10px;">
                  <div>
                    <img src="../../../static/img/zhuzhanghu.png" alt="">
                    <h3 class="zh">主账户</h3>
                    <p class="money">${{userDetails.accountBalance}}</p>
                  </div>
                  <div>
                    <img class="zhuanfa" src="../../../static/img/zhuanfa.png" alt="">
                  </div>
                  <div>
                    <img src="../../../static/img/youxi.png" alt="">
                    <h3 class="zh">{{game_name}}账户</h3>
                    <p class="money">${{game_money}}</p>
                  </div>
                </div>
                <div class="model_input">
                  <input type="number" v-model="nums" placeholder="请输入正整数">
                  <button @click = moneyChange(game_id)>确认转账</button>
                </div>
                <div class="model_btm">
                  <div class="model_btm_a">
                    <button type="primary" @click="pushInput(100)">$100</button>
                    <button type="primary" @click="pushInput(500)">$500</button>
                    <button type="primary" @click="pushInput(1000)">$1000</button>
                    <button type="primary" @click="pushInput(5000)">$5000</button>
                    <button type="primary" @click="pushInput(10000)">$10000</button>
                    <button type="primary" @click="pushInput(accountBalance)">全部</button>
                  </div>
                  <div class="model_btm_b">
                    <button type="primary"  @click="judgeAddress(game_name)">直接进入游戏</button>
                    <a  ref="goSport" :href = URL_ target="_blank" style="display: none"></a>
                    <button type="primary"  class="qk" @click="pushInput(null)">清空</button>
                  </div>
                </div>
                <div class="model_foot"></div>
            </div>
        </yd-popup>
  </div>

</template>
<script>
  import Assistant from '../home/dome/assistant.vue';
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    data(){
      return{
        URL_:'',
        groupName: '--',
        assis_tant:false,
        show1:false,
        game_name:'',
        game_money:null,
        game_id:"",
        nums:null,
        accountBalance:'',
        hotSport:'',
        hotGmaes:[
            {
                name:"棋牌游戏",
                img:"FF",
                id:"fl_fl",
                names:'棋牌',
            },
            {
                name:"申博",
                img:"tgp",
                id:"sb_sb",
                names:'申博',
            },
             {
                name:"AG",
                img:"AG",
                id:"ag_ag",
                names:'AG',
            },
            // {
            //     name:"沙巴体育",
            //     img:"SB",
            //     id:"gm_ibc",
            //     names:'沙巴',
            // },
            // {
            //     name:"VG",
            //     img:"VG",
            //     id:"vg_vg",
            //     names:'VG',
            // }
        ]
      }
    },
    created(){
      // console.log((Math.round(19.3232558*100)/100).toFixed(2));
      this.accountBalance = this.userDetails.accountBalance;
    },
     components: {
      Assistant
    },
     computed: {
            ...mapState('login', [
                'userDetails'
            ]),
        },
    methods:{
      ...mapActions('home',['balance','amountOut','open','register']),
      ...mapActions('login', [
				"getUserDetails"
			]),
      // 查询热门游戏余额
      _balance(name,id,names){
        this.show1 = true;
        this.game_name = name;
        this.game_id = id;
        this._register(id)
        this.goUrl(id);
        this.balance({
          platform:id
        }).then( res => {
          if(res.code == 0){
            this.game_money = (Math.round(res.data*100)/100).toFixed(2);
          }else{
            this.game_money = "--";
            this.$dialog.toast({
                    mes: res.msg,
                    timeout: 1500,
                    icon: 'error'
                });
          }
        })
      },
       //额度转换button点击传值到input
      pushInput(num){
        let that = this;
        if( num > that.accountBalance){
          that.nums = that.accountBalance;
          return false
        }else {
          that.nums = num
        }
      },
      // 资金转向三方
      moneyChange(id){
        this.amountOut({
          amount:this.nums+"",
          platform:id
        }).then( res => {
          if(res.code == 0){
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
              icon: 'success'
            });
          }else{
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
              icon: 'error'
            });
          }
        });
        this._balance('',id ,'');
        this.getUserDetails();
        this.accountBalance = this.userDetails.accountBalance;
      },
      // 三方账户注册
      _register(id){
        if(id != 'sb_sb' || id != 'fl_fl'){
          this.register({
            platform: id
          }).then( res => {

          })
        }
      },
      // 请求三方地址
      goUrl(id){
        this.open({
          mobile: "yes",
          platform: id
        }).then( res => {
          if(res.code == 0){
            this.URL_ = res.data;
          }else{
            this.URL_ = '';
          }
        })
      },
       //判断是否请求到体育地址
      judgeAddress(name){
        let that = this;
        if(that.URL_ == ''){
          that.$dialog.alert({mes:"您好，我们的"+name+"网站正在维护中，请稍后再试!"});
        }else {
          that.$refs.goSport.click();
          that.show1 = false;
        }
      },
      toPath(name){
        this.$router.push({
          path:name
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

<style  lang="less">
  .hot{
    height: 100%;
    text-align: left;
    font-size: 0.3rem;
    .yd-navbar{
        background: #011935 !important;
        }
    .yd-navbar .yd-navbar-item i{
        color: #ffffff !important;
    }
    .yd-navbar span{
        color: #ffffff !important;
    }
    .hot_nav{
        overflow: hidden;
        padding: 1rem 0;
        /*background: #f9f9f9;*/
        min_height: 100%;
        box-sizing: border-box;
        margin-top: 0.2rem;
        .nav_list{
            height: 1.5rem;
            width: 94%;
            background: #04b0c4;
            margin:0 auto 0.2rem;
            box-sizing: border-box;
            padding: 0.15rem 0.25rem;
            p{
                float: left;
                line-height: 1.2rem;
                color: #fff;
                img{
                    height: 1.2rem;
                    width:  1.2rem;
                }
            }
            .list_a{
                width: 1.2rem;
                height: 1.2rem;
                background-color: #ffffff;
            }
            .list_b{
                width: 50%;
                margin: 0 0.2rem;
            }
            .list_c{
                float: right;
                width: 1.4rem;
            }
            
        }
    }
    .models{
      overflow: hidden;
      button{
        background: #2d8cf0;
        height: 0.6rem;
        border-radius: 0.1rem;
        border: 0;
        color: #fff;
        padding: 0 0.1rem;
      }
      .model_hrad{
        text-align: center;
        color: rgb(255, 102, 0);
        height: 0.6rem;
        line-height: 0.6rem;
        border-bottom: 1px solid #c1c1c1;
      }
      .model_center{
        width: 100%;
        overflow: hidden;
          div{
            width: 33.3%;
            float: left;
            text-align: center;

          }
          .zhuanfa{
            margin-top: 0.3rem;
          }
          .zh{
            color: #000;
          }
          .money{
            color: red;
          }
      }
      .model_input{
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        input{
          border: 1px solid #c1c1c1;
          height: 0.6rem;
          padding: 0 0.15rem;
        }
      }
      .model_btm{
        width: 100%;
        overflow: hidden;
        text-align: center;
        padding: 0.15rem 0;
        div{
          float: left;
        }
        .model_btm_a{
          width: 68%;
          button{
            width: 1.4rem;
            margin: 0.05rem 0;
          }
        }
        .model_btm_b{
          width: 32%;
          line-height: 0.72rem;
          .qk{
            background: #43464f;
          }
        }
      }
      .model_foot{
        height: 0.6rem;
        border-top: 1px solid #c1c1c1;
      }
    }
    
  }
  .hot .hot_nav div:nth-child(5n+1){
    background: #17a8e1;;
  }
  .hot .hot_nav div:nth-child(5n+2){
    background: #04b0c4;;
  }
  .hot .hot_nav div:nth-child(5n+3){
    background: #5f65c3;;
  }
  .hot .hot_nav div:nth-child(5n+4){
    background: #4ba708;;
  }
  .hot .hot_nav div:nth-child(5n+5){
    background: #e6a316;;
  }
  
  /* .hot .yd-accordion-head{
    overflow: visible;
    border-bottom: 0.015625rem solid #d9d9d9 !important;
  } */
  
</style>
