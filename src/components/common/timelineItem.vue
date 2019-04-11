<template>
  <div id="timeLineItem">
    <div class="_main">
      <div v-if="!sign" class="_sign">
        <slot></slot>
      </div>
      <div v-else class="_sign pra">
        <i class="fa fa-check" style="color:#4e3e2e"></i>
      </div>
      <span v-show="show"></span>
    </div>
    <div class="_tip">{{time}}</div>
  </div>
</template>

<script>
export default {
  name: "timeLineItem",
  data() {
    return {
      show: true,
      sign: false
    };
  },
  props: {
    time: {
      type: String
    },
    index: {
      type: String
    }
  }
};
</script>

<style lang="less">
#timeLineItem {
  //   display: flex;
  //   align-items: center;
  ._main {
    display: flex;
    align-items: center;
    ._sign {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: #fff;
      line-height: 0.5rem;
      border: 2px solid #ffb764;
      display: flex;
      align-items: center;
      justify-content: center;
      //    border-color:#ffb764;
    }
    .pra {
      background: #ffb764;
    }
    span {
      display: inline-block;
      width: 0.4rem;
      height: 0.1rem;
      background: #ffe97b;
    }
  }
  ._tip {
    text-align: left;
    padding-left: 0.04rem;
  }
}
</style>
