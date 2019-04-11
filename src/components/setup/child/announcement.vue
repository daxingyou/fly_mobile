<template>
  <div class="announcement">
    <yd-navbar title="站内信">
      <!-- <router-link to="/allKinds" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link> -->
      <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
    </yd-navbar>
    <div class="announcement_nav">
      <yd-tab dot='true'  >
        <yd-tab-panel label="最新公告" >
          <yd-accordion>           
            <yd-accordion-item v-for="(item,index) in MemberNoticeListA" v-show="nav_list_a"  :title=item.title  :key="index" :auto="false" ref="accordionA">
             
              <!-- <div slot="icon">【重要通知】</div> -->
               <div slot="txt" @click="open(index,item.id,item.isShow,1)" style="width:60%;height:0.4rem;line-height: 0.4rem;font-size: 0.28rem;">
                <span class="headerII_tel_s" >{{item.lcd}}</span>
              </div>
              <div class="announcement_nav_text">
                <div class="text_div">
                  <span class="b">标题：</span>
                  <span>{{item.title}}</span>
                </div>
                <div class="text_div">
                  <p>
                    <span class="b">内容</span>
                  </p>
                  <textarea cols="30" rows="10" >
                    {{item.content}}
                  </textarea>
              </div>
              </div>
            </yd-accordion-item>    
          </yd-accordion>
          <div class="no_list" v-if="nav_list_a==false">
            <img class="snnouncement_kong" src="../../../../static/img/setup/snnouncement_kong_03.png" alt="">
            <p>暂无最新公告哦~</p>
            <div>大奖不等待，一元中千元大奖</div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="最新消息" >
          <yd-accordion>           
            <yd-accordion-item v-for="(item,index) in MemberNoticeListB" v-show="nav_list_b"  :title=item.title  :key="index" :auto="false" ref="accordionB">
              <!-- <div slot="icon">【最新消息】</div> -->
              <div slot="txt" @click="open(index,item.id,item.isShow,2)" style="width:60%;height:0.4rem;line-height: 0.4rem;font-size: 0.28rem;">
                <span class="headerII_tel_s" >{{item.lcd}}</span>
              </div>
              <div class="announcement_nav_text">
                <div class="text_div">
                  <span class="b">标题：</span>
                  <span>{{item.title}}</span>
                </div>
                <div class="text_div">
                  <p>
                    <span class="b">内容</span>
                  </p>
                  <textarea cols="30" rows="10" >
                    {{item.content}}
                  </textarea>
              </div>
              </div>
            </yd-accordion-item>    
          </yd-accordion>
          <div class="no_list" v-if="nav_list_b==false">
            <img class="snnouncement_kong" src="../../../../static/img/setup/snnouncement_kong_03.png" alt="">
            <p>暂无最新消息哦~</p>
            <div>大奖不等待，一元中千元大奖</div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="站内私信" >
          <yd-accordion>           
            <yd-accordion-item v-for="(item,index) in NoticeAlertList" v-show="nav_list_c"  :title=item.title :key="index" :auto="false" ref="accordionC" >
              <!-- <div slot="icon">【站内私信】</div> -->
              <div slot="txt" @click="open(index,item.id,item.isRead,3)" style="width:60%;height:0.4rem;line-height: 0.4rem;font-size: 0.28rem;">
                <span class="headerII_tel_i" v-if="item.isRead != 1">新</span>
                
                <span class="headerII_tel_s" >{{item.sentTime}}</span>
              </div>
              <div class="announcement_nav_text" >
                <span class="headerII_tel_p" v-if="item.isRead == 1" @click="Delete(item.id)">删除</span>
                <p class="text_p">发送时间：{{item.sentTime}}</p>
                <div class="text_div">
                  <span class="b">标题：</span>
                  <span>{{item.title}}</span>
                </div>
                <div class="text_div">
                  <p>
                    <span class="b">发送人：</span>
                  <span>{{item.sentPersonName}}</span>
                  </p>
                  <p>
                    <span class="b">内容</span>
                  </p>
                  <textarea cols="30" rows="10" readonly>
                    {{item.content}}
                  </textarea>
                   
                </div>
              </div>
            </yd-accordion-item>    
          </yd-accordion>
          <div class="no_list" v-if="nav_list_c==false" >
            <img class="snnouncement_kong" src="../../../../static/img/setup/snnouncement_kong_03.png" alt="">
            <p>暂无站内私信哦~</p>
            <div>大奖不等待，一元中千元大奖</div>
          </div>
        </yd-tab-panel>
      </yd-tab>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    data(){
      return{
        msg: "站内信",
        MemberNoticeListA:[],
        MemberNoticeListB:[],
        NoticeAlertList:[],
        nav_list_a:false,
        nav_list_b:false,
        nav_list_c:false,
        b:false,
        isOpen: false
      }
    },
    created(){
      this.queryMember();
      this.queryMembers();
      this.NoticeAlert();
      // console.log(this.that.queryMemberNoticeList1,'111');
      // console.log(this.that.queryMemberNoticeList2,'222');
    },
    methods:{
      ...mapActions('home',[
        "queryMemberNoticeList",
        "queryNoticeAlertList",
        "deleteNoticeAlert",
        "updateNoticeAlert",
      ]),
      queryMember(){
        let that = this;
        this.queryMemberNoticeList("?notice_type=2&type=1").then(res=>{
          console.log('aaa')
          if(res.code == 0){
            that.MemberNoticeListA = res.data;
            if(that.MemberNoticeListA.length == 0){
              that.nav_list_a = false;
            }else if (that.MemberNoticeListA.length != 0){
              that.nav_list_a = true;
            }
          }
        });
        console.log(that.MemberNoticeListA,'aaa')
      },
      queryMembers(){
        let that = this;
        this.queryMemberNoticeList("?notice_type=3").then(res=>{
          console.log(res,'bbb')
          if(res.code == 0){
            that.MemberNoticeListB = res.data;
            if(that.MemberNoticeListB.length == 0){
              that.nav_list_b = false;
            }else if (that.MemberNoticeListB.length != 0){
              that.nav_list_b = true;
            }
            console.log(that.MemberNoticeListB,'bbb')
          }
        });
        
      },
      NoticeAlert(){
        let that = this;
        let account = that.userDetails.account;
         this.queryNoticeAlertList("?is_read="+''+"&memberid="+account).then(res =>{
            if(res.code == 0){
              that.NoticeAlertList = res.data;
              if(that.NoticeAlertList.length == 0){
                  that.nav_list_c = false;
              }else if(that.NoticeAlertList.length != 0){
                  that.nav_list_c = true;
              }
            }
          })
          console.log(that.NoticeAlertList,'ccc')
      },
      showList(){
        this.b = true;
      },
      open(ind,id,isRead,num) {
        // console.log(ind,id,isRead,num);
        let listNum;
        if(num == 1){
          listNum = this.$refs.accordionA;
        }else if(num == 2){
          listNum = this.$refs.accordionB;
        }else if(num == 3){
          listNum = this.$refs.accordionC;
        };
        this.isOpen = !this.isOpen;
                if (this.isOpen) {
                    listNum[ind].openItem();
                } else {
                    listNum[ind].closeItem();
                }
                if(isRead != 1){
                  this.updateNoticeAlert("?messageId="+id).then(res => {
                    if(res.code == 0){
                      this.NoticeAlert()
                    }
                  })
                }
            },
      Delete(id){
        this.deleteNoticeAlert("?messageIds="+id).then( res => {
          if(res.code == 0){
            this.NoticeAlert()
          }
        })
      },
    },
    computed:{
      ...mapState('login',[
        'userDetails'
      ]),
      ...mapState('home',[
        'queryMemberNoticeList1',
        "queryMemberNoticeList2"
      ])
    },
  }
