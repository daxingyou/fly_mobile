<template>
	<div class="lineDetection">
		<yd-popup v-model="showModal" :close-on-masker="false" position="center" style="z-index: 9999;">
			<div class="modal">
				<div class="modal_head">
					<h4 class="title" style="display: flex;align-items: center;justify-content: center;border-bottom: 1px solid #CCCCCC;padding: 0.1rem 0;"><span class="icon-ie"></span><span style="font-size:14px ;">线路切换</span></h4>
				</div>
				<div class="modal_main">
					<div class="lineSpeed" ref="lineSpeed">
						<label :class="item.className" v-for="(item,index) in urlList">
							<i class="speed">{{item.label}}</i>
							<!-- <span>{{item.url}}</span> -->
							<span>线路{{index+1}}</span>
							<input type="checkbox" :checked="item.checked" @change="checked(item.checked,index)">
						</label>
					</div>
				</div>
				<div class="modal_footer">
					<a href="javascript:;" class="restart" @click="lineRestart">重新测速</a>
					<a href="javascript:;" class="confirm" @click="confirm">确 定</a>
				</div>
			</div>
		</yd-popup>
		<div class="line-detection">
			<span class="testSpeed">
				<label v-for="item in currentUrlList"  :class="item.className">
					<i class="speed">{{item.label}}</i>
				</label>
			</span>
			<a href="javascript:;" @click="showChangeModal" style="display:flex;align-items: center;padding-bottom: 4px;"><span class="icon icon-ie"></span><span style="color: #387ef5;">线路切换</span></a>
		</div>
	</div>

</template>

<script>
	var time = 0;
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex";
	export default {

		data() {
			return {
				showModal: false,
				currentUrlList:[{
						url: "",
						className: "test",
						label: "\u6d4b\u901f\u4e2d --",
						checked:false,
					}],
				urlList: [
				   
				]
			}
		},
		created() {
			this.getAutoUrl().then((res) => {
				this.lineDetection(this.currentUrlList)
				for (var key  in  res) {
					let obj = {
						url: "",
						className: "test",
						label: "\u6d4b\u901f\u4e2d --",
						checked:false
					}
					obj.url = res[key];
					this.urlList.push(obj)
				}
				this.currentUrlList[0].url = window.location.origin;
			})
		},
		methods: {
			...mapActions('login', [
				"getAutoUrl",
			]),
			showChangeModal() {
				this.showModal = true;
				this.lineDetection(this.urlList)
			},
			lineDetection(urlList) {
				urlList.forEach((i, t) => {
					i.className = "test"
					i.label = "\u6d4b\u901f\u4e2d --"
					var img = new Image,
						time = (new Date).getTime();
					img.onerror = () => {

						var loadTime = (new Date).getTime() - time,
							loading = Math.floor(loadTime / 100),
							timer = 0;
						if(loading > 20) timer = 3;
						else {
							timer = loading > 3 ? loading < 10 ? 1 : 2 : 0;
						}
						this.Line(i, loadTime, timer)
					}
					img.src = [ i.url, "/", time].join("");
				})
			},
			Line(item, i, a) {
				var r, c, arr = ["\u6781\u901f", "\u6b63\u5e38", "\u62e5\u5835", "\u8d85\u65f6"];
				item.label = [arr[a], " ", i, "ms"].join("");
				item.className = "level" + a;
			},
			lineRestart() {
				this.lineDetection(this.urlList)
			},
			confirm() {
				this.lineDetection(this.currentUrlList)
                this.showModal = false;
                this.urlList.forEach((item,index)=>{
					if(item.checked == true){
						window.location.href = item.url;
					}
				})
			},
			checked(check,index){
				
				this.urlList.forEach((item,i)=>{
					if(index === i){
						item.checked = true
					}else{
						item.checked = false
					}
				})
			}
		}
	}
</script>

<style>
	.line-detection {
		font-size: 0.24rem;
		height: 0.5rem;
		justify-content: space-between;
		line-height: 0.5rem;
		display: flex;
		position: relative;

		width: 65%;
		float: right;
		margin-top: -0.65rem;
	}
	
	.lineSpeed {
		position: relative;
		padding: 0 0.2rem;
		
	}
	.lineSpeed span{
		padding-left: 0.2rem;
		font-size:0.3rem ;
		}
	.lineSpeed>label i.speed {
		line-height: 0.7rem;
		margin-left: 0.1rem;
		font-size: 0.3rem;
	}
	
	.lineSpeed>label.test i.speed {
		color: #0c60ee
	}
	
	.lineSpeed .level0 i {
		color: #3c3
	}
	
	.lineSpeed .level1 i {
		color: #f90
	}
	
	.lineSpeed .level2 i {
		color: #f66
	}
	
	.lineSpeed .level3 i {
		color: #8a8a8a
	}
	
	.lineSpeed label input[type='checkbox'] {
		float: right;
		height: 0.4rem;
		width: 0.4rem;
		margin-top: 0.16rem;
		background: 0;
		border: 1px solid #0c60ee;
	}
	
	.lineSpeed .level1 input[type='checkbox'] {
		border: 1px solid #f90;
	}
	
	.lineSpeed>label:after {
		content: '';
		margin: 0.24rem 0;
		display: table;
		width: 0.2rem;
		height: 0.2rem;
		border-radius: 50%;
		float: left;
		background: #0c60ee;
	}
	
	.lineSpeed>.level1:after {
		background: #f90;
	}
	
	.lineSpeed>label {
		width: 100%;
		line-height: 0.6rem;
		margin-top: 0.16rem;
		float: left;
		border: 1px solid #d7d7d7;
		border-radius: 3px;
		padding: 0 0.16rem;
	}
	
	.modal_footer {
		width: 100%;
		float: left;
		line-height: 0.6rem;
		margin-top: 0.2rem;
		margin-bottom: 0.1rem;
	}
	
	.testSpeed>label:after {
		content: '';
		margin: 0.14rem 0;
		display: table;
		width: 0.16rem;
		height: 0.16rem;
		border-radius: 50%
	}
	
	.testSpeed>label i.speed {
		padding-top: 0.04rem;
		line-height: 0.36rem;
		position: absolute;
		left: 0.3rem
	}
	
	.testSpeed>label.test i.speed {
		color: #0c60ee
	}
	
	.testSpeed>.level0:after {
		background: #3c3;
	}
	
	.testSpeed>.level1:after {
		background: #f90
	}
	
	.testSpeed>.level2:after {
		background: #f66
	}
	
	.testSpeed>.level3:after {
		background: #f00
	}
	
	.testSpeed>.level0 i {
		color: #3c3
	}
	
	.testSpeed>.level1 i {
		color: #f90
	}
	
	.testSpeed>.level2 i {
		color: #f66
	}
	
	.testSpeed>.level3 i {
		color: #f00
	}
	
	.lineSpeed>.level0:after {
		background: #3c3
	}
	
	.lineSpeed>.level1:after {
		background: #f90
	}
	
	.lineSpeed>.level2:after {
		background: #f66
	}
	
	.lineSpeed>.level3:after {
		background: #8a8a8a
	}
</style>