<template>
  <div class="home_head">
    <slot name="left">
      <div>
        <!--<img src="../../static/images/home/home_logo.png">-->
        <span>用户名113</span>
      </div>
    </slot>
    <slot name="center">
      <span>彩种大厅</span>
    </slot>
    <slot name="right">
      <span >小助手</span>
    </slot>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("login", ["userDetails"])
  },
  methods: {}
};
</script>

<style lang="less">
.home_head {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 1rem;
  background-color: #011935;
  color: rgb(255, 255, 255);
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ffffff;
  div:nth-child(1) {
    overflow: hidden;
    min-width: 2.05rem;
    display: flex;
    position: absolute;
    align-items: center;
    height: 100%;
    left: 0.3rem;
    font-size: 12px;
    img {
      margin-right: 0.05rem;
      height: 0.3rem;
    }
  }
  *:nth-child(3) {
    position: absolute;
    right: 0.3rem;
    font-size: 12px;
  }
}
</style>