<template>
  <div class="alert-box">
    <div class="alert">
      <div class="tip">提示</div>
      <slot class="content" name="alert-content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  .alert-box {
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
      border-radius: .3rem;
      text-align: center;
      overflow: hidden;
      width: 80%;
      .tip {
        padding: .2rem 0;
        border-bottom: 1px solid #cccccc;
        background-color: #F5F5F5;
        font-size: 0.3rem;
      }
      .content {
        text-align: left;
      }
    }
  }
  
</style>
