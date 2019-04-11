<template>
  <div class="awardII">
    <yd-navbar title="开奖结果">
      <!-- <router-link to="/award" slot="left"> -->
        <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
      <!-- </router-link> -->
      <!-- <div slot="right">
        <div style="width: 100%">
          <img src="../../../../static/img/home/runChart.png" alt="" style="display: block;width: 0.35rem;margin: auto">
          <div style="width: 100%;color: #ffffff;font-size: 0.2rem">走势图</div>
        </div>
      </div> -->
    </yd-navbar>
    <div class="awardII_nav_top">
        <div class="Color_time">
          <p>
            <select name="" v-model="indexId">
              <option  v-for="(item,index) in lottery_List" :value="index" v-if="item.baseLotteryClassId != '2'">{{item.name}}</option>
            </select>
            <i class="fa fa-caret-down"></i>
            <span v-show="falst_to" class="">{{queryName}}</span>
          </p>
          <p>
            <select name="" v-model="today">
              <option  v-for="item in dateLists" :value="item">{{item}}</option>
            </select>
            <i class="fa fa-caret-down"></i>
          </p>
        </div>
        <div class="issue_number">
          <div>
            <span>期数</span>
          </div>
          <div>
            <button :class="but_index == '1' ? 'but_index':''" @click="changeNum('1')">号码</button>
            <button :class="but_index == '2' ? 'but_index':''" @click="changeNum('2')">大小</button>
            <button :class="but_index == '3' ? 'but_index':''" @click="changeNum('3')">单双</button>
            <button :class="but_index == '4' ? 'but_index':''" @click="changeNum('4')">质合</button>
          </div>
        </div>
      </div>
      <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" >
        
              <yd-list theme="1" slot="list">
                <!-- <div class="awardII_nav"> -->
                <!-- <div  class="content"> -->
                <div :class="(classId == '6'|| classId == '4')? 'awardII_text_ten' : 'awardII_text'" v-for="(item,index) in winsDragon_List ">
                <div class="awardII_text_left">
                  <p >{{item.awarPeriod}}</p>
                  <p>{{item.awardTime.substring(5,19)}}</p>
                </div>
                <div class="awardII_text_right">
                  <div  v-if="classId == '6'" class="orther pk_Ten">
                    <img v-for="items in sumOfballList[index]" v-if="items != '?'&& but_index == '1'"  :src="'../../../../static/img/'+items+'.png'">
                    <img v-for="items in sumOfballList[index]" v-if="items == '?' && but_index == '1'"  src="../../../../static/img/question.png">
                    <span v-for="items in sumOfballList_dx[index]" v-if="but_index == '2'" class="pk_Ten_das" :value="items" :class="items=='大'?'big':'min'"> {{items}}</span>
                    <span v-for="items in sumOfballList_dxs[index]" v-if="but_index == '3'" class="pk_Ten_dans" :value="items" :class="items=='单'?'big':'min'"> {{items}}</span>
                    <span v-for="items in sumOfballList_dxxs[index]" v-if="but_index == '4'" class="pk_Ten_dans" :value="items" :class="items=='质'?'big':'min'"> {{items}}</span>
                  </div>
                  <div v-else-if="classId == '4'" class="orther ks">
                    <img v-for="items in sumOfballList[index]" v-if="items != '?'&& but_index == '1'"   :src="'../../../../static/img/fast'+items+'.png'">
                    <img v-for="items in sumOfballList[index]" v-if="items == '?'&& but_index == '1'" src="../../../../static/img/fast3_ask.png">
                    <span v-for="items in sumOfballList_dx[index]" v-if="but_index == '2'" class="das" :value="items" :class="items=='大'?'big':'min'"> {{items}}</span>
                    <span v-for="items in sumOfballList_dxs[index]" v-if="but_index == '3'" class="dans" :value="items" :class="items=='单'?'big':'min'"> {{items}}</span>
                    <span v-for="items in sumOfballList_dxxs[index]" v-if="but_index == '4'" class="zhh" :value="items" :class="items=='质'?'big':'min'"> {{items}}</span>
                  </div>
                  <div v-else class="orther">
                    <span v-for="items in sumOfballList[index]" v-if="but_index == '1'">{{items}}</span>
                    <span v-for="items in sumOfballList_dx[index]" v-if="but_index == '2'" class="das" :value="items" :class="items=='大'?'big':'min'"> {{items}}</span>
                    <span v-for="items in sumOfballList_dxs[index]" v-if="but_index == '3'" class="dans" :value="items" :class="items=='单'?'big':'min'"> {{items}}</span>
                    <span v-for="items in sumOfballList_dxxs[index]" v-if="but_index == '4'" class="zhh" :value="items" :class="items=='质'?'big':'min'"> {{items}}</span>
                  </div>
                </div>
            </div>
            <!-- </div> -->
            <!-- </div> -->
            <!-- <div style="height:2.2rem"></div> -->
            </yd-list>
           <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

        <!-- 加载中提示，不指定，将显示默认加载中图标 -->
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

    </yd-infinitescroll>
    <div class="go_bet">
      <button @click="toPath(classId,kindId)">
        <yd-button type="danger">去投{{this.queryName}}</yd-button>
      </button>
    </div>
  </div>
