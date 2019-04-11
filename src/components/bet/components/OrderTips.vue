<template>
	<yd-popup position="center" width="90%" v-model="$parent.showOrderTips" class="order-tip">
		<div>
			<div class="header">
				下单提示
				<img @click="$parent.showOrderTips=false" src="../style/img/close.png" />
			</div>
			<div class="conent">
				<div class="item"><span>金额：</span>
					<KeyboardInput :isCursor="isCursor" @showKeyboard="showKeyboard('ticketUnitCost')" placeholder="请输入金额" v-model="$parent.ticketUnitCost" />
				</div>
				<div class="item"><span>单位：</span>
					<yd-radio-group v-model="$parent.ticketUnit" color="#db1931" size="14">
						<yd-radio :val="1">元</yd-radio>
						<yd-radio :val="0.1">角</yd-radio>
						<yd-radio :val="0.01">分</yd-radio>
						<yd-radio :val="0.001">厘</yd-radio>
					</yd-radio-group>
				</div>
				<div class="item" style="display: block;text-align: center;height: auto;">
						<p style="padding: .1rem 0;">共<span style="color:rgb(217, 28, 50);margin: 0.1rem;">{{ticketCount}}</span>注</p>
						<p>投注<span style="color:rgb(217, 28, 50);margin: 0.1rem;">{{$parent.ticketCost}}</span>元</p>
					</div>
			</div>
			<div class="footer">
				<yd-button type="warning" @click.native="cancel">取消</yd-button>
				<yd-button type="danger" @click.native="setConfirm">提交</yd-button>
			</div>
		</div>
	</yd-popup>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import KeyboardInput from '@/customComponents/keyboard/KeyboardInput';
	export default {
		components: {
			KeyboardInput,
		},
		computed: {
			...mapState('bet', ['ticketCount'])
		},
		data(){
			return {
				isCursor:false,
			}
		},
		methods: {
			//取消
			cancel() {
				this.$parent.showOrderTips = false;
			},
			//提交
			setConfirm() {
				this.$parent.addShopping()
			},
			//弹出自制键盘组件
			showKeyboard(value) {
				this.isCursor = true
				this.$showKeyboard({
					show: true,
					val: this.$parent[value],
					callback: (val) => {
						this.$parent[value] = val
					},
					closeCallback:() => {
						this.isCursor = false;
					}
				})
			}
		},
	}
</script>

<style lang="less">
	.order-tip {
		.yd-popup-center {
			width: 5rem !important;
			.header {
				position: relative;
				margin: 0 auto;
				width: 5rem;
				height: .7rem;
				background: #011935;
				border-radius: 4px 4px 0 0;
				color: #FFFFFF;
				line-height: .7rem;
				text-align: center;
				font-size: 16px;
				img {
					position: absolute;
					width: 0.3rem;
					height: 0.3rem;
					top: 0.2rem;
					right: 0.15rem
				}
			}
			.conent {
				.item {
					background: #FFFFFF;
					height: .8rem;
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
						background: #F0F0F0;
						border: 1px solid #ddd;
						margin: 0 0.1rem;
						position: relative;
						.weilei {
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							background: #FFFFFF;
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
				background: #FFFFFF;
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