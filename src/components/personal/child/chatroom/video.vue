<template>
  <div>
    <div class="waiting">
      <div id="call">call</div>
      <div id="hangup">
        <i class="fa fa-phone" aria-hidden="true"></i>
      </div>
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
  .waiting {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .8);
    z-index: 9;
    color: #ffffff;
  }
  #hangup {
    width: 1.2rem;
    height: 1.2rem;
    background-color: red;
    color: #ffffff;
    text-align: center;
    line-height: 1.2rem;
    border-radius: 50%;
    font-size: .5rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 1.5rem;
    margin: auto;
  }
</style>
