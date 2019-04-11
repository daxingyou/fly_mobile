<template>
  <div id="sign">
    <div v-show="dataList.id==='sign'" class="img">
      <!-- <img src="../../../../static/img/information/sign.png" alt=""> -->
      <div class="container">
        <div class="main">
          <p>累计签到，可获得的现金逐日递增。
            <!-- <button>签到规则</button> -->
          </p>
          <timeLine :label="day">
            <timelineItem index="1" :time="'第1天'">+{{signAmount[0]}}</timelineItem>
            <timelineItem index="2" :time="'第2天'">+{{signAmount[1]}}</timelineItem>
            <timelineItem index="3" :time="'第3天'">+{{signAmount[2]}}</timelineItem>
            <timelineItem index="4" :time="'第4天'">+{{signAmount[3]}}</timelineItem>
            <timelineItem index="5" :time="'第5天'">+{{signAmount[4]}}</timelineItem>
            <timelineItem index="6" :time="'第6天'">+{{signAmount[5]}}</timelineItem>
            <timelineItem index="7" :time="'第7天'">+{{signAmount[6]}}</timelineItem>
          </timeLine>
          <!-- <p style="background:#fff">本周已获得积分:</p> -->
          <button v-if="!show" @click="sign" class="sign_btn">签到</button><button v-else @click="sign" class="sign_btn2">已签到</button>
        </div>
      </div>
    </div>
    <div class="betAward" v-show="dataList.id==='betAward'">
      <!-- <p>当投注额大于{{dataList.amount}}时可获得奖励，现在您的投注额为{{dataList.betAmount}}</p> -->
      <messageBox mode="2" :name="`当投注额大于${dataList.amount}时可获得奖励${dataList.awardAmount}，现在您的投注额为${dataList.betAmount}`">
        <Box @click.native.stop="receive" v-if="!dataList.nowStatus" width="1rem" height=".6rem" :backgroundColor="dataList.amount-dataList.betAmount>0?'#c4c4c4':'#d91d36'" :colorEffect="dataList.amount-dataList.betAmount>0?'c4c4c4':'#a52c3c'" slot="button"><span>领取</span></Box>
        <Box  v-else width="1.3rem" height=".6rem" backgroundColor="#c4c4c4" colorEffect="#c4c4c4" slot="button"><span>已领取</span></Box>
      </messageBox>
    </div>
    <div class="subaward" v-show="dataList.id==='subaward'">
      <h1>奖励说明：</h1>
      <p class="subaward_tol">
          下级充值<span class="red_span">{{dataList.needAmount}}</span>元,可领取奖励<span class="red_span">{{dataList.subAwardAmount}}</span>元。
      </p>
      <ul v-if="noSubaward == true">
        <li class="subaward_ul_head">
          <span>下级账号</span>
          <span>总充值金额</span>
          <span></span>
        </li>
        <li v-for="(item,index) in subawardList ">
           <span>{{item.ACCOUNT}}</span>
           <span>{{item.SUBAMOUNT}}</span>
           <span>
             <button v-if="indexs.indexOf(index) == -1"  ref='but' @click="_activityAward(item.ACCOUNT,'subaward',index)">领取</button>
             <button v-else  ref='but' class="buts">已领取</button>
           </span>
        </li>
      </ul>
      <div v-if="noSubaward == false" class="no_subaward">
        <div>
          <img src="../../../../static/img/personal/recharge/xiaolian.png" alt="">
        </div>
        
        <p>奖励都领完了！</p>
      </div>
    </div>
  </div>
