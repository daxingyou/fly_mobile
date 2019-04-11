<template>
		<!-- 自定义输入框 -->
		<div class="input-box" @click.stop="focus">
			<!-- 右侧内容 -->
			<div class="content">
				<span class="inputTxt">
					{{value}}
				</span>
				<p class="placeholder" v-show="value.length === 0">
					{{placeholder}}
				</p>
				<!-- 光标 -->
				<p class="cursor" :style="{visibility: cursor&&isCursor ? 'visible' : 'hidden'}"></p>
			</div>
		</div>

</template>
<script>
	export default {
		
		name: 'KeyboardInput',
		props: {
			value: '',
			placeholder: {
				default: ''
			},
			isCursor:{
				default:false
			}
		},
		data() {
			return {
				cursor: false,
				cursorDuration: 600,

			}
		},
		mounted(){
//			document.addEventListener('click', (e) => {
//				this.blur();
//			});
		},
		methods: {
			focus() {
				this.$emit("showKeyboard")
				/*显示光标*/
				this.showCursor();
				/*闪烁光标*/
				this.blinkCursor();
			},
			/*blur*/
			blur () {
				/*隐藏光标*/
				this.hideCursor();
				/*停止光标闪烁*/
				this.unblinkCursor();
			},
			blinkCursor() {
				clearInterval(this.intervalID);
				this.intervalID = setInterval(() => {
					this.cursor = !this.cursor;
				}, this.cursorDuration);
			},
			unblinkCursor() {
				clearInterval(this.intervalID);
			},
			showCursor () {
				this.cursor = true;
			},
			hideCursor () {
				this.cursor = false;
			},
		},
	}
</script>
<style scoped lang="less">
	.input-box {
		disply: flex;
		width: 1.6rem;
		align-items: center;
		justify-content: space-between;
		height: 0.6rem;
		line-height: 0.6rem;
		.label {
			color: #333;
		}
		.content {
			width: 1.6rem;
			display: flex;
			height: 0.6rem;
			background: #fff;
			border:1px solid #ccc;
			border-radius: 0.08rem;
			.inputTxt {
				display: inline-block;
				line-height: 0.6rem;
				font-size: 0.3rem;
				color: #313131;
			}
			.cursor {
				background-color: #4788c5;
				width: 0.04rem;
				margin-left: 0.02rem;
				margin-top:0.15rem;
				height: 0.3rem;
			}
			.placeholder {
				font-size: 0.26rem;
				margin-left: 0.05rem;
				line-height: 0.6rem;
				position: absolute;
				color: #ccc;
			}
			.currency {
				color: #c1c1c1;
			}
		}
	}
</style>