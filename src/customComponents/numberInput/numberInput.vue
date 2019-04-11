<template>
	<div class="input-number">
		<div @click="focusInput"  >{{currentValue}}
			<i v-if="isfocus" class="typing-cursor">|</i>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			max: {
				type: Number,
				default: Infinity
			},
			min: {
				type: Number,
				default: -Infinity
			},
			value: {
				type: [String, Number],
				default: 0
			},
			step: {
				type: Number,
				default: 1
			},
			isfocus: {
        		type: Boolean,
                default: false
        	},
		},
		data: function() {
			return {
				currentValue: this.value
			}
		},
		watch: {
			currentValue: function(val) {
				
				this.$emit('input', val);
				this.$emit('on-change', val)
			},
			value: function(val) {
				this.updateValue(val);
			}
		},
		methods: {
			focusInput() {
            	this.$emit('focusInput')
        	},
			updateValue: function(val) {
				if(val > this.max) {
					val = this.max;
				}
				if(val < this.min) {
					val = this.min;
				}
				this.currentValue = val;
			},
			handleChange: function(event) {
				var val = event.target.value.trim();
				var max = this.max;
				var min = this.min;
				if(this.isValueNumber(val)) {
					val = Number(val);
					this.currentValue = val;
					if(val > max) {
						this.current = max;
					}
					if(val < min) {
						this.current = min;
					}
				} else {
					event.target.value = this.currentValue;
				}
			},
			isValueNumber(value) {
				return(/^(([1-9]\d*)|0)$/).test(value);
			},

		},
		//初始化
		mounted: function() {
			this.updateValue(this.value);
		}

	}
</script>

<style lang="less">
	.input-number {
		div {
			display: flex;
			width: 1rem;
			justify-content: center;
			align-items: center;
			height: 0.5rem;
			outline: none;
			-webkit-appearance: none;
			 border: 1px solid #eae8e8;
			border-radius: 4px;
			margin: 0.05rem 0.1rem;
			text-align: center;
			.typing-cursor {
				opacity: 1;
				font-weight: bold;
				-webkit-animation: blink 0.7s infinite;
				animation: blink 0.7s infinite;
			}
		}
	}
</style>