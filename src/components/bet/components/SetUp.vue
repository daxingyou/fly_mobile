<template>
	<yd-popup position="center" width="90%" v-model="$parent.showSet" class="set-up">
		<div>
			<div class="header">
				设置
				<img @click="$parent.showSet=false" src="../style/img/close.png" />
			</div>
			<div class="conent">
				<div class="item"><span>单位：</span>
					<yd-radio-group v-model="$parent.ticketUnit" color="#db1931" size="14">
						<yd-radio :val="1">元</yd-radio>
						<yd-radio :val="0.1">角</yd-radio>
						<yd-radio :val="0.01">分</yd-radio>
						<yd-radio :val="0.001">厘</yd-radio>
					</yd-radio-group>
				</div>
				<div class="item"><span>预设金额：</span>
					<KeyboardInput :isCursor="isCursor" @showKeyboard="showKeyboard('defaultAmount_1')" placeholder="请输入金额" v-model="defaultAmount_1" />
				</div>
				<div class="item"><span>下单提示：</span>
					<yd-radio-group color="#db1931" size="14" v-model="orderTips_1">
						<yd-radio :val="1">开</yd-radio>
						<yd-radio :val="0">关</yd-radio>
					</yd-radio-group>
				</div>
			</div>
			<div class="footer">
				<yd-button type="warning" @click.native="restoreDefault">恢复默认</yd-button>
				<yd-button type="danger" @click.native="setConfirm">确认</yd-button>
			</div>
		</div>
	</yd-popup>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import KeyboardInput from "@/customComponents/keyboard/KeyboardInput";
export default {
  data() {
    return {
      isCursor: false,
      orderTips_1: 1, //注单提示
      defaultAmount_1: ""
    };
  },
  components: {
    KeyboardInput
  },
  computed: {
    ...mapState("bet", ["orderTips", "defaultAmount"])
  },
  created() {
    this.orderTips_1 = this.orderTips;
    this.defaultAmount_1 = this.defaultAmount;
  },
  methods: {
    ...mapMutations("bet", ["SET_DEFAULT_AMOUNT", "IS_ORDER_TIPS"]),
    //恢复默认
    restoreDefault() {
      this.$parent.ticketUnit = 1;
      this.orderTips_1 = 1;
      this.defaultAmount_1 = "";
      this.showKeyboard("defaultAmount_1");
    },
    //确认关闭
    setConfirm() {
      this.$parent.showSet = false;
      if (this.$parent.ticketUnitCost == "") {
        this.$parent.ticketUnitCost = this.defaultAmount_1;
      }
    },
    //弹出自制键盘组件
    showKeyboard(value) {
      this.isCursor = true;
      this.$showKeyboard({
        show: true,
        val: this[value],
        callback: val => {
          this[value] = val;
        },
        closeCallback: () => {
          this.isCursor = false;
        }
      });
    }
  },
  watch: {
    orderTips_1() {
      this.IS_ORDER_TIPS(this.orderTips_1);
    },
    defaultAmount_1() {
      this.SET_DEFAULT_AMOUNT(this.defaultAmount_1);
    }
  }
};
</script>

<style lang="less">
.set-up {
  .yd-popup-center {
    width: 5rem !important;
    .header {
      position: relative;
      margin: 0 auto;
      width: 5rem;
      height: 0.7rem;
      background: #011935;
      border-radius: 4px 4px 0 0;
      color: #ffffff;
      line-height: 0.7rem;
      text-align: center;
      font-size: 16px;
      img {
        position: absolute;
        width: 0.3rem;
        height: 0.3rem;
        top: 0.2rem;
        right: 0.15rem;
      }
    }
    .conent {
      .item {
        background: #ffffff;
        height: 0.8rem;
        display: flex;
        border-bottom: 1px solid #bfbfbf;
        font-size: 14px;
        display: flex;
        align-items: center;
        padding: 0 0.2rem;
        .input {
          width: 1.5rem;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 14px;
          background: #f0f0f0;
          border: 1px solid #ddd;
          margin: 0 0.1rem;
          position: relative;
          .weilei {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #ffffff;
            color: #c1c1c1;
            z-index: 1;
            text-align: center;
          }
        }
        .input:empty::before {
          content: attr(placeholder);
        }
        .typing-cursor {
          opacity: 1;
          font-weight: bold;
          -webkit-animation: blink 0.7s infinite;
          animation: blink 0.7s infinite;
        }
      }
    }
    .footer {
      background: #ffffff;
      height: 1rem;
      border-radius: 0 0 4px 4px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .yd-btn {
        width: 1rem;
      }
    }
  }
}
</style>