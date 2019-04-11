<template>
	<div class="nav-row">
		<div @click.stop="open(index,item)" class="nav-col nav-head" v-for="(item,index) in data">
			<div class="nav-head-box" :class="activeIndex===index?'showIcon':''">
				<slot name="iconImg">
					<img v-if="item.type==2||item.type==3" :src="'../../../static/img/home/'+item.iconImg" />
					<img v-else :src="'../../../static/img/home/'+item.classId+'.png'" />
				</slot>
				<i class="light"></i>
				<div class="nav-col-title">
					<p>
						<span v-if="item.type==2||item.type==3">{{item.titleName}}</span>
						<span v-else>{{item.className}}</span>
					</p>
				</div>
			</div>
		</div>
		<div class="nav-content" :style="styleHeight">
			<div ref="content" style="padding: 0.2rem;">
				<slot name="content">
					<span class="content-item" v-for="(item,index) in childData" @click="result(index)">{{item.kindName}}</span>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			data: Array,
			name: Number,

		},
		data() {
			return {
				show: false,
				activeIndex: null,
				styleHeight: {
					height: 0
				},
				childData: [],
			}
		},
		methods: {
			open(index, item) {
				if(item.type == 2 || item.type == 3) {
					this.$parent.enterChart(item)
					return false;
				}
				this.childData = this.data[index].kindList
				this.activeIndex = index;
				this.$parent.open(this._uid, this.name, index);
				this.$nextTick(() => {
					this.styleHeight = {
						height: this.$refs.content.offsetHeight + 'px'
					};
				})
			},
			result(index){
				let obj = this.data[this.activeIndex];
				this.$parent.result({
					classId:obj.classId,
					kindId:obj.kindList[index].kindId
				})
			}
			
		},
		watch: {
			show() {
				this.$nextTick(() => {
					if(this.show) {
						this.styleHeight = {
							height: this.$refs.content.offsetHeight + 'px'
						};
					} else {
						this.styleHeight = {
							height: 0
						};
						this.activeIndex = null;
					}
				})

			}
		}
	}
</script>

<style>
	.nav-row {
		width: 100%;
	}
	
	.nav-col {
		width: 50%;
		float: left;
		height: 1.8rem;
	}
	
	.nav-head .nav-head-box {
		position: relative;
		padding: 0.28rem;
		display: flex;
		align-items: center;
	}
	
	.nav-head .nav-head-box img {
		width: 1.2rem;
		height: 1.2rem;
		margin-right: 0.24rem;
	}
	
	.nav-col-title {
		font-size: 13px;
	}
	
	.nav-content {
		transition: all .3s;
		width: 100%;
		overflow: hidden;
		position: relative;
		background: #fff5e2;
		div{
		display: flex;
		justify-content: space-around;
		}
	}
	
	.nav-content .content-item{
		display: inline-block;
		width: 1.8rem;
		height: 0.46rem;
		color: #FFFFFF;
		line-height: 0.46rem;
		text-align: center;
		margin: 0.12rem 0.28rem;
		border-radius: 0.46rem;
		background: #0a77a0;
		overflow: hidden;
	}
	
	.nav-head-box.showIcon:before,
	.nav-head-box.showIcon:after {
		content: "";
		border-color: #fff5e2 transparent;
		border-style: solid;
		display: block;
		height: 0;
		font-size: 0;
		line-height: 0;
		width: 0;
		border-width: 0 0.18rem 0.18rem;
		position: absolute;
		z-index: 12;
		bottom: -0.05rem;
		left: 0.7rem;
		zoom: 12;
	}
	
	.showIcon img {
		transition: all .3s;
		-webkit-transform: rotateZ(360deg);
		-moz-transform: rotateZ(360deg);
		-o-transform: rotateZ(360deg);
		-ms-transform: rotateZ(360deg);
		transform: rotateZ(360deg);
	}
</style>