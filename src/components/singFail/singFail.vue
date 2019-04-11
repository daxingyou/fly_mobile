<template>
  <div>
    <div class="err">
      <img src="../../../static/img/singFail.png">
    </div>
    <p>抱歉！登录失败</p>
    <!-- <p>{{second}}秒后自动跳回首页<a href="/login">回到首页</a></p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      second: 5,
      timer: null
    }
  },
  created() {
    // this.timer = setInterval(() => {
    //   this.second--;
    //   if (this.second == 0) {
    //     this.$router.push('/login')
    //   }
    // }, 1000);
  },
  destroyed() {
    clearInterval(timer)
  }
}
</script>

<style lang="less">
.err {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
}
.err img {
  width: 260px;
  height: 200px;
}
.err span {
  font-size: 28px;
  font-family: monospace;
  margin-left: 30px;
}
.err p {
  text-align: center;
  font-size: 16px;
}
.err a {
  text-decoration: underline;
  color: blue;
}
</style>
