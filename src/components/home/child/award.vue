<template>
  <div class="award">
    <div>
      <yd-navbar title="开奖历史">
        <!-- <router-link to="/" slot="left"> -->
        <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
        <!-- </router-link> -->
        <div slot="right" @click="assisShow()">
          小助手
        </div>
      </yd-navbar>
      <div class="award_nav_head">
        <span>彩种类型：</span>
        <div>
          <select slot="right" v-model="classId">
              <option v-for="(item,index) in kind_List" :value="item.classId" v-show="item.className != '六合彩'" >{{item.className}}</option>
            </select>
          <i class="fa fa-caret-down"></i>
        </div>
      </div>
    </div>
    <div class="award_nav">
      <div class="content">
        <div class="award_nav_text" v-for="(item,index) in winHistory_list">
          <div>
            <span class="award_nav_text_lotteryName">{{item.lotteryName}}</span>
            <span>第{{item.periodNos}}期</span>
            <span class="award_nav_text_awardTimes">{{item.awardTimes}}</span>
          </div>
          <div>
            <!-- <img class="lotteryLogo" :src="'../../../../static/img/icon/'+item.baseLotteryId+'.png'" alt=""> -->
            <ul>
              <li v-for="item in winHistory_list_num[index]" :class="(classId == '6' || classId == '4')?'pkTen':''">
                <div v-if="classId == '6'">
                  <img v-if="classId == '6' && item == '01'" src="../../../../static/img/1.png">
                  <img v-if="classId == '6' && item == '02'" src="../../../../static/img/2.png">
                  <img v-if="classId == '6' && item == '03'" src="../../../../static/img/3.png">
                  <img v-if="classId == '6' && item == '04'" src="../../../../static/img/4.png">
                  <img v-if="classId == '6' && item == '05'" src="../../../../static/img/5.png">
                  <img v-if="classId == '6' && item == '06'" src="../../../../static/img/6.png">
                  <img v-if="classId == '6' && item == '07'" src="../../../../static/img/7.png">
                  <img v-if="classId == '6' && item == '08'" src="../../../../static/img/8.png">
                  <img v-if="classId == '6' && item == '09'" src="../../../../static/img/9.png">
                  <img v-if="classId == '6' && item == '10'" src="../../../../static/img/10.png">
                  <img v-if="classId == '6' && item == '?'" src="../../../../static/img/question.png">
                </div>
                <div v-else-if="classId == '4'" class="ks_img">
                  <img v-if="classId == '4' && item == '1'" src="../../../../static/img/fast1.png">
                  <img v-if="classId == '4' && item == '2'" src="../../../../static/img/fast2.png">
                  <img v-if="classId == '4' && item == '3'" src="../../../../static/img/fast3.png">
                  <img v-if="classId == '4' && item == '4'" src="../../../../static/img/fast4.png">
                  <img v-if="classId == '4' && item == '5'" src="../../../../static/img/fast5.png">
                  <img v-if="classId == '4' && item == '6'" src="../../../../static/img/fast6.png">
                  <img v-if="classId == '4' && item == '?'" src="../../../../static/img/fast3_ask.png">
                </div>
                <span v-else>{{item}}</span>
              </li>
            </ul>
            <router-link @click.native="awardRes(item.baseLotteryId,item.lotteryName,classId)" tag="div" class="but_right" :to="{ name:'awardII',query:{kid:item.baseLotteryId,lName:item.lotteryName,cId:classId}}"></router-link>
          </div>
        </div>
        <div style="height:1.8rem"></div>
      </div>
    </div>
    <!-- 小助手 -->
    <div class="Assis_tant" v-show="assis_tant">
      <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll';
  import {
    mapState,
    mapActions,
    mapMutations
  } from "vuex";
  import Footer from '../dome/home_foot.vue'
  import Assistant from '../dome/assistant.vue';
  export default {
    data() {
      return {
        mag: '开奖历史',
        kind_List: [],
        classId: '',
        winHistory_list: [],
        winHistory_list_num: [],
        isActiveI: false,
        assis_tant: false,
      }
    },
    components: {
      Assistant,
      Footer
    },
    created() {
      this._kind();
      this._winHistory();
      this.getClassId();
    },
    mounted() {
      this.$nextTick(() => {
        let scroll = new Bscroll(this.$refs.wrapper, {
          scrollbars: true,
          listenX: true,
          click: true,
        })
        scroll.on('scrollEnd', this.scrollEnd);
        scroll.on('scrollStart', this.scrollStart);
      })
    },
    computed: {
      ...mapState('login', [
        'userDetails'
      ]),
      ...mapState('home', [
        'kindList',
        '_saveclassId'
      ]),
      ...mapState(["award"]),
    },
    methods: {
      ...mapActions('home', [
        'kind',
        'winHistory'
      ]),
      ...mapActions('bet', [
        'recentOpenCode',
      ]),
      ...mapMutations('home', [
        'winHistoryList',
        'saveClassId'
      ]),
      ...mapMutations(['awardLi']),
      // 获取所有彩种
      _kind() {
        let that = this;
        this.kind().then(res => {
          that.kind_List = res.data;
        })
      },
      _winHistory() {
        let that = this;
        let data = that.classId;
        that.winHistory_list_num = [];
        this.winHistory(data).then(res => {
          if (res.code == 0) {
            that.winHistory_list = res.data;
            that.winHistory_list.forEach(item => {
              if (item.periodNo == null || item.periodNo == '' || item.periodNo == undefined) {
                item['periodNos'] = '--';
              } else {
                item['periodNos'] = item.periodNo.substring(4);
              };
              if (item.awardTime == null || item.awardTime == '' || item.awardTime == undefined) {
                item['awardTimes'] = "00:00:00";
              } else {
                item['awardTimes'] = item.awardTime.substring(10, 19);
              }
              if (item.winNum == null && that.classId == 6) {
                that.isActiveI = true;
                that.winHistory_list_num.push(['?', '?', '?', '?', '?', '?', '?', '?', '?', '?']);
              } else if (item.winNum == null && (that.classId == 4 || that.classId == 1)) {
                that.isActiveI = false;
                that.winHistory_list_num.push(['?', '?', '?']);
              } else if (item.winNum == null) {
                that.isActiveI = false;
                that.winHistory_list_num.push(['?', '?', '?', '?', '?']);
              } else {
                that.isActiveI = false;
                that.winHistory_list_num.push(item.winNum.split(','));
                // that.winHistory_list_num.push(['02','06','09','10','08','01','03','05','04','07'])
              }
            });
          }
        })
      },
      awardRes(kindId,className,class_Id) {
        console.log(kindId,className,class_Id)
        this.saveClassId({classId: this.classId})
        this.winHistory_list_num = [];
        this.awardLi({
          kindId:kindId,
          className:className,
          classId:class_Id,
        });
      },
      getClassId() {
        this.classId = this._saveclassId
      },
      // 小助手
      assisShow() {
        if (this.assis_tant == false) {
          this.assis_tant = true;
        } else {
          this.assis_tant = false;
        }
        // console.log(this.assis_tant)
      }
    },
    watch: {
      classId() {
        this._winHistory()
      }
    }
  }
