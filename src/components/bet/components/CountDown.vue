<template>
    <span>
        <span v-html="str"></span>
        <span ref="tpl" v-if="showTpl"><slot></slot></span>
    </span>
</template>

<script type="text/babel">
export default {
  name: "countdown",
  data() {
    return {
      str: "",
      timer: null,
      showTpl: true,
      tempFormat: "{%h}:{%m}:{%s}"
    };
  },
  props: {
    time: {
      type: [String, Number, Date]
    },

    timetype: {
      validator(value) {
        return ["datetime", "second", "timestamp"].indexOf(value) > -1;
      },
      default: "datetime"
    },
    callback: {
      type: Function
    }
  },
  watch: {
    time(val) {
      if (val < 0){
        clearInterval(this.timer);
        return (this.str = "00:00");
      } 
      clearInterval(this.timer);
      val && this.run();
    }
  },
  methods: {
    run() {
      if (!this.time) return;

      if (this.timetype === "second") {
        this.lastTime = Math.floor(new Date() / 1000) + ~~this.time;
      } else if (this.timetype === "timestamp") {
        this.lastTime = Math.floor(new Date(this.time).getTime());
      } else {
        this.lastTime = Math.floor(new Date(this.time).getTime() / 1000);
      }

      if (this.time instanceof Date) {
        this.lastTime = Math.floor(this.time.getTime() / 1000);
      }

      this.doRun();

      this.timer = setInterval(this.doRun, 1000);
    },
    doRun() {
      let leftTime = this.lastTime - Math.floor(new Date().getTime() / 1000);
      if (leftTime >= 0) {
        if (leftTime >= 86400) {
          //秒数大于1天显示天数
          this.tempFormat = "{%d}:{%h}:{%m}:{%s}";
        } else if (leftTime >= 3600) {
          //秒数大于小时显示小时
          this.tempFormat = "{%h}:{%m}:{%s}";
        } else {
          this.tempFormat = "{%m}:{%s}";
        }
        this.str = this.timestampTotime(leftTime);
      } else {
        this.callback && this.callback();
        clearInterval(this.timer);
        this.run();
      }
    },
    timestampTotime(time) {
      let format = this.tempFormat;
      let t = {};

      t.s = time % 60;
      time = Math.floor(time / 60);
      t.m = time % 60;
      time = Math.floor(time / 60);
      t.h = time % 24;
      t.d = Math.floor(time / 24);

      const ment = function(a) {
        if (a <= 0) return "00";
        return a < 10 ? "0" + a : a;
      };

      const arr = ["d", "h", "m", "s"];

      arr.forEach(val => {
        const day = ment(t[val])
          .toString()
          .split("");

        format = format.replace("{%" + val + "}", ment(t[val]));
        format = format.replace(
          "{%" + val + "0}",
          ~~day[day.length - 3] !== 0 ? day[day.length - 3] : ""
        );
        format = format.replace("{%" + val + "1}", ~~day[day.length - 2]);
        format = format.replace("{%" + val + "2}", ~~day[day.length - 1]);
      });

      return format;
    }
  },
  mounted() {
    console.log(this.time,"233")
    this.$nextTick(() => {
      this.showTpl = false;
      this.run();
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style>
@font-face {
  font-family: clock-number;
  src: url(../../../../fonts/LED.eot?) format("eot");
  src: url(../../../../fonts/LED.woff) format("woff"),
    url(../../../../fonts/LED.ttf) format("truetype");
}
</style>