</template>
<script>
import timeLine from "../../common/timeline.vue";
import timelineItem from "../../common/timeLineItem.vue";
import messageBox from "../../common/messageBox.vue";
import Box from "../../common/Box.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  props: ["dataList"],
  data() {
    return {
      signAmount: [],
      record: [],
      show: false,
      subawardList:[],
      noSubaward:true,
      isActives:null,
      indexs:[],
    };
  },
  created() {
    // this.signTime();
    this.indexs == [];
    this.init();
    this.subawardList = this.dataList.data;
    setTimeout(()=>{
      console.log(this.$refs.but)
    },500)
    
  },
  components: {
    timeLine,
    timelineItem,
    messageBox,
    Box
  },
  methods: {
    ...mapActions(["signTime", "signRecord", "getBetAwardAmount","activityAward",'queryActivity']),
    init() {
      this.signRecord().then(res => {
        if (res.code === "0") {
          this.signAmount = res.signAmount.split(",");
          this.show = res.nowStatus;
          this.record = res.signRecord
            .split(",")
            .reduce((accumulator, currentValue) => {
              if (currentValue !== "") {
                accumulator.push(currentValue);
              }
              return accumulator;
            }, []);
        } else {
          this.$dialog.toast({ mes: res.msg, timeout: 1500 });
        }
      });
    },
    sign() {
      if (this.show) {
        return;
      } else {
        this.signTime().then(res => {
          if (res.code === 0) {
            this.$dialog.toast({
              mes: `签到成功，+${res.data}积分`,
              timeout: 1500,
              callback: () => {
                this.init();
              }
            });
          } else {
            this.$dialog.toast({ mes: res.msg, timeout: 1500 });
          }
        });
      }
    },
    receive() {
      if (this.dataList.nowStatus||this.dataList.amount-this.dataList.betAmount>0) {
        return;
      } else {
        this.getBetAwardAmount().then(res => {
          if (res.code == 0) {
            this.$dialog.toast({ mes: `领取成功，+${res.data}现金`, timeout: 1500,callback:()=>{
              this.dataList.nowStatus=true;
            } });
          } else {
            this.$dialog.toast({ mes: res.data, timeout: 1500 });
          }
        });
      }
    },
    // 下级充值奖励
    _activityAward(account,id,index){
      this.activityAward({
        subusername:account,  // 下级账号
        type:id               // 充值奖励id
      }).then( res => {
        console.log(res,'666')
        if(res.code == 0){
          this.indexs.push(index);
           this.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
              icon: "success"
            });
          // this.$refs.but[index].innerText = '已领取';
          // this.isActives = index;
          // console.log(this.$refs.but[index])
        }else{
          this.$dialog.toast({
              mes: res.data,
              timeout: 1500,
              icon: "error"
            });
        }
      })
    }
  },
  computed: {
    day() {
      return this.record.length + "";
    }
  },
  watch:{
    subawardList(){
       setTimeout( ()=> {
        if(this.subawardList.length == 0){
          this.noSubaward = false;
        }else{
          this.noSubaward = true;
        }
      },500)
      
    }
  }
};
</script>

<style lang="less">
@import url("../../../../static/css/common.less");
#sign {
  .my-container;
  .img {
  	height: auto !important;
    text-align: center;
    img {
      width: 4rem;
    }

    .container {
      width: 100%;
      // height: 3rem;
      background: #ffe97b;
      // position: relative;
      // bottom: 0.5rem;
      // z-index: -2;
      border-radius: 7px;
      overflow: hidden;
      .main {
        margin: 0.2rem;
        background: #fffae0;
        overflow: hidden;
        font-size: 0.23rem;
        border-radius: 7px;
        p {
          margin: 0.2rem;
          padding: 0.15rem;
          background: #ffe49c;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 5px;
          button {
            border: 0;
            outline: none;
            background: #ffa029;
            padding: 0.1rem;
            border-radius: 5px;
            font-weight: 900;
          }
        }
        .sign_btn,
        button {
          outline: none;
          padding: 0.2rem 0.5rem;
          border: 0;
          background: #fe9d28;
          margin: 0.3rem 0;
          color: #5e2100;
          font-weight: 900;
          font-size: 0.3rem;
          box-shadow: 0.05rem 0.05rem 1px #5e2100;
          border-radius: 10%;
          &:active {
            box-shadow: -0.05rem -0.05rem 1px #5e2100;
            // background: #fff;
          }
        }
        .sign_btn2 {
          background: #c4c4c4;
          color: #fff;
          box-shadow: none;
          &:active {
            box-shadow: none;
          }
        }
      }
    }
  }
  .betAward {
    font-size: 0.28rem;
    #_Box {
      .my-display(center, center);
      border-radius: 4px;
      span {
        color: #fff;
      }
    }
  }
  .subaward{
    .subaward_tol{
      padding-left: 1.5rem;
      background: #c4c4c4;
      margin-bottom: 0.3rem;
      .red_span{
        color: #ff5151;
        display: inline-block;
        padding: 0 0.15rem;
      }
    }
    ul{
      width: 100%;
      overflow: hidden;
      border:5px solid #ffb764;
      border-radius: 3px;
      padding: 0.2rem 0.1rem;
      .subaward_ul_head{
        background: #fffae0 !important;
        height: 0.5rem !important;
      }
      li{
        float: left;
        height: 0.7rem;
        width: 100%;
        span{
          float: left;
          width: 33.3%;
          height: 0.7rem;
          line-height: 0.7rem;
          text-align: center;
          button{
            display: inline-block;
            height: 0.5rem;
            width: 0.8rem;
            background: #ff5151;
            color: #fff;
            line-height: 0.5rem;
            text-align: center;
            border: 0;
            border-radius: 3px;
          }
          .buts{
            background: #c1c1c1;
            color: #fff;
            width: 1rem;
          }
        }
      }
      
    }
    .no_subaward{
        height: 3rem;
        width: 100%;
        background: #ffe97b;
        box-sizing: border-box;
        padding: 0.3rem 0;
        border-radius: 5px;
        div{
          width: 100%;
          padding-left: 50%;
          img{
            display: block;
            width: 2rem;
          
            margin-left: -1rem;
          }
        }
        
        p{
          text-align: center;
          color: #ccc;
          font-weight: 800
        }
      }
    
  }
  .subaward ul li:nth-child(2n+1){
    background: #f5f5f5;
  }
}
</style>