</script>
<style>
  .award .yd-navbar-center-box {
    height: 45px !important;
  }
  .award {
    height: 100%;
    text-align: center;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    /* position: relative; */
  }
  .award_nav {
    overflow: scroll;
    position: absolute;
    top: 2rem;
    left: 0;
    /* padding-top: 2rem;  */
    height: 100%;
    width: 100%;
    background: #f9f9f9;
    box-sizing: border-box;
    flex: 1;
    -webkit-overflow-scrolling: touch;
    /* padding-bottom: 2rem; */
  }
  .award .yd-navbar {
    /* background: #011935 !important; */
    /* position: fixed !important;
      top: 0;
      left: 0; */
    z-index: 100;
  }
  .award .yd-navbar .yd-navbar-item i {
    color: #ffffff !important;
  }
  .award .yd-navbar span {
    color: #ffffff !important;
  }
  .award_nav_head {
    position: fixed;
    top: 45px;
    left: 0;
    height: 45px;
    width: 100%;
    color: #000000;
    box-sizing: border-box;
    /* border-bottom: 0.125rem solid #dfdfdf; */
    z-index: 10;
    background: #ffffff;
  }
  .award_nav_head span {
    float: left;
    height: 45px;
    width: 30%;
    line-height: 45px !important;
    font-size: 0.3rem;
    color: #000000;
  }
  .award_nav_head div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 0.6rem;
    line-height: 0.6rem;
    box-sizing: border-box;
    border: 1px solid #dfdfdf;
    margin-top: 0.15rem;
    border-radius: 2px;
  }
  .award_nav_head select {
    color: #2c3e50;
    font-size: 0.3rem;
    font-family: Gabriola;
    border: 0;
    margin-right: 0.2rem;
  }
  .award_nav_head img {
    float: right;
    /* height: 0.4rem; */
  }
  .award_nav_text {
    height: 1.8rem;
    border-bottom: 0.03rem solid #dfdfdf;
    box-sizing: border-box;
    padding: 0.2rem 0.2rem 0.1rem 0.2rem;
  }
  .award_nav_text div:nth-child(1) {
    height: 0.4rem;
    color: #000000;
    text-align: left;
    font-size: 0.3rem;
  }
  .award_nav_text div:nth-child(2) {
    height: 1rem;
    text-align: left;
    box-sizing: border-box;
    padding: 0.15rem 0;
    font-size: 0.25rem;
  }
  .award_nav_text div:nth-child(3) {
    height: 0.7rem;
    text-align: right;
    color: #a6a6a6;
  }
  .award_nav_text div:nth-child(2) ul {
    float: left;
    min-width: 4rem;
    padding-top: 0.1rem;
  }
  .award_nav_text .lotteryLogo{
    float: left;
    height: 0.75rem;
    width: 0.75rem;
    margin-right: 0.25rem;
  }
  .award_nav_text div:nth-child(2) ul li {
    color: #ffffff;
    height: 0.6rem;
    width: 0.6rem;
    border-radius: 0.6rem;
    background: #dd1c37;
    text-align: center;
    line-height: 0.7rem;
    float: left;
    margin: 0 0.08rem;
    font-size: 0.35rem;
  }
  .pkTen {
    color: #dd1c37 !important;
    width: 0.55rem !important;
    text-align: center;
    line-height: 0.62rem;
    background: #f9f9f9 !important;
    margin: 0 0 !important;
  }
  .pkTen div img {
    width: .5rem;
    height: .5rem;
  }
  /* .pkTen .ks_img img {
    width: .7rem;
    height: .7rem;
  } */
  .award_nav_text div:nth-child(2) p {
    line-height: 0.7rem;
    color: #717171;
    float: left;
  }
  .but_right {
    float: right;
    background: url("../../../../static/img/home/go_right.png") no-repeat;
    width: 0.5rem;
    height: 0.8rem;
    padding: 0.15rem 0;
  }
  .award .Assis_tant {
    position: fixed;
    top: 45px;
    left: 0;
    width: 100%;
    height: calc(100% - 1rem - 0px);
    z-index: 1001;
    /* background: #2dabf3; */
  }
  .award_nav_text_lotteryName{
    color: #f77b16;
    font-size: 0.35rem !important;
  }
  .award_nav_text_awardTimes{
    float: right;
    line-height: 0.5rem;
    color: #999999 !important;
  }
</style>
