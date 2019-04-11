<template>
  <div id="report">
    <yd-navbar title="个人报表">
      <router-link to="/home" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
       <div slot="right" @click="assisShow()" >
				小助手
			</div>
    </yd-navbar>
    <div class="container">
      <div>
        <p><span>彩类：</span>
          <select  v-model="kindId">
              <option value="">全部</option>
              <option v-for="(item,index) in kName" :value="kId[index]" :key="item">{{item}}</option>
          </select>
          </p>
        <DateTime></DateTime>
        <button class="search" @click="submit">查询</button>
        <section>
            <p>温馨提示：当前查询账号为{{account_name===''?userDetails.account:account_name}} 上次更新时间：{{global.timeFormate(new Date())}} {{global._time(new Date())}} </p>           
        </section>      
      </div>
      <article>
        <section v-for="(item,index) in dataList " :key="index">
          <ul>
            <li>
              <p class="dayTime">报表日期：<span>{{item.dayTime}}</span></p>
            </li>
            <li>
                <p>有效笔数：<span>{{item.cun}}</span></p>
                <p>有效投注：<span>{{item.allAmount}}</span></p>
            </li>
            <li>
              <p class="dayTime" >实际盈亏：<span :class="item.allRealAmount>0?'reds':'greens'">{{item.allRealAmount}}</span></p>
            </li>
              
          </ul>
          <p style="width:100%">操作：
                  <yd-button type="hollow">全部</yd-button>
                  <yd-button type="hollow">中奖</yd-button>
                  <yd-button type="hollow">退码</yd-button>
                  <yd-button type="hollow">有效</yd-button>
                  <yd-button type="hollow">未颁奖</yd-button>
              </p>
        </section>
      </article> 
    </div>
    <!-- <footer>
      <Pagination align="right"></Pagination>
    </footer> -->
    <div class="Assis_tant" v-show="assis_tant" >
     <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant> 
    </div>
    
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
      account: "",
      dataList: [],
      account_name:"",
      assis_tant:false,
      kName:[],
      kId:[],
      kindId:'',
    }
  },
  created() {
    this.submit();
    // console.log(this.kindList,'333');
    this.kindList.forEach(it => {
        it.kindList.forEach( its => {
            this.kName.push(its.kindName);
            this.kId.push(its.kindId);
        })
    });
  },
  methods: {
    ...mapActions(["queryMemberReport"]),
    submit: _.debounce(function() {
      this.queryMemberReport({
        endTime: this.global.time.timeEnd,
        account: this.userDetails.account,
        startTime: this.global.time.timeStart,
        baseLotteryId:this.kindId,
      }).then(res => {
        if (res.code === 0) {
            this.dataList = res.data;
        }else if(res.code === 1){
        //    this.$dialog.toast({
        //     mes: res.msg,
        //     timeout: 1500
        //   });
        }
      });
    }, 200),
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
    Assistant
  },
  watch: {},
   computed: {
    ...mapState("login", ["userDetails"]),
    ...mapState('home', [
				'kindList'
			]),
  }
};
</script>
<style lang="less">
@import url("../../../static/css/common.less");
#report {
  .init;
  padding-bottom: 0;
  .container {
    .my-container;
    height: 100%;
    div {
      p {
        margin-bottom: 0.25rem;
        height: 0.7rem;
        display: flex;
        align-items: center;
        // input {
        //   border: 1px solid #eeeeee;
        //   height: 100%;
        //   text-indent: 7px;
        //   border-radius: 4px;
        //   flex: 1;
        // }
      }
      .search {
        .my-button(100%;
            1rem;
            #d91d36);
      }
      section {
        padding: 0.1rem 0.1rem 0;
        p {
          font-size: 12px;
          margin: 0;
          height: auto;
          color: #a0a0a0;
        }
      }
    }
    article {
      .my-article;
       -webkit-overflow-scrolling: touch;
      section {
        margin-bottom: 0.3rem;
        ul {
          li {
            display: flex;
            margin-bottom: 0.05rem;
            p {
              flex-basis: 50%;
            }
            .dayTime{
                flex-basis: 100%;
            }
            .reds{
                color: red;
            }
            .greens{
                color: green;
            }
          }
        }
      }
    }
  }
  footer {
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
}
</style>
