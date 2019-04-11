<template>
    <span>
        <span  v-html="str"></span>
        <span ref="tpl" v-if="showTpl"><slot></slot></span>
    </span>
</template>

<script type="text/babel">
    export default {
        name: 'fly-countdown',
        data() {
            return {
                str:'',
                timer: null,
                tempFormat: '',
                showTpl: true,
            }
        },
        props: {
        	defultTime:{
        		type:Number,
        		default:6
        	},
        	currentTime:{
        		type:Number,
        		default:'',
        	},
        	nextTime:{
        		type:Number,
        		default:'',
        	},
            format: {
                type: String,
                default: '{%d}:{%h}:{%m}:{%s}'
            },
            callback: {
                type: Function
            },
        },
        watch:{
        	nextTime(){
        		 this.run();
        	},
        	currentTime(){
        		this.run();
        	}
        },
        methods: {
            run() {
            	let time = this.nextTime - this.currentTime;
            	if(time<=0) time=0
                this.lastTime = Math.floor(new Date() / 1000) + ~~time/1000;
                this.doRun();
                clearInterval(this.timer);
                this.timer = setInterval(this.doRun, 1000);
            },
            doRun() {
            	
                let leftTime = this.lastTime - Math.floor(new Date().getTime() / 1000);
                if (leftTime >= 0) {
                    this.str = this.timestampTotime(leftTime);
                } else {
                    this.callback && this.callback();
                    clearInterval(this.timer);
                    this.lastTime = Math.floor(new Date() / 1000) + ~~this.defultTime-1;
                    this.doRun();
                    this.timer = setInterval(this.doRun, 1000);
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
                const ment = function (a) {
                    if (a <= 0)  return '00';
                    return a < 10 ? '0' + a : a;
                };

                var arr = ['d', 'h', 'm', 's'];
                if(t.d===0){
                	arr = ['h', 'm', 's'];
                	format = this.tempFormat.slice(5,this.format.length)
                }
                if(t.d===0&&t.h===0){
                	arr = ['m', 's'];
                	format = this.tempFormat.slice(10,this.format.length)
                }
                arr.forEach((val) => {
                    const day = ment(t[val]).toString().split('');
                    format = format.replace('{%' + val + '}', ment(t[val]));
                    format = format.replace('{%' + val + '0}', ~~day[day.length - 3] !== 0 ? day[day.length - 3] : '');
                    format = format.replace('{%' + val + '1}', ~~day[day.length - 2]);
                    format = format.replace('{%' + val + '2}', ~~day[day.length - 1]);
                });

                return format;
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.tempFormat = !!this.$slots.default ? this.$refs.tpl.innerHTML : this.format;
                this.showTpl = false;
                this.run();
            });
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    }
</script>