</script>
<style lang="less">
  .announcement{
    height: 100%;
    background-color: #f6f6f6;
  }
  .announcement_nav{
    overflow: hidden;
    padding-top: 1rem;
    background: #fff;
    /*height: 100%;*/
    box-sizing: border-box;
  }
  .announcement .yd-navbar{
    // background: #011935 !important;
  }
  .announcement .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .announcement .yd-navbar span{
    color: #ffffff !important;
  }
  .announcement .yd-tab-panel{
    background-color: #f6f6f6;
    // padding: 0 2%;
    width: 100%;
    .nav_list{
      height: 1rem;
      background: #ffffff;
      margin: 0.15rem auto 0.2rem;
      line-height: 1rem;
      font-size: 0.3rem;
      padding: 0 0.25rem;
      box-sizing: border-box;
      h1{
        width: 27%;
        float: left;
      }
      div{
        width: 38%;
        float: left;
      }
      p{
        width: 35%;
        float: left;
        // background-color: #f6f6f6;
      }
    }
  }
  .no_list{
    text-align: center;
    padding-top: 15%;
    background-color: #f6f6f6;
    font-size: 0.35rem;
    z-index: 10;
    .snnouncement_kong{
      width: 90%;
      height: 60%;
      margin: auto;
    }
    p{
      color: #363636;
      margin-bottom: 0.2rem;
    }
    div{
      color: #a6a6a6;
    }
  }
  .announcement .yd-accordion-title{
    min-width: 40%;
  }
  .announcement .yd-accordion{
    overflow: hidden;
    background: #f6f6f6;
  }
  .announcement .yd-accordion-head{
    margin: 0.2rem 0 0 0;
    background: #fff;
    height: 1rem;
  }
  .announcement .yd-accordion-content{
    background: #fff;
    padding:0 0.2rem;
    box-sizing: border-box;
  }
  .announcement_nav_text{
    font-size: 0.28rem;
    padding: 0.2rem;
    box-sizing: border-box;
    position: relative;        
  }
   .headerII_tel_i{
    float: right;
    height: 0.4rem !important;
    width: 0.8rem !important;
    border-radius: 3px;
    background-color: red;
    color: #fff;
    text-align: center;
    line-height: 0.4rem;
    margin-right: 0.2rem;
    
  }
  .headerII_tel_p{
    float: right;
    height: 0.4rem !important;
    width: 0.8rem !important;
    border-radius: 3px;
    background-color: #2d8cf0;
    color: #fff;
    text-align: center;
    line-height: 0.4rem;
    margin-right: 0.2rem;
    position: absolute;
    top: 0.2rem !important;
    right: 0px !important;
  }
  .headerII_tel_s{
    float: right;
    width: 70% !important;
    text-align: center;
    line-height: 0.4rem;
    margin-right: 0.2rem;
  }
  .text_div{
    border: 1px solid #f1f1f1;
    box-sizing: border-box;
    padding: 0.1rem;
    margin: 0.1rem 0;
    border-radius: 0.1rem;
    .b{
      font-weight: 700;
    }
    textarea{
      width: 100%;
      height: 3rem;
      border:0 !important;
      text-align: left;
    }
  }
  .item_i{
     display: inline;
                        height: 6px !important;
                        width: 6px !important;
                        border-radius: 100%;
                        background-color: red;
                        position: absolute;
                        top: 0px !important;
                        right: -5px !important;
  }              
</style>
