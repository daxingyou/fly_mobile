<template>
  <div class="flyGuild">
    <div class="alert" :class="flyGuildNum=='2'? 'active_alert':''">
      <div class="tip">提示</div>
      <slot class="flyGuild_content" name="flyGuild_content"></slot>
    </div>
    <slot class="indicator" name="indicator_img"></slot>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data () {
    return {
    }
  },
  computed: {
      ...mapState(['flyGuildNum'])
    },
  mounted:{
    ...mapMutations(['setflyGuildNum']),
  }
}
</script>

<style lang="less" scoped>
  .flyGuild {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.3);
    z-index: 998;
    display: flex;
    justify-content: center;
    align-items: center;
    .alert {
      background-color: rgba(255,255,255,.9);
      border-radius: 0.4rem 0.9rem 0.2rem / 0.9rem 0.9rem;
      text-align: center;
      overflow: hidden;
      width: 75%;
      
      .tip {
        float: left;
        width: 1rem;
        height: 0.5rem;
        margin: .2rem 0 0 0.2rem ;
        line-height: 0.5rem;
        background-color: #F5F5F5;
        font-size: 0.3rem;
      }
      .flyGuild_content {
        float: right;
        width: 5rem;
        min-height: 1.2rem !important;
        text-align: center;
        box-sizing: border-box;
        padding:0 0.2rem;
      }
    }
    .active_alert{
      position: fixed !important;
      top: 1.5rem !important;
    }
    .indicator{
      position: absolute;
    }
  }
  
</style>
