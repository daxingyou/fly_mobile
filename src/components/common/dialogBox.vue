<template>
  <div v-if="typeShow" id="dialogBox">
    <div class="timetip">
      <slot name="chart_time"></slot>
    </div>
    <div class="_nickName" :style="{'justify-content':mode==='right'?'flex-end':'flex-start'}">
      <slot name="nickname"></slot>
    </div>
    <div class="container_message">
      <div class="person_img">
        <slot name="img" :style="styleObjectImg"></slot>
      </div>
      <div class="message" :style="styleObjectMessage">
        <span class="_span" :style="classObjectTriangle"></span>
        <p class="Text" :style="styleObjectText">
          <slot></slot>
        </p>
      </div>
    </div>
  </div>
  <div id="dialog_tip" v-else>
    <p>
      <slot></slot>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      default: "left"
    },
    type: {
      type: String,
      default: "normal"
    },
    bgcolor_left: {
      type: String,
      default: "#fff"
    },
    bgcolor_right: {
      type: String,
      default: "#d91d36"
    },
    color_left: {
      type: String,
      default: "#000"
    },
    color_right: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      show: true
    };
  },
  computed: {
    classObjectTriangle() {
      if (this.mode === "right") {
        return {
          "border-left": "8px solid" + this.bgcolor_right,
          order: 1
        };
      } else {
        return {
          "border-right": "8px solid" + this.bgcolor_left
        };
      }
    },
    styleObjectMessage() {
      if (this.mode === "right") {
        return {
          "margin-right": 0.25 + "rem",
          "justify-content": "flex-end",
          order: -1
        };
      } else {
        return {
          "margin-left": 0.25 + "rem",
          "justify-content": "flex-start"
        };
      }
    },
    styleObjectText() {
      if (this.mode === "right") {
        return {
          order: -1,
          color: this.color_right,
          background: this.bgcolor_right
        };
      } else {
        return {
          color: this.color_left,
          background: this.bgcolor_left
        };
      }
    },
    styleObjectImg() {
      if (this.mode === "right") {
        return {
          order: 1
        };
      }
    },
    typeShow() {
      if (this.type === "normal") {
        return true;
      } else if (this.type === "tip") {
        return false;
      }
    }
  }
};
</script>
<style lang="less">
@import url("../../../static/css/common.less");
#dialogBox {
  margin-bottom: 0.4rem;
  user-select: text;
  font-size:.28rem;
  .timetip {
    font-size: 12px;
    margin-bottom: 0.2rem;
    color: #4b4b4b;
  }
  ._nickName {
    display: flex;
    font-size: 12px;
    color: #4b4b4b;
    margin-bottom: 0.05rem;
  }
  .container_message {
    display: flex;
    .person_img {
      img,#_img {
        width: 0.9rem;
        height: 0.9rem;
      }
      .personal_img2;
      #_img{
         background-image: url(../../../static/img/sprite.png);
          background-size: cover;
      }
    }
    .message {
      width: 100%;
      .my-display(none,none);
      ._span {
        display: block;
        width: 0;
        height: 0;
        margin-top: 0.35rem;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
      }
      .Text {
        max-width: 90%;
        height: auto;
        padding: 0.2rem;
        border-radius: 6px;
        display: flex;
        align-items: center;
        word-break: break-all;
        p {
          -webkit-touch-callout: all;
          -webkit-user-select: all;
          -moz-user-select: all;
          -ms-user-select: all;
          user-select: all;
        }
      }
    }
  }
}
#dialog_tip {
  display: flex;
  justify-content: center;
  margin-bottom: 0.3rem;
  p {
    display: table-cell;
    margin: auto;
    font-size: 12px;
    p {
      background: rgba(0, 0, 0, 0.1);
      padding: 0 0.1rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
    }
  }
}
</style>

