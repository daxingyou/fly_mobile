<template>
    <div id="personalReport">
      <yd-navbar title="个人报表">    
        <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>    
        <div slot="right" @click="assisShow()" >
				小助手
			</div>      
      </yd-navbar>
    <div class="container">
      <div>
        <p><span>彩类：</span>
         <select v-model="kindType">
           <option value="">全部</option>
           <option v-for="(item,index) of kindList" :value="item.kindId" :key="index">{{item.kindName}}</option>
         </select>
        </p>
        <DateTime></DateTime>
          <button class="search" @click="submit">查询</button>
      </div>        
         <article>
             <section v-for="(item,index) of dataList" :key="index">
                 <p><span>报表日期：</span>{{item.dayTime}}</p>
                 <p><span>有效笔数：</span>{{item.cun}}</p>
                 <p><span>有效投注：</span>{{item.allAmount}}</p>
                 <p><span>实际盈亏：</span>{{item.allRealAmount}}</p>
                 <p><span>我的操作：</span>
                    <button @click="routePush('',item.dayTime,account?account:userDetails.account,kindType)">全部</button>
                    <button @click="routePush('0',item.dayTime,account?account:userDetails.account,kindType)">中奖</button>
                    <button @click="routePush('4,5',item.dayTime,account?account:userDetails.account,kindType)">退码</button>
                    <button @click="routePush('0,1,2',item.dayTime,account?account:userDetails.account,kindType)">有效</button>
                    <button @click="routePush('2',item.dayTime,account?account:userDetails.account,kindType)">未颁奖</button></p>
             </section>
         </article>  
    </div>
    <!-- <footer>
        <Pagination ref="Pagination" align="right" :allCounts='Number(countAll)'></Pagination>
    </footer> -->
      <div class="Assis_tant" v-show="assis_tant" >
      <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant> 
      </div>
    </div>
</template>
<script>
import DateTime from "../common/dateTime.vue";
import Pagination from "../common/pagination.vue";
import Assistant from '../home/dome/assistant.vue';
import { mapActions, mapState } from "vuex";
import cache from "../../../utils/cache.js";
export default {
  data() {
    return {
      dataList: [],
      //总条数
      countAll: 0,
      account: "",
      kindList: [],
      //彩类id
      kindType: "",
      assis_tant:false,
    };
  },
  created() {
    //获取跳转过来的账号
    if (this.$route.query.account) {
      this.account = this.$route.query.account;
    }
    this.submit();
    this.kinds();
  },
  methods: {
    ...mapActions('personal',["queryMemberReport"]),
    ...mapActions("home", ["kind"]),
    //查询
    submit: _.debounce(function() {
      this.queryMemberReport({
        account: this.account ? this.account : this.userDetails.account, //跳转过来就用跳转过来的账号，否则用登录账号
        baseLotteryId: this.kindType,
        endTime: this.global.time.timeEnd,
        startTime: this.global.time.timeStart
      }).then(res => {
        if (res.code === 0) {
          this.dataList = res.data;
          cache.setSession("dataList_p", res.data);
        } else if (res.code === 1) {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
        }
      });
    }, 300),
    // // 小助手
      assisShow(){
        if(this.assis_tant == false){
          this.assis_tant = true;
        }else{
          this.assis_tant = false;
        }
        
        // console.log(this.assis_tant)
      },
    //跳转到 全部 中奖。。页面

    routePush(status, dayTime, account,kindType) {
      this.$router.push({
        name: "reportAll",
        query: { status, dayTime, account,kindType}
      });
    },
    //所有彩类
    kinds() {
      if (!cache.getSession("kinds")) {
        this.kind().then(res => {
          console.log(res.data);
          if (res.code === 0) {
            for (let item of res.data) {
              for (let cate of item.kindList) {
                this.kindList.push(cate);
              }
            }
            cache.setSession("kinds", this.kindList);
          }
        });
      } else {
        this.kindList = JSON.parse(cache.getSession("kinds"));
      }
    }
  },
  components: {
    DateTime,
    Pagination,
    Assistant,
  },
  computed: {
    ...mapState("login", ["userDetails"])
  },
  //从个人报表全部，中奖。。跳的个人报表页面缓存
  beforeRouteEnter(to, from, next) {
    if (from.name === "reportAll") {
      next(vm => {
        vm.dataList = JSON.parse(cache.getSession("dataList_p"));
      });
    } else {
      next();
    }
  }
};
</script>
<style lang="less">
@import url("../../../static/css/common.less");
#personalReport {
  .init;
  padding-bottom: 0;
  .container {
    .my-container;
    height: 100%;
    div {
      p {
        .my-display(none;center);
        margin-bottom: 0.2rem;
        span {
          display: block;
        }
        select {
          border: none;
        }
      }
      .search {
        .my-button(100%;
            1rem;
            #d91d36);
      }
    }
    article {
      .my-article;
       -webkit-overflow-scrolling: touch;
      section {
        margin-bottom: 0.25rem;
        p {
          margin-bottom: 0.1rem;
        }
        button {
          border: 1px solid #7d7d7d;
          padding: 0.07rem 0.1rem;
          margin-right: 0.06rem;
          border-radius: 4px;
          &:active {
            background: #999;
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


