<template>
  <div>
    <ul
      class="withdraw"
      v-if="withdrawList.length!==0"
    >
      <li
        class="withdraw-item"
        v-for="(item, index) in withdrawList"
        :key="index"
        @click="toDetail(index)"
      >
        <span class="name">{{item.account}}</span>
        <span class="money">(￥{{item.amount}})</span>
        <span class="status">详情</span>
        <img
          class="arrow"
          src="../../../static/img/return.png"
        >
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
  data() {
    return {
      list: [
        {
          name: "彭畅畅",
          money: "100",
          status: "详情"
        },
        {
          name: "彭畅畅",
          money: "100",
          status: "详情"
        },
        {
          name: "彭畅畅",
          money: "100",
          status: "详情"
        },
        {
          name: "彭畅畅",
          money: "100",
          status: "详情"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("recharge", ["withdrawList"])
  },
  methods: {
    toDetail(index) {
      this.$router.push(`/subDetail?index=${index}&type=withdraw`);
    }
  }
};
</script>

<style lang="less" scoped>
.withdraw {
  width: 100%;
  background: #fff;
  .withdraw-item {
    height: 0.8rem;
    padding: 0 0.3rem;
    display: flex;
    align-items: center;
    color: rgb(51, 51, 51);
    font-size: 14px;
    position: relative;
    .money {
      color: #0a77a0;
      margin-left: 0.2rem;
    }
    .status {
      position: absolute;
      right:0.86rem;
      color: rgb(230, 68, 43);
    }
    .arrow {
      position: absolute;
      right: 0.3rem;
    }
  }
}
</style>
