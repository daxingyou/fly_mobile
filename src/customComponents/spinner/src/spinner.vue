<template>
    <span class="yd-spinner" :class="buttonStyle === 'circle' ? 'yd-spinner-circle' : 'yd-spinner-square'" :style="boxStyle">
        <div
                :style="{width: buttonStyle === 'circle' ? width : '100%'}"
                ref="numInput"
                class="yd-spinner-input"
                :readonly="readonly"
                @click="focusInput"
        >{{counter}}
        <i v-if="isfocus" class="typing-cursor">|</i>
        </div>
    </span>
</template>

<script type="text/babel">
    export default {
        name: 'yd-spinner',
        data() {
            return {
                counter: 0,
                tapParams: {
                    timer: null,
                    tapStartTime: 0
                },
                parms: {
                    max: 0,
                    min: -1
                },
            }
        },
        computed: {
        	
            boxStyle() {
                if(this.buttonStyle === 'square') {
                    return {height: this.height, width: this.width};
                }
                return {height: this.height}
            },
            btnStyle() {
                if(this.buttonStyle === 'square') {
                    return {};
                }
                const h = this.height;
                return {
                    width: h,
                    height: h
                }
            }
        },
        watch: {
            value(val) {
                this.callback(this.val, val);
                
                this.setDefalutValue();
            }
        },
        props: {
        	isfocus: {
        		type: Boolean,
                default: false
        	},
            callback: {
                type: Function,
                default: () => {}
            },
            val: {
                type: [Boolean, String, Number],
                default: ''
            },
            unit: {
                default: 1,
                validator(val) {
                    return /^([1-9]\d*)$/.test(val);
                }
            },
            max: {
                default: 0,
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                }
            },
            min: {
                default: -1,
                validator(val) {
                    return /^((-?([1-9]\d*))|0)$/.test(val);
                }
            },
            longpress: {
                type: Boolean,
                default: true
            },
            readonly: {
                type: Boolean,
                default: false
            },
            value: {
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                }
            },
            width: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '1rem'
            },
            height: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '.6rem'
            },
            buttonStyle: {
                validator(value) {
                    return ['square', 'circle'].indexOf(value) > -1;
                },
                default: 'square'
            }
        },
        methods: {
            init() {
                if (!this.checkParameters())return;

                this.setDefalutValue();

                this.bindEvents();
            },
            focusInput() {
            	this.$emit('focusInput')
        	},
            checkParameters() {
                const max = ~~this.max;
                const unit = ~~this.unit;
                const min = ~~this.min;

                if (max < unit && max !== 0) {
                    console.error('[YDUI warn]: The parameter \'max\'(' + max + ') must be greater than or equal to \'unit\'(' + unit + ').');
                    return false;
                }

                if (max % unit !== 0) {
                    console.error('[YDUI warn]: The parameter \'max\'(' + max + ') and \'unit\'(' + unit + ') must be multiple.');
                    return false;
                }

                if (min % unit !== 0 && min >= 0) {
                    console.error('[YDUI warn]: The parameter \'min\'(' + min + ') and \'unit\'(' + unit + ') must be multiple.');
                    return false;
                }

                if (max < min && max !== 0) {
                    console.error('[YDUI warn]: The parameter \'max\'(' + max + ') must be greater than to \'min\'(' + min + ').');
                    return false;
                }

                return true;
            },
            setDefalutValue() {
                const unit = ~~this.unit;
                const min = ~~this.min;
                const value = ~~this.value;

                if (~~value > 0) {
                    this.setValue(value);
                    return;
                }
                
                this.setValue(min < 0 ? unit : min);
            },
            calculation(type) {
                const max = ~~this.max;
                const min = ~~this.min < 0 ? ~~this.unit : ~~this.min;
                const unit = ~~this.unit;

                if (this.readonly)return;

                let val = ~~this.counter;
                let newval;

                if (type === 'add') {
                    newval = val + unit;
                    if (max !== 0 && newval > max)return;
                } else {
                    newval = val - unit;
                    if (newval < min)return;
                }

                this.$emit('input', newval);

                if (this.longpress) {
                    this.longpressHandler(type);
                }
            },
            setValue(val) {
                const max = ~~this.max;
                const min = ~~this.min < 0 ? ~~this.unit : ~~this.min;
                const unit = ~~this.unit;

                if (!/^(([1-9]\d*)|0)$/.test(val)) val = unit;

                if (val > max && max !== 0) val = max;

                if (val % unit > 0) {
                    val = val - val % unit + unit;
                    if (val > max && max !== 0) val -= unit;
                }

                if (val < min) val = min - min % unit;

                this.counter = val;
            },
           
            clearTapTimer() {
                clearTimeout(this.tapParams.timer);
            },
        },
        mounted() {
            this.$nextTick(this.init);
        }
    }
</script>

<style lang="less">
@import "../../common/variables";
@import "../../common/mixins";

.@{css-prefix} {
  &-spinner {
    border-radius: 1px;
    display: inline-block;
    position: relative;
    overflow: hidden;
    > span {
      float: left;
      width: 25%;
      height: 100%;
      text-align: center;
      font-weight: bold;
      color: #666;
      letter-spacing: 0;
      position: relative;
      overflow: hidden;
      .tap-color(#FAFAFA, .95);
      > i:after {
        font-family: @iconfont-inlay;
        color: #777;
        font-size: .16rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-45%, -40%);
      }
      &:last-child > i:after {
        content: '\E602';
      }
      &:first-child > i:after {
        content: '\E60B';
      }
    }
    > .yd-spinner-input {
      display: flex;
      letter-spacing: 0;
      justify-content: center;
      align-items:center ;
      float: left;
      height: inherit;
      text-align: center;
      color: #666;
      border: none;
      font-size: .26rem;
      background-color: #FFF;
      border-radius:3px ;
      .typing-cursor {
				opacity: 1;
				font-weight: bold;
				-webkit-animation: blink 0.7s infinite;
				animation: blink 0.7s infinite;
			}
    }
    &-square {
      /*&:after {
        .top-line(@line-color, 5);
        top: 0;
      }*/
      &:before {
        .bottom-line(@line-color, 5);
      }
      > span {
        &:last-child {
          &:after {
            .right-line(@line-color, 5);
          }
        }
        &:first-child {
          &:before {
            .left-line(@line-color, 5);
          }
        }
      }
    }
    &-circle {
      > span {
        border-radius: 100px;
        display: block;
        background-color: #F5F5F5;
      }
    }
  }
}


</style>
