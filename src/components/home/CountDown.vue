<template>
	<div><span style="color: #000000;">第</span>{{awarPeriod}}<span style="color: #000000;">期</span></div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import gameConfig from '@/components/bet/createconfig/gameConfig.js'
	export default {
		computed: {
			...mapState("home", ["times"])
		},
		props: ["kindId"],
        data(){
        	return {
        		awarPeriod:"",
        		intervalId:null,
        	}
        },
		created() {
			//请求开奖长龙时间
			this.getWinsDragon('/' + this.kindId).then(res => {
				if(res.code == 0) {
					this.awarPeriod = res.data.winList[0].awarPeriod;
					this.time = moment(res.data.nextTime).valueOf() - moment(res.data.currentTime).valueOf();
					if(this.time <= 0){
						this.awarPeriod = res.data.winList[0].awarPeriod;
					}else{
						this.startTime()
					}
				}
			})
		},
		methods: {
			...mapActions('bet', [
				"getWinsDragon",
			]),
			startTime() {
				let awarPeriod;
				if(this.intervalId != null) {
					clearInterval(this.intervalId)
				}
				this.intervalId = setInterval(() => {
					this.time -= 1000
					if(this.time <= 0) {
						if(this.kindId == 'cqssc') {
							let currentAwarPeriod = this.currentAwarPeriod.slice(8);
							if(currentAwarPeriod * 1 == gameConfig[this.kindId].periodNoAll) {
								this.awarPeriod = this.createChasePeriod(this.awarPeriod, 1, gameConfig[this.kindId].periodNoAll, this.kindId)
								this.time = gameConfig[this.kindId].midleTime * 1000 * 2
							} else {
								this.awarPeriod = this.createChasePeriod(this.awarPeriod, 1, gameConfig[this.kindId].periodNoAll, this.kindId)
								this.time = gameConfig[this.kindId].midleTime * 1000
							}
						} else {
							this.awarPeriod = this.createChasePeriod(this.awarPeriod, 1, gameConfig[this.kindId].periodNoAll, this.kindId)
							this.time = gameConfig[this.kindId].midleTime * 1000
						}

					}
				}, 1000)
			},
			createChasePeriod(period, offset, periodNoAll, kindId) {
				let kindIdAry = ['bjpk10', 'azssc', 'xylhc', 'speed', 'azpk10', 'klft']
				if(kindIdAry.indexOf(this.kindId) != -1) {
					return parseInt(period) + offset + '';
				} else {
					if(kindId == "fc3d" || kindId == "pl3" || kindId == 'hk6') {
						var digit = period.length - 4;
						// 当前期号的日期
						var periodTime = period.substr(0, 4);
						// 转化为moment型，方便后面计算
						var momentTime = moment(periodTime, 'YYYY');
						var nowPeriodString = period.substr(4, digit);
						// 当前期号
						var nowPeriod = parseInt(period.substr(4, digit));
						// 目标期号
						var targetPeriod = nowPeriod + offset;
						var targetTime = void 0;
						if(targetPeriod > periodNoAll) {
							targetPeriod -= periodNoAll;
							targetTime = momentTime.add(1, 'y').format('YYYY');
						} else {
							targetTime = periodTime;
						}
						var targetPeriodString = targetPeriod + '';
						return targetTime + targetPeriodString.padStart(digit, '0');
					} else {
						var digit = period.length - 8;
						// 当前期号的日期
						var periodTime = period.substr(0, 8);
						// 转化为moment型，方便后面计算
						var momentTime = moment(periodTime, 'YYYYMMDD');
						var nowPeriodString = period.substr(8, digit);
						// 当前期号
						var nowPeriod = parseInt(period.substr(8, digit));
						// 目标期号
						var targetPeriod = nowPeriod + offset;
						var targetTime = void 0;
						if(targetPeriod > periodNoAll) {
							targetPeriod -= periodNoAll;
							targetTime = momentTime.add(1, 'd').format('YYYYMMDD');
						} else {
							targetTime = periodTime;
						}
						var targetPeriodString = targetPeriod + '';
						return targetTime + targetPeriodString.padStart(digit, '0');
					}
				}

			},
			
		}

	}
</script>

<style>

</style>