<template>
	<div v-show="show" id="Keyboard" >
		<div v-if="show" @touchstart.stop="addEvent('confirm')" style="position: absolute;top: 0;bottom: 0;left: 0;right:0;z-index: -1;"></div>
		<table id="table_0909099" border="0" cellspacing="0" cellpadding="0">
			<tbody>
				<tr class="quick">
					<td @touchstart.stop="quickAdd('10')"><div>投10倍</div></td>
					<td @touchstart.stop="quickAdd('500')"><div>投500倍</div></td>
					<td @touchstart.stop="quickAdd('1000')"><div>投1000倍</div></td>
				</tr>
				<tr>
					<td @touchstart.stop="addEvent('1')">1</td>
					<td @touchstart.stop="addEvent('2')">2</td>
					<td @touchstart.stop="addEvent('3')">3</td>
				</tr>
				<tr>
					<td @touchstart.stop="addEvent('4')">4</td>
					<td @touchstart.stop="addEvent('5')">5</td>
					<td @touchstart.stop="addEvent('6')">6</td>
				</tr>
				<tr>
					<td @touchstart.stop="addEvent('7')">7</td>
					<td @touchstart.stop="addEvent('8')">8</td>
					<td @touchstart.stop="addEvent('9')">9</td>
				</tr>
				<tr>
					<td @click.stop="addEvent('confirm')" >确定</td>
					<td @touchstart.stop="addEvent('0')">0</td>
					<td @touchstart.stop="addEvent('delete')" >删除</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default {
		 props: {
		 	show:Boolean,
            val: String,
            callback: Function,
            closeCallback: Function
        },
		data() {
			return {
               aIllegal: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '0..', '.'],
			}
		},
		methods: {
			quickAdd(value){
				this.val = value;
                this.callback(value)
				
			},
			addEvent(value) {
				this.callback(this.typing(value))
			},
			/*输入*/
			typing (value) {
				/*如果是点击删除*/
				if (value === 'delete') {
					this.del();
					return this.val
				}
				if(value === 'confirm') {
					this.show = false;
					this.closeCallback()
					return this.val
				}
				/*保存旧的值*/
				let oldValue = this.val;
                /*校验长度*/
				if(this.val.length>=7){
					return this.val
				}
				/*获取新的值*/
				this.val = this.val + value;
				
				/*检验新值, 如果没有通过检测, 恢复值*/
				if (!this.passCheck(this.val)) {
					this.val = oldValue;
					return this.val;
				}
				return this.val
			},
			del () {
				/*删除值并不会触发值的校验, 所以需要手动再触发一次*/
				this.val = this.val.slice(0, -1);
			},
			passCheck (val) {
				/*验证规则*/
				let aRules = [
						this.illegalInput,
						this.illegalValue,
//						this.accuracy
					]
				return aRules.every((item) => {
					return item(val);
				});
			},
			illegalInput (val) {
				if (this.aIllegal.indexOf(val) > -1) {
					return false;
				}
				return true;
			},
			/*非法值*/
			illegalValue (val) {
				if (parseFloat(val) != val) {
					return false;
				}	
				return true;			
			},
		}
	}
</script>
<style>
	#Keyboard {
		z-index: 1000;
		width: 100%;
		background-color: rgb(255, 255, 255);
	}
	
	#table_0909099 {
		z-index:1000;
		text-align: center;
		width: 100%;
		border-top: 1px solid #CECDCE;
		background-color: #FFF;
	}
	.quick{
		background:#e5e6e8;

	}
	#table_0909099 .quick td{
		
		width: 33%;
		height: 0.7rem;
		font-size: 0.35rem;
	}
	#table_0909099 .quick td div{
		width:25vw;
		height: 0.5rem;
		line-height:0.5rem;
		margin: 0 4vw;
		border: 1px solid #bfbfbf;
        border-radius: 0.06rem;
		background: #fff -webkit-gradient(radial,60 60,60,50 120,0,from(ivory),to(hsla(0,0%,100%,.6)));
		font-size: 0.35rem;
	}
	#table_0909099 td {
		width: 33%;
		height: 0.7rem;
		border: 1px solid #ddd;
		border-right: 0;
		border-top: 0;
		font-size: 0.4rem;
	}
</style>