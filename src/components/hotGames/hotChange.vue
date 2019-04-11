<template>
  <div class="hotChange">
    <div v-show="show_game" class="show_game">
      <!-- <img src="../../../static/img/home/cha.png" class="imgs" id="div" alt="" @click="show_change"> -->
      <iframe :src="game_url" class="content" frameborder="0"></iframe>
    </div>
    <yd-navbar title="额度转换" v-show="show_m5">
        <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
    </yd-navbar>
    <div class="hot_nav" v-show="show_m5">
      <div class="hot_nav_hred">
        <div class="hot_nav_hred_a">平台余额</div>
        <div>转出方</div>
        <div>转入方</div>
        <div>畅玩热门</div>
      </div>
      <div class="hot_nav_cent ">
        <div class="hot_nav_cent_list" style="background:#faf5f5" >
          <div class="hot_nav_cent_a">
            <p>我的钱包</p>
            <p class="monryNum">{{userDetails.accountBalance}}</p>
          </div>
          <div>
            <img :src= id_img_a  alt="" :key="id_key"  @click="idChange('',true,'')">
          </div>
          <div >
            <img :src= id_img_b alt="" :key="id_key" @click="idChange('',false,'')">
          </div>
          <div class="hot_nav_cent_c">
            <button @click="toPath">进入游戏</button>
          </div>
        </div>
        <yd-accordion accordion>
          <yd-accordion-item  v-for="(item,index) in hotGmaes"  :title="item.name" :class="'name'+index" >
            <!-- <div  class="imgs">
              <img :src="'../../../static/img/home/'+item.img+'.png'" alt="">
            </div> -->
              <div >
                  <div class="hot_nav_cent_list cent_list"  v-if="item.img == 'qpyx'">
                    <div class="hot_nav_cent_a"  @click="_gobalance('fl_fl','loding')">
                      <p>
                        <span>棋牌游戏</span>
                      </p>
                      <p class="monryNum">{{fl_money}}</p>
                    </div>
                    <div>
                      <img :src= id_img_FF_T alt="" @click="idChange('fl_fl',true, id_img_FF_T)">
                    </div>
                    <div >
                      <img :src= id_img_FF_F alt="" @click="idChange('fl_fl',false, id_img_FF_F)">
                    </div>
                    <div class="hot_nav_cent_c">
                      <button  @click="judgeAddress(URL_fl,'fl_fl','棋牌游戏')">进入游戏</button>
                      <!-- <a  ref="goSport_fl" :href = URL_fl target="_blank" style="display: none"></a> -->
                    </div>
                  </div>
                  <div class="hot_nav_cent_list "  v-if="item.img == 'zrsx'">
                    <div class="hot_nav_cent_a" @click="_gobalance('sb_sb','loding')">
                      <p>
                        <span>申&nbsp;&nbsp;博</span>
                      </p>
                      <p class="monryNum">{{sb_money}}</p>
                      </div>
                    <div>
                      <img :src= id_img_SB_T alt="" @click="idChange('sb_sb',true,id_img_SB_T)">
                    </div>
                    <div >
                      <img :src= id_img_SB_F alt="" @click="idChange('sb_sb',false,id_img_SB_T)">
                    </div>
                    <div class="hot_nav_cent_c">
                      <button  @click="judgeAddress(URL_sb,'sb_sb','申博')">进入游戏</button>
                      <!-- <a  ref="goSport_sb" :href = URL_sb target="_blank" style="display: none"></a> -->
                    </div>
                  </div>
                  <div class="hot_nav_cent_list cent_list" v-if="item.img == 'zrsx'">
                    <div class="hot_nav_cent_a" @click="_gobalance('ag_ag','loding')">
                      <p>
                        <span>A&nbsp;&nbsp;G</span>
                      </p>
                      <p class="monryNum">{{ag_money}}</p>
                      </div>
                    <div>
                      <img :src= id_img_AG_T alt="" @click="idChange('ag_ag',true,id_img_AG_T)">
                    </div>
                    <div >
                      <img :src= id_img_AG_F alt="" @click="idChange('ag_ag',false,id_img_AG_F)">
                    </div>
                    <div class="hot_nav_cent_c" >
                      <button  @click="judgeAddress(URL_ag,'ag_ag','AG')">进入游戏</button>
                      <!-- <a  ref="goSport_ag" :href = URL_ag target="_blank" style="display: none"></a> -->
                    </div>
                  </div>
                  <div class="hot_nav_cent_list " v-if="item.img == 'dzyy'">
                    <div class="hot_nav_cent_a" @click="_gobalance('bn_bn','loding')">
                      <p>
                        <span>Bbin</span>
                      </p>
                      <p class="monryNum">{{bn_money}}</p>
                      </div>
                    <div>
                      <img :src= id_img_BN_T alt="" @click="idChange('bn_bn',true,id_img_BN_T)">
                    </div>
                    <div >
                      <img :src= id_img_BN_F alt="" @click="idChange('bn_bn',false,id_img_BN_F)">
                    </div>
                    <div class="hot_nav_cent_c">
                      <button  @click="judgeAddress(URL_bn,'bn_bn','Bbin')">进入游戏</button>
                      <!-- <a  ref="goSport_bn" :href = URL_bn target="_blank" style="display: none"></a> -->
                    </div>
                  </div>

                  <!-- <div class="hot_nav_cent_list " v-if="item.img == 'dzyy'">
                    <div class="hot_nav_cent_a" @click="_gobalance('ac_mg','loding')">
                      <p>
                        <span>M&nbsp;&nbsp;G</span>
                      </p>
                      <p class="monryNum">{{mg_money}}</p>
                      </div>
                    <div>
                      <img :src= id_img_MG_T alt="" @click="idChange('ac_mg',true,id_img_MG_T)">
                    </div>
                    <div >
                      <img :src= id_img_MG_F alt="" @click="idChange('ac_mg',false,id_img_MG_F)">
                    </div>
                    <div class="hot_nav_cent_c">
                      <button  @click="judgeAddress(URL_mg,'ac_mg','MG')">进入游戏</button>
                    </div>
                  </div> -->


                   <!-- <div class="hot_nav_cent_list " v-if="item.img == 'zrsx'">
                    <div class="hot_nav_cent_a" @click="_gobalance('pt_pt','loding')">
                      <p>
                        <span>P&nbsp;&nbsp;T</span>
                      </p>
                      <p class="monryNum">{{pt_money}}</p>
                      </div>
                    <div>
                      <img :src= id_img_PT_T alt="" @click="idChange('pt_pt',true,id_img_PT_T)">
                    </div>
                    <div >
                      <img :src= id_img_PT_F alt="" @click="idChange('pt_pt',false,id_img_PT_F)">
                    </div>
                    <div class="hot_nav_cent_c">
                      <button  @click="gameLogin(1,'pt_pt')">进入游戏</button>
                    </div>
                  </div> -->
              </div>
          </yd-accordion-item>
      </yd-accordion>
       <a  ref="goSport_bn" :href = URL_bn target="_blank" style="display: none"></a>
       <a  ref="goSport_ag" :href = URL_ag target="_blank" style="display: none"></a>
        <a  ref="goSport_sb" :href = URL_sb target="_blank" style="display: none"></a>
        <a  ref="goSport_fl" :href = URL_fl target="_blank" style="display: none"></a>
        <a  ref="goSport_mg" :href = URL_mg target="_blank" style="display: none"></a>
        
      </div>
      
      
      
      
    </div>
    <div class="hot_nav_bot">
        <div class="hot_nav_bot_tliet">
          彩票共享“我的钱包”的额度。
        </div>
        <div class="hot_nav_bot_but">
          <button @click="toInput(10)">10</button>
          <button @click="toInput(100)">100</button>
          <button @click="toInput(500)">500</button>
          <button @click="toInput(1000)">1000</button>
          <button @click="toInput(5000)">5000</button>
          <button @click="toInput(imnputNum)">全部</button>
          <button @click="toInput(null)">清空</button>
        </div>
        <div class="hot_nav_bot_inp">
          <input type="number" v-model="nums" placeholder="请输入正整数" style="background: #fff">
          <div @click="moneyChange(game_id)">确认转换</div>
        </div>
      </div>
  </div>
