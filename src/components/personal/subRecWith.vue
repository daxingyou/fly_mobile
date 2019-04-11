<template>
  <div>
  	<yd-navbar title="下级充提">
      <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left" style="color: #FFFFFF;"></yd-navbar-back-icon>
      <!-- <router-link to="/home" slot="left">
        <yd-navbar-back-icon style="color: #FFFFFF;"></yd-navbar-back-icon>
      </router-link> -->
    </yd-navbar>
    <div class="wrap">
      <ul>
        <li @click="isActive=0" :class="isActive==0?'nav-item active':'nav-item'">
          <router-link to="subRec" style="display:inline-block;width:100%;height:100%;">充值<span class="badge" v-show="rechargeList.length>0">{{rechargeList.length}}</span></router-link>
        </li>
        <li @click="isActive=1" :class="isActive==1?'nav-item active':'nav-item'">
          <router-link to="subWith" style="display:inline-block;width:100%;height:100%;">提现<span class="badge" v-show="withdrawList.length>0">{{withdrawList.length}}</span></router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapGetters
  } from "vuex";
  export default {
    data() {
      return {
        isActive: 0
      };
    },
    created() {
      this.init();
      if (this.$route.name == 'subRec') {
        this.isActive = 0
      } else if (this.$route.name == 'subWith') {
        this.isActive = 1
      }
    },
    methods: {
      ...mapActions("recharge", ["queryApplyPoint"]),
      init() {
        this.queryApplyPoint();
      }
    },
    computed: {
      ...mapState("recharge", ["points"]),
      ...mapGetters('recharge', ['rechargeList', 'withdrawList'])
    }
  };
</script>

<style lang="less" scoped>
  .wrap {
    width: 100%;
    background-color: #fff;
    margin-top: 0;
    padding-top: 1rem;
    ul {
      display: flex;
      align-items: center;
      height: 0.8rem;
      margin-bottom: 0.2rem;
      .nav-item {
        width: 50%;
        height: 100%;
        font-size: 14px;
        text-align: center;
        line-height: 0.8rem;
        position: relative;
        .badge {
          position: absolute;
          top: 0.2rem;
          right: 0.8rem;
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
          background-color: #e6442b;
          color: #fff;
          text-align: center;
          line-height: 0.4rem;
          font-size: 16px;
        }
      }
      .active {
        color: #0a77a0;
        border-bottom: 3px solid #0a77a0;
      }
    }
  }
</style>