</template>
<script>
  import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';
  import Bscroll from 'better-scroll';
  import { mapState, mapActions, mapMutations } from "vuex";
  import gameConfig from '@/components/bet/createconfig/gameConfig.js'
  export default {
    data(){
      return{
        msg: '开奖结果',
        winsDragon_List: [],
        sumOfballList: [],
        sumOfballList_dx:[],
        sumOfballList_dxs:[],
        sumOfballList_dxxs:[],
        isActiveII:false,
        classId:'',
        kindId:'',
        indexId:"",
        queryName:"",
        lottery_List:[],
        but_index:"1",
        winList:[],
        winsDragon_List_num:[],
        dateLists:[],
        today:"2019-02-27",
        pages:1,
        pageSize: 10,
        falst_to:true,
      }
    },
    created(){
      this.today = moment(Date.parse(new Date())).format('YYYY-MM-DD');
      this.classId = this.$route.query.cId;
      this.kindId =this.$route.query.kid;
      this.queryName = this.$route.query.lName;
      if(this.lotteryList.length != 0) {
				this.lottery_List = this.lotteryList;
			} else if(this.lotteryList.code == '666' || this.lotteryList.length == 0) {
				this.kindSum().then(res => {
					this.lottery_List = this.lotteryList;
				})
      }
      this.dateLists = this.obtainDate();
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
    computed:{
      ...mapState("home", [ "lotteryName","lotteryList", "lotteryId",'openRecordList']),
      ...mapState(["award"]),
    },
    methods:{
			
			...mapActions("bet", ["getGameInfo","getPlayList"]),
      ...mapActions('home',[
        'winsDragon',
        "kindSum",
        'openRecord'
      ]),
      ...mapMutations("bet", ["SET_GAMETYPE"]),
      ...mapMutations('home',[
        'winsDragonList'
      ]),
      ...mapMutations( ['awardLi']),
      _winsDragon(kindId,ClassId,page){
        let that = this;
        let data;
        if(kindId){
          data = kindId;
        }else{
          data = this.$route.query.kid;
        }
        that.winsDragon_List = [];
        that.sumOfballList = [];
        this.openRecord('/'+data+'/'+this.today+'/'+page).then( res => {
          if(res.code == 0){
            that.winsDragon_List = res.data.winList;
            that.jsonArr(that.winsDragon_List);
          }

        })
      },
      // 判断大小
      sumOfballList_das(ClassId,list){
        // console.log(ClassId,list);
        let dx;
        if(ClassId == 5){
          dx = 6
        }else if(ClassId == 4){
          dx = 3
        }else{
          dx = 5
        }
        let minList = [];
            list.forEach(lists => {
              lists.forEach(item =>{
                  if(item>=dx){
                    item = '大';
                  }else if(item < dx){
                    item = '小';
                  }else{
                    item = '?';
                  }
                  minList.push(item); 
              })
            })
            if(ClassId == 1 || ClassId == 4  ){
              this.sumOfballList_dx = this.sliceArray(minList,3);
            }else if(ClassId == 6){
              this.sumOfballList_dx = this.sliceArray(minList,10);
            }else if(ClassId == 3  || ClassId == 5){
              this.sumOfballList_dx = this.sliceArray(minList,5);
            }
      },
      //判断单双
      sumOfballList_dans(ClassId,list){
        // console.log(ClassId,list);
        let minList = [];
            list.forEach(lists => {
              lists.forEach(item =>{
                if(item != '?'){
                  if(item%2 == 0){
                    item = '双';
                  }else if(item%2 != 0){
                    item = '单';
                  }
                }else{
                     item = '？';
                  }
                  minList.push(item); 
              })
            })
            if(ClassId == 1 || ClassId == 4 ){
              this.sumOfballList_dxs = this.sliceArray(minList,3);
            }else if(ClassId == 6){
              this.sumOfballList_dxs = this.sliceArray(minList,10);
            }else if(ClassId == 3  || ClassId == 5){
              this.sumOfballList_dxs = this.sliceArray(minList,5);
            }
      },
    // 判断质数合数
     sumOfballList_zhh(ClassId,list){
        // console.log(ClassId,list);
        let minList = [];
            list.forEach(lists => {
              lists.forEach(item =>{
                if(item != '?'){
                  if(item == '0' || item == '01' || item == '1' ||item == '3' ||item == '03' || item == '7'||item == '07' || item == '5'||item == '05'||item == '11'){
                    item = '质';
                  }else{
                    item = '合';
                  }
                }else{
                     item = '？';
                  }
                  minList.push(item); 
              })
            })
            if(ClassId == 1 || ClassId == 4 ){
              this.sumOfballList_dxxs = this.sliceArray(minList,3);
            }else if(ClassId == 6){
              this.sumOfballList_dxxs = this.sliceArray(minList,10);
            }else if(ClassId == 3  || ClassId == 5){
              this.sumOfballList_dxxs = this.sliceArray(minList,5);
            }
      },


      toPath(classId,kindId){
        	Promise.all([
					this.getGameInfo("/" + kindId), //获取开奖历史
					this.getPlayList(`/${classId}/${kindId}`), //获取小彩类玩法
				]).then((values) => {
					if(values[0].code === 0){
						//缓存开奖数据
						sessionStorage.setItem("gameInfo", JSON.stringify(values[0]));
					}
					if(values[1].code === 0){
						//缓存玩法数据
						sessionStorage.setItem(kindId, JSON.stringify(values[1].data.standGameList));
					}
					this.$router.push({path:"/bet"})
				})
				this.SET_GAMETYPE({
					classId:classId,
					kindId:kindId,
					kindName:this.queryName,
					periodNoAll:gameConfig[kindId].periodNoAll
				})
        sessionStorage.setItem("gameType",JSON.stringify({
					classId:classId,
					kindId:kindId,
					kindName:this.queryName,
					periodNoAll:gameConfig[kindId].periodNoAll
				}));
					sessionStorage.setItem('classId', JSON.stringify(classId));
					sessionStorage.setItem('kindId', JSON.stringify(kindId));
					sessionStorage.setItem('prevPath', "/redPacket");

        },
        // 切换大小单双
        changeNum(index){
          this.but_index =index;
          if(index == 2){
            this.sumOfballList_das(this.classId,this.sumOfballList)
          }else if(index == 3){
            this.sumOfballList_dans(this.classId,this.sumOfballList)
          }else if(index == 4){
            this.sumOfballList_zhh(this.classId,this.sumOfballList)
          }
          
        },
        // 数组分割
        sliceArray(array, size) {
          var result = [];
          for (var x = 0; x < Math.ceil(array.length / size); x++) {
              var start = x * size;
              var end = start + size;
              result.push(array.slice(start, end));
          }
          return result;
        },
        // 获取时间
        obtainDate(){
          var timestamp = Date.parse(new Date()); // 时间
          let datNum = [1,2,3,4];
          let todayList = [moment(timestamp).format('YYYY-MM-DD')];
          datNum.forEach( item => {
            let days =timestamp-(item*24*60*60*1000)
            todayList.push(moment(days).format('YYYY-MM-DD'))
          })
          return todayList
        },
        //上拉加载
        loadList(){
          let that = this;
          that.pages++;
          this.openRecord('/'+that.kindId+'/'+that.today+'/'+that.pages).then( res => {
            const _list = res.data.winList.reverse();
            that.winsDragon_List = that.winsDragon_List.concat(_list);
             that.jsonArr(that.winsDragon_List);
                    if (_list.length < that.pageSize) {
                        /* 所有数据加载完毕 */
                        that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                        return;
                    }
                    /* 单次请求数据完毕 */
                    that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
          })
          
        },
        // 解析数组
        jsonArr(arr){
          let that = this;
          that.sumOfballList = [];
          arr.forEach( item => {
              // item['className'] = this.$route.query.lName;
              if(that.classId == 6 || that.classId == 1){
                item['awarPeriods'] = item.awarPeriod;
              }else if(that.classId == 4 || that.classId == 5){
                item['awarPeriods'] = item.awarPeriod.slice(4);
              }else if(that.classId == 3){
                item['awarPeriods'] = item.awarPeriod.slice(4);
              }
              if(item.awardNum == null && that.classId == 6){
                that.isActiveII = true;
                that.sumOfballList.push(['?','?','?','?','?','?','?','?','?','?']);
              }else if(item.awardNum == null && (that.classId == 4 || that.classId == 1)){
                that.isActiveII = false;
                that.sumOfballList.push(['?','?','?']);
              }else if(item.awardNum == null){
                that.isActiveII = false;
                that.sumOfballList.push(['?','?','?','?','?']);
              } else {
                that.isActiveII = false;
                that.sumOfballList.push(item.awardNum.split(','));
              }
            })
            that.changeNum(that.but_index)
        }

      },
    watch:{
      indexId(){
        // console.log(this.indexId)
        console.log(this.falst_to);
        this.falst_to = false;
        this.but_index = 1;
        this.pages = 1;
        this.classId = this.lottery_List[this.indexId].baseLotteryClassId;
        this.kindId = this.lottery_List[this.indexId].baseLotteryId;
        this.queryName = this.lottery_List[this.indexId].name;
        this._winsDragon(this.kindId,this.classId,1)
      },
      today(){
        this.but_index = 1;
        this.pages = 1;
        this._winsDragon(this.kindId,this.classId,1)
      },
      
    }
  }
</script>
<style>
  .awardII{
    /*overflow: hidden;*/
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction:column; 
    
  }
  .awardII .yd-list-theme1{
    padding-top: 2.4rem;
    /* padding-bottom: 1.1rem; */
  }
  
  .awardII_nav{
    flex: 1;
    overflow: scroll;
    padding-top: 2.4rem;
    /* min-height: 100%; */
    width: 100%;
    background: #f9f9f9;
    /* overflow: hidden; */
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  }
  .awardII .yd-navbar{
    /* background: #011935 !important; */
    background: linear-gradient(135deg,rgba(19,46,123,1) 0,rgba(0,201,202,1) 100%) !important;
  }
  .awardII .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .awardII .yd-navbar span{
    color: #ffffff !important;
  }
  .awardII_text .yd-cell-item, .awardII_text_ten .yd-cell-item{
    float: left;
    width: 20%;
  }
  .awardII_text, .awardII_text_ten{
    height: 1.05rem;
    border-bottom: 1px solid #dfdfdf;
    box-sizing: border-box;
    padding: 0.1rem;
  }
  .awardII_text:nth-child(1){
    background-color: #fcf8ef !important;
  }
  .awardII_text_ten:nth-child(1){
    background-color: #fcf8ef !important;
  }
  .awardII_text:nth-child(1) li {
    color: #ffffff !important;
    background: #dd1c37 !important;
  }
  .awardII_text:nth-child(1) li:nth-last-child(1) {
    color: #ffffff !important;
    background: #50a5f6 !important;
  }
  .awardII_text_left{
    float: left;
    width: 30%;
    text-align: left;
    font-size: 0.3rem
  }
  .awardII_text_left p{
    width: 100%;
    text-align: center;
    height: 0.4rem;
    line-height: 0.4rem;
    color: #a8a8a8;
  }
  .awardII_text_left p:nth-child(1){
    color: #1378bd;
  }
  .awardII_text_left p:nth-child(2){
    font-family: 宋体;
  }
  .awardII_text div:nth-child(2), .awardII_text_ten div:nth-child(2){
    float: left;
    width: 70%;
    height: 0.8rem;
    text-align: center;
    box-sizing: border-box;
    padding: 0.1rem 0.2rem;
    font-size: 0.25rem;
  }

  .pk_ten{
    color: #dd1c37 !important ;
    height: 0.4rem !important;
    width: 0.4rem !important;
    text-align: center;
    line-height: 0.5rem !important;
    background: #f9f9f9 !important;
    margin: 0.15rem 0.02rem !important;
  }
  .pk_ten div img {
    width: .4rem;
    height: .4rem;
  }
  .pk_ten .ks_img img {
    width: .7rem;
    height: .7rem;
  }
  .awardII_text div:nth-child(2) p{
    line-height: 0.7rem;
    color: #717171;
  }
  .awardII_text_ten div:nth-child(2) p{
    line-height: 0.7rem;
    color: #717171;
  }
  .go_bet{
    width: 100%;
    height: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    /* background: #011935; */
    background: linear-gradient(135deg,rgba(19,46,123,1) 0,rgba(0,201,202,1) 100%) !important;
    line-height: 1rem;
  }
  .go_bet button{
    background: #dd1c37;
    border: 0;
    border-radius: 0.08rem;
  }
  .new_img{
    position: absolute;
    top: -0.1rem;
    right: -0.8rem;
    display: inline-block;
    height: 0.38rem;
    width: 0.75rem;
    background-color: #f18f49;
    color: white;
    font-size: 12px !important;
    text-align: center;
    line-height: 0.4rem;
    border-radius: 0.08rem;
    font-family:新宋体 ;
  }
  .awardII_nav_top{
    position:fixed;
    top: 1rem;
    left: 0;
    height: 1.4rem;
    width: 100%;
    font-size: 0.3rem;
    z-index: 10;
    background-color: #fff;
  }
  .awardII_nav_top .Color_time{
    height: 0.8rem;
    padding: 0.1rem;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    
  }
  .awardII_nav_top .issue_number{
    height: 0.6rem;
    padding: 0.1rem;
    box-sizing: border-box;
    width: 100%;
    background: #ededed;
    border-bottom: 1px solid #dfdfdf;
  }
  .Color_time p{
    float: left;
    width: 35%;
    margin-right: 3%;
    height: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 2px;
  }
  .Color_time select{
    border: 0;
    height: 0.6rem;
    line-height: 0.6rem;
  }
  .Color_time span{
    position: absolute;
    left: 0.3rem;
    top: 0.2rem;
    
  }
  .issue_number div{
    float: left;
  }
  .issue_number div:nth-child(1){
    width: 32%;
    height: 0.4rem;
    line-height: 0.4rem;
    border-right: 1.5px solid #dfdfdf;
  }
  .issue_number div:nth-child(2){
    width: 68%;
  }
  .issue_number button{
    border: 0;
    padding: 0.02rem 0.1rem;
    background: #2061b3;
    color: #fff;
    text-decoration: none;
    border-radius: 2px;
  }
  .awardII_text_right{
    float: left;
    width: 70% !important;
  }
  .awardII .orther{
    width: 100%;
  }
  .awardII .orther img{
    display: inline-flex;
    flex-wrap:nowrap;
    justify-content:space-around;
  }
  .awardII .orther span{
    display: inline-flex;
    flex-wrap:nowrap;
    justify-content:space-around;
    width: 0.6rem;
    height: 0.6rem;
    font-weight: 700;
    line-height: 0.65rem;
    box-shadow: inset 1px -6px 10px #fff;
    background: #ededed;
    border-radius: 50%;
    border: 1px solid #d7d7d7;
    margin-right: 0.05rem;
  }
  .awardII .ks img{
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0;
  }
  .awardII .pk_Ten img{
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.05rem;
    margin-top: 0.1rem;
  }
  .awardII .but_index{
    background: #fff !important;
    color: #111 !important;
  }
  .awardII .orther .das{
    background-color: #1a68de !important;
    border: 0 !important;
    color: #fff;
    box-shadow: inset 0px 0px 0px #fff;
  }
  .awardII .pk_Ten_das, .pk_Ten_dans{
    width: 0.42rem !important;
    height: 0.42rem !important;
    margin-right: 0.02rem !important;
    line-height: 0.4rem !important;
    border-radius: 2px !important;
    margin-top: 0.1rem;
    border: 0 !important;
  }
  .awardII .orther .big{
    background-color: #1a68de !important; 
    box-shadow: inset 0px 0px 0px #fff;  
    color: #fff;
    border: 0 !important;
  }
  .awardII .orther .min{
    background-color: orange !important;   
    box-shadow: inset 0px 0px 0px #fff;
    color: #fff;
    border: 0 !important;
  }     

</style>