</template>
<!--<script type="text/javascript" src="https://login.silvereagle88.com/jswrapper/integration.js.php?casino=silvereagle88"></script>-->
<script>

  import Assistant from '../home/dome/assistant.vue';
  import { mapState, mapActions, mapMutations } from "vuex";
  import hotBues from './hotBues.js';
  // import toptJs from '../../../static/js/toPtLogin.js';
  export default {
    data(){
      return{
        id_key:true,
        id_img_a:'../../../static/img/home/gou_a.png',
        id_img_b:"../../../static/img/home/gou_b.png",
        id_img_FF_T:"../../../static/img/home/gou_b.png",
        id_img_FF_F:'../../../static/img/home/gou_aa.png',
        id_img_SB_T:"../../../static/img/home/gou_b.png",
        id_img_SB_F:'../../../static/img/home/gou_b.png',
        id_img_AG_T:"../../../static/img/home/gou_b.png",
        id_img_AG_F:'../../../static/img/home/gou_b.png',
        id_img_BN_T:"../../../static/img/home/gou_b.png",
        id_img_BN_F:'../../../static/img/home/gou_b.png',
        id_img_PT_T:"../../../static/img/home/gou_b.png",
        id_img_PT_F:'../../../static/img/home/gou_b.png',
        id_img_MG_T:"../../../static/img/home/gou_b.png",
        id_img_MG_F:'../../../static/img/home/gou_b.png',
        URL_fl:'',
        URL_sb:'',
        URL_ag:'',
        URL_bn:'',
        URL_pt:'',
        URL_mg:'',
        assis_tant:false,
        show1:false,
        game_name:'',
        game_id:"fl_fl",
        nums:null,
        accountBalance:'',
        fl_money:'$--',
        gm_money:'$--',
        vg_money:'$--',
        sb_money:'$--',
        ag_money:'$--',
        bn_money:'$--',
        pt_money:'$--',
        mg_money:'$--',
        game_url:'',
        game_money:'',
        show_game:false,
        show_m5:true,
        addMoney:'1',
        minusMoney:'0',
        imnputNum:'',
        hotGmaes:[
            // {
            //     name:"体育赛事",
            //     img:"tyss",
            //     id:"fl_fl",
            //     names:'棋牌',
            // },
            // {
            //     name:"彩票游戏",
            //     img:"cpyx",
            //     id:"gm_ibc",
            //     names:'沙巴',
            // },
            {
                name:"真人视讯",
                img:"zrsx",
                id:"vg_vg",
                names:'VG',
            },
            {
                name:"电子游艺",
                img:"dzyy",
                id:"vg_vg",
                names:'VG',
            },
            {
                name:"棋牌游戏",
                img:"qpyx",
                id:"vg_vg",
                names:'VG',
            }
        ],
        inPlafrom:'fl_fl',
        outPlaform:'m52_m52',

        mobiledomain: "ls226588",
        systemidvar: "976",
      }
    },
    created(){
      
      this._gobalance('fl_fl','');
      // this._balance('gm_ibc');
      // this._balance('vg_vg');
      this._gobalance('sb_sb','');
      this._gobalance('ag_ag','');
      this._gobalance('bn_bn','');
      // this._gobalance('pt_pt','');
      // this._gobalance('ac_mg','');
      this.goUrl('fl_fl');
      this.goUrl('sb_sb');
      this.goUrl('ag_ag');
      this.goUrl('bn_bn');
      // this.goUrl('pt_pt');
      // this.goUrl('ac_mg');
      this.imnputNum = this.userDetails.accountBalance;
      this.playformAll().then( res => {
        console.log(res,'333')
      })
      
    },
     components: {
      Assistant
    },
    mounted(){
      // this.startMove();
    },
     computed: {
            ...mapState('login', [
                'userDetails'
            ]),
        },
    methods:{
      ...mapActions('home',['balance','amountOut','open','register','withdrawal','moneySwitch','playformAll']),
      ...mapActions('login', [
				"getUserDetails"
			]),
      // 查询热门游戏余额
      _gobalance(id,lod){
        // console.log(id,lod)
        if(lod == 'loding'){
          if(
            this.fl_money == '获取中' || this.fl_money == '$--' || this.fl_money == '转换中' || this.fl_money == '手动刷新' || this.fl_money == '系统维护中'||
            this.gm_money == '获取中' || this.gm_money == '$--' || this.gm_money == '转换中' || this.gm_money == '手动刷新' || this.gm_money == '系统维护中'||
            this.vg_money == '获取中' || this.vg_money == '$--' || this.vg_money == '转换中' || this.vg_money == '手动刷新' || this.vg_money == '系统维护中'||
            this.sb_money == '获取中' || this.sb_money == '$--' || this.sb_money == '转换中' || this.sb_money == '手动刷新' || this.sb_money == '系统维护中'||
            this.ag_money == '获取中' || this.ag_money == '$--' || this.ag_money == '转换中' || this.ag_money == '手动刷新' || this.ag_money == '系统维护中'||
            this.mg_money == '获取中' || this.mg_money == '$--' || this.mg_money == '转换中' || this.mg_money == '手动刷新' || this.mg_money == '系统维护中'
          ){
            this._balance(id,lod);
          }else{
            this.fl_money = this.fl_money;
            this.gm_money = this.gm_money;
            this.vg_money = this.vg_money;
            this.sb_money = this.sb_money;
            this.ag_money = this.ag_money;
            this.pt_money = this.pt_money;
            this.mg_money = this.mg_money;
          }
        }else if(lod == ''){
          if(id == 'fl_fl'){
              this.fl_money = '获取中';
            }else if(id== 'gm_ibc'){
              this.gm_money = '获取中';
            }else if( id== 'vg_vg'){
              this.vg_money = '获取中';
            }else if(id== 'sb_sb'){
              this.sb_money = '获取中';
            }else if(id== 'ag_ag'){
              this.ag_money = '获取中';
            }else if(id== 'bn_bn'){
               this.bn_money = '获取中';
            }else if(id== 'pt_pt'){
              this.pt_money = '获取中';
            }else if(id== 'ac_mg'){
              this.mg_money = '获取中';
            }
            this._register(id);
            this._balance(id,lod);
        }else if(lod == 'change'){
          if(id == 'fl_fl'){
              this.fl_money = '转换中';
            }else if(id== 'gm_ibc'){
              this.gm_money = '转换中';
            }else if( id== 'vg_vg'){
              this.vg_money = '转换中';
            }else if(id== 'sb_sb'){
              this.sb_money = '转换中';
            }else if(id== 'ag_ag'){
              this.ag_money = '转换中';
            }else if(id== 'bn_bn'){
              this.bn_money = '转换中';
            }else if( id == 'pt_pt'){
              this.pt_money = '转换中';
            }else if( id == 'ac_mg'){
              this.mg_money = '转换中';
            }
            else if(id== 'm52_m52'){
              this.getUserDetails()
            }
            this. _balance(id,lod);
        }else if(lod == ''){
         
          // this. _balance(id,lod);
        }
      },
      _balance(id,lod){
        this.balance({
          platform:id
        }).then( res => {
          if(res.code == 0){
            if(id == 'fl_fl'){
              this.fl_money = (Math.round(res.data*100)/100).toFixed(2);
            }else if(id== 'gm_ibc'){
              this.gm_money = res.data;
            }else if( id== 'vg_vg'){
              this.vg_money = res.data;
            }else if(id== 'sb_sb'){    
              this.sb_money = (Math.round(res.data*100)/100).toFixed(2);
            }else if(id== 'ag_ag'){
              this.ag_money = (Math.round(res.data*100)/100).toFixed(2);
            }else if(id== 'bn_bn'){
              this.bn_money = (Math.round(res.data*100)/100).toFixed(2);
            }else if (id== 'pt_pt'){
              this.pt_money = (Math.round(res.data*100)/100).toFixed(2);
            }else if (id== 'ac_mg'){
              this.mg_money = (Math.round(res.data*100)/100).toFixed(2);
            }
          }else if(res.code != 0  ){
            setTimeout( () =>{
              if(lod == '' || lod == 'change'){
                if(id == 'fl_fl'){
                  this.fl_money = '手动刷新';
                }else if(id== 'gm_ibc'){
                  this.gm_money = '手动刷新';
                }else if( id== 'vg_vg'){
                  this.vg_money = '手动刷新';
                }else if(id== 'sb_sb'){
                  this.sb_money = '手动刷新';
                }else if(id== 'ag_ag'){
                  this.ag_money = '手动刷新';
                }else if( id== 'bn_bn'){
                   this.bn_money = '手动刷新';
                }else if(id== 'pt_pt'){
                  this.pt_money = '手动刷新';
                }else if(id== 'ac_mg'){
                  this.mg_money = '手动刷新';
                }
              }else if(lod == 'loding'){
                if(id == 'fl_fl'){
                  this.fl_money = '';
                }else if(id== 'gm_ibc'){
                  this.gm_money = '系统维护中';
                }else if( id== 'vg_vg'){
                  this.vg_money = '系统维护中';
                }else if(id== 'sb_sb'){
                  this.sb_money = '系统维护中';
                }else if(id== 'ag_ag'){
                  this.ag_money = '系统维护中';
                }else if(id== 'bn_bn'){
                  this.bn_money = '系统维护中';
                }else if(id== 'pt_pt'){
                  this.pt_money = '系统维护中';
                }else if(id== 'ac_mg'){
                  this.mg_money = '系统维护中';
                }
                 this.$dialog.toast({
                  mes: res.msg,
                  timeout: 1500,
                  icon: 'error'
                });
              }
            },5*1000)
          }
        })
      },
      showMobel(id,name,money){
        this.show1 = true;
        this.game_id = id;
        this.game_name = name;
        this.game_money = money;
      },
      // 资金转向三方
      moneyChange(id){
        if(this.nums == null ){
          this.$dialog.toast({
              mes: '转换金额不能为空!',
              timeout: 1500,
              icon: 'error'
            });
        }else if(this.nums != null){
          // if(this.addMoney == '1'){
          //   this._amountOut(id);
          // }else{
          //   this._withdrawal(id);
          // }
          this._moneySwitch();
        }
      },
      // 转出函数
      _amountOut(id){
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
            this.show1 = false;
            this.getUserDetails()
          }else{
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
              icon: 'error'
            });
          }
        })
      },
       // 转入函数
      _withdrawal(id){
        this.withdrawal({
          amount:this.nums+"",
          platform:id
        }).then( res => {
          if(res.code == 0){
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
              icon: 'success'
            });
            this.show1 = false;
             this.getUserDetails()
          }else{
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
              icon: 'error'
            });
          }
        })
      },
      // 资金转换
      _moneySwitch(){
        this.moneySwitch({
          amount:this.nums+"",
          inPlafrom:this.inPlafrom,
          outPlafrom:this.outPlaform,
        }).then( res => {
          if( res.code == 0){
            this._gobalance(this.inPlafrom,'change');
            this._gobalance(this.outPlaform,'change');
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1000,
              icon: 'success'
            });
          }else if(res.code != 0){
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1000,
              icon: 'error'
            });
          }
        })
      },
      // 三方账户注册
      _register(id){
        if(id != 'sb_sb' || id != 'fl_fl' ){
          this.register({
            platform: id
          }).then( res => {

          })
        }
      },
      toInput(num){
        let that = this;
        if( num > this.imnputNum){
          that.nums = this.imnputNum;
          return false
        }else {
          that.nums = num
        }
      },
      idChange(id,TF,img){
        let that = this;
        // console.log(id,TF,img)
        that.game_id = id;
        if(id == ''){
          if(TF == true){
            that.id_key = false;
            that.outPlaform = 'm52_m52';
            that.id_img_a = '../../../static/img/home/gou_a.png';
            that.id_img_b = '../../../static/img/home/gou_b.png';
            that.id_img_FF_T = '../../../static/img/home/gou_b.png';
            that.id_img_SB_T = '../../../static/img/home/gou_b.png';
            that.id_img_AG_T = '../../../static/img/home/gou_b.png';
            that.id_img_BN_T = '../../../static/img/home/gou_b.png';
            that.id_img_PT_T = '../../../static/img/home/gou_b.png';
            that.id_img_MG_T = '../../../static/img/home/gou_b.png';
          }else if(TF == false){
            that.id_key = true;
            that.inPlafrom = 'm52_m52';
            that.id_img_a = '../../../static/img/home/gou_b.png';
            that.id_img_b = '../../../static/img/home/gou_aa.png';
            that.id_img_FF_F = '../../../static/img/home/gou_b.png';
            that.id_img_SB_F = '../../../static/img/home/gou_b.png';
            that.id_img_AG_F = '../../../static/img/home/gou_b.png';
            that.id_img_BN_F = '../../../static/img/home/gou_b.png';
            that.id_img_PT_F = '../../../static/img/home/gou_b.png';
            that.id_img_MG_F = '../../../static/img/home/gou_b.png';
          }
        }else if(id == 'fl_fl'){
          if(TF == true){
            that.id_key = false;
            that.outPlaform = 'fl_fl';
            that.id_img_FF_T = '../../../static/img/home/gou_a.png';
            that.id_img_FF_F = '../../../static/img/home/gou_b.png';
            that.id_img_SB_T = '../../../static/img/home/gou_b.png';
            that.id_img_AG_T = '../../../static/img/home/gou_b.png';
            that.id_img_BN_T = '../../../static/img/home/gou_b.png';
            that.id_img_PT_T = '../../../static/img/home/gou_b.png';
            that.id_img_MG_T = '../../../static/img/home/gou_b.png';
            that.id_img_a = '../../../static/img/home/gou_b.png';
          }else{
            that.id_key = true;
            that.inPlafrom = 'fl_fl';
            that.id_img_FF_T = '../../../static/img/home/gou_b.png';
            that.id_img_FF_F = '../../../static/img/home/gou_aa.png';
            that.id_img_SB_F = '../../../static/img/home/gou_b.png';
            that.id_img_AG_F = '../../../static/img/home/gou_b.png';
            that.id_img_BN_F = '../../../static/img/home/gou_b.png';
            that.id_img_PT_F = '../../../static/img/home/gou_b.png';
            that.id_img_MG_F = '../../../static/img/home/gou_b.png';
            that.id_img_b = '../../../static/img/home/gou_b.png';
          }
        }else if(id == 'sb_sb'){
          if(TF == true){
            that.id_key = false;
            that.outPlaform = 'sb_sb';
            that.id_img_SB_T = '../../../static/img/home/gou_a.png';
            that.id_img_SB_F = '../../../static/img/home/gou_b.png';
            that.id_img_FF_T = '../../../static/img/home/gou_b.png';
            that.id_img_AG_T = '../../../static/img/home/gou_b.png';
            that.id_img_BN_T = '../../../static/img/home/gou_b.png';
            that.id_img_PT_T = '../../../static/img/home/gou_b.png';
            that.id_img_MG_T = '../../../static/img/home/gou_b.png';
             that.id_img_a = '../../../static/img/home/gou_b.png';
          }else{
            that.id_key = true;
            that.inPlafrom = 'sb_sb';
            that.id_img_SB_T = '../../../static/img/home/gou_b.png';
            that.id_img_SB_F = '../../../static/img/home/gou_aa.png';
            that.id_img_FF_F = '../../../static/img/home/gou_b.png';
            that.id_img_AG_F = '../../../static/img/home/gou_b.png';
            that.id_img_BN_F = '../../../static/img/home/gou_b.png';
            that.id_img_PT_F = '../../../static/img/home/gou_b.png';
            that.id_img_MG_F = '../../../static/img/home/gou_b.png';
            that.id_img_b = '../../../static/img/home/gou_b.png';
          }
        }else if(id == 'ag_ag'){
          if(TF == true){
            that.id_key = false;
            that.outPlaform = 'ag_ag';
            that.id_img_AG_T = '../../../static/img/home/gou_a.png';
            that.id_img_AG_F = '../../../static/img/home/gou_b.png';
            that.id_img_FF_T = '../../../static/img/home/gou_b.png';
            that.id_img_SB_T = '../../../static/img/home/gou_b.png';
            that.id_img_BN_T = '../../../static/img/home/gou_b.png';
            that.id_img_PT_T = '../../../static/img/home/gou_b.png';
            that.id_img_MG_T = '../../../static/img/home/gou_b.png';
            that.id_img_a = '../../../static/img/home/gou_b.png';
          }else{
            that.id_key = true;
            that.inPlafrom = 'ag_ag';
            that.id_img_AG_T = '../../../static/img/home/gou_b.png';
            that.id_img_AG_F = '../../../static/img/home/gou_aa.png';
            that.id_img_FF_F = '../../../static/img/home/gou_b.png';
            that.id_img_SB_F = '../../../static/img/home/gou_b.png';
            that.id_img_BN_F = '../../../static/img/home/gou_b.png';
            that.id_img_PT_F = '../../../static/img/home/gou_b.png';
            that.id_img_MG_F = '../../../static/img/home/gou_b.png';
            that.id_img_b = '../../../static/img/home/gou_b.png';
          }
        }else if(id == 'bn_bn'){
          if(TF == true){
            that.id_key = false;
            that.outPlaform = 'bn_bn';
            that.id_img_BN_T = '../../../static/img/home/gou_a.png';
            that.id_img_BN_F = '../../../static/img/home/gou_b.png';
            that.id_img_FF_T = '../../../static/img/home/gou_b.png';
            that.id_img_SB_T = '../../../static/img/home/gou_b.png';
            that.id_img_AG_T = '../../../static/img/home/gou_b.png';
            that.id_img_PT_T = '../../../static/img/home/gou_b.png';
            that.id_img_MG_T = '../../../static/img/home/gou_b.png';
            that.id_img_a = '../../../static/img/home/gou_b.png';
          }else{
            that.id_key = true;
            that.inPlafrom = 'bn_bn';
            that.id_img_BN_T = '../../../static/img/home/gou_b.png';
            that.id_img_BN_F = '../../../static/img/home/gou_aa.png';
            that.id_img_FF_F = '../../../static/img/home/gou_b.png';
            that.id_img_SB_F = '../../../static/img/home/gou_b.png';
            that.id_img_AG_F = '../../../static/img/home/gou_b.png';
            that.id_img_PT_F = '../../../static/img/home/gou_b.png';
            that.id_img_MG_F = '../../../static/img/home/gou_b.png';
            that.id_img_b = '../../../static/img/home/gou_b.png';
          }
        }else if(id == 'pt_pt'){
          if(TF == true){
            that.id_key = false;
            that.outPlaform = 'pt_pt';
            that.id_img_PT_T = '../../../static/img/home/gou_a.png';
            that.id_img_PT_t = '../../../static/img/home/gou_b.png';
            that.id_img_FF_T = '../../../static/img/home/gou_b.png';
            that.id_img_SB_T = '../../../static/img/home/gou_b.png';
            that.id_img_AG_T = '../../../static/img/home/gou_b.png';
            that.id_img_BN_T = '../../../static/img/home/gou_b.png';
            that.id_img_MG_T = '../../../static/img/home/gou_b.png';
            that.id_img_a = '../../../static/img/home/gou_b.png';
          }else{
            that.id_key = true;
            that.inPlafrom = 'pt_pt';
            that.id_img_PT_T = '../../../static/img/home/gou_b.png';
            that.id_img_PT_F = '../../../static/img/home/gou_aa.png';
            that.id_img_FF_F = '../../../static/img/home/gou_b.png';
            that.id_img_SB_F = '../../../static/img/home/gou_b.png';
            that.id_img_AG_F = '../../../static/img/home/gou_b.png';
            that.id_img_BN_F = '../../../static/img/home/gou_b.png';
            that.id_img_MG_F = '../../../static/img/home/gou_b.png';
            that.id_img_b = '../../../static/img/home/gou_b.png';
          }
        }else if(id == 'ac_mg'){
          if(TF == true){
            that.id_key = false;
            that.outPlaform = 'ac_mg';
            that.id_img_MG_T = '../../../static/img/home/gou_a.png';
            that.id_img_MG_F = '../../../static/img/home/gou_b.png';
            that.id_img_FF_T = '../../../static/img/home/gou_b.png';
            that.id_img_SB_T = '../../../static/img/home/gou_b.png';
            that.id_img_AG_T = '../../../static/img/home/gou_b.png';
            that.id_img_BN_T = '../../../static/img/home/gou_b.png';
            that.id_img_PT_T = '../../../static/img/home/gou_b.png';
            that.id_img_a = '../../../static/img/home/gou_b.png';
          }else{
            that.id_key = true;
            that.inPlafrom = 'ac_mg';
            that.id_img_MG_T = '../../../static/img/home/gou_b.png';
            that.id_img_MG_F = '../../../static/img/home/gou_aa.png';
            that.id_img_FF_F = '../../../static/img/home/gou_b.png';
            that.id_img_SB_F = '../../../static/img/home/gou_b.png';
            that.id_img_AG_F = '../../../static/img/home/gou_b.png';
            that.id_img_BN_F = '../../../static/img/home/gou_b.png';
            that.id_img_PT_F = '../../../static/img/home/gou_b.png';
            that.id_img_b = '../../../static/img/home/gou_b.png';
          }
        }
        // console.log(that.id_img_AG_T,that.id_img_AG_F)
      },
       // 请求三方地址
      goUrl(id){
        this.open({
          mobile: "yes",
          platform: id
        }).then( res => {
          if(res.code == 0){
            if(id == 'fl_fl'){
              this.URL_fl = res.data;
            }else if(id == 'sb_sb'){
              this.URL_sb = res.data;
            }else if(id == 'ag_ag'){
              this.URL_ag = res.data;
            }else if(id == 'bn_bn'){
              this.URL_bn = res.data;
            }else if(id == 'pt_pt'){
              this.URL_pt = res.data;
            }else if(id == 'ac_mg'){
              this.URL_mg = res.data;
            }
            
            
          }
        })
      },
    //   // PT登录进入三方游戏
    //   gameLogin(id){
    //       iapiSetCallout('Login', this.calloutLogin);
    //      iapiSetClientPlatform("mobile&deliveryPlatform=HTML5");
    //     // if( id == 'pt_pt'){
    //       iapiLogin("M52U_"+this.userDetails.account.toUpperCase(),this.userDetails.account.toUpperCase(), 1, "en") 
    //       // window.location = "https://cachedownload.silvereagle88.com/flash/48/launchcasino.html?language=ZH-CN&game=bal";
    //       // window.location ="https://hub.ls226588.com/igaming/?gameId=bal&real=1&username="+username+"&lang=ZH-CN&tempToken=" + temptoken + "&lobby=" + index + "&support=" + index + "&logout=" + index + "&deposit=" + index;
    //     // }
    //     iapiSetCallout('GetTemporaryAuthenticationToken', this.calloutGetTemporaryAuthenticationToken());
    //   },
    //   // /*** 登录回调* @param response*/
    //   calloutLogin(response) {
    //     // console.log('222')
    //      this.askTempandLaunchGame("bal");
    //     if (response.errorCode) {
    //         alert("Login failed. " + response.playerMessage + " Error code: " + response.errorCode);
    //     }
    //     else {
    //         // window.location = "lobby.html?username=" + document.getElementById("loginform").username.value;
    //         this.askTempandLaunchGame("bal");//调用请求token 的方法
    //         //window.location = "https://hub.ls226588.com/igaming/?gameId=bal&real=1&username="+username+"&lang=en&tempToken=" + response.sessionToken;
    //     }
    // },
	  // //  * 请求token
    // askTempandLaunchGame(game) {
    //     var currentgame = game;
    //     var realMode = 1;
    //     iapiRequestTemporaryToken(realMode, this.systemidvar, 'GamePlay');
    // },
	  // //  * 进入游戏,需要传入用户名
    // launchMobileClient(temptoken,username) {
    //   console.log(temptoken,username,'333')
    //     // var username = document.getElementById("loginform").username.value;
    //     // var index = "http://zcm.tunnel.qydev.com/";//这是设置主页,传入m5的主页
    //     var index = "htcmd:close";// 关闭按键功能
    //     var clientUrl = "https://hub.ls226588.com/igaming/?gameId=bal&real=1&username="+username+"&lang=ZH-CN&tempToken=" + temptoken + "&lobby=" + index + "&support=" + index + "&logout=" + index + "&deposit=" + index;
    //     //var clientUrl = 'https://hub.' + mobiledomain + '/igaming/' + '?gameId=' + currentgame + '&real=1' + '&username=' + getUrlVars()["username"] + '&lang=' + document.getElementById("languageselect").gamelanguage.value + '&tempToken=' + temptoken + '&lobby=' + location.href.substring(0,location.href.lastIndexOf('/')+1) + 'lobby.html' + '&support=' + location.href.substring(0,location.href.lastIndexOf('/')+1) + 'support.html' + '&logout=' + location.href.substring(0,location.href.lastIndexOf('/')+1) + 'logout.html' + '&deposit=' + location.href.substring(0,location.href.lastIndexOf('/')+1) + 'deposit.html';
    //     document.location = clientUrl;
    // },
    // // * token 回调
    // calloutGetTemporaryAuthenticationToken(response) {
    //   // console.log(response,'444')
    //     if (response.errorCode) {
    //         alert("Token failed. " + response.playerMessage + " Error code: " + response.errorCode);
    //     }
    //     else {
    //         // 进入游戏
    //         // console.log(response);
    //         this.launchMobileClient(response.sessionToken.sessionToken,response.username);
    //     }
    //     // this.launchMobileClient(response.sessionToken.sessionToken,response.username);
    // },


       //判断是否请求到体育地址
      judgeAddress(url,id,name){
        this.goUrl(id);
        let that = this;
        if(url == ''){
          that.$dialog.alert({mes:'您好，我们的热'+name+'网站正在维护中，请稍后再试!'});
        }else {
          if(id == 'fl_fl'){
            that.$refs.goSport_fl.click();
            // hotBues.$emit("myFun",this.URL_fl)
            // console.log(this.URL_fl);
          //   this.game_url = this.URL_fl;
          //    setTimeout( () => {
          //   this.show_m5 = false;
          //   this.show_game = true;
          // },500)
          }else if(id == 'sb_sb'){
            that.$refs.goSport_sb.click();
            // hotBues.$emit("myFun",this.URL_sb)
            // console.log(this.URL_sb);
            // this.game_url = this.URL_sb;
          }else if(id == 'ag_ag'){
            that.$refs.goSport_ag.click();
            // hotBues.$emit("myFun",this.URL_ag)
            // console.log(this.URL_ag);
            // this.game_url = this.URL_ag;
          }else if(id == 'bn_bn' ){
            that.$refs.goSport_bn.click();
            // this.game_url = this.URL_bn;
            //   setTimeout( () => {
            //   this.show_m5 = false;
            //   this.show_game = true;
            // },500)
          }else if(id == 'pt_pt'){
            // that.$refs.goSport_bn.click();
            that.gameLogin(1,id)
          }else if(id == 'ac_mg' ){
            that.$refs.goSport_mg.click();
            // this.game_url = this.URL_bn;
            //   setTimeout( () => {
            //   this.show_m5 = false;
            //   this.show_game = true;
            // },500)
          }
          
         
        }
      },
      show_change(){
        this.show_m5 = true;
        this.show_game = false;
      },
      toPath(){
        this.$router.push({
          name: 'redPacket'
        })
      },
      //全局拖动效果
      startMove:function () {
        var that=this;
        var flag = 0; //标记是拖曳还是点击
        var oDiv = document.getElementById('div');
        var disX,moveX,moveY,L,T,starX,starY,starXEnd,starYEnd,disY;
        oDiv.addEventListener('touchstart',function(e){
          flag = 0;
          e.preventDefault();//阻止触摸时页面的滚动，缩放
          disX = e.touches[0].clientX - this.offsetLeft;
          disY = e.touches[0].clientY - this.offsetTop;
          //手指按下时的坐标
          starX = e.touches[0].clientX;
          starY = e.touches[0].clientY;
          //console.log(disX);
        });
        oDiv.addEventListener('touchmove',function(e){
          flag = 1;
          L = e.touches[0].clientX - disX ;
          T = e.touches[0].clientY - disY ;
          //移动时 当前位置与起始位置之间的差值
          starXEnd = e.touches[0].clientX - starX;
          starYEnd = e.touches[0].clientY - starY;
          //console.log(L);
          if(L<0){//限制拖拽的X范围，不能拖出屏幕
            L = 0;
          }else if(L > document.documentElement.clientWidth - this.offsetWidth){
            L=document.documentElement.clientWidth - this.offsetWidth;
          }
          if(T<0){//限制拖拽的Y范围，不能拖出屏幕
            T=0;
          }else if(T>document.documentElement.clientHeight - this.offsetHeight){
            T = document.documentElement.clientHeight - this.offsetHeight;
          }
          moveX = L + 'px';
          moveY = T + 'px';
          //console.log(moveX);
          this.style.left = moveX;
          this.style.top = moveY;
        });
        oDiv.addEventListener('touchend',function(e){
          //alert(parseInt(moveX))
          //判断滑动方向
          if(flag === 0) { //点击
            that.show_change();
          }
        });
      },
    },
    watch:{
      addMoney(){
        let that = this;
        // console.log(that.addMoney)
        if(that.addMoney === '0'){
          that.minusMoney ='0'
        }else if(that.addMoney === '1'){
          that.minusMoney ='1'
        }
      },
      minusMoney() {
        let that = this;
        if (that.minusMoney === '0') {
          that.addMoney = '0'
        } else if (that.minusMoney === '1') {
          that.addMoney = '1'
        }
      },
      outPlaform(){
        if(this.outPlaform == 'fl_fl' ){
          this.imnputNum = this.fl_money;
        }else if(this.outPlaform == 'gm_money'){
          this.imnputNum = this.gm_money;
        }else if(this.outPlaform == 'vg_vg'){
          this.imnputNum = this.vg_money;
        }else if(this.outPlaform == 'sb_sb'){
          this.imnputNum = this.sb_money;
        }else if(this.outPlaform == 'ag_ag'){
          this.imnputNum = this.ag_money;
        }else if(this.outPlaform == 'bn_bn'){
          this.imnputNum = this.bn_money;
        }else if(this.outPlaform == 'pt_pt'){
          this.imnputNum = this.pt_money;
        }else if(this.outPlaform == 'ac_mg'){
          this.imnputNum = this.mg_money;
        }else if( this.outPlaform == "m52_m52"){
          this.imnputNum = this.userDetails.accountBalance;
        }
      },
      // id_key(){
      //   let that = this;
      //   // console.log(that.id_key)
      //   if(that.id_key == true){
      //     that.addMoney = '1';
      //     that.id_img_a = '../../../static/img/home/gou_a.png';
      //     that.id_img_b = '../../../static/img/home/gou_b.png';
      //     that.id_img_FF_T = '../../../static/img/home/gou_b.png';
      //     that.id_img_SB_T = '../../../static/img/home/gou_b.png';
      //     that.id_img_AG_T = '../../../static/img/home/gou_b.png';
      //   }else if(that.id_key == false){
      //     that.addMoney = '0'
      //     that.id_img_a = '../../../static/img/home/gou_b.png';
      //     that.id_img_b = '../../../static/img/home/gou_aa.png';
      //     that.id_img_FF_F = '../../../static/img/home/gou_b.png';
      //     that.id_img_SB_F = '../../../static/img/home/gou_b.png';
      //     that.id_img_AG_F = '../../../static/img/home/gou_b.png';
      //   }
      // },
    }
  }
