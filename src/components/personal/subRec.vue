<template>
  <div>
    <ul class="pay-way" v-if="rechargeList.length!==0">
      <li class="way-item" v-for="(item, index) in rechargeList" :key="index" @click="toDetail(index)">
         <span class="name">{{item.account}}</span>
        <span class="money">(￥{{item.amount}})</span>
        <span class="status">详情</span>
        <img class="arrow" src="../../../static/img/return.png">
      </li>
    </ul>
    <div v-else>
     <p style="color:#666;text-align:center;font-size: 14px;">--暂无申请--</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data () {
    return {
      way: [
        {
          img: require('../../../static/img/recharge/ailpay.png'),
          tit: '支付宝',
          content: '下级支付宝转账'
        }, {
          img: require('../../../static/img/recharge/wechat.png'),
          tit: '微信',
          content: '下级微信转账'
        }
      ]
    }
  },
  computed:{
    ...mapGetters('recharge',['rechargeList'])

  },
  methods:{
    toDetail(index){
      this.$router.push(`/subDetail?index=${index}&type=recharge`)
    }
  }
}
</script>

<style lang="less" scoped>
  .pay-way {
    background-color: #fff;
    .way-item{
      height: 0.8rem;
      padding: 0 0.3rem;
      display: flex;
      align-items: center;
      color: rgb(51, 51, 51);
      font-size: 14px;
      position: relative;
      .money {
        color: rgb(230, 68, 43);
        margin-left: 0.2rem;
      }
      .status {
        position: absolute;
        right: 0.86rem;
        color: rgb(230, 68, 43);
      }
      .arrow {
        position: absolute;
        right: 0.3rem;
      }
    }
  }
</style>
