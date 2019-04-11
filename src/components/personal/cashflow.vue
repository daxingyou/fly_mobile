<template>
  <div id="cashflow">
    <yd-navbar title="账变记录">
      <router-link to="/home" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
      <div slot="right" @click="assisShow()" >
				小助手
			</div>
    </yd-navbar>
    <div class="container">
      <div>
          <p><span>交易类型：</span>
          <select v-model="type">
              <option value="0">全部</option>
              <option value="1">充值</option>
              <option value="2">取款</option>
              <option value="3">投注</option>
              <option value="4">优惠</option>
              <option value="5">额度转换</option>
              <option value="6">红包</option>
              <option value="7">转点</option>
          </select>
          </p>
        <DateTime></DateTime>
         <button class="search" @click="submit(1,false)">查询</button>
      </div>
      <article v-if="countAll>0">
        <section v-for="(item,index) of dataList" :key="index"> 
          <ul class="main">
            <li>
              <span>时间:</span> 
              <span style="color:#000000" >{{item.tradeDate.slice(0,-2)}}</span> 
              <span class="orderNoBut" v-if="item.orderNo" @click="_queryOrderByNo(item.orderNo)">详情</span> 
              </li>
            <li>
              <ul class="portion">
                <li><span>金额:</span>{{item.tradeAmount}}</li>
                <li><span>交易后:</span>{{item.amountAfter}}</li>
              </ul>
            </li>
            <li>
              <ul class="portion">
                <li><span>类别:</span>{{item.tradeType}}</li>
                <li><span>项目:</span>{{item.tradeItem}}</li>
              </ul>
            </li>
            <li class="comments"><span>备注:</span><p>{{item.tradeRemark}}</p></li>
            <!-- <li class="comments numbers"><span>下单号:</span><p>0，1,2,2,2,2,2,2,2,23,3,3,3,3,3,33,3,3,3,3,6,6,6,6,6,6,6,6,6,6,6,6,66,6,6,66,6,6</p></li> -->
          </ul>
        </section>
      </article> 
    </div>
    <footer>
      <Pagination ref="Pagination" align="right" :allCounts='Number(countAll)' v-on:change="submit" v-on:enter="submit"></Pagination>
    </footer>
    <div class="Assis_tant" v-show="assis_tant" >
     <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant> 
    </div>
     <!-- 模态框 -->
    <yd-popup v-model="showDetail" position="center" width="90%" :close-on-masker="false">
            <div class="model">
            <h3>注单明细<yd-icon @click.native="showDetail=false" name="error-outline" size=".45rem"></yd-icon></h3>
            <ul>
              <li><span>订单号：</span><span style="font-size:11px;">{{dataDetail.orderNo}}</span></li>
              <li><span>下注时间：</span>{{dataDetail.payTime?dataDetail.payTime.slice(0,-2):''}}</li>
              <li><span>注数：</span>{{dataDetail.payTimes}}</li>
              <li><span>注单金额：</span>{{dataDetail.singleAmount}}</li>
              <li><span>彩种：</span>{{dataDetail.lotteryName}}</li>
              <li><span>期号：</span>{{dataDetail.periodNo}}</li>
              <li><span>奖金：</span>{{dataDetail.odds}}</li>
              <li><span>返点：</span>{{dataDetail.rebatePercent}}</li>
              <li><span>玩法：</span>{{dataDetail.gameName}}</li>
              <li><span>开奖状态：</span>{{dataDetail.statusView}}</li>
              <li><span>开奖号码：</span>{{dataDetail.winNumbers}}</li>
              <li><span>中奖金额：</span>{{dataDetail.winAmount}}</li>
              <li><span style="float: left;width: 27%;">下注号码：</span>
              <span style="float: left;width: 73%;">
                <textarea readonly style="border: none;display:block;width: 100%;min-height: 1rem;line-height:12px;padding-top: 0.15rem;font-size: 12px;">{{dataDetail.lotteryNumbers}}</textarea>
              </span>
              </li>
            </ul>
            </div>
    </yd-popup>
  </div>
</template>
<script>
import DateTime from "../common/dateTime.vue";
import Pagination from "../common/pagination.vue";
import { mapActions, mapState } from "vuex";
import Assistant from '../home/dome/assistant.vue';
export default {
  data() {
    return {
      type:'0',
      countAll:0,
      dataList:[],
      assis_tant:false,
      showDetail:false,
      dataDetail:{},
    };
  },
  created() {
    this.submit(1,false);
    // this._queryOrderByNo();
  },
  methods: {
  	...mapActions(['queryOrderByNo']),
    ...mapActions('personal',['myCash']),
    submit: _.debounce(function(page,changePage){
       if (!changePage) {
        this.initPage();
      }
      this.myCash(`${this.type}/${this.global.time.timeStart}/${this.global.time.timeEnd}/${page}`).then((res)=>{
        if(res.code===0){
          this.countAll=res.data.count;
          this.dataList=res.data.dataList;
        }else if(res.code===1){
           this.$dialog.toast({
            mes: res.msg,
            timeout: 1000
          });
        }
      })
    },200),
     // 初始化当前页码
    initPage() {
      if (this.$refs.Pagination) {
        this.$refs.Pagination.currentPage = 1;
      }
    },
    // 查询投注号码
    _queryOrderByNo(orderNo){
      this.showDetail = true,
      this.queryOrderByNo({
        orderNo:orderNo
      }).then( res => {
        if(res.code == 0){
          this.dataDetail = res.data;
        }
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
  },
  components: {
    DateTime,
    Pagination,
    Assistant
  },
  watch: {}
};
</script>
<style lang="less">
@import url("../../../static/css/common.less");
#cashflow {
  .init;
  .container {
    .my-container;
    height: 100%;
    div{
      p{
        margin-bottom: .2rem;
        select{
          border: none;
        }
      }
      .search {
        .my-button(100%;
            1rem;
            #d91d36);
      }
    }
    article{
      .my-article;
       -webkit-overflow-scrolling: touch;
      section{
        margin-bottom: .4rem;
        .main{
         
          .portion{
            display: flex;
            li:nth-child(1){
              flex: 1;
            }
            li:nth-child(2){
              flex: 2;
            }
          }
          li{
            margin-bottom: .05rem;
             span{
            color: #d91d36;
          }
          .orderNoBut{
            display: inline-block;
            margin-left: 0.1rem;
            color: #fff;
            background-color: dodgerblue;
            padding: 0 4px;
            border-radius: 2px;
          }
          }
          .comments{
            display: flex;
            p{
              width: 86%;
              overflow-x: auto;
               -webkit-overflow-scrolling: touch;
              white-space: nowrap;
            }
          }
          .numbers{
             display: flex;
            p{
              width: 78%;
            }
          }
        }
      }

    }
   
  }
   footer{
      .my-footer;
    }
    .Assis_tant{
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    height: calc(100% - 1rem - 0px);
    /* background: #2dabf3; */
  }
  .model{
    background: #fff;
    padding: .2rem .25rem;
    border-radius: 4px;
    overflow: hidden !important;
    h3{
      margin-bottom: .2rem;
      .my-display(space-between;center);
    }
    ul{
      li{
        margin-bottom: .15rem;

      }
    }
    .yd-popup-center.yd-popup-show{
      pointer-events: auto;
      overflow: hidden !important;
    }
  }
}
</style>