</script>

<style  lang="less">
  .hotChange{
    height: 100%;
    display: flex;
    flex-direction: column;
    // text-align: left;
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
      -webkit-overflow-scrolling: touch;
      padding-top: 1.8rem;
      padding-bottom: 2.1rem;
      // position: absolute;
      // top: 1.8rem;
      flex: 1;
      width: 100%;
        overflow: scroll;
        // padding: 1rem 0;
        /*background: #f9f9f9;*/
        // min_height: 100%;
        // box-sizing: border-box;
        // margin:0 0 2.15rem 0;
        .hot_nav_hred{
          position: fixed;
          top: 1rem;
          left: 0;
          width: 100%;
          display: flex;
          flex-direction:row;
          flex-wrap: nowrap  ;
          height: 0.8rem;
          // background: #66b0f1;
          background-image: -webkit-linear-gradient(top,#4b4b4b,#000000); 
          color: #fff;
          line-height: 0.8rem;
          z-index: 9999;
          div{
            width: 24%;
            text-align: center;
          }
          .hot_nav_hred_a{
            width: 28%;
          }
        }
        .hot_nav_cent{
          overflow: hidden;
          .hot_nav_cent_list{
            display: flex;
            flex-direction:row;
            flex-wrap: nowrap  ;
            height: 1.2rem;
            color: #3b3b3b;
            line-height: 1.2rem;
            border-bottom: 1px solid #c1c1c1;
            background: #fff;
            div{
              width: 24%;
              text-align: center;
              border-right: 1px solid #c1c1c1;
              box-sizing: border-box;
              padding: 0.15rem;
              
            }
            img{
              height: 0.8rem;
            }
            .hot_nav_cent_a{
              width: 28%;
              height: 1.2rem;
              box-sizing: border-box;
              padding: 0.2rem 0;
              p{
                height: 0.4rem;
                line-height: 0.4rem;
                span{
                  // float: left;
                  height: 0.4rem;
                  line-height: 0.4rem;
                  // width: 65%;
                  text-align: right;
                  text-align: center;
                }
                // img{
                //   float: left;
                //   width: 0.4rem;
                //   height: 0.4rem;
                //   border: 1px solid #c1c1c1;
                //   border-radius: 0.4rem;
                //   margin-left: 0.1rem;
                // }
              }
              .monryNum{
                  color: #ffac16;
              }
            }
            .hot_nav_cent_c{
              border-right:0;
              button{
                display: inline-block;
                border:0;
                background: #137ad9;
                color: #fff;
                padding: 0.05rem 0.1rem;
                border-radius: 2px;
              }
            }
          }
          .cent_list{
            background: #f5f5f5;
          }
          .yd-accordion{
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            // padding-bottom:1rem; 
          }
          .yd-accordion-head-content .yd-accordion-title span{
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }
           .name0 .yd-accordion-head-content .yd-accordion-title span::before{
             display: inline-block;
              content: ' ';
              height: 0.4rem;
              width: 0.5rem;
              background: url('../../../static/img/home/zrsx.png');
              background-size:100% 100%; 

            }
            .name1 .yd-accordion-head-content .yd-accordion-title span::before{
             display: inline-block;
              content: ' ';
              height: 0.4rem;
              width: 0.4rem;
              margin-right: 0.05rem;
              background: url('../../../static/img/home/dzyy.png');
              background-size:100% 100%; 

            }
            .name2 .yd-accordion-head-content .yd-accordion-title span::before{
             display: inline-block;
              content: ' ';
              height: 0.4rem;
              width: 0.4rem;
              margin-right: 0.05rem;
              background: url('../../../static/img/home/qpyx.png');
              background-size:100% 100%; 

            }
            
          .yd-accordion-head{
            height: 0.6rem;
            width: 100%;
            text-align: center;
            line-height: 0.6rem;
            margin-top: 0.15rem;
            border-radius: 0.075rem;
            background-image: -webkit-linear-gradient(top,#979797,#343434); 
            color: #ffffff;
            .yd-accordion-head-arrow, .yd-accordion-head-content{
              width: 100%;
              min-height: 0.6rem !important;
              height: 0.6rem !important;
              float: left;
              text-align: right;
              
            }
           
            .yd-accordion-content{
              overflow:auto !important;
            }
            .yd-accordion-title{
              margin-left: 0.15rem;
              height: 0.6rem;
              color: #ffffff;
              span{
                display: inline-block;
                margin: 0 auto;
                padding-left: 0.85rem
              }
            }
          }
          .yd-accordion-head-arrow{
            width: 10% !important;
          }
          .yd-accordion-head-arrow:after{
            margin: 0 0 0 50%;
          }
          .imgs{
                position: absolute;
                left: 37%;
                top: -0.65rem;
                height: 0.55rem;
                width: 0.4rem;
                padding-top: 0.15rem;
                // background: #137ad9;
                img{
                  width: 100;
                  height: 100%;
                }
              }
          // .imgs{
          //   margin: 0 0 0 55%;
          // }
        }
        
        .nav_list{
          display: none;
            height: 1.6rem;
            width: 94%;
            // background: #04b0c4;
            margin:0 auto 0.2rem;
            box-sizing: border-box;
            padding: 0.15rem 0.25rem;
            border-bottom: 0.2rem solid #c1c1c1;
            .list_{
                float: left;
            }
            .list_a{
                width: 78%;
                height: 1.2rem;
                background-color: #ffffff;
                p{
                  height: 0.6rem;
                  width: 100%;
                   .moneys{
                    width: 1.5rem;
                    text-align: right;
                    color:  rgb(255, 102, 0);
                  }
                }
            }
            .list_c{
                width: 22%;
                line-height: 1.5rem;
            }
            
        }
        .hotList{
          li{
            height: 0.6rem;
            width: 100%;
            text-align: center;
            line-height: 0.6rem;
            margin-top: 0.15rem;
            border-radius: 0.075rem;
            background-image: -webkit-linear-gradient(top,#979797,#343434); 
            color: #ffffff;
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
        color: #000;
        p{
          height: 0.8rem;
          width: 100%;
          text-align: center;
          span{
            color: red;
          }
        }
        div{
          height: 0.8rem;
          width: 100%;
          text-align: center;
          select,input{
            width: 2.5rem;
            border: 1px solid #c1c1c1;
          }
         
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
          line-height: 1.5rem;
        }
      }
      .model_foot{
        height: 0.6rem;
        border-top: 1px solid #c1c1c1;
      }
    }
    .show_game{
      height: 100%;
      width: 100%;
      position: relative;
      .content{
        height: 100%;
        width: 100%;
      }
      .imgs{
        position: fixed;
        right: 0.5rem;
        top: 1rem;
         display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        z-index: 9999;
        border-radius: 100% 100%;
        background-size: 100% 100%;
        box-shadow: 0 0 1px #000 inset;
      }
    }
    .hot_nav_bot{
          position: fixed;
          left: 0;
          bottom: 0;
          height: 2.1rem;
          width: 100%;
          background: #f5f5f5;
          .hot_nav_bot_tliet{
            height: 0.6rem;
            box-sizing: border-box;
            padding: 0 0.2rem;
            color: #137ad9;
            line-height: 0.6rem;
            border-bottom: 1px solid #c1c1c1;
          }
          .hot_nav_bot_but{
            display: flex;
            justify-content: center;
            height: 0.8rem;
            box-sizing: border-box;
            padding: 0.05rem;
            width: 100%;
            button{
              width:  12%;
              margin: 1%;
              box-sizing: border-box;
              background: #eaeaea;
              border: 1px solid #c1c1c1;
              border-radius: 2px;
            }
          }
          .hot_nav_bot_inp{
            height: 0.8rem;
            width: 100%;
            box-sizing: border-box;
            padding: 0 0.15rem;
            input{
              float: left;
              width: 55%;
              height: 0.6rem;
              line-height: 0.6rem;
              border: 1px solid #c1c1c1;
              box-sizing: border-box;
              padding: 0 0.15rem;
            }
            div{
              float: left;
              width: 43%;
              margin-left: 2%;
              height: 0.6rem;
              text-align: center;
              line-height: 0.6rem;
              color: #fff;
              background: #2061b3;
            }
          }
        }
    
  }
  // .hot .hot_nav div:nth-child(5n+1){
  //   background: #17a8e1;;
  // }
  // .hot .hot_nav div:nth-child(5n+2){
  //   background: #04b0c4;;
  // }
  // .hot .hot_nav div:nth-child(5n+3){
  //   background: #5f65c3;;
  // }
  // .hot .hot_nav div:nth-child(5n+4){
  //   background: #4ba708;;
  // }
  // .hot .hot_nav div:nth-child(5n+5){
  //   background: #e6a316;;
  // }
  
  /* .hot .yd-accordion-head{
    overflow: visible;
    border-bottom: 0.015625rem solid #d9d9d9 !important;
  } */
  
</style>
