<template>
	<header class="bet-navbar">
		<div class="bet-navbar-item" @click="$emit('openGameMenu')">
			<p>{{gameType.kindName}}</p>
			<div class="img_you"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD/ElEQVRYR82XaYiNURjHXSSy73umrDX25QtC2bcpJUs+YoZ8IAozUoqY+WD5ILuUEsryxRhCliYlYmrEYDDWmhn7nm38/rfnvZ37zl3ee/ng1L/3LP/zPP/7nHPPeU6oTsBSU1PTCOpkMBv0BK1Be/AbvAavQBk4BgpDodC3IKZDyUg4bgtnI5gHJCJI+QrpEMhDSHWiCXEF4Lg+E1eAtaCxz8gP2pXgBahnkehkdZf6mcZ6sAUhmlOrxBSA85YwT4Hhzozn1A9bfzEGFfpIYY6EjADTwFzQxRkupp7FnLd+BbUEYKg7pPMgw8gf+G4C24KuKzYawl8G8kBTs/OI7wRsPHRFRAlgYhsGS0BnI4k8lklPvElwxlGfA9bRr6jELXBl5yQYZqQK1ZmnDRsuEQG2yxWqwTZ2je8UyG9cD/A+0m4CtP4jXHGxlNhe2sXYfBu/wXcU87RRowQU0F5ppGd8B8RaMwzuc4wFFaH9cRaMNfsF2F4dEYDRdjQUZq2d/r9DINyJ84vq0n8Q6G+pElREc7h3QUfzkYGPyvASIEAhyjGD+QzkxnLu9cFPV8RCbOwxO3vwkxPCWAM63gEdMvqbSJl2fsJiIo5Cmhk0EjZHke0NvoCWEjCRyhkzshXny5M5dyKhtT2Soog18DeYjUkSsJ3GEusYjYArQQXY8qUkAn+ZzLttPnZIwEUaY4D+Xs0RUJOKAEfECepZQZYDn1XwdMdckgDtzD6gFOf9U3XuLIfujuNBRODzFryBoEwCtAH1FzmNgKnpCrBI+EU8wGYvv018FtI3BbyXAO9kK4KszrSLnXpuFMqxqdwhqsDTptfm/yQB96hIZQnkQel6j+E87gEFtxQ/fcF9dxNWI0AnYsrFruJAmxCuDj+dM7pPwptwB5XF5jUz3hEcT5U5D3wWwB+Frctmb5cETKJRZB25CMgPGoJUncsuczbz8Q67yf6jWEmlohCV7cQSlOZR3Axbj0EroOu4hXcZ7aaRbY4WIGB/oij8xWWkzCp8DVP24ifbE6D0ugLoOn4J+vkTEU/QXzjXrr9uPnTld8NHlZsRueqUGY2B8MsfCQTspG+R9QfNBRRypXpdbV7kyk+Ukh3QsiDipyvCObie0q/UKpIvxlo2+HKubGiojd/kO7JWSqZByEpKlbN1M7JCNgOyfmm4wFFCqiNb/5hkSansXADKtFUkdijzaieljoMe1M+BDOvToaGXkXKF7x4v0ReR2ktLge5+Ly2voD4eG+Xu3H/9MNFDZjrwP0yu0jcN58kfJk4kdLOtUqhBrKeZ7nRlz0pIOoB4TzNtbmXBUXvJ8/P/Pk79a8y6es/zWYzp9tTzXJtWxX2e6zoO/Dz/A7Ch1OTn3W3SAAAAAElFTkSuQmCC" style="width: 0.4rem;"></div>
		</div>
		<div class="bet-navbar-center-box">
			<div class="select-box" @click="selectMenu">
				<span class="text">玩法</span>
				<div class="select-content">
				<div class="select-gm" v-if="model=='1'">
				{{betType.leftName!=betType.rightName?betType.leftName+' '+betType.rightName:betType.rightName}}
				</div>
				<div class="select-gm" v-else>
				{{lmpTitle}}
				</div>
				<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" :class="isOpen?'ico_open':'ico_close'">
					<polygon points="0,3 10,3 5,8" />
				</svg>
				</div>
			</div>
		</div>
		<div class="bet-navbar-item right">
			<p @click="$parent.assis_tant=true">小助手</p>
		</div>
	</header>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  props: ["gameType", "isOpen"],
  computed: {
    ...mapState("bet", ["model", "betType", "lmpTitle"])
  },
  methods: {
    selectMenu() {
      //				this.isOpen = !this.isOpen;
      //传递给父组件
      this.$emit("isOpen", !this.isOpen);
    }
  },
  watch: {
    betType() {
      console.log(this.betType);
    }
  }
};
</script>

<style lang="less">
.bet-navbar {
  width: 100%;
  height: 1rem;
  display: flex;
  color: #ffffff;
  font-size: 0.28rem;
  background: #011935 !important;

  .bet-navbar-item {
    width: 33%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.28rem;
    margin-left: 0.1rem;
    p {
      height: 100%;
      line-height: 1rem;
      text-align: left;
    }
    .img_you {
      margin-left: 0.1rem;
    }
  }
  .bet-navbar-item.right {
    width: 32%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0.28rem;
    p {
      padding-left: 0.1rem;
      height: 100%;
      line-height: 1rem;
      text-align: left;
      padding-right: 0.2rem;
    }
  }

  .bet-navbar-center-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    .ico_close,
    .ico_open {
      vertical-align: middle;
      transition: all 0.3s;
      fill: #00ffff;
    }
    .ico_open {
      transform: rotate(180deg);
    }
    .select-box {
      display: flex;
      .text {
        width: 0.285rem;
        display: inline-block;
        margin-right: 0.1rem;
      }
      .select-content {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        border-radius: 5px;
        border: 1px solid #ccc;
        line-height: 0.5rem;
        padding-right: 0.1rem;
        padding-left: 0.1rem;
        color: #fff;
        .select-gm {
          margin: 0 0.1rem;
        }
      }
    }
  }
}
</style>