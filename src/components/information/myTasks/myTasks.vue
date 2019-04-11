<template>
    <div id="myTasks">
        <yd-navbar title="我的任务" v-stopSlide bgcolor="#011935" color="#fff">
            <yd-navbar-back-icon color="#fff" @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
        </yd-navbar>
        <div class="container">
            <yd-tab horizontal-scroll v-if="activities.length!==0">
                <yd-tab-panel :dot="!item.nowStatus" v-show="item.status==='1'" v-for="(item,index) of activities" :key="index" :label="item.name">
                  <Sign :dataList="item"></Sign>
                </yd-tab-panel>
            </yd-tab>
            <section v-else>
              暂无任务
            </section>
        </div>
    </div>
</template>

<script>
import Sign from './sign.vue';
import { mapState, mapActions, mapMutations,mapGetters } from "vuex";
export default {
  created(){
    this.init()

  },
  methods:{
    ...mapActions(['queryActivity']),
    init(){
      this.queryActivity();
    }
  },
  computed:{
    ...mapState(['activities']),
    ...mapGetters(['activeNum'])

  },
  components:{
    Sign
  }
};
</script>

<style lang="less">
@import url("../../../../static/css/common.less");
#myTasks {
  .init;
  padding-bottom: 0;
  .container {
    // .my-container();
    height: 100%;
    .yd-tab {
      //   height: 100%;
      .yd-tab-nav-scoll {
        .yd-tab-nav {
          // overflow-x: scroll;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
          margin: .05rem;
        }
        &::-webkit-scrollbar {
          width: 0px;
        }
        &::-webkit-scrollbar {
          display: none;
        }
      }

    }
  }
  section{
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #c4c4c4;
    padding-top: .2rem;
    &:before{
      content:'';
      display:block;
      width: 1rem;
      height: 1px;
      background:#c4c4c4
    }
    &:after{
      content:'';
      display:block;
      width: 1rem;
      height: 1px;
      background:#c4c4c4
    }
  }
}
</style>
