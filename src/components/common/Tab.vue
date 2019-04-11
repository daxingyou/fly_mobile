<template>
    <div id="popover_container" @click.self="$emit('Show')">
        <div class="popover-menu" ref="rightPopup">
            <ul class="rightPopup" style="">
                <li class="first_li"><img src="../../../static/img/yonghu.png" class="icon" />
                    <span>{{userDetails.account}}</span>
                </li>
                <li><img src="../../../static/img/img_pig.png" class="icon" />
                    <span style="color: #d81d38;">{{userDetails.accountBalance}}</span>
                </li>
                <!-- <li @click="switchKind"><img src="../../../static/img/qiehuan.png" class="icon" />
                <span>切换彩种</span>
            </li> -->
                <li v-if="userDetails.type=='0'" @click="recharge"><img src="../../../static/img/chongzhi.png" class="icon" />充值</li>
                <li v-if="userDetails.type=='0'" @click="putForward"><img src="../../../static/img/tixian.png" class="icon" />提现</li>
                <li @click="myBet"><img src="../../../static/img/img_min_pop.png" class="icon" />投注记录</li>
                <li @click="award"><img src="../../../static/img/img_last_open.png" class="icon" />开奖历史</li>
                <!-- <li @click="showGameHple"><img src="../../../static/img/shuoming.png" class="icon" style="width: 0.5rem;" />玩法说明</li> -->
            </ul>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  props: {},
  computed: {
    ...mapState("login", ["userDetails"])
  },
  methods: {
    recharge() {
      this.$router.push({
        path: "/recharge/companyIncome"
      });
    },
    putForward() {
      this.$router.push({
        path: "/withdraw"
      });
    },
    myBet() {
      this.$router.push({
        name: "noterecord"
      });
    },
    award() {
      this.$router.push({
        name: "award"
      });
    }
  }
};
</script>
<style lang="less">
#popover_container {
    position: absolute;
    top:0;
    width: 100%;
    height:100%;
    background: rgba(0,0,0,.1);
     transform-origin: top right;
  .popover-menu {
    position: absolute;
    z-index: 9998;
    background: #ffffff;
    top: 45px;
    right: 0;
    width: 3rem;
    height: auto;
    box-shadow: 1px 1px 7px 2px #aaa;
    .first_li {
      font-size: 12px;
      padding: 0.2rem 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #acacac;
      .icon {
        margin-right: 0.1rem;
      }
    }
    li {
      font-size: 12px;
      padding: 0.1rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #acacac;
      .icon {
        width: 0.5rem;
        margin-right: 0.1rem;
      }
    }
  }
}
</style>

